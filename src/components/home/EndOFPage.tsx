"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeLeft, FadeRight, transition, ViewPort } from "@/Animation";
import { T } from "gt-next";
import { useUser } from "@clerk/nextjs";
import { Rocket } from "lucide-react";
import { AnimatedVideo } from "../ui/Media_UI/AnimatedVideo";

const EndOFPage = () => {
  const { user } = useUser();

  return (
    <section className="w-fit mx-auto flex flex-col lg:flex-row justify-center items-center gap-10 overflow-x-hidden">
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
        <T>
          <Link
            href={user ? "/courses" : "/register"}
            className="relative w-fit group overflow-hidden text-white text-xl py-3 px-8 rounded-2xl flex justify-center items-center gap-2 bg-gradient-to-br from-blue-800 via-blue-600 to-purple-700 duration-300 cursor-pointer select-none"
          >
            <div className="relative z-10 transition-all duration-300 ease-out group-hover:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1">
              <Rocket />
            </div>

            <div className="relative z-10 font-semibold transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0">
              Launch Rocket
            </div>

            <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl transition-all duration-300 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
              GO!
            </div>
          </Link>
        </T>
      </motion.div>
    </section>
  );
};

export default EndOFPage;
