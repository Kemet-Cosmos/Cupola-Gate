"use client";
import { cn } from "@/lib/utils";
import { Play, Pause } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function CustomAudioPlayer({
  src,
  title,
  className,
}: {
  src: string;
  title?: string;
  className?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = (parseFloat(e.target.value) / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const setAudioDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioDuration);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  return (
    <div
      className={cn(
        "w-full max-w-md bg-gradient-to-r from-indigo-600/40 to-purple-600/40 p-5 rounded-2xl shadow-xl flex flex-col gap-3",
        className
      )}
    >
      {/* Controls Row */}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>

        <div className="flex flex-col flex-1">
          <p className="text-sm text-white/90 font-semibold mb-1">
            {title ? title : "Audio Lesson"}
          </p>
          <input
            type="range"
            value={progress}
            onChange={handleSeek}
            className="w-full accent-indigo-400 cursor-pointer"
            min="0"
            max="100"
          />
          <div className="flex justify-between text-xs text-white/80 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={src} preload="metadata"></audio>
    </div>
  );
}
