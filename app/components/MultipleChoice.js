"use client";

import { CheckCircle2, XCircle, BookOpen } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

export default function MultipleChoice({
  question,
  onAnswer,
  showExplanation,
  userAnswer,
  disabled,
  darkMode = true,
  showCorrectness = true,
}) {
  // Randomize answer order - memoized so it doesn't change during component lifecycle
  const shuffledOptions = useMemo(() => {
    const optionsWithIndex = question.options.map((option, index) => ({
      option,
      originalIndex: index,
    }));

    // Fisher-Yates shuffle
    for (let i = optionsWithIndex.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsWithIndex[i], optionsWithIndex[j]] = [
        optionsWithIndex[j],
        optionsWithIndex[i],
      ];
    }

    return optionsWithIndex;
  }, [question.id, question.options]);

  const handleSelect = (originalIndex) => {
    if (disabled) return;
    onAnswer(originalIndex);
  };

  const getOptionStyle = (originalIndex) => {
    if (!showExplanation || !showCorrectness) {
      return userAnswer === originalIndex
        ? "bg-blue-600 text-white border-blue-600 scale-[1.02]"
        : darkMode
          ? "bg-slate-800 text-white border-slate-600 hover:border-blue-500 hover:scale-[1.01]"
          : "bg-white text-slate-900 border-slate-300 hover:border-blue-500 hover:scale-[1.01]";
    }

    // Show results (only in quiz mode)
    if (originalIndex === question.correctAnswer) {
      return "bg-green-600 text-white border-green-600 animate-pulse-once";
    }
    if (userAnswer === originalIndex && userAnswer !== question.correctAnswer) {
      return "bg-red-600 text-white border-red-600";
    }
    return darkMode
      ? "bg-slate-700 text-slate-400 border-slate-600"
      : "bg-slate-100 text-slate-500 border-slate-300";
  };

  const getOptionIcon = (originalIndex) => {
    if (!showExplanation || !showCorrectness) return null;

    if (originalIndex === question.correctAnswer) {
      return <CheckCircle2 className="w-5 h-5" />;
    }
    if (userAnswer === originalIndex && userAnswer !== question.correctAnswer) {
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
        {shuffledOptions.map(({ option, originalIndex }, displayIndex) => (
          <button
            key={displayIndex}
            onClick={() => handleSelect(originalIndex)}
            disabled={disabled}
            className={`w-full p-4 md:p-4 min-h-[56px] rounded-lg border-2 transition-all duration-200 text-left flex items-center justify-between touch-manipulation ${getOptionStyle(originalIndex)} ${
              disabled ? "cursor-not-allowed" : "cursor-pointer active:scale-95"
            }`}
          >
            <span className="flex-1 text-base md:text-base">{option}</span>
            {getOptionIcon(originalIndex)}
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
            darkMode
              ? "bg-yellow-900/20 border-2 border-yellow-600/50"
              : "bg-yellow-50 border-2 border-yellow-300"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpen
              className={`w-6 h-6 ${
                darkMode ? "text-yellow-400" : "text-yellow-800"
              }`}
            />
            <span
              className={`font-semibold ${
                darkMode ? "text-yellow-400" : "text-yellow-800"
              }`}
            >
              Explanation
            </span>
          </div>
          <p className={`mt-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
            {question.explanation}
          </p>

          {/* Show correct answer */}
          <div
            className={`mt-4 p-3 rounded ${darkMode ? "bg-slate-800" : "bg-white"}`}
          >
            <p
              className={`text-sm mb-1 ${darkMode ? "text-slate-300" : "text-slate-600"}`}
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
