"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClerkLoaded,
  ClerkLoading,
  SignOutButton,
  UserProfile,
  useUser,
} from "@clerk/nextjs";
import { Animate, FadeUp } from "@/Animation";
import Loading from "@/components/ui/Loading";
import LanguageSelector from "@/components/LanguageSelector";
import {
  LogOut,
  Mail,
  User,
  Calendar,
  Shield,
  Trophy,
  Target,
  Zap,
  Award,
  X,
} from "lucide-react";
import { dark } from "@clerk/themes";

export default function Page() {
  const { user } = useUser();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [displayName, setDisplayName] = useState(user?.fullName || "");
  const [imageUrl, setImageUrl] = useState(user?.imageUrl || "");

  // Mock data for completed tasks - replace with real data
  const completedTasks = 0;
  const totalTasks = 100;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  if (!user)
    return (
      <section className="flex justify-center items-center min-h-screen">
        <Loading />
      </section>
    );

  return (
    <section className="flex flex-col justify-center items-center mt-20 px-4">
      <ClerkLoading>
        <Loading />
      </ClerkLoading>

      <ClerkLoaded>
        <motion.div
          {...FadeUp}
          {...Animate}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Account Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="py-8 px-6 rounded-3xl bg-gradient-to-b from-white/3 to-white/2/0 shadow-2xl"
            >
              {/* Profile Header */}
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative group"
                >
                  <img
                    src={user.imageUrl}
                    alt="User avatar"
                    className="relative w-24 h-24 rounded-full border-4 border-white/20"
                  />
                  <button
                    onClick={() => setIsEditingImage(true)}
                    className="absolute inset-0 w-24 h-24 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <User className="w-6 h-6 text-white" />
                  </button>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-black flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 text-center w-full"
                >
                  {isEditingName ? (
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      onBlur={() => setIsEditingName(false)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setIsEditingName(false)
                      }
                      autoFocus
                      className="text-2xl font-bold bg-white/5 border border-white/20 rounded-lg px-3 py-1 text-white text-center w-full"
                    />
                  ) : (
                    <h2
                      onClick={() => setIsEditingName(true)}
                      className="text-2xl font-bold cursor-pointer hover:text-purple-400 transition-colors bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
                    >
                      {displayName}
                    </h2>
                  )}
                </motion.div>
              </div>

              {/* Info Cards */}
              <div className="mt-8 space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                    <Mail className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-1">Email Address</p>
                    <p className="text-sm text-white truncate">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-1">Username</p>
                    <p className="text-sm text-white">
                      {user?.username || "Not set"}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-pink-500/20 group-hover:bg-pink-500/30 transition-colors">
                    <Calendar className="w-5 h-5 text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-1">Member Since</p>
                    <p className="text-sm text-white">
                      {new Date(user?.createdAt!).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Language Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-6"
              >
                <LanguageSelector />
              </motion.div>

              {/* Sign Out Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowConfirm(true)}
                className="w-full mt-6 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </motion.button>
            </motion.div>

            {/* Right Side - Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="py-8 px-6 rounded-3xl  bg-gradient-to-b from-white/3 to-white/2/0 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-yellow-500/20">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Achievements
                  </h3>
                  <p className="text-sm text-gray-400">
                    Your progress overview
                  </p>
                </div>
              </div>

              {/* Main Achievement Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/20 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-300">Tasks Completed</span>
                  <span className="text-3xl font-bold text-blue-400">
                    {completedTasks}
                  </span>
                </div>

                <div className="relative w-full h-4 bg-white/5 rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    {completionPercentage}% Complete
                  </span>
                  <span className="text-white font-medium">
                    {completedTasks}/{totalTasks}
                  </span>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-4 mb-6"
              >
                <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <Target className="w-6 h-6 text-blue-400 mb-2" />
                  <span className="text-xs text-gray-400 mb-1">Goals</span>
                  <span className="text-2xl font-bold text-white">12</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <Zap className="w-6 h-6 text-yellow-400 mb-2" />
                  <span className="text-xs text-gray-400 mb-1">Streak</span>
                  <span className="text-2xl font-bold text-white">0d</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <Award className="w-6 h-6 text-purple-400 mb-2" />
                  <span className="text-xs text-gray-400 mb-1">Badges</span>
                  <span className="text-2xl font-bold text-white">0</span>
                </div>
              </motion.div>

              {/* Recent Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h4 className="text-sm font-semibold text-gray-400 mb-3">
                  Recent Milestones
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <Trophy className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">
                        First 10 Tasks
                      </p>
                      <p className="text-xs text-gray-400">
                        Completed 2 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Zap className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">
                        7 Day Streak
                      </p>
                      <p className="text-xs text-gray-400">Achieved today</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Award className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">
                        Early Adopter
                      </p>
                      <p className="text-xs text-gray-400">Joined this month</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </ClerkLoaded>

      {/* Image Edit Modal */}
      <AnimatePresence>
        {isEditingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4"
          >
            <button
              className="text-black p-3 bg-white rounded-2xl text-center absolute top-20 left-20"
              onClick={() => setIsEditingImage(false)}
            >
              <X size={50} />
            </button>
            <UserProfile
              appearance={{
                baseTheme: dark,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-6 rounded-2xl border border-white/10 w-full max-w-sm"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-red-500/20">
                  <LogOut className="w-8 h-8 text-red-400" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-center text-white">
                Sign Out?
              </h2>
              <p className="text-sm text-gray-400 text-center mt-2">
                Are you sure you want to sign out from your account?
              </p>

              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all"
                >
                  Cancel
                </motion.button>

                <SignOutButton redirectUrl="/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-red-700 transition-all"
                  >
                    Yes, Sign Out
                  </motion.button>
                </SignOutButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
