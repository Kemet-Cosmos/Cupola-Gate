import { useGT } from "gt-next";

  const t = useGT();
  
  export const menuItems = [
    { label: t("Home"), ariaLabel: t("Go to home page"), link: "/" },
    { label: t("About"), ariaLabel: t("Learn about us"), link: "/about" },
    { label: t("Exams"), ariaLabel: t("View our services"), link: "/exams" },
    { label: t("Contact"), ariaLabel: t("Get in touch"), link: "/contact" },
    { label: t("Settings"), ariaLabel: t("Get in touch"), link: "/setting" },
  ];

  export const socialItems = [
    { label: "Twitter", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];
