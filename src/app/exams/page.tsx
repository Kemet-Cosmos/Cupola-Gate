"use client";
import React from "react";
import { AnimatedImage } from "@/components/ui/AnimatedImage";
import { motion } from "framer-motion";
import { Animate, delay1, FadeLeft, FadeUp, transition } from "@/Animation";
import AnimatedMoon from "@/components/ui/AnimatedMoon";
import { T } from "gt-next";
import { useGT } from "gt-next";
export default function page() {
  const t = useGT();

  const Exams = [
    {
      title: "Cupola",
      description: t(
        "A dome-shaped module attached to the nadir (Earth-facing) port of the Tranquility (Node 3) module [1-3]. It features seven windows (including the largest ever flown in space) and provides a 360-degree panoramic view [4, 5]. Its main functions include robotics control via the Robotic Work Station (RWS) and serving as an observation platform for spacewalks and Earth science [4, 6, 7]."
      ),
      image: "/Cupola.jpg",
      level: t("hard"),
    },
    {
      title: "NBL",
      description: t(
        "The Neutral Buoyancy Laboratory is a NASA training facility containing a large, 6.2 million gallon indoor pool [8]. It uses neutral buoyancy simulation to train astronauts for Extravehicular Activities (EVAs or spacewalks) [9, 10]. The pool holds full-sized mock-ups of ISS modules, allowing astronauts to practice procedures, assembly, and hardware verification in a simulated microgravity environment [10, 11]."
      ),
      image: "/NBL.jpg",
      level: t("hard"),
    },
  ];
  return (
    <section className="relative mt-20 w-full !min-h-fit overflow-hidden">
      <motion.h2 {...FadeUp} {...Animate} className="text-center ">
        <T>Ready to Ace Your Exam?</T>
      </motion.h2>
      <motion.p {...FadeUp} {...Animate} className="text-center mt-4">
        <T>
          Challenge yourself, test your knowledge, and prove that you’ve got
          what it takes. Let’s turn preparation into victory!
        </T>
      </motion.p>
      <div className="relative mt-10 lg:mt-20 flex flex-col lg:flex-row justify-center items-center gap-5  ">
        {Exams.map((item) => (
          <motion.div
            key={item.title}
            variants={{ rest: { y: 0 }, hover: { y: -5 } }}
            initial="rest"
            whileHover="hover"
          >
            <motion.div
              {...FadeUp}
              {...Animate}
              className="relative w-full max-w-xl h-[450px] border border-neutral-400 p-5 rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <motion.div
                variants={{
                  rest: { width: "0px", height: "0px" },
                  hover: { width: "150%", height: "150%" },
                }}
                className="absolute -bottom-28 -right-28 bg-white/40 rounded-full "
              />
              <span className="absolute top-5 right-5 z-10 bg-white text-black rounded-2xl p-3 font-bold">
                {item.level} <T>Level</T>
              </span>
              <AnimatedImage
                src={item.image}
                alt={item.title}
                className="w-full h-2/3 object-cover rounded-2xl"
                noAnimate
              />
              <h3>{item.title}</h3>
              <p>{item.description.slice(0, 60) + "...."}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <motion.div
        {...FadeLeft}
        {...Animate}
        {...transition}
        {...delay1}
        className="absolute -bottom-0 -left-20 -z-10"
      >
        <AnimatedMoon />
      </motion.div>
    </section>
  );
}
