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
  fontSize = "medium",
}) {
  // Use index-based matching to handle duplicate values
  const [matches, setMatches] = useState(() => {
    if (userAnswer && Object.keys(userAnswer).length > 0) {
      return userAnswer;
    }
    return {};
  });

  // Create items with unique indices
  const [leftItems] = useState(() =>
    question.pairs.map((p, idx) => ({ text: p.left, index: idx })),
  );

  const [rightItems] = useState(() => {
    const items = question.pairs.map((p, idx) => ({
      text: p.right,
      index: idx,
    }));
    // Shuffle right items
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  });

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

  const handleLeftClick = (leftIndex) => {
    // In quiz mode after submission, don't allow changes
    if (disabled && showCorrectness) return;

    // If clicking the same item again, deselect it
    if (selectedLeft === leftIndex) {
      setSelectedLeft(null);
      return;
    }

    // If item is already matched, don't allow reselection
    if (matches[leftIndex] !== undefined) {
      return;
    }

    setSelectedLeft(leftIndex);
    if (selectedRight !== null) {
      createMatch(leftIndex, selectedRight);
    }
  };

  const handleRightClick = (rightIndex) => {
    // In quiz mode after submission, don't allow changes
    if (disabled && showCorrectness) return;

    // If clicking the same item again, deselect it
    if (selectedRight === rightIndex) {
      setSelectedRight(null);
      return;
    }

    // If item is already matched, don't allow reselection
    if (Object.values(matches).includes(rightIndex)) {
      return;
    }

    setSelectedRight(rightIndex);
    if (selectedLeft !== null) {
      createMatch(selectedLeft, rightIndex);
    }
  };

  const createMatch = (leftIdx, rightIdx) => {
    const newMatches = { ...matches, [leftIdx]: rightIdx };
    setMatches(newMatches);
    setSelectedLeft(null);
    setSelectedRight(null);
    onAnswer(newMatches);
  };

  const removeMatch = (leftIdx) => {
    // In quiz mode after submission, don't allow changes
    if (disabled && showCorrectness) return;
    const newMatches = { ...matches };
    delete newMatches[leftIdx];
    setMatches(newMatches);
    onAnswer(newMatches);
  };

  const isCorrectMatch = useCallback((leftIdx, rightIdx) => {
    // Correct match when left index matches right index (same pair)
    return leftIdx === rightIdx;
  }, []);

  const isItemMatched = (itemIndex, side) => {
    if (side === "left") {
      return matches[itemIndex] !== undefined;
    } else {
      return Object.values(matches).includes(itemIndex);
    }
  };

  const getLeftItemStyle = (itemIndex) => {
    const isMatched = isItemMatched(itemIndex, "left");
    const isSelected = selectedLeft === itemIndex;

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
    if (isMatched && isCorrectMatch(itemIndex, matches[itemIndex])) {
      return "bg-green-900/30 border-green-600 text-white";
    }
    if (isMatched) {
      return "bg-red-900/30 border-red-600 text-white";
    }
    return darkMode
      ? "bg-slate-700 border-slate-600 text-slate-400"
      : "bg-slate-100 border-slate-300 text-slate-500";
  };

  const getRightItemStyle = (itemIndex) => {
    const isMatched = isItemMatched(itemIndex, "right");
    const isSelected = selectedRight === itemIndex;

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
    const leftIdx = Object.keys(matches).find(
      (leftIdx) => matches[leftIdx] === itemIndex,
    );
    if (leftIdx !== undefined && isCorrectMatch(parseInt(leftIdx), itemIndex)) {
      return "bg-green-900/30 border-green-600 text-white";
    }
    if (isMatched) {
      return "bg-red-900/30 border-red-600 text-white";
    }
    return darkMode
      ? "bg-slate-700 border-slate-600 text-slate-400"
      : "bg-slate-100 border-slate-300 text-slate-500";
  };

  const allMatched = leftItems.every(
    (item) => matches[item.index] !== undefined,
  );
  const allCorrect = leftItems.every(
    (item) =>
      matches[item.index] !== undefined &&
      isCorrectMatch(item.index, matches[item.index]),
  );

  // Calculate lines between matched items
  useEffect(() => {
    const calculateLines = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLines = [];

      Object.keys(matches).forEach((leftIdx) => {
        const rightIdx = matches[leftIdx];
        const leftEl = leftRefs.current[leftIdx];
        const rightEl = rightRefs.current[rightIdx];

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
            color = isCorrectMatch(parseInt(leftIdx), rightIdx)
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

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "small":
        return "text-xs sm:text-sm";
      case "large":
        return "text-base sm:text-lg";
      case "xlarge":
        return "text-lg sm:text-xl";
      default:
        return "text-sm sm:text-base";
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

  return (
    <div className="space-y-2">
      <h3
        className={`${getQuestionFontSize()} font-semibold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}
      >
        {question.question}
      </h3>

      <p
        className={`text-xs mb-3 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
      >
        {disabled
          ? "View your matches below"
          : "Tap items from each column to match them"}
      </p>

      <div
        ref={containerRef}
        className="relative grid grid-cols-2 gap-16 md:gap-24 max-w-4xl mx-auto"
      >
        {/* SVG overlay for lines */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {lines.map((line, idx) => (
            <g key={idx}>
              {/* Glow effect for better visibility */}
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={line.color}
                strokeWidth="6"
                opacity="0.3"
                strokeLinecap="round"
              />
              {/* Main line - solid, thicker, rounded */}
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={line.color}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          ))}
        </svg>
        {/* Left Column */}
        <div className="space-y-1.5 relative" style={{ zIndex: 1 }}>
          {leftItems.map((item) => (
            <div key={`left-${item.index}`} className="space-y-1">
              <div className="relative">
                <button
                  ref={(el) => (leftRefs.current[item.index] = el)}
                  onClick={() => handleLeftClick(item.index)}
                  disabled={
                    (disabled && showCorrectness) ||
                    isItemMatched(item.index, "left")
                  }
                  className={`w-full px-2 py-1.5 rounded-lg border-2 transition-all duration-200 text-left touch-manipulation ${getLeftItemStyle(item.index)} ${
                    (disabled && showCorrectness) ||
                    isItemMatched(item.index, "left")
                      ? "cursor-default"
                      : "cursor-pointer active:scale-95"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-full ${darkMode ? "bg-blue-600" : "bg-blue-500"} text-white text-xs flex items-center justify-center font-bold mt-0.5`}
                      >
                        {item.index + 1}
                      </span>
                      <span className={`${getFontSizeClass()} break-words`}>
                        {item.text}
                      </span>
                    </div>
                    {showExplanation &&
                      showCorrectness &&
                      matches[item.index] !== undefined &&
                      (isCorrectMatch(item.index, matches[item.index]) ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      ))}
                  </div>
                </button>
                {matches[item.index] !== undefined && !showExplanation && (
                  <button
                    onClick={() => removeMatch(item.index)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              {matches[item.index] !== undefined && (
                <div className="flex items-center gap-1 text-xs text-slate-400 ml-2">
                  <ArrowRight className="w-3 h-3" />
                  <span>
                    {
                      rightItems.find((r) => r.index === matches[item.index])
                        ?.text
                    }
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-1.5 relative" style={{ zIndex: 1 }}>
          {rightItems.map((item) => (
            <button
              key={`right-${item.index}`}
              ref={(el) => (rightRefs.current[item.index] = el)}
              onClick={() => handleRightClick(item.index)}
              disabled={
                (disabled && showCorrectness) ||
                isItemMatched(item.index, "right")
              }
              className={`w-full px-2 py-1.5 rounded-lg border-2 transition-all duration-200 text-left touch-manipulation ${getRightItemStyle(item.index)} ${
                (disabled && showCorrectness) ||
                isItemMatched(item.index, "right")
                  ? "cursor-default"
                  : "cursor-pointer active:scale-95"
              }`}
            >
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full ${darkMode ? "bg-slate-600" : "bg-slate-400"} text-white text-xs flex items-center justify-center font-bold mt-0.5`}
                >
                  {item.index + 1}
                </span>
                <span className={`${getFontSizeClass()} break-words`}>
                  {item.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {showExplanation && showCorrectness && (
        <div
          className={`mt-3 p-3 rounded-lg ${
            allCorrect
              ? "bg-green-900/30 border-2 border-green-600"
              : "bg-red-900/30 border-2 border-red-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            {allCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <span
              className={`font-semibold text-sm ${
                allCorrect ? "text-green-400" : "text-red-400"
              }`}
            >
              {allCorrect
                ? "All Correct!"
                : `${leftItems.filter((item) => matches[item.index] !== undefined && isCorrectMatch(item.index, matches[item.index])).length}/${leftItems.length} Correct`}
            </span>
          </div>
          {!allCorrect && (
            <p
              className={`mt-2 ${getFontSizeClass()} ${darkMode ? "text-white" : "text-slate-800"}`}
            >
              {question.explanation}
            </p>
          )}

          {!allCorrect && (
            <div
              className={`mt-2 p-2 rounded ${darkMode ? "bg-slate-800" : "bg-white"}`}
            >
              <p
                className={`text-xs mb-1 ${darkMode ? "text-slate-300" : "text-slate-600"}`}
              >
                Correct matches:
              </p>
              <div className="space-y-0.5">
                {question.pairs.map((pair, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 ${getFontSizeClass()}`}
                  >
                    <span
                      className={darkMode ? "text-white" : "text-slate-800"}
                    >
                      {pair.left}
                    </span>
                    <ArrowRight
                      className={`w-3 h-3 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
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
          <p
            className={`mt-2 ${getFontSizeClass()} ${darkMode ? "text-white" : "text-slate-800"}`}
          >
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
                <div
                  key={i}
                  className={`flex items-center gap-2 ${getFontSizeClass()}`}
                >
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
