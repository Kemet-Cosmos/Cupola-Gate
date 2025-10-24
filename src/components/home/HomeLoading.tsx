"use client";
import React from "react";
import { motion } from "framer-motion";

const HomeLoading = () => {
  return (
    <section className="mt-24 flex flex-col justify-start gap-5 w-full">
      <div className="w-60 md:w-96 h-10 bg-neutral-800 animate-pulse rounded-4xl"></div>
      <div className="w-4/5 md:w-2xl h-10 bg-neutral-800 animate-pulse rounded-4xl"></div>
      <div className="w-full h-[80vh] bg-neutral-800 animate-pulse rounded-4xl"></div>
    </section>
  );
};

export default HomeLoading;
