import React from "react";
import { useGT } from "gt-next";
import DialogueAnimation from "@/components/Scane";
export default function Page() {
  const t = useGT();
  const Mis = { name: t("Miss Star"), image: "/MissStar.jpg" };
  const Mr = { name: t("Mr Comet"), image: "/MsComet.png" };

  const dialogues = [
    {
      id: 1,
      character: Mis.name,
      text: t(
        "Welcome to Level 1: Cupola’s Role in Natural Disasters.The Cupola isn’t just a pretty window in space — it’s like a space lookout tower that helps people on Earth. Let’s see how it worked during Hurricane Harvey in 2017."
      ),
      image: Mis.image,
    },
    {
      id: 2,
      character: Mis.name,
      text: t(
        " When scientists saw Hurricane Harvey getting stronger, they asked the astronauts on the ISS to take pictures of it. "
      ),
      image: Mis.image,
    },
    {
      id: 3,
      character: Mr.name,
      text: t("  Like: “Quick! Point the camera at that giant storm!” "),
      image: Mr.image,
    },
    {
      id: 4,
      character: Mis.name,
      text: t(
        "Astronaut Jack Fischer went into the Cupola, opened the shutters, and put a special camera on a tracker that keeps it steady while the ISS moves.  "
      ),
      image: Mis.image,
    },
    {
      id: 5,
      character: Mr.name,
      text: t("It’s like the strongest tripod ever — but in space! "),
      image: Mr.image,
    },
    {
      id: 6,
      character: Mis.name,
      text: t(
        " He used a zoom lens to capture the hurricane’s eye and clouds. These photos went into NASA’s big photo collection of Earth. "
      ),
      image: Mis.image,
    },
    {
      id: 7,
      character: Mis.name,
      text: t(
        "The pictures were sent to NASA on Earth. Experts checked them and added location info before sharing with rescue teams."
      ),
      image: Mis.image,
    },
    {
      id: 8,
      character: Mis.name,
      text: t(
        " By mixing Cupola photos with satellite data, scientists made flood maps. These maps showed rescue teams where to go and which roads to close. "
      ),
      image: Mis.image,
    },
    {
      id: 9,
      character: Mr.name,
      text: t(
        "So… space photos helped save lives on Earth. That’s awesome teamwork!  "
      ),
      image: Mr.image,
    },
    {
      id: 10,
      character: Mis.name,
      text: t(
        "And that’s how the Cupola helps us respond to natural disasters.   "
      ),
      image: Mis.image,
    },
  ];
  const questions = [
    {
      id: 1,
      question: t(
        "What is the main role of the Cupola in natural disaster monitoring?"
      ),
      options: [
        t("Acting as a lookout to observe natural disasters on Earth"),
        t("Measuring temperatures on other planets"),
        t("Testing new space cameras"),
        t("Tracking stars in the galaxy"),
      ],
      correct: t("Acting as a lookout to observe natural disasters on Earth"),
    },
    {
      id: 2,
      question: t("How do astronauts use the Cupola during natural disasters?"),
      options: [
        t("Taking pictures of disasters to send to scientists"),
        t("Building weather satellites"),
        t("Studying moon craters"),
        t("Monitoring space station orbits"),
      ],
      correct: t("Taking pictures of disasters to send to scientists"),
    },
    {
      id: 3,
      question: t(
        "What equipment helps astronauts in the Cupola capture disaster images?"
      ),
      options: [
        t("Using a special camera and tracker to capture steady images"),
        t("Using a telescope to view distant storms"),
        t("Operating a robotic arm for photos"),
        t("Measuring wind speeds with sensors"),
      ],
      correct: t("Using a special camera and tracker to capture steady images"),
    },
    {
      id: 4,
      question: t(
        "What do astronauts photograph from the Cupola during disasters?"
      ),
      options: [
        t("Features of disasters like storm clouds and hurricane eyes"),
        t("Stars and constellations"),
        t("Ocean currents"),
        t("Space station components"),
      ],
      correct: t("Features of disasters like storm clouds and hurricane eyes"),
    },
    {
      id: 5,
      question: t("What happens to Cupola photos after they are taken?"),
      options: [
        t(
          "They are sent to Earth for experts to analyze and add location data"
        ),
        t("They are stored on the ISS for astronauts"),
        t("They are used to navigate the ISS"),
        t("They are shared with other planets"),
      ],
      correct: t(
        "They are sent to Earth for experts to analyze and add location data"
      ),
    },
  ];

  return (
    <section>
      <DialogueAnimation
        dialogues={dialogues}
        link="/levels"
        questions={questions}
      />
    </section>
  );
}
