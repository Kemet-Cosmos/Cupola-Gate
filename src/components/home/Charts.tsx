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
    <div className="mt-24 mx-auto p-6 rounded-2xl shadow-2xl bg-gradient-to-b from-white/3 to-white/2/0  overflow-hidden w-11/12 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
        <motion.h1 {...FadeUp} {...Animate} {...transition} className="mb-4">
          <T>Hi </T> <span className="mark"> {user?.fullName} </span>
        </motion.h1>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Link href={`/profile`} className="bg-indigo-500 rounded-2xl p-2 ">
            <CircleUser size={35} />
          </Link>
        </div>{" "}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          {...FadeUp}
          {...Animate}
          transition={{ ...transition.transition, delay: 0.1 }}
          className="flex flex-col items-center justify-center p-5 rounded-xl bg-gradient-to-b from-white/10 to-white/2/0 shadow-inner cursor-default"
        >
          <Zap className="mb-3 h-10 w-10 text-blue-400" />
          <span className="text-4xl font-bold tracking-wide">{points}</span>
          <span className="text-sm uppercase tracking-wider text-gray-300">
            <T> Points Earned</T>
          </span>
        </motion.div>

        <motion.div
          {...FadeUp}
          {...Animate}
          transition={{ ...transition.transition, delay: 0.2 }}
          className="flex flex-col items-center justify-center p-5 rounded-xl bg-gradient-to-b from-white/10 to-white/2/0 shadow-inner cursor-default"
        >
          <Award className="mb-3 h-10 w-10 text-purple-400" />
          <span className="text-4xl font-bold tracking-wide">
            {TotalBadges}/{TotalAllBadges}
          </span>
          <span className="text-sm uppercase tracking-wider text-gray-300">
            <T> Badges Unlocked</T>
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
          }}
          transition={{ ...transition.transition, delay: 0.2 }}
          className="relative col-span-2 lg:col-span-1 flex flex-col items-center w-full p-5 rounded-xl bg-gradient-to-b from-white/10 to-white/2/0 shadow-inner "
        >
          <motion.div
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            transition={{ ...transition.transition, delay: 0.4 }}
            className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black/50 rounded-xl z-20 cursor-pointer"
          >
            <T>Click to explore badges</T>
          </motion.div>
          <h3 className="!text-xl font-semibold mb-4 flex items-center tracking-tight">
            <Target className="mr-2 h-6 w-6 text-green-400" />
            <T> Progress Overview</T>
          </h3>
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="stroke-current text-gray-700"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              />
              <motion.circle
                className="stroke-current text-indigo-500"
                strokeWidth="10"
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
            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
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
            transition={{ ...transition.transition, delay: 0.46 }}
            className="flex justify-between items-center gap-5 bg-gradient-to-b from-white/10 to-white/2/0 p-10 rounded-2xl"
          >
            <h4>
              <T>
                Get Your <span className="mark"> Certificate </span>
              </T>
            </h4>
            <Button text={t("Okay im Ready")} url="/certificate" />
          </motion.div>
        )}
      </AnimatePresence>
      <div>
        <motion.h2
          {...FadeUp}
          {...Animate}
          transition={{ ...transition.transition, delay: 0.6 }}
          className="text-2xl font-bold mb-6"
        >
          <T>Levels</T>{" "}
          <span className="mark text-lg">
            {allLevelsCompleted ? t("( All Completed )") : ""}
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2   gap-6">
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
              }}
              transition={{ ...transition.transition, delay: 0.9 }}
              className="relative min-h-60 rounded-2xl flex flex-col justify-center items-center gap-3 border border-white/45 text-center p-5 bg-gradient-to-b from-white/3 to-white/2/0 overflow-hidden"
            >
              <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black/60 cursor-pointer text-2xl font-bold "
              >
                <T>Click To Replay </T>
              </motion.div>
              <h2>{currentLevelData?.title}</h2>
              <p>{currentLevelData?.desc}</p>
              <span className="absolute top-2 left-2 bg-indigo-500 p-2 rounded-2xl ">
                {t("Current Level")}
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
              }}
              transition={{ ...transition.transition, delay: 1.1 }}
              className="relative min-h-60 rounded-2xl flex flex-col justify-center items-center gap-3 border border-indigo-500 text-center p-5 bg-gradient-to-b from-white/3 to-white/2/0 overflow-hidden"
            >
              <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black/60 cursor-pointer text-2xl font-bold "
              >
                <T>Click when You ready </T>
              </motion.div>

              <h2>{nextLevelData?.title}</h2>
              <p>{nextLevelData?.desc}</p>
              <span className="absolute top-2 left-2 bg-indigo-500 p-2 rounded-2xl ">
                {t("Next Level")}
              </span>
            </MotionLink>
          ) : (
            <motion.div
              {...FadeUp}
              {...Animate}
              transition={{ ...transition.transition, delay: 1.1 }}
              className="rounded-2xl border border-white/45 bg-indigo-500/70 flex flex-col justify-center items-center min-h-60"
            >
              <T>
                <h5>Its the End of your journey</h5>
                <p> Finish Your Exams to get Certificate </p>
              </T>
            </motion.div>
          )}
        </div>
        <motion.div
          {...FadeUp}
          {...Animate}
          transition={{ ...transition.transition, delay: 1.3 }}
          className="flex justify-center items-center my-4"
        >
          <Button text={t("See All Levels")} url="/levels" />
        </motion.div>
      </div>
      <div>
        <motion.h2
          {...FadeUp}
          {...Animate}
          transition={{ ...transition.transition, delay: 0.6 }}
          className="text-2xl font-bold mb-6"
        >
          <T>Exams</T>
          <span className="mark text-lg">
            {" "}
            {allExamsCompleted ? t("( All Completed )") : ""}
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2   gap-6">
          {currentLevelExamData?.id != 1 && (
            <MotionLink
              href={`/levels/Level_${currentLevelExamData?.id! - 1}/Exam`}
              initial="rest"
              animate="animate"
              whileHover="hover"
              variants={{
                rest: { ...FadeUp.initial },
                animate: { ...Animate.animate },
              }}
              transition={{ ...transition.transition, delay: 0.9 }}
              className="relative min-h-60 rounded-2xl flex flex-col justify-center items-center gap-3 border border-white/45 text-center p-5 bg-gradient-to-b from-white/3 to-white/2/0 overflow-hidden"
            >
              <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black/60 cursor-pointer text-2xl font-bold "
              >
                <T>Click To Replay </T>
              </motion.div>
              <h2>
                <T>Exam</T>
                {currentLevelExamData?.id! - 1}
              </h2>
              <p>{currentLevelExamData?.desc}</p>
              <span className="absolute top-2 left-2 bg-indigo-500 p-2 rounded-2xl ">
                {t("Completed Exam")}
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
              }}
              transition={{ ...transition.transition, delay: 1.1 }}
              className="relative min-h-60 rounded-2xl flex flex-col justify-center items-center gap-3 border border-indigo-500 text-center p-5 bg-gradient-to-b from-white/3 to-white/2/0 overflow-hidden"
            >
              <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black/60 cursor-pointer text-2xl font-bold "
              >
                <T>Click when You ready </T>
              </motion.div>

              <h2>
                {" "}
                <T>Exam</T>
                {nextLevelExamData?.id! - 1}
              </h2>
              <p>{nextLevelExamData?.desc}</p>
              <span className="absolute top-2 left-2 bg-indigo-500 p-2 rounded-2xl ">
                {t("Next Exam")}
              </span>
            </MotionLink>
          ) : (
            <motion.div
              {...FadeUp}
              {...Animate}
              transition={{ ...transition.transition, delay: 1.1 }}
              className="rounded-2xl border border-white/45 bg-indigo-500/70 flex flex-col justify-center items-center min-h-60"
            >
              <h5>Its the End of your journey</h5>
              <p> Finish Your Exams to get Certificate </p>
            </motion.div>
          )}
        </div>
        {/* <motion.div
          {...FadeUp}
          {...Animate}
          transition={{ ...transition.transition, delay: 1.3 }}
          className="flex justify-center items-center my-4"
        >
          <Button text={t("See All Exams")} url="/exams" />
        </motion.div> */}
      </div>

      <div className="mt-20 flex flex-col justify-center items-center">
        <motion.h1 {...ViewPort} {...FadeUp}>
          <T>Try Those Too</T>
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-fit gap-5 my-10">
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
                hover: { y: -5 },
              }}
              className={`relative w-full max-w-xl h-[200px] border p-5 overflow-hidden flex items-center justify-between gap-4 bg-gradient-to-b from-white/3 to-white/2/0 rounded-2xl shadow-xl  ${
                hasBadge(item.badgeTitle)
                  ? "border border-green-500"
                  : "border-neutral-400/20"
              } `}
            >
              {hasBadge(item.badgeTitle) && (
                <motion.div
                  {...FadeLeft}
                  {...Animate}
                  className="absolute top-2 left-2 p-1.5 bg-green-600/50 z-10 rounded-2xl flex flex-col justify-center items-center"
                >
                  <T className="text-center px-4">Discoverd</T>
                </motion.div>
              )}

              <div className="w-2/4">
                <h3 className="!text-2xl">{item.title}</h3>
                <p className="!text-xl">
                  {item.description.slice(0, 60) + "...."}
                </p>
              </div>

              <AnimatedImage
                src={item.image}
                alt={item.title}
                className="w-2/4 h-full object-cover rounded-2xl"
                noAnimate
              />
            </MotionLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;
