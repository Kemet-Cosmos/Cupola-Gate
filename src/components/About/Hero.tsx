"use client";
import React from "react";
import { AnimatedImage } from "../ui/Media_UI/AnimatedImage";
import { motion } from "framer-motion";
import { Animate, FadeLeft, FadeRight } from "@/Animation";
import Moon from "../ui/Planets/Moon";
import Earth from "../ui/Planets/Earth";
import { T } from "gt-next";
const Hero = () => {
  return (
    <section className=" relative overflow-hidden flex flex-col lg:flex-row justify-center items-center gap-10">
      <div className="absolute bottom-10 -left-32 md:left-10 -z-10">
        <Moon />
      </div>
      <div className="absolute -top-[500px] -right-[700px] md:-right-[500px] md:-top-[350px] -z-10">
        <Earth />
      </div>
      <div className="text-center lg:text-start">
        <motion.h1 {...FadeLeft} {...Animate}>
          <T>
            About <span className="text-blue-500">Us</span>
          </T>
        </motion.h1>
        <motion.p
          {...FadeLeft}
          {...Animate}
          className="max-w-xl mx-auto lg:mx-0 mt-4"
        >
          <T>
            We believe in building a strong, collaborative community that
            inspires learning, sharing, and creating meaningful impact together.
          </T>
        </motion.p>
      </div>

      <motion.div
        {...FadeRight}
        {...Animate}
        className="  flex justify-center lg:justify-end"
      >
        <AnimatedImage
          src="/Community.jpg"
          alt="Community gathering"
          className="rounded-3xl max-w-xl w-full object-cover"
          noAnimate
        />
      </motion.div>
    </section>
  );
};

export default Hero;
