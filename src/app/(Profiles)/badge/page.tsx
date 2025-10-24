"use client";
import React, { useEffect, useState } from "react";
import { Badge, BadgeConfig } from "@/lib/type";
import { useAuth } from "@clerk/nextjs";
import BadgeList from "@/components/Badges/BadgeList";
import HomeLoading from "@/components/home/HomeLoading";
import { motion } from "framer-motion";
import { Animate, FadeUp, transition } from "@/Animation";
import { getMissingBadges } from "@/config/badgeConfig";
import BadgeCard from "@/components/Badges/BadgeCard";
import { GoTopScreen } from "@/Hook/GoTopScreen";


export default function Page() {
  const { isSignedIn } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [missedBadges, setMissedBadges] = useState<BadgeConfig[]>([]);

  const fetchBadges = async () => {
    try {
      const response = await fetch("/api/badge");
      const data = await response.json();
      setBadges(data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) fetchBadges();
  }, [isSignedIn]);

  useEffect(() => {
    if (badges.length > 0) {
      const missing = getMissingBadges(badges);
      setMissedBadges(missing);
    }
  }, [badges]);

  useEffect(() => {
    GoTopScreen();
  }, []);

  if (loading) return <HomeLoading />;
  return (
    <section className="mt-20 mx-auto p-4">
      <div>
        <motion.h2
          {...FadeUp}
          {...Animate}
          transition={{ ...transition.transition }}
          className="text-2xl mb-10"
        >
          Your Badges{" "}
        </motion.h2>
        {badges.length === 0 ? (
          <p>You don't have any badges yet</p>
        ) : (
          <motion.div
            {...FadeUp}
            {...Animate}
            transition={{ ...transition.transition, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4"
          >
            <BadgeList badges={badges} variant="large" />
          </motion.div>
        )}
      </div>
      <div className="mt-20">
        <motion.h2
          {...FadeUp}
          {...Animate}
          transition={{ ...transition.transition }}
          className="text-2xl mb-10"
        >
          Missing Badges
        </motion.h2>

        {missedBadges.length === 0 ? (
          <p>You've collected all available badges! 🎉</p>
        ) : (
          <motion.div
            {...FadeUp}
            {...Animate}
            transition={{ ...transition.transition, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4"
          >
            {missedBadges.map((item, i) => (
              <BadgeCard
                key={item.title + i}
                title={item.title}
                variant="large"
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
