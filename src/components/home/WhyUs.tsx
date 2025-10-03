"use client";
import {
  FadeLeft,
  FadeRight,
  FadeUp,
  opacity,
  transition,
  ViewPort,
} from "@/Animation";
import { T } from "gt-next";
import { motion } from "framer-motion";
import { AnimatedImage } from "../ui/Media_UI/AnimatedImage";

const WhyUs = () => {
  return (
    <section className="overflow-x-hidden">
      <motion.h1
        {...FadeUp}
        {...ViewPort}
        className="px-5 py-3 rounded-2xl bg-black/45 w-fit mx-auto"
      >
        <T> Why Us ?</T>
      </motion.h1>

      <div className="flex flex-col justify-center items-center gap-10 mt-20">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <AnimatedImage
            src="/Learn.jpg"
            alt=""
            className="w-full max-w-96 max-h-60 h-auto object-cover rounded-2xl"
          />
          <div>
            <motion.h1
              {...FadeRight}
              {...ViewPort}
              {...transition}
              className="w-full h-fit my-auto text-center md:text-start mb-4"
            >
              <T> Learn</T>
            </motion.h1>
            <motion.p
              {...opacity}
              {...ViewPort}
              {...transition}
              className="text-center md:text-start"
            >
              <T>
                Gain valuable knowledge and develop new skills step by step.
              </T>
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-10">
          <div>
            <motion.h1
              {...FadeLeft}
              {...ViewPort}
              className="w-full h-fit my-auto text-center md:text-start mb-4"
            >
              <T>Having Fun</T>
            </motion.h1>
            <motion.p
              {...opacity}
              {...ViewPort}
              {...transition}
              className="text-center md:text-start"
            >
              <T>
                Enjoy learning while having fun with interactive challenges.
              </T>
            </motion.p>
          </div>
          <AnimatedImage
            src="/Fun.jpg"
            alt=""
            className="w-full max-w-96 max-h-60 h-auto object-cover rounded-2xl"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <AnimatedImage
            src="/Competitive.jpg"
            alt=""
            className="w-full max-w-96 max-h-60 h-auto object-cover rounded-2xl"
          />
          <div>
            <motion.h1
              {...FadeRight}
              {...ViewPort}
              {...transition}
              className="w-full h-fit my-auto text-center md:text-start mb-4"
            >
              <T>Community</T>
            </motion.h1>
            <motion.p
              {...opacity}
              {...ViewPort}
              {...transition}
              className="text-center md:text-start"
            >
              <T>Connect with like-minded people and grow together.</T>
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-10">
          <div>
            <motion.h1
              {...FadeLeft}
              {...ViewPort}
              className="w-full h-fit my-auto text-center md:text-start mb-4"
            >
              <T>Competitive</T>
            </motion.h1>
            <motion.p
              {...opacity}
              {...ViewPort}
              {...transition}
              className="text-center md:text-start"
            >
              <T>Compete with others and push your limits to achieve more.</T>
            </motion.p>
          </div>
          <AnimatedImage
            src="/Community.jpg"
            alt=""
            className="w-full max-w-96 max-h-60 h-auto object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
