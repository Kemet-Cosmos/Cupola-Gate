import React from "react";
import { GlareCard } from "../ui/GlareCard";
import { AnimatedImage } from "../ui/Media_UI/AnimatedImage";
import { T } from "gt-next";

const Team = () => {
  const Members = [
    {
      name: "Ibrahim wael",
      role: "Full Stack Developer & Video Editor",
      img: "/Team/Apolo.jpg",
    },
    {
      name: "Belal Mostafa",
      role: "Research & Presentation",
      img: "/Team/Bolbol.jpg",
    },
    {
      name: "Salma Osama",
      role: "UI/UX Designer",
      img: "/Team/Salma.jpg",
    },
    {
      name: "Malak Abdelrahman",
      role: "Research & Presentation",
      img: "/Team/Malak.jpg",
    },
  ];
  return (
    <section className="my-20">
      <h1>
        <T>
          Meet The <span className="text-indigo-600"> Team </span>
        </T>
      </h1>
      <p className="my-3">
        <T>
          A group of passionate individuals dedicated to making a difference
          through technology.
        </T>
      </p>
      <div className="p-5 grid grid-cols-2 w-fit mx-auto gap-5 lg:grid-cols-4">
        {Members.map((member) => (
          <GlareCard
            key={member.name + member.role}
            className="min-h-96 text-center bg-transparent"
            children={
              <div className="p-5 flex flex-col gap-5 justify-between  items-center h-full">
                <div>
                  <h4>{member.name}</h4>
                  <p className="!text-lg mt-2">{member.role}</p>
                </div>
                <AnimatedImage
                  noAnimate
                  src={member.img}
                  alt={`${member.name} Image`}
                  className="rounded-4xl w-full h-82 border border-indigo-600"
                />
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
};

export default Team;
