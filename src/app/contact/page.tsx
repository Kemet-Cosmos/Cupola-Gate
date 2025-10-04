"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGT, T } from "gt-next";
import { useUser } from "@clerk/nextjs";
import { BadgeInfo, Lock } from "lucide-react";

export default function Page() {
  const t = useGT();
  const { user, isSignedIn } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("issue");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      const fullName =
        [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        user.username ||
        "";
      const primaryEmail =
        user.primaryEmailAddress?.emailAddress ||
        user.emailAddresses?.[0]?.emailAddress ||
        "";
      setName(fullName);
      setEmail(primaryEmail);
    }
  }, [isSignedIn, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setSubmitSuccess(false);
      if (!isSignedIn) {
        setName("");
        setEmail("");
      }
      setPhone("");
      setMessage("");
      setType("issue");
    }, 3000);
  };

  return (
    <section className="mt-20 flex items-center justify-center p-4 sm:p-6 text-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 sm:p-10 rounded-3xl shadow-2xl relative z-10"
      >
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-br from-blue-600 to-blue-400  bg-clip-text text-transparent"
          >
            <T>Contact Us</T>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="!text-sm"
          >
            <T>
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </T>
          </motion.p>
        </div>

        {isSignedIn && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
          >
            <p className="!text-sm text-blue-300 flex items-center gap-2">
              <BadgeInfo size={26} />
              <T>We prefilled your name and email from your account</T>
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {submitSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-20 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  className="w-10 h-10 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">
                <T>Message Sent!</T>
              </h3>
              <p className="text-slate-400">
                <T>Thank you for reaching out. We'll get back to you soon.</T>
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  <T>Name</T> <span className="text-red-400">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    if (!isSignedIn) setName(e.target.value);
                  }}
                  readOnly={isSignedIn}
                  required
                  className={`w-full p-3.5 rounded-xl  border border-white/10 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all ${
                    isSignedIn
                      ? "cursor-not-allowed opacity-70 bg-blue-600/30"
                      : " bg-white/5"
                  }`}
                  placeholder={t("Enter your name")}
                />
                {isSignedIn && (
                  <p className="!text-xs mt-1.5 flex items-center gap-1">
                    <Lock size={16} />
                    <T>Taken from your account — not editable</T>
                  </p>
                )}
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  <T>Email</T> <span className="text-red-400">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    if (!isSignedIn) setEmail(e.target.value);
                  }}
                  readOnly={isSignedIn}
                  required
                  className={`w-full p-3.5 rounded-xl border border-white/10 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all ${
                    isSignedIn
                      ? "cursor-not-allowed opacity-70 bg-blue-600/30"
                      : "bg-white/5"
                  }`}
                  placeholder={t("your@email.com")}
                />
                {isSignedIn && (
                  <p className="!text-xs mt-1.5 flex items-center gap-1">
                    <Lock size={16} />
                    <T>Taken from your account — not editable</T>
                  </p>
                )}
              </motion.div>

              {/* Phone Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  <T>Phone</T>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  placeholder={t("+20 123 456 7890")}
                />
              </motion.div>

              {/* Type Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  <T>Type</T> <span className="text-red-400">*</span>
                </label>
                <motion.select
                  whileTap={{ scale: 0.995 }}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all cursor-pointer"
                  required
                >
                  <option value="issue" className="bg-[#1e293b]">
                    {t("Issue")}
                  </option>
                  <option value="inquiry" className="bg-[#1e293b]">
                    {t("Inquiry")}
                  </option>
                  <option value="compliment" className="bg-[#1e293b]">
                    {t("Compliment")}
                  </option>
                </motion.select>
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  <T>Message</T> <span className="text-red-400">*</span>
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all h-32 resize-none"
                  placeholder={t("Tell us how we can help you...")}
                />
                <p className="!text-xs mt-1.5">
                  {message.length} / 500 {t("characters")}
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all font-semibold text-base shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <T>Sending...</T>
                  </>
                ) : (
                  <>
                    <T>Send Message</T>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
