"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  User,
  LogOut,
  RefreshCw,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { syncProgress } from "../lib/syncService";

export default function UserProfile({ user, onLogout }) {
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (onLogout) {
      onLogout();
    }
  };

  const handleManualSync = async () => {
    setSyncing(true);
    setSyncStatus(null);

    try {
      const result = await syncProgress(user.id);
      if (result.success) {
        setSyncStatus({
          type: "success",
          message: "Progress synced successfully!",
        });
      } else {
        setSyncStatus({
          type: "error",
          message: `Sync failed: ${result.error}`,
        });
      }
    } catch (error) {
      setSyncStatus({ type: "error", message: `Sync error: ${error.message}` });
    } finally {
      setSyncing(false);
      // Clear status after 3 seconds
      setTimeout(() => setSyncStatus(null), 3000);
    }
  };

  return (
    <div className="bg-gray-800/50 border-b border-gray-700 px-3 py-2 sm:px-4 sm:py-2.5">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="text-white" size={14} />
          </div>
          <p className="font-medium text-gray-100 text-xs sm:text-sm truncate">
            {user.email}
          </p>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Manual Sync Button */}
          <button
            onClick={handleManualSync}
            disabled={syncing}
            className="p-1.5 sm:p-2 text-blue-400 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
            title="Sync now"
          >
            <RefreshCw size={14} className={syncing ? "animate-spin" : ""} />
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <LogOut size={14} />
            <span className="font-medium text-xs sm:text-sm hidden xs:inline">
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Sync Status */}
      {syncStatus && (
        <div
          className={`mt-2 p-2 rounded-lg flex items-center gap-2 text-xs ${
            syncStatus.type === "success"
              ? "bg-green-900/30 text-green-400 border border-green-800"
              : "bg-red-900/30 text-red-400 border border-red-800"
          }`}
        >
          {syncStatus.type === "success" ? (
            <CheckCircle size={14} />
          ) : (
            <XCircle size={14} />
          )}
          <span>{syncStatus.message}</span>
        </div>
      )}
    </div>
  );
}
