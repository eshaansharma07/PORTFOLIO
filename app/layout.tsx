import type { Metadata } from "next";
import "@/globals.css";

export const metadata: Metadata = {
  title: "Eshaan Sharma | AI Futurist Portfolio",
  description:
    "Interactive 3D portfolio for Eshaan Sharma, blending AI storytelling, immersive visuals, and recruiter-ready product thinking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="noise" data-theme="dark">
        {children}
      </body>
    </html>
  );
}
