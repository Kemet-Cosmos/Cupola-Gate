"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import BadgeToast from "@/components/Badges/BadgeToast";
import { opacity, Animate, FadeUp, transition, FadeLeft } from "@/Animation";
import { useGT } from "gt-next";
import { T } from "gt-next";
import { useRouter } from "next/navigation";
import { CircleCheckBig, Frown, Loader } from "lucide-react";

type Message = {
  id: number;
  from: "ai" | "user";
  text: string;
};

export default function MarsAIChat() {
  const { user } = useUser();
  const router = useRouter();
  const t = useGT();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "ai",
      text: `${t("Hello")} ${user?.firstName}, ${t("I'm Star")}`,
    },
  ]);

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [isServerAvailable, setIsServerAvailable] = useState<boolean | null>(
    null
  );
  const [hideMessage, setHideMessage] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [toast, setToast] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;
    addBadge("Chat");
    setToast("Chat");
  }, []);

  useEffect(() => {
    const userMessages = messages.filter((m) => m.from === "user").length;
    if (userMessages === 10) {
      addBadge("Chat_10");
      setToast("Chat Legend");
    }
  }, [messages]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_CHAT_BOT}`, {
          headers: {
            Accept: "application/json",
          },
        });
        setIsServerAvailable(true);
      } catch (error) {
        setIsServerAvailable(false);
      }
    };

    fetchModels();
  }, []);

  const addBadge = async (badgeTitle: string) => {
    try {
      const response = await fetch("/api/badge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: badgeTitle, fullName: user?.fullName }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Badge already exists:", data.error);
        return;
      }

      setShowToast(true);
      console.log(`Badge awarded: ${badgeTitle}`);
    } catch (error) {
      console.error("Error adding badge:", error);
    }
  };

  async function onSend(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim()) return;

    const newUserMsg = { id: Date.now(), from: "user" as const, text: input };
    setMessages((s) => [...s, newUserMsg]);
    setInput("");
    setSending(true);

    const typingMsgId = Date.now() + 1;
    setMessages((s) => [
      ...s,
      { id: typingMsgId, from: "ai" as const, text: "typing..." },
    ]);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_CHAT_BOT}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        model: `${process.env.NEXT_PUBLIC_CHAT_BOT_MODEL}`,
        messages: [
          {
            role: "system",
            content:
              "CupolaGate is an interactive, AI-based simulation webpage educating users about the ISS Cupola and the NBL. NBL and Cupola from Nasa Docs, talk shorter",
          },
          { role: "user", content: input },
        ],
      });

      const aiReply = res.data?.choices?.[0]?.message?.content?.trim();

      setMessages((s) =>
        s.map((m) =>
          m.id === typingMsgId
            ? { ...m, text: aiReply || t("Sorry, I couldn't process that.") }
            : m
        )
      );
    } catch (err) {
      // console.error(err);

      setMessages((s) =>
        s.map((m) =>
          m.id === typingMsgId
            ? {
                ...m,
                text: t(" Connection issue . Please try again."),
              }
            : m
        )
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl mt-10">
        {/* Chat area */}
        <motion.main
          {...FadeUp}
          {...Animate}
          {...transition}
          className=" bg-gradient-to-b from-white/3 to-white/2/0 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
        >
          <motion.div
            ref={listRef}
            {...opacity}
            {...Animate}
            transition={{ delay: 0.2 }}
            className="h-[75vh] overflow-auto p-4 rounded-2xl bg-gradient-to-b from-white/4 to-transparent border border-white/5"
          >
            <ul className="flex flex-col gap-4">
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.li
                    key={m.id}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={`max-w-[80%] p-3 rounded-2xl break-words ${
                      m.from === "user"
                        ? "self-end bg-gradient-to-br from-indigo-600 to-indigo-400 text-white"
                        : "self-start bg-white/6 text-slate-100"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                    <p className="!text-[10px] mt-1 flex justify-end">
                      {m.from === "user" ? "You" : "Star"}
                    </p>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </motion.div>

          {/* Input */}
          <form onSubmit={onSend} className="mt-6 flex items-center gap-3">
            <motion.input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("Type your waste description or question...")}
              whileFocus={{ scale: 1.01 }}
              {...FadeUp}
              {...Animate}
              maxLength={500}
              transition={{ delay: 0.2, ...transition.transition }}
              className="flex-1 w-full rounded-2xl p-3 bg-white/5 placeholder:text-neutral-400 outline-none"
            />

            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              disabled={sending}
              {...FadeLeft}
              {...Animate}
              transition={{ delay: 0.2, ...transition.transition }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 text-white flex items-center gap-2 disabled:opacity-50"
            >
              {sending ? t("Analyzing...") : t("Send")}
            </motion.button>
          </form>

          {/* Badges Display */}
          <BadgeToast
            show={showToast}
            onClose={() => setShowToast(false)}
            title="New Badge Earned!"
            message={`You unlocked ${toast}`}
          />
        </motion.main>
      </div>
      <AnimatePresence>
        {!hideMessage && (
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
              className="min-h-72 w-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-6 rounded-2xl border border-white/10  text-center"
            >
              <AnimatePresence mode="wait">
                {isServerAvailable === null ? (
                  <motion.div
                    key="Loading"
                    {...opacity}
                    {...Animate}
                    className="flex flex-col justify-evenly"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-blue-500/20">
                        <Loader size={35} />
                      </div>
                    </div>

                    <motion.h3
                      {...opacity}
                      {...Animate}
                      transition={{ ...transition.transition, delay: 0.5 }}
                      className="!text-xl text-center mb-3"
                    >
                      <T>Checking server status...</T>
                    </motion.h3>
                    <motion.p
                      {...opacity}
                      {...Animate}
                      transition={{ ...transition.transition, delay: 0.5 }}
                      className="text-neutral-400 !text-base mb-6"
                    >
                      <T>
                        Please wait a moment while we verify the connection.
                      </T>
                    </motion.p>
                  </motion.div>
                ) : isServerAvailable ? (
                  <motion.div
                    key="available"
                    {...opacity}
                    {...Animate}
                    className="flex flex-col justify-evenly"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-green-500/20">
                        <CircleCheckBig size={35} />
                      </div>
                    </div>
                    <motion.h3
                      {...opacity}
                      {...Animate}
                      transition={{ ...transition.transition, delay: 0.5 }}
                      className="!text-xl text-center mb-3"
                    >
                      <T>Server is Ready 🚀</T>
                    </motion.h3>

                    <motion.p
                      {...opacity}
                      {...Animate}
                      transition={{ ...transition.transition, delay: 0.5 }}
                      className="text-neutral-400 !text-base mb-6"
                    >
                      <T>
                        Everything is up and running! Please stay respectful and
                        ask only meaningful questions to get the best answers.
                      </T>
                    </motion.p>

                    <div className="flex justify-center items-center gap-5">
                      <motion.button
                        {...opacity}
                        {...Animate}
                        transition={{ ...transition.transition, delay: 0.7 }}
                        className="flex-1 px-4 py-3 rounded-xl bg-green-600/60 hover:bg-green-600/70 text-white font-medium border border-green-600/20 cursor-pointer duration-100"
                        onClick={() => setHideMessage(true)}
                      >
                        <T>Start Chatting</T>
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="notAvailable"
                    {...opacity}
                    {...Animate}
                    className="flex flex-col justify-evenly"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-red-500/20">
                        <Frown size={35} />
                      </div>
                    </div>
                    <motion.h3
                      {...opacity}
                      {...Animate}
                      transition={{ ...transition.transition, delay: 0.5 }}
                      className="!text-xl text-center mb-3"
                    >
                      <T>Server Unavailable</T>
                    </motion.h3>

                    <motion.p
                      {...opacity}
                      {...Animate}
                      transition={{ ...transition.transition, delay: 0.5 }}
                      className="text-neutral-400 !text-base mb-6"
                    >
                      <T>
                        The server seems to be down right now. You can return
                        home or try to continue without AI assistance.
                      </T>
                    </motion.p>

                    <div className="flex justify-center items-center gap-5">
                      <motion.div
                        {...opacity}
                        {...Animate}
                        transition={{ ...transition.transition, delay: 0.6 }}
                        onClick={() => router.push("/")}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium cursor-pointer duration-100"
                      >
                        <T>Go Home</T>
                      </motion.div>

                      <motion.div
                        {...opacity}
                        {...Animate}
                        transition={{ ...transition.transition, delay: 0.6 }}
                        onClick={() => setHideMessage(true)}
                        className="flex-1 px-4 py-3 rounded-xl bg-indigo-600/50 hover:bg-indigo-600/60 border border-indigo-600/10 text-white font-medium cursor-pointer duration-100"
                      >
                        <T>Continue Anyway</T>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
