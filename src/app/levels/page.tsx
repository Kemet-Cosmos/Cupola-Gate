"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { T } from "gt-next";
import { useGT } from "gt-next";

export default function Page() {
  const router = useRouter();
  const t = useGT();
  const levels = [
    { id: 0, title: t("Level 0"), desc: t("Introduction & basic concepts") },
    {
      id: 1,
      title: t("Level 1"),
      desc: t("Learn about the Cupola and its role"),
    },
    { id: 2, title: t("Level 2"), desc: t("Natural disaster observation") },
    {
      id: 3,
      title: t("Level 3"),
      desc: t("Working with astronauts and cameras"),
    },
    { id: 4, title: t("Level 4"), desc: t("Final mission challenge!") },
  ];
  const handleStart = (id: number) => {
    router.push(`/levels/level${id}`);
  };

  return (
    <section className="mt-20 flex flex-col items-center justify-center text-white px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-10 text-center"
      >
        <T> Choose Your Level</T>
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
        {levels.map((lvl, index) => (
          <motion.div
            key={lvl.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="   bg-gradient-to-b from-white/3 to-white/2/0 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform"
          >
            <h2 className="text-2xl font-semibold mb-3">{lvl.title}</h2>
            <p className="text-sm text-gray-300 mb-6">{lvl.desc}</p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleStart(lvl.id)}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-medium shadow-lg"
            >
              <T>Start</T>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
