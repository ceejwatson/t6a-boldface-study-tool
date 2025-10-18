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
} from "lucide-react";

import MultipleChoice from "./components/MultipleChoice";
import TrueFalse from "./components/TrueFalse";
import ReorderSequence from "./components/ReorderSequence";
import MatchItems from "./components/MatchItems";

import { questionDatabase, getLimitationQuestions } from "./questionData";

export default function T6AEnhancedStudyTool() {
  // UI State
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("study");
  const [studyMode, setStudyMode] = useState("study"); // 'study', 'quiz', 'custom', 'limitations'

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
  const [confidenceRating, setConfidenceRating] = useState({}); // Science-based: confidence self-assessment
  const [showQuizSetup, setShowQuizSetup] = useState(false); // Show topic selection before quiz

  // Performance Tracking
  const [performanceStats, setPerformanceStats] = useState({
    byCategory: {},
    byQuestionType: {},
    overall: { correct: 0, incorrect: 0, streak: 0, bestStreak: 0 },
  });

  // Adaptive Learning
  const [weakTopics, setWeakTopics] = useState([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);

  // Load saved data
  useEffect(() => {
    const savedPerformance = localStorage.getItem("t6a-performance");
    const savedFlags = localStorage.getItem("t6a-flagged");

    if (savedPerformance) setPerformanceStats(JSON.parse(savedPerformance));
    if (savedFlags) setFlaggedQuestions(JSON.parse(savedFlags));

    // Initialize questions
    loadQuestions("all");

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

  const loadQuestions = (mode) => {
    let questions = [];

    switch (mode) {
      case "limitations":
        questions = getLimitationQuestions();
        break;
      case "weak":
        // Get questions from weak topics
        const allQuestions = getAllQuestions();
        questions = allQuestions.filter((q) => weakTopics.includes(q.category));
        break;
      case "flagged":
        const all = getAllQuestions();
        questions = all.filter((q) => flaggedQuestions.includes(q.id));
        break;
      case "custom":
        questions = getCustomQuestions();
        break;
      default:
        questions = getAllQuestions();
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
    const all = getAllQuestions();
    if (selectedTopics.length === 0) return all;
    return all.filter((q) => selectedTopics.includes(q.category));
  };

  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    const newAnswers = { ...userAnswers, [currentQuestion.id]: answer };
    setUserAnswers(newAnswers);

    // For multiple choice and true/false, auto-submit immediately
    const autoSubmitTypes = ["multipleChoice", "trueFalse"];

    if (autoSubmitTypes.includes(currentQuestion.questionType)) {
      // Auto-submit for simple question types
      if (studyMode === "study") {
        setShowExplanation(true);
      }
      const isCorrect = checkAnswer(currentQuestion, answer);
      updatePerformance(currentQuestion, isCorrect);
      return;
    }

    // For complex types (reorder, match), just save answer
    // User will submit manually
    if (studyMode === "study") {
      // Still show explanation in study mode for match items
      if (currentQuestion.questionType === "matchItems") {
        // Check if all items are matched
        const allMatched = currentQuestion.pairs.every(
          (pair) => answer[pair.left] !== undefined,
        );
        if (allMatched) {
          setShowExplanation(true);
          const isCorrect = checkAnswer(currentQuestion, answer);
          updatePerformance(currentQuestion, isCorrect);
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
        return question.pairs.every((pair) => answer[pair.left] === pair.right);
      default:
        return false;
    }
  };

  const updatePerformance = (question, isCorrect) => {
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
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      // Reset explanation - retrieval practice (science-based)
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      // Reset explanation for retrieval practice
      setShowExplanation(false);
    }
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

    const props = {
      question: currentQuestion,
      onAnswer: handleAnswer,
      showExplanation: showExplanation,
      userAnswer: userAnswers[currentQuestion.id],
      disabled: showExplanation && studyMode === "study",
      darkMode: darkMode,
      isLimitationsMode: studyMode === "limitations",
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
              {/* Stats */}
              <div className="flex gap-3 text-sm">
                <div
                  className={`rounded-lg px-3 py-2 border ${darkMode ? "bg-green-600/20 border-green-500/50" : "bg-green-100 border-green-400"}`}
                >
                  <div
                    className={`font-semibold ${darkMode ? "text-green-400" : "text-green-700"}`}
                  >
                    {performanceStats.overall.correct}
                  </div>
                  <div
                    className={`text-xs ${darkMode ? "text-green-300" : "text-green-600"}`}
                  >
                    Correct
                  </div>
                </div>
                <div
                  className={`rounded-lg px-3 py-2 border ${darkMode ? "bg-yellow-600/20 border-yellow-500/50" : "bg-yellow-100 border-yellow-400"}`}
                >
                  <div
                    className={`font-semibold ${darkMode ? "text-yellow-400" : "text-yellow-700"}`}
                  >
                    {performanceStats.overall.streak}
                  </div>
                  <div
                    className={`text-xs ${darkMode ? "text-yellow-300" : "text-yellow-600"}`}
                  >
                    Streak
                  </div>
                </div>
              </div>

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
        {/* Mode Selection */}
        <div className="mb-6 flex gap-3 flex-wrap">
          <button
            onClick={() => {
              setStudyMode("study");
              loadQuestions("all");
            }}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              studyMode === "study"
                ? "bg-blue-600 text-white"
                : darkMode
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Study Mode
          </button>

          <button
            onClick={() => {
              setStudyMode("quiz");
              setShowExplanation(false);
              setShowQuizSetup(true); // Show topic selector first
              setActiveTab("quizsetup");
            }}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              studyMode === "quiz"
                ? "bg-purple-600 text-white"
                : darkMode
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Brain className="w-4 h-4" />
            Quiz Mode
          </button>

          <button
            onClick={() => {
              setStudyMode("limitations");
              loadQuestions("limitations");
            }}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              studyMode === "limitations"
                ? "bg-red-600 text-white"
                : darkMode
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Flame className="w-4 h-4" />
            Limitations Only
          </button>

          {weakTopics.length > 0 && (
            <button
              onClick={() => {
                setStudyMode("weak");
                loadQuestions("weak");
              }}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                studyMode === "weak"
                  ? "bg-orange-600 text-white"
                  : darkMode
                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Zap className="w-4 h-4" />
              Weak Topics ({weakTopics.length})
            </button>
          )}

          {flaggedQuestions.length > 0 && (
            <button
              onClick={() => {
                setStudyMode("flagged");
                loadQuestions("flagged");
              }}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                studyMode === "flagged"
                  ? "bg-yellow-600 text-white"
                  : darkMode
                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Target className="w-4 h-4" />
              Flagged ({flaggedQuestions.length})
            </button>
          )}

          <button
            onClick={() => setActiveTab("custom")}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              activeTab === "custom"
                ? "bg-green-600 text-white"
                : darkMode
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Filter className="w-4 h-4" />
            Custom
          </button>

          <button
            onClick={() => setActiveTab("progress")}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              activeTab === "progress"
                ? "bg-indigo-600 text-white"
                : darkMode
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Progress
          </button>
        </div>

        {/* Question Count Selector */}
        {activeTab === "study" && (
          <div className="mb-6 flex items-center gap-3">
            <span
              className={`text-sm font-medium ${darkMode ? "text-slate-300" : "text-slate-700"}`}
            >
              Questions per session:
            </span>
            {[10, 25, 50].map((count) => (
              <button
                key={count}
                onClick={() => setQuestionCount(count)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  questionCount === count
                    ? "bg-blue-600 text-white"
                    : darkMode
                      ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        )}

        {/* Main Content */}
        {activeTab === "quizsetup" ? (
          <div
            className={`max-w-4xl mx-auto ${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl p-6`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                Setup Your Quiz
              </h2>
              <button
                onClick={() => {
                  setActiveTab("study");
                  setStudyMode("study");
                }}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  darkMode
                    ? "bg-slate-700 hover:bg-slate-600 text-white"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-900"
                }`}
              >
                ← Cancel
              </button>
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
                        ? "bg-purple-600 text-white"
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
                        ? "bg-purple-600 text-white"
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
                        ? "bg-purple-600 text-white"
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
                setActiveTab("study");
                loadQuestions(selectedTopics.length > 0 ? "custom" : "all");
              }}
              disabled={selectedTopics.length === 0}
              className={`w-full px-6 py-3 rounded-lg font-medium transition ${
                selectedTopics.length === 0
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              Start Quiz (
              {selectedTopics.length > 0 ? getCustomQuestions().length : 0}{" "}
              questions)
            </button>
          </div>
        ) : activeTab === "custom" ? (
          <div
            className={`max-w-4xl mx-auto ${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl p-6`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                Custom Study Session
              </h2>
              <button
                onClick={() => setActiveTab("study")}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  darkMode
                    ? "bg-slate-700 hover:bg-slate-600 text-white"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-900"
                }`}
              >
                ← Back to Study
              </button>
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
                        ? "bg-purple-600 text-white"
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

            <button
              onClick={() => {
                setStudyMode("custom");
                setActiveTab("study");
                loadQuestions("custom");
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Start Custom Session ({getCustomQuestions().length} questions)
            </button>
          </div>
        ) : activeTab === "progress" ? (
          <div className={`max-w-6xl mx-auto space-y-6`}>
            {/* Back Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setActiveTab("study")}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  darkMode
                    ? "bg-slate-700 hover:bg-slate-600 text-white"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-900"
                }`}
              >
                ← Back to Study
              </button>
            </div>

            {/* Overall Stats */}
            <div
              className={`${darkMode ? "bg-slate-800 border-blue-500" : "bg-white border-blue-300"} rounded-xl p-6 border-2`}
            >
              <h2
                className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"} mb-4 flex items-center gap-2`}
              >
                <Award className="w-6 h-6 text-yellow-400" />
                Overall Performance
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <div className="text-3xl font-bold text-blue-400">
                    {performanceStats.overall.correct +
                      performanceStats.overall.incorrect}
                  </div>
                  <div
                    className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Total Attempts
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">
                    {performanceStats.overall.correct}
                  </div>
                  <div
                    className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Correct
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400">
                    {performanceStats.overall.bestStreak}
                  </div>
                  <div
                    className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Best Streak
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">
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
                    className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Accuracy
                  </div>
                </div>
              </div>
            </div>

            {/* By Category */}
            <div
              className={`${darkMode ? "bg-slate-800 border-purple-500" : "bg-white border-purple-300"} rounded-xl p-6 border-2`}
            >
              <h2
                className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"} mb-4`}
              >
                Performance by Topic
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(performanceStats.byCategory).map((category) => {
                  const stats = performanceStats.byCategory[category];
                  const total = stats.correct + stats.incorrect;
                  const accuracy =
                    total > 0 ? Math.round((stats.correct / total) * 100) : 0;
                  const isWeak = weakTopics.includes(category);

                  return (
                    <div
                      key={category}
                      className={`${darkMode ? "bg-slate-700" : "bg-slate-100"} rounded-lg p-4 ${isWeak ? "border-2 border-orange-500" : ""}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
                        >
                          {category}
                        </div>
                        {isWeak && <Zap className="w-4 h-4 text-orange-500" />}
                      </div>
                      <div className="text-2xl font-bold text-blue-400">
                        {accuracy}%
                      </div>
                      <div
                        className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                      >
                        {stats.correct}/{total} correct
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weak Topics Alert */}
            {weakTopics.length > 0 && (
              <div className="bg-orange-900/30 border-2 border-orange-600 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-orange-400 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Topics Needing Review
                </h3>
                <p
                  className={`${darkMode ? "text-slate-300" : "text-slate-700"} mb-3`}
                >
                  Focus on these topics to improve your performance:
                </p>
                <div className="flex flex-wrap gap-2">
                  {weakTopics.map((topic) => (
                    <span
                      key={topic}
                      className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

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
                }
              }}
              className={`${darkMode ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-300 hover:bg-slate-400"} px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 mx-auto`}
            >
              <RotateCcw className="w-5 h-5" />
              Reset All Progress
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Question Counter */}
            <div className="text-center mb-4">
              <span
                className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                Question {currentQuestionIndex + 1} of {currentQuestions.length}
              </span>
            </div>

            {/* Question Card */}
            <div
              className={`${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"} rounded-xl shadow-2xl p-8 border-2`}
            >
              {currentQuestion && (
                <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        currentQuestion.difficulty === "critical"
                          ? "bg-red-600 text-white"
                          : currentQuestion.difficulty === "high"
                            ? "bg-orange-600 text-white"
                            : "bg-yellow-600 text-white"
                      }`}
                    >
                      {currentQuestion.difficulty?.toUpperCase()}
                    </span>
                    <span
                      className={`${darkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"} px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      {currentQuestion.category}
                    </span>
                    <span
                      className={`${darkMode ? "bg-purple-900/30 text-purple-300" : "bg-purple-100 text-purple-700"} px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      {questionTypeLabels[currentQuestion.questionType]}
                    </span>
                  </div>
                  <button
                    onClick={toggleFlag}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      flaggedQuestions.includes(currentQuestion.id)
                        ? "bg-yellow-600 text-white"
                        : darkMode
                          ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    {flaggedQuestions.includes(currentQuestion.id)
                      ? "⭐ Flagged"
                      : "☆ Flag for Review"}
                  </button>
                </div>
              )}

              {renderQuestion()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
                  currentQuestionIndex === 0
                    ? darkMode
                      ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : darkMode
                      ? "bg-slate-700 hover:bg-slate-600 text-white"
                      : "bg-white hover:bg-slate-100 text-slate-900"
                }`}
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                Previous
              </button>

              {/* Submit button for sequence questions in study mode */}
              {studyMode === "study" &&
                currentQuestion?.questionType === "reorderSequence" &&
                userAnswers[currentQuestion?.id] &&
                !showExplanation && (
                  <button
                    onClick={() => {
                      setShowExplanation(true);
                      const isCorrect = checkAnswer(
                        currentQuestion,
                        userAnswers[currentQuestion.id],
                      );
                      updatePerformance(currentQuestion, isCorrect);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
                  >
                    Submit Order
                  </button>
                )}

              {/* Show Answer for complex types in quiz mode if not answered */}
              {studyMode === "quiz" &&
                !showExplanation &&
                (currentQuestion?.questionType === "reorderSequence" ||
                  currentQuestion?.questionType === "matchItems") &&
                !userAnswers[currentQuestion?.id] && (
                  <button
                    onClick={() => {
                      setShowExplanation(true);
                      updatePerformance(currentQuestion, false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                  >
                    Show Answer
                  </button>
                )}

              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === currentQuestions.length - 1}
                className={`px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
                  currentQuestionIndex === currentQuestions.length - 1
                    ? darkMode
                      ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : darkMode
                      ? "bg-slate-700 hover:bg-slate-600 text-white"
                      : "bg-white hover:bg-slate-100 text-slate-900"
                }`}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
