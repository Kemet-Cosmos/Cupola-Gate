import React from "react";
import FuzzyText from "@/components/ui/Bite/FuzzyText";
import Link from "next/link";

export default function notFound() {
  return (
    <section className="flex flex-col gap-5 justify-center items-center">
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.9} enableHover={true}>
        404
      </FuzzyText>

      <h1>Page not found</h1>
      <p>Come back to Home page or Contact Us</p>
      <div className="space-x-3 mt-5">
        <Link
          href="/"
          className="py-2 px-4 bg-white rounded-2xl text-black font-semibold"
        >
          Home
        </Link>
        <Link
          href="/contact"
          className="py-2 px-4 bg-white rounded-2xl text-black font-semibold"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}
