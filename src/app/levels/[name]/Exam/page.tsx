"use client";
import React, { useEffect, useState } from "react";
import { Levels } from "@/data/Levels";
import { notFound, useParams, useRouter } from "next/navigation";
import { T } from "gt-next";
import { useGT } from "gt-next";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Animate, FadeLeft, opacity, transition } from "@/Animation";
import { Crown } from "lucide-react";
import axios from "axios";
import { GoTopScreen } from "@/Hook/GoTopScreen";

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: string;
};

export default function Page() {
  const t = useGT();
  const route = useRouter();
  const { user } = useUser();
  const params = useParams();
  const Level = Levels.find((b) => b.href === params.name);
  const [badgeLoading, setBadgeLoading] = useState<boolean>(false);

  const Add = async (newBadge: string) => {
    try {
      setBadgeLoading(true);

      const { data } = await axios.post("/api/badge", {
        title: newBadge,
        fullName: user?.fullName,
      });

      if (data.error) {
        console.error("Badge already exists:", data.error);
        return;
      }

      setSuccess(true);
    } catch (error: any) {
      if (error.response) {
        console.error("API error:", error.response.data);
      } else {
        console.error("Request failed:", error.message);
      }
    } finally {
      setBadgeLoading(false);
    }
  };

  if (!Level) return notFound();
  const questions = Level.questions && Level.questions;
  if (!questions) return notFound();

  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [success, setSuccess] = useState<boolean | null>(null);

  const shuffleArray = <T,>(arr: T[]): T[] => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (questions.length > 0) {
      const randomized = questions.map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }));
      setShuffledQuestions(randomized);
    }
  }, [questions]);

  const resetQuiz = () => {
    const randomized = shuffledQuestions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setAnswers({});
    setShowResults(false);
    setShuffledQuestions(randomized);
  };

  const handleAnswer = (qId: number, option: string) => {
    if (!showResults) {
      setAnswers((prev) => ({ ...prev, [qId]: option }));
    }
  };

  const calculateScore = () => {
    return shuffledQuestions.filter((q) => answers[q.id] === q.correct).length;
  };

  useEffect(() => {
    if (!showResults) return;
    if (calculateScore() != shuffledQuestions.length) return;
    if (questions.length <= 0) return;
    Add(`Q_Level_${Level.id - 1}`);
  }, [showResults]);

  const GoToExamButton = () => {
    route.push("/");
  };

  useEffect(() => {
    GoTopScreen();
  }, []);
  
  return (
    <section className="mt-20">
      <motion.h1 {...FadeLeft} {...Animate} {...transition}>
        <T>Exam</T> <span className="mark">{Level.title}</span>
      </motion.h1>
      <motion.p
        {...FadeLeft}
        {...Animate}
        transition={{ ...transition.transition, delay: 0.25 }}
      >
        {Level.desc}
      </motion.p>
      <motion.div
        {...FadeLeft}
        {...Animate}
        transition={{ ...transition.transition, delay: 0.5 }}
        className="flex flex-col justify-center items-center max-w-4xl mx-auto my-5"
      >
        <div className="space-y-6 h-fit pr-4">
          {shuffledQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="p-3 rounded-xl bg-gradient-to-b from-white/3 to-white/2/0"
            >
              <p className="font-bold text-lg mb-4">
                {idx + 1}. {q.question}
              </p>
              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  const isSelected = answers[q.id] === opt;
                  const isCorrect = showResults && opt === q.correct;
                  const isWrong =
                    showResults && isSelected && opt !== q.correct;

                  return (
                    <motion.button
                      key={i}
                      whileTap={{ scale: 0.97 }}
                      disabled={showResults}
                      onClick={() => handleAnswer(q.id, opt)}
                      className={`w-full text-left p-3 rounded-lg border transition font-medium ${
                        isCorrect
                          ? "border-green-500 bg-green-900 text-green-100"
                          : isWrong
                          ? "border-red-500 bg-red-900 text-red-100"
                          : isSelected
                          ? "border-neutral-500 bg-neutral-100 text-neutral-900"
                          : "border-white/20"
                      }`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between items-center gap-4">
          {!showResults ? (
            <button
              onClick={() => setShowResults(true)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition flex-1"
            >
              <T>Submit Answers</T>
            </button>
          ) : (
            <>
              <p className="font-bold text-xl text-gray-800">
                Score: {calculateScore()} / {shuffledQuestions.length}
              </p>
              {calculateScore() === shuffledQuestions.length ? (
                <Link
                  href="/"
                  className="px-8 py-3 bg-green-500 hover:bg-green-400 text-white rounded-xl font-bold text-lg transition"
                >
                  <T>Continue</T>
                </Link>
              ) : (
                <button
                  onClick={resetQuiz}
                  className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-white rounded-xl font-bold text-lg transition"
                >
                  <T>Try Again</T>{" "}
                </button>
              )}
            </>
          )}
        </div>
      </motion.div>

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

              <h1 className="!text-2xl font-bold tracking-wide">
                Congratulations!
              </h1>

              <p className="!text-white/80 !text-sm leading-relaxed">
                You’ve just earned a{" "}
                <span className="text-yellow-300 font-semibold">
                  new badge{" "}
                </span>
                for your amazing progress! Keep going — more challenges await!
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl text-sm font-semibold tracking-wide transition"
                onClick={GoToExamButton}
              >
                Home
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
      <AnimatePresence>
        {badgeLoading && (
          <motion.div
            {...opacity}
            {...Animate}
            {...transition}
            className="fixed top-0 left-0 w-full h-full bg-black/75 flex flex-col gap-5 justify-center items-center"
          >
            <h1 className="animate-pulse">
              <T>Loading Badge....</T>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
