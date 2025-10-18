"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, BookOpen } from "lucide-react";

export default function MatchItems({
  question,
  onAnswer,
  showExplanation,
  userAnswer,
  disabled,
  darkMode = true,
  isLimitationsMode = false,
  showCorrectness = true,
}) {
  const [matches, setMatches] = useState(() => {
    if (userAnswer && Object.keys(userAnswer).length > 0) {
      return userAnswer;
    }
    return {};
  });

  const [leftItems] = useState(() => question.pairs.map((p) => p.left));
  const [rightItems] = useState(() =>
    [...question.pairs.map((p) => p.right)].sort(() => Math.random() - 0.5),
  );

  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);

  const handleLeftClick = (item) => {
    if (disabled) return;
    setSelectedLeft(item);
    if (selectedRight) {
      createMatch(item, selectedRight);
    }
  };

  const handleRightClick = (item) => {
    if (disabled) return;
    setSelectedRight(item);
    if (selectedLeft) {
      createMatch(selectedLeft, item);
    }
  };

  const createMatch = (left, right) => {
    const newMatches = { ...matches, [left]: right };
    setMatches(newMatches);
    setSelectedLeft(null);
    setSelectedRight(null);
    onAnswer(newMatches);
  };

  const removeMatch = (left) => {
    if (disabled) return;
    const newMatches = { ...matches };
    delete newMatches[left];
    setMatches(newMatches);
    onAnswer(newMatches);
  };

  const isCorrectMatch = (left, right) => {
    const correctPair = question.pairs.find((p) => p.left === left);
    return correctPair && correctPair.right === right;
  };

  const isItemMatched = (item, side) => {
    if (side === "left") {
      return matches[item] !== undefined;
    } else {
      return Object.values(matches).includes(item);
    }
  };

  const getLeftItemStyle = (item) => {
    const isMatched = isItemMatched(item, "left");
    const isSelected = selectedLeft === item;

    if (!showExplanation || isLimitationsMode || !showCorrectness) {
      if (isSelected) return "bg-blue-600 border-blue-600 text-white";
      if (isMatched)
        return darkMode
          ? "bg-slate-700 border-slate-500 text-white"
          : "bg-slate-100 border-slate-400 text-slate-900";
      return darkMode
        ? "bg-slate-800 border-slate-600 text-white hover:border-blue-500"
        : "bg-white border-slate-300 text-slate-900 hover:border-blue-500";
    }

    // Show results (only in quiz mode)
    if (isMatched && isCorrectMatch(item, matches[item])) {
      return "bg-green-900/30 border-green-600 text-white";
    }
    if (isMatched) {
      return "bg-red-900/30 border-red-600 text-white";
    }
    return darkMode
      ? "bg-slate-700 border-slate-600 text-slate-400"
      : "bg-slate-100 border-slate-300 text-slate-500";
  };

  const getRightItemStyle = (item) => {
    const isMatched = isItemMatched(item, "right");
    const isSelected = selectedRight === item;

    if (!showExplanation || isLimitationsMode || !showCorrectness) {
      if (isSelected) return "bg-blue-600 border-blue-600 text-white";
      if (isMatched)
        return darkMode
          ? "bg-slate-700 border-slate-500 text-white"
          : "bg-slate-100 border-slate-400 text-slate-900";
      return darkMode
        ? "bg-slate-800 border-slate-600 text-white hover:border-blue-500"
        : "bg-white border-slate-300 text-slate-900 hover:border-blue-500";
    }

    // Show results (only in quiz mode)
    const leftItem = Object.keys(matches).find(
      (left) => matches[left] === item,
    );
    if (leftItem && isCorrectMatch(leftItem, item)) {
      return "bg-green-900/30 border-green-600 text-white";
    }
    if (isMatched) {
      return "bg-red-900/30 border-red-600 text-white";
    }
    return darkMode
      ? "bg-slate-700 border-slate-600 text-slate-400"
      : "bg-slate-100 border-slate-300 text-slate-500";
  };

  const allMatched = leftItems.every((item) => matches[item] !== undefined);
  const allCorrect = leftItems.every(
    (item) => matches[item] && isCorrectMatch(item, matches[item]),
  );

  return (
    <div className="space-y-4">
      <h3
        className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}
      >
        {question.question}
      </h3>

      <p
        className={`text-sm mb-6 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
      >
        {disabled
          ? "View your matches below"
          : "Click items from each column to match them"}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-3">
          {leftItems.map((item) => (
            <div key={item} className="space-y-2">
              <button
                onClick={() => handleLeftClick(item)}
                disabled={disabled}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${getLeftItemStyle(item)} ${
                  disabled ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{item}</span>
                  {matches[item] && !showExplanation && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeMatch(item);
                      }}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                  {showExplanation &&
                    !isLimitationsMode &&
                    showCorrectness &&
                    matches[item] &&
                    (isCorrectMatch(item, matches[item]) ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    ))}
                </div>
              </button>

              {matches[item] && (
                <div className="flex items-center gap-2 text-sm text-slate-400 ml-4">
                  <ArrowRight className="w-4 h-4" />
                  <span>{matches[item]}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {rightItems.map((item) => (
            <button
              key={item}
              onClick={() => handleRightClick(item)}
              disabled={disabled}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${getRightItemStyle(item)} ${
                disabled ? "cursor-default" : "cursor-pointer"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {showExplanation && !isLimitationsMode && showCorrectness && (
        <div
          className={`mt-6 p-4 rounded-lg ${
            allCorrect
              ? "bg-green-900/30 border-2 border-green-600"
              : "bg-red-900/30 border-2 border-red-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {allCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400" />
            )}
            <span
              className={`font-semibold ${
                allCorrect ? "text-green-400" : "text-red-400"
              }`}
            >
              {allCorrect
                ? "All Correct!"
                : `${leftItems.filter((item) => matches[item] && isCorrectMatch(item, matches[item])).length}/${leftItems.length} Correct`}
            </span>
          </div>
          <p className={`mt-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
            {question.explanation}
          </p>

          {!allCorrect && (
            <div
              className={`mt-4 p-3 rounded ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
            >
              <p
                className={`text-sm mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                Correct matches:
              </p>
              <div className="space-y-1">
                {question.pairs.map((pair, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span
                      className={darkMode ? "text-white" : "text-slate-900"}
                    >
                      {pair.left}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                    />
                    <span
                      className={darkMode ? "text-white" : "text-slate-900"}
                    >
                      {pair.right}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {showExplanation && (isLimitationsMode || !showCorrectness) && (
        <div
          className={`mt-6 p-4 rounded-lg ${darkMode ? "bg-blue-900/30 border-2 border-blue-600" : "bg-blue-50 border-2 border-blue-400"}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <span
              className={`font-semibold ${darkMode ? "text-blue-400" : "text-blue-700"}`}
            >
              Explanation
            </span>
          </div>
          <p className={`mt-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
