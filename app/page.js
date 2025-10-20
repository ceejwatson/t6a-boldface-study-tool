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
} from "lucide-react";

import MultipleChoice from "./components/MultipleChoice";
import TrueFalse from "./components/TrueFalse";
import ReorderSequence from "./components/ReorderSequence";
import MatchItems from "./components/MatchItems";
import Flashcard from "./components/Flashcard";
import ActiveRecall from "./components/ActiveRecall";
import LearningPath from "./components/LearningPath";
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

export default function T6AEnhancedStudyTool() {
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

  // Load saved data
  useEffect(() => {
    const savedPerformance = localStorage.getItem("t6a-performance");
    const savedFlags = localStorage.getItem("t6a-flagged");
    const savedSRS = localStorage.getItem("t6a-srs");
    const savedHistory = localStorage.getItem("t6a-session-history");
    const savedMastery = localStorage.getItem("t6a-mastery");

    if (savedPerformance) setPerformanceStats(JSON.parse(savedPerformance));
    if (savedFlags) setFlaggedQuestions(JSON.parse(savedFlags));
    if (savedSRS) setSrsData(JSON.parse(savedSRS));
    if (savedHistory) setSessionHistory(JSON.parse(savedHistory));
    if (savedMastery) setQuestionMastery(JSON.parse(savedMastery));

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

    // Get questions that are due for review based on SM-2 SRS
    const dueQuestions = all.filter((q) => {
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
    // Skip stat tracking for learning path practice mode
    if (studyMode === "learningpath") {
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

    // Update questionMastery
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
          return; // Don't move to next yet, let user see the result
        }
      }
    }

    if (reviewIncorrectOnly) {
      // Find next incorrect answer
      for (let i = currentQuestionIndex + 1; i < currentQuestions.length; i++) {
        const q = currentQuestions[i];
        const answered = userAnswers[q.id] !== undefined;
        const isCorrect = answered && checkAnswer(q, userAnswers[q.id]);
        if (answered && !isCorrect) {
          setCurrentQuestionIndex(i);
          setShowExplanation(true);
          return;
        }
      }
      // No more incorrect answers, exit review
      setActiveTab("results");
      setReviewIncorrectOnly(false);
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
      // Find previous incorrect answer
      for (let i = currentQuestionIndex - 1; i >= 0; i--) {
        const q = currentQuestions[i];
        const answered = userAnswers[q.id] !== undefined;
        const isCorrect = answered && checkAnswer(q, userAnswers[q.id]);
        if (answered && !isCorrect) {
          setCurrentQuestionIndex(i);
          setShowExplanation(true);
          return;
        }
      }
      // No previous incorrect answers
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

    if (flaggedQuestions.includes(currentQuestion.id)) {
      setFlaggedQuestions((prev) =>
        prev.filter((id) => id !== currentQuestion.id),
      );
    } else {
      setFlaggedQuestions((prev) => [...prev, currentQuestion.id]);
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
      showCorrectness: studyMode === "quiz" || studyMode === "learningpath", // Show green/red in quiz and learning path modes
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
      className={`min-h-screen ${darkMode ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" : "bg-gradient-to-br from-slate-100 via-blue-100 to-slate-100"}`}
    >
      {/* Header */}
      <header
        className={`${darkMode ? "bg-slate-900/95 border-blue-700/50" : "bg-white/95 border-blue-300/50"} backdrop-blur border-b sticky top-0 z-20 shadow-xl`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1
                  className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  T-6A Texan II
                </h1>
                <p
                  className={`text-sm ${darkMode ? "text-blue-300" : "text-blue-600"}`}
                >
                  Enhanced Study Tool
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* PDF Reference Button */}
              <a
                href="https://www.sheppard.af.mil/Portals/65/T-6A%20Boldface%20Ops%20Limits%2C%201%20Jun%202023%20%28Filled%29.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                title="Official T-6A BOLDFACE Emergency Procedures and Operating Limitations PDF"
              >
                <FileText className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">
                  T-6A BOLDFACE Reference
                </span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? "bg-slate-800 text-yellow-400" : "bg-slate-200 text-slate-700"}`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Simplified Navigation Bar - Only show when not on home screen */}
        {activeTab !== "home" && (
          <div className="mb-6">
            <div
              className={`flex items-center justify-between gap-3 p-3 rounded-xl ${darkMode ? "bg-slate-800/50" : "bg-white/50"} backdrop-blur-sm border ${darkMode ? "border-slate-700" : "border-slate-200"}`}
            >
              {/* Left: Home + Current Mode */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab("home")}
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    darkMode
                      ? "bg-slate-700 hover:bg-slate-600 text-white"
                      : "bg-slate-200 hover:bg-slate-300 text-slate-900"
                  }`}
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  <span className="hidden sm:inline">Home</span>
                </button>

                {/* Current Mode Indicator */}
                {(activeTab === "study" ||
                  activeTab === "studysetup" ||
                  activeTab === "quizsetup") && (
                  <div className="flex items-center gap-2 px-3 py-2">
                    {studyMode === "study" && (
                      <>
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span
                          className={`font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
                        >
                          Study Mode
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
            {/* Hero Section - Clean & Minimal */}
            <div className="text-center py-16 mb-12">
              <h1
                className={`text-5xl font-semibold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                T-6A Texan II
              </h1>
              <p
                className={`text-xl ${darkMode ? "text-slate-400" : "text-slate-600"}`}
              >
                Master your BOLDFACE procedures
              </p>
            </div>

            {/* Main Action Buttons - Centered & Large */}
            <div className="space-y-4 mb-16">
              <button
                onClick={() => {
                  // Auto-select all topics for study mode
                  const allCategories = [
                    ...new Set(getAllQuestions().map((q) => q.category)),
                  ];
                  setSelectedTopics(allCategories);
                  setStudyMode("study");
                  setShowStudySetup(true);
                  setShowQuizSetup(false);
                  setActiveTab("studysetup");
                  setSelectedCategory("all");
                }}
                className={`w-full ${darkMode ? "bg-white/10 hover:bg-white/15" : "bg-slate-900 hover:bg-slate-800"} backdrop-blur-xl rounded-2xl p-8 transition-all duration-200`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`${darkMode ? "bg-blue-500/20" : "bg-blue-100"} p-3 rounded-xl`}
                    >
                      <BookOpen
                        className={`w-7 h-7 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                      />
                    </div>
                    <h3
                      className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-white"}`}
                    >
                      Study
                    </h3>
                  </div>
                  <ChevronRight
                    className={`w-6 h-6 ${darkMode ? "text-slate-400" : "text-slate-300"}`}
                  />
                </div>
              </button>

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
                className={`w-full ${darkMode ? "bg-white/10 hover:bg-white/15" : "bg-slate-900 hover:bg-slate-800"} backdrop-blur-xl rounded-2xl p-8 transition-all duration-200`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`${darkMode ? "bg-orange-500/20" : "bg-orange-100"} p-3 rounded-xl`}
                    >
                      <Target
                        className={`w-7 h-7 ${darkMode ? "text-orange-400" : "text-orange-600"}`}
                      />
                    </div>
                    <h3
                      className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-white"}`}
                    >
                      Quiz
                    </h3>
                  </div>
                  <ChevronRight
                    className={`w-6 h-6 ${darkMode ? "text-slate-400" : "text-slate-300"}`}
                  />
                </div>
              </button>

              <button
                onClick={() => {
                  setStudyMode("flashcard");
                  setActiveTab("flashcard");
                  loadQuestions("review"); // Load questions due for review using SM-2
                }}
                className={`w-full ${darkMode ? "bg-white/10 hover:bg-white/15" : "bg-slate-900 hover:bg-slate-800"} backdrop-blur-xl rounded-2xl p-8 transition-all duration-200`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`${darkMode ? "bg-purple-500/20" : "bg-purple-100"} p-3 rounded-xl`}
                    >
                      <RotateCcw
                        className={`w-7 h-7 ${darkMode ? "text-purple-400" : "text-purple-600"}`}
                      />
                    </div>
                    <div className="text-left">
                      <h3
                        className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-white"}`}
                      >
                        Flashcards
                      </h3>
                      <p
                        className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-300"}`}
                      >
                        {(() => {
                          const srsStats = getSRSStats(
                            srsData,
                            getAllQuestions().length,
                          );
                          return `${srsStats.dueNow} cards due now`;
                        })()}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-6 h-6 ${darkMode ? "text-slate-400" : "text-slate-300"}`}
                  />
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab("learningpath");
                }}
                className={`w-full ${darkMode ? "bg-white/10 hover:bg-white/15" : "bg-slate-900 hover:bg-slate-800"} backdrop-blur-xl rounded-2xl p-8 transition-all duration-200`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`${darkMode ? "bg-green-500/20" : "bg-green-100"} p-3 rounded-xl`}
                    >
                      <BookOpen
                        className={`w-7 h-7 ${darkMode ? "text-green-400" : "text-green-600"}`}
                      />
                    </div>
                    <div className="text-left">
                      <h3
                        className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-white"}`}
                      >
                        Learning Path
                      </h3>
                      <p
                        className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-300"}`}
                      >
                        Structured curriculum with progressive unlocking
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-6 h-6 ${darkMode ? "text-slate-400" : "text-slate-300"}`}
                  />
                </div>
              </button>
            </div>

            {/* Stats - Simple & Elegant */}
            {performanceStats.overall.correct > 0 && (
              <div
                className={`${darkMode ? "bg-white/5" : "bg-slate-100"} rounded-2xl p-6 mb-8`}
              >
                <div className="grid grid-cols-2 gap-4 text-center mb-4">
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
                <button
                  onClick={() => setActiveTab("progress")}
                  className={`w-full ${darkMode ? "bg-white/10 hover:bg-white/15" : "bg-white hover:bg-slate-50"} rounded-lg p-3 transition-all duration-200 flex items-center justify-center gap-2`}
                >
                  <TrendingUp
                    className={`w-4 h-4 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                  />
                  <span
                    className={`text-sm font-medium ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    View Detailed Stats
                  </span>
                </button>
              </div>
            )}

            {/* Quick Access - Only show if weak topics or flagged questions exist */}
            {(weakTopics.length > 0 || flaggedQuestions.length > 0) && (
              <div className="mt-8">
                <div className="space-y-2">
                  {weakTopics.length > 0 && (
                    <button
                      onClick={() => {
                        setStudyMode("weak");
                        setActiveTab("study");
                        setShowStudySetup(false);
                        loadQuestions("weak");
                      }}
                      className={`w-full ${darkMode ? "bg-orange-500/20 hover:bg-orange-500/30 border-2 border-orange-500/50" : "bg-orange-100 hover:bg-orange-200 border-2 border-orange-300"} rounded-xl p-4 transition text-left`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Zap
                            className={`w-5 h-5 ${darkMode ? "text-orange-400" : "text-orange-600"}`}
                          />
                          <span
                            className={`font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
                          >
                            Practice Weak Questions
                          </span>
                        </div>
                        <span
                          className={`text-sm ${darkMode ? "text-orange-300" : "text-orange-700"}`}
                        >
                          {weakTopics.length} topic
                          {weakTopics.length !== 1 ? "s" : ""} &lt; 70%
                        </span>
                      </div>
                    </button>
                  )}

                  {flaggedQuestions.length > 0 && (
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
                  )}
                </div>
              </div>
            )}
          </div>
        ) : activeTab === "quizsetup" ? (
          <div
            className={`max-w-4xl mx-auto ${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl p-6`}
          >
            <div className="mb-6">
              <h2
                className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                Setup Your Quiz
              </h2>
            </div>

            <p
              className={`mb-6 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
            >
              All topics are selected by default. Deselect topics you&apos;ve
              mastered to focus your quiz.
            </p>

            {/* Topic Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3
                  className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  Select Topics:
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedTopics(categories)}
                    className={`px-3 py-1 rounded text-sm ${darkMode ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-slate-200 hover:bg-slate-300 text-slate-900"}`}
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => setSelectedTopics([])}
                    className={`px-3 py-1 rounded text-sm ${darkMode ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-slate-200 hover:bg-slate-300 text-slate-900"}`}
                  >
                    Deselect All
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      if (selectedTopics.includes(cat)) {
                        setSelectedTopics((prev) =>
                          prev.filter((t) => t !== cat),
                        );
                      } else {
                        setSelectedTopics((prev) => [...prev, cat]);
                      }
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      selectedTopics.includes(cat)
                        ? "bg-orange-600 text-white"
                        : darkMode
                          ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Types */}
            <div className="mb-6">
              <h3
                className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"} mb-3`}
              >
                Question Types:
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(questionTypeLabels).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      if (selectedQuestionTypes.includes(type)) {
                        setSelectedQuestionTypes((prev) =>
                          prev.filter((t) => t !== type),
                        );
                      } else {
                        setSelectedQuestionTypes((prev) => [...prev, type]);
                      }
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      selectedQuestionTypes.includes(type)
                        ? "bg-orange-600 text-white"
                        : darkMode
                          ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    {questionTypeLabels[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="mb-6">
              <h3
                className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"} mb-3`}
              >
                Number of Questions:
              </h3>
              <div className="flex gap-3">
                {[10, 25, 50].map((count) => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      questionCount === count
                        ? "bg-orange-600 text-white"
                        : darkMode
                          ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setStudyMode("quiz"); // Keep quiz mode active
                setActiveTab("study");
                setShowQuizSetup(false);
                loadQuestions(selectedTopics.length > 0 ? "custom" : "all");
              }}
              disabled={selectedTopics.length === 0}
              className={`w-full px-6 py-3 rounded-lg font-medium transition ${
                selectedTopics.length === 0
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700 text-white"
              }`}
            >
              Start Quiz (
              {selectedTopics.length > 0
                ? Math.min(questionCount, getCustomQuestions().length)
                : 0}{" "}
              questions)
            </button>
          </div>
        ) : activeTab === "studysetup" ? (
          <div
            className={`max-w-4xl mx-auto ${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl p-6`}
          >
            <div className="mb-6">
              <h2
                className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                Setup Your Study Session
              </h2>
            </div>

            {/* Study Sub-Mode Selection */}
            <div className="mb-6">
              <h3
                className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"} mb-3`}
              >
                Study Method:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => setStudySubMode("activeRecall")}
                  className={`p-4 rounded-lg border-2 text-left transition ${
                    studySubMode === "activeRecall"
                      ? darkMode
                        ? "bg-blue-900/30 border-blue-600"
                        : "bg-blue-50 border-blue-500"
                      : darkMode
                        ? "bg-slate-700 border-slate-600 hover:border-slate-500"
                        : "bg-white border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <div
                    className={`font-semibold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    🧠 Active Recall
                  </div>
                  <div
                    className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Hide answer, try to recall, then self-rate. Best for
                    retention.
                  </div>
                </button>

                <button
                  onClick={() => setStudySubMode("learnNew")}
                  className={`p-4 rounded-lg border-2 text-left transition ${
                    studySubMode === "learnNew"
                      ? darkMode
                        ? "bg-green-900/30 border-green-600"
                        : "bg-green-50 border-green-500"
                      : darkMode
                        ? "bg-slate-700 border-slate-600 hover:border-slate-500"
                        : "bg-white border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <div
                    className={`font-semibold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    ✨ Learn New
                  </div>
                  <div
                    className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Only questions you&apos;ve never seen. Build initial
                    knowledge.
                  </div>
                </button>

                <button
                  onClick={() => setStudySubMode("review")}
                  className={`p-4 rounded-lg border-2 text-left transition ${
                    studySubMode === "review"
                      ? darkMode
                        ? "bg-purple-900/30 border-purple-600"
                        : "bg-purple-50 border-purple-500"
                      : darkMode
                        ? "bg-slate-700 border-slate-600 hover:border-slate-500"
                        : "bg-white border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <div
                    className={`font-semibold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    🔄 Review Due
                  </div>
                  <div
                    className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Questions due for review based on spaced repetition.
                  </div>
                </button>

                <button
                  onClick={() => setStudySubMode("readThrough")}
                  className={`p-4 rounded-lg border-2 text-left transition ${
                    studySubMode === "readThrough"
                      ? darkMode
                        ? "bg-orange-900/30 border-orange-600"
                        : "bg-orange-50 border-orange-500"
                      : darkMode
                        ? "bg-slate-700 border-slate-600 hover:border-slate-500"
                        : "bg-white border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <div
                    className={`font-semibold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    📖 Read-Through
                  </div>
                  <div
                    className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    See question and explanation immediately. Quick review.
                  </div>
                </button>
              </div>
            </div>

            {/* Topic Selection */}
            <div className="mb-6">
              <h3
                className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"} mb-3`}
              >
                Select Topics:
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      if (selectedTopics.includes(cat)) {
                        setSelectedTopics((prev) =>
                          prev.filter((t) => t !== cat),
                        );
                      } else {
                        setSelectedTopics((prev) => [...prev, cat]);
                      }
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      selectedTopics.includes(cat)
                        ? "bg-blue-600 text-white"
                        : darkMode
                          ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Type Selection */}
            <div className="mb-6">
              <h3
                className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"} mb-3`}
              >
                Question Types:
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(questionTypeLabels).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      if (selectedQuestionTypes.includes(type)) {
                        setSelectedQuestionTypes((prev) =>
                          prev.filter((t) => t !== type),
                        );
                      } else {
                        setSelectedQuestionTypes((prev) => [...prev, type]);
                      }
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      selectedQuestionTypes.includes(type)
                        ? "bg-orange-600 text-white"
                        : darkMode
                          ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    {questionTypeLabels[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count Selection */}
            <div className="mb-6">
              <h3
                className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"} mb-3`}
              >
                Number of Questions:
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[10, 25, 50].map((count) => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                      questionCount === count
                        ? "bg-green-600 text-white border-2 border-green-500"
                        : darkMode
                          ? "bg-slate-700 text-slate-300 hover:bg-slate-600 border-2 border-slate-600"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300 border-2 border-slate-300"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setStudyMode("study");
                setActiveTab("study");
                setShowStudySetup(false);
                loadQuestions("custom");
              }}
              disabled={selectedTopics.length === 0}
              className={`w-full px-6 py-3 rounded-lg font-medium transition ${
                selectedTopics.length === 0
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Start Study Session (
              {selectedTopics.length > 0
                ? Math.min(questionCount, getCustomQuestions().length)
                : 0}{" "}
              questions)
            </button>
          </div>
        ) : activeTab === "progress" ? (
          <div className={`max-w-4xl mx-auto space-y-6`}>
            {/* Overall Progress */}
            <div
              className={`${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"} rounded-xl p-8 border-2 text-center`}
            >
              <h2
                className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                Your Progress
              </h2>
              <div
                className={`text-6xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
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
                className={`w-full h-6 rounded-full overflow-hidden mb-4 ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}
              >
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                  style={{
                    width: `${getAllQuestions().length > 0 ? Math.round((Object.values(questionMastery).filter((q) => q.correctCount >= 3).length / getAllQuestions().length) * 100) : 0}%`,
                  }}
                />
              </div>
              <div
                className={`text-lg ${darkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                <span className="font-bold text-green-400">
                  {
                    Object.values(questionMastery).filter(
                      (q) => q.correctCount >= 3,
                    ).length
                  }
                </span>{" "}
                of {getAllQuestions().length} questions mastered
              </div>
            </div>

            {/* SM-2 Spaced Repetition Stats */}
            <div
              className={`${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"} rounded-xl p-6 border-2`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                <Clock className="w-5 h-5 inline mr-2" />
                Spaced Repetition Review
              </h3>
              {(() => {
                const srsStats = getSRSStats(srsData, getAllQuestions().length);
                return (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div
                      className={`${darkMode ? "bg-blue-900/20 border-blue-600" : "bg-blue-50 border-blue-400"} border-2 rounded-lg p-4 text-center`}
                    >
                      <div
                        className={`text-3xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                      >
                        {srsStats.dueNow}
                      </div>
                      <div
                        className={`text-sm mt-1 ${darkMode ? "text-slate-300" : "text-slate-600"}`}
                      >
                        Due Now
                      </div>
                    </div>
                    <div
                      className={`${darkMode ? "bg-green-900/20 border-green-600" : "bg-green-50 border-green-400"} border-2 rounded-lg p-4 text-center`}
                    >
                      <div
                        className={`text-3xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}
                      >
                        {srsStats.new}
                      </div>
                      <div
                        className={`text-sm mt-1 ${darkMode ? "text-slate-300" : "text-slate-600"}`}
                      >
                        New
                      </div>
                    </div>
                    <div
                      className={`${darkMode ? "bg-yellow-900/20 border-yellow-600" : "bg-yellow-50 border-yellow-400"} border-2 rounded-lg p-4 text-center`}
                    >
                      <div
                        className={`text-3xl font-bold ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}
                      >
                        {srsStats.learning}
                      </div>
                      <div
                        className={`text-sm mt-1 ${darkMode ? "text-slate-300" : "text-slate-600"}`}
                      >
                        Learning
                      </div>
                    </div>
                    <div
                      className={`${darkMode ? "bg-purple-900/20 border-purple-600" : "bg-purple-50 border-purple-400"} border-2 rounded-lg p-4 text-center`}
                    >
                      <div
                        className={`text-3xl font-bold ${darkMode ? "text-purple-400" : "text-purple-600"}`}
                      >
                        {srsStats.mature}
                      </div>
                      <div
                        className={`text-sm mt-1 ${darkMode ? "text-slate-300" : "text-slate-600"}`}
                      >
                        Mature
                      </div>
                    </div>
                  </div>
                );
              })()}
              <div
                className={`mt-4 text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
              >
                <p>
                  <strong>New:</strong> Never reviewed •{" "}
                  <strong>Learning:</strong> &lt; 3 correct •{" "}
                  <strong>Mature:</strong> ≥ 3 correct
                </p>
                <p className="mt-2">
                  Study questions &quot;Due Now&quot; for optimal spaced
                  repetition learning!
                </p>
              </div>
            </div>

            {/* What to Focus On */}
            <div
              className={`${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"} rounded-xl p-6 border-2`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                What to Focus On
              </h3>
              <div className="space-y-3">
                {/* Weak Questions */}
                {Object.values(questionMastery).filter(
                  (q) => q.incorrectCount >= 2,
                ).length > 0 ? (
                  <div
                    className={`${darkMode ? "bg-orange-900/20 border-orange-600" : "bg-orange-50 border-orange-400"} border-2 rounded-lg p-4`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div
                          className={`font-semibold mb-1 ${darkMode ? "text-orange-400" : "text-orange-700"}`}
                        >
                          <Zap className="w-4 h-4 inline mr-2" />
                          {
                            Object.values(questionMastery).filter(
                              (q) => q.incorrectCount >= 2,
                            ).length
                          }{" "}
                          Weak Questions
                        </div>
                        <div
                          className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                        >
                          Missed 2 or more times - needs practice
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setStudyMode("weak");
                          setActiveTab("study");
                          loadQuestions("weak");
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                          darkMode
                            ? "bg-orange-600 hover:bg-orange-700 text-white"
                            : "bg-orange-500 hover:bg-orange-600 text-white"
                        }`}
                      >
                        Practice Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${darkMode ? "bg-green-900/20 border-green-600" : "bg-green-50 border-green-400"} border-2 rounded-lg p-4 text-center`}
                  >
                    <CheckCircle2
                      className={`w-8 h-8 mx-auto mb-2 ${darkMode ? "text-green-400" : "text-green-600"}`}
                    />
                    <div
                      className={`font-semibold ${darkMode ? "text-green-400" : "text-green-700"}`}
                    >
                      No weak areas - great job!
                    </div>
                  </div>
                )}

                {/* Overall Accuracy */}
                {performanceStats.overall.correct +
                  performanceStats.overall.incorrect >
                  0 && (
                  <div
                    className={`${darkMode ? "bg-blue-900/20 border-blue-600" : "bg-blue-50 border-blue-400"} border-2 rounded-lg p-4`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div
                          className={`font-semibold mb-1 ${darkMode ? "text-blue-400" : "text-blue-700"}`}
                        >
                          <Target className="w-4 h-4 inline mr-2" />
                          {Math.round(
                            (performanceStats.overall.correct /
                              (performanceStats.overall.correct +
                                performanceStats.overall.incorrect)) *
                              100,
                          )}
                          % Overall Accuracy
                        </div>
                        <div
                          className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                        >
                          {performanceStats.overall.correct} correct out of{" "}
                          {performanceStats.overall.correct +
                            performanceStats.overall.incorrect}{" "}
                          total attempts
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Best Streak */}
                {performanceStats.overall.bestStreak > 0 && (
                  <div
                    className={`${darkMode ? "bg-yellow-900/20 border-yellow-600" : "bg-yellow-50 border-yellow-400"} border-2 rounded-lg p-4`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div
                          className={`font-semibold mb-1 ${darkMode ? "text-yellow-400" : "text-yellow-700"}`}
                        >
                          <Flame className="w-4 h-4 inline mr-2" />
                          {performanceStats.overall.bestStreak} Question Streak
                        </div>
                        <div
                          className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                        >
                          Your best streak of correct answers
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to reset all progress?")
                ) {
                  setPerformanceStats({
                    byCategory: {},
                    byQuestionType: {},
                    overall: {
                      correct: 0,
                      incorrect: 0,
                      streak: 0,
                      bestStreak: 0,
                    },
                  });
                  setFlaggedQuestions([]);
                  setQuestionMastery({});
                }
              }}
              className={`${darkMode ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-300 hover:bg-slate-400"} px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 mx-auto`}
            >
              <RotateCcw className="w-5 h-5" />
              Reset All Progress
            </button>
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
                    ? "Back to Learning Path"
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
                    {currentQuestions.length - Object.keys(userAnswers).length}
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
                                    {question.questionType === "multipleChoice"
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
                                    {question.questionType === "multipleChoice"
                                      ? question.options[question.correctAnswer]
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
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setActiveTab("home");
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
                  Return to Main Menu
                </button>
                <button
                  onClick={() => {
                    setShowQuizSetup(true);
                    setActiveTab("quizsetup");
                  }}
                  className="flex-1 px-6 py-3 rounded-lg font-medium transition bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Take Another Quiz
                </button>
              </div>
            </div>
          </div>
        ) : activeTab === "flashcard" ? (
          <div className="max-w-4xl mx-auto">
            {currentQuestions.length > 0 && currentQuestion ? (
              <Flashcard
                question={currentQuestion}
                onNext={() => {
                  if (currentQuestionIndex < currentQuestions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                  }
                }}
                onPrevious={() => {
                  if (currentQuestionIndex > 0) {
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                  }
                }}
                onRate={(quality) => {
                  // Update SM-2 SRS data based on quality rating
                  setSrsData((prev) => {
                    const existingCard = prev[currentQuestion.id];
                    const updatedCard = calculateSM2(quality, existingCard);
                    return {
                      ...prev,
                      [currentQuestion.id]: updatedCard,
                    };
                  });

                  // Move to next card
                  if (currentQuestionIndex < currentQuestions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                  } else {
                    // Completed all flashcards
                    setActiveTab("home");
                  }
                }}
                currentIndex={currentQuestionIndex}
                totalCards={currentQuestions.length}
                darkMode={darkMode}
              />
            ) : (
              <div
                className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl p-8 text-center`}
              >
                <CheckCircle2
                  className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-green-400" : "text-green-600"}`}
                />
                <h2
                  className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  All Cards Reviewed!
                </h2>
                <p
                  className={`mb-6 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  You&apos;ve reviewed all flashcards due for today. Great work!
                </p>
                <button
                  onClick={() => setActiveTab("home")}
                  className="px-6 py-3 rounded-lg font-medium transition bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Return to Home
                </button>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setActiveTab("home")}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  darkMode
                    ? "bg-slate-700 hover:bg-slate-600 text-white"
                    : "bg-slate-300 hover:bg-slate-400 text-slate-900"
                }`}
              >
                ← Exit Flashcards
              </button>
            </div>
          </div>
        ) : activeTab === "learningpath" ? (
          <LearningPath
            learningPath={learningPath}
            allQuestions={getAllQuestions()}
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
          <div className="max-w-4xl mx-auto h-[calc(100vh-180px)] flex flex-col">
            {/* Question Counter with Progress Bar */}
            <div className="mb-3 flex-shrink-0">
              <div className="text-center mb-1">
                <span
                  className={`text-base font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  Question {currentQuestionIndex + 1} of{" "}
                  {currentQuestions.length}
                </span>
              </div>
              {/* Progress Bar */}
              <div
                className={`w-full h-1.5 rounded-full overflow-hidden ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}
              >
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
                  style={{
                    width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div
              key={currentQuestion?.id}
              className={`${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"} rounded-xl shadow-2xl p-4 md:p-5 border-2 flex-1 overflow-y-auto question-enter`}
            >
              {currentQuestion && (
                <div className="mb-2 flex items-center justify-between flex-wrap gap-1">
                  <div className="flex items-center gap-1">
                    {currentQuestion.difficulty === "critical" && (
                      <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                        CRITICAL
                      </span>
                    )}
                    {questionMastery[currentQuestion.id]?.incorrectCount >=
                      2 && (
                      <span className="bg-orange-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                        WEAK
                      </span>
                    )}
                  </div>
                  <button
                    onClick={toggleFlag}
                    className={`px-2 py-0.5 rounded-lg text-xs font-medium transition ${
                      flaggedQuestions.includes(currentQuestion.id)
                        ? "bg-yellow-600 text-white"
                        : darkMode
                          ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    {flaggedQuestions.includes(currentQuestion.id) ? "⭐" : "☆"}
                  </button>
                </div>
              )}

              {renderQuestion()}
            </div>

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

            {/* Navigation - Fixed at Bottom */}
            <div
              className={`fixed bottom-0 left-0 right-0 ${darkMode ? "bg-slate-900/95" : "bg-white/95"} backdrop-blur-sm border-t ${darkMode ? "border-slate-700" : "border-slate-300"} p-2 shadow-2xl z-10`}
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
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-sm touch-manipulation ${
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
                      <span className="hidden sm:inline text-sm">Previous</span>
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
                          className="bg-green-600 hover:bg-green-700 active:scale-95 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm touch-manipulation"
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
                          className="bg-green-600 hover:bg-green-700 active:scale-95 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm touch-manipulation"
                        >
                          Submit
                        </button>
                      )}

                    {currentQuestionIndex === currentQuestions.length - 1 &&
                    studyMode === "quiz" &&
                    showExplanation ? (
                      <button
                        onClick={() => setActiveTab("results")}
                        className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-sm touch-manipulation"
                      >
                        <span className="hidden sm:inline">Finish</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    ) : currentQuestionIndex === currentQuestions.length - 1 &&
                      studyMode !== "quiz" ? (
                      <button
                        onClick={() => setActiveTab("studycomplete")}
                        className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1 bg-green-600 hover:bg-green-700 active:scale-95 text-white text-sm touch-manipulation"
                      >
                        <span className="hidden sm:inline">Finish</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-sm touch-manipulation ${
                          darkMode
                            ? "bg-slate-700 hover:bg-slate-600 text-white active:scale-95"
                            : "bg-white hover:bg-slate-100 text-slate-900 active:scale-95"
                        }`}
                      >
                        <span className="hidden sm:inline text-sm">Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
