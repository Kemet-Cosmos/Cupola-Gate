"use client";
import React from "react";
import { motion } from "framer-motion";
import { FadeLeft, FadeRight, transition, ViewPort } from "@/Animation";
import { T } from "gt-next";
import { useUser } from "@clerk/nextjs";
import { AnimatedVideo } from "../ui/Media_UI/AnimatedVideo";
import Button from "../ui/Button";

const EndOFPage = () => {
  const { user } = useUser();

  return (
    <section className="!min-h-fit w-fit mx-auto flex flex-col lg:flex-row justify-center items-center gap-10 overflow-x-hidden">
      <motion.div {...FadeLeft} {...ViewPort} {...transition}>
        <AnimatedVideo
          src="/Video (2).mp4"
          loop
          muted
          autoPlay
          className="rounded-2xl w-full max-w-[500px] h-auto object-contain"
        />
      </motion.div>

      <motion.div
        {...FadeRight}
        {...ViewPort}
        {...transition}
        className="max-w-2xl space-y-5"
      >
        <h1>
          <T>Save your spot</T>
        </h1>
        <p>
          <T>
            A unique event filled with networking, workshops, seminars, and
            engaging conversations with the industry's leading experts.
          </T>
        </p>
        <Button text="Register Now!" url="/register" className="text-lg" />
      </motion.div>
    </section>
  );
};

export default EndOFPage;
