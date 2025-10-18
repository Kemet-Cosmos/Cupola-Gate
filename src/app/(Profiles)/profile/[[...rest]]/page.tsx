"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

import { ClerkLoaded, ClerkLoading, useAuth, useUser } from "@clerk/nextjs";
import { Animate, FadeUp } from "@/Animation";
import Loading from "@/components/ui/Loading";

import RightSide from "@/components/Profile/RightSide";
import LeftSide from "@/components/Profile/LeftSide";

export default function Page() {
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      try {
        const res = await fetch("/api/user", {
          method: "POST",
        });
        const data = await res.json();
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
            <LeftSide />
            {/* Right Side - Achievements */}
            <RightSide />
          </div>
        </motion.div>
      </ClerkLoaded>
    </section>
  );
}
