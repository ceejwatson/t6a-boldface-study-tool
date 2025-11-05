"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  Mail,
  Lock,
  User,
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <span className="text-2xl font-bold text-white">T6</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            T-6A Boldface Study
          </h1>
          <p className="text-gray-600">
            Sign in to sync your progress across devices
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Tab Selector */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setIsLogin(true);
                setError(null);
                setMessage(null);
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                isLogin
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                !isLogin
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle
                className="text-red-600 flex-shrink-0 mt-0.5"
                size={18}
              />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
              <AlertCircle
                className="text-green-600 flex-shrink-0 mt-0.5"
                size={18}
              />
              <p className="text-green-800 text-sm">{message}</p>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pilot@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              {!isLogin && (
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 6 characters
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>
                    {isLogin ? "Logging in..." : "Creating account..."}
                  </span>
                </>
              ) : (
                <>
                  {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
                  <span>{isLogin ? "Login" : "Create Account"}</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? (
              <p>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setError(null);
                    setMessage(null);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setError(null);
                    setMessage(null);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            Your study progress will be securely synced across all your devices
          </p>
        </div>
      </div>
    </div>
  );
}
