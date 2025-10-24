"use client";
import { GoTopScreen } from "@/Hook/GoTopScreen";
import { T } from "gt-next";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AnimatedImage } from "@/components/ui/Media_UI/AnimatedImage";
import { Crown, Eye } from "lucide-react";
import { useGT } from "gt-next";
import { Animate, FadeUp, opacity, transition } from "@/Animation";
import { useUser } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import { Badge, Certificate } from "@/lib/type";
import axios from "axios";
import { getTotalBadges } from "@/config/badgeConfig";

export default function Page() {
  const t = useGT();
  const { user } = useUser();
  const route = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [exists, setExists] = useState<Certificate | null>(null);
  const [badgeExists, setBadgeExists] = useState<Badge[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [badgeLoading, setBadgeLoading] = useState<boolean>(true);

  const [sending, setSending] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [data, setData] = useState<Certificate | null>(null);
  const [show, setShow] = useState<string | null>(null);

  const TotalBadges = badgeExists.length;
  const TotalAllBadges = getTotalBadges();
  const Certificate = TotalAllBadges === TotalBadges ? true : false;

  const certificates = [
    {
      id: "classic",
      src: "/certificates/classic_Image.png",
      label: t("Classic Design"),
    },
    {
      id: "modern",
      src: "/certificates/Modern_Image.png",
      label: t("Modern Design"),
    },
  ];

  const checkCertificate = async () => {
    try {
      const res = await axios.get(`/api/certificate`);
      setExists(res.data);
      setLoading(true);
      return route.push(`/certificate/${res.data._id}`);
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(
        `Error checking Certificate:${error.response?.data.message}`
      );
    }
  };

  const checkBadge = async () => {
    try {
      const res = await axios.get(`/api/badge`);
      setBadgeExists(res.data);
    } catch (error: any) {
      setErrorMessage(`Error checking Badge:${error.response?.data.message}`);
    }
  };

  useEffect(() => {
    GoTopScreen();
    checkCertificate();
    checkBadge();
  }, []);

  useEffect(() => {
    if (exists) {
      return route.push(`/certificate/${exists._id}`);
    } else if (!Certificate) {
      return route.push("/");
    } else {
      setBadgeLoading(false);
    }
  }, [Certificate, exists]);

  const SubmitHandler = async () => {
    setSending(true);
    try {
      const response = await fetch("/api/certificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: selected }),
      });
      const data = await response.json();
      setSending(false);
      if (data.error) {
        setSending(false);
        return setErrorMessage(
          t("some thing happened while submitting , please true again later")
        );
      }
      setSuccess(true);
      setData(data);
    } catch (error) {
      console.error("Error :", error);
      setSending(false);
    }
  };

  const showCertificate = () => {
    if (!success) return;
    if (!data) return;
    route.push(`/certificate/${data._id}`);
  };
  if (loading || !user || badgeLoading)
    return (
      <section className="py-24 flex flex-col items-center justify-start px-5 text-center">
        <motion.div
          {...FadeUp}
          {...Animate}
          {...transition}
          className="w-60 h-15 bg-neutral-900 animate-pulse rounded-2xl"
        ></motion.div>
        <motion.div
          {...FadeUp}
          {...Animate}
          {...transition}
          className="w-72 h-10 mt-5 bg-neutral-900 animate-pulse rounded-2xl"
        ></motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-2xl lg:max-w-6xl w-full mt-10">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              {...FadeUp}
              {...Animate}
              transition={{ ...transition.transition }}
              className="w-full h-96 bg-neutral-900 animate-pulse rounded-2xl"
            ></motion.div>
          ))}
        </div>
      </section>
    );
  if (sending)
    return (
      <section className="flex flex-col justify-center items-center animate-pulse">
        <motion.h1 {...FadeUp} {...Animate} {...transition} className="mb-3">
          <T>Submitting .....</T>
        </motion.h1>
        <motion.p {...FadeUp} {...Animate} {...transition}>
          <T>its might take long time or less</T>{" "}
        </motion.p>
      </section>
    );
  return (
    <section className="py-24 flex flex-col items-center justify-start px-5 text-center">
      <motion.h1 {...FadeUp} {...Animate} {...transition} className="mark mb-2">
        <T>Certificate</T>
      </motion.h1>
      <motion.p
        {...FadeUp}
        {...Animate}
        transition={{ ...transition.transition, delay: 0.25 }}
        className="!text-white/80 mb-10 text-lg"
      >
        <T>
          Choose your{" "}
          <span className="text-indigo-400 font-semibold">
            certificate design
          </span>
        </T>
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-2xl lg:max-w-6xl w-full">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            {...FadeUp}
            {...Animate}
            transition={{ ...transition.transition, delay: 0.56 }}
            whileTap={{ scale: 0.97 }}
            className={`relative cursor-pointer rounded-2xl overflow-hidden border-4 transition-all ${
              selected === cert.id
                ? "border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                : "border-transparent hover:border-white/40"
            }`}
            onClick={() => setSelected(cert.id)}
          >
            <button
              title={t("View Page")}
              onClick={() => setShow(cert.src)}
              className="absolute right-0 top-0 p-3 bg-indigo-600 hover:bg-indigo-400 rounded-bl-2xl duration-100 z-20"
            >
              <Eye size={35} />
            </button>
            <AnimatedImage
              src={cert.src}
              alt={cert.label}
              noAnimate
              className="object-cover w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-3 text-white font-semibold">
              {cert.label}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.button
            onClick={SubmitHandler}
            className="mt-10 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl text-white font-semibold tracking-wide transition"
          >
            <T>Continue with </T>{" "}
            {selected === "classic" ? t("Classic Design") : t("Modern Design")}
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {show && (
          <motion.div
            {...opacity}
            {...Animate}
            {...transition}
            className="fixed top-0 left-0 w-full h-screen p-5 bg-black/80 flex justify-center items-center z-40"
          >
            <div
              onClick={() => setShow(null)}
              className="absolute top-0 left-0 w-full h-full z-10"
            />
            <AnimatedImage
              src={show}
              alt="Image"
              className="z-20 border border-indigo-600"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {success && (
          <motion.div
            {...opacity}
            {...Animate}
            {...transition}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-3xl shadow-2xl w-[90%] max-w-md text-center border border-white/20"
            >
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 8 }}
                  className="bg-white/20 p-4 rounded-full shadow-inner text-yellow-300"
                >
                  <Crown size={35} />
                </motion.div>

                <h1 className="!text-2xl font-bold tracking-wide">
                  <T>Congratulations!</T>
                </h1>

                <p className="!text-white/80 !text-sm leading-relaxed">
                  <T>
                    Congratulations on earning your{" "}
                    <span className="text-yellow-300 font-semibold">
                      Certificate!
                    </span>{" "}
                    Your dedication and effort truly paid off. this milestone
                    marks the beginning of even greater achievements ahead
                  </T>
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl text-sm font-semibold tracking-wide transition"
                  onClick={showCertificate}
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// <div className="w-2xl grid grid-cols-1  my-10">
//         <motion.h3
//           {...FadeUp}
//           {...ViewPort}
//           {...transition}
//           className="mt-10 mb-5 mark"
//         >
//           <T>certificate details</T>
//         </motion.h3>
//         <motion.p
//           {...FadeUp}
//           {...ViewPort}
//           {...transition}
//           className="mb-4 flex items-center justify-center gap-3"
//         >
//           <T>edit your Name and see how certificate will look like</T>
//         </motion.p>
//         <motion.p
//           {...FadeUp}
//           {...ViewPort}
//           {...transition}
//           className="mb-10 flex items-center justify-center gap-3 !text-xl !text-red-600/70"
//         >
//           <T>
//             <TriangleAlert />
//             you cant edit this after get certificate
//           </T>
//         </motion.p>
//         <motion.div {...FadeUp} {...ViewPort} {...transition}>
//           <label className="block text-start text-sm font-medium mb-2 text-slate-300">
//             <T>Name</T> <span className="text-red-400">*</span>
//           </label>
//           <motion.input
//             whileFocus={{ scale: 1.01 }}
//             type="text"
//             value={name}
//             onChange={(e) => {
//               setName(e.target.value);
//             }}
//             required
//             className={`w-full p-3.5 rounded-xl  border border-white/10 outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all `}
//             placeholder={t("Enter your name")}
//           />
//           {isSignedIn && (
//             <p className="!text-xs mt-1.5 flex items-center gap-1">
//               <Lock size={16} />
//               <T>Taken from your account — You Can edit it </T>
//             </p>
//           )}
//         </motion.div>
//       </div>
