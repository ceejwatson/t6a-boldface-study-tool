"use client";

import { CheckCircle2, XCircle, BookOpen } from "lucide-react";

export default function MultipleChoice({
  question,
  onAnswer,
  showExplanation,
  userAnswer,
  disabled,
  darkMode = true,
  showCorrectness = true,
}) {
  const handleSelect = (index) => {
    if (disabled) return;
    onAnswer(index);
  };

  const getOptionStyle = (index) => {
    if (!showExplanation || !showCorrectness) {
      return userAnswer === index
        ? "bg-blue-600 text-white border-blue-600"
        : darkMode
          ? "bg-slate-800 text-white border-slate-600 hover:border-blue-500"
          : "bg-white text-slate-900 border-slate-300 hover:border-blue-500";
    }

    // Show results (only in quiz mode)
    if (index === question.correctAnswer) {
      return "bg-green-600 text-white border-green-600";
    }
    if (userAnswer === index && userAnswer !== question.correctAnswer) {
      return "bg-red-600 text-white border-red-600";
    }
    return darkMode
      ? "bg-slate-700 text-slate-400 border-slate-600"
      : "bg-slate-100 text-slate-500 border-slate-300";
  };

  const getOptionIcon = (index) => {
    if (!showExplanation || !showCorrectness) return null;

    if (index === question.correctAnswer) {
      return <CheckCircle2 className="w-5 h-5" />;
    }
    if (userAnswer === index && userAnswer !== question.correctAnswer) {
      return <XCircle className="w-5 h-5" />;
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <h3
        className={`text-xl font-semibold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}
      >
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={disabled}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between ${getOptionStyle(index)} ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <span className="flex-1">{option}</span>
            {getOptionIcon(index)}
          </button>
        ))}
      </div>

      {showExplanation && showCorrectness && (
        <div
          className={`mt-6 p-4 rounded-lg ${
            userAnswer === question.correctAnswer
              ? "bg-green-900/30 border-2 border-green-600"
              : "bg-red-900/30 border-2 border-red-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {userAnswer === question.correctAnswer ? (
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400" />
            )}
            <span
              className={`font-semibold ${
                userAnswer === question.correctAnswer
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {userAnswer === question.correctAnswer ? "Correct!" : "Incorrect"}
            </span>
          </div>
          {userAnswer !== question.correctAnswer && (
            <p className={`mt-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
              {question.explanation}
            </p>
          )}
        </div>
      )}
      {showExplanation && !showCorrectness && (
        <div
          className={`mt-6 p-4 rounded-lg ${
            userAnswer === question.correctAnswer
              ? darkMode
                ? "bg-green-900/30 border-2 border-green-600"
                : "bg-green-50 border-2 border-green-400"
              : darkMode
                ? "bg-blue-900/30 border-2 border-blue-600"
                : "bg-blue-50 border-2 border-blue-400"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpen
              className={`w-6 h-6 ${
                userAnswer === question.correctAnswer
                  ? "text-green-400"
                  : "text-blue-400"
              }`}
            />
            <span
              className={`font-semibold ${
                userAnswer === question.correctAnswer
                  ? darkMode
                    ? "text-green-400"
                    : "text-green-700"
                  : darkMode
                    ? "text-blue-400"
                    : "text-blue-700"
              }`}
            >
              Explanation
            </span>
          </div>
          <p className={`mt-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
            {question.explanation}
          </p>

          {/* Show correct answer */}
          <div
            className={`mt-4 p-3 rounded ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
          >
            <p
              className={`text-sm mb-1 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
            >
              Correct Answer:
            </p>
            <p
              className={`font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              {question.options[question.correctAnswer]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
