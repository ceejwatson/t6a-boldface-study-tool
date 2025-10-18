"use client";

import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export default function MatchItems({
  question,
  onAnswer,
  showExplanation,
  userAnswer,
  disabled
}) {
  const [matches, setMatches] = useState(() => {
    if (userAnswer && Object.keys(userAnswer).length > 0) {
      return userAnswer;
    }
    return {};
  });

  const [leftItems] = useState(() => question.pairs.map(p => p.left));
  const [rightItems] = useState(() =>
    [...question.pairs.map(p => p.right)].sort(() => Math.random() - 0.5)
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
    const correctPair = question.pairs.find(p => p.left === left);
    return correctPair && correctPair.right === right;
  };

  const isItemMatched = (item, side) => {
    if (side === 'left') {
      return matches[item] !== undefined;
    } else {
      return Object.values(matches).includes(item);
    }
  };

  const getLeftItemStyle = (item) => {
    const isMatched = isItemMatched(item, 'left');
    const isSelected = selectedLeft === item;

    if (!showExplanation) {
      if (isSelected) return 'bg-blue-600 border-blue-600 text-white';
      if (isMatched) return 'bg-slate-700 border-slate-500 text-white';
      return 'bg-slate-800 border-slate-600 text-white hover:border-blue-500';
    }

    // Show results
    if (isMatched && isCorrectMatch(item, matches[item])) {
      return 'bg-green-900/30 border-green-600 text-white';
    }
    if (isMatched) {
      return 'bg-red-900/30 border-red-600 text-white';
    }
    return 'bg-slate-700 border-slate-600 text-slate-400';
  };

  const getRightItemStyle = (item) => {
    const isMatched = isItemMatched(item, 'right');
    const isSelected = selectedRight === item;

    if (!showExplanation) {
      if (isSelected) return 'bg-blue-600 border-blue-600 text-white';
      if (isMatched) return 'bg-slate-700 border-slate-500 text-white';
      return 'bg-slate-800 border-slate-600 text-white hover:border-blue-500';
    }

    // Show results
    const leftItem = Object.keys(matches).find(left => matches[left] === item);
    if (leftItem && isCorrectMatch(leftItem, item)) {
      return 'bg-green-900/30 border-green-600 text-white';
    }
    if (isMatched) {
      return 'bg-red-900/30 border-red-600 text-white';
    }
    return 'bg-slate-700 border-slate-600 text-slate-400';
  };

  const allMatched = leftItems.every(item => matches[item] !== undefined);
  const allCorrect = leftItems.every(item =>
    matches[item] && isCorrectMatch(item, matches[item])
  );

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">
        {question.question}
      </h3>

      <p className="text-slate-400 text-sm mb-6">
        {disabled ? 'View your matches below' : 'Click items from each column to match them'}
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
                  disabled ? 'cursor-default' : 'cursor-pointer'
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
                  {showExplanation && matches[item] && (
                    isCorrectMatch(item, matches[item]) ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )
                  )}
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
                disabled ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className={`mt-6 p-4 rounded-lg ${
          allCorrect
            ? 'bg-green-900/30 border-2 border-green-600'
            : 'bg-red-900/30 border-2 border-red-600'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {allCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400" />
            )}
            <span className={`font-semibold ${
              allCorrect ? 'text-green-400' : 'text-red-400'
            }`}>
              {allCorrect ? 'All Correct!' : `${leftItems.filter(item => matches[item] && isCorrectMatch(item, matches[item])).length}/${leftItems.length} Correct`}
            </span>
          </div>
          <p className="text-white mt-2">{question.explanation}</p>

          {!allCorrect && (
            <div className="mt-4 p-3 bg-slate-800 rounded">
              <p className="text-sm text-slate-300 mb-2">Correct matches:</p>
              <div className="space-y-1">
                {question.pairs.map((pair, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-white">{pair.left}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <span className="text-white">{pair.right}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
