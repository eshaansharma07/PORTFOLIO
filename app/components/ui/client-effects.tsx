"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ClientEffects() {
  useEffect(() => {
    const konami = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let index = 0;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 48, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            },
          },
        );
      });
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "h") {
        document.getElementById("recruiter-mode")?.scrollIntoView({ behavior: "smooth" });
      }

      if (event.key.toLowerCase() === "c") {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }

      if (event.key.toLowerCase() === "t") {
        document.querySelector<HTMLButtonElement>("[aria-label='Toggle theme']")?.click();
      }

      if (event.key === konami[index] || event.key.toLowerCase() === konami[index]) {
        index += 1;
        if (index === konami.length) {
          document.body.classList.toggle("founder-mode");
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return null;
}
