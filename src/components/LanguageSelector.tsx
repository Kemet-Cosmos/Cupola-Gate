"use client";
import { Animate, FadeUp } from "@/Animation";
import { motion } from "framer-motion";
import { LocaleSelector } from "gt-next";
interface props {
  AnimateIt?: boolean;
  delay?: number;
  duration?: number;
}
export default function LanguageSelector({
  AnimateIt = true,
  delay = 0,
  duration = 0.4,
}: props) {
  return (
    <motion.div
      {...(AnimateIt && FadeUp)}
      {...(AnimateIt && Animate)}
      transition={{ delay: delay, duration: duration }}
      className="bg-white w-fit text-black p-2 rounded-xl"
    >
      <LocaleSelector />
    </motion.div>
  );
}
