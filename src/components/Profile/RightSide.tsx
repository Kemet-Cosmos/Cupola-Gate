"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
import Loading from "../ui/Loading";

const RightSide = () => {
  const { isSignedIn } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [points, setPoints] = useState(0);

  const totalTasks = calculateAllBadgePoints();
  const completionPercentage = Math.round((points / totalTasks) * 100);
  const TotalBadges = badges.length;
  const TotalAllBadges = getTotalBadges();
  const fetchBadges = async () => {
    try {
      const response = await fetch("/api/badge");
      const data = await response.json();
      setBadges(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching badges:", error);
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
          <h3 className="text-2xl font-bold text-white">Achievements</h3>
          <p className="text-sm text-gray-400">Your progress overview</p>
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
          <span className="text-lg text-gray-300 font-bold">Your Points </span>
          <span className="text-3xl font-bold text-blue-400">{points}</span>
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
            {points}/{totalTasks}
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
          <span className="text-xs text-gray-400 mb-1 text-center">
            ALL Badges Count
          </span>
          <span className="text-2xl font-bold text-white">
            {TotalAllBadges}
          </span>
        </div>
        <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
          <Zap className="w-6 h-6 text-yellow-400 mb-2" />
          <span className="text-xs text-gray-400 mb-1 text-center">Streak</span>
          {/* <p className="!text-xs  font-bold text-white">undefined</p> */}
        </div>
        <Link
          href="/badge"
          className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
        >
          <Award className="w-6 h-6 text-purple-400 mb-2" />
          <span className="text-xs text-gray-400 mb-1 text-center">Badges</span>
          <span className="text-2xl font-bold text-white">
            {loading ? "loading" : TotalBadges}
          </span>
        </Link>
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
        <Link href="/badge" className="space-y-2">
          {loading ? (
            <Loading />
          ) : (
            <BadgeList badges={badges.slice(0, 2)} variant="card" />
          )}
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default RightSide;
