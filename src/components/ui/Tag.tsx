"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
interface TagProps {
  text: string;
  className?: string;
}
const Tag: React.FC<TagProps> = ({ text, className }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "inline-block mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-indigo-600/40",
        className
      )}
    >
      <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        {text}
      </span>
    </motion.div>
  );
};

export default Tag;
