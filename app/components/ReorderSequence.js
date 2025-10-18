"use client";

import { useState } from 'react';
import { CheckCircle2, XCircle, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';

export default function ReorderSequence({
  question,
  onAnswer,
  showExplanation,
  userAnswer,
  disabled
}) {
  const [items, setItems] = useState(() => {
    if (userAnswer && userAnswer.length > 0) {
      return userAnswer;
    }
    // Shuffle the correct order for initial display
    return [...question.correctOrder].sort(() => Math.random() - 0.5);
  });

  const moveItem = (index, direction) => {
    if (disabled) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;

    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setItems(newItems);
    onAnswer(newItems);
  };

  const isCorrect = () => {
    if (!userAnswer || userAnswer.length === 0) return false;
    return JSON.stringify(userAnswer) === JSON.stringify(question.correctOrder);
  };

  const getItemStyle = (index) => {
    if (!showExplanation) {
      return 'bg-slate-800 border-slate-600 hover:border-blue-500';
    }

    // Check if this step is in the correct position
    const isCorrectPosition = userAnswer && userAnswer[index] === question.correctOrder[index];

    if (isCorrectPosition) {
      return 'bg-green-900/30 border-green-600';
    }
    return 'bg-red-900/30 border-red-600';
  };

  const getStepNumber = (item) => {
    if (!showExplanation) return null;
    const correctIndex = question.correctOrder.indexOf(item);
    return correctIndex + 1;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">
        {question.question}
      </h3>

      <p className="text-slate-400 text-sm mb-6">
        Use the arrows to arrange the steps in the correct order
      </p>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transition-all ${getItemStyle(index)}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveItem(index, 'up')}
                  disabled={disabled || index === 0}
                  className={`p-1 rounded ${
                    disabled || index === 0
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveItem(index, 'down')}
                  disabled={disabled || index === items.length - 1}
                  className={`p-1 rounded ${
                    disabled || index === items.length - 1
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-slate-400">
                    {index + 1}
                  </span>
                  <span className="text-white flex-1">{item}</span>
                  {showExplanation && (
                    <span className="text-sm text-slate-400">
                      (Correct: #{getStepNumber(item)})
                    </span>
                  )}
                </div>
              </div>

              <GripVertical className="w-5 h-5 text-slate-600" />
            </div>
          </div>
        ))}
      </div>

      {showExplanation && (
        <div className={`mt-6 p-4 rounded-lg ${
          isCorrect()
            ? 'bg-green-900/30 border-2 border-green-600'
            : 'bg-red-900/30 border-2 border-red-600'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect() ? (
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400" />
            )}
            <span className={`font-semibold ${
              isCorrect() ? 'text-green-400' : 'text-red-400'
            }`}>
              {isCorrect() ? 'Perfect Order!' : 'Incorrect Order'}
            </span>
          </div>
          <p className="text-white mt-2">{question.explanation}</p>

          {!isCorrect() && (
            <div className="mt-4 p-3 bg-slate-800 rounded">
              <p className="text-sm text-slate-300 mb-2">Correct order:</p>
              <ol className="list-decimal list-inside space-y-1">
                {question.correctOrder.map((step, i) => (
                  <li key={i} className="text-white text-sm">{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
