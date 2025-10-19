"use client";

import { CheckCircle2, XCircle, BookOpen } from "lucide-react";

export default function TrueFalse({
  question,
  onAnswer,
  showExplanation,
  userAnswer,
  disabled,
  darkMode = true,
  showCorrectness = true,
}) {
  const handleSelect = (value) => {
    if (disabled) return;
    onAnswer(value);
  };

  const getButtonStyle = (value) => {
    if (!showExplanation || !showCorrectness) {
      return userAnswer === value
        ? "bg-blue-600 text-white border-blue-600 scale-105"
        : darkMode
          ? "bg-slate-800 text-white border-slate-600 hover:border-blue-500 hover:scale-105"
          : "bg-white text-slate-900 border-slate-300 hover:border-blue-500 hover:scale-105";
    }

    // Show results (only in quiz mode)
    if (value === question.correctAnswer) {
      return "bg-green-600 text-white border-green-600";
    }
    if (userAnswer === value && userAnswer !== question.correctAnswer) {
      return "bg-red-600 text-white border-red-600";
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

  return (
    <div className="space-y-6">
      <h3
        className={`text-xl font-semibold mb-8 ${darkMode ? "text-white" : "text-slate-900"}`}
      >
        {question.question}
      </h3>

      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => handleSelect(true)}
          disabled={disabled}
          className={`p-8 rounded-xl border-4 transition-all flex flex-col items-center justify-center gap-3 ${getButtonStyle(true)} ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {getIcon(true)}
          <span className="text-3xl font-bold">TRUE</span>
        </button>

        <button
          onClick={() => handleSelect(false)}
          disabled={disabled}
          className={`p-8 rounded-xl border-4 transition-all flex flex-col items-center justify-center gap-3 ${getButtonStyle(false)} ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {getIcon(false)}
          <span className="text-3xl font-bold">FALSE</span>
        </button>
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
            darkMode
              ? "bg-yellow-900/20 border-2 border-yellow-600/50"
              : "bg-yellow-50 border-2 border-yellow-300"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpen
              className={`w-6 h-6 ${
                darkMode ? "text-yellow-400" : "text-yellow-700"
              }`}
            />
            <span
              className={`font-semibold ${
                darkMode ? "text-yellow-400" : "text-yellow-700"
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
              {question.correctAnswer ? "True" : "False"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
