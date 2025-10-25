"use client";
import {
  FadeLeft,
  FadeRight,
  ViewPort,
  transition,
} from "@/Animation";
import { motion } from "framer-motion";
import {
  AudioLines,
  Award,
  Bot,
  Globe,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Button from "../ui/Button";
import { useGT } from "gt-next";
import { T } from "gt-next";
import Tag from "../ui/Tag";

const Features = () => {
  const t = useGT();

  const features = [
    {
      title: t("Interactive Levels"),
      description: t(
        "Engage with dynamic levels that grow as you interact and participate more on the platform. Track your progress and unlock new achievements."
      ),
      icon: AudioLines,
      image: "/Level.png",
    },
    {
      title: t("AI Chat Bot"),
      description: t(
        "An intelligent assistant that provides instant answers, guidance, and support to enhance your learning experience 24/7."
      ),
      icon: Bot,
      image: "/Chat Ai.png",
    },
    {
      title: t("Achievement & Badges"),
      description: t(
        "Reward yourself for progress and milestones with unique badges and achievements to boost motivation and celebrate success."
      ),
      icon: Award,
      image: "/Badge.png",
    },
    {
      title: t("3D Globe Explorer"),
      description: t(
        "Rotate and explore our interactive 3D Earth to discover iconic locations, landmarks, and hidden gems around the world."
      ),
      icon: Globe,
      image: "/Places/Eiffel.avif",
    },
    {
      title: t("Real-time Chat"),
      description: t(
        "Connect with fellow learners, share insights, and collaborate on projects through our integrated chat system."
      ),
      icon: MessageSquare,
      image: "/Places/fuji.jpg",
    },
    {
      title: t("Gamification System"),
      description: t(
        "Experience learning like never before with points, leaderboards, challenges, and rewards that make education fun."
      ),
      icon: Sparkles,
      image: "/Places/grand-canyon.jpg",
    },
  ];

  return (
    <section className="relative z-20 mt-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
        <motion.div
          {...FadeLeft}
          {...ViewPort}
          {...transition}
          className="lg:w-3/5"
        >
         <Tag text={t("Features")}/>

          <h3 className="mb-4">
            <T>
              One Platform. <span className="mark">Endless</span> Exploration.
            </T>
          </h3>
          <p className="!text-lg text-white/70">
            <T>
              Learn about the Cupola and NBL like never before. Rotate the 3D
              Earth, explore iconic locations, chat with AI, and earn badges and
              certificates along your journey.
            </T>
          </p>
        </motion.div>

        <motion.div
          {...FadeRight}
          {...ViewPort}
          {...transition}
          className="hidden lg:block"
        >
          <Button text={t("View Guide")} url="/guide" className="text-xl" />
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
          >
            <div className="relative z-10 p-8 space-y-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <item.icon className="w-8 h-8 text-white/80" />
              </div>

              <h5 className="text-xl font-bold">{item.title}</h5>
              <p className="!text-base text-white/70 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-2xl bg-white/5 blur-xl" />
            </div>
          </motion.div>
        ))}
      </div>
      <Button
        text={t("View Guide")}
        url="/guide"
        className="text-xl lg:hidden mt-12 text-center mx-auto "
      />
    </section>
  );
};

export default Features;
