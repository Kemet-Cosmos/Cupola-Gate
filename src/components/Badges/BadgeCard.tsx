"use client";

import { motion } from "framer-motion";
import { useTranslatedBadgeConfig } from "@/config/TranslateBadge";

interface BadgeCardProps {
  title: string;
  variant?: "card" | "inline" | "large";
  onClick?: () => void;
}

export default function BadgeCard({
  title,
  variant = "card",
  onClick,
}: BadgeCardProps) {
  const config = useTranslatedBadgeConfig(title);
  const Icon = config.icon;

  if (variant === "inline") {
    return (
      <motion.span
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
          onClick ? "cursor-pointer" : "cursor-default"
        }`}
        style={{
          backgroundColor: config.bgColor,
          borderColor: config.borderColor,
          color: config.color,
        }}
      >
        <Icon size={14} strokeWidth={2.5} />
        <span>{config.title}</span>
      </motion.span>
    );
  }

  if (variant === "large") {
    return (
      <motion.div
        onClick={onClick}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={`relative p-6 rounded-xl text-center ${
          onClick ? "cursor-pointer" : "cursor-default"
        }`}
        style={{
          backgroundColor: config.bgColor,
          borderColor: config.borderColor,
          borderWidth: "2px",
        }}
      >
        <motion.div
          className="mb-3 flex justify-center"
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon size={56} color={config.color} strokeWidth={1.5} />
        </motion.div>
        <h3
          className="m-0 font-bold !text-lg tracking-tight"
          style={{ color: config.color }}
        >
          {config.title}
        </h3>
        <p
          className="m-0 mt-2 !text-sm   opacity-85"
          style={{ color: config.color }}
        >
          {config.description}
        </p>
        <p
          className="absolute top-2 right-2  !text-xs   opacity-85"
          style={{ color: config.color }}
        >
          {config.points} Points
        </p>
        <p
          className="absolute top-2 left-2  !text-sm !font-bold opacity-85"
          style={{ color: config.color }}
        >
          {config.rarity} 
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 rounded-lg border transition-shadow ${
        onClick ? "cursor-pointer" : "cursor-default"
      }`}
      style={{
        backgroundColor: config.bgColor,
        borderColor: config.borderColor,
      }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="flex-shrink-0"
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon size={40} color={config.color} strokeWidth={1.5} />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h5
            className="m-0 font-bold !text-base"
            style={{ color: config.color }}
          >
            {config.title}
          </h5>
          <p className="m-0 mt-1 !text-xs font-medium text-gray-400 line-clamp-2">
            {config.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}