"use client";
import { motion } from "framer-motion";
import { FadeUp, FadeLeft, FadeRight, ViewPort, transition } from "@/Animation";
import { Target, Eye, Sparkles } from "lucide-react";
import { T } from "gt-next";
import { useGT } from "gt-next";
import Button from "../ui/Button";
import { AnimatedImage } from "../ui/Media_UI/AnimatedImage";
import Tag from "../ui/Tag";

const AboutUs = () => {
  const t = useGT();

  const values = [
    {
      icon: Target,
      title: t("Our Mission"),
      description: t(
        "Empowering learners worldwide to explore space science and Earth's wonders through interactive education."
      ),
    },
    {
      icon: Eye,
      title: t("Our Vision"),
      description: t(
        "Creating a global community where knowledge meets innovation and curiosity drives discovery."
      ),
    },
    {
      icon: Sparkles,
      title: t("Our Values"),
      description: t(
        "Excellence, innovation, and accessibility in every learning experience we create."
      ),
    },
  ];

  return (
    <section className="relative mt-20 overflow-hidden">
      <motion.div
        {...FadeUp}
        {...ViewPort}
        {...transition}
        className="text-center mb-16"
      >
        <Tag text={t("About Us")} />

        <h2 className="mb-4">
          <T>
            Who <span className="mark">We Are</span>
          </T>
        </h2>
        <p className="!text-lg max-w-3xl mx-auto text-white/70">
          <T>
            CupolaGate is your gateway to exploring the International Space
            Station's Cupola and the Neutral Buoyancy Laboratory through
            cutting-edge interactive technology.
          </T>
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          {...FadeLeft}
          {...ViewPort}
          {...transition}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/3 to-white/2/0 p-8">
            <AnimatedImage
              src="/Learn.jpg"
              alt="About CupolaGate"
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>
        </motion.div>

        <motion.div
          {...FadeRight}
          {...ViewPort}
          {...transition}
          className="space-y-6"
        >
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-white/3 to-white/2/0 p-6 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <value.icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                  <h5 className="mb-2 text-xl font-bold">{value.title}</h5>
                  <p className="!text-base text-white/70">
                    {value.description}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/5 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        {...FadeUp}
        {...ViewPort}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/3 to-white/2/0 p-12 text-center"
      >
        <div className="relative z-10">
          <h3 className="mb-4">
            <T>
              Ready to Learn <span className="mark">More?</span>
            </T>
          </h3>
          <p className="!text-lg mb-8 max-w-2xl mx-auto text-white/70">
            <T>
              Discover our story, meet our team, and learn how we're
              revolutionizing space education.
            </T>
          </p>

          <Button
            text={t("Learn More About Us")}
            url="/about"
            className="text-xl inline-flex items-center"
          />
        </div>

        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-full blur-3xl" />
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
