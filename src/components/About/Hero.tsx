"use client";
import React from "react";
import { AnimatedImage } from "../ui/Media_UI/AnimatedImage";
import { motion } from "framer-motion";
import { Animate, FadeLeft, FadeRight, transition } from "@/Animation";
import { T } from "gt-next";
import Tag from "../ui/Tag";
import { useGT } from "gt-next";

const Hero = () => {
  const t = useGT();
  return (
    <section className="relative overflow-hidden flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-16 min-h-[70vh]">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        {...FadeLeft}
        {...Animate}
        {...transition}
        className="w-full lg:w-1/2 text-center lg:text-start"
      >
        <Tag text={t("About Us")} />

        <h1 className="mb-6">
          <T>
            About <span className="mark">Us</span>
          </T>
        </h1>

        <p className="!text-xl text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
          <T>
            We believe in building a strong, collaborative community that
            inspires learning, sharing, and creating meaningful impact together.
          </T>
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="px-6 py-4 rounded-xl bg-white/5 border border-white/10"
          >
            <p className="text-3xl font-bold mb-1">1000+</p>
            <p className="text-sm text-white/60">
              <T>Active Members</T>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="px-6 py-4 rounded-xl bg-white/5 border border-white/10"
          >
            <p className="text-3xl font-bold mb-1">50+</p>
            <p className="text-sm text-white/60">
              <T>Countries</T>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="px-6 py-4 rounded-xl bg-white/5 border border-white/10"
          >
            <p className="text-3xl font-bold mb-1">24/7</p>
            <p className="text-sm text-white/60">
              <T>Support</T>
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        {...FadeRight}
        {...Animate}
        {...transition}
        className="relative w-full lg:w-1/2 flex justify-center lg:justify-end group"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <AnimatedImage
            src="/Community.jpg"
            alt="Community gathering"
            className="w-full max-w-2xl h-[500px] object-cover "
            noAnimate
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="absolute -z-10 -inset-4 bg-white/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </section>
  );
};

export default Hero;
