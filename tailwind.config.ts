import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: "#050816",
        cyan: "#5ef2ff",
        magenta: "#ff4fd8",
        lime: "#aeff5f",
        slateGlass: "rgba(255,255,255,0.08)",
      },
      boxShadow: {
        neon: "0 0 25px rgba(94,242,255,0.25)",
        pulse: "0 0 80px rgba(255,79,216,0.15)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(94,242,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(94,242,255,0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
