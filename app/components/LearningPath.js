"use client";

import { CheckCircle2, Lock, ChevronRight } from "lucide-react";

export default function LearningPath({
  learningPath,
  allQuestions,
  questionMastery,
  onStartSection,
  getChapterProgress,
  getSectionProgress,
  shouldUnlockChapter,
}) {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-white mb-2">
          Learning Path
        </h2>
        <p className="text-slate-400">
          Master T-6A BOLDFACE step by step
        </p>
      </div>

      {/* Chapters */}
      {learningPath.chapters.map((chapter, chapterIndex) => {
        const chapterProgress = getChapterProgress(chapter, allQuestions, questionMastery);
        const isUnlocked = chapter.unlocked || shouldUnlockChapter(chapterIndex, learningPath, allQuestions, questionMastery);
        const isComplete = chapterProgress.percentage === 100;

        return (
          <div
            key={chapter.id}
            className={`bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 shadow-2xl transition ${
              !isUnlocked ? "opacity-50" : ""
            }`}
          >
            {/* Chapter Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-white">
                    {chapter.title}
                  </h3>
                  {!isUnlocked && (
                    <Lock className="w-5 h-5 text-slate-500" />
                  )}
                  {isComplete && (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  )}
                </div>
                <p className="text-sm text-slate-400 mb-3">
                  {chapter.description}
                </p>

                {/* Progress Bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full overflow-hidden bg-slate-600">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isComplete ? "bg-green-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${chapterProgress.percentage}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${
                    isComplete ? "text-green-400" : "text-blue-400"
                  }`}>
                    {chapterProgress.percentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* Sections */}
            {isUnlocked && (
              <div className="space-y-2 mt-4">
                {chapter.sections.map((section) => {
                  const sectionProgress = getSectionProgress(section, allQuestions, questionMastery);
                  const sectionComplete = sectionProgress.percentage === 100;

                  return (
                    <button
                      key={section.id}
                      onClick={() => onStartSection(chapter, section)}
                      className={`w-full p-4 rounded-2xl transition-all text-left ${
                        sectionComplete
                          ? "bg-green-500/20 border border-green-500/50 hover:bg-green-500/30"
                          : "bg-slate-700/50 border border-slate-600 hover:bg-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-white">
                              {section.title}
                            </h4>
                            {sectionComplete && (
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mb-2">
                            {section.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-600">
                              <div
                                className={`h-full transition-all ${
                                  sectionComplete ? "bg-green-500" : "bg-blue-500"
                                }`}
                                style={{ width: `${sectionProgress.percentage}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-300">
                              {sectionProgress.mastered}/{sectionProgress.total}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 ml-3 flex-shrink-0" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
