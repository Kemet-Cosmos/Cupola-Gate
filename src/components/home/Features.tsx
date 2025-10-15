"use client";
import { FadeLeft, opacity, ViewPort } from "@/Animation";
import { motion } from "framer-motion";
import { AudioLines, Award, Bot } from "lucide-react";
import { AnimatedImage } from "../ui/Media_UI/AnimatedImage";
import { transition } from "@/Animation";
const Features = () => {
  const features = [
    {
      title: "EnterActive Levels",
      description:
        "Engage users with dynamic levels that grow as they interact and participate more on the platform.",
      icon: AudioLines,
      image: "/Level.png",
    },
    {
      title: "AI Chat Bot",
      description:
        "An intelligent assistant that provides instant answers, guidance, and support to enhance user experience.",
      icon: Bot,
      image: "/Chat Ai.png",
    },
    {
      title: "Achievement & Badges",
      description:
        "Reward users for their progress and milestones with unique badges and achievements to boost motivation.",
      icon: Award,
      image: "/Badge.png",
    },
  ];
  return (
    <section className="">
      <motion.h2 {...FadeLeft} {...ViewPort} {...transition} className="mb-3">
        One PlatForm. To learn
      </motion.h2>
      <motion.p {...FadeLeft} {...ViewPort} {...transition} className="mb-10">
        Click through to see how Planquo adapts to each layer of your team’s
        productivity.
      </motion.p>
      <motion.div
        {...opacity}
        {...ViewPort}
        {...transition}
        className="grid md:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-blue-600/40"
      >
        {features.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col justify-between   w-full  border border-blue-600/40  ${
              i === features.length - 1
                ? "md:col-span-2 lg:col-span-1 "
                : "col-span-1"
            }`}
          >
            <div className="p-8 space-y-4">
              <item.icon className="w-14 h-14 p-4 border border-blue-700 bg-blue-600/40 rounded-full text-white" />
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
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
