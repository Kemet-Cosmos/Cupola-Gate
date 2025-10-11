"use client";

import { motion } from "framer-motion";
import { Badge } from "@/lib/type";
import BadgeCard from "./BadgeCard";

interface BadgeListProps {
  badges: Badge[];
  variant?: "card" | "inline" | "large";
}

export default function BadgeList({
  badges,
  variant = "card",
}: BadgeListProps) {
  const sortedBadges = [...badges].sort(
    (a, b) =>
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime()
  );

  if (sortedBadges.length <= 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-8 text-center"
      >
        <p className="text-base font-medium text-white/60">No badges found</p>
      </motion.div>
    );
  }

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  if (variant === "inline") {
    return (
      <motion.div
        className="flex flex-wrap items-center gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sortedBadges.map((badge) => (
          <motion.div
            key={badge._id}
            className="flex items-center gap-2"
            variants={itemVariants}
          >
            <BadgeCard title={badge.title} variant="inline" />
            <span className="text-xs font-medium text-white/50">
              {formatDate(badge.createdAt || new Date())}
            </span>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (variant === "large") {
    return (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sortedBadges.map((badge) => (
          <motion.div
            key={badge._id}
            variants={itemVariants}
            whileHover={{
              y: -8,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
            }}
            className="rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 cursor-pointer"
          >
            <BadgeCard title={badge.title} variant="large" />
            <motion.div
              className="px-4 py-3 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="m-0 text-xs font-medium text-white/50">
                {formatDate(badge.createdAt || new Date())}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <>
      {sortedBadges.map((badge) => (
        <motion.div
          key={badge._id}
          variants={itemVariants}
          whileHover={{
            y: -4,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
          }}
          className="rounded-lg overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 cursor-pointer"
        >
          <BadgeCard title={badge.title} />
          <motion.div
            className="px-4 py-3 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="m-0 text-sm font-medium text-white/50">
              {formatDate(badge.createdAt || new Date())}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
