"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

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
  questions?: Question[];
  link: string;
}

export default function DialogueAnimation({
  dialogues,
  questions = [],
  link,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const router = useRouter();

  // Shuffle helper function
  const shuffleArray = <T,>(arr: T[]): T[] => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  // Prepare dialogues
  useEffect(() => {
    if (current < dialogues.length) {
      const active = dialogues[current];
      const duration = active.text.length * 50;
      const timer = setTimeout(() => {
        if (current === dialogues.length - 1) {
          setFinished(true);
        } else {
          setCurrent((c) => c + 1);
        }
      }, duration + 2000);
      return () => clearTimeout(timer);
    }
  }, [current, dialogues.length]);

  // Shuffle questions initially
  useEffect(() => {
    const randomized = questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(randomized);
  }, [questions]);
  const goNext = () => router.push(link);

  const handleAnswer = (qId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

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
      <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {current < dialogues.length && (
            <motion.div
              key={dialogues[current].id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex flex-col sm:flex-row items-center gap-8"
            >
              <div className="flex items-center gap-4">
                <motion.img
                  src={dialogues[current].image}
                  alt={dialogues[current].character}
                  className="w-60 h-60 object-cover"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="p-4 rounded-2xl shadow-xl max-w-md text-center bg-white/10 backdrop-blur"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-bold text-lg mb-2">
                    {dialogues[current].character}
                  </h3>
                  <p className="text-base leading-relaxed">
                    {dialogues[current].text}
                  </p>
                </motion.div>
              </div>

              {dialogues[current].slideImage && (
                <motion.img
                  key={dialogues[current].slideImage}
                  src={dialogues[current].slideImage}
                  alt="Slide"
                  className="w-64 h-40 object-contain rounded-xl shadow-lg border border-white/20"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      {finished && (
        <div className="flex gap-4 mt-8">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goNext}
            className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 transition text-white font-medium shadow-lg"
          >
            Continue
          </motion.button>

          {questions.length > 0 && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowQuestions(true)}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition text-white font-medium shadow-lg"
            >
              Questions
            </motion.button>
          )}
        </div>
      )}

      {/* Questions Modal */}
      <AnimatePresence>
        {showQuestions && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-black p-6 rounded-2xl max-w-2xl w-full relative shadow-2xl overflow-y-auto max-h-[80vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setShowQuestions(false)}
                className="absolute top-3 right-4 text-gray-700 text-xl hover:text-black"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-4">Questions</h2>

              {/* Questions List */}
              <div className="space-y-6">
                {shuffledQuestions.map((q) => (
                  <div key={q.id} className="p-4 border rounded-xl bg-gray-50">
                    <p className="font-semibold mb-3">{q.question}</p>
                    <div className="space-y-2">
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
                            className={`w-full text-left p-2 rounded-lg border transition ${
                              isCorrect
                                ? "border-green-500 bg-green-100"
                                : isWrong
                                ? "border-red-500 bg-red-100"
                                : isSelected
                                ? "border-blue-500 bg-blue-100"
                                : "border-gray-300 hover:bg-gray-100"
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
              <div className="mt-6 flex justify-between items-center">
                {!showResults ? (
                  <button
                    onClick={() => setShowResults(true)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium"
                  >
                    Submit Answers
                  </button>
                ) : (
                  <>
                    <p className="font-semibold">
                      Score: {calculateScore()} / {shuffledQuestions.length}
                    </p>
                    <button
                      onClick={resetQuiz}
                      className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-xl font-medium"
                    >
                      Try Again
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
