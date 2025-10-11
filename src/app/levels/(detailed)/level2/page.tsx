"use client";
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
        "Welcome to Level 2: Cupola’s Role in Climate Change Monitoring! The Cupola isn’t only for taking pretty pictures — it’s part of a big science mission. From the International Space Station, astronauts and instruments work together to study how our planet’s climate is changing over time."
      ),
      image: Mis.image,
    },
    {
      id: 2,
      character: Mr.name,
      text: t("Wait — so the ISS is like a floating weather station?"),
      image: Mr.image,
    },
    {
      id: 3,
      character: Mis.name,
      text: t(
        "Almost! But it studies much more than weather. Weather tells us what’s happening right now — like “Will it rain today?” Climate shows us what’s been happening for decades or centuries — how Earth’s atmosphere behaves over time. That’s why the ISS, with more than 20 years in orbit, is perfect for collecting long-term data."
      ),
      image: Mis.image,
    },
    {
      id: 4,
      character: Mr.name,
      text: t(
        "So, it’s basically Earth’s diary from space — writing down everything the planet’s been through!"
      ),
      image: Mr.image,
    },
    {
      id: 5,
      character: Mis.name,
      text: t(
        "Outside the station, there are instruments watching Earth all the time. Each one studies something special: ECOSTRESS looks at how plants deal with heat and water. GEDI maps forests in 3D to measure how much carbon they store. OCO-3 measures carbon dioxide in the air. DESIS, TSIS-1, and HISUI study sunlight, surface colors, and environmental changes."
      ),
      image: Mis.image,
    },
    {
      id: 6,
      character: Mr.name,
      text: t(
        "So it’s like the ISS has super-sensors — scanning Earth like a doctor checking temperature, heartbeat, and blood pressure!"
      ),
      image: Mr.image,
    },
    {
      id: 7,
      character: Mis.name,
      text: t(
        "Dr. Annmarie Eldering from NASA explained that gases like ozone or water vapor are easy to detect, but carbon dioxide changes very little — sometimes by less than one part per million! That’s why OCO-3’s precision is so important."
      ),
      image: Mis.image,
    },
    {
      id: 8,
      character: Mr.name,
      text: t(
        "So CO₂ is the quiet one in the class — doesn’t make much noise, but causes big changes."
      ),
      image: Mr.image,
    },
    {
      id: 9,
      character: Mis.name,
      text: t(
        "Scientists from the University of California used the ISS to study sediment — tiny bits of dirt — and how they stick together in microgravity. That helps model rivers, ocean currents, and even how carbon moves through the planet."
      ),
      image: Mis.image,
    },
    {
      id: 10,
      character: Mr.name,
      text: t(
        "Wow, so even dirt gets to go to space! Space VIP dirt helping save the planet!"
      ),
      image: Mr.image,
    },
    {
      id: 11,
      character: Mis.name,
      text: t(
        "Astronauts also take photos that help scientists understand climate on Earth — like Perth, Australia showing dry summers and green winters, or Pyramid Lake, Nevada showing how climate changes over time."
      ),
      image: Mis.image,
    },
    {
      id: 12,
      character: Mr.name,
      text: t(
        "So, Perth shows life in a hot summer… and Pyramid Lake shows what happens when a lake goes on a climate diet!"
      ),
      image: Mr.image,
    },
    {
      id: 13,
      character: Mis.name,
      text: t(
        "Next stop — Level 4: where we see how space research improves human health — both up there and right here on Earth."
      ),
      image: Mis.image,
    },
  ];

  const questions = [
    {
      id: 1,
      question: t(
        "What is the main role of the Cupola and the ISS in climate change research?"
      ),
      options: [
        t("To collect long-term data about Earth's climate and environment"),
        t("To track asteroids near Earth"),
        t("To test rockets and satellites"),
        t("To study the Moon’s atmosphere"),
      ],
      correct: t(
        "To collect long-term data about Earth's climate and environment"
      ),
    },
    {
      id: 2,
      question: t("Which instrument studies how plants handle heat and water?"),
      options: [t("ECOSTRESS"), t("OCO-3"), t("GEDI"), t("TSIS-1")],
      correct: t("ECOSTRESS"),
    },
    {
      id: 3,
      question: t("What makes OCO-3 so important for climate monitoring?"),
      options: [
        t("It precisely measures carbon dioxide in the atmosphere"),
        t("It captures 3D images of forests"),
        t("It detects underwater currents"),
        t("It measures wind speed on the ISS"),
      ],
      correct: t("It precisely measures carbon dioxide in the atmosphere"),
    },
    {
      id: 4,
      question: t(
        "Why do scientists study sediment (tiny dirt particles) on the ISS?"
      ),
      options: [
        t("To understand how particles stick and move in rivers and oceans"),
        t("To test how soil grows in space farms"),
        t("To find new minerals on the Moon"),
        t("To clean up pollution from space debris"),
      ],
      correct: t(
        "To understand how particles stick and move in rivers and oceans"
      ),
    },
    {
      id: 5,
      question: t(
        "How do astronaut photos from the ISS help climate scientists?"
      ),
      options: [
        t(
          "They show real examples of environmental change, like shrinking lakes and wildfires"
        ),
        t("They are used only for public outreach"),
        t("They replace satellite images completely"),
        t("They help astronauts train for photography contests"),
      ],
      correct: t(
        "They show real examples of environmental change, like shrinking lakes and wildfires"
      ),
    },
  ];

  return (
    <section>
      <DialogueAnimation
        dialogues={dialogues}
        link="/levels"
        QuestionsBadge="Q_Level_2"
        scanBadge="Level_2"
        questions={questions}
      />
    </section>
  );
}
