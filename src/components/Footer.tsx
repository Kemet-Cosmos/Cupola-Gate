"use client";
import React from "react";
import { AnimatedImage } from "./ui/Media_UI/AnimatedImage";
import { useGT } from "gt-next";
import Link from "next/link";
import { T } from "gt-next";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Twitter, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import Button from "./ui/Button";

const Footer = () => {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const t = useGT();

  const menuItems = [
    { label: t("Home"), ariaLabel: t("Go to home page"), link: "/" },
    { label: t("About"), ariaLabel: t("Learn about us"), link: "/about" },
    { label: t("Levels"), ariaLabel: t("View our services"), link: "/levels" },
    { label: t("Contact"), ariaLabel: t("Get in touch"), link: "/contact" },
    { label: t("Chat Bot"), ariaLabel: t("Get in touch"), link: "/Chat" },
  ];

  const socialItems = [
    { label: "Twitter", link: "https://twitter.com", icon: Twitter },
    { label: "GitHub", link: "https://github.com", icon: Github },
    { label: "LinkedIn", link: "https://linkedin.com", icon: Linkedin },
    { label: "Email", link: "mailto:info@cupolagate.com", icon: Mail },
  ];

  const okayOrNot = isSignedIn && pathname.startsWith("/");
  if (
    pathname.startsWith("/levels") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/badge") ||
    pathname.startsWith("/explore") ||
    pathname.startsWith("/Chat") ||
    pathname.startsWith("/HiMessage") ||
    okayOrNot
  )
    return null;

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/10 bg-gradient-to-b from-transparent to-white/5">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 w-fit mb-6 group">
              <AnimatedImage
                src="/CupolaGate.jpg"
                alt="Logo"
                className="w-12 h-12 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors duration-300"
              />
              <h3 className="!text-2xl font-bold">CupolaGate</h3>
            </Link>
            <p className="!text-base text-white/60 leading-relaxed mb-6">
              <T>
                Empowering learners worldwide to explore space science through
                interactive education.
              </T>
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialItems.map((item, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 group"
                  aria-label={item.label}
                >
                  <item.icon className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors duration-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">
              <T>Quick Links</T>
            </h4>
            <ul className="space-y-3">
              {menuItems.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.link}
                    className="group flex items-center gap-2 text-white/60 hover:text-white/90 transition-all duration-300 w-fit"
                    aria-label={item.ariaLabel}
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-6">
              <T>Resources</T>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/guide"
                  className="group flex items-center gap-2 text-white/60 hover:text-white/90 transition-all duration-300 w-fit"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  <span>
                    <T>Guide</T>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="group flex items-center gap-2 text-white/60 hover:text-white/90 transition-all duration-300 w-fit"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  <span>
                    <T>FAQ</T>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="group flex items-center gap-2 text-white/60 hover:text-white/90 transition-all duration-300 w-fit"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  <span>
                    <T>Support</T>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="group flex items-center gap-2 text-white/60 hover:text-white/90 transition-all duration-300 w-fit"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  <span>
                    <T>Privacy Policy</T>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="group flex items-center gap-2 text-white/60 hover:text-white/90 transition-all duration-300 w-fit"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  <span>
                    <T>Terms of Service</T>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">
              <T>Stay Updated</T>
            </h4>
            <p className="!text-sm text-white/60 mb-4">
              <T>
                join our <span className="mark"> discord </span> for updates and
                tips.
              </T>
            </p>
            <a
              href="https://discord.gg/HjBFtHHT56"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button text={t("Join Discord")} />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p className="!text-sm">
              <T>
                © 2025 <span className="mark"> CupolaGate </span>. All rights
                reserved.
              </T>
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="hover:text-white/80 transition-colors duration-300"
              >
                <T>Privacy</T>
              </Link>
              <Link
                href="/terms"
                className="hover:text-white/80 transition-colors duration-300"
              >
                <T>Terms</T>
              </Link>
              <Link
                href="/cookies"
                className="hover:text-white/80 transition-colors duration-300"
              >
                <T>Cookies</T>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10" />
    </footer>
  );
};

export default Footer;
