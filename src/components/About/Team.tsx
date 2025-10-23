"use client";
import { motion } from "framer-motion";
import React from "react";
import { GlareCard } from "../ui/GlareCard";
import { AnimatedImage } from "../ui/Media_UI/AnimatedImage";
import { T } from "gt-next";
import { Animate, FadeLeft, FadeUp, opacity, transition } from "@/Animation";

const Team = () => {
  const Members = [
    {
      name: "Ibrahim wael",
      role: "Full Stack Developer & Video Editor",
      img: "/Team/Apolo.jpg",
    },
    {
      name: "Belal Mostafa",
      role: "Research & Presentation",
      img: "/Team/Bolbol.jpg",
    },
    {
      name: "Salma Osama",
      role: "UI/UX Designer & Video Editor",
      img: "/Team/Salma.jpg",
    },
    {
      name: "Malak Abdelrahman",
      role: "Research & Presentation",
      img: "/Team/Malak.jpg",
    },
  ];
  return (
    <section className="my-20">
      <motion.h1
        {...FadeLeft}
        {...Animate}
        transition={{ ...transition.transition, delay: 0 }}
      >
        <T>
          Meet The <span className="text-indigo-600"> Team </span>
        </T>
      </motion.h1>
      <motion.p
        {...FadeLeft}
        {...Animate}
        transition={{ ...transition.transition, delay: 0.25 }}
        className="my-3"
      >
        <T>
          A group of passionate individuals dedicated to making a difference
          through technology.
        </T>
      </motion.p>
      <motion.div
        {...opacity}
        {...Animate}
        transition={{ ...transition.transition, delay: 0.25 }}
        className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-fit mx-auto gap-5 "
      >
        {Members.map((member, i) => (
          <motion.div
            key={member.name + member.role}
            {...FadeUp}
            {...Animate}
            transition={{ ...transition.transition, delay: i / 1.15 }}
          >
            <GlareCard
              className="min-h-96 text-center bg-transparent"
              children={
                <div className="p-5 flex flex-col gap-5 justify-end  items-center h-full">
                  <div>
                    <h4>{member.name}</h4>
                    <p className="!text-lg mt-2">{member.role}</p>
                  </div>
                  <AnimatedImage
                    noAnimate
                    src={member.img}
                    alt={`${member.name} Image`}
                    className="rounded-4xl w-full h-82 border border-indigo-600"
                  />
                </div>
              }
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Team;
