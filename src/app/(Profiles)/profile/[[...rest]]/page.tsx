"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  ClerkLoaded,
  ClerkLoading,
  SignOutButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import { Animate, FadeUp } from "@/Animation";
import Loading from "@/components/ui/Loading";
import LanguageSelector from "@/components/LanguageSelector";
import { LogOut, Mail, User, Calendar, Shield } from "lucide-react";
import RightSide from "@/components/Profile/RightSide";

export default function Page() {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const syncUser = async () => {
      try {
        const res = await fetch("/api/user", {
          method: "POST",
        });
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error syncing user:", error);
      }
    };

    if (isSignedIn) {
      syncUser();
    }
  }, [isSignedIn]);

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
                  <button className="absolute inset-0 w-24 h-24 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                  <h2 className="text-2xl font-bold transition-colors bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    {user?.fullName}
                  </h2>
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
            <RightSide />
          </div>
        </motion.div>
      </ClerkLoaded>

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
