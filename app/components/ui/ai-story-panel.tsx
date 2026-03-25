"use client";

import { useEffect, useState } from "react";

export function AiStoryPanel({ fallback }: { fallback: string }) {
  const [story, setStory] = useState(fallback);

  useEffect(() => {
    let active = true;

    async function hydrateStory() {
      try {
        const response = await fetch("/api/story");
        const data = (await response.json()) as { story: string };
        if (active && data.story) {
          setStory(data.story);
        }
      } catch {
        // Fall back silently to local story when no API key is configured.
      }
    }

    void hydrateStory();

    return () => {
      active = false;
    };
  }, []);

  return <p className="mt-5 text-lg leading-8 text-white/85">{story}</p>;
}
