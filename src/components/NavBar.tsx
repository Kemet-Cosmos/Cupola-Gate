"use client";
import React from "react";
import StaggeredMenu from "./ui/Bite/StaggeredMenu";
import { useGT } from "gt-next";
import { useDetectLanguage } from "@/Hook/Language";

const NavBar = () => {
  const t = useGT();
  const menuItems = [
    { label: t("Home"), ariaLabel: t("Go to home page"), link: "/" },
    { label: t("About"), ariaLabel: t("Learn about us"), link: "/about" },
    { label: t("Levels"), ariaLabel: t("View our services"), link: "/levels" },
    { label: t("Contact"), ariaLabel: t("Get in touch"), link: "/contact" },
    { label: t("Chat Bot"), ariaLabel: t("Get in touch"), link: "/Chat" },
  ];

  const socialItems = [
    { label: "Twitter", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  // for fix Dir Issue
  const translate = useGT();
  const translatedString = translate("Hello, world!");
  const dir = useDetectLanguage(translatedString);
  // end

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <StaggeredMenu
        position={dir === "ar" ? "left" : "right"}
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="black"
        changeMenuColorOnOpen={true}
        colors={["#B19EEF", "#5227FF"]}
        logoUrl="/CupolaGate.jpg"
        accentColor="blue"
        // onMenuOpen={() => console.log("Menu opened")}
        // onMenuClose={() => console.log("Menu closed")}
      />
    </div>
  );
};

export default NavBar;
