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
        "Wow… Look at that view, Comet! It’s like the planet’s showing off."
      ),
      image: Mis.image,
    },
    {
      id: 2,
      character: Mr.name,
      text: t(
        "Can you blame it? If I looked that good, I’d be showing off too. But hey, this view isn’t just for the aesthetics — we’re actually doing science here!"
      ),
      image: Mr.image,
    },
    {
      id: 3,
      character: Mis.name,
      text: t(
        "Exactly! The ISS is packed with instruments that keep an eye on Earth — from cameras snapping detailed photos to sensors tracking temperature, vegetation, even water stress."
      ),
      image: Mis.image,
    },
    {
      id: 4,
      character: Mr.name,
      text: t(
        "You mean like ECOSTRESS, right? That one’s a genius — it can tell when plants are thirsty just by checking their temperature. Wish it could remind me to drink water though."
      ),
      image: Mr.image,
    },
    {
      id: 5,
      character: Mis.name,
      text: t(
        "Same! But seriously, the data from ECOSTRESS helps farmers use water more efficiently, predict fires, and even find geothermal energy sources. It’s like the Earth’s personal health tracker."
      ),
      image: Mis.image,
    },
    {
      id: 6,
      character: Mr.name,
      text: t(
        "And don’t forget HICO — the Hyperspectral Imager for the Coastal Ocean. It used to take insanely detailed pictures of our oceans. Over 10,000 images, to be exact."
      ),
      image: Mr.image,
    },
    {
      id: 7,
      character: Mis.name,
      text: t(
        "Right! Scientists used HICO’s data to detect harmful algal blooms — those red tides that make the sea toxic for fish and people."
      ),
      image: Mis.image,
    },
    {
      id: 8,
      character: Mr.name,
      text: t(
        "Yeah, the ocean basically turns into a ‘Do Not Swim’ zone. But thanks to HICO, they could detect them early and prevent disasters."
      ),
      image: Mr.image,
    },
    {
      id: 9,
      character: Mis.name,
      text: t(
        "Look here — that’s the Betsiboka estuary in Madagascar. Those bright red waters? That’s soil being washed into the ocean after deforestation. Astronauts said it looks like Madagascar is bleeding into the sea."
      ),
      image: Mis.image,
    },
    {
      id: 10,
      character: Mr.name,
      text: t(
        "That’s both poetic and sad… makes you realize how fragile Earth is."
      ),
      image: Mr.image,
    },
    {
      id: 11,
      character: Mis.name,
      text: t(
        "And here’s another — the aftermath of the 2004 tsunami in Indonesia. Astronauts captured how the coastline changed after the massive earthquake."
      ),
      image: Mis.image,
    },
    {
      id: 12,
      character: Mr.name,
      text: t(
        "Wow. Photos like these aren’t just pictures — they’re stories. Data and emotion in one frame."
      ),
      image: Mr.image,
    },
    {
      id: 13,
      character: Mis.name,
      text: t(
        "Exactly. Even the Amazon’s ‘Meeting of the Waters’ — where the black Rio Negro meets the tan Solimões — shows how much detail we can study from up here."
      ),
      image: Mis.image,
    },
    {
      id: 14,
      character: Mr.name,
      text: t(
        "So basically, we’re watching Earth from space… but not just to admire it. We’re learning how to protect it."
      ),
      image: Mr.image,
    },
    {
      id: 15,
      character: Mis.name,
      text: t(
        "That’s right. Every image, every measurement, helps us understand how our planet is changing — and how we can make smarter choices back home."
      ),
      image: Mis.image,
    },
    {
      id: 16,
      character: Mr.name,
      text: t(
        "Kinda deep for a space view, huh? Anyway, if the ECOSTRESS ever makes a ‘Human Stress’ version, I’m signing up first."
      ),
      image: Mr.image,
    },
    {
      id: 17,
      character: Mis.name,
      text: t("You’d break the sensors, Comet."),
      image: Mis.image,
    },
    {
      id: 18,
      character: Mis.name,
      text: t(
        "So, we’ve explored how the ISS helps us understand Earth — from oceans and forests to cities and rivers. But what about us? What happens to the human body when we leave Earth’s gravity behind?"
      ),
      image: Mis.image,
    },
    {
      id: 19,
      character: Mr.name,
      text: t(
        "Ohhh, you mean we’re going from rocks and rivers to bones and blood? That’s… kind of scary but awesome!"
      ),
      image: Mr.image,
    },
    {
      id: 20,
      character: Mis.name,
      text: t(
        "Exactly! Next stop — Level 4: where we see how space research improves human health — both up there and right here on Earth."
      ),
      image: Mis.image,
    },
  ];

  const questions = [
    {
      id: 1,
      question: t("What is ECOSTRESS used for on the ISS?"),
      options: [
        t("To measure how plants handle heat and water stress"),
        t("To monitor ocean waves"),
        t("To detect asteroids near Earth"),
        t("To measure gravity changes on the Moon"),
      ],
      correct: t("To measure how plants handle heat and water stress"),
    },
    {
      id: 2,
      question: t("What does HICO help scientists detect?"),
      options: [
        t("Harmful algal blooms in the ocean"),
        t("Forest fires in the Amazon"),
        t("Temperature changes in deserts"),
        t("Snow levels in the Arctic"),
      ],
      correct: t("Harmful algal blooms in the ocean"),
    },
    {
      id: 3,
      question: t(
        "What did astronauts observe in the Betsiboka estuary in Madagascar?"
      ),
      options: [
        t("Red-colored waters caused by soil washing into the sea"),
        t("Coral reefs growing rapidly"),
        t("Melting icebergs from Antarctica"),
        t("New volcanic islands forming"),
      ],
      correct: t("Red-colored waters caused by soil washing into the sea"),
    },
    {
      id: 4,
      question: t(
        "How do photos from the ISS help scientists after disasters like tsunamis?"
      ),
      options: [
        t("They show how coastlines and landforms change after major events"),
        t("They measure the temperature of the ocean floor"),
        t("They replace earthquake warning systems"),
        t("They study the Moon’s tides"),
      ],
      correct: t(
        "They show how coastlines and landforms change after major events"
      ),
    },
    {
      id: 5,
      question: t(
        "What’s the overall mission of observing Earth from space on the ISS?"
      ),
      options: [
        t("To understand and protect our planet through continuous observation"),
        t("To prepare for future moon missions"),
        t("To study alien life forms"),
        t("To test new astronaut suits"),
      ],
      correct: t("To understand and protect our planet through continuous observation"),
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
