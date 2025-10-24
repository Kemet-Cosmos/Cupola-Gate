"use client";

import {
  Animate,
  FadeLeft,
  FadeRight,
  FadeUp,
  transition,
  ViewPort,
} from "@/Animation";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { T } from "gt-next";
import Image from "next/image";

const MotionImage = motion.create(Image);

export default function NBLPage() {
  return (
    <main className=" ">
      <div className="relative h-[70vh] flex items-center justify-center bg-blue-950 text-white ">
        <Image
          src="/NBL.jpg"
          alt="NBL Pool"
          width={2000}
          height={2000}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <motion.div
          {...FadeUp}
          {...Animate}
          className="relative z-10 text-center max-w-3xl"
        >
          <h3 className="text-5xl font-bold mb-4">
            <T>NASA Neutral Buoyancy Laboratory (NBL)</T>
          </h3>
          <p className="!text-lg">
            <T>
              The world’s largest indoor pool for astronaut training —
              simulating the weightlessness of space.
            </T>
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.div {...FadeRight} {...ViewPort} {...transition}>
          <T>
            <h2 className="!text-3xl font-semibold  mb-4">What is the NBL?</h2>
            <p className="!text-lg leading-relaxed">
              The Neutral Buoyancy Laboratory (NBL) is NASA’s premier astronaut
              training facility located at the Sonny Carter Training Facility
              near Johnson Space Center in Houston, Texas. The NBL houses a
              massive indoor pool containing 6.2 million gallons of fresh water.
              By using neutral buoyancy underwater, astronauts simulate the
              microgravity environment of space, practicing extravehicular
              activities (EVAs) essential for mission success.
            </p>
          </T>
        </motion.div>
        <MotionImage
          src="/NBL_Images/NBl.jpg"
          alt="Astronaut training underwater"
          width={750}
          height={750}
          className="rounded-2xl shadow-lg"
          {...FadeLeft}
          {...ViewPort}
        />
      </div>

      <div className=" py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <MotionImage
            src="/NBL_Images/Training_Area.jpg"
            alt="NBL Facility"
            width={750}
            height={750}
            className="rounded-2xl shadow-lg"
            {...FadeLeft}
            {...ViewPort}
            {...transition}
          />
          <motion.div {...FadeRight} {...ViewPort} {...transition}>
            <T>
              <h2 className="!text-3xl font-semibold   mb-4">
                Inside the Facility
              </h2>
              <p className="!text-lg leading-relaxed">
                The NBL pool measures 202 feet long, 102 feet wide, and 40 feet
                deep — large enough to hold full-size mockups of the
                International Space Station (ISS) modules. The facility
                integrates control rooms, video and audio systems, engineering
                labs, and professional dive teams to create a controlled,
                realistic training environment.
              </p>
              <p className="!text-lg leading-relaxed mt-3">
                Every year, hundreds of hours of EVA training and hardware
                testing are conducted, ensuring astronauts are fully prepared
                for space operations.
              </p>
            </T>
          </motion.div>
        </div>
      </div>

      <div className="  py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div {...FadeRight} {...ViewPort} {...transition}>
            <T>
              <h2 className="!text-3xl font-semibold  mb-4">
                Astronaut EVA Training
              </h2>
              <p className="!text-lg leading-relaxed">
                At the NBL, astronauts practice spacewalks using spacesuits
                modified for underwater use. By adjusting weights and buoyancy,
                they achieve neutral balance, neither sinking nor floating,
                replicating the feeling of weightlessness in space.
              </p>
              <p className="!text-lg leading-relaxed mt-3">
                Tasks include assembling ISS modules, repairing components, and
                performing scientific operations. Typically, astronauts spend 7
                hours underwater for every hour of real EVA — building
                confidence, coordination, and precision.
              </p>
            </T>
          </motion.div>
          <MotionImage
            src="/NBL_Images/Astronaut.jpg"
            alt="Astronaut practicing EVA"
            width={750}
            height={750}
            className="rounded-2xl shadow-lg"
            {...FadeLeft}
            {...ViewPort}
            {...transition}
          />
        </div>
      </div>

      <div className=" py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <MotionImage
            src="/NBL_Images/Training.jpg"
            alt="Students at NBL"
            width={750}
            height={750}
            className="rounded-2xl shadow-lg"
            {...FadeLeft}
            {...ViewPort}
            {...transition}
          />
          <motion.div {...FadeRight} {...ViewPort} {...transition}>
            <T>
              <h2 className="!text-3xl font-semibold  mb-4">
                Educational Programs
              </h2>
              <p className="!text-lg leading-relaxed">
                The NBL also hosts STEM-based educational programs like{" "}
                <strong>Micro-g NExT</strong>, where university students design
                and test space tools under NASA supervision. These hands-on
                projects expose students to real mission challenges, engineering
                processes, and astronaut training principles.
              </p>
              <p className="!text-lg leading-relaxed mt-3">
                Visitors to Space Center Houston can also learn about the NBL’s
                role in astronaut training and explore its connection to space
                exploration.
              </p>
            </T>
          </motion.div>
        </div>
      </div>

      <div className="text-center py-16">
        <motion.div
          {...FadeUp}
          {...ViewPort}
          {...transition}
          className="max-w-3xl mx-auto"
        >
          <T>
            <h2 className="!text-3xl font-semibold mb-4">
              Why the NBL is Essential
            </h2>
            <p className="!text-lg leading-relaxed">
              The Neutral Buoyancy Laboratory remains one of NASA’s most
              valuable assets for astronaut training. Its underwater environment
              provides the closest possible experience to working in space,
              allowing astronauts to perfect the art of spacewalking — ensuring
              mission safety, efficiency, and success.
            </p>
          </T>
        </motion.div>
      </div>
      <Button
        text="Lets Practice !"
        url="/levels/NBL"
        className="mx-auto mb-20"
      />
    </main>
  );
}
