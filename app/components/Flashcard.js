"use client";

import { useState } from "react";
import { RotateCcw, ChevronRight, ChevronLeft, Eye } from "lucide-react";

export default function Flashcard({
  question,
  onNext,
  onPrevious,
  onRate,
  currentIndex,
  totalCards,
  darkMode = true,
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRating = (quality) => {
    onRate(quality);
    setIsFlipped(false); // Reset for next card
  };

  // Get the answer text based on question type
  const getAnswerText = () => {
    switch (question.questionType) {
      case "multipleChoice":
        return `${question.options[question.correctAnswer]}\n\n${question.explanation}`;
      case "trueFalse":
        return `${question.correctAnswer ? "TRUE" : "FALSE"}\n\n${question.explanation}`;
      case "reorderSequence":
        return `Correct Order:\n${question.correctOrder.map((step, i) => `${i + 1}. ${step}`).join("\n")}\n\n${question.explanation}`;
      case "matchItems":
        return `Correct Matches:\n${question.pairs.map(pair => `${pair.left} → ${pair.right}`).join("\n")}\n\n${question.explanation}`;
      default:
        return question.explanation || "No explanation available";
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Counter */}
      <div className={`text-center mb-4 text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
        Card {currentIndex + 1} of {totalCards}
      </div>

      {/* Flashcard */}
      <div
        className="relative w-full h-96 perspective-1000 cursor-pointer"
        onClick={handleFlip}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front of card (Question) */}
          <div
            className={`absolute w-full h-full backface-hidden ${
              darkMode ? "bg-slate-800 border-slate-600" : "bg-white border-slate-300"
            } border-2 rounded-xl p-8 flex flex-col items-center justify-center shadow-lg`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className={`text-xs mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"} font-semibold uppercase tracking-wide`}>
              {question.category} • {question.topic}
            </div>
            <div className={`text-xl md:text-2xl font-semibold text-center ${darkMode ? "text-white" : "text-slate-900"}`}>
              {question.question}
            </div>
            <div className={`mt-8 flex items-center gap-2 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              <Eye className="w-4 h-4" />
              <span className="text-sm">Click to reveal answer</span>
            </div>
          </div>

          {/* Back of card (Answer) */}
          <div
            className={`absolute w-full h-full backface-hidden ${
              darkMode ? "bg-slate-800 border-slate-600" : "bg-white border-slate-300"
            } border-2 rounded-xl p-8 flex flex-col shadow-lg overflow-y-auto`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className={`text-xs mb-4 ${darkMode ? "text-green-400" : "text-green-600"} font-semibold uppercase tracking-wide text-center`}>
              Answer
            </div>
            <div className={`text-lg whitespace-pre-wrap ${darkMode ? "text-white" : "text-slate-900"}`}>
              {getAnswerText()}
            </div>
          </div>
        </div>
      </div>

      {/* Rating Buttons (shown when flipped) */}
      {isFlipped && (
        <div className="mt-6">
          <div className={`text-center mb-3 text-sm ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
            How well did you know this?
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRating(0);
              }}
              className={`p-3 rounded-lg border-2 transition ${
                darkMode
                  ? "bg-red-900/20 border-red-600 hover:bg-red-900/40 text-red-400"
                  : "bg-red-50 border-red-400 hover:bg-red-100 text-red-700"
              }`}
            >
              <div className="font-bold">Again</div>
              <div className="text-xs mt-1">&lt; 1 day</div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRating(3);
              }}
              className={`p-3 rounded-lg border-2 transition ${
                darkMode
                  ? "bg-yellow-900/20 border-yellow-600 hover:bg-yellow-900/40 text-yellow-400"
                  : "bg-yellow-50 border-yellow-400 hover:bg-yellow-100 text-yellow-700"
              }`}
            >
              <div className="font-bold">Hard</div>
              <div className="text-xs mt-1">1 day</div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRating(4);
              }}
              className={`p-3 rounded-lg border-2 transition ${
                darkMode
                  ? "bg-blue-900/20 border-blue-600 hover:bg-blue-900/40 text-blue-400"
                  : "bg-blue-50 border-blue-400 hover:bg-blue-100 text-blue-700"
              }`}
            >
              <div className="font-bold">Good</div>
              <div className="text-xs mt-1">~6 days</div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRating(5);
              }}
              className={`p-3 rounded-lg border-2 transition ${
                darkMode
                  ? "bg-green-900/20 border-green-600 hover:bg-green-900/40 text-green-400"
                  : "bg-green-50 border-green-400 hover:bg-green-100 text-green-700"
              }`}
            >
              <div className="font-bold">Easy</div>
              <div className="text-xs mt-1">&gt; 6 days</div>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      {!isFlipped && (
        <div className="flex justify-between mt-6 gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : darkMode
                  ? "border-slate-600 hover:border-blue-500 text-slate-300"
                  : "border-slate-300 hover:border-blue-500 text-slate-700"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            disabled={currentIndex === totalCards - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition ${
              currentIndex === totalCards - 1
                ? "opacity-50 cursor-not-allowed"
                : darkMode
                  ? "border-slate-600 hover:border-blue-500 text-slate-300"
                  : "border-slate-300 hover:border-blue-500 text-slate-700"
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
