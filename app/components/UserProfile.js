"use client";

import { supabase } from "../lib/supabase";
import { User, LogOut } from "lucide-react";

export default function UserProfile({ user, onLogout }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (onLogout) {
      onLogout();
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
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <LogOut size={14} />
            <span className="font-medium text-xs sm:text-sm hidden xs:inline">
              {user.isGuest ? "Exit" : "Logout"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
