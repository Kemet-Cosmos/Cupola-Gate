import { LucideIcon } from "lucide-react";

export interface Badge {
  _id: string;
  clerkId: string;
  title: string;
  createdAt: string;
}
export interface Certificate {
  _id: string;
  clerkId: string;
  title: string;
  fullName: string;
  startedIn: string;
  endedIn: string;
  createdAt: string;
}
export interface User {
  _id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export interface CertificatePage {
  Certificate: Certificate;
  badges: Badge[];
  // user: User;
}

export interface BadgeConfig {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  rarity?: "common" | "rare" | "epic" | "legendary";
  points?: number;
}
