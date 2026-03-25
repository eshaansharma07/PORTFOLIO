"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/3d/hero-scene").then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="glass-panel h-[420px] rounded-[32px] md:h-[560px] animate-pulse" />
    ),
  },
);

export function HeroSceneShell() {
  return <HeroScene />;
}
