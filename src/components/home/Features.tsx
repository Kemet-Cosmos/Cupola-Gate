"use client";
import { FadeLeft, FadeRight, opacity, ViewPort } from "@/Animation";
import { motion } from "framer-motion";
import { AudioLines, Award, Bot } from "lucide-react";
import { AnimatedImage } from "../ui/Media_UI/AnimatedImage";
import { transition } from "@/Animation";
import Button from "../ui/Button";
import { useGT } from "gt-next";
import { T } from "gt-next";

const Features = () => {
  const t = useGT();
  const features = [
    {
      title: t("EnterActive Levels"),
      description: t(
        "Engage users with dynamic levels that grow as they interact and participate more on the platform."
      ),
      icon: AudioLines,
      image: "/Level.png",
    },
    {
      title: t("AI Chat Bot"),
      description: t(
        "An intelligent assistant that provides instant answers, guidance, and support to enhance user experience."
      ),
      icon: Bot,
      image: "/Chat Ai.png",
    },
    {
      title: t("Achievement & Badges"),
      description: t(
        "Reward users for their progress and milestones with unique badges and achievements to boost motivation."
      ),
      icon: Award,
      image: "/Badge.png",
    },
  ];

  return (
    <section className=" z-20">
      <div className="flex justify-between items-center w-full">
        <div className="md:w-3/5">
          <motion.h3
            {...FadeLeft}
            {...ViewPort}
            {...transition}
            className="mb-3"
          >
            <T>
              One Platform. <span className="mark"> Endless </span> Exploration.
            </T>
          </motion.h3>
          <motion.p
            {...FadeLeft}
            {...ViewPort}
            {...transition}
            className="!text-lg mb-10"
          >
            <T>
              Learn about the Cupola and NBL like never before. Rotate the 3D
              Earth, explore iconic locations, chat with AI, and earn badges and
              certificates along your journey.
            </T>
          </motion.p>
        </div>
        <motion.div
          {...FadeRight}
          {...ViewPort}
          {...transition}
          className="hidden md:inline"
        >
          <Button text="Start Now!" url="/register" className="text-xl" />
        </motion.div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-indigo-600/40">
        {features.map((item, i) => (
          <motion.div
            key={i}
            {...opacity}
            {...ViewPort}
            {...transition}
            className={`flex flex-col justify-between   w-full  border border-indigo-600/40  ${
              i === features.length - 1
                ? "md:col-span-2 lg:col-span-1 "
                : "col-span-1"
            }`}
          >
            <div className="p-8 space-y-4">
              <item.icon className="w-14 h-14 p-4 border border-indigo-700 bg-indigo-600/40 rounded-full text-white" />
              <h5>{item.title}</h5>
              <p className="!text-lg">{item.description}</p>
            </div>
            <div className="w-full flex justify-center items-center bg-gradient-to-b from-white/10 to-white/2/5 p-10">
              <AnimatedImage
                className="h-60 object-contain aspect-square  "
                src={item.image}
                alt={item.title}
                noAnimate
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
