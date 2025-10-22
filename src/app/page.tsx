import Chart from "@/components/home/Charts";
import Earth from "@/components/home/Earth";
import FAQs from "@/components/home/FAQs";
import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import Sun from "@/components/home/Sun";
import Loading from "@/components/ui/Loading";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      <ClerkLoading>
        <Loading />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <Chart />
        </SignedIn>
        <SignedOut>
          <Hero />
          <Earth />
          <Features />
          <Gallery />
          <FAQs />
          <Sun />
        </SignedOut>
      </ClerkLoaded>
    </main>
  );
}
