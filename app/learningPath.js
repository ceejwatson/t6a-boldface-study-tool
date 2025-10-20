/**
 * Progressive Learning Path Configuration
 *
 * Organizes questions into a structured curriculum with chapters
 * Users progress through chapters sequentially, unlocking new content
 */

export const learningPath = {
  chapters: [
    {
      id: "boldface-fundamentals",
      title: "BOLDFACE Fundamentals",
      description: "Critical emergency procedures you must know cold",
      emoji: "🚨",
      difficulty: "critical",
      unlocked: true, // First chapter is always unlocked
      requiredMastery: 0.8, // 80% mastery to unlock next chapter
      sections: [
        {
          id: "emergency-procedures",
          title: "Emergency Procedures",
          description: "Life-saving BOLDFACE procedures",
          questionTypes: ["reorderSequence"],
          categories: ["Emergency"],
          requiredForUnlock: true, // Must complete this section
        },
        {
          id: "obogs-emergencies",
          title: "OBOGS & Physiological",
          description: "Oxygen system failures and emergencies",
          questionTypes: ["multipleChoice", "trueFalse", "reorderSequence"],
          categories: ["OBOGS"],
        },
      ],
    },
    {
      id: "engine-operations",
      title: "Engine Operations & Limits",
      description: "Engine parameters, limitations, and procedures",
      emoji: "⚙️",
      difficulty: "high",
      unlocked: true,
      requiredMastery: 0.75,
      sections: [
        {
          id: "engine-limits",
          title: "Engine Operating Limits",
          description: "Torque, ITT, N1, Np parameters",
          questionTypes: ["multipleChoice", "trueFalse", "matchItems"],
          categories: ["Propulsion"],
          topics: ["Engine"],
        },
        {
          id: "fuel-system",
          title: "Fuel System",
          description: "Fuel states, limitations, and management",
          questionTypes: ["multipleChoice", "trueFalse", "matchItems"],
          categories: ["Fuel"],
        },
      ],
    },
    {
      id: "airspeed-limitations",
      title: "Airspeed & G Limitations",
      description: "Speed limits and structural G-load restrictions",
      emoji: "✈️",
      difficulty: "high",
      unlocked: true,
      requiredMastery: 0.7,
      sections: [
        {
          id: "airspeed-limits",
          title: "Airspeed Limitations",
          description: "VNE, VLE, VFE and configuration limits",
          questionTypes: ["multipleChoice", "trueFalse", "matchItems"],
          categories: ["Airspeed"],
        },
        {
          id: "g-limits",
          title: "G-Load Limits",
          description: "Symmetric and asymmetric G limitations",
          questionTypes: ["multipleChoice", "trueFalse"],
          categories: ["G Limits"],
        },
      ],
    },
    {
      id: "environmental-limits",
      title: "Environmental Limitations",
      description: "Wind, weather, and environmental restrictions",
      emoji: "🌤️",
      difficulty: "medium",
      unlocked: true,
      requiredMastery: 0.7,
      sections: [
        {
          id: "wind-limits",
          title: "Wind Limitations",
          description: "Crosswind and tailwind limits",
          questionTypes: ["multipleChoice", "trueFalse", "matchItems"],
          categories: ["Wind Limits"],
        },
        {
          id: "temperature-limits",
          title: "Temperature Limits",
          description: "Operating temperature ranges",
          questionTypes: ["multipleChoice", "trueFalse"],
          categories: ["Temperature"],
        },
        {
          id: "icing-limits",
          title: "Icing Limitations",
          description: "Icing restrictions and procedures",
          questionTypes: ["multipleChoice", "trueFalse"],
          categories: ["Ice"],
        },
      ],
    },
    {
      id: "prohibited-maneuvers",
      title: "Prohibited Maneuvers & Spins",
      description: "What you cannot do in the T-6A",
      emoji: "⛔",
      difficulty: "critical",
      unlocked: true,
      requiredMastery: 0.75,
      sections: [
        {
          id: "prohibited-list",
          title: "Prohibited Maneuvers",
          description: "All 11 prohibited maneuvers",
          questionTypes: ["trueFalse"],
          categories: ["Prohibited"],
        },
        {
          id: "spin-limits",
          title: "Spin Limitations",
          description: "Spin entry, recovery, and restrictions",
          questionTypes: ["multipleChoice", "trueFalse"],
          categories: ["Spins"],
        },
      ],
    },
    {
      id: "advanced-scenarios",
      title: "Advanced Scenarios",
      description: "Complex decision-making and scenarios",
      emoji: "🎯",
      difficulty: "high",
      unlocked: true,
      requiredMastery: 0.8,
      sections: [
        {
          id: "scenario-questions",
          title: "Scenario-Based Questions",
          description: "Real-world application and decision making",
          questionTypes: ["multipleChoice"],
          categories: ["Scenario"],
        },
      ],
    },
  ],
};

/**
 * Get all question IDs for a specific section
 */
export function getQuestionsForSection(section, allQuestions) {
  return allQuestions.filter((q) => {
    // Filter by question type
    if (
      section.questionTypes &&
      !section.questionTypes.includes(q.questionType)
    ) {
      return false;
    }

    // Filter by category
    if (section.categories && !section.categories.includes(q.category)) {
      return false;
    }

    // Filter by topic if specified
    if (section.topics && !section.topics.includes(q.topic)) {
      return false;
    }

    return true;
  });
}

/**
 * Calculate mastery progress for a section
 */
export function getSectionProgress(section, allQuestions, questionMastery) {
  const sectionQuestions = getQuestionsForSection(section, allQuestions);
  if (sectionQuestions.length === 0)
    return { total: 0, mastered: 0, percentage: 0 };

  const mastered = sectionQuestions.filter((q) => {
    const mastery = questionMastery[q.id];
    return mastery && mastery.correctCount >= 3;
  }).length;

  return {
    total: sectionQuestions.length,
    mastered: mastered,
    percentage: Math.round((mastered / sectionQuestions.length) * 100),
  };
}

/**
 * Calculate mastery progress for a chapter
 */
export function getChapterProgress(chapter, allQuestions, questionMastery) {
  let totalQuestions = 0;
  let totalMastered = 0;

  chapter.sections.forEach((section) => {
    const progress = getSectionProgress(section, allQuestions, questionMastery);
    totalQuestions += progress.total;
    totalMastered += progress.mastered;
  });

  return {
    total: totalQuestions,
    mastered: totalMastered,
    percentage:
      totalQuestions > 0
        ? Math.round((totalMastered / totalQuestions) * 100)
        : 0,
  };
}

/**
 * Check if a chapter should be unlocked based on previous chapter mastery
 */
export function shouldUnlockChapter(
  chapterIndex,
  learningPath,
  allQuestions,
  questionMastery,
) {
  if (chapterIndex === 0) return true; // First chapter always unlocked

  const previousChapter = learningPath.chapters[chapterIndex - 1];
  const progress = getChapterProgress(
    previousChapter,
    allQuestions,
    questionMastery,
  );

  return progress.percentage >= previousChapter.requiredMastery * 100;
}

/**
 * Get next recommended section to study
 */
export function getNextRecommendedSection(
  learningPath,
  allQuestions,
  questionMastery,
) {
  for (const chapter of learningPath.chapters) {
    const chapterProgress = getChapterProgress(
      chapter,
      allQuestions,
      questionMastery,
    );

    if (chapterProgress.percentage < 100) {
      // Find first incomplete section in this chapter
      for (const section of chapter.sections) {
        const sectionProgress = getSectionProgress(
          section,
          allQuestions,
          questionMastery,
        );
        if (sectionProgress.percentage < 100) {
          return {
            chapter: chapter,
            section: section,
            progress: sectionProgress,
          };
        }
      }
    }
  }

  return null; // All sections complete!
}
