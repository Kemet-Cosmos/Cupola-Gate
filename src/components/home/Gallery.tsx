"use client";
import { motion } from "framer-motion";
import React from "react";
import { FadeLeft, FadeRight, FadeUp, transition, ViewPort } from "@/Animation";
import RollingGallery from "../ui/Bite/RollingGallery";
import Pluto from "../ui/Planets/Pluto";
import Moon from "../ui/Planets/Moon";
import Button from "../ui/Button";
import { T } from "gt-next";
import { useGT } from "gt-next";

const Gallery = () => {
  const t = useGT();
  const Images = [
    "/Places/amazon.jpg",
    "/Places/Eiffel.avif",
    "/Places/fuji.jpg",
    "/Places/Giza Pyramids.jpg",
    "/Places/grand-canyon.jpg",
    "/Places/great-barrier-reef.jpg",
    "/Places/niagara.jpg",
    "/Places/ras-mohamed.jpg",
  ];

  return (
    <div className="relative overflow-hidden mt-20 w-full min-h-[500px] ">
      <motion.h1
        {...FadeUp}
        {...ViewPort}
        {...transition}
        className="text-center"
      >
        <T>
          Discover <span className="mark"> Every </span> Place
        </T>
      </motion.h1>
      <motion.p
        {...FadeUp}
        {...ViewPort}
        {...transition}
        className="text-center mt-4"
      >
        <T>Explore the world by rotating an interactive 3D globe.</T>
      </motion.p>

      <motion.div
        {...FadeUp}
        {...ViewPort}
        {...transition}
        className="lg:w-3xl mx-auto"
      >
        <RollingGallery autoplay={true} pauseOnHover={true} images={Images} />
        <div className="w-full flex justify-center  ">
          <Button
            text={t("Explore Now !")}
            url="/explore"
            className="text-xl"
          />
        </div>
      </motion.div>
      <motion.div
        {...FadeRight}
        {...ViewPort}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-4 -right-32 lg:right-10 flex flex-col gap-3 justify-center items-center text-white/30 -z-10"
      >
        <Pluto />
        <T>Pluto</T>
      </motion.div>
      <motion.div
        {...FadeLeft}
        {...ViewPort}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-4 -left-32 lg:left-10 flex flex-col gap-3 justify-center items-center text-white/30 -z-10"
      >
        <Moon />
        <T>Moon</T>
      </motion.div>
    </div>
  );
};

export default Gallery;
