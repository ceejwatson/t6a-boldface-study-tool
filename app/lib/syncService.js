import { supabase } from "./supabase";

// LocalStorage keys used by the app
const STORAGE_KEYS = {
  PERFORMANCE: "t6a-performance",
  FLAGGED: "t6a-flagged",
  SRS: "t6a-srs",
  SESSION_HISTORY: "t6a-session-history",
  MASTERY: "t6a-mastery",
  UNKNOWN_FLASHCARDS: "t6a-unknown-flashcards",
  FONT_SIZE: "t6a-font-size",
};

/**
 * Get all progress data from localStorage
 */
export function getLocalProgress() {
  try {
    const progress = {
      performance: JSON.parse(
        localStorage.getItem(STORAGE_KEYS.PERFORMANCE) || "{}",
      ),
      flaggedQuestions: JSON.parse(
        localStorage.getItem(STORAGE_KEYS.FLAGGED) || "[]",
      ),
      srsData: JSON.parse(localStorage.getItem(STORAGE_KEYS.SRS) || "{}"),
      sessionHistory: JSON.parse(
        localStorage.getItem(STORAGE_KEYS.SESSION_HISTORY) || "[]",
      ),
      masteryData: JSON.parse(
        localStorage.getItem(STORAGE_KEYS.MASTERY) || "{}",
      ),
      unknownFlashcards: JSON.parse(
        localStorage.getItem(STORAGE_KEYS.UNKNOWN_FLASHCARDS) || "[]",
      ),
      fontSize: localStorage.getItem(STORAGE_KEYS.FONT_SIZE) || "medium",
    };
    console.log("📱 [SYNC] Local data read:", {
      performance:
        Object.keys(progress.performance?.byCategory || {}).length +
        " categories",
      flagged: progress.flaggedQuestions.length,
      srs: Object.keys(progress.srsData).length,
      sessions: progress.sessionHistory.length,
      mastery: Object.keys(progress.masteryData).length,
      unknown: progress.unknownFlashcards.length,
    });
    return progress;
  } catch (error) {
    console.error("Error reading local progress:", error);
    return null;
  }
}

/**
 * Save progress data to localStorage
 */
export function saveLocalProgress(progress) {
  try {
    console.log("💾 [SYNC] Saving to localStorage:", {
      performance:
        Object.keys(progress.performance?.byCategory || {}).length +
        " categories",
      flagged: progress.flaggedQuestions?.length || 0,
      srs: Object.keys(progress.srsData || {}).length,
      sessions: progress.sessionHistory?.length || 0,
      mastery: Object.keys(progress.masteryData || {}).length,
      unknown: progress.unknownFlashcards?.length || 0,
    });

    if (progress.performance) {
      localStorage.setItem(
        STORAGE_KEYS.PERFORMANCE,
        JSON.stringify(progress.performance),
      );
    }
    if (progress.flaggedQuestions !== undefined) {
      localStorage.setItem(
        STORAGE_KEYS.FLAGGED,
        JSON.stringify(progress.flaggedQuestions),
      );
    }
    if (progress.srsData) {
      localStorage.setItem(STORAGE_KEYS.SRS, JSON.stringify(progress.srsData));
    }
    if (progress.sessionHistory) {
      localStorage.setItem(
        STORAGE_KEYS.SESSION_HISTORY,
        JSON.stringify(progress.sessionHistory),
      );
    }
    if (progress.masteryData) {
      localStorage.setItem(
        STORAGE_KEYS.MASTERY,
        JSON.stringify(progress.masteryData),
      );
    }
    if (progress.unknownFlashcards !== undefined) {
      localStorage.setItem(
        STORAGE_KEYS.UNKNOWN_FLASHCARDS,
        JSON.stringify(progress.unknownFlashcards),
      );
    }
    if (progress.fontSize) {
      localStorage.setItem(STORAGE_KEYS.FONT_SIZE, progress.fontSize);
    }
    console.log("✅ [SYNC] Saved to localStorage successfully");
    return true;
  } catch (error) {
    console.error("❌ [SYNC] Error saving local progress:", error);
    return false;
  }
}

/**
 * Pull progress from Supabase and merge with local data
 */
export async function pullProgress(userId) {
  try {
    console.log("☁️ [SYNC] Pulling from Supabase for user:", userId);
    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      // If no record exists yet, that's okay
      if (error.code === "PGRST116") {
        console.log("⚠️ [SYNC] No remote progress found - user is new");
        return null;
      }
      console.error("❌ [SYNC] Supabase pull error:", error);
      throw error;
    }

    const progress = {
      performance: data.performance || {},
      flaggedQuestions: data.flagged_questions || [],
      srsData: data.srs_data || {},
      sessionHistory: data.session_history || [],
      masteryData: data.mastery_data || {},
      unknownFlashcards: data.unknown_flashcards || [],
      fontSize: data.font_size || "medium",
      updatedAt: data.updated_at,
    };

    console.log("✅ [SYNC] Pulled from Supabase:", {
      performance:
        Object.keys(progress.performance?.byCategory || {}).length +
        " categories",
      flagged: progress.flaggedQuestions.length,
      srs: Object.keys(progress.srsData).length,
      sessions: progress.sessionHistory.length,
      mastery: Object.keys(progress.masteryData).length,
      unknown: progress.unknownFlashcards.length,
      updatedAt: progress.updatedAt,
    });

    return progress;
  } catch (error) {
    console.error("❌ [SYNC] Error pulling progress from Supabase:", error);
    throw error;
  }
}

/**
 * Push local progress to Supabase
 */
export async function pushProgress(userId, progress) {
  try {
    const payload = {
      user_id: userId,
      performance: progress.performance || {},
      flagged_questions: progress.flaggedQuestions || [],
      srs_data: progress.srsData || {},
      session_history: progress.sessionHistory || [],
      mastery_data: progress.masteryData || {},
      unknown_flashcards: progress.unknownFlashcards || [],
      font_size: progress.fontSize || "medium",
    };

    console.log("⬆️ [SYNC] Pushing to Supabase:", {
      userId,
      performance:
        Object.keys(payload.performance?.byCategory || {}).length +
        " categories",
      flagged: payload.flagged_questions.length,
      srs: Object.keys(payload.srs_data).length,
      sessions: payload.session_history.length,
      mastery: Object.keys(payload.mastery_data).length,
      unknown: payload.unknown_flashcards.length,
    });

    const { data, error } = await supabase
      .from("user_progress")
      .upsert(payload, {
        onConflict: "user_id",
      })
      .select();

    if (error) {
      console.error("❌ [SYNC] Supabase push error:", error);
      throw error;
    }

    console.log("✅ [SYNC] Pushed to Supabase successfully");
    return data;
  } catch (error) {
    console.error("❌ [SYNC] Error pushing progress to Supabase:", error);
    throw error;
  }
}

/**
 * Merge two progress objects - prioritizes data with more progress
 */
export function mergeProgress(local, remote) {
  if (!local) return remote;
  if (!remote) return local;

  // Helper to merge performance stats
  const mergeStats = (localStats, remoteStats) => {
    if (!localStats) return remoteStats;
    if (!remoteStats) return localStats;

    return {
      correct: Math.max(localStats.correct || 0, remoteStats.correct || 0),
      incorrect: Math.max(
        localStats.incorrect || 0,
        remoteStats.incorrect || 0,
      ),
      streak: Math.max(localStats.streak || 0, remoteStats.streak || 0),
      bestStreak: Math.max(
        localStats.bestStreak || 0,
        remoteStats.bestStreak || 0,
      ),
      total: Math.max(localStats.total || 0, remoteStats.total || 0),
    };
  };

  // Merge performance data - properly merge stats for each category/type
  const mergedByCategory = {};
  const allCategories = new Set([
    ...Object.keys(local.performance?.byCategory || {}),
    ...Object.keys(remote.performance?.byCategory || {}),
  ]);
  allCategories.forEach((category) => {
    mergedByCategory[category] = mergeStats(
      local.performance?.byCategory?.[category],
      remote.performance?.byCategory?.[category],
    );
  });

  const mergedByQuestionType = {};
  const allTypes = new Set([
    ...Object.keys(local.performance?.byQuestionType || {}),
    ...Object.keys(remote.performance?.byQuestionType || {}),
  ]);
  allTypes.forEach((type) => {
    mergedByQuestionType[type] = mergeStats(
      local.performance?.byQuestionType?.[type],
      remote.performance?.byQuestionType?.[type],
    );
  });

  const mergedPerformance = {
    byCategory: mergedByCategory,
    byQuestionType: mergedByQuestionType,
    overall: mergeStats(
      local.performance?.overall,
      remote.performance?.overall,
    ),
  };

  // Merge flagged questions (union of both)
  const mergedFlagged = Array.from(
    new Set([
      ...(local.flaggedQuestions || []),
      ...(remote.flaggedQuestions || []),
    ]),
  );

  // Merge SRS data - keep most recent per question
  const mergedSRS = { ...(remote.srsData || {}), ...(local.srsData || {}) };

  // Merge session history - combine and sort by date
  const mergedSessions = [
    ...(local.sessionHistory || []),
    ...(remote.sessionHistory || []),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 100); // Keep last 100 sessions

  // Merge mastery data - keep highest counts per question
  const mergedMastery = {};
  const allQuestionIds = new Set([
    ...Object.keys(local.masteryData || {}),
    ...Object.keys(remote.masteryData || {}),
  ]);

  allQuestionIds.forEach((qId) => {
    const localMastery = local.masteryData?.[qId] || {};
    const remoteMastery = remote.masteryData?.[qId] || {};

    mergedMastery[qId] = {
      correctCount: Math.max(
        localMastery.correctCount || 0,
        remoteMastery.correctCount || 0,
      ),
      incorrectCount: Math.max(
        localMastery.incorrectCount || 0,
        remoteMastery.incorrectCount || 0,
      ),
      lastAnswered: Math.max(
        new Date(localMastery.lastAnswered || 0).getTime(),
        new Date(remoteMastery.lastAnswered || 0).getTime(),
      ),
    };
  });

  // Merge unknown flashcards (union)
  const mergedUnknownFlashcards = Array.from(
    new Set([
      ...(local.unknownFlashcards || []),
      ...(remote.unknownFlashcards || []),
    ]),
  );

  return {
    performance: mergedPerformance,
    flaggedQuestions: mergedFlagged,
    srsData: mergedSRS,
    sessionHistory: mergedSessions,
    masteryData: mergedMastery,
    unknownFlashcards: mergedUnknownFlashcards,
    fontSize: local.fontSize || remote.fontSize || "medium",
  };
}

/**
 * Full sync - pull from remote, merge with local, push back
 */
export async function syncProgress(userId, notifyApp = true) {
  try {
    console.log("🔄 [SYNC] ========== STARTING FULL SYNC ==========");
    console.log("🔄 [SYNC] User ID:", userId);

    // Get local progress
    const localProgress = getLocalProgress();
    console.log("📱 [SYNC] Step 1/5: Local progress loaded");

    // Pull remote progress
    const remoteProgress = await pullProgress(userId);
    console.log("☁️ [SYNC] Step 2/5: Remote progress loaded");

    // Merge
    const mergedProgress = mergeProgress(localProgress, remoteProgress);
    console.log("🔀 [SYNC] Step 3/5: Progress merged");

    // Save merged data locally
    saveLocalProgress(mergedProgress);
    console.log("💾 [SYNC] Step 4/5: Merged progress saved locally");

    // Push merged data to remote
    await pushProgress(userId, mergedProgress);
    console.log("⬆️ [SYNC] Step 5/5: Merged progress pushed to remote");

    // Notify app to reload data if requested (for auto-sync and manual sync)
    if (notifyApp && typeof window !== "undefined") {
      console.log("📢 [SYNC] Dispatching sync-complete event to app");
      window.dispatchEvent(
        new CustomEvent("supabase-sync-complete", {
          detail: { userId, timestamp: Date.now() },
        }),
      );
    }

    console.log("✅ [SYNC] ========== SYNC COMPLETED SUCCESSFULLY ==========");
    return {
      success: true,
      progress: mergedProgress,
    };
  } catch (error) {
    console.error("❌ [SYNC] ========== SYNC FAILED ==========");
    console.error("❌ [SYNC] Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Auto-sync setup - sync on visibility change and periodic intervals
 */
export function setupAutoSync(userId) {
  let syncInterval;

  const performSync = () => {
    syncProgress(userId).catch((err) => {
      console.error("Auto-sync failed:", err);
    });
  };

  // Sync when tab becomes visible
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      performSync();
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Sync every 2 minutes
  syncInterval = setInterval(performSync, 2 * 60 * 1000);

  // Initial sync
  performSync();

  // Return cleanup function
  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    clearInterval(syncInterval);
  };
}

/**
 * Clear local progress (for logout)
 */
export function clearLocalProgress() {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
