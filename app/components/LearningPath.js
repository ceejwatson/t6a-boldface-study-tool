"use client";

import { CheckCircle2, Lock, ChevronRight, Award, Target } from "lucide-react";

export default function LearningPath({
  learningPath,
  allQuestions,
  questionMastery,
  onStartSection,
  getChapterProgress,
  getSectionProgress,
  shouldUnlockChapter,
  darkMode = true,
}) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
          📚 Learning Path
        </h2>
        <p className={`text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
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
            className={`rounded-xl border-2 transition ${
              isUnlocked
                ? darkMode
                  ? "bg-slate-800 border-slate-600"
                  : "bg-white border-slate-300"
                : darkMode
                  ? "bg-slate-800/50 border-slate-700"
                  : "bg-slate-100 border-slate-300"
            } ${!isUnlocked ? "opacity-60" : ""}`}
          >
            {/* Chapter Header */}
            <div className="p-6 border-b-2 border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{chapter.emoji}</span>
                    <div>
                      <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                        {chapter.title}
                      </h3>
                      <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                        {chapter.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                        {chapterProgress.mastered} / {chapterProgress.total} questions mastered
                      </span>
                      <span className={`text-sm font-bold ${
                        isComplete
                          ? "text-green-400"
                          : darkMode
                            ? "text-blue-400"
                            : "text-blue-600"
                      }`}>
                        {chapterProgress.percentage}%
                      </span>
                    </div>
                    <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}>
                      <div
                        className={`h-full transition-all duration-500 ${
                          isComplete
                            ? "bg-gradient-to-r from-green-500 to-emerald-600"
                            : "bg-gradient-to-r from-blue-500 to-blue-600"
                        }`}
                        style={{ width: `${chapterProgress.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="ml-4">
                  {!isUnlocked ? (
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}>
                      <Lock className="w-5 h-5 text-slate-400" />
                      <span className="text-sm font-medium text-slate-400">Locked</span>
                    </div>
                  ) : isComplete ? (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-900/30 border-2 border-green-600">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-medium text-green-400">Complete</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900/30 border-2 border-blue-600">
                      <Target className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">In Progress</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Required Mastery Notice */}
              {!isComplete && isUnlocked && chapterIndex < learningPath.chapters.length - 1 && (
                <div className={`mt-4 p-3 rounded-lg ${darkMode ? "bg-yellow-900/20 border border-yellow-600/50" : "bg-yellow-50 border border-yellow-300"}`}>
                  <p className={`text-sm ${darkMode ? "text-yellow-400" : "text-yellow-800"}`}>
                    ⭐ Achieve {Math.round(chapter.requiredMastery * 100)}% mastery to unlock the next chapter
                  </p>
                </div>
              )}
            </div>

            {/* Sections */}
            {isUnlocked && (
              <div className="p-4 space-y-3">
                {chapter.sections.map((section) => {
                  const sectionProgress = getSectionProgress(section, allQuestions, questionMastery);
                  const sectionComplete = sectionProgress.percentage === 100;

                  return (
                    <button
                      key={section.id}
                      onClick={() => onStartSection(chapter, section)}
                      className={`w-full p-4 rounded-lg border-2 transition text-left ${
                        darkMode
                          ? "bg-slate-700/50 border-slate-600 hover:border-blue-500"
                          : "bg-slate-50 border-slate-300 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
                              {section.title}
                            </h4>
                            {sectionComplete && (
                              <CheckCircle2 className="w-5 h-5 text-green-400" />
                            )}
                          </div>
                          <p className={`text-sm mb-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                            {section.description}
                          </p>

                          {/* Section Progress */}
                          <div className="flex items-center gap-3">
                            <div className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                              {sectionProgress.mastered} / {sectionProgress.total} mastered
                            </div>
                            <div className={`flex-1 h-2 rounded-full overflow-hidden ${darkMode ? "bg-slate-600" : "bg-slate-200"}`}>
                              <div
                                className={`h-full ${
                                  sectionComplete
                                    ? "bg-green-500"
                                    : "bg-blue-500"
                                }`}
                                style={{ width: `${sectionProgress.percentage}%` }}
                              />
                            </div>
                            <div className={`text-xs font-bold ${
                              sectionComplete
                                ? "text-green-400"
                                : darkMode
                                  ? "text-blue-400"
                                  : "text-blue-600"
                            }`}>
                              {sectionProgress.percentage}%
                            </div>
                          </div>
                        </div>

                        <ChevronRight className={`w-5 h-5 ml-4 ${darkMode ? "text-slate-400" : "text-slate-500"}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Overall Progress Summary */}
      <div className={`${darkMode ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-2 border-blue-600" : "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-400"} rounded-xl p-6 text-center`}>
        <Award className={`w-12 h-12 mx-auto mb-3 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
        <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
          Overall Progress
        </h3>
        <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
          Complete all chapters to master T-6A BOLDFACE!
        </p>
        {(() => {
          const totalChapters = learningPath.chapters.length;
          const completedChapters = learningPath.chapters.filter((ch) => {
            const progress = getChapterProgress(ch, allQuestions, questionMastery);
            return progress.percentage === 100;
          }).length;

          return (
            <div className="mt-4">
              <div className={`text-3xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                {completedChapters} / {totalChapters}
              </div>
              <div className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                Chapters Completed
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
