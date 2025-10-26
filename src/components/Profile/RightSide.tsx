"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Target, Trophy, Zap } from "lucide-react";
import {
  calculateAllBadgePoints,
  calculateTotalPoints,
  getTotalBadges,
} from "@/config/badgeConfig";
import Link from "next/link";
import BadgeList from "../Badges/BadgeList";
import { useAuth } from "@clerk/nextjs";
import { Badge } from "@/lib/type";
import { Animate, opacity, transition } from "@/Animation";
import { T } from "gt-next";
import { useGT } from "gt-next";
import axios from "axios";

const RightSide = () => {
  const { isSignedIn } = useAuth();
  const t = useGT();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [points, setPoints] = useState(0);

  const totalTasks = calculateAllBadgePoints();
  const completionPercentage = Math.round((points / totalTasks) * 100);
  const TotalBadges = badges.length;
  const TotalAllBadges = getTotalBadges();
  
  const fetchBadges = async () => {
    try {
      const { data } = await axios.get("/api/badge");
      setBadges(data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (badges.length > 0) {
      const total = calculateTotalPoints(badges.map((b) => b.title));
      setPoints(total);
    }
  }, [badges]);

  useEffect(() => {
    if (isSignedIn) {
      fetchBadges();
    }
  }, [isSignedIn]);

  return (
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
          <h3 className="!text-2xl font-bold text-white">
            <T>Achievements</T>
          </h3>
          <p className="!text-sm text-neutral-400">
            <T>Your progress overview</T>
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/20 mb-6"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.h4
              key="Loading"
              {...opacity}
              {...Animate}
              transition={{ duration: 0.6 }}
              className="text-white/50"
            >
              <T>Loading ....</T>
            </motion.h4>
          ) : (
            <motion.div
              key="Loaded"
              {...opacity}
              {...Animate}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg text-neutral-300 font-bold">
                  <T> Your Points</T>
                </span>
                <span className="text-3xl font-bold text-blue-400">
                  {points}
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
                <span className="text-neutral-400">
                  {completionPercentage}% <T>Complete</T>
                </span>
                <span className="text-white font-medium">
                  {points}/{totalTasks}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        {[
          {
            title: "Streak",
            content: 0,
            icon: Zap,
            iconColor: "text-yellow-400",
          },
          {
            title: t("ALL Badges"),
            content: TotalAllBadges,
            icon: Target,
            iconColor: "text-blue-400",
          },
          {
            title: t("Badges"),
            content: TotalBadges,
            icon: Award,
            iconColor: "text-purple-400",
            link: "/badge",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="  rounded-xl border border-white/10 hover:bg-white/10 transition-all overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  {...opacity}
                  {...Animate}
                  {...transition}
                  className="w-full h-32 bg-neutral-800/60 animate-pulse rounded-2xl flex justify-center items-center text-white/40 "
                >
                  <T>Loading ...</T>
                </motion.div>
              ) : item.link ? (
                <Link href={item.link} key="Loaded">
                  <motion.div
                    className="p-4 flex flex-col justify-center items-center bg-white/5 h-full"
                    {...opacity}
                    {...Animate}
                    {...transition}
                  >
                    <item.icon className={`w-6 h-6 ${item.iconColor} mb-2`} />
                    <span className="text-xs text-neutral-400 mb-1 text-center">
                      {item.title}
                    </span>
                    <span className="text-2xl font-bold text-white">
                      {item.content}
                    </span>
                  </motion.div>
                </Link>
              ) : (
                <motion.div
                  key="Loaded"
                  className="p-4 flex flex-col justify-center items-center bg-white/5 h-full"
                  {...opacity}
                  {...Animate}
                  {...transition}
                >
                  <item.icon className={`w-6 h-6 ${item.iconColor} mb-2`} />
                  <span className="text-xs text-neutral-400 mb-1 text-center">
                    {item.title}
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {item.content}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h4 className="!text-lg !font-semibold text-neutral-400 mb-3">
          <T>Recent Milestones</T>
        </h4>
        <Link href="/badge" className="space-y-2">
          {loading ? (
            <motion.div
              {...opacity}
              {...Animate}
              {...transition}
              className="w-full h-52 bg-neutral-800/60 animate-pulse rounded-2xl flex justify-center items-center text-white/40"
            >
              {" "}
              <T>Loading ...</T>
            </motion.div>
          ) : (
            <BadgeList badges={badges.slice(0, 2)} />
          )}
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default RightSide;
