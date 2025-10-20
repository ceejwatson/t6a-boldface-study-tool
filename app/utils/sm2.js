/**
 * SuperMemo SM-2 Algorithm Implementation
 *
 * The SM-2 algorithm calculates optimal intervals for reviewing material
 * based on the user's performance (quality of recall).
 *
 * Quality ratings (0-5):
 * 5 - Perfect response
 * 4 - Correct response after hesitation
 * 3 - Correct response with serious difficulty
 * 2 - Incorrect response; correct answer seemed easy to recall
 * 1 - Incorrect response; correct answer remembered
 * 0 - Complete blackout
 *
 * SM-2 Variables:
 * - EF (Easiness Factor): How easy the item is (min 1.3, starts at 2.5)
 * - interval: Days until next review
 * - repetitions: Number of consecutive correct answers
 */

/**
 * Calculate next review using SM-2 algorithm
 * @param {number} quality - Quality of recall (0-5)
 * @param {object} cardData - Current card SRS data
 * @returns {object} Updated SRS data
 */
export function calculateSM2(quality, cardData = {}) {
  // Initialize default values if not provided
  const {
    easinessFactor = 2.5,
    interval = 0,
    repetitions = 0,
  } = cardData;

  let newEF = easinessFactor;
  let newInterval = interval;
  let newRepetitions = repetitions;

  // Calculate new easiness factor
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  newEF = easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // Ensure EF doesn't go below 1.3
  if (newEF < 1.3) {
    newEF = 1.3;
  }

  // If quality < 3, reset repetitions and interval
  if (quality < 3) {
    newRepetitions = 0;
    newInterval = 1; // Review again tomorrow (in days)
  } else {
    // Increment repetitions
    newRepetitions = repetitions + 1;

    // Calculate new interval based on repetitions
    if (newRepetitions === 1) {
      newInterval = 1; // 1 day
    } else if (newRepetitions === 2) {
      newInterval = 6; // 6 days
    } else {
      // interval(n) = interval(n-1) * EF
      newInterval = Math.round(interval * newEF);
    }
  }

  return {
    easinessFactor: newEF,
    interval: newInterval,
    repetitions: newRepetitions,
    nextReview: Date.now() + (newInterval * 24 * 60 * 60 * 1000), // Convert days to milliseconds
    lastReviewed: Date.now(),
  };
}

/**
 * Map quiz performance to SM-2 quality rating
 * @param {boolean} isCorrect - Whether answer was correct
 * @param {number} timeSpent - Time in seconds (optional, for future use)
 * @param {boolean} wasHesitant - Whether user flagged or struggled (optional)
 * @returns {number} Quality rating (0-5)
 */
export function mapPerformanceToQuality(isCorrect, timeSpent = null, wasHesitant = false) {
  if (!isCorrect) {
    // Incorrect responses get 0-2
    return 0; // For now, treat all incorrect as 0 (complete blackout)
  }

  // Correct responses get 3-5
  if (wasHesitant) {
    return 3; // Correct but with difficulty
  }

  // Check time spent (if provided) - fast answers get higher quality
  if (timeSpent !== null) {
    if (timeSpent < 5) return 5; // Very fast = perfect
    if (timeSpent < 10) return 4; // Quick = good
    return 3; // Slow = correct but difficult
  }

  // Default for correct answers
  return 4; // Correct after hesitation
}

/**
 * Get questions due for review
 * @param {object} srsData - All SRS data { questionId: srsInfo }
 * @returns {array} Array of question IDs due for review
 */
export function getQuestionsDueForReview(srsData) {
  const now = Date.now();
  const dueQuestions = [];

  Object.keys(srsData).forEach((questionId) => {
    const card = srsData[questionId];

    // If never reviewed or due for review
    if (!card.nextReview || card.nextReview <= now) {
      dueQuestions.push(questionId);
    }
  });

  return dueQuestions;
}

/**
 * Sort questions by priority (most urgent first)
 * @param {array} questionIds - Array of question IDs
 * @param {object} srsData - SRS data for all questions
 * @returns {array} Sorted question IDs
 */
export function sortQuestionsByPriority(questionIds, srsData) {
  return questionIds.sort((a, b) => {
    const cardA = srsData[a] || { nextReview: 0, repetitions: 0 };
    const cardB = srsData[b] || { nextReview: 0, repetitions: 0 };

    // Prioritize questions that are overdue
    if (cardA.nextReview && cardB.nextReview) {
      return cardA.nextReview - cardB.nextReview; // Earlier due date first
    }

    // Prioritize new questions (never reviewed)
    if (!cardA.nextReview && cardB.nextReview) return -1;
    if (cardA.nextReview && !cardB.nextReview) return 1;

    // Both new: prioritize by repetitions (fewer repetitions first)
    return cardA.repetitions - cardB.repetitions;
  });
}

/**
 * Get statistics about SRS progress
 * @param {object} srsData - All SRS data
 * @param {number} totalQuestions - Total number of questions
 * @returns {object} Statistics
 */
export function getSRSStats(srsData, totalQuestions) {
  const now = Date.now();
  let newCards = 0;
  let learning = 0; // repetitions < 3
  let mature = 0; // repetitions >= 3
  let dueNow = 0;

  const allQuestionIds = Array.from({ length: totalQuestions }, (_, i) => i.toString());

  allQuestionIds.forEach((id) => {
    const card = srsData[id];

    if (!card || !card.lastReviewed) {
      newCards++;
      dueNow++;
    } else {
      if (card.repetitions >= 3) {
        mature++;
      } else {
        learning++;
      }

      if (!card.nextReview || card.nextReview <= now) {
        dueNow++;
      }
    }
  });

  return {
    new: newCards,
    learning: learning,
    mature: mature,
    dueNow: dueNow,
    total: totalQuestions,
  };
}
