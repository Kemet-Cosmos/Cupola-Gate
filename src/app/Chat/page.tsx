"use client";
import { useGT } from "gt-next";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T } from "gt-next";

export default function RFCChatPage() {
  const t = useGT();
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: t("ai"),
      text: t("Hello! I'm here to help — but the chat is currently down."),
    },
    { id: 2, from: "user", text: t("Cool, when will it be available?") },
    {
      id: 3,
      from: "ai",
      text: t("Soon — we'll add a notification once it's back."),
    },
  ] as { id: number; from: "user" | "ai"; text: string }[]);
  const [input, setInput] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  function onSend(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim()) return;
    setSending(true);
    const newMsg = { id: Date.now(), from: "user" as const, text: input };
    setMessages((s) => [...s, newMsg]);
    setInput("");
    setTimeout(() => setSending(false), 600);
  }

  return (
    <div className="min-h-screen text-slate-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-3 bg-white/5 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-4">
          <div className="flex-1 overflow-auto">
            <ul className="flex flex-col gap-3">
              {[t("General"), t("Design"), t("Integrations"), t("Roadmap")].map(
                (t, i) => (
                  <li
                    key={t}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-white/5 ${
                      i === 0 ? "bg-white/6 ring-1 ring-white/6" : ""
                    }`}
                  >
                    <div className="text-sm font-medium">{t}</div>
                    <p className="!text-xs  ">
                      <T> Updates & Notes</T>
                    </p>
                  </li>
                )
              )}
            </ul>
          </div>

          <p className="!text-xs">
            <T> v1.0 — mock UI • static demo</T>
          </p>
        </aside>

        {/* Chat area */}
        <main className="col-span-9 bg-gradient-to-b from-white/3 to-white/2/0 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div
            ref={listRef}
            className="h-[60vh] overflow-auto p-4 rounded-2xl bg-gradient-to-b from-white/4 to-transparent border border-white/5"
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
                    <div className="text-sm">{m.text}</div>
                    <p className="!text-[10px] mt-1 flex justify-end">
                      {m.from === "user" ? "You" : "RFC Bot"}
                    </p>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          {/* Input area */}
          <form onSubmit={onSend} className="mt-6 flex items-center gap-3">
            <motion.div whileFocus={{ scale: 1.01 }} className="flex-1">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  showPopup
                    ? t("Chat is currently down — you can leave a message...")
                    : t("Type a message...")
                }
                className="w-full rounded-2xl p-3 bg-white/5 placeholder:text-neutral-400 outline-none"
              />
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled
              className="px-4 py-2 rounded-2xl bg-white/6 text-slate-200 flex items-center gap-2 disabled:opacity-50 "
            >
              <T>Send</T>
            </motion.button>
          </form>
        </main>
      </div>

      {/* Popup modal: chat down */}
      <AnimatePresence>
        {showPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-6 pointer-events-auto"
            >
              <motion.div
                initial={{ y: 60, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className="w-full max-w-2xl bg-black/70 rounded-2xl p-6 ring-1 ring-white/6 shadow-2xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 text-white flex items-center justify-center text-4xl font-semibold  ">
                    !
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold !text-xl">
                      <T>The chat is not available right now</T>
                    </h3>
                    <p className="!text-lg text-slate-300 mt-2">
                      <T>
                        Sorry — the chat feature is temporarily down for
                        maintenance and upgrades. It will be back soon with
                        improvements and new capabilities.
                      </T>
                    </p>

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => setShowPopup(false)}
                        className="px-3 py-2 rounded-lg bg-white/6"
                      >
                        <T>Got it</T>
                      </button>
                      <button
                        onClick={() => {
                          setShowPopup(false);
                        }}
                        className="px-3 py-2 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-400 text-white font-medium"
                      >
                        <T>I want a notification when it's back</T>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 w-full h-screen bg-black/50"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
