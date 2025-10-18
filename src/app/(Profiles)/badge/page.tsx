"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "@/lib/type";
import { useAuth } from "@clerk/nextjs";
import BadgeList from "@/components/Badges/BadgeList";
import Loading from "@/components/ui/Loading";

export default function Page() {
  const { isSignedIn } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBadges = async () => {
    try {
      const response = await fetch("/api/badge");
      const data = await response.json();
      setBadges(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching badges:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchBadges();
    }
  }, [isSignedIn]);

  return (
    <section className="mt-20 mx-auto p-4">
      <div>
        <h2 className="text-2xl mb-10">Your Badges </h2>
        {loading ? (
          <Loading />
        ) : badges.length === 0 ? (
          <p>You don't have any badges yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
            <BadgeList badges={badges} variant="large" />
          </div>
        )}
      </div>
    </section>
  );
}
