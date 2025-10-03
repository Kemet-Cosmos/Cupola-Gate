import Earth from "@/components/home/Earth";
import EndOFPage from "@/components/home/EndOFPage";
import Hero from "@/components/home/Hero";
import Sun from "@/components/home/Sun";
import WhyUs from "@/components/home/WhyUs";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Earth />
      <WhyUs />
      <EndOFPage />
      <Sun />
    </main>
  );
}
