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
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [toast, setToast] = useState<string>("");
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const router = useRouter();

  const Add = async (newBadge: string) => {
    try {
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
    <section className="flex flex-col items-center justify-center p-6 relative">
      {/* Dialogue Animation */}
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
                <img
                  key={dialogues[current].slideImage}
                  src={dialogues[current].slideImage}
                  alt="Slide"
                  className="w-96 h-auto object-contain rounded-xl shadow-lg border border-white/20"
                />
              )}
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <img
                  src={dialogues[current].image}
                  alt={dialogues[current].character}
                  className="w-full md:w-60 h-auto md:h-60 max-w-sm object-cover rounded-lg"
                />
                <div className="p-4 rounded-2xl shadow-xl max-w-md text-center text-white">
                  <h3 className="font-bold text-lg mb-2">
                    {dialogues[current].character}
                  </h3>
                  <p className="text-base leading-relaxed">
                    {dialogues[current].text}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {showQuestions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="mt-20 w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Questions</h2>
                <button
                  onClick={() => setShowQuestions(false)}
                  className="text-2xl font-bold"
                >
                  <X size={40} />
                </button>
              </div>

              {/* Questions List */}
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

              {/* Result Buttons */}
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
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons for Dialogues */}
      {!showQuestions && current < dialogues.length && (
        <div className="flex gap-4 mt-8 justify-center items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goPrev}
            disabled={current === 0}
            className={`px-6 py-3 rounded-xl font-medium text-white transition ${
              current === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-500"
            }`}
          >
            ← <T>Previous</T>
          </motion.button>

          <span className="text-gray-400 font-medium">
            {current + 1} / {dialogues.length}
          </span>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goNext}
            disabled={current === dialogues.length - 1}
            className={`px-6 py-3 rounded-xl font-medium text-white transition ${
              current === dialogues.length - 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500"
            }`}
          >
            <T>Next</T> →
          </motion.button>
        </div>
      )}

      {/* Action Buttons when finished */}
      {finished && !showQuestions && (
        <div className="flex gap-4 mt-8">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goToNextPage}
            className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 transition text-white font-medium shadow-lg"
          >
            <T>Continue</T>
          </motion.button>

          {questions.length > 0 && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowQuestions(true)}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition text-white font-medium shadow-lg"
            >
              <T>Exam Questions</T>
            </motion.button>
          )}
        </div>
      )}
      <BadgeToast
        show={showToast}
        onClose={() => setShowToast(false)}
        title={t("New Badge Earned!")}
        message={`${t("You unlocked")} ${toast}`}
      />
    </section>
  );
}
