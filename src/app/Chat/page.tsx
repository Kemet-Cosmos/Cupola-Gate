"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: number;
  from: "ai" | "user";
  text: string;
};
export default function MarsAIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "ai",
      text: "Hello! I'm Star",
    },
  ]);

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

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
        model: `${process.env.NEXT_PUBLIC_CHAT_BOT_MODEL}`,
        messages: [
          { role: "system", content: "you are programmer , talk shorter" },
          { role: "user", content: input },
        ],
      });

      const aiReply = res.data?.choices?.[0]?.message?.content?.trim();

      setMessages((s) =>
        s.map((m) =>
          m.id === typingMsgId
            ? { ...m, text: aiReply || "Sorry, I couldn't process that." }
            : m
        )
      );
    } catch (err) {
      console.error(err);

      setMessages((s) =>
        s.map((m) =>
          m.id === typingMsgId
            ? {
                ...m,
                text: " Connection issue . Please try again.",
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
        <main className=" bg-gradient-to-b from-white/3 to-white/2/0 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div
            ref={listRef}
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
          </div>

          {/* Input */}
          <form onSubmit={onSend} className="mt-6 flex items-center gap-3">
            <motion.div whileFocus={{ scale: 1.01 }} className="flex-1">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your waste description or question..."
                className="w-full rounded-2xl p-3 bg-white/5 placeholder:text-neutral-400 outline-none"
              />
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={sending}
              className="px-4 py-2 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 text-white flex items-center gap-2 disabled:opacity-50"
            >
              {sending ? "Analyzing..." : "Send"}
            </motion.button>
          </form>
        </main>
      </div>
    </div>
  );
}
