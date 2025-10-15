"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { transition } from "@/Animation";
import Jupiter from "../ui/Planets/Jupiter";

export const FAQ = [
  {
    question: "What is the main goal of this platform?",
    answer:
      "Our platform helps learners explore and understand the Cupola and NBL through interactive lessons, 3D Earth experiences, and AI-powered guidance.",
  },
  {
    question: "How can I explore historical and scientific locations?",
    answer:
      "You can rotate the interactive 3D globe to discover real locations related to space exploration, underwater training, and historical landmarks around the world.",
  },
  {
    question: "How does the AI Chat help me?",
    answer:
      "The AI Chat Bot acts like a personal tutor — answering your questions, guiding you through the learning path, and explaining concepts related to space, the Cupola, and NBL.",
  },
  {
    question: "What are badges and how can I earn them?",
    answer:
      "Badges are rewards you earn when completing levels or Exams. Each badge represents a milestone in your learning journey.",
  },
  {
    question: "Do I get a certificate after finishing the program?",
    answer:
      "Yes! After completing all required levels, you’ll receive a personalized certificate that proves your achievement and knowledge.",
  },
  {
    question: "Can I use the platform on my phone?",
    answer:
      "Yes, the platform is fully responsive — you can explore the 3D Earth, chat with the AI, and earn badges from your mobile or desktop.",
  },
  {
    question: "Do I need an account to start learning?",
    answer:
      "Yes, creating an account unlocks progress tracking, badge rewards, saved locations, and certification.",
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <section className="relative overflow-hidden my-20">
      <h3 className="mb-3 text-center">Frequently Asked Questions</h3>
      <p className="!text-lg max-w-4xl mx-auto mb-8 text-center">
        Got questions? We’ve got answers! Check out our FAQ section to find
        answers to the most common questions about CupolaGate.
      </p>
      <div className="flex flex-col justify-center items-center gap-4">
        {FAQ.map((item, i) => (
          <div
            key={i}
            className="bg-gradient-to-b from-white/3 to-white/2/0 p-4 rounded-lg cursor-pointer w-full lg:w-4xl"
            onClick={() => toggle(i)}
          >
            <div className={`flex justify-between items-center w-full ${activeIndex === i && "text-indigo-500"} duration-100`}>
              <div className="text-xl"> {item.question}</div>
              <motion.div
                animate={{ rotate: activeIndex === i ? 180 : 90 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                <ChevronRight size={30} />
              </motion.div>
            </div>

            <motion.p
              animate={{ height: activeIndex === i ? 100 : 0 }}
              {...transition}
              className="!text-lg text-white/70 mt-2 overflow-hidden"
            >
              {item.answer}
            </motion.p>
          </div>
        ))}
      </div>

      <div className="absolute top-2/4 left-2/4 -translate-2/4 scale-50 opacity-25 -z-10">
        <Jupiter />
      </div>
    </section>
  );
};

export default FAQs;
