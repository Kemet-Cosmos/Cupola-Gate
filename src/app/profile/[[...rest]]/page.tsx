"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ClerkLoaded,
  ClerkLoading,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import { Animate, FadeUp } from "@/Animation";
import Loading from "@/components/ui/Loading";
import LanguageSelector from "@/components/LanguageSelector";

export default function Page() {
  const { user, isLoaded } = useUser();
  const [showConfirm, setShowConfirm] = useState(false);

  if (!user)
    return (
      <section className="flex justify-center items-center">
        <Loading />
      </section>
    );
  return (
    <section className="flex flex-col justify-center items-center mt-16 lg:mt-10">
      <ClerkLoading>
        <Loading />
      </ClerkLoading>

      <ClerkLoaded>
        <motion.div
          {...FadeUp}
          {...Animate}
          transition={{ duration: 0.6 }}
          className="py-4 px-8 rounded-2xl bg-black/70 flex flex-col gap-5"
        >
          <img
            src={user?.imageUrl}
            alt="User avatar"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <h2 className="text-xl font-semibold">{user?.fullName}</h2>
            <p className="text-gray-500">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
          <div className="mt-6 space-y-2">
            <p>
              <span className="font-medium">Username:</span> {user?.username}
            </p>
            <p>
              <span className="font-medium">Created:</span>{" "}
              {new Date(user?.createdAt!).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="mt-6 px-6 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            Sign Out
          </button>
          <LanguageSelector />
        </motion.div>
      </ClerkLoaded>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold">Are you sure?</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              You will be signed out from your account.
            </p>

            <div className="flex justify-between gap-4 mt-6">
              {/* إلغاء */}
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>

              {/* Sign Out الفعلي */}
              <SignOutButton redirectUrl="/login">
                <button className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                  Yes, Sign Out
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
