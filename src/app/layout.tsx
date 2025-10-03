import type { Metadata } from "next";

import "./globals.css";
import { GTProvider } from "gt-next";
import { useGT } from "gt-next";
import { useDetectLanguage } from "@/Hook/Language";
import { Russo_One } from "next/font/google";
import NavBar from "@/components/NavBar";
import { StarField } from "@/components/ui/AnimatedSpace";
import { ClerkProvider } from "@clerk/nextjs";
const russoOne = Russo_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-russo-one",
});
export const metadata: Metadata = {
  title: "CupolaGate",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // for fix Dir Issue
  const translate = useGT();
  const translatedString = translate("Hello, world!");
  const dir = useDetectLanguage(translatedString);
  // end

  return (
    <ClerkProvider>
      <html
        lang="en"
        dir={dir === "ar" ? "rtl" : "ltr"}
        className={russoOne.variable}
      >
        <body className={`  font-russo`}>
          <GTProvider>
            <NavBar />
            <StarField />

            {children}
          </GTProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
