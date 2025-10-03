"use client";
import React from "react";
import Sun from "./ui/Planets/Sun";
import { AnimatedImage } from "./ui/Media_UI/AnimatedImage";
import { useGT } from "gt-next";
import Link from "next/link";
import { T } from "gt-next";

const Footer = () => {
  const t = useGT();
  const menuItems = [
    { label: t("Home"), ariaLabel: t("Go to home page"), link: "/" },
    { label: t("About"), ariaLabel: t("Learn about us"), link: "/about" },
    { label: t("Exams"), ariaLabel: t("View our services"), link: "/exams" },
    { label: t("Contact"), ariaLabel: t("Get in touch"), link: "/contact" },
    { label: t("Settings"), ariaLabel: t("Get in touch"), link: "/setting" },
  ];

  const socialItems = [
    { label: "Twitter", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  return (
    <div className="mt-20 relative min-h-96 flex flex-col lg:flex-row justify-between items-center text-center lg:text-start lg:items-start gap-7 overflow-hidden px-5 lg:px-10 bg-black/50 py-10  ">
      <h3 className="flex justify-center items-center gap-2 w-fit">
        <AnimatedImage
          src="/CupolaGate.jpg"
          alt="Logo"
          className="w-14 h-14 rounded-2xl "
        />
        CupolaGate
      </h3>
      <div>
        <h4>
          <T>Quick Links</T>
        </h4>
        <div className="px-5 flex flex-col gap-3 w-fit mt-5">
          {menuItems.map((item, i) => (
            <Link href={item.link} key={i}>
              <h5 className="text-neutral-500 hover:text-blue-500 hover:translate-x-3 duration-100">
                {item.label}
              </h5>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h4>
          <T>Social Links</T>
        </h4>
        <div className="px-5 flex flex-col gap-3 w-fit mt-5">
          {socialItems.map((item, i) => (
            <Link href={item.link} key={i}>
              <h5 className="text-neutral-500 hover:text-blue-500 hover:translate-x-3 duration-100">
                {item.label}
              </h5>
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-[460px] -right-[460px] -z-10">
        <Sun />
      </div>
    </div>
  );
};

export default Footer;
