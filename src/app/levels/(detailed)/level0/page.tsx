import React from "react";
import { useGT } from "gt-next";
import DialogueAnimation from "@/components/Scane";
export default function Page() {
  const t = useGT();
  const Mis = { name: t("Miss Star"), image: "/MissStar.jpg" };
  const Mr = { name: t("Mr Comet"), image: "/MSComet.jpg" };

  const dialogues = [
    {
      id: 1,
      character: Mis.name,
      text: t(
        "Welcome to CupolaGate , the starting point of our journey. Before we explore disasters, climate, and science, let’s take a closer look at what the Cupola actually is, and why it’s so important to the International Space Station."
      ),
      image: Mis.image,
    },
    {
      id: 2,
      character: Mr.name,
      text: t(
        "So basically, this is the “fancy space balcony,” right? With better Wi-Fi and worse neighbors. "
      ),
      image: Mr.image,
    },
    {
      id: 3,
      character: Mis.name,
      text: t(
        "  Not exactly. The Cupola is a dome-shaped module, about three meters wide and one and a half meters tall, attached to the Tranquility module. It’s built from forged aluminum and weighs almost 1.8 tons. Its design allows astronauts to see outside the station with unmatched clarity."
      ),
      image: Mis.image,
      slideImage: "/Levels/Cupola.jpeg",
    },
    {
      id: 4,
      character: Mr.name,
      text: t(
        "And by “clarity,” she means: seven windows, six around the sides and one giant circular window, the biggest ever flown in space. Perfect for… selfies.  "
      ),
      image: Mr.image,
    },
    {
      id: 4,
      character: Mis.name,
      text: t(
        "Those windows are not just for beauty. They’re made of fused silica glass with multiple protective layers. Each one has shutters to guard against micrometeoroids and debris. Through these windows, astronauts can monitor spacecraft docking, control robotic operations, and observe Earth.  "
      ),
      image: Mis.image,
      slideImage: "/Levels/Cupola.jpeg",
    },
    {
      id: 5,
      character: Mr.name,
      text: t("Or, you know… check if aliens parked in the wrong orbit.   "),
      image: Mr.image,
    },
    {
      id: 6,
      character: Mis.name,
      text: t(
        "Inside, the Cupola houses the Robotic Work Station, where astronauts control the Canadarm2 robotic arm. This makes it the main hub for docking, cargo transfers, and spacewalk support. It also includes ventilation, thermal control, communications, and alarm systems, ensuring safety and habitability.  "
      ),
      image: Mis.image,
      slideImage: "/Levels/Computers.jpg",
    },
    {
      id: 7,
      character: Mr.name,
      text: t(
        "Translation: it’s not just a window. It’s like Mission Control with a view.  "
      ),
      image: Mr.image,
    },
    {
      id: 8,
      character: Mis.name,
      text: t(
        "Exactly. And its connection with Node 3, Tranquility, is essential. Tranquility provides the life support, power, and utilities the Cupola depends on. Together, they create a safe and functional environment for both work and crew well-being. "
      ),
      image: Mis.image,
    },
    {
      id: 9,
      character: Mr.name,
      text: t(
        "So Tranquility is like the house… and the Cupola is the sunroom. Except instead of looking at your backyard, you’re looking at… all of planet Earth.  "
      ),
      image: Mr.image,
    },
    {
      id: 10,
      character: Mis.name,
      text: t(
        "Yes. The Cupola is more than architecture. It is the eyes of the ISS, merging engineering, science, and human experience in space.  "
      ),
      image: Mis.image,
    },
    {
      id: 11,
      character: Mr.name,
      text: t("Basically… the universe’s most expensive window seat. "),
      image: Mr.image,
    },
    {
      id: 12,
      character: Mis.name,
      text: t(
        "Now that we understand what the Cupola is and why it matters, let’s see how this unique module is put into action."
      ),
      image: Mis.image,
    },
    {
      id: 13,
      character: Mr.name,
      text: t("Action? Like space-movie action? Do we get explosions? "),
      image: Mr.image,
    },
    {
      id: 14,
      character: Mis.name,
      text: t(
        "Now that we understand what the Cupola is and why it matters, let’s see how this unique module is put into action. "
      ),
      image: Mis.image,
    },
    {
      id: 15,
      character: Mr.name,
      text: t("Action? Like space-movie action? Do we get explosions? "),
      image: Mr.image,
    },
    {
      id: 16,
      character: Mis.name,
      text: t(
        "No explosions. But real challenges: natural disasters, climate change, Earth science, and even astronaut health. Each level will show us how the Cupola helps. "
      ),
      image: Mis.image,
    },
    {
      id: 17,
      character: Mr.name,
      text: t("So basically… we’re about to unlock the Cupola’s superpowers."),
      image: Mr.image,
    },
    {
      id: 18,
      character: Mis.name,
      text: t(
        "Exactly. Let’s begin with Level 1: the Cupola’s role in natural disasters. "
      ),
      image: Mis.image,
    },
  ];
  return (
    <section>
      <DialogueAnimation dialogues={dialogues} link="/levels" />
    </section>
  );
}
