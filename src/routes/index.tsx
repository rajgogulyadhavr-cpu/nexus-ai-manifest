import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CinematicIntro } from "@/components/CinematicIntro";
import { LiveBackground } from "@/components/LiveBackground";
import { Portfolio } from "@/components/Portfolio";
import { ChatBot } from "@/components/ChatBot";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Rajalingam N — AI & Data Science Engineer | Portfolio" },
      { name: "description", content: "Award-winning AI portfolio of Rajalingam N — Artificial Intelligence & Data Science Engineer. Projects in ML, CV, IoT and MERN. Featuring NeuroClass AI, FootGuard AI, Kural AI and more." },
      { property: "og:title", content: "Rajalingam N — AI & Data Science Engineer | Portfolio" },
      { property: "og:description", content: "Award-winning AI portfolio of Rajalingam N — Artificial Intelligence & Data Science Engineer. Projects in ML, CV, IoT and MERN. Featuring NeuroClass AI, FootGuard AI, Kural AI and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  const [introDone, setIntroDone] = useState(false);
  return (
    <main className="relative min-h-screen text-foreground">
      <LiveBackground />
      <AnimatePresence mode="wait">
        {!introDone && <CinematicIntro key="intro" onDone={() => setIntroDone(true)} />}
      </AnimatePresence>
      <Portfolio />
      <ChatBot />
    </main>
  );
}
