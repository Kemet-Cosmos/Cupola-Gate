"use client";
import { Animate, FadeUp } from "@/Animation";
import React from "react";
import { motion } from "framer-motion";
import AnimatedSun from "../ui/Planets/Sun";

const Sun = () => {
  return (
    <div className="relative w-full h-fit overflow-x-hidden">
      <motion.div
        {...FadeUp}
        {...Animate}
        transition={{
          duration: 1,
          delay: 2,
        }}
        className="absolute bottom-0 -right-[600px] -z-10"
      >
        <AnimatedSun />
      </motion.div>
         
    </div>
  );
};

export default Sun;
