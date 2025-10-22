"use client";

import CustomAudioPlayer from "@/components/ui/CustomAudioPlayer";
import { AnimatedImage } from "@/components/ui/Media_UI/AnimatedImage";
import { Levels } from "@/data/Levels";
import { AnimatePresence, motion } from "framer-motion";
import { useGT, T } from "gt-next";
import { notFound, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Animate, FadeUp, opacity, transition } from "@/Animation";
import Button from "@/components/ui/Button";
import { useUser } from "@clerk/nextjs";
import Loading from "@/components/ui/Loading";
import { Crown } from "lucide-react";


const translate = (t: (key: string) => string, text: string | undefined) => {
  if (!text) return "";
  try {
    return t(text);
  } catch {
    return text;
  }
};

export default function Page() {
  const params = useParams();
  const { user } = useUser();
  const route = useRouter();
  const [isVideo, setIsVideo] = useState<boolean | null>(null);
  const Level = Levels.find((b) => b.href === params.name);
  const t = useGT();
  const [wait, setWait] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [exists, setExists] = useState<boolean | null>(null);

  if (!Level) return notFound();

  // Add badge
  const Add = async (newBadge: string) => {
    try {
      const response = await fetch("/api/badge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newBadge, fullName: user?.fullName }),
      });
      const data = await response.json();
      if (data.error) return console.error("Badge already exists:", data.error);
      setSuccess(true);
    } catch (error) {
      console.error("Error adding badge:", error);
    }
  };

  // Check if badge exists
  useEffect(() => {
    const checkBadge = async () => {
      try {
        const res = await fetch(
          `/api/badge/ByName?title=${encodeURIComponent(Level.href)}`
        );
        const data = await res.json();
        setExists(res.ok ? data.exists : false);
      } catch (error) {
        console.error("Error checking badge:", error);
      }
    };
    checkBadge();
  }, [Level.href]);

  const GoToExamButton = () => {
    if (success) route.push(`/levels/${Level.href}/Exam`);
  };

  const ExamHandleButton = () => {
    if (!exists) {
      setWait(true);
      Add(Level.href);
    } else {
      route.push(Level.questions ? `/levels/${Level.href}/Exam` : "/");
    }
  };

  return (
    <section className="mt-24 px-5 flex flex-col lg:flex-row justify-center gap-10 max-w-7xl mx-auto">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-2/4">
        <div className="mb-5">
          <h1 className="mark">{translate(t, Level.title)}</h1>
          <p>{translate(t, Level.desc)}</p>
        </div>

        {isVideo ? (
          <iframe
            src={Level.videoLink}
            className="w-full max-w-2xl aspect-video rounded-2xl bg-transparent"
            allow="autoplay"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <CustomAudioPlayer
              src={Level.Voice}
              title={`${Level.teacher.name} Voice`}
              className="max-w-full"
            />
          </div>
        )}

        {/* Teacher Info */}
        <div className="bg-gradient-to-b from-white/3 to-white/2/0 border border-white/40 rounded-2xl mt-5 p-5">
          <h5 className="mb-5 text-center">
            <T>
              Teacher <span className="mark">Info</span>
            </T>
          </h5>
          <div className="flex items-center gap-5">
            <AnimatedImage
              src={Level.teacher?.image}
              alt="teacher Image"
              className="w-16 border border-indigo-500 rounded-full bg-black"
              icon
              noAnimate
            />
            <h6 className="text-2xl font-bold">{Level.teacher.name}</h6>
          </div>
        </div>

        {/* Exam / Continue Section */}
        <div className="flex flex-col justify-center items-center gap-5 mt-5 bg-gradient-to-b from-white/3 to-white/2/0 border border-white/40 rounded-2xl p-5">
          <h5 className="text-center">
            {Level.questions ? (
              <T>
                Ready For <span className="mark">Exam</span> ?
              </T>
            ) : (
              <T>
                Go Home and Complete Your Tasks to earn{" "}
                <span className="mark">Certificate</span>
              </T>
            )}
          </h5>
          <Button
            disabled={exists === null}
            text={
              exists === null
                ? "Loading..."
                : translate(t, Level.questions ? "Yes, I'm Ready" : "Let's GOO!")
            }
            onClick={ExamHandleButton}
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-2/4 lg:mt-10">
        <h4 className="mb-10 mark">
          <T>Content</T>
        </h4>
        <div className="flex flex-col justify-center items-center gap-10 max-w-4xl pb-10">
          {Level.content.map((item) => (
            <div key={item.title}>
              <h4 className="!text-2xl mb-3">{translate(t, item.title)}</h4>
              <p className="!text-xl">{translate(t, item.desc)}</p>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isVideo === null && (
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
              className="h-96 w-2xl bg-black border border-indigo-600 rounded-2xl p-10 flex flex-col justify-evenly"
            >
              <motion.h3
                {...FadeUp}
                {...Animate}
                transition={{ ...transition.transition, delay: 0.5 }}
                className="text-center"
              >
                <T>What do you prefer</T>
              </motion.h3>
              <div className="flex justify-center items-center gap-5">
                {[true, false].map((item, i) => (
                  <motion.div
                    key={i}
                    {...FadeUp}
                    {...Animate}
                    transition={{ ...transition.transition, delay: 0.5 }}
                    onClick={() => setIsVideo(item)}
                    className="text-2xl font-bold border border-indigo-500 p-5 rounded-2xl cursor-pointer hover:bg-indigo-600 duration-150"
                  >
                    <div>{item ? t("Video") : t("Voice only")}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <AnimatePresence>
        {wait && (
          <motion.div
            key="Loading"
            {...opacity}
            {...Animate}
            {...transition}
            className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-40"
          >
            <Loading />
          </motion.div>
        )}

        {/* MODAL: Success */}
        {success && (
          <motion.div
            key="success"
            {...opacity}
            {...Animate}
            {...transition}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-3xl shadow-2xl w-[90%] max-w-md text-center border border-white/20"
            >
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 8 }}
                  className="bg-white/20 p-4 rounded-full shadow-inner text-yellow-300"
                >
                  <Crown size={35} />
                </motion.div>

                <h1 className="text-2xl font-bold tracking-wide">
                  🎉 Congratulations!
                </h1>

                <p className="text-white/80 text-sm leading-relaxed">
                  You’ve just earned a{" "}
                  <span className="text-yellow-300 font-semibold">
                    new badge
                  </span>{" "}
                  for your amazing progress! Keep going — more challenges await!
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl text-sm font-semibold tracking-wide transition"
                  onClick={GoToExamButton}
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
