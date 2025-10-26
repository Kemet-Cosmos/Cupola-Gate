"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, CircleUser, Settings, Target, Zap } from "lucide-react";
import {
  calculateAllBadgePoints,
  calculateTotalPoints,
  getTotalBadges,
} from "@/config/badgeConfig";
import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import { Badge } from "@/lib/type";
import { Animate, FadeLeft, FadeUp, transition, ViewPort } from "@/Animation";
import { useRouter } from "next/navigation";
import { useGT } from "gt-next";
import { T } from "gt-next";
import { AnimatedImage } from "../ui/Media_UI/AnimatedImage";
import Button from "../ui/Button";
import LanguageSelector from "../LanguageSelector";
import HomeLoading from "./HomeLoading";

const MotionLink = motion.create(Link);

const Chart = () => {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const t = useGT();
  const route = useRouter();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [points, setPoints] = useState(0);

  const totalTasks = calculateAllBadgePoints();
  const completionPercentage = Math.round((points / totalTasks) * 100);
  const TotalBadges = badges.length;
  const TotalAllBadges = getTotalBadges();
  const Certificate = TotalAllBadges === TotalBadges ? true : false;
  const circumference = 2 * Math.PI * 40;

  const levels = [
    {
      id: 1,

      title: t("The Basics"),
      desc: t("Learn about the Cupola and its role"),
    },
    {
      id: 2,

      title: t("Level 1"),
      desc: t("Learn about the Cupola and its role"),
    },
    {
      id: 3,

      title: t("Level 2"),
      desc: t("Natural disaster observation"),
    },
    {
      id: 4,

      title: t("Level 3"),
      desc: t("Working with astronauts and cameras"),
    },
    {
      id: 5,

      title: t("Level 4"),
      desc: t("Final mission challenge!"),
    },
  ];

  const levelExams = badges
    .filter((b) => b.title.startsWith("Q_Level_"))
    .map((b) => parseInt(b.title.replace("Q_Level_", ""), 10))
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);
  const lastExam =
    levelExams.length > 0 ? levelExams[levelExams.length - 1] : 0;

  const currentLevelExamData = levels.find((lvl) => lvl.id === lastExam + 1);
  const nextLevelExamData = levels.find((lvl) => lvl.id === lastExam + 2);

  const allExamsCompleted = lastExam >= levels.length - 1;

  const levelBadges = badges
    .filter((b) => b.title.startsWith("Level_"))
    .map((b) => parseInt(b.title.replace("Level_", ""), 10))
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);
  const lastLevel =
    levelBadges.length > 0 ? levelBadges[levelBadges.length - 1] : 1;

  const currentLevelData =
    lastLevel <= 0
      ? levels.find((lvl) => lvl.id === 1)
      : levels.find((lvl) => lvl.id === lastLevel + 1);

  const nextLevelData =
    lastLevel <= 0
      ? levels.find((lvl) => lvl.id === 2)
      : levels.find((lvl) => lvl.id === lastLevel + 2);
  const allLevelsCompleted = lastLevel >= levels.length - 1;

  const fetchBadges = async () => {
    try {
      const response = await fetch("/api/badge");
      const data = await response.json();
      setBadges(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching badges:", error);
      setLoading(false);
    }
  };
  const hasBadge = (levelId: string) => {
    const badgeTitle = `${levelId}`;
    return badges.some((b) => b.title === badgeTitle);
  };
  const FirstBadge = () => {
    const badgeTitle = `Welcome`;
    return badges.some((b) => b.title === badgeTitle);
  };
  const FirstBadgeISAvailable = FirstBadge() ? true : false;

  useEffect(() => {
    if (loading) return;
    if (FirstBadgeISAvailable) return;
    route.push("/HiMessage");
  }, [loading, FirstBadgeISAvailable, route]);

  useEffect(() => {
    if (badges.length > 0) {
      const total = calculateTotalPoints(badges.map((b) => b.title));
      setPoints(total);
    }
  }, [badges]);

  useEffect(() => {
    if (isSignedIn) {
      fetchBadges();
    } else {
      setLoading(false);
    }
  }, [isSignedIn]);

  useEffect(() => {
    const syncUser = async () => {
      try {
        const res = await fetch("/api/user", {
          method: "POST",
        });
        if (!res.ok) {
          console.error("Failed to sync user data");
        }
      } catch (error) {
        console.error("Error syncing user:", error);
      }
    };

    if (isSignedIn) {
      syncUser();
    }
  }, [isSignedIn]);

  if (loading || !FirstBadge()) return <HomeLoading />;

  return (
    <div className="mt-24 mx-auto p-6 rounded-2xl shadow-2xl bg-white/5 border border-white/10 overflow-hidden w-11/12 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 pb-6 border-b border-white/10">
        <motion.h1
          {...FadeUp}
          {...Animate}
          {...transition}
          className="mb-4 md:mb-0"
        >
          <T>Hi </T> <span className="mark">{user?.fullName}</span>
        </motion.h1>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Link
            href={`/profile`}
            className="w-12 h-12 bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 rounded-xl flex items-center justify-center transition-all duration-300"
          >
            <CircleUser size={24} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          {...FadeUp}
          {...Animate}
          transition={{ ...transition.transition, delay: 0.1 }}
          className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg"
        >
          <div className="w-14 h-14 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-4">
            <Zap className="w-7 h-7 text-blue-400" />
          </div>
          <span className="text-4xl font-bold tracking-wide mb-2">
            {points}
          </span>
          <span className="text-sm uppercase tracking-wider text-white/60">
            <T>Points Earned</T>
          </span>
        </motion.div>

        <motion.div
          {...FadeUp}
          {...Animate}
          transition={{ ...transition.transition, delay: 0.2 }}
          className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg"
        >
          <div className="w-14 h-14 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
            <Award className="w-7 h-7 text-purple-400" />
          </div>
          <span className="text-4xl font-bold tracking-wide mb-2">
            {TotalBadges}/{TotalAllBadges}
          </span>
          <span className="text-sm uppercase tracking-wider text-white/60">
            <T>Badges Unlocked</T>
          </span>
        </motion.div>

        <MotionLink
          href="/badge"
          initial="rest"
          animate="animate"
          whileHover="hover"
          variants={{
            rest: { ...FadeUp.initial },
            animate: { ...Animate.animate },
            hover: { scale: 1.02 },
          }}
          transition={{ ...transition.transition, delay: 0.3 }}
          className="relative col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg group"
        >
          <motion.div
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col justify-center items-center bg-black/70 backdrop-blur-sm rounded-xl z-20 cursor-pointer"
          >
            <T className="text-lg font-semibold">Click to explore badges</T>
          </motion.div>
          <div className="w-14 h-14 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
            <Target className="w-7 h-7 text-green-400" />
          </div>
          <h3 className="!text-lg font-semibold mb-4 text-white/90">
            <T>Progress Overview</T>
          </h3>
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="stroke-current text-white/10"
                strokeWidth="8"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              />
              <motion.circle
                className="stroke-current text-green-400"
                strokeWidth="8"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{
                  strokeDashoffset:
                    circumference * (1 - completionPercentage / 100),
                }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
              {completionPercentage}%
            </div>
          </div>
        </MotionLink>
      </div>

      <AnimatePresence>
        {Certificate && (
          <motion.div
            {...FadeUp}
            {...Animate}
            transition={{ ...transition.transition, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-5 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 p-6 rounded-2xl mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/30 border border-green-500/50 flex items-center justify-center">
                <Award className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">
                  <T>
                    Get Your <span className="mark">Certificate</span>
                  </T>
                </h4>
                <p className="text-sm text-white/60">
                  <T>You've completed all requirements!</T>
                </p>
              </div>
            </div>
            <Button text={t("Claim Certificate")} url="/certificate" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-12">
        <motion.h2
          {...FadeUp}
          {...Animate}
          transition={{ ...transition.transition, delay: 0.6 }}
          className="text-2xl font-bold mb-6 flex items-center gap-3"
        >
          <T>Levels</T>
          {allLevelsCompleted && (
            <span className="px-3 py-1 rounded-lg bg-green-500/20 border border-green-500/30 text-sm font-semibold text-green-400">
              <T>All Completed</T>
            </span>
          )}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {currentLevelData?.id && (
            <MotionLink
              href={
                currentLevelData?.id === 1
                  ? "/levels/level0"
                  : `/levels/Level_${currentLevelData?.id! - 1}`
              }
              initial="rest"
              animate="animate"
              whileHover="hover"
              variants={{
                rest: { ...FadeUp.initial },
                animate: { ...Animate.animate },
                hover: { y: -5, scale: 1.02 },
              }}
              transition={{ ...transition.transition, delay: 0.8 }}
              className="group relative min-h-60 rounded-xl flex flex-col justify-center items-center gap-3 border border-white/20 text-center p-6 bg-white/5 hover:bg-white/10 hover:border-white/30 overflow-hidden transition-all duration-300"
            >
              <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                className="absolute inset-0 flex flex-col justify-center items-center bg-black/70 backdrop-blur-sm cursor-pointer"
              >
                <p className="text-xl font-bold">
                  <T>Click To Replay</T>
                </p>
              </motion.div>
              <h3 className="text-2xl font-bold">{currentLevelData?.title}</h3>
              <p className="text-white/70">{currentLevelData?.desc}</p>
              <span className="absolute top-3 left-3 px-3 py-1.5 bg-blue-500/80 border border-blue-500/50 rounded-lg text-sm font-semibold">
                <T>Current Level</T>
              </span>
            </MotionLink>
          )}

          {nextLevelData ? (
            <MotionLink
              href={`/levels/Level_${nextLevelData?.id! - 1}`}
              initial="rest"
              animate="animate"
              whileHover="hover"
              variants={{
                rest: { ...FadeUp.initial },
                animate: { ...Animate.animate },
                hover: { y: -5, scale: 1.02 },
              }}
              transition={{ ...transition.transition, delay: 1 }}
              className="group relative min-h-60 rounded-xl flex flex-col justify-center items-center gap-3 border border-green-500/30 text-center p-6 bg-white/5 hover:bg-white/10 hover:border-green-500/50 overflow-hidden transition-all duration-300"
            >
              <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                className="absolute inset-0 flex flex-col justify-center items-center bg-black/70 backdrop-blur-sm cursor-pointer"
              >
                <p className="text-xl font-bold">
                  <T>Click When Ready</T>
                </p>
              </motion.div>
              <h3 className="text-2xl font-bold">{nextLevelData?.title}</h3>
              <p className="text-white/70">{nextLevelData?.desc}</p>
              <span className="absolute top-3 left-3 px-3 py-1.5 bg-green-500/80 border border-green-500/50 rounded-lg text-sm font-semibold">
                <T>Next Level</T>
              </span>
            </MotionLink>
          ) : (
            <motion.div
              {...FadeUp}
              {...Animate}
              transition={{ ...transition.transition, delay: 1 }}
              className="rounded-xl border border-white/20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex flex-col justify-center items-center min-h-60 p-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h5 className="text-xl font-bold mb-2">
                <T>Journey Complete!</T>
              </h5>
              <p className="text-white/70">
                <T>Finish your exams to get certificate</T>
              </p>
            </motion.div>
          )}
        </div>

        <motion.div
          {...FadeUp}
          {...Animate}
          transition={{ ...transition.transition, delay: 1.2 }}
          className="flex justify-center"
        >
          <Button text={t("See All Levels")} url="/levels" />
        </motion.div>
      </div>

      <div className="mb-12">
        <motion.h2
          {...FadeUp}
          {...Animate}
          transition={{ ...transition.transition, delay: 0.6 }}
          className="text-2xl font-bold mb-6 flex items-center gap-3"
        >
          <T>Exams</T>
          {allExamsCompleted && (
            <span className="px-3 py-1 rounded-lg bg-green-500/20 border border-green-500/30 text-sm font-semibold text-green-400">
              <T>All Completed</T>
            </span>
          )}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentLevelExamData?.id != 1 && (
            <MotionLink
              href={`/levels/Level_${currentLevelExamData?.id! - 1}/Exam`}
              initial="rest"
              animate="animate"
              whileHover="hover"
              variants={{
                rest: { ...FadeUp.initial },
                animate: { ...Animate.animate },
                hover: { y: -5, scale: 1.02 },
              }}
              transition={{ ...transition.transition, delay: 0.8 }}
              className="group relative min-h-60 rounded-xl flex flex-col justify-center items-center gap-3 border border-white/20 text-center p-6 bg-white/5 hover:bg-white/10 hover:border-white/30 overflow-hidden transition-all duration-300"
            >
              <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                className="absolute inset-0 flex flex-col justify-center items-center bg-black/70 backdrop-blur-sm cursor-pointer"
              >
                <p className="text-xl font-bold">
                  <T>Click To Replay</T>
                </p>
              </motion.div>
              <h3 className="text-2xl font-bold">
                <T>Exam</T> {currentLevelExamData?.id! - 1}
              </h3>
              <p className="text-white/70">{currentLevelExamData?.desc}</p>
              <span className="absolute top-3 left-3 px-3 py-1.5 bg-blue-500/80 border border-blue-500/50 rounded-lg text-sm font-semibold">
                <T>Completed</T>
              </span>
            </MotionLink>
          )}

          {nextLevelExamData ? (
            <MotionLink
              href={`/levels/Level_${nextLevelExamData?.id! - 1}/Exam`}
              initial="rest"
              animate="animate"
              whileHover="hover"
              variants={{
                rest: { ...FadeUp.initial },
                animate: { ...Animate.animate },
                hover: { y: -5, scale: 1.02 },
              }}
              transition={{ ...transition.transition, delay: 1 }}
              className="group relative min-h-60 rounded-xl flex flex-col justify-center items-center gap-3 border border-green-500/30 text-center p-6 bg-white/5 hover:bg-white/10 hover:border-green-500/50 overflow-hidden transition-all duration-300"
            >
              <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                className="absolute inset-0 flex flex-col justify-center items-center bg-black/70 backdrop-blur-sm cursor-pointer"
              >
                <p className="text-xl font-bold">
                  <T>Click When Ready</T>
                </p>
              </motion.div>
              <h3 className="text-2xl font-bold">
                <T>Exam</T> {nextLevelExamData?.id! - 1}
              </h3>
              <p className="text-white/70">{nextLevelExamData?.desc}</p>
              <span className="absolute top-3 left-3 px-3 py-1.5 bg-green-500/80 border border-green-500/50 rounded-lg text-sm font-semibold">
                <T>Next Exam</T>
              </span>
            </MotionLink>
          ) : (
            <motion.div
              {...FadeUp}
              {...Animate}
              transition={{ ...transition.transition, delay: 1 }}
              className="rounded-xl border border-white/20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex flex-col justify-center items-center min-h-60 p-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h5 className="text-xl font-bold mb-2">
                <T>Journey Complete!</T>
              </h5>
              <p className="text-white/70">
                <T>Finish your exams to get certificate</T>
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-20">
        <motion.h2
          {...ViewPort}
          {...FadeUp}
          className="text-3xl font-bold text-center mb-10"
        >
          <T>Try These Too</T>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: t("NBL"),
              link: "/What_is_NBL",
              image: "/NBL.jpg",
              badgeTitle: "NBL",
              description: t("try to achieve perfect balance!"),
            },
            {
              title: t("Chat Bot"),
              link: "/Chat",
              image: "/Chat.png",
              badgeTitle: "Chat",
              description: t("Talk To Star"),
            },
            {
              title: t("Cupola"),
              link: "/explore",
              image: "/Cupola.jpg",
              badgeTitle: "GlobeExplorer",
              description: t("explore the Earth in 3D!"),
            },
          ].map((item, i) => (
            <MotionLink
              key={i}
              href={item.link}
              initial="rest"
              viewport={{ once: true }}
              whileInView="animate"
              whileHover="hover"
              variants={{
                rest: { ...FadeUp.initial },
                animate: { ...Animate.animate },
                hover: { y: -8, scale: 1.02 },
              }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-xl border p-5 bg-white/5 hover:bg-white/10 transition-all duration-300 ${
                hasBadge(item.badgeTitle)
                  ? "border-green-500/50"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {hasBadge(item.badgeTitle) && (
                <span className="absolute top-3 right-3 px-3 py-1.5 bg-green-500/80 border border-green-500/50 rounded-lg text-sm font-semibold z-10">
                  <T>Discovered</T>
                </span>
              )}

              <div className="flex gap-4 items-center">
                <AnimatedImage
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-xl border border-white/10"
                  noAnimate
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-white/70 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <svg
                  className="w-4 h-4"
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
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;
