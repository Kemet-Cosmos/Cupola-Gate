import AboutUs from "@/components/home/AboutUs";
import Chart from "@/components/home/Charts";
import Community from "@/components/home/Community";
import Earth from "@/components/home/Earth";
import FAQs from "@/components/home/FAQs";
import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import HomeLoading from "@/components/home/HomeLoading";
import Sun from "@/components/home/Sun";
import SelectLanguage from "@/components/SelectLanguage";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      <ClerkLoading>
        <HomeLoading />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <Chart />
        </SignedIn>
        <SignedOut>
          <SelectLanguage />
          <Hero />
          <Earth />
          <Features />
          <Gallery />
          <AboutUs />
          <Community />
          <FAQs />
          <Sun />
        </SignedOut>
      </ClerkLoaded>
    </main>
  );
}
