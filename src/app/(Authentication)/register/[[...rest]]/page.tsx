"use client";
import React, { useEffect, useState } from "react";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { motion } from "framer-motion";
import { Animate, FadeUp } from "@/Animation";
export default function page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="flex justify-center items-center">
      <motion.div {...FadeUp} {...Animate} transition={{ duration: 0.6 }}>
        <SignUp
          appearance={{
            baseTheme: dark,
          }}
        />
      </motion.div>
    </section>
  );
}
