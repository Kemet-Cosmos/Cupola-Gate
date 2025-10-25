"use client";
import { motion } from "framer-motion";
import { Animate, delay1, FadeUp, transition } from "@/Animation";
import { T } from "gt-next";
import React from "react";
import TextType from "../ui/Bite/TextType";
import { useGT } from "gt-next";
import Link from "next/link";
import Tag from "../ui/Tag";
import Button from "../ui/Button";

const Hero = () => {
  const t = useGT();
  const text1 = t("Welcome to CupolaGate");
  const text2 = t("Happy Learning!");
  const AnimatedLink = motion.create(Link);

  return (
    <section className="relative flex flex-col justify-center items-center gap-5 min-h-[70vh]">
      <Tag text={t("EXPLORE THE UNIVERSE")} />

      <motion.div
        {...Animate}
        {...FadeUp}
        {...transition}
        {...delay1}
        className="text-center max-w-4xl"
      >
        <T>
          <h1 className="hidden lg:inline">
            <TextType
              text={[text1, text2]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </h1>
          <h1 className="lg:hidden mb-4">Welcome to CupolaGate</h1>
        </T>
      </motion.div>

      <motion.p
        {...Animate}
        {...FadeUp}
        transition={{ duration: transition.transition.duration, delay: 1 }}
        className="!text-xl text-white/70 text-center max-w-2xl"
      >
        <T>Get ready for an unforgettable learning adventure.</T>
      </motion.p>
      <motion.div
        {...Animate}
        {...FadeUp}
        transition={{ duration: transition.transition.duration, delay: 1.4 }}
        className="flex justify-center"
      >
        <Button text={t("Start your journey")} url="/register" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className="flex flex-wrap justify-center items-center gap-4 mt-8"
      >
        <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10">
          <span className="text-sm text-white/70">
            <T> 50+ Locations</T>
          </span>
        </div>
        <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10">
          <span className="text-sm text-white/70">
            <T> AI-Powered Learning</T>
          </span>
        </div>
        <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10">
          <span className="text-sm text-white/70">
            <T> Earn Certificates</T>
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -t-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
