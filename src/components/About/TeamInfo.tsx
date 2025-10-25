"use client";
import { motion } from "framer-motion";
import React from "react";
import { AnimatedImage } from "../ui/Media_UI/AnimatedImage";
import { T } from "gt-next";
import { FadeUp, ViewPort, transition } from "@/Animation";
import {
  Code,
  Search,
  Palette,
  Presentation,
  CheckCircle2,
} from "lucide-react";
import Tag from "../ui/Tag";
import { useGT } from "gt-next";

const TeamInfo = () => {
  const t = useGT();
  const teamMembers = [
    {
      name: "Ibrahim Wael",
      role: t("Full Stack Developer & Video Editor & Ui/UX"),
      img: "/Team/Apolo.jpg",
      contributions: [
        {
          text: t("Developed the complete frontend and backend of the website"),
          icon: Code,
        },
        { text: t("Designed 75% of the UI/UX interface"), icon: Palette },
        {
          text: t("Created and edited multiple video content"),
          icon: CheckCircle2,
        },
      ],
      gradient: "from-blue-600/20 to-cyan-500/20",
    },
    {
      name: "Belal Mostafa",
      role: t("Research Specialist"),
      img: "/Team/Bolbol.jpg",
      contributions: [
        {
          text: t("Conducted comprehensive research on Cupola module"),
          icon: Search,
        },
        {
          text: t(
            "Researched detailed information about NBL (Neutral Buoyancy Laboratory)"
          ),
          icon: Search,
        },
        {
          text: t("Created accurate simulations for educational content"),
          icon: CheckCircle2,
        },
      ],
      gradient: "from-red-500/20 to-pink-500/20",
    },
    {
      name: "Salma Osama",
      role: t("UI/UX Designer & Video Editor"),
      img: "/Team/Salma.jpg",
      contributions: [
        {
          text: t("Contributed to website design and user interface"),
          icon: Palette,
        },
        {
          text: t("Edited all educational level videos professionally"),
          icon: CheckCircle2,
        },
        {
          text: t("Designed the first version of completion certificates"),
          icon: Palette,
        },
      ],
      gradient: "from-pink-500/20 to-rose-500/20",
    },
    {
      name: "Malak Abdelrahman",
      role: t("Research & Presentation Lead"),
      img: "/Team/Malak.jpg",
      contributions: [
        {
          text: t("Contributed to research and content development"),
          icon: Search,
        },
        {
          text: t("Created professional presentation materials"),
          icon: Presentation,
        },
        {
          text: t("Designed the second version of completion certificates"),
          icon: Palette,
        },
        {
          text: t("Most active and engaged team member throughout the project"),
          icon: CheckCircle2,
        },
      ],
      gradient: "from-indigo-500/20 to-blue-500/20",
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
        <Tag text={t("TEAM CONTRIBUTIONS")} />

        <h2 className="mb-4">
          <T>
            What Each Member <span className="mark">Contributed</span>
          </T>
        </h2>
        <p className="!text-lg max-w-3xl mx-auto text-white/70">
          <T>
            Discover the unique skills and dedication each team member brought
            to make this project a success.
          </T>
        </p>
      </motion.div>
      <div className="space-y-16 max-w-7xl mx-auto">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`flex flex-col ${
              i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } gap-8 lg:gap-12 items-center`}
          >
            <div className="w-full lg:w-2/5">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <AnimatedImage
                    noAnimate
                    src={member.img}
                    alt={member.name}
                    className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />

                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="backdrop-blur-md bg-black/50 rounded-xl p-4 border border-white/10">
                      <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                      <p className="!text-sm text-white/70">{member.role}</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${member.gradient} rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10`}
                />
              </div>
            </div>

            <div className="w-full lg:w-3/5">
              <div className="space-y-4">
                <div className="mb-6">
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      i % 2 === 0 ? "lg:text-left" : "lg:text-right"
                    }`}
                  >
                    <T>Key Contributions</T>
                  </h3>
                  <div
                    className={`h-1 w-24 bg-gradient-to-r ${member.gradient.replace(
                      "/20",
                      ""
                    )} rounded-full ${
                      i % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"
                    }`}
                  />
                </div>

                {member.contributions.map((contribution, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="group relative overflow-hidden"
                  >
                    <div
                      className={`flex items-start gap-4 p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 ${
                        i % 2 === 0 ? "" : "lg:flex-row-reverse lg:text-right"
                      }`}
                    >
                      <div
                        className={`shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${member.gradient.replace(
                          "/20",
                          "/40"
                        )} border border-white/10 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                      >
                        <contribution.icon className="w-6 h-6 text-white" />
                      </div>

                      <p className="!text-base text-white/80 leading-relaxed flex-1">
                        {contribution.text}
                      </p>
                    </div>

                    <div
                      className={`absolute ${
                        i % 2 === 0 ? "left-0" : "right-0"
                      } top-0 bottom-0 w-1 bg-gradient-to-b ${member.gradient.replace(
                        "/20",
                        ""
                      )} rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300  `}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Backgrounds */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-1/4 -left-32 w-72 h-72 bg-white/5 rounded-full blur-3xl -z-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-1/4 -right-32 w-72 h-72 bg-white/5 rounded-full blur-3xl -z-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl -z-10"
      />
    </section>
  );
};

export default TeamInfo;
