"use client";
import { Animate, FadeUp } from "@/Animation";
import React from "react";
import { motion } from "framer-motion";
import AnimatedEarth from "../ui/AnimatedEarth";

const Earth = () => {
  return (
    <div className="overflow-hidden">
      <motion.div
        {...FadeUp}
        {...Animate}
        transition={{
          duration: 1,
          delay: 2,
        }}
        className="absolute  -bottom-full lg:-bottom-4/5 left-1/2 -translate-x-1/2 -z-10"
      >
        <AnimatedEarth />
      </motion.div>
    </div>
  );
};

export default Earth;
