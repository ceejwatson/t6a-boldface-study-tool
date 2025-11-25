"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export default function FillInBlank({
  question,
  onAnswer,
  showExplanation,
  userAnswer,
  disabled,
  darkMode = true,
  fontSize = "medium",
}) {
  const [answers, setAnswers] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Reset when question changes
  useEffect(() => {
    setAnswers({});
    setHasSubmitted(false);
  }, [question.id]);

  // Load user's previous answers if they exist
  useEffect(() => {
    if (userAnswer && typeof userAnswer === 'object') {
      setAnswers(userAnswer);
      setHasSubmitted(true);
    }
  }, [userAnswer]);

  const handleInputChange = (index, value) => {
    if (hasSubmitted || disabled) return;

    const newAnswers = {
      ...answers,
      [index]: value,
    };
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (hasSubmitted || disabled) return;

    setHasSubmitted(true);
    onAnswer(answers);
  };

  const checkAnswer = (index, userValue) => {
    const step = question.steps[index];
    if (!step || step.type === "none") return null;

    const correctAnswer = step.blank.toLowerCase().trim();
    const userAnswerText = (userValue || "").toLowerCase().trim();

    return userAnswerText === correctAnswer;
  };

  const allAnswered = question.steps.every((step, index) => {
    if (step.type === "none") return true;
    return answers[index] && answers[index].trim() !== "";
  });

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

  const getHeaderFontSize = () => {
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
    <div className="space-y-4">
      {/* Procedure Header - styled like the PDF */}
      <div
        className={`border-2 rounded-lg p-4 ${
          darkMode
            ? "bg-slate-800 border-slate-600"
            : "bg-white border-slate-300"
        }`}
      >
        <h3
          className={`${getHeaderFontSize()} font-bold mb-2 ${
            darkMode ? "text-red-400" : "text-red-600"
          }`}
        >
          {question.procedure}
        </h3>

        {/* Boldface Steps */}
        <div className="space-y-3 mt-4">
          {question.steps.map((step, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span
                className={`${getFontSizeClass()} font-bold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {step.text}
              </span>

              {step.type !== "none" && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={answers[index] || ""}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    disabled={hasSubmitted || disabled}
                    placeholder="___________"
                    className={`flex-1 min-w-[200px] px-3 py-2 rounded border-2 ${getFontSizeClass()} font-mono ${
                      hasSubmitted || disabled
                        ? "cursor-not-allowed"
                        : "cursor-text"
                    } ${
                      hasSubmitted
                        ? checkAnswer(index, answers[index])
                          ? darkMode
                            ? "bg-green-900/40 border-green-600 text-green-300"
                            : "bg-green-100 border-green-500 text-green-800"
                          : darkMode
                            ? "bg-red-900/40 border-red-600 text-red-300"
                            : "bg-red-100 border-red-500 text-red-800"
                        : darkMode
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-white border-slate-300 text-slate-900"
                    }`}
                  />

                  {hasSubmitted && (
                    <div className="flex-shrink-0">
                      {checkAnswer(index, answers[index]) ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      {!hasSubmitted && !disabled && (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`w-full py-3 rounded-lg font-semibold text-lg transition-all ${
            allAnswered
              ? darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
              : darkMode
                ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          Submit Answers
        </button>
      )}

      {/* Show correct answers after submission */}
      {hasSubmitted && (
        <div
          className={`p-4 rounded-lg ${
            darkMode
              ? "bg-slate-800 border-2 border-slate-600"
              : "bg-slate-100 border-2 border-slate-300"
          }`}
        >
          <h4
            className={`font-bold mb-3 ${getFontSizeClass()} ${
              darkMode ? "text-green-400" : "text-green-700"
            }`}
          >
            Correct Answers:
          </h4>
          <div className="space-y-2">
            {question.steps.map((step, index) => {
              if (step.type === "none") return null;

              const isCorrect = checkAnswer(index, answers[index]);

              return (
                <div
                  key={index}
                  className={`${getFontSizeClass()} ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  <span className="font-bold">{step.text}</span>
                  <span
                    className={`font-bold ${
                      isCorrect
                        ? darkMode
                          ? "text-green-400"
                          : "text-green-700"
                        : darkMode
                          ? "text-red-400"
                          : "text-red-700"
                    }`}
                  >
                    {step.blank}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
