"use client";
import { motion } from "framer-motion";
import { Animate, delay1, FadeUp, transition } from "@/Animation";
import { T } from "gt-next";
import React from "react";
import AnimatedEarth from "../ui/AnimatedEarth";
import TextType from "../ui/Bite/TextType";
import { Rocket } from "lucide-react";
import { useGT } from "gt-next";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
const Hero = () => {
  const translate = useGT();
  const text1 = translate("Welcome to CupolaGate");
  const text2 = translate("Happy Learning!");
  const text3 = translate("We wish you an enjoyable time with us");
  const AnimatedLink = motion.create(Link);
  const { user } = useUser();

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col justify-center items-center gap-5 ">
      <motion.div
        {...Animate}
        {...FadeUp}
        {...transition}
        {...delay1}
        className="text-center"
      >
        <T>
          <h1 className="hidden lg:inline">
            <TextType
              text={[text1, text2, text3]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </h1>
          <h1 className="lg:hidden">Welcome to CupolaGate</h1>
        </T>
      </motion.div>
      <motion.p
        {...Animate}
        {...FadeUp}
        transition={{ duration: transition.transition.duration, delay: 1 }}
      >
        <T>Here you will get a really good trip</T>
      </motion.p>
      <T>
        <AnimatedLink
          {...Animate}
          {...FadeUp}
          transition={{ duration: transition.transition.duration, delay: 1.4 }}
          href={user ? "/courses": "/register"}
          className="relative group overflow-hidden text-white text-xl py-3 px-8 rounded-2xl flex justify-center items-center gap-2 bg-gradient-to-br from-blue-800 via-blue-600 to-purple-700 duration-300 cursor-pointer select-none"
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
        </AnimatedLink>
      </T>
    
    </section>
  );
};

export default Hero;
