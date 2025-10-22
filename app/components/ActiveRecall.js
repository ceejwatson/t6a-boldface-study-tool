"use client";

import { useState } from "react";
import { Eye, CheckCircle2, XCircle } from "lucide-react";

export default function ActiveRecall({
  question,
  onRate,
  darkMode = true,
  isWeakArea = false,
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  const getAnswerText = () => {
    switch (question.questionType) {
      case "multipleChoice":
        return question.options[question.correctAnswer];
      case "trueFalse":
        return question.correctAnswer ? "TRUE" : "FALSE";
      case "reorderSequence":
        return question.correctOrder;
      case "matchItems":
        return question.pairs;
      default:
        return null;
    }
  };

  const renderAnswer = () => {
    const answer = getAnswerText();

    switch (question.questionType) {
      case "multipleChoice":
      case "trueFalse":
        return (
          <div className={`text-2xl font-bold mb-4 ${darkMode ? "text-green-400" : "text-green-600"}`}>
            {answer}
          </div>
        );
      case "reorderSequence":
        return (
          <div className="space-y-2 mb-4">
            {answer.map((step, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg ${darkMode ? "bg-slate-700" : "bg-slate-100"}`}
              >
                <span className={`font-bold mr-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                  {i + 1}.
                </span>
                <span className={darkMode ? "text-white" : "text-slate-900"}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        );
      case "matchItems":
        return (
          <div className="space-y-2 mb-4">
            {answer.map((pair, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg ${darkMode ? "bg-slate-700" : "bg-slate-100"} flex items-center justify-between`}
              >
                <span className={darkMode ? "text-white" : "text-slate-900"}>
                  {pair.left}
                </span>
                <span className={`mx-3 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  →
                </span>
                <span className={`font-semibold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                  {pair.right}
                </span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Question Card */}
      <div
        className={`${darkMode ? "bg-slate-800 border-slate-600" : "bg-white border-slate-300"} border-2 rounded-xl p-8 mb-6`}
      >
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-700"} font-semibold`}>
            {question.category}
          </span>
          <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-700"} font-semibold`}>
            {question.topic}
          </span>
        </div>

        {/* Question */}
        <h3 className={`text-xl md:text-2xl font-semibold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
          {question.question}
        </h3>

        {/* Answer Section */}
        {!showAnswer ? (
          <div className="text-center py-8">
            <div className={`text-sm mb-4 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              Try to recall the answer in your mind...
            </div>
            <button
              onClick={() => setShowAnswer(true)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              <Eye className="w-5 h-5" />
              Show Answer
            </button>
          </div>
        ) : (
          <div className="animate-fadeIn">
            {/* Correct Answer */}
            <div className={`mb-6 p-4 rounded-lg ${darkMode ? "bg-green-900/20 border-2 border-green-600" : "bg-green-50 border-2 border-green-400"}`}>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                <span className={`font-semibold ${darkMode ? "text-green-400" : "text-green-700"}`}>
                  Correct Answer
                </span>
              </div>
              {renderAnswer()}
            </div>

            {/* Explanation */}
            <div className={`p-4 rounded-lg ${darkMode ? "bg-slate-700/50" : "bg-slate-100"}`}>
              <div className={`text-sm font-semibold mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                Explanation
              </div>
              <div className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                {question.explanation}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Self-Rating Buttons (only show after answer is revealed) */}
      {showAnswer && (
        <div className="space-y-3">
          <div className={`text-center text-sm font-medium mb-3 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
            How well did you know this?
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => {
                onRate(0); // Again - quality 0
                setShowAnswer(false);
              }}
              className={`p-4 rounded-lg border-2 transition ${
                darkMode
                  ? "bg-red-900/20 border-red-600 hover:bg-red-900/40 text-red-400"
                  : "bg-red-50 border-red-400 hover:bg-red-100 text-red-700"
              }`}
            >
              <div className="font-bold text-lg mb-1">Again</div>
              <div className="text-xs opacity-75">Didn&apos;t know it</div>
              <div className="text-xs mt-1">&lt; 1 day</div>
            </button>

            <button
              onClick={() => {
                onRate(3); // Hard - quality 3
                setShowAnswer(false);
              }}
              className={`p-4 rounded-lg border-2 transition ${
                darkMode
                  ? "bg-orange-900/20 border-orange-600 hover:bg-orange-900/40 text-orange-400"
                  : "bg-orange-50 border-orange-400 hover:bg-orange-100 text-orange-700"
              }`}
            >
              <div className="font-bold text-lg mb-1">Hard</div>
              <div className="text-xs opacity-75">Struggled to recall</div>
              <div className="text-xs mt-1">1 day</div>
            </button>

            <button
              onClick={() => {
                onRate(4); // Good - quality 4
                setShowAnswer(false);
              }}
              className={`p-4 rounded-lg border-2 transition ${
                darkMode
                  ? "bg-blue-900/20 border-blue-600 hover:bg-blue-900/40 text-blue-400"
                  : "bg-blue-50 border-blue-400 hover:bg-blue-100 text-blue-700"
              }`}
            >
              <div className="font-bold text-lg mb-1">Good</div>
              <div className="text-xs opacity-75">Recalled correctly</div>
              <div className="text-xs mt-1">~6 days</div>
            </button>

            <button
              onClick={() => {
                onRate(5); // Easy - quality 5
                setShowAnswer(false);
              }}
              className={`p-4 rounded-lg border-2 transition ${
                darkMode
                  ? "bg-green-900/20 border-green-600 hover:bg-green-900/40 text-green-400"
                  : "bg-green-50 border-green-400 hover:bg-green-100 text-green-700"
              }`}
            >
              <div className="font-bold text-lg mb-1">Easy</div>
              <div className="text-xs opacity-75">Knew it instantly</div>
              <div className="text-xs mt-1">&gt; 6 days</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
