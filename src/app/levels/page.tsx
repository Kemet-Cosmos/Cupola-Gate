"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "@/lib/type";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { T } from "gt-next";
import { useGT } from "gt-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sun from "@/components/ui/Planets/Sun";
import Earth from "@/components/ui/Planets/Earth";
import { Animate, FadeLeft, FadeRight } from "@/Animation";
import { AnimatedImage } from "@/components/ui/Media_UI/AnimatedImage";
import LevelLoading from "@/components/loading/Level";
import Tag from "@/components/ui/Tag";
import axios from "axios";
const MotionLink = motion.create(Link);

export default function Page() {
  const t = useGT();
  const { isSignedIn } = useAuth();
  const route = useRouter();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const levels = [
    {
      id: 1,
      image: "/Levels/Computers.jpg",
      title: t("The Basics"),
      desc: t("Learn about the Cupola and its role"),
    },
    {
      id: 2,
      image: "/Cupola.jpg",
      title: t("Level 1"),
      desc: t("Learn about the Cupola and its role"),
    },
    {
      id: 3,
      image: "/Learn.jpg",
      title: t("Level 2"),
      desc: t("Natural disaster observation"),
    },
    {
      id: 4,
      image: "/NBL.jpg",
      title: t("Level 3"),
      desc: t("Working with astronauts and cameras"),
    },
    {
      id: 5,
      image: "/Chat.png",
      title: t("Level 4"),
      desc: t("Final mission challenge!"),
    },
  ];

  const fetchBadges = async () => {
    try {
      const { data } = await axios.get("/api/badge");
      setBadges(data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchBadges();
    }
  }, [isSignedIn]);

  const hasBadge = (levelId: number) => {
    const badgeTitle = `Level_${levelId}`;
    return badges.some((b) => b.title === badgeTitle);
  };
  const FirstBadge = () => {
    const badgeTitle = `Welcome`;
    return badges.some((b) => b.title === badgeTitle);
  };

  useEffect(() => {
    if (loading) return;
    if (FirstBadge()) return;
    route.push("/HiMessage");
  }, [loading]);

  if (loading || !FirstBadge()) return <LevelLoading />;

  return (
    <section className="relative !pt-24 lg:!pt-20 flex flex-col items-center justify-center text-white px-6 py-12 overflow-hidden min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <Tag text={t("Your Learning")} />

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <T>
            Choose Your <span className="mark">Level</span>
          </T>
        </h1>
        <p className="!text-lg text-white/70 max-w-2xl mx-auto">
          <T>
            Progress through each level to unlock new challenges and earn
            badges.
          </T>
        </p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl w-full">
        {levels.map((lvl, index) => {
          const isUnlocked = lvl.id - 1 === 0 || hasBadge(lvl.id - 2);

          return (
            <MotionLink
              href={
                isUnlocked
                  ? lvl.id === 1
                    ? `/levels/level0`
                    : `/levels/Level_${lvl.id - 1}`
                  : "#"
              }
              key={lvl.id}
              initial={{ opacity: 0, y: 30 }}
              whileHover={isUnlocked ? { y: -8, scale: 1.02 } : {}}
              animate={{
                opacity: !isUnlocked ? 0.5 : 1,
                y: 0,
              }}
              transition={{ duration: 0.3 }}
              className={`
                group relative w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl shadow-xl overflow-hidden transition-all duration-300
                ${!isUnlocked && "cursor-not-allowed"}
                ${isUnlocked && "hover:bg-white/10"}
              `}
            >
              {!isUnlocked && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-white/80">
                      <T>Complete Level</T> {lvl.id - 2} <T>to unlock</T>
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-6 p-6">
                <div className="relative w-2/5 shrink-0">
                  <AnimatedImage
                    src={lvl.image}
                    alt={lvl.title}
                    className="w-full h-full object-cover rounded-xl border border-white/10"
                  />

                  <div className="absolute top-2 left-2 w-10 h-10 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center font-bold text-lg">
                    {lvl.id - 1}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="!text-2xl md:text-3xl font-bold mb-3">
                      {lvl.title}
                    </h2>
                    <p className="!text-base text-white/70 leading-relaxed">
                      {isUnlocked
                        ? lvl.desc
                        : `Complete Level ${lvl.id - 2} to unlock this level`}
                    </p>
                  </div>

                  <motion.button
                    whileTap={{ scale: isUnlocked ? 0.95 : 1 }}
                    disabled={!isUnlocked}
                    className={`mt-4 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 w-fit ${
                      isUnlocked
                        ? "bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 text-white"
                        : "bg-white/5 border border-white/10 text-white/40 cursor-not-allowed"
                    }`}
                  >
                    <T>Start Level</T>
                    {isUnlocked && (
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    )}
                  </motion.button>
                </div>
              </div>

              {isUnlocked && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl" />
                </div>
              )}
            </MotionLink>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl -z-10"
      />

      <motion.div
        {...Animate}
        {...FadeLeft}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute -bottom-[600px] -right-[500px] -z-10"
      >
        <Sun />
      </motion.div>

      <motion.div
        {...Animate}
        {...FadeLeft}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute -top-[570px] -left-[500px] -z-10"
      >
        <Earth />
      </motion.div>
    </section>
  );
}
