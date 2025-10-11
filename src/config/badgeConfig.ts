import {
  Sprout,
  Star,
  Sparkles,
  Flame,
  Crown,
  MessageCircle,
  Volume2,
  HelpCircle,
  HelpCircle as HelpCircle2,
  Brain,
  Lightbulb,
  LucideIcon,
  Volleyball,
  Telescope,
} from "lucide-react";

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

export const badgeConfigs: Record<string, BadgeConfig> = {
  Welcome: {
    title: "first journey",
    description: "Just Started your journey",
    icon: Telescope,
    color: "rgba(108, 117, 125, 0.9)",
    bgColor: "rgba(233, 236, 239, 0.15)",
    borderColor: "rgba(233, 236, 239, 0.3)",
    rarity: "common",
    points: 10,
  },
  Level_0: {
    title: "Level 0",
    description: "learned the basics",
    icon: Sprout,
    color: "rgba(108, 117, 125, 0.9)",
    bgColor: "rgba(233, 236, 239, 0.15)",
    borderColor: "rgba(233, 236, 239, 0.3)",
    rarity: "common",
    points: 10,
  },
  Level_1: {
    title: "Level 1",
    description: "Completed first challenges",
    icon: Star,
    color: "rgba(13, 110, 253, 0.9)",
    bgColor: "rgba(13, 110, 253, 0.15)",
    borderColor: "rgba(13, 110, 253, 0.3)",
    rarity: "common",
    points: 25,
  },
  Level_2: {
    title: "Level 2",
    description: "Intermediate level reached",
    icon: Sparkles,
    color: "rgba(25, 135, 84, 0.9)",
    bgColor: "rgba(25, 135, 84, 0.15)",
    borderColor: "rgba(25, 135, 84, 0.3)",
    rarity: "rare",
    points: 50,
  },
  Level_3: {
    title: "Level 3",
    description: "Advanced achievements unlocked",
    icon: Flame,
    color: "rgba(255, 193, 7, 0.9)",
    bgColor: "rgba(255, 193, 7, 0.15)",
    borderColor: "rgba(255, 193, 7, 0.3)",
    rarity: "epic",
    points: 100,
  },
  Level_4: {
    title: "Level 4",
    description: "Master level achieved",
    icon: Crown,
    color: "rgba(220, 53, 69, 0.9)",
    bgColor: "rgba(220, 53, 69, 0.15)",
    borderColor: "rgba(220, 53, 69, 0.3)",
    rarity: "legendary",
    points: 250,
  },

  Chat: {
    title: "Chat Master",
    description: "Started conversing",
    icon: MessageCircle,
    color: "rgba(23, 162, 184, 0.9)",
    bgColor: "rgba(23, 162, 184, 0.15)",
    borderColor: "rgba(23, 162, 184, 0.3)",
    rarity: "common",
    points: 30,
  },
  Chat_10: {
    title: "Chat Legend",
    description: "10 conversations completed",
    icon: Volume2,
    color: "rgba(111, 66, 193, 0.9)",
    bgColor: "rgba(111, 66, 193, 0.15)",
    borderColor: "rgba(111, 66, 193, 0.3)",
    rarity: "epic",
    points: 150,
  },

  NBL: {
    title: "NBL",
    description: "National Big League member",
    icon: Volleyball,
    color: "rgba(255, 107, 53, 0.9)",
    bgColor: "rgba(255, 107, 53, 0.15)",
    borderColor: "rgba(255, 107, 53, 0.3)",
    rarity: "rare",
    points: 75,
  },

  Q_Level_1: {
    title: "Question Level 1",
    description: "Asked your first question",
    icon: HelpCircle,
    color: "rgba(32, 201, 151, 0.9)",
    bgColor: "rgba(32, 201, 151, 0.15)",
    borderColor: "rgba(32, 201, 151, 0.3)",
    rarity: "common",
    points: 20,
  },
  Q_Level_2: {
    title: "Question Level 2",
    description: "Growing questioner",
    icon: Lightbulb,
    color: "rgba(0, 217, 255, 0.9)",
    bgColor: "rgba(0, 217, 255, 0.15)",
    borderColor: "rgba(0, 217, 255, 0.3)",
    rarity: "rare",
    points: 60,
  },
  Q_Level_3: {
    title: "Question Level 3",
    description: "Curious explorer",
    icon: HelpCircle2,
    color: "rgba(255, 0, 110, 0.9)",
    bgColor: "rgba(255, 0, 110, 0.15)",
    borderColor: "rgba(255, 0, 110, 0.3)",
    rarity: "epic",
    points: 120,
  },
  Q_Level_4: {
    title: "Question Level 4",
    description: "Philosopher of questions",
    icon: Brain,
    color: "rgba(143, 0, 255, 0.9)",
    bgColor: "rgba(143, 0, 255, 0.15)",
    borderColor: "rgba(143, 0, 255, 0.3)",
    rarity: "legendary",
    points: 200,
  },
};

export function getBadgeConfig(badgeName: string): BadgeConfig {
  return badgeConfigs[badgeName] || badgeConfigs.Level_0;
}

export function getBadgesByRarity(rarity: BadgeConfig["rarity"]) {
  return Object.values(badgeConfigs).filter((badge) => badge.rarity === rarity);
}
export function getTotalBadges(): number {
  return Object.keys(badgeConfigs).length;
}
export function calculateTotalPoints(badgeNames: string[]): number {
  return badgeNames.reduce((total, name) => {
    const badge = getBadgeConfig(name);
    return total + (badge.points || 0);
  }, 0);
}
export function calculateAllBadgePoints(): number {
  return Object.values(badgeConfigs).reduce((total, badge: any) => {
    return total + (badge.points || 0);
  }, 0);
}

export function hasLegendaryBadge(userBadges: string[]): boolean {
  return userBadges.some((name) => {
    const badge = getBadgeConfig(name);
    return badge.rarity === "legendary";
  });
}
