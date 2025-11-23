"use client";

import { useState, useEffect } from "react";
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

import { useSync } from "./components/AuthWrapper";

import MultipleChoice from "./components/MultipleChoice";
import TrueFalse from "./components/TrueFalse";
import ReorderSequence from "./components/ReorderSequence";
import MatchItems from "./components/MatchItems";
import Flashcard from "./components/Flashcard";
import ActiveRecall from "./components/ActiveRecall";
import LearningPath from "./components/LearningPath";
import VoiceRecall from "./components/VoiceRecall";
import CockpitReference from "./components/CockpitReference";
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

import { questionDatabase, getLimitationQuestions } from "./questionData";
import {
  aerospacePhysiologyTopics,
  getAllAerospacePhysiologyQuestions,
  getQuestionsByTopic as getAPQuestionsByTopic,
} from "./aerospacePhysiologyData";

export default function T6AEnhancedStudyTool() {
  // Get sync function from context
  const { triggerSync, isSyncing } = useSync();

  // UI State
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [studyMode, setStudyMode] = useState("study"); // 'study', 'quiz', 'custom', 'limitations'
  const [studySubMode, setStudySubMode] = useState("activeRecall"); // 'activeRecall', 'learnNew', 'review', 'readThrough'
  const [selectedCategory, setSelectedCategory] = useState("all"); // Category filter for study mode

  // Question State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
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

  // Listen for Supabase sync completion and reload data
  useEffect(() => {
    const handleSyncComplete = (event) => {
      console.log("🎯 [APP] Received sync-complete event:", event.detail);
      console.log(
        "🔄 [APP] Reloading all data from localStorage into React state...",
      );
      loadDataFromLocalStorage();
      console.log("✅ [APP] State reloaded successfully");
    };

    console.log("👂 [APP] Setting up sync-complete event listener");
    window.addEventListener("supabase-sync-complete", handleSyncComplete);

    return () => {
      console.log("🔌 [APP] Cleaning up sync-complete event listener");
      window.removeEventListener("supabase-sync-complete", handleSyncComplete);
    };
  }, []);

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
    // In quiz mode, prevent re-answering once explanation is shown
    if (studyMode === "quiz" && showExplanation) {
      return;
    }

    const newAnswers = { ...userAnswers, [currentQuestion.id]: answer };
    setUserAnswers(newAnswers);

    // For multiple choice and true/false, auto-submit immediately
    const autoSubmitTypes = ["multipleChoice", "trueFalse"];

    if (autoSubmitTypes.includes(currentQuestion.questionType)) {
      // Auto-submit for simple question types in both study and quiz mode
      setShowExplanation(true);
      // Don't track performance in limitations mode
      if (studyMode !== "limitations") {
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
        setShowExplanation(true);
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
      }
    }
  };

  const checkAnswer = (question, answer) => {
    switch (question.questionType) {
      case "multipleChoice":
        return answer === question.correctAnswer;
      case "trueFalse":
        return answer === question.correctAnswer;
      case "reorderSequence":
        return JSON.stringify(answer) === JSON.stringify(question.correctOrder);
      case "matchItems":
        // Index-based matching: answer[leftIndex] should equal leftIndex for correct match
        return question.pairs.every((pair, index) => answer[index] === index);
      default:
        return false;
    }
  };

  const updatePerformance = (question, isCorrect) => {
    // Skip stat tracking for learning path practice mode and study mode
    if (studyMode === "learningpath" || studyMode === "study") {
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
      return {
        ...prev,
        [question.id]: {
          correctCount: isCorrect
            ? existing.correctCount + 1
            : existing.correctCount,
          incorrectCount: !isCorrect
            ? existing.incorrectCount + 1
            : existing.incorrectCount,
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

    // Trigger immediate sync after answering question
    console.log("💫 [APP] Triggering sync after question answered");
    triggerSync();
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
    // Auto-submit match items or reorder sequence if not yet submitted
    if (!showExplanation && currentQuestion) {
      if (
        currentQuestion.questionType === "matchItems" ||
        currentQuestion.questionType === "reorderSequence"
      ) {
        const answer = userAnswers[currentQuestion.id];
        if (answer) {
          // Auto-submit the answer before moving to next
          setShowExplanation(true);
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

          return; // Don't move to next yet, let user see the result
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
    if (reviewIncorrectOnly) {
      // Move to previous question in the incorrect questions list
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setShowExplanation(false);
      }
    } else if (currentQuestionIndex > 0) {
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
    setShowExplanation(false);
    setStudyMode("learningpath"); // New mode for learning path practice
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

    // Trigger immediate sync after flagging
    console.log("💫 [APP] Triggering sync after flag toggle");
    triggerSync();
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
    const props = {
      question: currentQuestion,
      onAnswer: handleAnswer,
      showExplanation: showExplanation,
      userAnswer: userAnswers[currentQuestion.id],
      disabled: showExplanation, // Disable after answer is shown in both modes
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
      default:
        return <div>Unknown question type</div>;
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
                Study Tool
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
                      {studyMode === "study" && (
                        <>
                          <RotateCcw className="w-4 h-4 text-red-400" />
                          <span
                            className={`font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
                          >
                            Review
                          </span>
                        </>
                      )}
                      {studyMode === "quiz" && (
                        <>
                          <Brain className="w-4 h-4 text-orange-400" />
                          <span
                            className={`font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
                          >
                            Quiz Mode
                          </span>
                        </>
                      )}
                      {studyMode === "weak" && (
                        <>
                          <Zap className="w-4 h-4 text-orange-400" />
                          <span
                            className={`font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
                          >
                            Weak Topics
                          </span>
                        </>
                      )}
                      {studyMode === "review" && (
                        <>
                          <RotateCcw className="w-4 h-4 text-teal-400" />
                          <span
                            className={`font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
                          >
                            Review
                          </span>
                        </>
                      )}
                      {studyMode === "flagged" && (
                        <>
                          <Target className="w-4 h-4 text-yellow-400" />
                          <span
                            className={`font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
                          >
                            Flagged
                          </span>
                        </>
                      )}
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
            </div>
          )}

          {/* Main Content */}
          {activeTab === "home" ? (
            <div className="max-w-4xl mx-auto px-4">
              {/* Hero Section - Compact */}
              <div className="text-center pt-2 sm:pt-4 pb-4 sm:pb-6 mb-4 sm:mb-8">
                <div className="flex justify-center mb-2 sm:mb-3">
                  <img
                    src="/t6atransparent.png"
                    alt="T-6A Texan II"
                    className="w-48 sm:w-64 md:w-72 h-auto"
                  />
                </div>
                <h1
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  T-6A Texan II
                </h1>
                <p
                  className={`text-sm sm:text-base ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  BOLDFACE Study Tool
                </p>
              </div>

              {/* Main Action Buttons - Redesigned */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 max-w-2xl mx-auto">
                <button
                  onClick={() => {
                    // Auto-select all topics for quiz mode
                    const allCategories = [
                      ...new Set(getAllQuestions().map((q) => q.category)),
                    ];
                    setSelectedTopics(allCategories);
                    setStudyMode("quiz"); // Set to quiz mode immediately
                    setShowQuizSetup(true);
                    setActiveTab("quizsetup");
                  }}
                  className={`group ${darkMode ? "bg-gradient-to-br from-orange-500/20 to-orange-600/10 hover:from-orange-500/30 hover:to-orange-600/20 border border-orange-500/30" : "bg-gradient-to-br from-orange-500 to-orange-600"} backdrop-blur-xl rounded-2xl p-4 sm:p-6 transition-all duration-300 flex flex-col items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 touch-manipulation`}
                >
                  <div
                    className={`${darkMode ? "bg-orange-500/40" : "bg-white/30"} p-3 sm:p-5 rounded-2xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <Brain
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${darkMode ? "text-orange-200" : "text-white"}`}
                      strokeWidth={2.5}
                    />
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-semibold ${darkMode ? "text-white" : "text-white"}`}
                  >
                    Quiz
                  </h3>
                </button>

                <button
                  onClick={() => {
                    // Get all questions with incorrect answers
                    const reviewQuestions = getAllQuestions().filter((q) => {
                      const mastery = questionMastery[q.id];
                      return mastery && mastery.incorrectCount >= 1;
                    });

                    if (reviewQuestions.length === 0) {
                      alert(
                        "No questions to review yet. Try taking a quiz first!",
                      );
                      return;
                    }

                    // Set up study mode with review questions
                    setCurrentQuestions(reviewQuestions);
                    setCurrentQuestionIndex(0);
                    setUserAnswers({});
                    setShowExplanation(false);
                    setStudyMode("study");
                    setReviewIncorrectOnly(true);
                    setReviewSessionCorrect([]); // Reset review session tracking
                    setActiveTab("study");
                  }}
                  className={`group ${darkMode ? "bg-gradient-to-br from-red-500/20 to-red-600/10 hover:from-red-500/30 hover:to-red-600/20 border border-red-500/30" : "bg-gradient-to-br from-red-500 to-red-600"} backdrop-blur-xl rounded-2xl p-4 sm:p-6 transition-all duration-300 flex flex-col items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 touch-manipulation`}
                >
                  <div
                    className={`${darkMode ? "bg-red-500/40" : "bg-white/30"} p-3 sm:p-5 rounded-2xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <RotateCcw
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${darkMode ? "text-red-200" : "text-white"}`}
                      strokeWidth={2.5}
                    />
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-semibold ${darkMode ? "text-white" : "text-white"}`}
                  >
                    Review
                  </h3>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("learningpath");
                  }}
                  className={`group ${darkMode ? "bg-gradient-to-br from-green-500/20 to-green-600/10 hover:from-green-500/30 hover:to-green-600/20 border border-green-500/30" : "bg-gradient-to-br from-green-500 to-green-600"} backdrop-blur-xl rounded-2xl p-4 sm:p-6 transition-all duration-300 flex flex-col items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 touch-manipulation`}
                >
                  <div
                    className={`${darkMode ? "bg-green-500/40" : "bg-white/30"} p-3 sm:p-5 rounded-2xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <ChevronRight
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${darkMode ? "text-green-200" : "text-white"}`}
                      strokeWidth={2.5}
                    />
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-semibold ${darkMode ? "text-white" : "text-white"}`}
                  >
                    Categories
                  </h3>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("cockpit");
                  }}
                  className={`group ${darkMode ? "bg-gradient-to-br from-teal-500/20 to-teal-600/10 hover:from-teal-500/30 hover:to-teal-600/20 border border-teal-500/30" : "bg-gradient-to-br from-teal-500 to-teal-600"} backdrop-blur-xl rounded-2xl p-4 sm:p-6 transition-all duration-300 flex flex-col items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 touch-manipulation`}
                >
                  <div
                    className={`${darkMode ? "bg-teal-500/40" : "bg-white/30"} p-3 sm:p-5 rounded-2xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <Gauge
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${darkMode ? "text-teal-200" : "text-white"}`}
                      strokeWidth={2.5}
                    />
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-semibold ${darkMode ? "text-white" : "text-white"}`}
                  >
                    Cockpit
                  </h3>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("progress");
                  }}
                  className={`group ${darkMode ? "bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 hover:from-indigo-500/30 hover:to-indigo-600/20 border border-indigo-500/30" : "bg-gradient-to-br from-indigo-500 to-indigo-600"} backdrop-blur-xl rounded-2xl p-4 sm:p-6 transition-all duration-300 flex flex-col items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 touch-manipulation`}
                >
                  <div
                    className={`${darkMode ? "bg-indigo-500/40" : "bg-white/30"} p-3 sm:p-5 rounded-2xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <Award
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${darkMode ? "text-indigo-200" : "text-white"}`}
                      strokeWidth={2.5}
                    />
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-semibold ${darkMode ? "text-white" : "text-white"}`}
                  >
                    Progress
                  </h3>
                </button>
              </div>

              {/* Stats - Simple & Elegant */}
              {performanceStats.overall.correct > 0 && (
                <div
                  className={`${darkMode ? "bg-white/5" : "bg-slate-100"} rounded-xl p-5 mb-6 max-w-md mx-auto`}
                >
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div
                        className={`text-3xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
                      >
                        {
                          Object.values(questionMastery).filter(
                            (q) => q.correctCount >= 3,
                          ).length
                        }
                      </div>
                      <div
                        className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                      >
                        Mastered
                      </div>
                    </div>
                    <div>
                      <div
                        className={`text-3xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
                      >
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
                  </div>
                </div>
              )}

              {/* Quick Access - Only show flagged questions */}
              {flaggedQuestions.length > 0 && (
                <div className="mt-8">
                  <button
                    onClick={() => {
                      setStudyMode("flagged");
                      setActiveTab("study");
                      setShowStudySetup(false);
                      loadQuestions("flagged");
                    }}
                    className={`w-full ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-slate-100 hover:bg-slate-200"} rounded-xl p-4 transition text-left`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Target
                          className={`w-5 h-5 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}
                        />
                        <span
                          className={`font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
                        >
                          Flagged Questions
                        </span>
                      </div>
                      <span
                        className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                      >
                        {flaggedQuestions.length}
                      </span>
                    </div>
                  </button>
                </div>
              )}
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
                  Choose quiz type and number of questions
                </p>
              </div>

              {/* Quiz Type Selection */}
              <div className="mb-8">
                <h3
                  className={`text-sm font-medium mb-3 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                >
                  Select Quiz Type
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setStudyMode("quiz");
                      setSelectedTopics([]);
                    }}
                    className={`p-4 rounded-xl text-left transition-all ${
                      studyMode === "quiz"
                        ? darkMode
                          ? "bg-orange-500/30 border-2 border-orange-500"
                          : "bg-orange-100 border-2 border-orange-500"
                        : darkMode
                          ? "bg-slate-700/50 hover:bg-slate-700 border-2 border-transparent"
                          : "bg-white hover:bg-slate-50 border-2 border-slate-200"
                    }`}
                  >
                    <div
                      className={`font-semibold ${studyMode === "quiz" ? "text-orange-400" : darkMode ? "text-slate-300" : "text-slate-700"}`}
                    >
                      T-6A Aircraft
                    </div>
                    <div
                      className={`text-xs mt-1 ${studyMode === "quiz" ? "text-orange-300" : darkMode ? "text-slate-400" : "text-slate-500"}`}
                    >
                      Boldface & Systems
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setStudyMode("aerophysiology");
                      setSelectedTopics([]);
                    }}
                    className={`p-4 rounded-xl text-left transition-all ${
                      studyMode === "aerophysiology"
                        ? darkMode
                          ? "bg-cyan-500/30 border-2 border-cyan-500"
                          : "bg-cyan-100 border-2 border-cyan-500"
                        : darkMode
                          ? "bg-slate-700/50 hover:bg-slate-700 border-2 border-transparent"
                          : "bg-white hover:bg-slate-50 border-2 border-slate-200"
                    }`}
                  >
                    <div
                      className={`font-semibold ${studyMode === "aerophysiology" ? "text-cyan-400" : darkMode ? "text-slate-300" : "text-slate-700"}`}
                    >
                      Aerospace Physiology
                    </div>
                    <div
                      className={`text-xs mt-1 ${studyMode === "aerophysiology" ? "text-cyan-300" : darkMode ? "text-slate-400" : "text-slate-500"}`}
                    >
                      Hypoxia, Vision, G-Forces
                    </div>
                  </button>
                </div>
              </div>

              {/* Question Count - Apple Style */}
              <div className="mb-4">
                <h3
                  className={`text-sm font-medium mb-3 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                >
                  Number of Questions
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[10, 25, 50].map((count) => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`p-6 rounded-2xl font-semibold text-2xl transition-all duration-200 ${
                      questionCount === count
                        ? darkMode
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/50 scale-105"
                          : "bg-orange-500 text-white shadow-lg shadow-orange-500/50 scale-105"
                        : darkMode
                          ? "bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:scale-102"
                          : "bg-white text-slate-700 hover:bg-slate-50 hover:scale-102 border-2 border-slate-200"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  let all = [];

                  if (studyMode === "aerophysiology") {
                    // Get aerospace physiology questions
                    all = getAllAerospacePhysiologyQuestions();
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
                  }

                  // Auto-select all topics
                  const allCategories = [
                    ...new Set(all.map((q) => q.category)),
                  ];
                  setSelectedTopics(allCategories);

                  // Shuffle questions
                  for (let i = all.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [all[i], all[j]] = [all[j], all[i]];
                  }

                  // Limit to selected count
                  const limitedQuestions = all.slice(0, questionCount);

                  setCurrentQuestions(limitedQuestions);
                  setCurrentQuestionIndex(0);
                  setUserAnswers({});
                  setShowExplanation(false);
                  setActiveTab("study");
                  setShowQuizSetup(false);
                }}
                className={`w-full px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                  darkMode
                    ? "bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl"
                    : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl"
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
                    setStudyMode("study");
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
                      setStudyMode("weak");
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
                      // Get all questions that have been answered incorrectly at least once
                      const allQs = getAllQuestions();
                      const incorrectQs = allQs.filter((q) => {
                        const mastery = questionMastery[q.id];
                        return mastery && mastery.incorrectCount >= 1;
                      });

                      if (incorrectQs.length < 10) {
                        setQuestionCount(incorrectQs.length);
                      }

                      setCurrentQuestions(incorrectQs);
                      setCurrentQuestionIndex(0);
                      setUserAnswers({});
                      setShowExplanation(false);
                      setStudyMode("quiz");
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
            <div className={`max-w-3xl mx-auto space-y-6`}>
              {/* Overall Progress - Apple Style */}
              <div
                className={`${darkMode ? "bg-slate-800/50" : "bg-white/50"} backdrop-blur-xl rounded-3xl p-8 shadow-2xl text-center`}
              >
                <h2
                  className={`text-4xl font-semibold mb-8 ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  Progress
                </h2>

                {/* Big Circle Progress */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg className="transform -rotate-90 w-48 h-48">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke={darkMode ? "#334155" : "#e2e8f0"}
                      strokeWidth="16"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="url(#gradient)"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 88}`}
                      strokeDashoffset={`${2 * Math.PI * 88 * (1 - (getAllQuestions().length > 0 ? Object.values(questionMastery).filter((q) => q.correctCount >= 3).length / getAllQuestions().length : 0))}`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div>
                      <div
                        className={`text-5xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                      >
                        {getAllQuestions().length > 0
                          ? Math.round(
                              (Object.values(questionMastery).filter(
                                (q) => q.correctCount >= 3,
                              ).length /
                                getAllQuestions().length) *
                                100,
                            )
                          : 0}
                        %
                      </div>
                      <div
                        className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                      >
                        Mastered
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`grid grid-cols-3 gap-4 text-center ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                >
                  <div>
                    <div className="text-2xl font-bold text-green-500">
                      {
                        Object.values(questionMastery).filter(
                          (q) => q.correctCount >= 3,
                        ).length
                      }
                    </div>
                    <div className="text-xs text-slate-400">Mastered</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-500">
                      {
                        Object.values(questionMastery).filter(
                          (q) => q.correctCount >= 1 && q.correctCount < 3,
                        ).length
                      }
                    </div>
                    <div className="text-xs text-slate-400">Learning</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-500">
                      {getAllQuestions().length -
                        Object.values(questionMastery).filter(
                          (q) => q.correctCount >= 1,
                        ).length}
                    </div>
                    <div className="text-xs text-slate-400">New</div>
                  </div>
                </div>
              </div>

              {/* Categories Mastered - Compact */}
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Categories Mastered
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {(() => {
                    // Get ALL questions regardless of selectedQuestionTypes
                    const allQs = [];
                    [
                      "multipleChoice",
                      "trueFalse",
                      "reorderSequence",
                      "matchItems",
                    ].forEach((type) => {
                      const questions = questionDatabase[type] || [];
                      questions.forEach((q) => {
                        allQs.push({ ...q, questionType: type });
                      });
                    });

                    const categoriesData = {};

                    // Group questions by category
                    allQs.forEach((q) => {
                      if (!categoriesData[q.category]) {
                        categoriesData[q.category] = { total: 0, learned: 0 };
                      }
                      categoriesData[q.category].total++;
                      const mastery = questionMastery[q.id];
                      if (mastery && mastery.correctCount >= 3) {
                        categoriesData[q.category].learned++;
                      }
                    });

                    return Object.entries(categoriesData)
                      .sort((a, b) => a[0].localeCompare(b[0]))
                      .map(([category, data]) => {
                        const percentage = Math.round(
                          (data.learned / data.total) * 100,
                        );
                        const isComplete = percentage === 100;

                        return (
                          <div
                            key={category}
                            className={`p-3 rounded-xl transition-all ${
                              isComplete
                                ? "bg-green-500/20 border border-green-500/50"
                                : "bg-slate-700/50 border border-slate-600"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="text-sm font-medium text-white truncate pr-2">
                                {category}
                              </div>
                              {isComplete && (
                                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-600">
                                <div
                                  className={`h-full transition-all duration-500 ${
                                    isComplete ? "bg-green-500" : "bg-blue-500"
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <div className="text-xs font-medium w-10 text-right text-slate-300">
                                {percentage}%
                              </div>
                            </div>
                          </div>
                        );
                      });
                  })()}
                </div>
              </div>

              {/* Key Stats - Simple Cards */}
              {(performanceStats.overall.correct +
                performanceStats.overall.incorrect >
                0 ||
                performanceStats.overall.bestStreak > 0) && (
                <div className="grid grid-cols-2 gap-4">
                  {performanceStats.overall.correct +
                    performanceStats.overall.incorrect >
                    0 && (
                    <div
                      className={`${darkMode ? "bg-slate-800/50" : "bg-white/50"} backdrop-blur-xl rounded-3xl p-6 shadow-2xl text-center`}
                    >
                      <div
                        className={`text-4xl font-bold mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                      >
                        {Math.round(
                          (performanceStats.overall.correct /
                            (performanceStats.overall.correct +
                              performanceStats.overall.incorrect)) *
                            100,
                        )}
                        %
                      </div>
                      <div
                        className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                      >
                        Quiz Accuracy
                      </div>
                    </div>
                  )}

                  {performanceStats.overall.bestStreak > 0 && (
                    <div
                      className={`${darkMode ? "bg-slate-800/50" : "bg-white/50"} backdrop-blur-xl rounded-3xl p-6 shadow-2xl text-center`}
                    >
                      <div
                        className={`text-4xl font-bold mb-2 ${darkMode ? "text-orange-400" : "text-orange-600"}`}
                      >
                        {performanceStats.overall.bestStreak}
                      </div>
                      <div
                        className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                      >
                        Best Streak
                      </div>
                    </div>
                  )}
                </div>
              )}
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
                      setStudyMode("study");
                      setUserAnswers({});
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
            <div className="max-w-4xl mx-auto">
              {/* Quiz Results */}
              <div
                className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl p-6 mb-6`}
              >
                <div className="mb-6">
                  <h2
                    className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    Quiz Results
                  </h2>
                </div>

                {/* Score Summary */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div
                    className={`p-4 rounded-lg ${darkMode ? "bg-green-900/30 border-2 border-green-600" : "bg-green-100 border-2 border-green-400"}`}
                  >
                    <div
                      className={`text-3xl font-bold ${darkMode ? "text-green-400" : "text-green-700"}`}
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
                    </div>
                    <div
                      className={`text-sm ${darkMode ? "text-green-300" : "text-green-600"}`}
                    >
                      Correct
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-lg ${darkMode ? "bg-red-900/30 border-2 border-red-600" : "bg-red-100 border-2 border-red-400"}`}
                  >
                    <div
                      className={`text-3xl font-bold ${darkMode ? "text-red-400" : "text-red-700"}`}
                    >
                      {
                        Object.keys(userAnswers).filter((id) => {
                          const question = currentQuestions.find(
                            (q) => q.id === id,
                          );
                          return (
                            question && !checkAnswer(question, userAnswers[id])
                          );
                        }).length
                      }
                    </div>
                    <div
                      className={`text-sm ${darkMode ? "text-red-300" : "text-red-600"}`}
                    >
                      Incorrect
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-lg ${darkMode ? "bg-yellow-900/30 border-2 border-yellow-600" : "bg-yellow-100 border-2 border-yellow-400"}`}
                  >
                    <div
                      className={`text-3xl font-bold ${darkMode ? "text-yellow-400" : "text-yellow-700"}`}
                    >
                      {currentQuestions.length -
                        Object.keys(userAnswers).length}
                    </div>
                    <div
                      className={`text-sm ${darkMode ? "text-yellow-300" : "text-yellow-600"}`}
                    >
                      Unanswered
                    </div>
                  </div>
                </div>

                {/* Question Review - Incorrect Answers Only */}
                <div className="mb-4">
                  <h3
                    className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    Incorrect Answers to Review:
                  </h3>
                </div>
                <div className="space-y-3">
                  {currentQuestions
                    .map((question, index) => ({ question, index }))
                    .filter(({ question }) => {
                      const answered = userAnswers[question.id] !== undefined;
                      const isCorrect =
                        answered &&
                        checkAnswer(question, userAnswers[question.id]);
                      return answered && !isCorrect; // Only show incorrect answers
                    })
                    .map(({ question, index }) => {
                      const answered = userAnswers[question.id] !== undefined;
                      const isCorrect =
                        answered &&
                        checkAnswer(question, userAnswers[question.id]);

                      return (
                        <div
                          key={question.id}
                          className={`p-4 rounded-lg border-2 ${
                            darkMode
                              ? "bg-red-900/20 border-red-600"
                              : "bg-red-50 border-red-400"
                          }`}
                        >
                          <div className="mb-3">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex items-start gap-3 flex-1">
                                <span
                                  className={`font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
                                >
                                  #{index + 1}
                                </span>
                                <div className="flex-1">
                                  <p
                                    className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}
                                  >
                                    {question.question}
                                  </p>
                                </div>
                              </div>
                              <XCircle
                                className={`w-5 h-5 flex-shrink-0 ${darkMode ? "text-red-400" : "text-red-600"}`}
                              />
                            </div>

                            {/* Show answers */}
                            <div
                              className={`mt-3 p-3 rounded ${darkMode ? "bg-slate-800/50" : "bg-white/50"} space-y-2`}
                            >
                              {/* Multiple Choice or True/False */}
                              {(question.questionType === "multipleChoice" ||
                                question.questionType === "trueFalse") && (
                                <>
                                  <div>
                                    <p
                                      className={`text-xs font-semibold ${darkMode ? "text-red-400" : "text-red-600"} mb-1`}
                                    >
                                      Your Answer:
                                    </p>
                                    <p
                                      className={`text-sm ${darkMode ? "text-slate-200" : "text-slate-800"}`}
                                    >
                                      {question.questionType ===
                                      "multipleChoice"
                                        ? question.options[
                                            userAnswers[question.id]
                                          ]
                                        : userAnswers[question.id]
                                          ? "True"
                                          : "False"}
                                    </p>
                                  </div>
                                  <div>
                                    <p
                                      className={`text-xs font-semibold ${darkMode ? "text-green-400" : "text-green-600"} mb-1`}
                                    >
                                      Correct Answer:
                                    </p>
                                    <p
                                      className={`text-sm ${darkMode ? "text-slate-200" : "text-slate-800"}`}
                                    >
                                      {question.questionType ===
                                      "multipleChoice"
                                        ? question.options[
                                            question.correctAnswer
                                          ]
                                        : question.correctAnswer
                                          ? "True"
                                          : "False"}
                                    </p>
                                  </div>
                                </>
                              )}

                              {/* Reorder Sequence */}
                              {question.questionType === "reorderSequence" && (
                                <>
                                  <div>
                                    <p
                                      className={`text-xs font-semibold ${darkMode ? "text-red-400" : "text-red-600"} mb-2`}
                                    >
                                      Your Sequence:
                                    </p>
                                    <ol className="list-decimal list-inside space-y-1">
                                      {userAnswers[question.id]?.map(
                                        (step, i) => (
                                          <li
                                            key={i}
                                            className={`text-xs ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                                          >
                                            {step}
                                          </li>
                                        ),
                                      )}
                                    </ol>
                                  </div>
                                  <div>
                                    <p
                                      className={`text-xs font-semibold ${darkMode ? "text-green-400" : "text-green-600"} mb-2`}
                                    >
                                      Correct Sequence:
                                    </p>
                                    <ol className="list-decimal list-inside space-y-1">
                                      {question.correctOrder.map((step, i) => (
                                        <li
                                          key={i}
                                          className={`text-xs ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                                        >
                                          {step}
                                        </li>
                                      ))}
                                    </ol>
                                  </div>
                                </>
                              )}

                              {/* Match Items */}
                              {question.questionType === "matchItems" && (
                                <>
                                  <div>
                                    <p
                                      className={`text-xs font-semibold ${darkMode ? "text-red-400" : "text-red-600"} mb-2`}
                                    >
                                      Your Matches:
                                    </p>
                                    <div className="space-y-1">
                                      {question.pairs.map((pair, i) => (
                                        <div
                                          key={i}
                                          className="flex items-center gap-2 text-xs"
                                        >
                                          <span
                                            className={
                                              darkMode
                                                ? "text-slate-300"
                                                : "text-slate-700"
                                            }
                                          >
                                            {pair.left}
                                          </span>
                                          <ArrowRight className="w-3 h-3" />
                                          <span
                                            className={
                                              darkMode
                                                ? "text-slate-300"
                                                : "text-slate-700"
                                            }
                                          >
                                            {userAnswers[question.id]?.[
                                              pair.left
                                            ] || "Not matched"}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <p
                                      className={`text-xs font-semibold ${darkMode ? "text-green-400" : "text-green-600"} mb-2`}
                                    >
                                      Correct Matches:
                                    </p>
                                    <div className="space-y-1">
                                      {question.pairs.map((pair, i) => (
                                        <div
                                          key={i}
                                          className="flex items-center gap-2 text-xs"
                                        >
                                          <span
                                            className={
                                              darkMode
                                                ? "text-slate-300"
                                                : "text-slate-700"
                                            }
                                          >
                                            {pair.left}
                                          </span>
                                          <ArrowRight className="w-3 h-3" />
                                          <span
                                            className={
                                              darkMode
                                                ? "text-slate-300"
                                                : "text-slate-700"
                                            }
                                          >
                                            {pair.right}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </>
                              )}

                              {/* Explanation */}
                              <div
                                className={`pt-2 border-t ${darkMode ? "border-slate-700" : "border-slate-300"}`}
                              >
                                <p
                                  className={`text-xs font-semibold ${darkMode ? "text-blue-400" : "text-blue-600"} mb-1`}
                                >
                                  Explanation:
                                </p>
                                <p
                                  className={`text-xs ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                                >
                                  {question.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {currentQuestions.filter((q) => {
                    const answered = userAnswers[q.id] !== undefined;
                    const isCorrect =
                      answered && checkAnswer(q, userAnswers[q.id]);
                    return answered && !isCorrect;
                  }).length === 0 && (
                    <div
                      className={`p-6 rounded-lg text-center ${darkMode ? "bg-green-900/30 border-2 border-green-600" : "bg-green-100 border-2 border-green-400"}`}
                    >
                      <CheckCircle2
                        className={`w-12 h-12 mx-auto mb-3 ${darkMode ? "text-green-400" : "text-green-600"}`}
                      />
                      <p
                        className={`text-lg font-semibold ${darkMode ? "text-green-400" : "text-green-700"}`}
                      >
                        Perfect Score! No incorrect answers to review.
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
                  {/* Review Incorrect Answers Button - Only show if there are incorrect answers */}
                  {currentQuestions.filter((q) => {
                    const answered = userAnswers[q.id] !== undefined;
                    const isCorrect =
                      answered && checkAnswer(q, userAnswers[q.id]);
                    return answered && !isCorrect;
                  }).length > 0 && (
                    <button
                      onClick={() => {
                        // Filter to only incorrect questions
                        const incorrectQuestions = currentQuestions.filter(
                          (q) => {
                            const answered = userAnswers[q.id] !== undefined;
                            const isCorrect =
                              answered && checkAnswer(q, userAnswers[q.id]);
                            return answered && !isCorrect;
                          },
                        );

                        // Set up review mode with only incorrect questions
                        setCurrentQuestions(incorrectQuestions);
                        setCurrentQuestionIndex(0);
                        setUserAnswers({});
                        setShowExplanation(false);
                        setStudyMode("quiz");
                        setReviewIncorrectOnly(true);
                        setActiveTab("study");
                      }}
                      className="px-6 py-3 rounded-lg font-medium transition bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Review Incorrect (
                      {
                        currentQuestions.filter((q) => {
                          const answered = userAnswers[q.id] !== undefined;
                          const isCorrect =
                            answered && checkAnswer(q, userAnswers[q.id]);
                          return answered && !isCorrect;
                        }).length
                      }
                      )
                    </button>
                  )}
                  <button
                    onClick={() => {
                      // Clean up review session data when returning to main menu
                      if (
                        reviewIncorrectOnly &&
                        reviewSessionCorrect.length > 0
                      ) {
                        reviewSessionCorrect.forEach((questionId) => {
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
                      }

                      setActiveTab("home");
                      setStudyMode("study");
                      setUserAnswers({});
                      setCurrentQuestionIndex(0);
                      setShowExplanation(false);
                      setReviewIncorrectOnly(false);
                      setReviewSessionCorrect([]);
                    }}
                    className={`px-6 py-3 rounded-lg font-medium transition ${
                      darkMode
                        ? "bg-slate-700 hover:bg-slate-600 text-white"
                        : "bg-slate-300 hover:bg-slate-400 text-slate-900"
                    }`}
                  >
                    Return to Main Menu
                  </button>
                  <button
                    onClick={() => {
                      // Clean up review session data
                      if (
                        reviewIncorrectOnly &&
                        reviewSessionCorrect.length > 0
                      ) {
                        reviewSessionCorrect.forEach((questionId) => {
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
                      }

                      setShowQuizSetup(true);
                      setActiveTab("quizsetup");
                      setReviewIncorrectOnly(false);
                      setReviewSessionCorrect([]);
                    }}
                    className="px-6 py-3 rounded-lg font-medium transition bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    Take Another Quiz
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === "cockpit" ? (
            <CockpitReference darkMode={darkMode} />
          ) : activeTab === "aerophysiologysetup" ? (
            <div
              className={`max-w-2xl mx-auto ${darkMode ? "bg-slate-800/50" : "bg-white/50"} backdrop-blur-xl rounded-3xl p-8 shadow-2xl`}
            >
              {/* Header */}
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

              {/* Select All Button */}
              <button
                onClick={() => {
                  const allTopics = Object.values(aerospacePhysiologyTopics);
                  setSelectedTopics(allTopics);
                }}
                className={`w-full mb-4 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  darkMode
                    ? "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300"
                    : "bg-cyan-100 hover:bg-cyan-200 text-cyan-700"
                }`}
              >
                Select All Topics
              </button>

              {/* Topic Selection */}
              <div className="space-y-2 mb-8 max-h-96 overflow-y-auto">
                {Object.entries(aerospacePhysiologyTopics).map(
                  ([key, topicName]) => {
                    const topicQuestions = getAPQuestionsByTopic(topicName);
                    const topicStats = topicQuestions.reduce(
                      (acc, q) => {
                        const mastery = questionMastery[q.id];
                        if (mastery) {
                          acc.attempted++;
                          if (mastery.correctCount > mastery.incorrectCount)
                            acc.mastered++;
                        }
                        return acc;
                      },
                      {
                        attempted: 0,
                        mastered: 0,
                        total: topicQuestions.length,
                      },
                    );

                    const isSelected = selectedTopics.includes(topicName);

                    return (
                      <button
                        key={key}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedTopics(
                              selectedTopics.filter((t) => t !== topicName),
                            );
                          } else {
                            setSelectedTopics([...selectedTopics, topicName]);
                          }
                        }}
                        className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
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
                          <span
                            className={`font-medium ${
                              isSelected
                                ? darkMode
                                  ? "text-cyan-200"
                                  : "text-cyan-700"
                                : darkMode
                                  ? "text-slate-300"
                                  : "text-slate-700"
                            }`}
                          >
                            {topicName}
                          </span>
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
                      </button>
                    );
                  },
                )}
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

                  setCurrentQuestions(questions);
                  setCurrentQuestionIndex(0);
                  setUserAnswers({});
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
            <LearningPath
              learningPath={learningPath}
              allQuestions={(() => {
                // Get ALL questions for learning path, ignoring selectedQuestionTypes
                const all = [];
                [
                  "multipleChoice",
                  "trueFalse",
                  "reorderSequence",
                  "matchItems",
                  "flashcard",
                ].forEach((type) => {
                  const questions = questionDatabase[type] || [];
                  questions.forEach((q) => {
                    all.push({ ...q, questionType: type });
                  });
                });
                return all;
              })()}
              questionMastery={questionMastery}
              onStartSection={startLearningPathSection}
              getChapterProgress={getChapterProgress}
              getSectionProgress={getSectionProgress}
              shouldUnlockChapter={shouldUnlockChapter}
              darkMode={darkMode}
            />
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
            <div className="max-w-4xl mx-auto pb-20 px-4">
              {/* Header Bar */}
              <div className="flex items-center justify-between mb-6">
                <h2
                  className={`text-lg font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  Quiz
                </h2>
                <span
                  className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}
                >
                  {currentQuestionIndex + 1} / {currentQuestions.length}
                </span>
              </div>

              {/* Question Card */}
              {currentQuestion ? (
                <div
                  key={currentQuestion.id}
                  className={`${darkMode ? "bg-slate-800/50" : "bg-white"} rounded-xl p-6 md:p-8 question-enter`}
                >
                  <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      {/* Show star only if mastered */}
                      {studyMode !== "study" &&
                        (() => {
                          const mastery = questionMastery[currentQuestion.id];
                          const correctCount = mastery?.correctCount || 0;

                          if (correctCount >= 3) {
                            return (
                              <span className="text-yellow-400 text-xl">
                                ⭐
                              </span>
                            );
                          }
                          return null;
                        })()}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleFlag}
                        className={`min-w-[36px] min-h-[36px] px-2 py-1.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 touch-manipulation shadow-sm ${
                          flaggedQuestions.includes(currentQuestion.id)
                            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                            : darkMode
                              ? "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-yellow-400"
                              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        }`}
                        title={
                          flaggedQuestions.includes(currentQuestion.id)
                            ? "Unflag question"
                            : "Flag for review"
                        }
                      >
                        <span className="text-base">
                          {flaggedQuestions.includes(currentQuestion.id)
                            ? "⭐"
                            : "☆"}
                        </span>
                        <span className="hidden sm:inline text-xs">
                          {flaggedQuestions.includes(currentQuestion.id)
                            ? "Flagged"
                            : "Flag"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {renderQuestion()}
                </div>
              ) : (
                <div
                  className={`${darkMode ? "bg-slate-800/50" : "bg-white"} rounded-xl p-6 md:p-8 text-center`}
                >
                  <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
                    Loading question...
                  </p>
                </div>
              )}

              {/* Keyboard Hints - Subtle, only on desktop */}
              {currentQuestion && (
                <div className="hidden md:flex justify-center mt-2 mb-2">
                  <div
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-xs ${darkMode ? "bg-slate-700/50 text-slate-400" : "bg-slate-100 text-slate-600"} transition-opacity duration-300`}
                  >
                    <span className="flex items-center gap-1">
                      <kbd
                        className={`px-2 py-1 rounded ${darkMode ? "bg-slate-600" : "bg-white"} font-mono`}
                      >
                        ←
                      </kbd>
                      Previous
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd
                        className={`px-2 py-1 rounded ${darkMode ? "bg-slate-600" : "bg-white"} font-mono`}
                      >
                        →
                      </kbd>
                      Next
                    </span>
                    {currentQuestion.questionType === "multipleChoice" && (
                      <span className="flex items-center gap-1">
                        <kbd
                          className={`px-2 py-1 rounded ${darkMode ? "bg-slate-600" : "bg-white"} font-mono`}
                        >
                          1-4
                        </kbd>
                        Select
                      </span>
                    )}
                    {currentQuestion.questionType === "trueFalse" && (
                      <span className="flex items-center gap-1">
                        <kbd
                          className={`px-2 py-1 rounded ${darkMode ? "bg-slate-600" : "bg-white"} font-mono`}
                        >
                          T/F
                        </kbd>
                        Answer
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation - Fixed at Bottom - Mobile Optimized */}
              <div
                className={`fixed bottom-0 left-0 right-0 ${darkMode ? "bg-slate-900/95" : "bg-white/95"} backdrop-blur-sm border-t ${darkMode ? "border-slate-700" : "border-slate-300"} p-1.5 sm:p-3 shadow-2xl z-10 safe-area-bottom`}
              >
                <div className="max-w-4xl mx-auto flex justify-between items-center gap-2">
                  {viewingSingleQuestion ? (
                    <button
                      onClick={() => {
                        setActiveTab("results");
                        setViewingSingleQuestion(false);
                      }}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm touch-manipulation ${
                        darkMode
                          ? "bg-blue-600 hover:bg-blue-700 text-white active:scale-95"
                          : "bg-blue-500 hover:bg-blue-600 text-white active:scale-95"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                      Back to Review
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className={`min-h-[44px] px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm touch-manipulation shadow-sm ${
                          currentQuestionIndex === 0
                            ? darkMode
                              ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                              : "bg-slate-200 text-slate-400 cursor-not-allowed"
                            : darkMode
                              ? "bg-slate-700 hover:bg-slate-600 text-white active:scale-95"
                              : "bg-white hover:bg-slate-100 text-slate-900 active:scale-95"
                        }`}
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        <span className="hidden sm:inline">Previous</span>
                      </button>

                      {/* Submit button for reorder sequence - ALWAYS visible */}
                      {currentQuestion?.questionType === "reorderSequence" &&
                        !showExplanation && (
                          <button
                            onClick={() => {
                              setShowExplanation(true);
                              const answer = userAnswers[currentQuestion.id];
                              if (answer) {
                                const isCorrect = checkAnswer(
                                  currentQuestion,
                                  answer,
                                );
                                updatePerformance(currentQuestion, isCorrect);
                              } else {
                                // If no answer saved yet, mark as incorrect in quiz mode
                                if (studyMode === "quiz") {
                                  updatePerformance(currentQuestion, false);
                                }
                              }
                            }}
                            className="min-h-[44px] bg-green-600 hover:bg-green-700 active:scale-95 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 text-sm touch-manipulation shadow-sm"
                          >
                            Submit
                          </button>
                        )}

                      {/* Submit Answer for match items in quiz mode if not answered */}
                      {studyMode === "quiz" &&
                        !showExplanation &&
                        currentQuestion?.questionType === "matchItems" &&
                        !userAnswers[currentQuestion?.id] && (
                          <button
                            onClick={() => {
                              setShowExplanation(true);
                              updatePerformance(currentQuestion, false);
                            }}
                            className="min-h-[44px] bg-green-600 hover:bg-green-700 active:scale-95 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 text-sm touch-manipulation shadow-sm"
                          >
                            Submit
                          </button>
                        )}

                      {currentQuestionIndex === currentQuestions.length - 1 &&
                      studyMode === "quiz" &&
                      showExplanation ? (
                        <button
                          onClick={() => setActiveTab("results")}
                          className="min-h-[44px] px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-sm touch-manipulation shadow-sm"
                        >
                          <span className="hidden sm:inline">Finish</span>
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                      ) : currentQuestionIndex ===
                          currentQuestions.length - 1 &&
                        studyMode !== "quiz" ? (
                        <button
                          onClick={() => setActiveTab("studycomplete")}
                          className="min-h-[48px] px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:scale-95 text-white text-base touch-manipulation shadow-sm"
                        >
                          <span className="hidden sm:inline">Finish</span>
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={handleNext}
                          className={`min-h-[44px] px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm touch-manipulation shadow-sm ${
                            darkMode
                              ? "bg-slate-700 hover:bg-slate-600 text-white active:scale-95"
                              : "bg-white hover:bg-slate-100 text-slate-900 active:scale-95"
                          }`}
                        >
                          <span className="hidden sm:inline">Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
