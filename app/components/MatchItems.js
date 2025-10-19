"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { CheckCircle2, XCircle, ArrowRight, BookOpen } from "lucide-react";

export default function MatchItems({
  question,
  onAnswer,
  showExplanation,
  userAnswer,
  disabled,
  darkMode = true,
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

  // Reset state when question changes or showExplanation changes
  useEffect(() => {
    if (userAnswer && Object.keys(userAnswer).length > 0) {
      setMatches(userAnswer);
    } else {
      setMatches({});
    }
    setSelectedLeft(null);
    setSelectedRight(null);
  }, [question.id, showExplanation, userAnswer]);

  // Refs for drawing lines
  const containerRef = useRef(null);
  const leftRefs = useRef({});
  const rightRefs = useRef({});
  const [lines, setLines] = useState([]);

  const handleLeftClick = (item) => {
    // In quiz mode after submission, don't allow changes
    if (disabled && showCorrectness) return;

    // If clicking the same item again, deselect it
    if (selectedLeft === item) {
      setSelectedLeft(null);
      return;
    }

    // If item is already matched, don't allow reselection
    if (matches[item] !== undefined) {
      return;
    }

    setSelectedLeft(item);
    if (selectedRight) {
      createMatch(item, selectedRight);
    }
  };

  const handleRightClick = (item) => {
    // In quiz mode after submission, don't allow changes
    if (disabled && showCorrectness) return;

    // If clicking the same item again, deselect it
    if (selectedRight === item) {
      setSelectedRight(null);
      return;
    }

    // If item is already matched, don't allow reselection
    if (Object.values(matches).includes(item)) {
      return;
    }

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
    // In quiz mode after submission, don't allow changes
    if (disabled && showCorrectness) return;
    const newMatches = { ...matches };
    delete newMatches[left];
    setMatches(newMatches);
    onAnswer(newMatches);
  };

  const isCorrectMatch = useCallback(
    (left, right) => {
      const correctPair = question.pairs.find((p) => p.left === left);
      return correctPair && correctPair.right === right;
    },
    [question.pairs],
  );

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

    if (!showExplanation || !showCorrectness) {
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

    if (!showExplanation || !showCorrectness) {
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

  // Calculate lines between matched items
  useEffect(() => {
    const calculateLines = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLines = [];

      Object.keys(matches).forEach((leftItem) => {
        const rightItem = matches[leftItem];
        const leftEl = leftRefs.current[leftItem];
        const rightEl = rightRefs.current[rightItem];

        if (leftEl && rightEl) {
          const leftRect = leftEl.getBoundingClientRect();
          const rightRect = rightEl.getBoundingClientRect();

          // Calculate positions relative to container
          const x1 = leftRect.right - containerRect.left;
          const y1 = leftRect.top + leftRect.height / 2 - containerRect.top;
          const x2 = rightRect.left - containerRect.left;
          const y2 = rightRect.top + rightRect.height / 2 - containerRect.top;

          // Determine line color based on correctness
          let color = darkMode ? "#60a5fa" : "#3b82f6"; // blue default
          if (showExplanation && showCorrectness) {
            color = isCorrectMatch(leftItem, rightItem)
              ? "#4ade80" // green
              : "#f87171"; // red
          }

          newLines.push({ x1, y1, x2, y2, color });
        }
      });

      setLines(newLines);
    };

    calculateLines();

    // Recalculate on window resize
    window.addEventListener("resize", calculateLines);
    return () => window.removeEventListener("resize", calculateLines);
  }, [matches, showExplanation, showCorrectness, darkMode, isCorrectMatch]);

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
          : "Tap items from each column to match them"}
      </p>

      <div
        ref={containerRef}
        className="relative grid grid-cols-2 gap-2 md:gap-4"
      >
        {/* SVG overlay for lines */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {lines.map((line, idx) => (
            <line
              key={idx}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={line.color}
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          ))}
        </svg>
        {/* Left Column */}
        <div className="space-y-2 relative" style={{ zIndex: 1 }}>
          {leftItems.map((item, idx) => (
            <div key={`left-${idx}-${item}`} className="space-y-1">
              <div className="relative">
                <button
                  ref={(el) => (leftRefs.current[item] = el)}
                  onClick={() => handleLeftClick(item)}
                  disabled={
                    (disabled && showCorrectness) || isItemMatched(item, "left")
                  }
                  className={`w-full p-2 sm:p-3 min-h-[48px] rounded-lg border-2 transition-all duration-200 text-left touch-manipulation ${getLeftItemStyle(item)} ${
                    (disabled && showCorrectness) || isItemMatched(item, "left")
                      ? "cursor-default"
                      : "cursor-pointer active:scale-95"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm">{item}</span>
                    {showExplanation &&
                      showCorrectness &&
                      matches[item] &&
                      (isCorrectMatch(item, matches[item]) ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      ))}
                  </div>
                </button>
                {matches[item] && !showExplanation && (
                  <button
                    onClick={() => removeMatch(item)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              {matches[item] && (
                <div className="flex items-center gap-1 text-xs text-slate-400 ml-2">
                  <ArrowRight className="w-3 h-3" />
                  <span>{matches[item]}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-2 relative" style={{ zIndex: 1 }}>
          {rightItems.map((item, idx) => (
            <button
              key={`right-${idx}-${item}`}
              ref={(el) => (rightRefs.current[item] = el)}
              onClick={() => handleRightClick(item)}
              disabled={
                (disabled && showCorrectness) || isItemMatched(item, "right")
              }
              className={`w-full p-2 sm:p-3 min-h-[48px] rounded-lg border-2 transition-all duration-200 text-left touch-manipulation ${getRightItemStyle(item)} ${
                (disabled && showCorrectness) || isItemMatched(item, "right")
                  ? "cursor-default"
                  : "cursor-pointer active:scale-95"
              }`}
            >
              <span className="text-xs sm:text-sm">{item}</span>
            </button>
          ))}
        </div>
      </div>

      {showExplanation && showCorrectness && (
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
          {!allCorrect && (
            <p className={`mt-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
              {question.explanation}
            </p>
          )}

          {!allCorrect && (
            <div
              className={`mt-4 p-3 rounded ${darkMode ? "bg-slate-800" : "bg-white"}`}
            >
              <p
                className={`text-sm mb-2 ${darkMode ? "text-slate-300" : "text-slate-600"}`}
              >
                Correct matches:
              </p>
              <div className="space-y-1">
                {question.pairs.map((pair, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span
                      className={darkMode ? "text-white" : "text-slate-800"}
                    >
                      {pair.left}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                    />
                    <span
                      className={darkMode ? "text-white" : "text-slate-800"}
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
      {showExplanation && !showCorrectness && (
        <div
          className={`mt-6 p-4 rounded-lg ${darkMode ? "bg-yellow-900/20 border-2 border-yellow-600/50" : "bg-yellow-50 border-2 border-yellow-300"}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpen
              className={`w-6 h-6 ${darkMode ? "text-yellow-400" : "text-yellow-800"}`}
            />
            <span
              className={`font-semibold ${darkMode ? "text-yellow-400" : "text-yellow-800"}`}
            >
              Explanation
            </span>
          </div>
          <p className={`mt-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
            {question.explanation}
          </p>

          {/* Show correct answers in study mode */}
          <div
            className={`mt-4 p-3 rounded ${darkMode ? "bg-slate-800" : "bg-white"}`}
          >
            <p
              className={`text-sm mb-2 ${darkMode ? "text-slate-300" : "text-slate-600"}`}
            >
              Correct matches:
            </p>
            <div className="space-y-1">
              {question.pairs.map((pair, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className={darkMode ? "text-white" : "text-slate-900"}>
                    {pair.left}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  />
                  <span className={darkMode ? "text-white" : "text-slate-900"}>
                    {pair.right}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
