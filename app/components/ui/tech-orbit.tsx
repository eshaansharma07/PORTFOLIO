"use client";

const techNodes = [
  { label: "Py", x: "8%", y: "72%" },
  { label: "AI", x: "18%", y: "32%" },
  { label: "JS", x: "58%", y: "14%" },
  { label: "ML", x: "71%", y: "38%" },
  { label: "API", x: "63%", y: "72%" },
  { label: "R3F", x: "37%", y: "82%" },
  { label: "Git", x: "41%", y: "52%" },
  { label: "C++", x: "84%", y: "56%" },
];

export function TechOrbit() {
  return (
    <div className="relative mx-auto h-[340px] w-full max-w-[480px] md:h-[440px]">
      <div className="absolute inset-[14%] rounded-full border border-white/10" />
      <div className="absolute inset-[24%] rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-[10%] h-[80%] w-px -translate-x-1/2 bg-white/10" />
      <div className="absolute left-[10%] top-1/2 h-px w-[80%] -translate-y-1/2 bg-white/10" />
      <div className="absolute inset-[10%] rounded-[36px] border border-white/5" />

      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(149,76,255,0.45),rgba(27,11,59,0.08)_65%,transparent_75%)] blur-md" />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/30 bg-[radial-gradient(circle,rgba(255,255,255,0.22),rgba(255,79,216,0.18))] shadow-[0_0_60px_rgba(184,94,255,0.35)]" />

      {techNodes.map((node, index) => (
        <div
          key={node.label}
          className="floating absolute flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-lg font-semibold text-white/90 shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          style={{
            left: node.x,
            top: node.y,
            animationDelay: `${index * 0.35}s`,
          }}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}
