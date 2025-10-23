"use client";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { AnimatedImage } from "./Media_UI/AnimatedImage";
import { Certificate } from "@/lib/type";
import { Animate, FadeUp, transition, ViewPort } from "@/Animation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";

type CertificateProps = {
  certificate: Certificate;
};

export default function CertificatePDf({ certificate }: CertificateProps) {
  const { user, isLoaded } = useUser();

  const certificateRef = useRef<HTMLDivElement>(null);
  const handleDownload = async () => {
    const element = certificateRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${certificate.fullName}_certificate.pdf`);
  };

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;
    const userId = user.id;
    const certOwner = certificate?.clerkId;
    setShowButton(userId === certOwner);
  }, [isLoaded, user, certificate?.clerkId]);

  return (
    <div className="flex flex-col items-center ">
      <p className="lg:hidden text-center !text-red-600/80">
        For a better experience, please open this site on your computer.
      </p>
      <div className="w-full overflow-x-scroll lg:overflow-hidden">
        <div
          ref={certificateRef}
          className={`relative w-[1250px] h-[760] mx-auto  mt-5 py-32 p-10 flex flex-col justify-center items-center gap-5 text-center overflow-hidden   ${
            certificate.title === "modern" ? "" : " border border-indigo-600 "
          } `}
        >
          {certificate.title === "modern" ? (
            <>
              <AnimatedImage
                src="/certificates/Static_modern.png"
                alt="BG"
                noAnimate
                className="absolute top-0 left-0 w-full h-full -z-10"
              />
              <div className="absolute top-8 left-8 flex items-center justify-center">
                <div className="absolute top-2/4 left-2/4 -translate-2/4 shadow-2xl w-20 h-20 bg-white shadow-white rounded-full" />
                <AnimatedImage
                  src="/Logo.png"
                  alt="logo"
                  noAnimate
                  icon
                  className="w-20 h-20"
                />
              </div>
              <h3 className="!font-medium mb-3">
                This certificate is proudly present to
              </h3>
              <h1 className="text-yellow-300 mb-5">{certificate.fullName}</h1>
              <div className="max-w-3xl text-center">
                <p>
                  for successfully completing all exploration stages of
                  CupolaGate
                </p>
                <p>
                  Your curiosity, effort, and persistence have brought you to
                  the edge of discovery, Keep reaching for the stars!
                </p>
              </div>
            </>
          ) : (
            <>
              <AnimatedImage
                src="/certificates/Static_Classic.png"
                alt="BG"
                noAnimate
                className="absolute top-0 left-0 w-full h-full -z-10"
              />
              <div className="absolute top-8 left-8 flex items-center justify-center ">
                <div className="absolute top-2/4 left-2/4 -translate-2/4 w-20 h-20 bg-white rounded-full " />
                <AnimatedImage
                  src="/Logo.png"
                  alt="logo"
                  noAnimate
                  icon
                  className="w-20 h-20"
                />
              </div>
              <h3 className="!font-light mb-3 py-4 px-5 bg-neutral-500 rounded-4xl z-10">
                certificate of Achievement
              </h3>
              <p className="!font-medium mb-3 z-10">
                This certificate is proudly presented to
              </p>
              <h1 className="text-[#ffda6a] mb-5 z-10">
                {certificate.fullName}
              </h1>
              <div className="max-w-3xl text-center z-10">
                <p>
                  for successfully completing all exploration stages of{" "}
                  <span className="mark"> CupolaGate </span>
                </p>
                <p>
                  Your curiosity, effort, and persistence have brought you to
                  the edge of discovery, Keep reaching for the stars!
                </p>
                <div className="absolute bottom-10 left-10 flex justify-center items-center gap-2 font-semibold">
                  <span className="text-xl ">Awarded By</span> :{" "}
                  <span className="text-[#ffda6a] border-b">Kemet Cosmos</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <AnimatePresence>
        {showButton && (
          <motion.button
            {...FadeUp}
            {...Animate}
            {...transition}
            onClick={handleDownload}
            className="mt-6 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Download PDF
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
