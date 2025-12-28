import type { Metadata } from "next";

import "./globals.css";
import { GTProvider } from "gt-next";
import { Russo_One } from "next/font/google";
import NavBar from "@/components/NavBar";
import { StarField } from "@/components/ui/Planets/SpaceBg";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import { getLocale, getLocaleDirection } from "gt-next/server";
const russoOne = Russo_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-russo-one",
});
export const metadata: Metadata = {
  title: "CupolaGate",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <html
        lang={await getLocale()}
        dir={await getLocaleDirection()}
        className={russoOne.variable}
      >
        <body className={`  font-russo`}>
          <GTProvider>
            <NavBar />
            <StarField />

            {children}
            <Footer/>
          </GTProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
