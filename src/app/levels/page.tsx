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
      Link: 0,
      title: t("The Basics"),
      desc: t("Learn about the Cupola and its role"),
    },
    {
      id: 2,
      Link: 1,

      title: t("Level 1"),
      desc: t("Learn about the Cupola and its role"),
    },
    {
      id: 3,
      Link: 2,
      title: t("Level 2"),
      desc: t("Natural disaster observation"),
    },
    {
      id: 4,
      Link: 3,
      title: t("Level 3"),
      desc: t("Working with astronauts and cameras"),
    },
    {
      id: 5,
      Link: 4,
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
    <section className="mt-10 flex flex-col items-center justify-center text-white px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-10 text-center"
      >
        <T> Choose Your Level</T>
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
        {levels.map((lvl, index) => {
          const isUnlocked = lvl.Link === 0 || hasBadge(lvl.Link - 1);

          return (
            <MotionLink
              href={isUnlocked ? `/levels/level${lvl.Link}` : "#"}
              key={lvl.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: !isUnlocked ? 0.4 : 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                bg-gradient-to-b from-white/3 to-white/2/0 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center 
               ${!isUnlocked && "cursor-not-allowed"}
            `}
            >
              <h2 className="!text-3xl font-semibold mb-3">{lvl.title}</h2>
              <p className="!text-lg text-gray-300 mb-6">
                {!isUnlocked
                  ? `Complete Level ${lvl.id - 1} to unlock this level`
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
            </MotionLink>
          );
        })}
      </div>
    </section>
  );
}
