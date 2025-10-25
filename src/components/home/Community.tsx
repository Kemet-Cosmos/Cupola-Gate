"use client";
import { motion } from "framer-motion";
import { FadeUp, ViewPort, transition } from "@/Animation";
import { Globe, Award, Users } from "lucide-react";
import { T } from "gt-next";
import { useGT } from "gt-next";
import Button from "../ui/Button";

const Community = () => {
  const t = useGT();

  const highlights = [
    {
      icon: Award,
      title: t("Certificates"),
      description: t(
        "Earn official certificates upon completing your learning journey and showcase your achievements."
      ),
      gradient: "from-purple-600 to-blue-600",
    },
    {
      icon: Globe,
      title: t("Full Translation"),
      description: t(
        "Experience the platform in your preferred language with complete translation support."
      ),
      gradient: "from-blue-600 to-indigo-600",
    },
    {
      icon: Users,
      title: t("Discord Community"),
      description: t(
        "Join our vibrant Discord community to connect, share experiences, and learn together."
      ),
      gradient: "from-indigo-600 to-purple-600",
    },
  ];

  return (
    <section className="!min-h-fit relative mt-20">
      <motion.div
        {...FadeUp}
        {...ViewPort}
        {...transition}
        className="text-center mb-12"
      >
        <h2 className="mb-4">
          <T>
            Join Our <span className="mark">Global</span> Community
          </T>
        </h2>
        <p className="!text-lg max-w-2xl mx-auto">
          <T>
            Get certified, learn in your language, and connect with learners
            worldwide.
          </T>
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {highlights.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 p-8 transition-all duration-300"
          >
            <div className="relative z-10 space-y-4">
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
              >
                <item.icon className="w-8 h-8 text-white" />
              </div>

              <h4 className="text-2xl font-bold">{item.title}</h4>
              <p className="!text-base text-white/70">{item.description}</p>
            </div>
          </motion.div>
        ))}
        <motion.div className="md:col-span-3 mt-12 text-center w-full flex justify-center items-center">
          <a
            href="https://discord.gg/HjBFtHHT56"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button text={t("Join Discord")} className="text-xl" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
