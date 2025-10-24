"use client";

import { useGT } from "gt-next";
import { BadgeConfig } from "@/lib/type";
import { badgeConfigs } from "./badgeConfig";

export function useTranslatedBadgeConfig(badgeName: string): BadgeConfig {
  const t = useGT();
  
  const badge = badgeConfigs[badgeName] || badgeConfigs.Level_0;
  
  return {
    ...badge,
    title: t(badge.title),
    description: t(badge.description),
  };
}