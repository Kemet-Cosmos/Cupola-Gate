"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { Rocket } from "lucide-react";
import { T } from "gt-next";

interface Props {
  text: string;
  url?: string;
  title?: string;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  text,
  url,
  className,
  onClick,
  icon = <Rocket />,
  disabled,
  title,
}) => {
  const router = useRouter();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        onClick?.();
        if (url) router.push(url);
      }}
      disabled={disabled}
      title={title}
      className={cn(
        `relative group overflow-hidden text-white text-lg py-3 px-8 
         rounded-2xl flex justify-center items-center gap-2 
         bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600
         cursor-pointer select-none transition-all duration-300`,
        className
      )}
    >
      <div
        className="relative z-10 duration-300 ease-out 
        group-hover:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1"
      >
        {icon}
      </div>

      <div
        className="relative z-10 font-bold duration-300 ease-out transform 
        group-hover:-translate-y-full group-hover:opacity-0"
      >
        {text}
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center font-bold 
        duration-300 ease-out transform translate-y-full opacity-0 
        group-hover:translate-y-0 group-hover:opacity-100"
      >
        <T>Lets Go !</T>
      </div>
    </motion.button>
  );
};

export default Button;
