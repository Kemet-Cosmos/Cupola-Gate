"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedVideoProps {
  src: string;
  className?: string;
  noAnimate?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  poster?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

const AnimatedVideo: React.FC<AnimatedVideoProps> = ({
  src,
  className = "",
  noAnimate = false,
  loop = true,
  autoPlay = true,
  muted = true,
  playsInline = true,
  controls = false,
  poster,
  objectFit = "cover",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "40px" });
  const controlsAnim = useAnimation();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!noAnimate && inView) {
      controlsAnim.start("visible");
    }
  }, [inView, controlsAnim, noAnimate]);
 
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleLoaded = () => {
      setLoading(false);
    };

    if (v.readyState >= 3) {
      setLoading(false);
      return;
    }

    v.addEventListener("loadeddata", handleLoaded);
    v.addEventListener("canplay", handleLoaded);

    return () => {
      v.removeEventListener("loadeddata", handleLoaded);
      v.removeEventListener("canplay", handleLoaded);
    };
  }, [src]);

  const video = src || "/No video found.mp4";

  const videoElement = (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute w-full h-full left-0 top-0 flex flex-col gap-5 justify-center items-center bg-primary dark:bg-third text-2xl z-20"
          >
            <div className="w-20 h-20 inline-block animate-spin rounded-full border-b-2 border-third dark:border-primary"></div>
            Loading...
          </motion.div>
        )}
      </AnimatePresence>

      <video
        ref={videoRef}
        src={video}
        loop={loop}
        autoPlay={autoPlay}
        muted={muted}
        playsInline={playsInline}
        controls={controls}
        poster={poster}
        className={cn("w-full h-full", `object-${objectFit}`)}
      />

      <div className="absolute inset-0 z-10" />
    </>
  );

  if (noAnimate) {
    return (
      <div ref={ref} className={cn("relative overflow-hidden", className)}>
        {videoElement}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controlsAnim}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn("relative overflow-hidden", className)}
    >
      {videoElement}
    </motion.div>
  );
};

export { AnimatedVideo };
