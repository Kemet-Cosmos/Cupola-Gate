"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface BadgeToastProps {
  title: string;

  message?: string;
  show: boolean;
  onClose: () => void;
}

export default function BadgeToast({
  title,
  message,
  show,

  onClose,
}: BadgeToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-3 md:bottom-5 right-0 md:right-5 w-full md:w-fit   z-[100] bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-4"
        >
          <Link href="/badge" className="space-y-2">
            <div className="font-bold text-lg">{title}</div>
            {message && <p className="!text-sm">{message}</p>}
          </Link>
          <button
            onClick={onClose}
            className="ml-auto text-white/80 hover:text-white font-bold z-20"
          >
            <X size={30} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
