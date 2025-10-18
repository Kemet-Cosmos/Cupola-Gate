"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Animate, FadeLeft, opacity, transition } from "@/Animation";
import { useGT } from "gt-next";
import { T } from "gt-next";
import BadgeToast from "../Badges/BadgeToast";
import { useUser } from "@clerk/nextjs";
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const GlobePage = () => {
  const globeRef = useRef<any>(null);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [showToast, setShowToast] = useState<boolean>(false);

  const [visitedPlaces, setVisitedPlaces] = useState<string[]>(() => {
    const saved = localStorage.getItem("visitedPlaces");
    return saved ? JSON.parse(saved) : [];
  });
  const t = useGT();

  const markers = [
    {
      id: "giza",
      lat: 29.9792,
      lng: 31.1342,
      label: t("Giza Pyramids"),
      description: t(
        "Giza Pyramids – one of the Seven Wonders of the Ancient World.\nFact: The Great Pyramid was the tallest man-made structure for 3,800 years and is perfectly aligned with the cardinal directions."
      ),
      image: "/Places/Giza Pyramids.jpg",
    },
    {
      id: "ras-mohammed",
      lat: 27.73,
      lng: 34.255,
      label: t("Ras Mohammed"),
      description: t(
        "Ras Mohammed National Park – located in South Sinai.\nFamous for its stunning coral reefs and clear waters."
      ),
      image: "/Places/ras-mohamed.jpg",
    },
    {
      id: "eiffel",
      lat: 48.8584,
      lng: 2.2945,
      label: t("Eiffel Tower"),
      description: t("The Eiffel Tower – the most iconic symbol of Paris."),
      image: "/Places/Eiffel.avif",
    },
    {
      id: "times-square",
      lat: 40.758,
      lng: -73.9855,
      label: t("Times Square"),
      description: t(
        "Times Square – New York City's most famous square, known for its dazzling lights and billboards."
      ),
      image: "/Places/times-square.jpg",
    },
    {
      id: "fuji",
      lat: 35.3606,
      lng: 138.7274,
      label: t("Mount Fuji"),
      description: t(
        "Mount Fuji – Japan's tallest peak.\nFact: It's considered sacred, and thousands climb it in summer to see the 'Goraiko' sunrise."
      ),
      image: "/Places/fuji.jpg",
    },
    {
      id: "niagara",
      lat: 43.0962,
      lng: -79.0377,
      label: t("Niagara Falls"),
      description: t(
        "Niagara Falls – located on the border of Canada and the USA.\nA spectacular natural wonder famous for its power and beauty."
      ),
      image: "/Places/niagara.jpg",
    },
    {
      id: "santorini",
      lat: 36.461,
      lng: 25.375,
      label: t("Santorini"),
      description: t(
        "Oia Village – a stunning island in Greece, famous for its sunsets and white-washed buildings."
      ),
      image: "/Places/santorini.jpg",
    },
    {
      id: "grand-canyon",
      lat: 36.1069,
      lng: -112.1129,
      label: t("Grand Canyon"),
      description: t(
        "Grand Canyon – USA.\nFact: It's so large it creates its own weather system!"
      ),
      image: "/Places/grand-canyon.jpg",
    },
    {
      id: "great-barrier-reef",
      lat: -18.2871,
      lng: 147.6992,
      label: t("Great Barrier Reef"),
      description: t(
        "Great Barrier Reef – Australia.\nFact: It's the largest living structure on Earth and can be seen from space!"
      ),
      image: "/Places/great-barrier-reef.jpg",
    },
    {
      id: "swiss-alps",
      lat: 46.8182,
      lng: 8.2275,
      label: t("Swiss Alps"),
      description: t(
        "Swiss Alps – Switzerland.\nFact: They cover over 60% of Switzerland and hold 60% of Europe's fresh water."
      ),
      image: "/Places/swiss-alps.jpg",
    },
    {
      id: "amazon",
      lat: -3.4653,
      lng: -62.2159,
      label: t("Amazon Rainforest"),
      description: t(
        "Amazon Rainforest – South America.\nFact: It produces about 20% of the world's oxygen, earning the name 'the lungs of the Earth.'"
      ),
      image: "/Places/amazon.jpg",
    },
  ];

  const Add = async (newBadge: string) => {
    try {
      const response = await fetch("/api/badge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newBadge, fullName: user?.fullName }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Badge already exists:", data.error);
        setShowToast(false);
        return;
      }

      setShowToast(true);
    } catch (error) {
      console.error("Error fetching badges:", error);
      setShowToast(false);
    }
  };

  useEffect(() => {
    if (!user?.fullName) return;
    if (visitedPlaces.length === markers.length) {
      Add("GlobeExplorer");
    }
  }, [visitedPlaces, markers.length, user]);

  useEffect(() => {
    localStorage.setItem("visitedPlaces", JSON.stringify(visitedPlaces));
  }, [visitedPlaces]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("visitedPlaces");
      if (saved) setVisitedPlaces(JSON.parse(saved));
    } catch (err) {
      console.warn("Failed to read visitedPlaces from localStorage", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("visitedPlaces", JSON.stringify(visitedPlaces));
    } catch (err) {
      console.warn("Failed to write visitedPlaces to localStorage", err);
    }
  }, [visitedPlaces]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (globeRef.current?.controls) {
        globeRef.current.controls().autoRotate = true;
        globeRef.current.controls().autoRotateSpeed = 0.5;
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      const d = e.detail;
      if (!d) return;

      if (!visitedPlaces.includes(d.id)) {
        setVisitedPlaces((prev) => {
          const updated = [...prev, d.id];
          return updated;
        });
      }

      setSelectedPlace(d);
      if (globeRef.current) {
        globeRef.current.pointOfView(
          { lat: d.lat, lng: d.lng, altitude: 1.5 },
          1000
        );
      }
    };
    window.addEventListener("marker-click", handler);
    return () => window.removeEventListener("marker-click", handler);
  }, [visitedPlaces]);

  const getMarkerColor = (id: string, visited?: boolean) => {
    const isVisited =
      typeof visited === "boolean" ? visited : visitedPlaces.includes(id);
    return isVisited ? "#52c41a" : "#ff4d4f";
  };

  const buildHtmlPin = (d: any) => {
    const visited = !!d.visited;
    const fillColor = getMarkerColor(d.id, visited);

    const el = document.createElement("div");
    el.className = "globe-pin";
    el.style.pointerEvents = "auto";
    el.style.width = "44px";
    el.style.height = "44px";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.transform = "translate(-50%,-50%)";

    el.innerHTML = `
      <svg viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${fillColor}"/>
        <circle cx="12" cy="9" r="2.5" fill="white"/>
      </svg>
    `;

    el.onclick = () => {
      const ev = new CustomEvent("marker-click", { detail: d });
      window.dispatchEvent(ev);
    };

    return el;
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-6 p-0 relative">
      {loading && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="flex flex-col items-center gap-3 text-white">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <T>Loading 3D Earth...</T>
          </div>
        </div>
      )}

      <motion.div
        {...FadeLeft}
        {...Animate}
        {...transition}
        className="w-full lg:w-2/3 min-h-96 overflow-hidden rounded-xl flex justify-center items-center"
      >
        <Globe
          ref={globeRef}
          globeImageUrl="/Planets_Map/earth_8k.jpg"
          bumpImageUrl="/Planets_Map/earth_8k.jpg"
          backgroundColor="rgba(0,0,0,0)"
          showAtmosphere={true}
          atmosphereColor="#3da5ff"
          atmosphereAltitude={0.25}
          htmlElementsData={markers.map((m) => ({
            ...m,
            visited: visitedPlaces.includes(m.id),
          }))}
          htmlLat={(d: any) => d.lat}
          htmlLng={(d: any) => d.lng}
          htmlAltitude={(d: any) => 0.02}
          htmlElement={(d: any) => buildHtmlPin(d)}
          enablePointerInteraction={true}
          pointsData={[]}
          onGlobeReady={() => setLoading(false)}
        />
      </motion.div>

      {/* Info Panel */}
      <div className="w-full lg:w-1/3 bg-gradient-to-b from-white/3 to-white/2/0 rounded-xl p-4 h-fit">
        <p className="flex justify-center items-center gap-3">
          discovered{" "}
          <>
            {visitedPlaces.length} / {markers.length}
          </>
        </p>
        <AnimatePresence mode="wait">
          {selectedPlace ? (
            <motion.div
              key={selectedPlace.id}
              {...opacity}
              {...Animate}
              {...transition}
            >
              <h2 className="text-2xl font-bold mb-2">{selectedPlace.label}</h2>
              {selectedPlace.image && (
                <img
                  src={selectedPlace.image}
                  alt={selectedPlace.label}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              )}
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {selectedPlace.description}
              </p>
            </motion.div>
          ) : (
            <motion.div
              {...opacity}
              {...Animate}
              {...transition}
              className="text-gray-400 text-sm text-center mt-10"
            >
              <T>Click any pin on the globe to view information</T>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BadgeToast
        show={showToast}
        onClose={() => setShowToast(false)}
        title="New Badge Earned!"
        message={`You unlocked Globe Explorer Badge`}
      />
      <style>{`
        .globe-pin { 
          cursor: pointer;
          transition: transform 0.12s ease;
          position: relative;
        }
        .globe-pin:hover { transform: translate(-50%,-60%) scale(1.08); }
        .globe-pin svg path {
          transition: transform 0.15s ease, filter 0.15s ease;
        }
        .globe-pin:active svg path { transform: scale(0.98); filter: brightness(0.9); }
      `}</style>
    </div>
  );
};
export default GlobePage;
