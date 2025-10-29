"use client";

import { CheckCircle2, XCircle, BookOpen } from "lucide-react";
import { useMemo } from "react";

export default function TrueFalse({
  question,
  onAnswer,
  showExplanation,
  userAnswer,
  disabled,
  darkMode = true,
  showCorrectness = true,
  fontSize = "medium",
}) {
  // Randomize True/False order - memoized so it doesn't change during component lifecycle
  const buttonOrder = useMemo(() => {
    return Math.random() < 0.5 ? [true, false] : [false, true];
  }, [question.id]);

  const handleSelect = (value) => {
    if (disabled) return;
    onAnswer(value);
  };

  const getButtonStyle = (value) => {
    if (!showExplanation || !showCorrectness) {
      return userAnswer === value
        ? "bg-blue-600 text-white border-blue-600 scale-105 shadow-lg"
        : darkMode
          ? "bg-slate-800 text-white border-slate-600 hover:border-blue-500 hover:scale-105"
          : "bg-white text-slate-900 border-slate-300 hover:border-blue-500 hover:scale-105";
    }

    // Show results (only in quiz mode)
    if (value === question.correctAnswer) {
      return "bg-green-600 text-white border-green-600 shadow-lg";
    }
    if (userAnswer === value && userAnswer !== question.correctAnswer) {
      return "bg-red-600 text-white border-red-600 shadow-lg";
    }
    return darkMode
      ? "bg-slate-700 text-slate-400 border-slate-600"
      : "bg-slate-100 text-slate-500 border-slate-300";
  };

  const getIcon = (value) => {
    if (!showExplanation || !showCorrectness) return null;

    if (value === question.correctAnswer) {
      return <CheckCircle2 className="w-8 h-8" />;
    }
    if (userAnswer === value && userAnswer !== question.correctAnswer) {
      return <XCircle className="w-8 h-8" />;
    }
    return null;
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "small":
        return "text-sm sm:text-base";
      case "large":
        return "text-lg sm:text-xl";
      case "xlarge":
        return "text-xl sm:text-2xl";
      default:
        return "text-base sm:text-lg";
    }
  };

  const getQuestionFontSize = () => {
    switch (fontSize) {
      case "small":
        return "text-base sm:text-lg";
      case "large":
        return "text-xl sm:text-2xl";
      case "xlarge":
        return "text-2xl sm:text-3xl";
      default:
        return "text-lg sm:text-xl";
    }
  };

  const getButtonFontSize = () => {
    switch (fontSize) {
      case "small":
        return "text-lg sm:text-xl";
      case "large":
        return "text-2xl sm:text-3xl";
      case "xlarge":
        return "text-3xl sm:text-4xl";
      default:
        return "text-xl sm:text-2xl";
    }
  };

  return (
    <div className="space-y-6">
      <h3
        className={`${getQuestionFontSize()} font-semibold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}
      >
        True or False: {question.question}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {buttonOrder.map((value, index) => (
          <button
            key={index}
            onClick={() => handleSelect(value)}
            disabled={disabled}
            className={`p-4 min-h-[80px] rounded-xl border-3 transition-all duration-200 flex flex-col items-center justify-center gap-2 touch-manipulation ${getButtonStyle(value)} ${
              disabled ? "cursor-not-allowed" : "cursor-pointer active:scale-95"
            }`}
          >
            {getIcon(value)}
            <span className={`${getButtonFontSize()} font-bold`}>
              {value ? "TRUE" : "FALSE"}
            </span>
          </button>
        ))}
      </div>

      {showExplanation && showCorrectness && (
        <div
          className={`mt-3 p-3 rounded-lg ${
            userAnswer === question.correctAnswer
              ? "bg-green-900/30 border-2 border-green-600"
              : "bg-red-900/30 border-2 border-red-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            {userAnswer === question.correctAnswer ? (
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <span
              className={`font-semibold text-sm ${
                userAnswer === question.correctAnswer
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {userAnswer === question.correctAnswer ? "Correct!" : "Incorrect"}
            </span>
          </div>
          {userAnswer !== question.correctAnswer && (
            <p
              className={`mt-2 ${getFontSizeClass()} ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              {question.explanation}
            </p>
          )}
        </div>
      )}
      {showExplanation && !showCorrectness && (
        <div
          className={`mt-3 p-3 rounded-lg ${
            darkMode
              ? "bg-yellow-900/20 border-2 border-yellow-600/50"
              : "bg-yellow-50 border-2 border-yellow-300"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <BookOpen
              className={`w-5 h-5 ${
                darkMode ? "text-yellow-400" : "text-yellow-800"
              }`}
            />
            <span
              className={`font-semibold text-sm ${
                darkMode ? "text-yellow-400" : "text-yellow-800"
              }`}
            >
              Explanation
            </span>
          </div>
          <p
            className={`mt-2 ${getFontSizeClass()} ${darkMode ? "text-white" : "text-slate-800"}`}
          >
            {question.explanation}
          </p>

          {/* Show correct answer */}
          <div
            className={`mt-2 p-2 rounded ${darkMode ? "bg-slate-800" : "bg-white"}`}
          >
            <p
              className={`text-xs mb-1 ${darkMode ? "text-slate-300" : "text-slate-600"}`}
            >
              Correct Answer:
            </p>
            <p
              className={`font-medium ${getFontSizeClass()} ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              {question.correctAnswer ? "True" : "False"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
