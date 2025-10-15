"use client";
import React, { useEffect, useState } from "react";
import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";

import { dark } from "@clerk/themes";
import { motion } from "framer-motion";
import { Animate, FadeUp } from "@/Animation";
import Loading from "@/components/ui/Loading";
export default function page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="flex justify-center items-center">
      <ClerkLoading>
        <motion.div {...FadeUp} {...Animate}>
          <Loading />
        </motion.div>
      </ClerkLoading>
      <ClerkLoaded>
        <motion.div {...FadeUp} {...Animate} transition={{ duration: 0.6 }}>
          <SignUp
            appearance={{
              baseTheme: dark,
            }}
          />
        </motion.div>
      </ClerkLoaded>
    </section>
  );
}
