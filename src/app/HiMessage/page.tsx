import DialogueAnimation from "@/components/Scane";
import React from "react";
import { useGT } from "gt-next";
const page = () => {
  const t = useGT();
  const dialogues = [
    {
      id: 1,
      character: t("Miss Star"),
      text: t(
        "Hello, explorer. I’m Miss Star. I’m here to guide you through the science and facts behind the Cupola. Think of me as your calm instructor from orbit.  "
      ),
      image: "/MissStar.jpg",
    },
    {
      id: 2,
      character: t("Mr Comet"),
      text: t(
        "And I'm Mr. Comet! Always curious, full of questions, and ready to explore with you"
      ),
      image: "/MSComet.jpg",
    },
    {
      id: 3,
      character: t("Miss Star"),
      text: t(
        "Together, we’ll take you on a journey through the Cupola’s many roles."
      ),
      image: "/MissStar.jpg",
    },
  ];
  return (
    <div>
      <DialogueAnimation dialogues={dialogues} link="/levels" />
    </div>
  );
};

export default page;
