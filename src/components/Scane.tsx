"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Animate, opacity } from "@/Animation";
import BadgeToast from "./Badges/BadgeToast";
import { X } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { T } from "gt-next";
import { useGT } from "gt-next";

type Dialogue = {
  id: number;
  character: string;
  text: string;
  image: string;
  slideImage?: string;
};

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: string;
};

interface Props {
  dialogues: Dialogue[];
  isFinished?: boolean;
  questions?: Question[];
  link: string;
  scanBadge: string;
  QuestionsBadge?: string;
  onAddBadge?: (badgeTitle: string) => Promise<void>;
}

export default function DialogueAnimation({
  dialogues,
  questions = [],
  link,
  scanBadge,
  isFinished,
  QuestionsBadge,
}: Props) {
  const { user } = useUser();
  const t = useGT();
  const [current, setCurrent] = useState(isFinished ? dialogues.length : 0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [toast, setToast] = useState<string>("");
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const router = useRouter();

  const Add = async (newBadge: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/badge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newBadge, fullName: user?.fullName }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Badge already exists:", data.error);
        setShowToast(false);
        return;
      }

      setShowToast(true);
      setToast(newBadge);
    } catch (error) {
      console.error("Error fetching badges:", error);
      setShowToast(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    if (current === dialogues.length - 1) {
      setFinished(true);
      Add(scanBadge);
    } else {
      setFinished(false);
    }
  }, [current, user, dialogues.length]);

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

  const goNext = () => {
    if (current < dialogues.length - 1) {
      setCurrent((c) => c + 1);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
    }
  };

  const goToNextPage = () => router.push(link);

  const handleAnswer = (qId: number, option: string) => {
    if (!showResults) {
      setAnswers((prev) => ({ ...prev, [qId]: option }));
    }
  };

  useEffect(() => {
    if (!showResults) return;
    if (calculateScore() != shuffledQuestions.length) return;
    if (questions.length <= 0 || !QuestionsBadge) return;
    Add(QuestionsBadge);
    setToast(QuestionsBadge);
  }, [showResults]);

  const resetQuiz = () => {
    const randomized = shuffledQuestions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setAnswers({});
    setShowResults(false);
    setShuffledQuestions(randomized);
  };

  const calculateScore = () => {
    return shuffledQuestions.filter((q) => answers[q.id] === q.correct).length;
  };

  return (
    <section className="flex flex-col items-center justify-center p-6 relative min-h-screen">
      <div className="relative w-full max-w-4xl min-h-[600px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!showQuestions && current < dialogues.length && (
            <motion.div
              key={`dialogue-${dialogues[current].id}`}
              {...Animate}
              {...opacity}
              className="flex flex-col items-center gap-8 w-full"
            >
              {dialogues[current].slideImage && (
                <motion.img
                  key={dialogues[current].slideImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={dialogues[current].slideImage}
                  alt="Slide"
                  className="w-full max-w-2xl h-auto object-contain rounded-2xl shadow-2xl border border-white/10 bg-white/5 p-4"
                />
              )}
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <motion.img
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  src={dialogues[current].image}
                  alt={dialogues[current].character}
                  className={` object-cover rounded-2xl border border-white/10 shadow-xl
                     ${
                       dialogues[current].slideImage
                         ? "w-60 "
                         : " w-full md:w-64 h-auto md:h-64 max-w-sm"
                     }
                    `}
                />
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl max-w-md"
                >
                  <h3
                    className={` 
                     ${dialogues[current].slideImage ? " !text-xl" : "  "}
                     font-bold  mb-3 text-white/90`}
                  >
                    {dialogues[current].character}
                  </h3>
                  <p
                    className={` 
                     ${dialogues[current].slideImage ? " !text-base" : "  "}
                     leading-relaxed text-white/80`}
                  >
                    {dialogues[current].text}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {showQuestions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-3xl"
            >
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
                <h2 className="text-3xl font-bold">
                  <T>Questions</T>
                </h2>
                <button
                  onClick={() => setShowQuestions(false)}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 group"
                >
                  <X
                    size={24}
                    className="group-hover:rotate-90 transition-transform duration-300"
                  />
                </button>
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                {shuffledQuestions.map((q, idx) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <p className="font-bold text-lg mb-4 text-white/90">
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
                            whileHover={{ scale: showResults ? 1 : 1.02 }}
                            whileTap={{ scale: showResults ? 1 : 0.98 }}
                            disabled={showResults}
                            onClick={() => handleAnswer(q.id, opt)}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 font-medium ${
                              isCorrect
                                ? "border-green-500/50 bg-green-500/20 text-green-100"
                                : isWrong
                                ? "border-red-500/50 bg-red-500/20 text-red-100"
                                : isSelected
                                ? "border-white/30 bg-white/10 text-white"
                                : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white/80"
                            }`}
                          >
                            {opt}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
                {!showResults ? (
                  <button
                    onClick={() => setShowResults(true)}
                    className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white rounded-xl font-bold text-lg transition-all duration-300"
                  >
                    <T>Submit Answers</T>
                  </button>
                ) : (
                  <>
                    <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="font-bold text-xl text-white">
                        <T>Score</T>: {calculateScore()} /{" "}
                        {shuffledQuestions.length}
                      </p>
                    </div>
                    {calculateScore() === shuffledQuestions.length ? (
                      <Link
                        href="/"
                        className="px-8 py-4 bg-green-500/80 hover:bg-green-500 border border-green-500/50 text-white rounded-xl font-bold text-lg transition-all duration-300"
                      >
                        <T>Continue</T> →
                      </Link>
                    ) : (
                      <button
                        onClick={resetQuiz}
                        className="px-8 py-4 bg-orange-500/80 hover:bg-orange-500 border border-orange-500/50 text-white rounded-xl font-bold text-lg transition-all duration-300"
                      >
                        ↺ <T>Try Again</T>
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!showQuestions && current < dialogues.length && (
        <div className="flex gap-4 mt-8 justify-center items-center">
          <motion.button
            whileHover={{ scale: current === 0 ? 1 : 1.05 }}
            whileTap={{ scale: current === 0 ? 1 : 0.95 }}
            onClick={goPrev}
            disabled={current === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              current === 0
                ? "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
                : "bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 text-white"
            }`}
          >
            ← <T>Previous</T>
          </motion.button>

          <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 font-medium">
            {current + 1} / {dialogues.length}
          </span>

          <motion.button
            whileHover={{ scale: current === dialogues.length - 1 ? 1 : 1.05 }}
            whileTap={{ scale: current === dialogues.length - 1 ? 1 : 0.95 }}
            onClick={goNext}
            disabled={current === dialogues.length - 1}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              current === dialogues.length - 1
                ? "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
                : "bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 text-white"
            }`}
          >
            <T>Next</T> →
          </motion.button>
        </div>
      )}

      {finished && !showQuestions && (
        <div className="flex gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToNextPage}
            className="px-8 py-4 rounded-xl bg-green-500/80 hover:bg-green-500 border border-green-500/50 transition-all duration-300 text-white font-bold shadow-lg"
          >
            <T>Continue</T> →
          </motion.button>

          {questions.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowQuestions(true)}
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 transition-all duration-300 text-white font-bold shadow-lg"
            >
              📝 <T>Exam Questions</T>
            </motion.button>
          )}
        </div>
      )}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col gap-4 items-center justify-center z-50"
          >
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            Loading...
          </motion.div>
        )}
      </AnimatePresence>
      <BadgeToast
        show={showToast}
        onClose={() => setShowToast(false)}
        title={t("New Badge Earned!")}
        message={`${t("You unlocked")} ${toast}`}
      />
    </section>
  );
}
