"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import { X } from "lucide-react";
import { Animate, FadeLeft, FadeUp, opacity, transition } from "@/Animation";

const SelectLanguage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("languageSelected")) {
      setIsOpen(true);
      window.document.body.style.overflow = "hidden";
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    window.document.body.style.overflow = "auto";
    localStorage.setItem("languageSelected", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...opacity}
          {...Animate}
          {...transition}
          className="fixed top-0 left-0 bg-black/40 w-full h-screen z-50 flex items-center justify-center px-5"
        >
          <motion.div
            {...FadeUp}
            {...Animate}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden max-w-2xl flex flex-col justify-center items-center border border-indigo-600 rounded-2xl bg-black p-5 lg:p-10"
          >
            <button
              onClick={handleClose}
              className="absolute top-0 right-0 text-black bg-white rounded-bl-2xl p-2 hover:bg-gray-200"
            >
              <X />
            </button>
            <motion.h4
              {...FadeLeft}
              {...Animate}
              transition={{ ...transition.transition, delay: 0.4 }}
              className=" mb-2"
            >
              Select <span className="mark"> Language </span> Component
            </motion.h4>
            <motion.p
              {...FadeUp}
              {...Animate}
              transition={{ ...transition.transition, delay: 0.6 }}
              className="mb-5"
            >
              Please choose your preferred language:
            </motion.p>
            <motion.div
              {...FadeUp}
              {...Animate}
              transition={{ ...transition.transition, delay: 0.8 }}
            >
              <LanguageSelector />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectLanguage;
