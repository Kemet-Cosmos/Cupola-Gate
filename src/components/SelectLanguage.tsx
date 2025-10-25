"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import { Loader, X } from "lucide-react";
import { Animate, FadeLeft, FadeUp, opacity, transition } from "@/Animation";
import { T } from "gt-next";

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
          className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-40"
        >
          <motion.div
            {...FadeUp}
            {...Animate}
            transition={{ ...transition.transition, delay: 0.3 }}
            className="relative min-h-72 w-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-6 rounded-2xl border border-white/10  text-center overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute top-0 right-0 text-black bg-white rounded-bl-2xl p-2 hover:bg-gray-200"
            >
              <X />
            </button>
            <motion.div
              key="Loading"
              {...opacity}
              {...Animate}
              className="flex flex-col justify-evenly"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full  bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-indigo-600/40">
                  <Loader size={35} />
                </div>
              </div>
              <motion.h4
                {...opacity}
                {...Animate}
                transition={{ ...transition.transition, delay: 0.5 }}
                className="!text-2xl text-center mb-3"
              >
                <T>
                  Select <span className="mark"> Language </span> Component
                </T>
              </motion.h4>
              <motion.p
                {...opacity}
                {...Animate}
                transition={{ ...transition.transition, delay: 0.5 }}
                className="text-neutral-400 !text-lg mb-6"
              >
                <T>
                  Please select your preferred language below. If the current
                  language works for you, simply close this window using the “X”
                  above.
                </T>{" "}
              </motion.p>
              <motion.div
                {...FadeUp}
                {...Animate}
                transition={{ ...transition.transition, delay: 0.8 }}
                className="flex justify-center"
              >
                <LanguageSelector />
              </motion.div>{" "}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectLanguage;
