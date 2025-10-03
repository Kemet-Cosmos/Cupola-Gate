"use client";
import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export const StarField = () => {
  const stars = useMemo(() => {
    const random = seededRandom(12345);
    // Reduced from 200 to 50 stars
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: random() * 100,
      y: random() * 100,
      size: random() * 2 + 0.5,
      duration: random() * 3 + 2,
      delay: random() * 5,
      opacity: random() * 0.5 + 0.3,
    }));
  }, []);

  return (
    <div className="hidden lg:inline fixed inset-0 overflow-hidden -z-50 bg-gradient-to-bl from-black via-neutral-900 to-neutral-950">
      {stars.map((star: Star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            willChange: 'opacity',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: twinkle infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};