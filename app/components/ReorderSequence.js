"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  GripVertical,
  ArrowUp,
  ArrowDown,
  BookOpen,
} from "lucide-react";

export default function ReorderSequence({
  question,
  onAnswer,
  showExplanation,
  userAnswer,
  disabled,
  darkMode = true,
  showCorrectness = true,
}) {
  const [items, setItems] = useState(() => {
    if (userAnswer && userAnswer.length > 0) {
      return userAnswer;
    }
    // Shuffle the correct order for initial display
    return [...question.correctOrder].sort(() => Math.random() - 0.5);
  });

  const [initialized, setInitialized] = useState(false);

  // Save initial shuffled state to parent on mount
  useEffect(() => {
    if (!initialized && (!userAnswer || userAnswer.length === 0)) {
      onAnswer(items);
      setInitialized(true);
    }
  }, [initialized, items, onAnswer, userAnswer]);

  const moveItem = (index, direction) => {
    if (disabled) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;

    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [
      newItems[newIndex],
      newItems[index],
    ];
    setItems(newItems);
    onAnswer(newItems);
  };

  const isCorrect = () => {
    if (!userAnswer || userAnswer.length === 0) return false;
    return JSON.stringify(userAnswer) === JSON.stringify(question.correctOrder);
  };

  const getItemStyle = (index) => {
    if (!showExplanation || !showCorrectness) {
      return darkMode
        ? "bg-slate-800 border-slate-600 hover:border-blue-500 hover:shadow-md"
        : "bg-white border-slate-300 hover:border-blue-500 hover:shadow-md";
    }

    // Check if this step is in the correct position (only in quiz mode)
    const isCorrectPosition =
      userAnswer && userAnswer[index] === question.correctOrder[index];

    if (isCorrectPosition) {
      return "bg-green-900/30 border-green-600 shadow-lg";
    }
    return "bg-red-900/30 border-red-600 shadow-lg";
  };

  const getStepNumber = (item) => {
    if (!showExplanation || !showCorrectness) return null;
    const correctIndex = question.correctOrder.indexOf(item);
    return correctIndex + 1;
  };

  return (
    <div className="space-y-2">
      <h3
        className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}
      >
        {question.question}
      </h3>

      <p
        className={`text-xs mb-3 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
      >
        Use the arrows to arrange the steps in the correct order
      </p>

      <div className="space-y-1.5">
        {items.map((item, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg border-2 transition-all duration-200 min-h-[44px] ${getItemStyle(index)}`}
          >
            <div className="flex items-center gap-1">
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => moveItem(index, "up")}
                  disabled={disabled || index === 0}
                  className={`p-1 rounded touch-manipulation transition-all ${
                    disabled || index === 0
                      ? "text-slate-600 cursor-not-allowed"
                      : "text-slate-400 hover:text-white hover:bg-slate-700 active:scale-95"
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveItem(index, "down")}
                  disabled={disabled || index === items.length - 1}
                  className={`p-1 rounded touch-manipulation transition-all ${
                    disabled || index === items.length - 1
                      ? "text-slate-600 cursor-not-allowed"
                      : "text-slate-400 hover:text-white hover:bg-slate-700 active:scale-95"
                  }`}
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span
                    className={`text-base font-bold flex-shrink-0 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`flex-1 text-xs ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    {item}
                  </span>
                  {showExplanation && (
                    <span className="text-xs text-slate-400 flex-shrink-0 hidden sm:inline">
                      (#{getStepNumber(item)})
                    </span>
                  )}
                </div>
              </div>

              <GripVertical className="w-4 h-4 text-slate-600 flex-shrink-0 hidden sm:block" />
            </div>
          </div>
        ))}
      </div>

      {showExplanation && showCorrectness && (
        <div
          className={`mt-3 p-3 rounded-lg ${
            isCorrect()
              ? "bg-green-900/30 border-2 border-green-600"
              : "bg-red-900/30 border-2 border-red-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            {isCorrect() ? (
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <span
              className={`font-semibold text-sm ${
                isCorrect() ? "text-green-400" : "text-red-400"
              }`}
            >
              {isCorrect() ? "Perfect Order!" : "Incorrect Order"}
            </span>
          </div>
          {!isCorrect() && (
            <p
              className={`mt-2 text-sm ${darkMode ? "text-white" : "text-slate-800"}`}
            >
              {question.explanation}
            </p>
          )}

          {!isCorrect() && (
            <div
              className={`mt-2 p-2 rounded ${darkMode ? "bg-slate-800" : "bg-white"}`}
            >
              <p
                className={`text-xs mb-1 ${darkMode ? "text-slate-300" : "text-slate-600"}`}
              >
                Correct order:
              </p>
              <ol className="list-decimal list-inside space-y-0.5">
                {question.correctOrder.map((step, i) => (
                  <li
                    key={i}
                    className={`text-xs ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    {step}
                  </li>
                ))}
              </ol>
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

          {/* Show correct answer in study mode */}
          <div
            className={`mt-4 p-3 rounded ${darkMode ? "bg-slate-800" : "bg-white"}`}
          >
            <p
              className={`text-sm mb-2 ${darkMode ? "text-slate-300" : "text-slate-600"}`}
            >
              Correct order:
            </p>
            <ol className="list-decimal list-inside space-y-1">
              {question.correctOrder.map((step, i) => (
                <li
                  key={i}
                  className={`text-sm ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
