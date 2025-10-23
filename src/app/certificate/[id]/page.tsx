"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CertificatePage } from "@/lib/type";
import axios from "axios";
import { Animate, FadeUp, opacity, transition } from "@/Animation";
import BadgeList from "@/components/Badges/BadgeList";
import { AnimatedImage } from "@/components/ui/Media_UI/AnimatedImage";
import Link from "next/link";
import { useGT } from "gt-next";
import Button from "@/components/ui/Button";
import Earth from "@/components/ui/Planets/Earth";
import { CalendarDays } from "lucide-react";
import { formatDate } from "@/Hook/Date";
import CertificatePDf from "@/components/ui/Certificate";

export default function Page() {
  const params = useParams();
  const t = useGT();
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<CertificatePage>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params?.id) {
      setId(params.id as string);
    }
  }, [params]);
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/certificate/byId?id=${id}`);
        setData(res.data);
      } catch (err: any) {
        const message =
          err.response?.data.message ||
          err.message ||
          "Unexpected error fetching certificate";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (error)
    return (
      <section className="flex flex-col justify-center items-center">
        <motion.h1
          {...FadeUp}
          {...Animate}
          {...transition}
          className="absolute top-2/4 left-2/4 -translate-2/4 !text-[30vw] text-indigo-600/25"
        >
          Error
        </motion.h1>
        <motion.h1
          {...FadeUp}
          {...Animate}
          transition={{ ...transition.transition, delay: 0.3 }}
        >
          certificate <span className="mark"> not Found </span>
        </motion.h1>
        <motion.p
          {...FadeUp}
          {...Animate}
          transition={{ ...transition.transition, delay: 0.6 }}
        >
          go to home page or just contact us and tell us what happened
        </motion.p>
        <div className="flex justify-center items-center gap-5 my-5">
          {[
            { title: `${t("Home Page")}`, href: "/" },
            { title: `${t("Contact Us")}`, href: "/contact" },
          ].map((item) => (
            <motion.div
              key={item.title}
              {...FadeUp}
              {...Animate}
              transition={{ ...transition.transition, delay: 0.9 }}
            >
              <Button text={item.title} url={item.href} />
            </motion.div>
          ))}
        </div>
      </section>
    );
  if (loading || !data)
    return (
      <section className="py-24 flex flex-col   px-5 text-center">
        <div className="w-52 h-20 bg-neutral-900 animate-pulse rounded-2xl mx-auto"></div>
        <div className="w-72 h-10 mt-5 bg-neutral-900 animate-pulse rounded-2xl mx-auto"></div>
        <div className="grid grid-cols-1  w-full mt-10 mx-auto">
          <div className="w-full h-96 bg-neutral-900 animate-pulse rounded-2xl"></div>
        </div>
      </section>
    );
  return (
    <section className="mt-24">
      <h3 className="text-center">
        Certificate from{" "}
        <Link
          href="/team"
          className="mark hover:border-b-2 border-indigo-600 duration-100"
        >
          {" "}
          Kemet Cosmos
        </Link>
      </h3>
      {/* certification */}
      <div className={`relative w-full  mt-10 text-center overflow-hidden `}>
        <CertificatePDf certificate={data.Certificate} />
      </div>

      <section className="space-y-5 mt-10">
        <h3 className="flex flex-wrap items-end gap-3">
          <span className="mark">{data.Certificate.fullName} </span> Badges
          <div className="flex items-center gap-2 text-sm text-gray-300 mt-2">
            <CalendarDays className="w-4 h-4 text-blue-400" />
            <p className="!text-lg ">
              <span className="font-medium text-white">
                {formatDate(data.Certificate.startedIn)}
              </span>{" "}
              –{" "}
              <span className="font-medium text-white">
                {formatDate(data.Certificate.endedIn)}
              </span>
            </p>
          </div>
        </h3>
        <p className="!text-xl">
          These badges represent milestones achieved by{" "}
          <span className="font-semibold text-white">
            {data.Certificate.fullName}
          </span>{" "}
          throughout their learning journey on{" "}
          <Link
            href={"/about"}
            className="mark hover:border-b border-indigo-600"
          >
            CupolaGate
          </Link>
          . Each badge marks a completed stage, reflecting dedication,
          curiosity, and continuous growth.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <BadgeList badges={data.badges} variant="large" />
        </div>
      </section>
    </section>
  );
}
