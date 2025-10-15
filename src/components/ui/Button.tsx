"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
interface props {
  text: string;
  url?: string;
  className?: string;
  onClick?: () => void;
}
const Button: React.FC<props> = ({ text, url, className, onClick }) => {
  const route = useRouter();

  return (
    <motion.button
      whileHover={{}}
      whileTap={{}}
      onClick={() => {
        onClick && onClick();
        url && route.push(url);
      }}
      className={cn(
        `px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition`,
        className
      )}
    >
      {text}
    </motion.button>
  );
};

export default Button;
