"use client";
import React from "react";
import DialogueAnimation from "@/components/Scane";

export default function Level4Page() {
  const dialogues = [
    {
      id: 1,
      character: "Miss Star",
      text: "Welcome to Level 4 — Cupola’s Role in Healthcare and Social Benefits. The International Space Station isn’t just about looking down at Earth — it’s also about looking within ourselves. Microgravity gives us a chance to study how the human body and even tiny cells behave when gravity no longer dominates.",
      image: "/characters/miss-star.png",
    },
    {
      id: 2,
      character: "Mr. Comet",
      text: "So basically, the ISS is like a floating biology lab… where the scientists and the test subjects float too?",
      image: "/characters/mr-comet.png",
    },
    {
      id: 3,
      character: "Miss Star",
      text: "That’s right. In microgravity, things act very differently — muscles shrink, bones lose density, wounds heal slower, and the immune system changes. By studying these effects, researchers can better understand diseases like osteoporosis, heart problems, and aging itself.",
      image: "/characters/miss-star.png",
      slideImage: "/slides/level4-biology.jpg",
    },
    {
      id: 4,
      character: "Mr. Comet",
      text: "So, astronauts come back as “younger scientists” but with “older bones”? That’s… poetic and painful.",
      image: "/characters/mr-comet.png",
    },
    {
      id: 5,
      character: "Miss Star",
      text: "The ISS National Lab also helps researchers tackle cancer. In space, companies like Angiex test new cancer therapies by studying how blood vessel cells grow without gravity. Other experiments crystallize proteins and culture stem cells — helping scientists design better medicines with fewer side effects.",
      image: "/characters/miss-star.png",
      slideImage: "/slides/level4-cancer.jpg",
    },
    {
      id: 6,
      character: "Mr. Comet",
      text: "So microgravity isn’t just good for astronauts — it’s giving our doctors “superpowers” in research. Gravity who? We’re healing in zero G!",
      image: "/characters/mr-comet.png",
    },
    {
      id: 7,
      character: "Miss Star",
      text: "Microgravity can also mimic aging. In just months, astronauts experience effects similar to years of aging on Earth — like weaker bones or slower recovery. This lets scientists test treatments much faster, safely, and more effectively.",
      image: "/characters/miss-star.png",
    },
    {
      id: 8,
      character: "Mr. Comet",
      text: "Wait, so space is basically a “fast-forward” button for science? That’s actually genius!",
      image: "/characters/mr-comet.png",
    },
    {
      id: 9,
      character: "Miss Star",
      text: "Even at the microscopic level, space reveals surprises. Microgravity changes how genes behave — in humans, plants, even bacteria. These gene-expression studies could unlock new ways to treat diseases, grow crops, and understand how life adapts.",
      image: "/characters/miss-star.png",
      slideImage: "/slides/level4-genes.jpg",
    },
    {
      id: 10,
      character: "Mr. Comet",
      text: "So we’re not just exploring space — we’re exploring ourselves, molecule by molecule. That’s wild.",
      image: "/characters/mr-comet.png",
    },
    {
      id: 11,
      character: "Miss Star",
      text: "All this research doesn’t just help astronauts. It benefits everyone. The ISS advances medicine, improves food production, supports education, and inspires global cooperation.",
      image: "/characters/miss-star.png",
    },
    {
      id: 12,
      character: "Mr. Comet",
      text: "So, in a way, every experiment up there — is a promise down here.",
      image: "/characters/mr-comet.png",
    },
    {
      id: 13,
      character: "Miss Star",
      text: "Exactly. The Cupola reminds us that space exploration is not just about reaching the stars — it’s about understanding life on Earth, and improving it for all.",
      image: "/characters/miss-star.png",
    },
    {
      id: 14,
      character: "Miss Star",
      text: "And that brings us to the end of your journey through the Cupola — from disaster response, to climate science, to Earth observation, and now, to human health.",
      image: "/characters/miss-star.png",
    },
    {
      id: 15,
      character: "Mr. Comet",
      text: "You’ve officially floated through every level — smarter, braver, and probably a bit dizzy from all that space knowledge!",
      image: "/characters/mr-comet.png",
    },
    {
      id: 16,
      character: "Miss Star",
      text: "You’ve seen how the International Space Station connects space and life on Earth in ways few people ever experience.",
      image: "/characters/miss-star.png",
    },
    {
      id: 17,
      character: "Mr. Comet",
      text: "And guess what? You’ve earned it — your Cupola Explorer Certificate! Proof that curiosity really is the best kind of gravity.",
      image: "/characters/mr-comet.png",
    },
    {
      id: 18,
      character: "Miss Star",
      text: "Congratulations — and remember: the more we look outward, the more we understand our home. See you among the stars.",
      image: "/characters/miss-star.png",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white flex items-center justify-center p-8">
      <DialogueAnimation
        dialogues={dialogues}
        link="/levels"
        scanBadge="Level_4"
        QuestionsBadge="Q_Level_4"
      />
    </section>
  );
}
