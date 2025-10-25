"use client";
import { FadeUp, transition, ViewPort } from "@/Animation";
import { T } from "gt-next";
import { motion } from "framer-motion";
import { AnimatedImage } from "../ui/Media_UI/AnimatedImage";
import { BookOpen, Smile, Users, Trophy } from "lucide-react";
import { useGT } from "gt-next";
import Tag from "../ui/Tag";

const WhyUs = () => {
  const t = useGT();
  const reasons = [
    {
      icon: BookOpen,
      title: t("Learn"),
      description: t(
        "Gain valuable knowledge and develop new skills step by step."
      ),
      image: "/Learn.jpg",
      direction: "right",
    },
    {
      icon: Smile,
      title: t("Having Fun"),
      description: t(
        "Enjoy learning while having fun with interactive challenges."
      ),
      image: "/Fun.jpg",
      direction: "left",
    },
    {
      icon: Users,
      title: t("Community"),
      description: t("Connect with like-minded people and grow together."),
      image: "/Competitive.jpg",
      direction: "right",
    },
    {
      icon: Trophy,
      title: t("Competitive"),
      description: t(
        "Compete with others and push your limits to achieve more."
      ),
      image: "/Community.jpg",
      direction: "left",
    },
  ];

  return (
    <section className="relative overflow-hidden mt-20">
      {/* Header */}
      <motion.div
        {...FadeUp}
        {...ViewPort}
        {...transition}
        className="text-center mb-16"
      >
        <Tag text="Why Choose Us" />

        <h2 className="mb-4">
          <T>
            Why <span className="mark">Us</span>?
          </T>
        </h2>
        <p className="!text-lg max-w-2xl mx-auto text-white/70">
          <T>
            Discover what makes our platform unique and why thousands of
            learners choose us.
          </T>
        </p>
      </motion.div>

      {/* Reasons Grid */}
      <div className="space-y-20">
        {reasons.map((reason, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              reason.direction === "left"
                ? "md:flex-row-reverse"
                : "md:flex-row"
            } justify-center items-center gap-10 lg:gap-16`}
          >
            <motion.div
              initial={{
                opacity: 0,
                x: reason.direction === "right" ? -50 : 50,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group w-full md:w-1/2"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <AnimatedImage
                  src={reason.image}
                  alt={reason.title}
                  noAnimate
                  className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <reason.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="absolute -z-10 -inset-4 bg-white/5 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: reason.direction === "right" ? 50 : -50,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full md:w-1/2 text-center md:text-left"
            >
              <div
                className={`flex ${
                  reason.direction === "left" ? "md:flex-row-reverse" : ""
                } flex-col md:flex-row items-center md:items-start gap-4 mb-6`}
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <reason.icon className="w-8 h-8 text-white/80" />
                </div>

                <div
                  className={reason.direction === "left" ? "md:text-right" : ""}
                >
                  <h3 className="text-3xl font-bold mb-2">{reason.title}</h3>
                  <div
                    className={`h-1 w-20 bg-gradient-to-r from-white/20 to-white/5 rounded-full ${
                      reason.direction === "left" ? "md:ml-auto" : ""
                    } mx-auto md:mx-0`}
                  />
                </div>
              </div>

              <p
                className={`!text-lg text-white/70 leading-relaxed max-w-md ${
                  reason.direction === "left" ? "md:ml-auto md:text-right" : ""
                } mx-auto md:mx-0`}
              >
                {reason.description}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
