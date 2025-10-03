"use client";
import {
  FadeLeft,
  FadeRight,
  FadeUp,
  opacity,
  transition,
  ViewPort,
} from "@/Animation";
import { motion } from "framer-motion";
import { AnimatedImage } from "../ui/AnimatedImage";

const WhyUs = () => {
  return (
    <section>
      <motion.h1
        {...FadeUp}
        {...ViewPort}
        className="px-5 py-3 rounded-2xl bg-black/45 w-fit mx-auto"
      >
        Why Us ?
      </motion.h1>

      <div className="flex flex-col justify-center items-center gap-10 mt-20">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <AnimatedImage
            src="/Learn.jpg"
            alt=""
            className="w-96 max-h-60 h-auto object-cover rounded-2xl"
          />
          <div>
            <motion.h1
              {...FadeRight}
              {...ViewPort}
              {...transition}
              className="w-full h-fit my-auto text-center md:text-start"
            >
              Competitive
            </motion.h1>
            <motion.p
              {...opacity}
              {...ViewPort}
              {...transition}
              className="text-center md:text-start"
            >
              Compete with others and push your limits to achieve more.
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-10">
          <div>
            <motion.h1
              {...FadeLeft}
              {...ViewPort}
              className="w-full h-fit my-auto text-center md:text-start"
            >
              Having Fun
            </motion.h1>
            <motion.p
              {...opacity}
              {...ViewPort}
              {...transition}
              className="text-center md:text-start"
            >
              Enjoy learning while having fun with interactive challenges.
            </motion.p>
          </div>
          <AnimatedImage
            src="/Fun.jpg"
            alt=""
            className="w-96 max-h-60 h-auto object-cover rounded-2xl"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <AnimatedImage
            src="/Competitive.jpg"
            alt=""
            className="w-96 max-h-60 h-auto object-cover rounded-2xl"
          />
          <div>
            <motion.h1
              {...FadeRight}
              {...ViewPort}
              {...transition}
              className="w-full h-fit my-auto text-center md:text-start"
            >
              Community
            </motion.h1>
            <motion.p
              {...opacity}
              {...ViewPort}
              {...transition}
              className="text-center md:text-start"
            >
              Connect with like-minded people and grow together.
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-10">
          <div>
            <motion.h1
              {...FadeLeft}
              {...ViewPort}
              className="w-full h-fit my-auto text-center md:text-start"
            >
              Learn
            </motion.h1>
            <motion.p
              {...opacity}
              {...ViewPort}
              {...transition}
              className="text-center md:text-start"
            >
              Gain valuable knowledge and develop new skills step by step.
            </motion.p>
          </div>
          <AnimatedImage
            src="/Community.jpg"
            alt=""
            className="w-96 max-h-60 h-auto object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
