"use client";
import { Animate, FadeUp } from "@/Animation";
import React from "react";
import { motion } from "framer-motion";
import AnimatedEarth from "../ui/Planets/Earth";

const Earth = () => {
  return (
    <div className="absolute -bottom-[670px] overflow-hidden h-[2000px] w-full">
      <motion.div
        {...FadeUp}
        {...Animate}
        transition={{
          duration: 1,
          delay: 2,
        }}
        className="absolute  bottom-0 left-1/2 -translate-x-1/2 -z-10"
      >
        <AnimatedEarth />
      </motion.div>
    </div>
  );
};

export default Earth;
