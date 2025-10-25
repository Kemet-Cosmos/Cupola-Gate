"use client";
import { motion } from "framer-motion";
import React from "react";
import { AnimatedImage } from "../ui/Media_UI/AnimatedImage";
import { T } from "gt-next";
import { FadeUp, ViewPort, transition } from "@/Animation";
import { Linkedin, Mail } from "lucide-react";
import Tag from "../ui/Tag";
import { useGT } from "gt-next";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";

const Team = () => {
  const t = useGT();
  const pathname = usePathname();

  const Members = [
    {
      name: "Ibrahim Wael",
      role: "Full Stack Developer & Video Editor & Ui/UX",
      img: "/Team/Apolo.jpg",
    },
    {
      name: "Belal Mostafa",
      role: "Research",
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
    <section className="relative my-20 overflow-hidden">
      <motion.div
        {...FadeUp}
        {...ViewPort}
        {...transition}
        className="text-center mb-16"
      >
        <Tag text={t("Our Team")} />

        <h2 className="mb-4">
          <T>
            Meet The <span className="mark">Team</span>
          </T>
        </h2>
        <p className="!text-lg max-w-2xl mx-auto text-white/70">
          <T>
            A group of passionate individuals dedicated to making a difference
            through technology.
          </T>
        </p>
      </motion.div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {Members.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
              <div className="relative overflow-hidden aspect-[3/4]">
                <AnimatedImage
                  noAnimate
                  src={member.img}
                  alt={`${member.name} Image`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h4 className="text-xl font-bold mb-2 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                  {member.name}
                </h4>
                <p className="!text-sm text-white/70 mb-4">{member.role}</p>

                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <button className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 flex items-center justify-center transition-all duration-200">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 flex items-center justify-center transition-all duration-200">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="absolute -inset-1 bg-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </motion.div>
        ))}
      </div>

      {pathname != "/team" && (
        <motion.div
          {...FadeUp}
          {...ViewPort}
          {...transition}
          className="mt-5 flex justify-center mb-20"
        >
          <Button text={t("More Information")} url="/team" />
        </motion.div>
      )}
    </section>
  );
};

export default Team;
