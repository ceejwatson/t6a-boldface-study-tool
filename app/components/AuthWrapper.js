"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../lib/supabase";
import {
  syncProgress,
  setupAutoSync,
  clearLocalProgress,
} from "../lib/syncService";
import Auth from "./Auth";
import UserProfile from "./UserProfile";
import { Loader2, Cloud, CloudOff, CheckCircle } from "lucide-react";

// Create Sync Context to provide sync function throughout the app
const SyncContext = createContext(null);

export const useSync = () => {
  const context = useContext(SyncContext);
  if (!context) {
    return { triggerSync: () => {}, isSyncing: false }; // Return no-op for guest mode
  }
  return context;
};

export default function AuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState("idle"); // 'idle', 'syncing', 'synced', 'error'

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);

      // If user is logged in, sync their progress
      if (session?.user) {
        performInitialSync(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);

      // Sync on login
      if (session?.user) {
        performInitialSync(session.user.id);
      }

      // Clear local data on logout
      if (_event === "SIGNED_OUT") {
        clearLocalProgress();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Setup auto-sync when user is logged in (not for guests)
  useEffect(() => {
    if (user && !user.isGuest && user.id) {
      const cleanup = setupAutoSync(user.id);
      return cleanup;
    }
  }, [user]);

  const performInitialSync = async (userId) => {
    setSyncing(true);
    setSyncStatus("syncing");

    try {
      const result = await syncProgress(userId);
      if (result.success) {
        setSyncStatus("synced");
        setTimeout(() => setSyncStatus("idle"), 2000);

        // Dispatch custom event to notify app that sync is complete
        // This allows the main app to reload data from localStorage
        window.dispatchEvent(
          new CustomEvent("supabase-sync-complete", {
            detail: { userId, timestamp: Date.now() },
          }),
        );
      } else {
        setSyncStatus("error");
        setTimeout(() => setSyncStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Initial sync failed:", error);
      setSyncStatus("error");
      setTimeout(() => setSyncStatus("idle"), 3000);
    } finally {
      setSyncing(false);
    }
  };

  // Manual sync trigger for immediate syncing after actions
  const triggerSync = async () => {
    if (!user || user.isGuest || !user.id || syncing) {
      console.log("⏭️ [SYNC] Skipping sync - guest mode or already syncing");
      return;
    }

    console.log("🚀 [SYNC] Manual sync triggered by user action");
    setSyncing(true);
    setSyncStatus("syncing");

    try {
      const result = await syncProgress(user.id);
      if (result.success) {
        setSyncStatus("synced");
        setTimeout(() => setSyncStatus("idle"), 1500);
      } else {
        setSyncStatus("error");
        setTimeout(() => setSyncStatus("idle"), 2000);
      }
    } catch (error) {
      console.error("❌ [SYNC] Manual sync failed:", error);
      setSyncStatus("error");
      setTimeout(() => setSyncStatus("idle"), 2000);
    } finally {
      setSyncing(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAuthSuccess = (user) => {
    // Handle both guest mode and regular login
    if (user?.isGuest) {
      // Guest mode - set a mock user object
      setUser({ email: "Guest", isGuest: true });
    } else {
      setUser(user);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <Loader2
            className="animate-spin text-blue-500 mx-auto mb-4"
            size={48}
          />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If not logged in, show auth screen
  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  // User is logged in - show app with user profile
  return (
    <SyncContext.Provider value={{ triggerSync, isSyncing: syncing }}>
      <div className="animate-fade-in">
        {/* Sync Status Indicator - Fixed position */}
        {syncStatus !== "idle" && (
          <div className="fixed top-4 right-4 z-50">
            <div
              className={`px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 ${
                syncStatus === "syncing"
                  ? "bg-blue-600 text-white"
                  : syncStatus === "synced"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
              }`}
            >
              {syncStatus === "syncing" && (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  <span className="text-sm font-medium">Syncing...</span>
                </>
              )}
              {syncStatus === "synced" && (
                <>
                  <CheckCircle size={16} />
                  <span className="text-sm font-medium">Synced!</span>
                </>
              )}
              {syncStatus === "error" && (
                <>
                  <CloudOff size={16} />
                  <span className="text-sm font-medium">Sync failed</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* User Profile - This will be rendered at the top of the app */}
        <UserProfile user={user} onLogout={handleLogout} />

        {/* Main App Content */}
        {children}
      </div>
    </SyncContext.Provider>
  );
}
