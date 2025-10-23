"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "@/lib/type";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { T } from "gt-next";
import { useGT } from "gt-next";
import Link from "next/link";
import Loading from "@/components/ui/Loading";
import { useRouter } from "next/navigation";
import Sun from "@/components/ui/Planets/Sun";
import Earth from "@/components/ui/Planets/Earth";
import { Animate, FadeLeft, FadeRight } from "@/Animation";
import { AnimatedImage } from "@/components/ui/Media_UI/AnimatedImage";
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
      const response = await fetch("/api/badge");
      const data = await response.json();
      setBadges(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching badges:", error);
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

  if (loading || !FirstBadge())
    return (
      <section className="flex justify-center items-center">
        <Loading />
      </section>
    );
  return (
    <section className="relative !pt-24 lg:!pt-20 flex flex-col items-center justify-center text-white px-6 py-12 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-10 text-center"
      >
        <T> Choose Your Level</T>
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2  gap-8  ">
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
              whileHover={{ y: -5, transition: { duration: 0.1 } }}
              animate={{ opacity: !isUnlocked ? 0.4 : 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                w-full max-w-xl lg:max-w-2xl lg:w-[500px] bg-gradient-to-b from-white/3 to-white/2/0 rounded-2xl shadow-xl p-6 flex gap-5 items-center text-start 
               ${!isUnlocked && "cursor-not-allowed"}
            `}
            >
              <AnimatedImage
                src={lvl.image}
                alt={lvl.title}
                className="rounded-2xl w-3/5"
              />
              <div className="w-2/5">
                <h2 className="!text-3xl font-semibold mb-3">{lvl.title}</h2>
                <p className="!text-lg text-gray-300 mb-6">
                  {!isUnlocked
                    ? `Complete Level ${lvl.id - 2} to unlock this level`
                    : lvl.desc}
                </p>
                <motion.button
                  whileTap={{ scale: isUnlocked ? 0.9 : 1 }}
                  disabled={!isUnlocked}
                  className={`px-5 py-2 rounded-xl bg-indigo-600 ${
                    isUnlocked
                      ? "hover:bg-indigo-500 shadow-lg"
                      : "bg-gray-500 cursor-not-allowed"
                  } transition font-medium`}
                >
                  <T>Start</T>
                </motion.button>
              </div>
            </MotionLink>
          );
        })}
      </div>

      {/* <div className="mt-20 flex flex-col justify-center items-center">
        <motion.h1 {...ViewPort} {...FadeUp}>
          Try Those Too
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 w-fit gap-5 my-10">
          {[
            {
              title: "NBL",
              link: "/levels/NBL",
              image: "/NBL.jpg",
              description: "try to achieve perfect balance!",
            },
            {
              title: "Chat Bot",
              link: "/Chat",
              image: "/Chat.png",
              description: "Talk To Star",
            },
            {
              title: "Cupola",
              link: "/explore",
              image: "/Cupola.jpg",
              description: "Talk To Star",
            },
          ].map((item, i) => (
            <MotionLink
              key={i}
              href={item.link}
              {...ViewPort}
              {...FadeUp}
              {...transition}
              className="  bg-gradient-to-b from-white/3 to-white/2/0 rounded-2xl shadow-xl "
            >
              <motion.div
                key={item.title}
                variants={{ rest: { y: 0 }, hover: { y: -5 } }}
                initial="rest"
                whileHover="hover"
                transition={{ duration: 0.1 }}
              >
                <motion.div
                  {...FadeUp}
                  {...Animate}
                  transition={{ duration: 0.3 }}
                  className="relative w-full max-w-xl h-[450px] border border-neutral-400/20 p-5 rounded-2xl overflow-hidden flex flex-col justify-between"
                >
                  <motion.div
                    variants={{
                      rest: { width: "0px", height: "0px" },
                      hover: { width: "150%", height: "150%" },
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute -bottom-28 -right-28 bg-white/40 rounded-full "
                  />

                  <AnimatedImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-2/3 object-cover rounded-2xl"
                    noAnimate
                  />
                  <h3>{item.title}</h3>
                  <p>{item.description.slice(0, 60) + "...."}</p>
                </motion.div>
              </motion.div>
            </MotionLink>
          ))}
        </div>
      </div> */}
      {/* <motion.div
        {...Animate}
        {...FadeRight}
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
      </motion.div> */}
    </section>
  );
}
