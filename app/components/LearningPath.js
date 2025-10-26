"use client";

import { CheckCircle2, Lock, ChevronRight, BookOpen, Target, Award } from "lucide-react";

export default function LearningPath({
  learningPath,
  allQuestions,
  questionMastery,
  onStartSection,
  getChapterProgress,
  getSectionProgress,
  shouldUnlockChapter,
}) {
  // Calculate overall progress
  const totalQuestions = allQuestions.length;
  const masteredQuestions = Object.values(questionMastery).filter(q => q.correctCount >= 3).length;
  const overallProgress = totalQuestions > 0 ? Math.round((masteredQuestions / totalQuestions) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-8">
      {/* Header with Overall Stats - Apple Style */}
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-blue-500/30">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-white mb-3">
            Categories
          </h2>
          <p className="text-lg text-slate-300">
            Master T-6A BOLDFACE by category
          </p>
        </div>

        {/* Overall Progress Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 text-center">
            <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">{totalQuestions}</div>
            <div className="text-xs text-slate-400">Total Questions</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-green-400">{masteredQuestions}</div>
            <div className="text-xs text-slate-400">Mastered</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 text-center">
            <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-purple-400">{overallProgress}%</div>
            <div className="text-xs text-slate-400">Complete</div>
          </div>
        </div>
      </div>

      {/* Chapters */}
      {learningPath.chapters.map((chapter, chapterIndex) => {
        const chapterProgress = getChapterProgress(chapter, allQuestions, questionMastery);
        const isUnlocked = chapter.unlocked || shouldUnlockChapter(chapterIndex, learningPath, allQuestions, questionMastery);
        const isComplete = chapterProgress.percentage === 100;

        return (
          <div
            key={chapter.id}
            className={`bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl transition-all duration-300 border ${
              !isUnlocked
                ? "opacity-40 border-slate-700"
                : isComplete
                  ? "border-green-500/50 hover:border-green-500/70 hover:shadow-green-500/20"
                  : "border-slate-600 hover:border-slate-500 hover:shadow-xl"
            }`}
          >
            {/* Chapter Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {!isUnlocked && (
                    <div className="p-2 bg-slate-700/50 rounded-xl">
                      <Lock className="w-6 h-6 text-slate-400" />
                    </div>
                  )}
                  {isComplete && (
                    <div className="p-2 bg-green-500/20 rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {chapter.description}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>Progress</span>
                      <span className="font-semibold">{chapterProgress.mastered}/{chapterProgress.total} questions</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden bg-slate-700">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isComplete
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : "bg-gradient-to-r from-blue-500 to-cyan-500"
                        }`}
                        style={{ width: `${chapterProgress.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className={`text-2xl font-bold min-w-[60px] text-right ${
                    isComplete ? "text-green-400" : "text-blue-400"
                  }`}>
                    {chapterProgress.percentage}%
                  </div>
                </div>
              </div>
            </div>

            {/* Sections */}
            {isUnlocked && (
              <div className="space-y-3 mt-6 pt-6 border-t border-slate-700">
                {chapter.sections.map((section) => {
                  const sectionProgress = getSectionProgress(section, allQuestions, questionMastery);
                  const sectionComplete = sectionProgress.percentage === 100;

                  return (
                    <button
                      key={section.id}
                      onClick={() => onStartSection(chapter, section)}
                      className={`group w-full p-5 rounded-2xl transition-all duration-200 text-left ${
                        sectionComplete
                          ? "bg-gradient-to-br from-green-500/20 to-emerald-500/10 border-2 border-green-500/50 hover:from-green-500/30 hover:to-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
                          : "bg-gradient-to-br from-slate-700/50 to-slate-700/30 border-2 border-slate-600 hover:border-slate-500 hover:from-slate-700/70 hover:to-slate-700/50 hover:scale-[1.02] active:scale-[0.98]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-white text-lg truncate">
                              {section.title}
                            </h4>
                            {sectionComplete && (
                              <div className="flex-shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mb-3">
                            {section.description}
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 rounded-full overflow-hidden bg-slate-600">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  sectionComplete
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                    : "bg-gradient-to-r from-blue-500 to-cyan-500"
                                }`}
                                style={{ width: `${sectionProgress.percentage}%` }}
                              />
                            </div>
                            <span className={`text-sm font-bold min-w-[80px] text-right ${
                              sectionComplete ? "text-green-400" : "text-blue-400"
                            }`}>
                              {sectionProgress.mastered}/{sectionProgress.total}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className={`w-6 h-6 ml-4 flex-shrink-0 transition-transform duration-200 ${
                          sectionComplete ? "text-green-400" : "text-slate-400"
                        } group-hover:translate-x-1`} />
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
