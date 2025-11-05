"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  Mail,
  Lock,
  LogIn,
  UserPlus,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          setMessage("Successfully logged in!");
          if (onAuthSuccess) {
            onAuthSuccess(data.user);
          }
        }
      } else {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          setMessage(
            "Account created! Please check your email to verify your account.",
          );
          // Clear form
          setEmail("");
          setPassword("");
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Blurred Background Preview - Shows the app in background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {/* Simulated app background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-[#0a0a0a] to-indigo-600/20" />

        {/* Decorative elements to simulate app content */}
        <div className="absolute top-24 left-8 w-72 h-40 bg-blue-500/25 rounded-2xl blur-2xl" />
        <div className="absolute top-48 right-12 w-64 h-32 bg-indigo-500/25 rounded-2xl blur-2xl" />
        <div className="absolute bottom-32 left-16 w-80 h-36 bg-purple-500/20 rounded-2xl blur-2xl" />
        <div className="absolute bottom-48 right-20 w-64 h-40 bg-blue-400/20 rounded-2xl blur-2xl" />
        <div className="absolute top-1/3 left-1/2 w-96 h-48 bg-indigo-600/15 rounded-2xl blur-3xl" />

        {/* Lighter blur overlay - more visible background */}
        <div className="absolute inset-0 backdrop-blur-lg bg-[#0a0a0a]/50" />
      </div>

      {/* Auth Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo/Title */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl mb-6 shadow-2xl shadow-blue-500/50">
              <span className="text-3xl font-bold text-white">T-6A</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              T-6A Boldface
            </h1>
            <p className="text-gray-400 text-sm">
              Sign in to sync your progress
            </p>
          </div>

          {/* Glassmorphism Auth Card */}
          <div className="backdrop-blur-2xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 animate-slide-up">
            {/* Tab Selector */}
            <div className="flex gap-2 mb-6 p-1 bg-black/20 rounded-2xl backdrop-blur-sm">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError(null);
                  setMessage(null);
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  isLogin
                    ? "bg-white/20 text-white shadow-lg backdrop-blur-xl"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <LogIn size={18} />
                  <span>Login</span>
                </div>
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError(null);
                  setMessage(null);
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  !isLogin
                    ? "bg-white/20 text-white shadow-lg backdrop-blur-xl"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </div>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl flex items-start gap-3 animate-shake">
                <AlertCircle
                  className="text-red-400 flex-shrink-0 mt-0.5"
                  size={18}
                />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="mb-4 p-4 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-2xl flex items-start gap-3 animate-fade-in">
                <AlertCircle
                  className="text-green-400 flex-shrink-0 mt-0.5"
                  size={18}
                />
                <p className="text-green-200 text-sm">{message}</p>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="text-gray-400" size={18} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="pilot@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={18} />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                </div>
                {!isLogin && (
                  <p className="mt-2 text-xs text-gray-400">
                    Must be at least 6 characters
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>
                      {isLogin ? "Logging in..." : "Creating account..."}
                    </span>
                  </>
                ) : (
                  <>
                    {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                    <span>{isLogin ? "Login" : "Create Account"}</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm">
              {isLogin ? (
                <p className="text-gray-400">
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      setError(null);
                      setMessage(null);
                    }}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setIsLogin(true);
                      setError(null);
                      setMessage(null);
                    }}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Login
                  </button>
                </p>
              )}
            </div>
          </div>

          {/* Guest Mode Button */}
          <div className="mt-4">
            <button
              onClick={() => onAuthSuccess({ isGuest: true })}
              className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-gray-300 font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Continue as Guest
            </button>
          </div>

          {/* Privacy Note */}
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>Guest mode: Progress saved locally only</p>
            <p className="mt-1">Sign in to sync across devices</p>
          </div>
        </div>
      </div>
    </div>
  );
}
