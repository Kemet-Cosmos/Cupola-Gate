"use client";
import { FadeUp, ViewPort } from "@/Animation";
import { motion } from "framer-motion";

const Speakers = () => {
  return (
    <section>
      <motion.h1 {...FadeUp} {...ViewPort} className="w-fit mx-auto">
        Speakers
      </motion.h1>
    </section>
  )
}

export default Speakers
