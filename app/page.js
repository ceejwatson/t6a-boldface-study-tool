"use client";

import { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Brain,
  Target,
  TrendingUp,
  Settings,
  Sun,
  Moon,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  Award,
  Flame,
  AlertCircle,
  Zap,
  Filter,
  FileText,
  ExternalLink,
  Clock,
  ArrowRight,
  Gauge,
} from "lucide-react";

// Removed AuthWrapper and sync functionality - using local-only storage

import MultipleChoice from "./components/MultipleChoice";
import TrueFalse from "./components/TrueFalse";
import ReorderSequence from "./components/ReorderSequence";
import MatchItems from "./components/MatchItems";
import Flashcard from "./components/Flashcard";
import ActiveRecall from "./components/ActiveRecall";
import LearningPath from "./components/LearningPath";
import VoiceRecall from "./components/VoiceRecall";
import CockpitReference from "./components/CockpitReference";
import FillInBlank from "./components/FillInBlank";
import {
  calculateSM2,
  mapPerformanceToQuality,
  getQuestionsDueForReview,
  sortQuestionsByPriority,
  getSRSStats,
} from "./utils/sm2";
import {
  learningPath,
  getQuestionsForSection,
  getSectionProgress,
  getChapterProgress,
  shouldUnlockChapter,
  getNextRecommendedSection,
} from "./learningPath";

import { questionDatabase } from "./questionData";
import { getLimitationQuestions } from "./opsLimitsData";
import { getAllBoldfaceProcedures } from "./boldfaceData";
import {
  aerospacePhysiologyTopics,
  getAllAerospacePhysiologyQuestions,
  getQuestionsByTopic as getAPQuestionsByTopic,
} from "./aerospacePhysiologyData";

export default function T6AEnhancedStudyTool() {
  // Get sync function from context
  // Removed sync functionality - all data saved locally only

  // UI State
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [studyMode, setStudyMode] = useState("quiz"); // Always quiz mode
  const [questionSet, setQuestionSet] = useState("aircraft"); // 'aircraft' or 'aerophysiology'
  const [studySubMode, setStudySubMode] = useState("activeRecall"); // 'activeRecall', 'learnNew', 'review', 'readThrough'
  const [selectedCategory, setSelectedCategory] = useState("all"); // Category filter for study mode

  // Question State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const lockedQuestions = useRef(new Set()); // Track locked questions immediately without waiting for state updates
  const [showExplanation, setShowExplanation] = useState(false);
  const [instantGrade, setInstantGrade] = useState(false); // Checkbox preference for instant grading
  const [hideMasteredQuestions, setHideMasteredQuestions] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState([
    "multipleChoice",
    "trueFalse",
    "reorderSequence",
    "matchItems",
  ]);
  const [questionCount, setQuestionCount] = useState(25); // 10, 25, or 50
  const [limitationsOnly, setLimitationsOnly] = useState(false); // Filter for limitation questions
  const [confidenceRating, setConfidenceRating] = useState({}); // Science-based: confidence self-assessment
  const [showQuizSetup, setShowQuizSetup] = useState(false); // Show topic selection before quiz
  const [showStudySetup, setShowStudySetup] = useState(true); // Show topic selection before study mode
  const [reviewIncorrectOnly, setReviewIncorrectOnly] = useState(false); // Track if reviewing incorrect answers only
  const [viewingSingleQuestion, setViewingSingleQuestion] = useState(false); // Track if viewing single question from results
  const [voiceRecallMode, setVoiceRecallMode] = useState(false); // Voice mode for answering questions
  const [reviewSessionCorrect, setReviewSessionCorrect] = useState([]); // Track questions answered correctly in current review session

  // Boldface Procedures State
  const [boldfaceAnswers, setBoldfaceAnswers] = useState({});
  const [boldfaceSubmitted, setBoldfaceSubmitted] = useState(false);

  // Performance Tracking
  const [performanceStats, setPerformanceStats] = useState({
    byCategory: {},
    byQuestionType: {},
    overall: { correct: 0, incorrect: 0, streak: 0, bestStreak: 0 },
  });

  // Spaced Repetition System (SRS) - SM-2 Algorithm
  const [srsData, setSrsData] = useState({});
  // Structure: { questionId: { easeFactor, interval, repetitions, nextReview, lastReview } }

  // Session History
  const [sessionHistory, setSessionHistory] = useState([]);
  // Structure: [{ date, mode, questionsAttempted, correct, incorrect, duration }]

  // Adaptive Learning
  const [weakTopics, setWeakTopics] = useState([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [questionMastery, setQuestionMastery] = useState({});
  // Structure: { questionId: { correctCount: 0, incorrectCount: 0, lastAnswered: timestamp } }
  const [fontSize, setFontSize] = useState("medium"); // 'small', 'medium', 'large'

  // Function to load data from localStorage
  const loadDataFromLocalStorage = () => {
    const savedPerformance = localStorage.getItem("t6a-performance");
    const savedFlags = localStorage.getItem("t6a-flagged");
    const savedSRS = localStorage.getItem("t6a-srs");
    const savedHistory = localStorage.getItem("t6a-session-history");
    const savedMastery = localStorage.getItem("t6a-mastery");
    const savedFontSize = localStorage.getItem("t6a-font-size");
    const savedDarkMode = localStorage.getItem("t6a-dark-mode");

    if (savedPerformance) setPerformanceStats(JSON.parse(savedPerformance));
    if (savedFlags) setFlaggedQuestions(JSON.parse(savedFlags));
    if (savedSRS) setSrsData(JSON.parse(savedSRS));
    if (savedHistory) setSessionHistory(JSON.parse(savedHistory));
    if (savedMastery) setQuestionMastery(JSON.parse(savedMastery));
    if (savedFontSize) setFontSize(savedFontSize);
    if (savedDarkMode !== null) setDarkMode(JSON.parse(savedDarkMode));
  };

  // Load saved data on mount
  useEffect(() => {
    loadDataFromLocalStorage();

    // Don't auto-load questions - wait for user to configure study setup

    // Set all topics selected by default for Quiz setup
    const allCategories = [];
    Object.keys(questionDatabase).forEach((type) => {
      questionDatabase[type].forEach((q) => {
        if (q.category && !allCategories.includes(q.category)) {
          allCategories.push(q.category);
        }
      });
    });
    setSelectedTopics(allCategories);
  }, []);

  // Removed Supabase sync event listener - using local-only storage

  // Save performance
  useEffect(() => {
    localStorage.setItem("t6a-performance", JSON.stringify(performanceStats));
  }, [performanceStats]);

  // Save flagged questions
  useEffect(() => {
    localStorage.setItem("t6a-flagged", JSON.stringify(flaggedQuestions));
  }, [flaggedQuestions]);

  // Save SRS data
  useEffect(() => {
    localStorage.setItem("t6a-srs", JSON.stringify(srsData));
  }, [srsData]);

  // Save session history
  useEffect(() => {
    localStorage.setItem("t6a-session-history", JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  // Save question mastery
  useEffect(() => {
    localStorage.setItem("t6a-mastery", JSON.stringify(questionMastery));
  }, [questionMastery]);

  // Save font size preference
  useEffect(() => {
    localStorage.setItem("t6a-font-size", fontSize);
  }, [fontSize]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("t6a-dark-mode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Calculate weak topics based on performance
  useEffect(() => {
    const topics = Object.keys(performanceStats.byCategory);
    const weak = topics.filter((topic) => {
      const stats = performanceStats.byCategory[topic];
      if (!stats || stats.correct + stats.incorrect < 3) return false;
      const accuracy = stats.correct / (stats.correct + stats.incorrect);
      return accuracy < 0.7; // Less than 70% accuracy
    });
    setWeakTopics(weak);
  }, [performanceStats]);

  // Reload questions when question count changes in study mode
  useEffect(() => {
    if (activeTab === "study" && currentQuestions.length > 0) {
      // Determine which mode to reload based on current state
      if (studyMode === "weak") {
        loadQuestions("weak");
      } else if (studyMode === "flagged") {
        loadQuestions("flagged");
      } else if (studyMode === "review") {
        loadQuestions("review");
      } else if (studyMode === "custom") {
        loadQuestions("custom");
      } else if (studyMode === "study") {
        loadQuestions("all");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionCount]);

  const applyStudySubModeFilter = (questions) => {
    const now = Date.now();

    switch (studySubMode) {
      case "learnNew":
        // Only show questions never reviewed before
        return questions.filter((q) => {
          const srsInfo = srsData[q.id];
          return !srsInfo || !srsInfo.lastReviewed;
        });

      case "review":
        // Only show questions due for review based on SM-2
        return questions.filter((q) => {
          const srsInfo = srsData[q.id];
          if (!srsInfo) return false; // Not new questions
          return srsInfo.nextReview && srsInfo.nextReview <= now;
        });

      case "activeRecall":
        // Mix of new questions and due reviews, prioritized by SM-2
        const newQuestions = questions.filter(
          (q) => !srsData[q.id] || !srsData[q.id].lastReviewed,
        );
        const dueQuestions = questions.filter((q) => {
          const srsInfo = srsData[q.id];
          return (
            srsInfo &&
            srsInfo.lastReviewed &&
            (!srsInfo.nextReview || srsInfo.nextReview <= now)
          );
        });

        // Prioritize due questions, then add new ones
        const combined = [...dueQuestions, ...newQuestions];
        return combined;

      case "readThrough":
      default:
        // Show all questions (default behavior)
        return questions;
    }
  };

  const loadQuestions = (mode) => {
    let questions = [];

    switch (mode) {
      case "limitations":
        questions = getLimitationQuestions();
        break;
      case "weak":
        // Get questions that you've gotten wrong 2+ times
        const allQuestions = getAllQuestions();
        questions = allQuestions.filter((q) => {
          const mastery = questionMastery[q.id];
          return mastery && mastery.incorrectCount >= 2;
        });
        break;
      case "flagged":
        const all = getAllQuestions();
        questions = all.filter((q) => flaggedQuestions.includes(q.id));
        break;
      case "review":
        // SRS: Get questions due for review
        questions = getDueForReview();
        break;
      case "custom":
        questions = getCustomQuestions();
        break;
      default:
        questions = getAllQuestions();
        // Filter by category if one is selected in study mode
        if (selectedCategory !== "all" && mode === "all") {
          questions = questions.filter((q) => q.category === selectedCategory);
        }

        // Apply study sub-mode filters for study mode
        if (studyMode === "study") {
          questions = applyStudySubModeFilter(questions);
        }
    }

    // Proper Fisher-Yates shuffle for better randomization (science-based)
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    // Limit to selected question count
    questions = questions.slice(0, questionCount);

    // Interleaving: Mix question types for better learning (science-based)
    // Questions are already shuffled, ensuring varied types throughout session

    setCurrentQuestions(questions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    lockedQuestions.current.clear(); // Clear locked questions when starting new session
    setShowExplanation(false);
  };

  const getAllQuestions = () => {
    const all = [];
    selectedQuestionTypes.forEach((type) => {
      // Skip flashcard type if in quiz mode (flashcards are only for flashcard study mode)
      if (type === "flashcard" && studyMode === "quiz") {
        return;
      }
      const questions = questionDatabase[type] || [];
      questions.forEach((q) => {
        all.push({ ...q, questionType: type });
      });
    });
    return all;
  };

  // Shuffle multiple choice options to make answers less predictable
  const shuffleQuestionOptions = (question) => {
    if (question.questionType !== "multipleChoice" || !question.options) {
      return question;
    }

    // Create array of [option, originalIndex] pairs
    const optionsWithIndices = question.options.map((opt, idx) => ({
      option: opt,
      originalIndex: idx,
    }));

    // Shuffle using Fisher-Yates algorithm
    for (let i = optionsWithIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsWithIndices[i], optionsWithIndices[j]] = [
        optionsWithIndices[j],
        optionsWithIndices[i],
      ];
    }

    // Extract shuffled options and find new correct answer index
    const shuffledOptions = optionsWithIndices.map((item) => item.option);
    const newCorrectIndex = optionsWithIndices.findIndex(
      (item) => item.originalIndex === question.correctAnswer,
    );

    return {
      ...question,
      options: shuffledOptions,
      correctAnswer: newCorrectIndex,
      originalCorrectAnswer: question.correctAnswer, // Keep original for reference
    };
  };

  // Get ALL aircraft questions regardless of selected types
  const getAllAircraftQuestions = () => {
    const all = [];
    const quizTypes = [
      "multipleChoice",
      "trueFalse",
      "reorderSequence",
      "matchItems",
    ];
    quizTypes.forEach((type) => {
      const questions = questionDatabase[type] || [];
      questions.forEach((q) => {
        all.push({ ...q, questionType: type });
      });
    });
    return all;
  };

  const getCustomQuestions = () => {
    let questions = getAllQuestions();

    // Filter by selected topics
    if (selectedTopics.length > 0) {
      questions = questions.filter((q) => selectedTopics.includes(q.category));
    }

    // Filter by limitations if enabled
    if (limitationsOnly) {
      questions = questions.filter((q) => q.limitation === true);
    }

    return questions;
  };

  const getDueForReview = () => {
    const now = Date.now();
    const all = getAllQuestions();

    // Get questions that are due for review based on SM-2 SRS (exclude matchItems for flashcards)
    const dueQuestions = all.filter((q) => {
      // Exclude matchItems from flashcards
      if (q.questionType === "matchItems") return false;

      const srsInfo = srsData[q.id];
      if (!srsInfo) return true; // New questions are always due
      return !srsInfo.nextReview || srsInfo.nextReview <= now; // Check if review time has passed
    });

    // Sort by SM-2 priority (most urgent first)
    const questionIds = dueQuestions.map((q) => q.id);
    const sortedIds = sortQuestionsByPriority(questionIds, srsData);

    // Return questions in priority order
    return sortedIds
      .map((id) => dueQuestions.find((q) => q.id === id))
      .filter(Boolean);
  };

  const currentQuestion = currentQuestions[currentQuestionIndex];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only activate shortcuts when on study/quiz screen
      if (activeTab !== "study" || !currentQuestion) return;

      // Ignore if user is typing in an input field
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      // Arrow keys for navigation
      if (e.key === "ArrowLeft" && currentQuestionIndex > 0) {
        e.preventDefault();
        handlePrevious();
      } else if (
        e.key === "ArrowRight" &&
        currentQuestionIndex < currentQuestions.length - 1
      ) {
        e.preventDefault();
        handleNext();
      }

      // Space bar to submit (only if answer is provided and not already showing explanation)
      if (
        e.key === " " &&
        !showExplanation &&
        userAnswers[currentQuestion.id]
      ) {
        e.preventDefault();
        if (
          currentQuestion.questionType === "reorderSequence" ||
          currentQuestion.questionType === "matchItems"
        ) {
          setShowExplanation(true);
          const isCorrect = checkAnswer(
            currentQuestion,
            userAnswers[currentQuestion.id],
          );
          updatePerformance(currentQuestion, isCorrect);
        }
      }

      // Number keys 1-4 for multiple choice
      if (
        currentQuestion.questionType === "multipleChoice" &&
        !showExplanation
      ) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 4 && num <= currentQuestion.options.length) {
          e.preventDefault();
          handleAnswer(num - 1);
        }
      }

      // T/F keys for true/false questions
      if (currentQuestion.questionType === "trueFalse" && !showExplanation) {
        if (e.key.toLowerCase() === "t") {
          e.preventDefault();
          handleAnswer(true);
        } else if (e.key.toLowerCase() === "f") {
          e.preventDefault();
          handleAnswer(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeTab,
    currentQuestion,
    currentQuestionIndex,
    currentQuestions.length,
    showExplanation,
    userAnswers,
  ]);

  const handleReviewRate = (quality) => {
    // quality: 0 = "Don't Know", 5 = "Know It"
    // If rated 5 (Know It), remove from review lists
    if (quality === 5) {
      setReviewSessionCorrect((prev) => {
        if (!prev.includes(currentQuestion.id)) {
          return [...prev, currentQuestion.id];
        }
        return prev;
      });

      // Remove from current review session
      setCurrentQuestions((prev) => {
        const filtered = prev.filter((q) => q.id !== currentQuestion.id);

        // If this was the last question, finish the session
        if (filtered.length === 0) {
          setActiveTab("studycomplete");
          return prev;
        }

        // Stay on same index (which will now show the next question)
        // Don't call handleNext since we're already removing and repositioning
        return filtered;
      });

      // Don't call handleNext - we already handled navigation by removing the question
      return;
    }

    // For "Don't Know", just move to next question
    handleNext();
  };

  const handleAnswer = (answer) => {
    try {
      if (!currentQuestion || !currentQuestion.id) {
        console.error(
          "Invalid currentQuestion in handleAnswer:",
          currentQuestion,
        );
        return;
      }

      // CRITICAL: Use ref to immediately lock the question - prevents state update race condition
      if (lockedQuestions.current.has(currentQuestion.id)) {
        alert("BLOCKED in handleAnswer: Question already locked!");
        return; // Question already answered - don't allow changes
      }

      // Lock this question immediately (before state updates)
      lockedQuestions.current.add(currentQuestion.id);

      const newAnswers = { ...userAnswers, [currentQuestion.id]: answer };
      setUserAnswers(newAnswers);

      // For multiple choice and true/false, auto-submit immediately
      const autoSubmitTypes = ["multipleChoice", "trueFalse"];

      if (autoSubmitTypes.includes(currentQuestion.questionType)) {
        // Auto-submit for simple question types in both study and quiz mode
        // Only show explanation and grade if instant grade is enabled OR not in quiz mode
        if (instantGrade) {
          setShowExplanation(true);
        }

        // Only track performance immediately if instant grade is on
        // With instant grade off, we'll grade at the end
        if (instantGrade) {
          const isCorrect = checkAnswer(currentQuestion, answer);
          updatePerformance(currentQuestion, isCorrect);
        }
        return;
      }

      // For complex types (reorder, match), just save answer
      // User will submit manually for reorder, but auto-submit for match items
      if (currentQuestion.questionType === "matchItems") {
        // Check if all items are matched (using index-based matching)
        const allMatched = currentQuestion.pairs.every(
          (pair, index) => answer[index] !== undefined,
        );
        if (allMatched) {
          // Only show explanation if instant grade is enabled
          if (instantGrade) {
            setShowExplanation(true);
          }

          // Only track performance immediately if instant grade is on
          // With instant grade off, we'll grade at the end
          if (instantGrade) {
            const isCorrect = checkAnswer(currentQuestion, answer);
            updatePerformance(currentQuestion, isCorrect);
          }
        }
      }
    } catch (error) {
      console.error("Error in handleAnswer:", error, {
        currentQuestion,
        answer,
        studyMode,
      });
    }
  };

  const checkAnswer = (question, answer) => {
    try {
      switch (question.questionType) {
        case "multipleChoice":
          return answer === question.correctAnswer;
        case "trueFalse":
          return answer === question.correctAnswer;
        case "reorderSequence":
          if (!question.correctOrder) {
            console.error(
              "Missing correctOrder in reorderSequence question:",
              question,
            );
            return false;
          }
          return (
            JSON.stringify(answer) === JSON.stringify(question.correctOrder)
          );
        case "matchItems":
          if (!question.pairs) {
            console.error("Missing pairs in matchItems question:", question);
            return false;
          }
          // Index-based matching: answer[leftIndex] should equal leftIndex for correct match
          return question.pairs.every((pair, index) => answer[index] === index);
        case "fillInBlank":
          if (!question.steps) {
            console.error("Missing steps in fillInBlank question:", question);
            return false;
          }
          // Check if all blanks are filled correctly
          return question.steps.every((step, index) => {
            if (step.type === "none") return true;
            const correctAnswer = step.blank.toLowerCase().trim();
            const userAnswerText = (answer[index] || "").toLowerCase().trim();
            return userAnswerText === correctAnswer;
          });
        default:
          console.error(
            "Unknown question type in checkAnswer:",
            question.questionType,
          );
          return false;
      }
    } catch (error) {
      console.error("Error in checkAnswer:", error, { question, answer });
      return false;
    }
  };

  const updatePerformance = (question, isCorrect) => {
    try {
      // Skip stat tracking for learning path practice mode and study mode
      if (studyMode === "learningpath" || studyMode === "study") {
        return;
      }

      if (
        !question ||
        !question.id ||
        !question.category ||
        !question.questionType
      ) {
        console.error("Invalid question in updatePerformance:", question);
        return;
      }

      // Update SM-2 SRS data
      setSrsData((prev) => {
        const existingCard = prev[question.id];
        const quality = mapPerformanceToQuality(isCorrect);
        const updatedCard = calculateSM2(quality, existingCard);

        return {
          ...prev,
          [question.id]: updatedCard,
        };
      });

      // Update questionMastery (only in quiz mode, not study mode)
      setQuestionMastery((prev) => {
        const existing = prev[question.id] || {
          correctCount: 0,
          incorrectCount: 0,
          lastAnswered: null,
        };

        // Calculate new incorrectCount
        let newIncorrectCount;
        if (isCorrect) {
          // Reset to 0 when answered correctly
          newIncorrectCount = 0;
        } else {
          // Only set to 1 if currently 0 (first miss in regular quiz)
          // This prevents accumulating multiple incorrect counts
          newIncorrectCount =
            existing.incorrectCount === 0 ? 1 : existing.incorrectCount;
        }

        return {
          ...prev,
          [question.id]: {
            correctCount: isCorrect
              ? existing.correctCount + 1
              : existing.correctCount,
            incorrectCount: newIncorrectCount,
            lastAnswered: Date.now(),
          },
        };
      });

      setPerformanceStats((prev) => {
        const newStats = { ...prev };

        // Update overall
        if (isCorrect) {
          newStats.overall.correct++;
          newStats.overall.streak++;
          newStats.overall.bestStreak = Math.max(
            newStats.overall.streak,
            newStats.overall.bestStreak,
          );
        } else {
          newStats.overall.incorrect++;
          newStats.overall.streak = 0;
        }

        // Update by category
        if (!newStats.byCategory[question.category]) {
          newStats.byCategory[question.category] = { correct: 0, incorrect: 0 };
        }
        if (isCorrect) {
          newStats.byCategory[question.category].correct++;
        } else {
          newStats.byCategory[question.category].incorrect++;
        }

        // Update by question type
        if (!newStats.byQuestionType[question.questionType]) {
          newStats.byQuestionType[question.questionType] = {
            correct: 0,
            incorrect: 0,
          };
        }
        if (isCorrect) {
          newStats.byQuestionType[question.questionType].correct++;
        } else {
          newStats.byQuestionType[question.questionType].incorrect++;
        }

        return newStats;
      });

      // Update SRS data using SM-2 algorithm
      updateSRS(question, isCorrect);

      // Local-only mode - all data automatically saved to localStorage via useEffect hooks
    } catch (error) {
      console.error("Error in updatePerformance:", error, {
        question,
        isCorrect,
        studyMode,
      });
    }
  };

  // SM-2 Spaced Repetition Algorithm
  const updateSRS = (question, isCorrect) => {
    setSrsData((prev) => {
      const now = new Date().getTime();
      const questionId = question.id;
      const existing = prev[questionId] || {
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReview: now,
        lastReview: now,
      };

      let newEaseFactor, newInterval, newRepetitions;

      if (isCorrect) {
        // Correct answer
        if (existing.repetitions === 0) {
          newInterval = 1; // Review in 1 day
          newRepetitions = 1;
        } else if (existing.repetitions === 1) {
          newInterval = 6; // Review in 6 days
          newRepetitions = 2;
        } else {
          newInterval = Math.round(existing.interval * existing.easeFactor);
          newRepetitions = existing.repetitions + 1;
        }
        // Ease factor increases slightly with correct answers
        newEaseFactor = existing.easeFactor + 0.1;
        if (newEaseFactor > 2.5) newEaseFactor = 2.5;
      } else {
        // Incorrect answer - reset
        newRepetitions = 0;
        newInterval = 1;
        // Ease factor decreases with incorrect answers
        newEaseFactor = existing.easeFactor - 0.2;
        if (newEaseFactor < 1.3) newEaseFactor = 1.3;
      }

      const nextReview = now + newInterval * 24 * 60 * 60 * 1000; // Convert days to milliseconds

      return {
        ...prev,
        [questionId]: {
          easeFactor: newEaseFactor,
          interval: newInterval,
          repetitions: newRepetitions,
          nextReview: nextReview,
          lastReview: now,
        },
      };
    });
  };

  const handleNext = () => {
    // Validate currentQuestion exists
    if (!currentQuestion) {
      console.error("handleNext called with no currentQuestion");
      return;
    }

    // Auto-submit match items or reorder sequence if not yet submitted
    if (!showExplanation && currentQuestion) {
      if (
        currentQuestion.questionType === "matchItems" ||
        currentQuestion.questionType === "reorderSequence"
      ) {
        const answer = userAnswers[currentQuestion.id];
        if (answer) {
          try {
            // Auto-submit the answer before moving to next
            // Only show explanation if instant grade is enabled
            if (instantGrade) {
              setShowExplanation(true);
            }
            const isCorrect = checkAnswer(currentQuestion, answer);
            updatePerformance(currentQuestion, isCorrect);

            // In review mode, track correct answers in session
            if (studyMode === "study" && isCorrect) {
              setReviewSessionCorrect((prev) => {
                if (!prev.includes(currentQuestion.id)) {
                  return [...prev, currentQuestion.id];
                }
                return prev;
              });
            }

            // Only pause to show result if instant grade is enabled
            if (instantGrade) {
              return; // Don't move to next yet, let user see the result
            }
          } catch (error) {
            console.error(
              "Error auto-submitting answer in handleNext:",
              error,
              {
                question: currentQuestion,
                answer,
              },
            );
            // Continue to next question on error
          }
        }
      }
    }

    if (reviewIncorrectOnly) {
      // Move to next question in the incorrect questions list
      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowExplanation(false);
        return;
      } else {
        // Completed all review questions, remove correctly answered ones from review lists
        reviewSessionCorrect.forEach((questionId) => {
          // Remove from questionMastery incorrect count (set to 0)
          setQuestionMastery((prev) => {
            const updated = { ...prev };
            if (updated[questionId]) {
              updated[questionId] = {
                ...updated[questionId],
                incorrectCount: 0,
              };
            }
            return updated;
          });
        });

        setActiveTab("results");
        setReviewIncorrectOnly(false);
        setReviewSessionCorrect([]);
        return;
      }
    } else if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      // In quiz mode, keep explanation visible for already answered questions
      // In study mode, reset explanation for retrieval practice (science-based)
      if (studyMode === "quiz") {
        const nextQuestion = currentQuestions[currentQuestionIndex + 1];
        const hasAnswer =
          nextQuestion && userAnswers[nextQuestion.id] !== undefined;
        setShowExplanation(hasAnswer); // Show explanation if question was already answered
      } else {
        setShowExplanation(false); // Reset in study mode
      }
    }
  };

  const handlePrevious = () => {
    // Validate we're not at the start
    if (currentQuestionIndex <= 0) {
      return;
    }

    if (reviewIncorrectOnly) {
      // Move to previous question in the incorrect questions list
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setShowExplanation(false);
      }
    } else if (currentQuestionIndex > 0) {
      try {
        setCurrentQuestionIndex((prev) => prev - 1);
        // In quiz mode, keep explanation visible for already answered questions
        // In study mode, reset explanation for retrieval practice
        if (studyMode === "quiz") {
          const prevQuestion = currentQuestions[currentQuestionIndex - 1];
          const hasAnswer =
            prevQuestion && userAnswers[prevQuestion.id] !== undefined;
          setShowExplanation(hasAnswer); // Show explanation if question was already answered
        } else {
          setShowExplanation(false); // Reset in study mode
        }
      } catch (error) {
        console.error("Error in handlePrevious:", error);
      }
    }
  };

  const startLearningPathSection = (chapter, section) => {
    // Get questions for this section
    const sectionQuestions = getQuestionsForSection(section, getAllQuestions());

    if (sectionQuestions.length === 0) {
      alert("No questions available for this section yet.");
      return;
    }

    // Set up quiz session with these questions (practice mode - doesn't count toward stats)
    setCurrentQuestions(sectionQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    lockedQuestions.current.clear(); // Clear locked questions when starting new session
    setShowExplanation(false);
    setActiveTab("study");
  };

  const toggleFlag = () => {
    if (!currentQuestion) return;

    const wasFlaged = flaggedQuestions.includes(currentQuestion.id);

    if (wasFlaged) {
      // Unflagging - remove from flagged list
      setFlaggedQuestions((prev) =>
        prev.filter((id) => id !== currentQuestion.id),
      );

      // If in flagged review mode, remove this question from current session
      if (studyMode === "flagged" || reviewIncorrectOnly) {
        setCurrentQuestions((prev) => {
          const filtered = prev.filter((q) => q.id !== currentQuestion.id);

          // If this was the last question, go back to home
          if (filtered.length === 0) {
            setActiveTab("home");
            return prev;
          }

          // Adjust current index if needed
          if (currentQuestionIndex >= filtered.length) {
            setCurrentQuestionIndex(filtered.length - 1);
          }

          return filtered;
        });
      }
    } else {
      // Flagging - add to flagged list
      setFlaggedQuestions((prev) => [...prev, currentQuestion.id]);
    }

    // Local-only mode - flag changes automatically saved to localStorage via useEffect
  };

  // Helper function for font size classes
  const getFontSizeClass = () => {
    switch (fontSize) {
      case "small":
        return "text-sm";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) {
      return (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-400">
            No questions available. Adjust your filters.
          </p>
        </div>
      );
    }

    // Validate question has required fields
    if (!currentQuestion.question || !currentQuestion.questionType) {
      console.error("Invalid question structure:", currentQuestion);
      return (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-400">
            Error: Invalid question data. Question #{currentQuestionIndex + 1}
          </p>
          <button
            onClick={() => {
              if (currentQuestionIndex < currentQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              } else {
                setActiveTab("home");
              }
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Skip Question
          </button>
        </div>
      );
    }

    // Use Active Recall mode if in study mode with activeRecall, learnNew, or review sub-modes
    if (
      studyMode === "study" &&
      (studySubMode === "activeRecall" ||
        studySubMode === "learnNew" ||
        studySubMode === "review")
    ) {
      return (
        <ActiveRecall
          question={currentQuestion}
          onRate={(quality) => {
            // Update SM-2 SRS data
            setSrsData((prev) => {
              const existingCard = prev[currentQuestion.id];
              const updatedCard = calculateSM2(quality, existingCard);
              return {
                ...prev,
                [currentQuestion.id]: updatedCard,
              };
            });

            // Also update traditional mastery tracking
            const isCorrect = quality >= 3; // Quality 3+ means correct recall
            updatePerformance(currentQuestion, isCorrect);

            // Move to next question
            if (currentQuestionIndex < currentQuestions.length - 1) {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
              // Completed study session
              setActiveTab("studycomplete");
            }
          }}
          darkMode={darkMode}
        />
      );
    }

    // Regular question rendering for quiz mode, readThrough study mode, and learningpath
    try {
      const props = {
        question: currentQuestion,
        onAnswer: handleAnswer,
        showExplanation: showExplanation,
        userAnswer: userAnswers[currentQuestion.id],
        disabled: lockedQuestions.current.has(currentQuestion.id), // Use ref for immediate locking - prevents race conditions
        darkMode: darkMode,
        showCorrectness: studyMode !== "study", // Show green/red in quiz, but not in review mode
        fontSize: fontSize,
        compact: studyMode === "study", // Compact layout for review mode
        onRate: studyMode === "study" ? handleReviewRate : undefined, // Rating system for review mode
      };

      switch (currentQuestion.questionType) {
        case "multipleChoice":
          return <MultipleChoice {...props} />;
        case "trueFalse":
          return <TrueFalse {...props} />;
        case "reorderSequence":
          return <ReorderSequence {...props} />;
        case "matchItems":
          return <MatchItems {...props} />;
        case "fillInBlank":
          return <FillInBlank {...props} />;
        default:
          console.error("Unknown question type:", currentQuestion.questionType);
          return (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <p className="text-red-400">
                Unknown question type: {currentQuestion.questionType}
              </p>
            </div>
          );
      }
    } catch (error) {
      console.error("Error rendering question:", error, currentQuestion);
      return (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-400">
            Error rendering question. Please skip to the next one.
          </p>
          <button
            onClick={() => {
              if (currentQuestionIndex < currentQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              } else {
                setActiveTab("home");
              }
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Skip Question
          </button>
        </div>
      );
    }
  };

  const categories = [...new Set(getAllQuestions().map((q) => q.category))];
  const questionTypeLabels = {
    multipleChoice: "Multiple Choice",
    trueFalse: "True/False",
    reorderSequence: "Sequence Order",
    matchItems: "Match Items",
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${darkMode ? "bg-slate-800" : "bg-gray-200"}`}
    >
      {/* Header - Simplified */}
      <header
        className={`${darkMode ? "bg-slate-900/80" : "bg-white/80"} backdrop-blur border-b ${darkMode ? "border-slate-800" : "border-slate-200"} z-20 flex-shrink-0`}
      >
        <div className="container mx-auto px-4 py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {activeTab !== "home" && (
                <button
                  onClick={() => setActiveTab("home")}
                  className={`text-sm ${darkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"} transition-colors`}
                >
                  ← Home
                </button>
              )}
              <h1
                className={`text-sm font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                T6 Study Tool
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-1.5 sm:p-2 rounded-lg transition-colors touch-manipulation min-w-[32px] min-h-[32px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center ${
                  darkMode
                    ? "bg-slate-700 hover:bg-slate-600 text-yellow-400"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                }`}
                title={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>

              {/* Hidden font size and PDF controls for minimal interface */}
              {false && (
                <>
                  {/* Font Size Selector - Mobile Optimized */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span
                      className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-600"} hidden sm:inline`}
                    >
                      Text:
                    </span>
                    <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-800/50 p-0.5 sm:p-1 rounded-lg">
                      <button
                        onClick={() => setFontSize("small")}
                        className={`min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px] px-1.5 sm:px-2 py-1 rounded text-xs font-medium transition touch-manipulation ${
                          fontSize === "small"
                            ? "bg-blue-600 text-white"
                            : "text-slate-400 hover:text-white hover:bg-slate-700"
                        }`}
                        title="Small text"
                      >
                        A
                      </button>
                      <button
                        onClick={() => setFontSize("medium")}
                        className={`min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px] px-1.5 sm:px-2 py-1 rounded text-sm font-medium transition touch-manipulation ${
                          fontSize === "medium"
                            ? "bg-blue-600 text-white"
                            : "text-slate-400 hover:text-white hover:bg-slate-700"
                        }`}
                        title="Medium text"
                      >
                        A
                      </button>
                      <button
                        onClick={() => setFontSize("large")}
                        className={`min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px] px-1.5 sm:px-2 py-1 rounded text-base font-medium transition touch-manipulation ${
                          fontSize === "large"
                            ? "bg-blue-600 text-white"
                            : "text-slate-400 hover:text-white hover:bg-slate-700"
                        }`}
                        title="Large text"
                      >
                        A
                      </button>
                      <button
                        onClick={() => setFontSize("xlarge")}
                        className={`min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px] px-1.5 sm:px-2 py-1 rounded text-lg font-medium transition touch-manipulation ${
                          fontSize === "xlarge"
                            ? "bg-blue-600 text-white"
                            : "text-slate-400 hover:text-white hover:bg-slate-700"
                        }`}
                        title="Extra large text"
                      >
                        A
                      </button>
                    </div>
                  </div>

                  {/* PDF Reference Button */}
                  <a
                    href="https://www.sheppard.af.mil/Portals/65/T-6A%20Boldface%20Ops%20Limits%2C%201%20Jun%202023%20%28Filled%29.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg transition-all touch-manipulation min-h-[32px] sm:min-h-[40px] ${
                      darkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                    title="Official T-6A BOLDFACE Emergency Procedures and Operating Limitations PDF"
                  >
                    <FileText className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    <span className="hidden md:inline font-medium text-sm">
                      T-6A BOLDFACE Reference
                    </span>
                    <span className="md:hidden font-medium text-xs">PDF</span>
                    <ExternalLink className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main
        className="flex-1 overflow-y-auto overscroll-none"
        style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "none" }}
      >
        <div className="container mx-auto px-3 sm:px-4 py-1.5 sm:py-2">
          {/* Hidden navigation - removed for cleaner interface */}
          {false && activeTab !== "home" && (
            <div className="mb-2 sm:mb-3">
              <div
                className={`flex items-center justify-between gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl ${darkMode ? "bg-slate-800/50" : "bg-white/50"} backdrop-blur-sm border ${darkMode ? "border-slate-700" : "border-slate-200"}`}
              >
                {/* Left: Home + Current Mode */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setActiveTab("home")}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1 sm:gap-2 touch-manipulation text-sm sm:text-base ${
                      darkMode
                        ? "bg-slate-700 hover:bg-slate-600 text-white"
                        : "bg-slate-200 hover:bg-slate-300 text-slate-900"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4 rotate-180 hidden sm:inline" />
                    <span className="hidden sm:inline">Home</span>
                    <span className="sm:hidden">← Home</span>
                  </button>

                  {/* Current Mode Indicator */}
                  {(activeTab === "study" ||
                    activeTab === "studysetup" ||
                    activeTab === "quizsetup") && (
                    <div className="flex items-center gap-2 px-3 py-2">
                      <Brain className="w-4 h-4 text-orange-400" />
                      <span
                        className={`font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
                      >
                        Quiz Mode
                      </span>
                    </div>
                  )}

                  {activeTab === "progress" && (
                    <div className="flex items-center gap-2 px-3 py-2">
                      <TrendingUp className="w-4 h-4 text-indigo-400" />
                      <span
                        className={`font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
                      >
                        Progress
                      </span>
                    </div>
                  )}
                </div>

                {/* Right: Quick Actions */}
                <div className="flex items-center gap-2">
                  {/* Exit Quiz Button - Only in quiz mode */}
                  {studyMode === "quiz" && activeTab === "study" && (
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to exit this quiz? Your progress will be saved.",
                          )
                        ) {
                          setActiveTab("results");
                        }
                      }}
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                        darkMode
                          ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                      }`}
                    >
                      <XCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">Exit Quiz</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Submit Quiz Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => {
                    // If instant grade is OFF, grade all questions now
                    if (!instantGrade) {
                      currentQuestions.forEach((question) => {
                        const userAnswer = userAnswers[question.id];
                        // Only track performance for questions that were actually answered
                        if (userAnswer !== undefined) {
                          const isCorrect = checkAnswer(question, userAnswer);
                          updatePerformance(question, isCorrect);
                        }
                        // Don't track unanswered questions as incorrect
                      });
                    }
                    // Go to results (already graded if instant grade was ON)
                    setActiveTab("results");
                  }}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                    darkMode
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  } shadow-lg hover:scale-105 active:scale-95`}
                >
                  {instantGrade ? "View Results" : "Submit Quiz"}
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          {activeTab === "home" ? (
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              {/* Mastery Progress Section */}
              <div
                className={`max-w-2xl mx-auto mb-6 sm:mb-8 ${darkMode ? "bg-slate-800 border border-slate-700" : "bg-white"} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg`}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <h2
                    className={`text-xl font-semibold text-center ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    Mastery Progress
                  </h2>
                  <button
                    onClick={() => {
                      alert(
                        "A question is considered 'mastered' when you answer it correctly twice in a row.\n\n" +
                          "Mastered questions can be hidden from the topic sections to help you focus on material you haven't learned yet.",
                      );
                    }}
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      darkMode
                        ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                    title="What is mastery?"
                  >
                    ?
                  </button>
                </div>

                <p
                  className={`text-center mb-4 font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                >
                  {(() => {
                    // Get total count across ALL questions (aircraft + aerospace physiology + T6 Ops Limits)
                    const totalQuestions =
                      getAllAircraftQuestions().length +
                      getAllAerospacePhysiologyQuestions().length +
                      getLimitationQuestions().length;
                    const masteredCount = Object.values(questionMastery).filter(
                      (m) => (m?.correctCount || 0) >= 3,
                    ).length;
                    const percentage =
                      totalQuestions > 0
                        ? Math.round((masteredCount / totalQuestions) * 100)
                        : 0;

                    return (
                      <>
                        {masteredCount} / {totalQuestions} questions mastered
                        <span
                          className={`ml-2 ${darkMode ? "text-slate-400" : "text-slate-500"}`}
                        >
                          ({percentage}%)
                        </span>
                      </>
                    );
                  })()}
                </p>

                {/* Checkboxes */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mb-4">
                  <label
                    className={`flex items-center gap-2 cursor-pointer ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    <input
                      type="checkbox"
                      checked={hideMasteredQuestions}
                      onChange={(e) =>
                        setHideMasteredQuestions(e.target.checked)
                      }
                      className="w-5 h-5 sm:w-4 sm:h-4 rounded"
                    />
                    <span className="text-sm sm:text-sm">
                      Hide mastered questions
                    </span>
                  </label>
                  <label
                    className={`flex items-center gap-2 cursor-pointer ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    <input
                      type="checkbox"
                      checked={instantGrade}
                      onChange={(e) => setInstantGrade(e.target.checked)}
                      className="w-5 h-5 sm:w-4 sm:h-4 rounded"
                    />
                    <span className="text-sm sm:text-sm">Instant Grade</span>
                  </label>
                </div>
              </div>

              {/* Choose Your Challenge Section */}
              <div
                className={`max-w-2xl mx-auto mb-6 sm:mb-8 ${darkMode ? "bg-slate-800 border border-slate-700" : "bg-white"} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg`}
              >
                <h2
                  className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  Choose Your Challenge
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {/* Quickie - 10 questions */}
                  <button
                    onClick={() => {
                      setQuestionCount(10);
                      // Auto-select all topics
                      const allCategories = [
                        ...new Set(getAllQuestions().map((q) => q.category)),
                      ];
                      setSelectedTopics(allCategories);
                      setShowQuizSetup(true);
                      setActiveTab("quizsetup");
                    }}
                    className={`${darkMode ? "bg-slate-700 hover:bg-slate-600 border-slate-600" : "bg-slate-100 hover:bg-slate-200 border-slate-300"} rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all border active:scale-95`}
                  >
                    <h3
                      className={`text-sm sm:text-base font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                      Quickie
                    </h3>
                    <p
                      className={`text-xs mt-0.5 sm:mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                    >
                      10 questions
                    </p>
                  </button>

                  {/* Not-Quickie - 50 questions */}
                  <button
                    onClick={() => {
                      setQuestionCount(50);
                      // Auto-select all topics
                      const allCategories = [
                        ...new Set(getAllQuestions().map((q) => q.category)),
                      ];
                      setSelectedTopics(allCategories);
                      setShowQuizSetup(true);
                      setActiveTab("quizsetup");
                    }}
                    className={`${darkMode ? "bg-slate-700 hover:bg-slate-600 border-slate-600" : "bg-slate-100 hover:bg-slate-200 border-slate-300"} rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all border active:scale-95`}
                  >
                    <h3
                      className={`text-sm sm:text-base font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                      Not-Quickie
                    </h3>
                    <p
                      className={`text-xs mt-0.5 sm:mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                    >
                      50 questions
                    </p>
                  </button>

                  {/* Marathon - 100 questions */}
                  <button
                    onClick={() => {
                      setQuestionCount(100);
                      // Auto-select all topics
                      const allCategories = [
                        ...new Set(getAllQuestions().map((q) => q.category)),
                      ];
                      setSelectedTopics(allCategories);
                      setShowQuizSetup(true);
                      setActiveTab("quizsetup");
                    }}
                    className={`${darkMode ? "bg-slate-700 hover:bg-slate-600 border-slate-600" : "bg-slate-100 hover:bg-slate-200 border-slate-300"} rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all border active:scale-95`}
                  >
                    <h3
                      className={`text-sm sm:text-base font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                      Marathon
                    </h3>
                    <p
                      className={`text-xs mt-0.5 sm:mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                    >
                      100 questions
                    </p>
                  </button>

                  {/* Boldface Procedures */}
                  <button
                    onClick={() => {
                      setActiveTab("boldface-procedures");
                    }}
                    className={`${darkMode ? "bg-slate-700 hover:bg-slate-600 border-slate-600" : "bg-slate-100 hover:bg-slate-200 border-slate-300"} rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all border active:scale-95`}
                  >
                    <h3
                      className={`text-sm sm:text-base font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                      Boldface Procedures
                    </h3>
                    <p
                      className={`text-xs mt-0.5 sm:mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                    >
                      Emergency procedures
                    </p>
                  </button>

                  {/* Incorrect - Review missed questions */}
                  <button
                    onClick={() => {
                      // Get ALL questions (aircraft + aerospace physiology) for review
                      const allAircraftQs = getAllAircraftQuestions();
                      const allAeroQs = getAllAerospacePhysiologyQuestions();
                      const allAvailableQs = [...allAircraftQs, ...allAeroQs];

                      const reviewQuestions = allAvailableQs.filter((q) => {
                        const mastery = questionMastery[q.id];
                        return mastery && mastery.incorrectCount >= 1;
                      });

                      if (reviewQuestions.length === 0) {
                        alert(
                          "No incorrect questions yet. Try taking a quiz first!",
                        );
                        return;
                      }

                      // Shuffle options for multiple choice questions
                      const shuffledReviewQs = reviewQuestions.map((q) =>
                        shuffleQuestionOptions(q),
                      );

                      setCurrentQuestions(shuffledReviewQs);
                      setCurrentQuestionIndex(0);
                      setUserAnswers({});
                      lockedQuestions.current.clear(); // Clear locked questions when starting new session
                      setShowExplanation(false);
                      setReviewIncorrectOnly(true);
                      setReviewSessionCorrect([]);
                      setActiveTab("study");
                    }}
                    className={`${darkMode ? "bg-slate-700 hover:bg-slate-600 border-slate-600" : "bg-slate-100 hover:bg-slate-200 border-slate-300"} rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all border active:scale-95`}
                  >
                    <h3
                      className={`text-sm sm:text-base font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                      Incorrect
                    </h3>
                    <p
                      className={`text-xs mt-0.5 sm:mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                    >
                      {
                        Object.values(questionMastery).filter(
                          (m) => m.incorrectCount >= 1,
                        ).length
                      }{" "}
                      questions
                    </p>
                  </button>
                </div>
              </div>

              {/* Practice by Topic Section */}
              <div
                className={`max-w-2xl mx-auto mb-6 sm:mb-8 ${darkMode ? "bg-slate-800 border border-slate-700" : "bg-white"} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg`}
              >
                <h2
                  className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  Practice by Topic
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {/* T6 Ops Limits Button */}
                  {(() => {
                    // Count mastery for T6 Ops Limits questions
                    const boldFaceQuestions = getLimitationQuestions();

                    const masteredCount = boldFaceQuestions.filter((q) => {
                      const mastery = questionMastery[q.id];
                      return mastery && (mastery.correctCount || 0) >= 3;
                    }).length;
                    const totalCount = boldFaceQuestions.length;
                    const masteryPercentage =
                      totalCount > 0 ? (masteredCount / totalCount) * 100 : 0;

                    // Color coding: red (0%) -> yellow (50%) -> green (100%)
                    let masteryColor = "";
                    if (masteryPercentage >= 80) {
                      masteryColor = darkMode
                        ? "text-green-400"
                        : "text-green-600";
                    } else if (masteryPercentage >= 60) {
                      masteryColor = darkMode
                        ? "text-lime-400"
                        : "text-lime-600";
                    } else if (masteryPercentage >= 40) {
                      masteryColor = darkMode
                        ? "text-yellow-400"
                        : "text-yellow-600";
                    } else if (masteryPercentage >= 20) {
                      masteryColor = darkMode
                        ? "text-orange-400"
                        : "text-orange-600";
                    } else {
                      masteryColor = darkMode ? "text-red-400" : "text-red-600";
                    }

                    return (
                      <button
                        onClick={() => setActiveTab("boldface")}
                        className={`${darkMode ? "bg-slate-700 hover:bg-slate-600 border-slate-600" : "bg-slate-100 hover:bg-slate-200 border-slate-300"} rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all border active:scale-95`}
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-2xl mb-1">📂</span>
                          <h3
                            className={`text-sm sm:text-base font-semibold text-center ${darkMode ? "text-white" : "text-slate-900"}`}
                          >
                            T6 Ops Limits
                          </h3>
                          <p
                            className={`text-xs mt-0.5 sm:mt-1 font-medium ${masteryColor}`}
                          >
                            {masteredCount}/{totalCount} mastered
                          </p>
                        </div>
                      </button>
                    );
                  })()}

                  {/* Aerospace Physiology Button */}
                  {(() => {
                    // Count mastery for ONLY Aerospace Physiology questions
                    const aeroQuestions = getAllAerospacePhysiologyQuestions();

                    const masteredCount = aeroQuestions.filter((q) => {
                      const mastery = questionMastery[q.id];
                      return mastery && (mastery.correctCount || 0) >= 3;
                    }).length;
                    const totalCount = aeroQuestions.length;
                    const masteryPercentage =
                      totalCount > 0 ? (masteredCount / totalCount) * 100 : 0;

                    // Color coding: red (0%) -> yellow (50%) -> green (100%)
                    let masteryColor = "";
                    if (masteryPercentage >= 80) {
                      masteryColor = darkMode
                        ? "text-green-400"
                        : "text-green-600";
                    } else if (masteryPercentage >= 60) {
                      masteryColor = darkMode
                        ? "text-lime-400"
                        : "text-lime-600";
                    } else if (masteryPercentage >= 40) {
                      masteryColor = darkMode
                        ? "text-yellow-400"
                        : "text-yellow-600";
                    } else if (masteryPercentage >= 20) {
                      masteryColor = darkMode
                        ? "text-orange-400"
                        : "text-orange-600";
                    } else {
                      masteryColor = darkMode ? "text-red-400" : "text-red-600";
                    }

                    return (
                      <button
                        onClick={() => setActiveTab("learningpath")}
                        className={`${darkMode ? "bg-slate-700 hover:bg-slate-600 border-slate-600" : "bg-slate-100 hover:bg-slate-200 border-slate-300"} rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all border active:scale-95`}
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-2xl mb-1">📁</span>
                          <h3
                            className={`text-sm sm:text-base font-semibold text-center ${darkMode ? "text-white" : "text-slate-900"}`}
                          >
                            Aerospace Physiology
                          </h3>
                          <p
                            className={`text-xs mt-0.5 sm:mt-1 font-medium ${masteryColor}`}
                          >
                            {masteredCount}/{totalCount} mastered
                          </p>
                        </div>
                      </button>
                    );
                  })()}
                </div>
              </div>

              {/* Print All Questions Section */}
              <div
                className={`max-w-2xl mx-auto mb-6 sm:mb-8 ${darkMode ? "bg-slate-800 border border-slate-700" : "bg-white"} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg`}
              >
                <h2
                  className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  Study Materials
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <button
                    onClick={() => setActiveTab("allquestions")}
                    className={`${darkMode ? "bg-slate-700 hover:bg-slate-600 border-slate-600" : "bg-slate-100 hover:bg-slate-200 border-slate-300"} rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all border active:scale-95`}
                  >
                    <h3
                      className={`text-sm sm:text-base font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                      View All Questions
                    </h3>
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        "https://www.sheppard.af.mil/Portals/65/808%20TRS%20Aerospace%20Physiology%20Study%20Guide.pdf",
                        "_blank",
                      )
                    }
                    className={`${darkMode ? "bg-slate-700 hover:bg-slate-600 border-slate-600" : "bg-slate-100 hover:bg-slate-200 border-slate-300"} rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all border active:scale-95`}
                  >
                    <h3
                      className={`text-sm sm:text-base font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                      Aerospace Physiology Study Guide
                    </h3>
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        "https://www.sheppard.af.mil/Portals/65/T-6A%20Boldface%20Ops%20Limits%2C%201%20Jun%202023%20%28Filled%29.pdf",
                        "_blank",
                      )
                    }
                    className={`${darkMode ? "bg-slate-700 hover:bg-slate-600 border-slate-600" : "bg-slate-100 hover:bg-slate-200 border-slate-300"} rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all border active:scale-95`}
                  >
                    <h3
                      className={`text-sm sm:text-base font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                      T6 Ops Limits PDF
                    </h3>
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === "quizsetup" ? (
            <div
              className={`max-w-2xl mx-auto ${darkMode ? "bg-slate-800/50" : "bg-white/50"} backdrop-blur-xl rounded-3xl p-8 shadow-2xl`}
            >
              <div className="text-center mb-8">
                <h2
                  className={`text-3xl font-semibold ${darkMode ? "text-white" : "text-slate-900"} mb-2`}
                >
                  Quiz Setup
                </h2>
                <p
                  className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  Select quiz type - {questionCount} questions
                </p>
              </div>

              {/* Quiz Type Selection */}
              <div className="mb-6">
                <h3
                  className={`text-sm font-medium mb-3 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                >
                  Select Quiz Type
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      console.log("Selecting T-6A Aircraft quiz");
                      setQuestionSet("aircraft");
                      setSelectedTopics([]);
                      // Reset to default aircraft question types
                      setSelectedQuestionTypes([
                        "multipleChoice",
                        "trueFalse",
                        "reorderSequence",
                        "matchItems",
                      ]);
                    }}
                    className={`p-4 rounded-xl text-left transition-all ${
                      questionSet === "aircraft"
                        ? darkMode
                          ? "bg-slate-600 border-2 border-slate-500"
                          : "bg-slate-100 border-2 border-slate-400"
                        : darkMode
                          ? "bg-slate-700/50 hover:bg-slate-700 border-2 border-transparent"
                          : "bg-white hover:bg-slate-50 border-2 border-slate-200"
                    }`}
                  >
                    <div
                      className={`font-semibold ${questionSet === "aircraft" ? (darkMode ? "text-white" : "text-slate-900") : darkMode ? "text-slate-300" : "text-slate-700"}`}
                    >
                      T-6A Aircraft
                    </div>
                    <div
                      className={`text-xs mt-1 ${questionSet === "aircraft" ? (darkMode ? "text-slate-300" : "text-slate-600") : darkMode ? "text-slate-400" : "text-slate-500"}`}
                    >
                      Boldface & Systems
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      console.log("Selecting Aerospace Physiology quiz");
                      setQuestionSet("aerophysiology");
                      // Auto-select all aerospace physiology topics - get unique categories from questions
                      const aeroQuestions =
                        getAllAerospacePhysiologyQuestions();
                      const aeroCategories = [
                        ...new Set(aeroQuestions.map((q) => q.category)),
                      ];
                      setSelectedTopics(aeroCategories);
                      // Also update selectedQuestionTypes for aero (only uses multiple choice)
                      setSelectedQuestionTypes(["multipleChoice"]);
                    }}
                    className={`p-4 rounded-xl text-left transition-all ${
                      questionSet === "aerophysiology"
                        ? darkMode
                          ? "bg-slate-600 border-2 border-slate-500"
                          : "bg-slate-100 border-2 border-slate-400"
                        : darkMode
                          ? "bg-slate-700/50 hover:bg-slate-700 border-2 border-transparent"
                          : "bg-white hover:bg-slate-50 border-2 border-slate-200"
                    }`}
                  >
                    <div
                      className={`font-semibold ${questionSet === "aerophysiology" ? (darkMode ? "text-white" : "text-slate-900") : darkMode ? "text-slate-300" : "text-slate-700"}`}
                    >
                      Aerospace Physiology
                    </div>
                    <div
                      className={`text-xs mt-1 ${questionSet === "aerophysiology" ? (darkMode ? "text-slate-300" : "text-slate-600") : darkMode ? "text-slate-400" : "text-slate-500"}`}
                    >
                      Hypoxia, Vision, G-Forces
                    </div>
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  try {
                    console.log("=== Starting Quiz ===");
                    console.log("Question Set:", questionSet);
                    console.log("Question Count:", questionCount);
                    console.log("Selected Topics:", selectedTopics);
                    console.log("Hide Mastered:", hideMasteredQuestions);

                    let all = [];

                    if (questionSet === "aerophysiology") {
                      // Get ALL aerospace physiology questions - no filtering
                      all = getAllAerospacePhysiologyQuestions();
                      console.log(
                        "✓ Aerospace physiology questions loaded:",
                        all.length,
                      );

                      // Ensure selectedQuestionTypes is set for aero
                      setSelectedQuestionTypes(["multipleChoice"]);
                    } else {
                      // Get T-6A aircraft questions
                      const quizTypes = [
                        "multipleChoice",
                        "trueFalse",
                        "reorderSequence",
                        "matchItems",
                      ];
                      setSelectedQuestionTypes(quizTypes);

                      quizTypes.forEach((type) => {
                        const questions = questionDatabase[type] || [];
                        questions.forEach((q) => {
                          all.push({ ...q, questionType: type });
                        });
                      });

                      // Filter aircraft questions by selected topics if any
                      if (selectedTopics.length > 0) {
                        all = all.filter((q) =>
                          selectedTopics.includes(q.category),
                        );
                      }
                    }

                    if (all.length === 0) {
                      alert(
                        "No questions available. Please select different options.",
                      );
                      return;
                    }

                    console.log("Questions before mastery filter:", all.length);

                    // Filter out mastered questions if checkbox is enabled
                    if (hideMasteredQuestions) {
                      all = all.filter((q) => {
                        const mastery = questionMastery[q.id];
                        return !mastery || (mastery.correctCount || 0) < 3;
                      });
                    }

                    console.log("Questions after mastery filter:", all.length);

                    if (all.length === 0) {
                      alert(
                        "No questions available after filtering. Try unchecking 'Hide mastered questions'.",
                      );
                      return;
                    }

                    // Shuffle questions
                    for (let i = all.length - 1; i > 0; i--) {
                      const j = Math.floor(Math.random() * (i + 1));
                      [all[i], all[j]] = [all[j], all[i]];
                    }

                    // Limit to selected count
                    const limitedQuestions = all.slice(0, questionCount);

                    // Shuffle options for multiple choice questions to make answers less predictable
                    const shuffledQuestions = limitedQuestions.map((q) =>
                      shuffleQuestionOptions(q),
                    );

                    console.log(
                      "Starting quiz with",
                      shuffledQuestions.length,
                      "questions",
                    );
                    setCurrentQuestions(shuffledQuestions);
                    setCurrentQuestionIndex(0);
                    setUserAnswers({});
                    lockedQuestions.current.clear(); // Clear locked questions when starting new session
                    setShowExplanation(false);
                    setActiveTab("study");
                    setShowQuizSetup(false);
                  } catch (error) {
                    console.error("Error starting quiz:", error);
                    alert("Error starting quiz: " + error.message);
                  }
                }}
                className={`w-full px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                  darkMode
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl"
                    : "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl"
                } active:scale-95`}
              >
                Start Quiz
              </button>
            </div>
          ) : activeTab === "studysetup" ? (
            <div
              className={`max-w-2xl mx-auto ${darkMode ? "bg-slate-800/50" : "bg-white/50"} backdrop-blur-xl rounded-3xl p-8 shadow-2xl`}
            >
              <div className="text-center mb-8">
                <h2
                  className={`text-3xl font-semibold ${darkMode ? "text-white" : "text-slate-900"} mb-2`}
                >
                  Study Setup
                </h2>
                <p
                  className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  Choose what to study
                </p>
              </div>

              {/* Study Options */}
              <div className="space-y-3 mb-8">
                {/* All Questions */}
                <button
                  onClick={() => {
                    const allCategories = [
                      ...new Set(getAllQuestions().map((q) => q.category)),
                    ];
                    setSelectedTopics(allCategories);
                    setSelectedQuestionTypes([
                      "multipleChoice",
                      "trueFalse",
                      "reorderSequence",
                      "matchItems",
                    ]);
                    setStudySubMode("readThrough");
                    setActiveTab("study");
                    setShowStudySetup(false);
                    loadQuestions("all");
                  }}
                  className={`w-full ${darkMode ? "bg-blue-500/20 hover:bg-blue-500/30 border-2 border-blue-500/50" : "bg-blue-100 hover:bg-blue-200 border-2 border-blue-300"} rounded-2xl p-5 transition text-left hover:scale-[1.02]`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`${darkMode ? "bg-blue-500/30" : "bg-blue-500/20"} p-3 rounded-xl`}
                      >
                        <BookOpen
                          className={`w-7 h-7 ${darkMode ? "text-blue-300" : "text-blue-600"}`}
                          strokeWidth={2.5}
                        />
                      </div>
                      <div>
                        <div
                          className={`font-semibold text-lg ${darkMode ? "text-white" : "text-slate-900"}`}
                        >
                          All Questions
                        </div>
                        <div
                          className={`text-sm ${darkMode ? "text-blue-300" : "text-blue-700"}`}
                        >
                          Study everything
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-medium ${darkMode ? "text-blue-300" : "text-blue-700"}`}
                    >
                      {getAllQuestions().length} questions
                    </div>
                  </div>
                </button>

                {/* Weak Questions - Only show if there are weak questions */}
                {Object.values(questionMastery).filter(
                  (q) => q.incorrectCount >= 2,
                ).length > 0 && (
                  <button
                    onClick={() => {
                      const weakCount = Object.values(questionMastery).filter(
                        (q) => q.incorrectCount >= 2,
                      ).length;
                      if (weakCount < 10) {
                        setQuestionCount(weakCount);
                      }
                      setActiveTab("study");
                      setShowStudySetup(false);
                      loadQuestions("weak");
                    }}
                    className={`w-full ${darkMode ? "bg-orange-500/20 hover:bg-orange-500/30 border-2 border-orange-500/50" : "bg-orange-100 hover:bg-orange-200 border-2 border-orange-300"} rounded-2xl p-5 transition text-left hover:scale-[1.02]`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`${darkMode ? "bg-orange-500/30" : "bg-orange-500/20"} p-3 rounded-xl`}
                        >
                          <AlertCircle
                            className={`w-7 h-7 ${darkMode ? "text-orange-300" : "text-orange-600"}`}
                            strokeWidth={2.5}
                          />
                        </div>
                        <div>
                          <div
                            className={`font-semibold text-lg ${darkMode ? "text-white" : "text-slate-900"}`}
                          >
                            Weak Questions
                          </div>
                          <div
                            className={`text-sm ${darkMode ? "text-orange-300" : "text-orange-700"}`}
                          >
                            Focus on problem areas
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-sm font-medium ${darkMode ? "text-orange-300" : "text-orange-700"}`}
                      >
                        {
                          Object.values(questionMastery).filter(
                            (q) => q.incorrectCount >= 2,
                          ).length
                        }{" "}
                        questions
                      </div>
                    </div>
                  </button>
                )}

                {/* Review Incorrect - Show questions answered incorrectly */}
                {Object.values(questionMastery).filter(
                  (q) => q.incorrectCount >= 1,
                ).length > 0 && (
                  <button
                    onClick={() => {
                      // Get ALL questions (aircraft + aerospace physiology) for review
                      const allAircraftQs = getAllAircraftQuestions();
                      const allAeroQs = getAllAerospacePhysiologyQuestions();
                      const allAvailableQs = [...allAircraftQs, ...allAeroQs];

                      const incorrectQs = allAvailableQs.filter((q) => {
                        const mastery = questionMastery[q.id];
                        return mastery && mastery.incorrectCount >= 1;
                      });

                      if (incorrectQs.length < 10) {
                        setQuestionCount(incorrectQs.length);
                      }

                      // Shuffle options for multiple choice questions
                      const shuffledIncorrectQs = incorrectQs.map((q) =>
                        shuffleQuestionOptions(q),
                      );

                      setCurrentQuestions(shuffledIncorrectQs);
                      setCurrentQuestionIndex(0);
                      setUserAnswers({});
                      lockedQuestions.current.clear(); // Clear locked questions when starting new session
                      setShowExplanation(false);
                      setReviewIncorrectOnly(true);
                      setActiveTab("study");
                      setShowStudySetup(false);
                    }}
                    className={`w-full ${darkMode ? "bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500/50" : "bg-red-100 hover:bg-red-200 border-2 border-red-300"} rounded-2xl p-5 transition text-left hover:scale-[1.02]`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`${darkMode ? "bg-red-500/30" : "bg-red-500/20"} p-3 rounded-xl`}
                        >
                          <XCircle
                            className={`w-7 h-7 ${darkMode ? "text-red-300" : "text-red-600"}`}
                            strokeWidth={2.5}
                          />
                        </div>
                        <div>
                          <div
                            className={`font-semibold text-lg ${darkMode ? "text-white" : "text-slate-900"}`}
                          >
                            Review Incorrect
                          </div>
                          <div
                            className={`text-sm ${darkMode ? "text-red-300" : "text-red-700"}`}
                          >
                            Re-test questions you missed
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-sm font-medium ${darkMode ? "text-red-300" : "text-red-700"}`}
                      >
                        {
                          Object.values(questionMastery).filter(
                            (q) => q.incorrectCount >= 1,
                          ).length
                        }{" "}
                        questions
                      </div>
                    </div>
                  </button>
                )}

                {/* Unknown Flashcards - Only show if there are unknown flashcards */}
              </div>
            </div>
          ) : activeTab === "progress" ? (
            <div className="max-w-3xl mx-auto px-4">
              <h2
                className={`text-2xl font-bold mb-6 text-center ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                Progress
              </h2>

              {/* Overall Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div
                  className={`${darkMode ? "bg-slate-800/50" : "bg-white"} rounded-xl p-4 text-center border ${darkMode ? "border-slate-700" : "border-slate-200"}`}
                >
                  <div className="text-3xl font-bold text-green-500">
                    {
                      Object.values(questionMastery).filter(
                        (q) => (q?.correctCount || 0) >= 3,
                      ).length
                    }
                  </div>
                  <div
                    className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Mastered
                  </div>
                </div>
                <div
                  className={`${darkMode ? "bg-slate-800/50" : "bg-white"} rounded-xl p-4 text-center border ${darkMode ? "border-slate-700" : "border-slate-200"}`}
                >
                  <div className="text-3xl font-bold text-blue-500">
                    {performanceStats.overall.correct +
                      performanceStats.overall.incorrect >
                    0
                      ? Math.round(
                          (performanceStats.overall.correct /
                            (performanceStats.overall.correct +
                              performanceStats.overall.incorrect)) *
                            100,
                        )
                      : 0}
                    %
                  </div>
                  <div
                    className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Accuracy
                  </div>
                </div>
                <div
                  className={`${darkMode ? "bg-slate-800/50" : "bg-white"} rounded-xl p-4 text-center border ${darkMode ? "border-slate-700" : "border-slate-200"}`}
                >
                  <div className="text-3xl font-bold text-orange-500">
                    {performanceStats.overall.bestStreak}
                  </div>
                  <div
                    className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Best Streak
                  </div>
                </div>
              </div>

              {/* Category Progress */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(() => {
                  const allQs = getAllQuestions();
                  const categoriesData = {};

                  allQs.forEach((q) => {
                    if (!categoriesData[q.category]) {
                      categoriesData[q.category] = { total: 0, mastered: 0 };
                    }
                    categoriesData[q.category].total++;
                    const mastery = questionMastery[q.id];
                    if (mastery && (mastery.correctCount || 0) >= 3) {
                      categoriesData[q.category].mastered++;
                    }
                  });

                  return Object.entries(categoriesData)
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map(([category, data]) => {
                      const percentage = Math.round(
                        (data.mastered / data.total) * 100,
                      );

                      return (
                        <div
                          key={category}
                          className={`${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200"} border rounded-xl p-3`}
                        >
                          <div
                            className={`text-xs font-semibold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}
                          >
                            {category}
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`flex-1 h-1.5 rounded-full overflow-hidden ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}
                            >
                              <div
                                className="h-full bg-blue-500 transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <div
                              className={`text-xs font-medium ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                            >
                              {data.mastered}/{data.total}
                            </div>
                          </div>
                        </div>
                      );
                    });
                })()}
              </div>
            </div>
          ) : activeTab === "allquestions" ? (
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h1
                    className={`text-3xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    All Quiz Questions
                  </h1>
                  <p
                    className={`text-sm mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    {(() => {
                      const aircraftCount = getAllQuestions().length;
                      const aeroCount =
                        getAllAerospacePhysiologyQuestions().length;
                      const total = aircraftCount + aeroCount;
                      return `${total} Total Questions (${aircraftCount} Aircraft + ${aeroCount} Aerospace Physiology)`;
                    })()}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("home")}
                  className={`px-4 py-2 rounded-lg ${darkMode ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-slate-200 hover:bg-slate-300 text-slate-900"}`}
                >
                  ← Back to Home
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(() => {
                  // Get both aircraft and aerospace physiology questions
                  const aircraftQuestions = getAllQuestions();
                  const aeroQuestions = getAllAerospacePhysiologyQuestions();
                  const allQuestions = [...aircraftQuestions, ...aeroQuestions];
                  let questionNumber = 1;

                  return allQuestions.map((q) => {
                    const currentNumber = questionNumber++;

                    return (
                      <div
                        key={q.id}
                        className={`p-6 rounded-lg border ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200"}`}
                      >
                        <div className="mb-3">
                          <span className="font-bold text-lg">
                            {currentNumber}. {q.question}
                          </span>
                        </div>

                        {q.questionType === "multipleChoice" && q.options && (
                          <div className="space-y-2">
                            {q.options.map((option, idx) => (
                              <div
                                key={idx}
                                className={
                                  darkMode ? "text-slate-300" : "text-slate-700"
                                }
                              >
                                <span
                                  className={
                                    q.correctAnswer === idx ? "font-bold" : ""
                                  }
                                >
                                  {String.fromCharCode(97 + idx)}) {option}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {q.questionType === "trueFalse" && (
                          <div className="space-y-2">
                            <div
                              className={
                                darkMode ? "text-slate-300" : "text-slate-700"
                              }
                            >
                              <span
                                className={
                                  q.correctAnswer === true ? "font-bold" : ""
                                }
                              >
                                a) True
                              </span>
                            </div>
                            <div
                              className={
                                darkMode ? "text-slate-300" : "text-slate-700"
                              }
                            >
                              <span
                                className={
                                  q.correctAnswer === false ? "font-bold" : ""
                                }
                              >
                                b) False
                              </span>
                            </div>
                          </div>
                        )}

                        {q.questionType === "reorderSequence" && q.sequence && (
                          <div className="space-y-2">
                            <div
                              className={`text-sm font-bold mb-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                            >
                              Correct Order:
                            </div>
                            {q.sequence.map((step, idx) => (
                              <div
                                key={idx}
                                className={
                                  darkMode ? "text-slate-300" : "text-slate-700"
                                }
                              >
                                <span className="font-bold">
                                  {idx + 1}. {step}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {q.questionType === "matchItems" && q.pairs && (
                          <div className="space-y-2">
                            {q.pairs.map((pair, idx) => (
                              <div
                                key={idx}
                                className={
                                  darkMode ? "text-slate-300" : "text-slate-700"
                                }
                              >
                                <span className="font-bold">
                                  {pair.left} → {pair.right}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          ) : activeTab === "studycomplete" ? (
            <div className="max-w-4xl mx-auto">
              {/* Study Session Complete */}
              <div
                className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl p-6 mb-6`}
              >
                <div className="text-center mb-8">
                  <div className="inline-block p-4 rounded-full bg-green-500/20 mb-4">
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                  </div>
                  <h2
                    className={`text-3xl font-bold ${darkMode ? "text-white" : "text-slate-900"} mb-2`}
                  >
                    Study Session Complete! 🎉
                  </h2>
                  <p
                    className={`text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    You&apos;ve reviewed all {currentQuestions?.length || 0}{" "}
                    questions
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div
                    className={`${darkMode ? "bg-slate-700/50" : "bg-slate-50"} rounded-lg p-4 text-center`}
                  >
                    <BookOpen
                      className={`w-8 h-8 mx-auto mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                    />
                    <p
                      className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                      {currentQuestions?.length || 0}
                    </p>
                    <p
                      className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                    >
                      Questions Studied
                    </p>
                  </div>

                  <div
                    className={`${darkMode ? "bg-slate-700/50" : "bg-slate-50"} rounded-lg p-4 text-center`}
                  >
                    <Target
                      className={`w-8 h-8 mx-auto mb-2 ${darkMode ? "text-green-400" : "text-green-600"}`}
                    />
                    <p
                      className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                      {currentQuestions?.length > 0
                        ? new Set(currentQuestions.map((q) => q.category)).size
                        : 0}
                    </p>
                    <p
                      className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                    >
                      Topics Covered
                    </p>
                  </div>

                  <div
                    className={`${darkMode ? "bg-slate-700/50" : "bg-slate-50"} rounded-lg p-4 text-center`}
                  >
                    <Clock
                      className={`w-8 h-8 mx-auto mb-2 ${darkMode ? "text-purple-400" : "text-purple-600"}`}
                    />
                    <p
                      className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                      Study
                    </p>
                    <p
                      className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                    >
                      Mode
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => {
                      // If in learning path mode, return to learning path; otherwise go home
                      setActiveTab(
                        studyMode === "learningpath" ? "learningpath" : "home",
                      );
                      setUserAnswers({});
                      lockedQuestions.current.clear(); // Clear locked questions when starting new session
                      setCurrentQuestionIndex(0);
                      setShowExplanation(false);
                    }}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition ${
                      darkMode
                        ? "bg-slate-700 hover:bg-slate-600 text-white"
                        : "bg-slate-300 hover:bg-slate-400 text-slate-900"
                    }`}
                  >
                    {studyMode === "learningpath"
                      ? "Back to Categories"
                      : "Return to Main Menu"}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentQuestionIndex(0);
                      setShowExplanation(false);
                      setUserAnswers({});
                      lockedQuestions.current.clear(); // Clear locked questions when starting new session
                      setActiveTab("study");
                    }}
                    className="flex-1 px-6 py-3 rounded-lg font-medium transition bg-green-600 hover:bg-green-700 text-white"
                  >
                    Study Again
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === "results" ? (
            <div className="max-w-3xl mx-auto px-4">
              {/* Quiz Results */}
              <div className="mb-8">
                <h2
                  className={`text-3xl font-bold text-center mb-8 ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  Quiz Results
                </h2>

                {/* Score Summary */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div
                    className={`p-6 rounded-xl text-center border ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200"}`}
                  >
                    <div
                      className={`text-3xl font-bold mb-2 ${darkMode ? "text-green-400" : "text-green-600"}`}
                    >
                      {
                        Object.keys(userAnswers).filter((id) => {
                          const question = currentQuestions.find(
                            (q) => q.id === id,
                          );
                          return (
                            question && checkAnswer(question, userAnswers[id])
                          );
                        }).length
                      }
                      /{currentQuestions.length}
                    </div>
                    <div
                      className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                    >
                      Correct
                    </div>
                  </div>
                  <div
                    className={`p-6 rounded-xl text-center border ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200"}`}
                  >
                    <div
                      className={`text-3xl font-bold mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                    >
                      {Math.round(
                        (Object.keys(userAnswers).filter((id) => {
                          const question = currentQuestions.find(
                            (q) => q.id === id,
                          );
                          return (
                            question && checkAnswer(question, userAnswers[id])
                          );
                        }).length /
                          currentQuestions.length) *
                          100,
                      )}
                      %
                    </div>
                    <div
                      className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                    >
                      Accuracy
                    </div>
                  </div>
                </div>

                {/* Incorrect Questions */}
                {(() => {
                  const incorrectQuestions = currentQuestions.filter(
                    (question) => {
                      const userAnswer = userAnswers[question.id];
                      return (
                        userAnswer !== undefined &&
                        !checkAnswer(question, userAnswer)
                      );
                    },
                  );

                  return incorrectQuestions.length > 0 ? (
                    <div>
                      <h3
                        className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}
                      >
                        Questions to Review ({incorrectQuestions.length})
                      </h3>
                      <div className="space-y-6 mb-8">
                        {incorrectQuestions.map((question, index) => {
                          const userAnswer = userAnswers[question.id];
                          return (
                            <div
                              key={question.id}
                              className={`p-6 rounded-lg border ${
                                darkMode
                                  ? "bg-slate-800/50 border-slate-700"
                                  : "bg-white border-slate-200"
                              }`}
                            >
                              {/* Question Text */}
                              <div className="mb-4">
                                <div className="flex items-start gap-2">
                                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                  <div
                                    className={`font-semibold text-base ${darkMode ? "text-white" : "text-slate-900"}`}
                                  >
                                    {question.question}
                                  </div>
                                </div>
                              </div>

                              {/* Multiple Choice Options */}
                              {question.questionType === "multipleChoice" &&
                                question.options && (
                                  <div className="space-y-2">
                                    {question.options.map((option, idx) => {
                                      const isUserAnswer = userAnswer === idx;
                                      const isCorrectAnswer =
                                        question.correctAnswer === idx;

                                      return (
                                        <div
                                          key={idx}
                                          className={`p-3 rounded-lg border-2 ${
                                            isCorrectAnswer
                                              ? darkMode
                                                ? "bg-green-900/30 border-green-600 text-green-400"
                                                : "bg-green-50 border-green-500 text-green-700"
                                              : isUserAnswer
                                                ? darkMode
                                                  ? "bg-red-900/30 border-red-600 text-red-400"
                                                  : "bg-red-50 border-red-500 text-red-700"
                                                : darkMode
                                                  ? "bg-slate-700/30 border-slate-600 text-slate-400"
                                                  : "bg-slate-50 border-slate-300 text-slate-600"
                                          }`}
                                        >
                                          <div className="flex items-start gap-2">
                                            <span className="font-bold">
                                              {String.fromCharCode(97 + idx)})
                                            </span>
                                            <span className="flex-1">
                                              {option}
                                            </span>
                                            {isCorrectAnswer && (
                                              <span className="text-xs font-bold">
                                                ✓ CORRECT
                                              </span>
                                            )}
                                            {isUserAnswer &&
                                              !isCorrectAnswer && (
                                                <span className="text-xs font-bold">
                                                  ✗ YOUR ANSWER
                                                </span>
                                              )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}

                              {/* True/False Options */}
                              {question.questionType === "trueFalse" && (
                                <div className="space-y-2">
                                  <div
                                    className={`p-3 rounded-lg border-2 ${
                                      question.correctAnswer === true
                                        ? darkMode
                                          ? "bg-green-900/30 border-green-600 text-green-400"
                                          : "bg-green-50 border-green-500 text-green-700"
                                        : userAnswer === true
                                          ? darkMode
                                            ? "bg-red-900/30 border-red-600 text-red-400"
                                            : "bg-red-50 border-red-500 text-red-700"
                                          : darkMode
                                            ? "bg-slate-700/30 border-slate-600 text-slate-400"
                                            : "bg-slate-50 border-slate-300 text-slate-600"
                                    }`}
                                  >
                                    <div className="flex items-start gap-2">
                                      <span className="font-bold">a)</span>
                                      <span className="flex-1">True</span>
                                      {question.correctAnswer === true && (
                                        <span className="text-xs font-bold">
                                          ✓ CORRECT
                                        </span>
                                      )}
                                      {userAnswer === true &&
                                        question.correctAnswer !== true && (
                                          <span className="text-xs font-bold">
                                            ✗ YOUR ANSWER
                                          </span>
                                        )}
                                    </div>
                                  </div>
                                  <div
                                    className={`p-3 rounded-lg border-2 ${
                                      question.correctAnswer === false
                                        ? darkMode
                                          ? "bg-green-900/30 border-green-600 text-green-400"
                                          : "bg-green-50 border-green-500 text-green-700"
                                        : userAnswer === false
                                          ? darkMode
                                            ? "bg-red-900/30 border-red-600 text-red-400"
                                            : "bg-red-50 border-red-500 text-red-700"
                                          : darkMode
                                            ? "bg-slate-700/30 border-slate-600 text-slate-400"
                                            : "bg-slate-50 border-slate-300 text-slate-600"
                                    }`}
                                  >
                                    <div className="flex items-start gap-2">
                                      <span className="font-bold">b)</span>
                                      <span className="flex-1">False</span>
                                      {question.correctAnswer === false && (
                                        <span className="text-xs font-bold">
                                          ✓ CORRECT
                                        </span>
                                      )}
                                      {userAnswer === false &&
                                        question.correctAnswer !== false && (
                                          <span className="text-xs font-bold">
                                            ✗ YOUR ANSWER
                                          </span>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Other question types */}
                              {(question.questionType === "reorderSequence" ||
                                question.questionType === "matchItems") && (
                                <div
                                  className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                                >
                                  <p>
                                    Your answer: {JSON.stringify(userAnswer)}
                                  </p>
                                  <p className="mt-2">
                                    Correct answer:{" "}
                                    {JSON.stringify(question.correctAnswer)}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null;
                })()}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setActiveTab("home");
                      setUserAnswers({});
                      lockedQuestions.current.clear(); // Clear locked questions when starting new session
                      setCurrentQuestionIndex(0);
                      setShowExplanation(false);
                    }}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition ${
                      darkMode
                        ? "bg-slate-700 hover:bg-slate-600 text-white"
                        : "bg-slate-300 hover:bg-slate-400 text-slate-900"
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      setCurrentQuestionIndex(0);
                      setShowExplanation(false);
                      setUserAnswers({});
                      lockedQuestions.current.clear(); // Clear locked questions when starting new session
                      setActiveTab("study");
                    }}
                    className="flex-1 px-6 py-3 rounded-lg font-medium transition bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === "aerophysiology" ? (
            <div
              className={`max-w-2xl mx-auto ${darkMode ? "bg-slate-800/50" : "bg-white/50"} backdrop-blur-xl rounded-3xl p-8 shadow-2xl`}
            >
              <div className="text-center mb-8">
                <h2
                  className={`text-3xl font-semibold ${darkMode ? "text-white" : "text-slate-900"} mb-2`}
                >
                  Aerospace Physiology Quiz
                </h2>
                <p
                  className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  Select topics to study
                </p>
              </div>

              {/* Topic Selection */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                {aerospacePhysiologyTopics.map((topic) => {
                  const topicQuestions =
                    getAllAerospacePhysiologyQuestions().filter(
                      (q) => q.category === topic.name,
                    );
                  const isSelected = selectedTopics.includes(topic.name);

                  return (
                    <button
                      key={topic.name}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedTopics(
                            selectedTopics.filter((t) => t !== topic.name),
                          );
                        } else {
                          setSelectedTopics([...selectedTopics, topic.name]);
                        }
                      }}
                      className={`p-4 rounded-xl text-left transition-all ${
                        isSelected
                          ? darkMode
                            ? "bg-cyan-500/30 border-2 border-cyan-500"
                            : "bg-cyan-100 border-2 border-cyan-500"
                          : darkMode
                            ? "bg-slate-700/50 hover:bg-slate-700 border-2 border-transparent"
                            : "bg-white hover:bg-slate-50 border-2 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div
                            className={`font-semibold ${isSelected ? "text-cyan-400" : darkMode ? "text-slate-300" : "text-slate-700"}`}
                          >
                            {topic.name}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isSelected
                                ? darkMode
                                  ? "bg-cyan-500/50 text-cyan-100"
                                  : "bg-cyan-200 text-cyan-800"
                                : darkMode
                                  ? "bg-slate-600 text-slate-300"
                                  : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {topicQuestions.length} Q
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Start Button */}
              <button
                onClick={() => {
                  if (selectedTopics.length === 0) {
                    alert("Please select at least one topic");
                    return;
                  }

                  const questions = getAllAerospacePhysiologyQuestions().filter(
                    (q) => selectedTopics.includes(q.category),
                  );

                  if (questions.length === 0) {
                    alert("No questions available for selected topics");
                    return;
                  }

                  // Shuffle options for multiple choice questions
                  const shuffledQuestions = questions.map((q) =>
                    shuffleQuestionOptions(q),
                  );

                  setCurrentQuestions(shuffledQuestions);
                  setCurrentQuestionIndex(0);
                  setUserAnswers({});
                  lockedQuestions.current.clear(); // Clear locked questions when starting new session
                  setShowExplanation(false);
                  setActiveTab("study");
                }}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  selectedTopics.length > 0
                    ? darkMode
                      ? "bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/50"
                      : "bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/50"
                    : darkMode
                      ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
                disabled={selectedTopics.length === 0}
              >
                Start Quiz (
                {selectedTopics.length > 0
                  ? getAllAerospacePhysiologyQuestions().filter((q) =>
                      selectedTopics.includes(q.category),
                    ).length
                  : 0}{" "}
                Questions)
              </button>

              {/* Back Button */}
              <div className="text-center mt-6">
                <button
                  onClick={() => setActiveTab("home")}
                  className={`${darkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} font-medium transition-colors`}
                >
                  ← Back to Home
                </button>
              </div>
            </div>
          ) : activeTab === "learningpath" ? (
            <div className="max-w-4xl mx-auto px-4">
              <h2
                className={`text-2xl font-bold mb-6 text-center ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                Study by Topic
              </h2>

              {/* Aerophysiology Topic */}
              <div className="mb-8">
                <h3
                  className={`text-xl font-bold mb-4 ${darkMode ? "text-cyan-400" : "text-cyan-600"}`}
                >
                  Aerospace Physiology
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(() => {
                    const aeroQuestions = getAllAerospacePhysiologyQuestions();
                    const aeroCategories = [
                      ...new Set(aeroQuestions.map((q) => q.category)),
                    ].sort();

                    return aeroCategories.map((category) => {
                      const categoryQuestions = aeroQuestions.filter(
                        (q) => q.category === category,
                      );
                      const masteredCount = categoryQuestions.filter((q) => {
                        const mastery = questionMastery[q.id];
                        return mastery && (mastery.correctCount || 0) >= 3;
                      }).length;

                      return (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            const filtered = aeroQuestions.filter(
                              (q) => q.category === category,
                            );

                            // Shuffle question order
                            for (let i = filtered.length - 1; i > 0; i--) {
                              const j = Math.floor(Math.random() * (i + 1));
                              [filtered[i], filtered[j]] = [
                                filtered[j],
                                filtered[i],
                              ];
                            }

                            // Shuffle options for multiple choice questions
                            const shuffledFiltered = filtered.map((q) =>
                              shuffleQuestionOptions(q),
                            );

                            setCurrentQuestions(shuffledFiltered);
                            setCurrentQuestionIndex(0);
                            setUserAnswers({});
                            lockedQuestions.current.clear(); // Clear locked questions when starting new session
                            setActiveTab("study");
                          }}
                          className={`${darkMode ? "bg-slate-800/50 hover:bg-slate-700/50 border-slate-700" : "bg-white hover:bg-slate-50 border-slate-200"} border rounded-xl p-4 transition-all hover:scale-105 active:scale-95 text-left`}
                        >
                          <h3
                            className={`font-semibold text-sm mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}
                          >
                            {category}
                          </h3>
                          <p
                            className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                          >
                            {masteredCount}/{categoryQuestions.length} mastered
                          </p>
                        </button>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
          ) : activeTab === "boldface" ? (
            <div className="max-w-4xl mx-auto px-4">
              <h2
                className={`text-2xl font-bold mb-6 text-center ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                T6 Ops Limits Practice
              </h2>

              {/* T6 Ops Limits Topics by Category */}
              <div className="mb-8">
                <h3
                  className={`text-xl font-bold mb-4 ${darkMode ? "text-red-400" : "text-red-600"}`}
                >
                  T6 Operating Limitations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(() => {
                    // Get all T6 Ops Limits questions
                    const boldFaceQuestions = getLimitationQuestions();

                    const boldFaceCategories = [
                      ...new Set(boldFaceQuestions.map((q) => q.category)),
                    ].sort();

                    return boldFaceCategories.map((category) => {
                      const categoryQuestions = boldFaceQuestions.filter(
                        (q) => q.category === category,
                      );
                      const masteredCount = categoryQuestions.filter((q) => {
                        const mastery = questionMastery[q.id];
                        return mastery && (mastery.correctCount || 0) >= 3;
                      }).length;

                      return (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            const filtered = boldFaceQuestions.filter(
                              (q) => q.category === category,
                            );

                            // Shuffle question order
                            for (let i = filtered.length - 1; i > 0; i--) {
                              const j = Math.floor(Math.random() * (i + 1));
                              [filtered[i], filtered[j]] = [
                                filtered[j],
                                filtered[i],
                              ];
                            }

                            // Shuffle options for multiple choice questions
                            const shuffledFiltered = filtered.map((q) =>
                              shuffleQuestionOptions(q),
                            );

                            setCurrentQuestions(shuffledFiltered);
                            setCurrentQuestionIndex(0);
                            setUserAnswers({});
                            lockedQuestions.current.clear(); // Clear locked questions when starting new session
                            setActiveTab("study");
                          }}
                          className={`${darkMode ? "bg-slate-800/50 hover:bg-slate-700/50 border-slate-700" : "bg-white hover:bg-slate-50 border-slate-200"} border rounded-xl p-4 transition-all hover:scale-105 active:scale-95 text-left`}
                        >
                          <h3
                            className={`font-semibold text-sm mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}
                          >
                            {category}
                          </h3>
                          <p
                            className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                          >
                            {masteredCount}/{categoryQuestions.length} mastered
                          </p>
                        </button>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Back button */}
              <div className="mt-8">
                <button
                  onClick={() => setActiveTab("home")}
                  className={`${darkMode ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-slate-200 hover:bg-slate-300 text-slate-900"} px-6 py-3 rounded-lg font-medium transition-all active:scale-95`}
                >
                  ← Back to Home
                </button>
              </div>
            </div>
          ) : activeTab === "boldface-procedures" ? (
            (() => {
              const procedures = getAllBoldfaceProcedures();

              const handleBoldfaceInput = (procId, stepIndex, value) => {
                if (boldfaceSubmitted) return;
                setBoldfaceAnswers({
                  ...boldfaceAnswers,
                  [`${procId}-${stepIndex}`]: value,
                });
              };

              const handleBoldfaceSubmit = () => {
                setBoldfaceSubmitted(true);
              };

              const checkBoldfaceAnswer = (procId, stepIndex, proc) => {
                const step = proc.steps[stepIndex];
                if (!step || step.type === "none") return null;

                const userAnswer =
                  boldfaceAnswers[`${procId}-${stepIndex}`] || "";
                const correctAnswer = step.blank.toLowerCase().trim();
                const userAnswerNormalized = userAnswer.toLowerCase().trim();

                return userAnswerNormalized === correctAnswer;
              };

              // Allow submitting even if not all answers are filled
              const hasAnyAnswer = Object.keys(boldfaceAnswers).some((key) =>
                boldfaceAnswers[key]?.trim(),
              );

              return (
                <div className="max-w-5xl mx-auto px-4 py-8">
                  <div className="mb-6 flex justify-between items-center">
                    <h1
                      className={`text-2xl sm:text-3xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                      T-6A BOLDFACE Emergency Procedures
                    </h1>
                    <button
                      onClick={() => {
                        setActiveTab("home");
                        setBoldfaceAnswers({});
                        setBoldfaceSubmitted(false);
                      }}
                      className={`px-4 py-2 rounded-lg ${darkMode ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-slate-200 hover:bg-slate-300 text-slate-900"}`}
                    >
                      ← Back
                    </button>
                  </div>

                  <div
                    className={`${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"} border-2 rounded-lg p-6 space-y-6`}
                  >
                    {procedures.map((proc) => (
                      <div
                        key={proc.id}
                        className={`${darkMode ? "border-slate-600" : "border-slate-300"} border-b pb-4 last:border-b-0`}
                      >
                        <h3
                          className={`text-lg font-bold mb-3 ${darkMode ? "text-red-400" : "text-red-600"}`}
                        >
                          {proc.procedure}
                        </h3>
                        <div className="space-y-2">
                          {proc.steps.map((step, stepIndex) => (
                            <div
                              key={stepIndex}
                              className="flex flex-col sm:flex-row sm:items-center gap-2"
                            >
                              <span
                                className={`font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                              >
                                {step.text}
                              </span>
                              {step.type !== "none" && (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={
                                      boldfaceAnswers[
                                        `${proc.id}-${stepIndex}`
                                      ] || ""
                                    }
                                    onChange={(e) =>
                                      handleBoldfaceInput(
                                        proc.id,
                                        stepIndex,
                                        e.target.value,
                                      )
                                    }
                                    disabled={boldfaceSubmitted}
                                    placeholder=""
                                    className={`flex-1 min-w-[250px] px-3 py-1 rounded border-2 font-mono text-sm ${
                                      boldfaceSubmitted
                                        ? checkBoldfaceAnswer(
                                            proc.id,
                                            stepIndex,
                                            proc,
                                          )
                                          ? darkMode
                                            ? "bg-green-900/40 border-green-600 text-green-300"
                                            : "bg-green-100 border-green-500 text-green-800"
                                          : darkMode
                                            ? "bg-red-900/40 border-red-600 text-red-300"
                                            : "bg-red-100 border-red-500 text-red-800"
                                        : darkMode
                                          ? "bg-slate-700 border-slate-600 text-white"
                                          : "bg-white border-slate-300 text-slate-900"
                                    } ${boldfaceSubmitted ? "cursor-not-allowed" : ""}`}
                                  />
                                  {boldfaceSubmitted &&
                                    (checkBoldfaceAnswer(
                                      proc.id,
                                      stepIndex,
                                      proc,
                                    ) ? (
                                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    ) : (
                                      <div className="flex items-center gap-2">
                                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                        <span
                                          className={`font-bold text-lg px-3 py-1 rounded ${
                                            darkMode
                                              ? "bg-green-900/60 text-green-300 border-2 border-green-500"
                                              : "bg-green-100 text-green-800 border-2 border-green-600"
                                          }`}
                                        >
                                          {step.blank}
                                        </span>
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Submit Button */}
                  {!boldfaceSubmitted && (
                    <div className="mt-6">
                      <button
                        onClick={handleBoldfaceSubmit}
                        disabled={!hasAnyAnswer}
                        className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                          hasAnyAnswer
                            ? darkMode
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                            : darkMode
                              ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                              : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        Submit Answers
                      </button>
                    </div>
                  )}
                </div>
              );
            })()
          ) : currentQuestions.length === 0 ? (
            <div className="max-w-4xl mx-auto">
              <div
                className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl p-8 text-center`}
              >
                <AlertCircle
                  className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}
                />
                <h2
                  className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  No Questions Available
                </h2>
                <p
                  className={`mb-6 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  Please select topics and question types to begin studying.
                </p>
                <button
                  onClick={() => setActiveTab("home")}
                  className={`px-6 py-3 rounded-lg font-medium transition ${
                    darkMode
                      ? "bg-slate-700 hover:bg-slate-600 text-white"
                      : "bg-slate-300 hover:bg-slate-400 text-slate-900"
                  }`}
                >
                  ← Back to Home
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto px-4 py-8">
              {/* Header with Back Button */}
              <div className="mb-6 flex justify-between items-center">
                <h1
                  className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  Quiz - {currentQuestions.length} Questions
                </h1>
                <button
                  onClick={() => {
                    setActiveTab("home");
                    setUserAnswers({});
                    lockedQuestions.current.clear(); // Clear locked questions when starting new session
                    setCurrentQuestionIndex(0);
                  }}
                  className={`px-4 py-2 rounded-lg ${darkMode ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-slate-200 hover:bg-slate-300 text-slate-900"}`}
                >
                  ← Back to Home
                </button>
              </div>

              {/* All Questions in 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentQuestions.map((q, index) => {
                  const questionNumber = index + 1;
                  const userAnswer = userAnswers[q.id];

                  return (
                    <div
                      key={q.id}
                      className={`p-6 rounded-lg border ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200"}`}
                    >
                      <div className="mb-3">
                        <span
                          className={`font-bold text-base ${darkMode ? "text-white" : "text-slate-900"}`}
                        >
                          {questionNumber}. {q.question}
                        </span>
                      </div>

                      {q.questionType === "multipleChoice" && q.options && (
                        <div className="space-y-2">
                          {q.options.map((option, idx) => {
                            const isSelected = userAnswer === idx;
                            const isCorrect = q.correctAnswer === idx;
                            const showFeedback =
                              instantGrade && userAnswer !== undefined;

                            return (
                              <button
                                key={idx}
                                onClick={() => {
                                  const newAnswers = {
                                    ...userAnswers,
                                    [q.id]: idx,
                                  };
                                  setUserAnswers(newAnswers);
                                  // If instant grade is on, grade immediately
                                  if (instantGrade) {
                                    const correct = checkAnswer(q, idx);
                                    updatePerformance(q, correct);
                                  }
                                }}
                                className={`w-full text-left p-3 rounded-lg transition-all ${
                                  isSelected && showFeedback
                                    ? isCorrect
                                      ? darkMode
                                        ? "bg-green-600 text-white"
                                        : "bg-green-500 text-white"
                                      : darkMode
                                        ? "bg-red-600 text-white"
                                        : "bg-red-500 text-white"
                                    : isSelected
                                      ? darkMode
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-500 text-white"
                                      : darkMode
                                        ? "bg-slate-700/50 hover:bg-slate-600/50 text-slate-300"
                                        : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                                }`}
                              >
                                <span className="text-sm">
                                  <span className="font-bold">
                                    {String.fromCharCode(97 + idx)})
                                  </span>{" "}
                                  {option}
                                </span>
                              </button>
                            );
                          })}
                          {instantGrade && userAnswer !== undefined && (
                            <div
                              className={`text-xs mt-2 p-2 rounded ${
                                userAnswer === q.correctAnswer
                                  ? darkMode
                                    ? "bg-green-900/30 text-green-400"
                                    : "bg-green-100 text-green-700"
                                  : darkMode
                                    ? "bg-red-900/30 text-red-400"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {userAnswer === q.correctAnswer
                                ? "✓ Correct!"
                                : `✗ Correct answer: ${String.fromCharCode(97 + q.correctAnswer)}) ${q.options[q.correctAnswer]}`}
                            </div>
                          )}
                        </div>
                      )}

                      {q.questionType === "trueFalse" && (
                        <div className="space-y-2">
                          {(() => {
                            const isCorrect = userAnswer === q.correctAnswer;
                            const showFeedback =
                              instantGrade && userAnswer !== undefined;

                            return (
                              <>
                                <button
                                  onClick={() => {
                                    const newAnswers = {
                                      ...userAnswers,
                                      [q.id]: true,
                                    };
                                    setUserAnswers(newAnswers);
                                    // If instant grade is on, grade immediately
                                    if (instantGrade) {
                                      const correct = checkAnswer(q, true);
                                      updatePerformance(q, correct);
                                    }
                                  }}
                                  className={`w-full text-left p-3 rounded-lg transition-all ${
                                    userAnswer === true && showFeedback
                                      ? isCorrect
                                        ? "bg-green-600 text-white"
                                        : "bg-red-600 text-white"
                                      : userAnswer === true
                                        ? darkMode
                                          ? "bg-blue-600 text-white"
                                          : "bg-blue-500 text-white"
                                        : darkMode
                                          ? "bg-slate-700/50 hover:bg-slate-600/50 text-slate-300"
                                          : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                                  }`}
                                >
                                  <span className="text-sm">
                                    <span className="font-bold">a)</span> True
                                  </span>
                                </button>
                                <button
                                  onClick={() => {
                                    const newAnswers = {
                                      ...userAnswers,
                                      [q.id]: false,
                                    };
                                    setUserAnswers(newAnswers);
                                    // If instant grade is on, grade immediately
                                    if (instantGrade) {
                                      const correct = checkAnswer(q, false);
                                      updatePerformance(q, correct);
                                    }
                                  }}
                                  className={`w-full text-left p-3 rounded-lg transition-all ${
                                    userAnswer === false && showFeedback
                                      ? isCorrect
                                        ? "bg-green-600 text-white"
                                        : "bg-red-600 text-white"
                                      : userAnswer === false
                                        ? darkMode
                                          ? "bg-blue-600 text-white"
                                          : "bg-blue-500 text-white"
                                        : darkMode
                                          ? "bg-slate-700/50 hover:bg-slate-600/50 text-slate-300"
                                          : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                                  }`}
                                >
                                  <span className="text-sm">
                                    <span className="font-bold">b)</span> False
                                  </span>
                                </button>
                                {showFeedback && (
                                  <div
                                    className={`text-xs mt-2 p-2 rounded ${
                                      isCorrect
                                        ? darkMode
                                          ? "bg-green-900/30 text-green-400"
                                          : "bg-green-100 text-green-700"
                                        : darkMode
                                          ? "bg-red-900/30 text-red-400"
                                          : "bg-red-100 text-red-700"
                                    }`}
                                  >
                                    {isCorrect
                                      ? "✓ Correct!"
                                      : `✗ Correct answer: ${q.correctAnswer ? "a) True" : "b) False"}`}
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      )}

                      {q.questionType === "reorderSequence" && q.sequence && (
                        <div className="space-y-2">
                          <div
                            className={`text-xs mb-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                          >
                            (Reorder question - use original quiz for this type)
                          </div>
                          {q.sequence.map((step, idx) => (
                            <div
                              key={idx}
                              className={`text-sm p-2 rounded ${darkMode ? "bg-slate-700/50 text-slate-300" : "bg-slate-50 text-slate-700"}`}
                            >
                              {step}
                            </div>
                          ))}
                        </div>
                      )}

                      {q.questionType === "matchItems" && q.pairs && (
                        <div className="space-y-2">
                          <div
                            className={`text-xs mb-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                          >
                            (Match question - use original quiz for this type)
                          </div>
                          {q.pairs.map((pair, idx) => (
                            <div
                              key={idx}
                              className={`text-sm p-2 rounded ${darkMode ? "bg-slate-700/50 text-slate-300" : "bg-slate-50 text-slate-700"}`}
                            >
                              {pair.left} / {pair.right}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit Quiz Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => {
                    // If instant grade is OFF, grade all questions now
                    if (!instantGrade) {
                      currentQuestions.forEach((question) => {
                        const userAnswer = userAnswers[question.id];
                        // Only track performance for questions that were actually answered
                        if (userAnswer !== undefined) {
                          const isCorrect = checkAnswer(question, userAnswer);
                          updatePerformance(question, isCorrect);
                        }
                        // Don't track unanswered questions as incorrect
                      });
                    }
                    // Go to results (already graded if instant grade was ON)
                    setActiveTab("results");
                  }}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                    darkMode
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  } shadow-lg hover:scale-105 active:scale-95`}
                >
                  {instantGrade ? "View Results" : "Submit Quiz"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
