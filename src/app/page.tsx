import Earth from "@/components/home/Earth";
import EndOFPage from "@/components/home/EndOFPage";
import FAQs from "@/components/home/FAQs";
import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import Sun from "@/components/home/Sun";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Earth />
      <Features />
      <Gallery/>
      <FAQs/>
      <EndOFPage />
      <Sun />
    </main>
  );
}
