"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import type { PortfolioProfile } from "@/lib/types";
import { ChatbotPanel } from "@/components/ui/chatbot-panel";

export function ContactSection({ profile }: { profile: PortfolioProfile }) {
  const [status, setStatus] = useState("Send a note or let the AI brief you first.");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });
      const data = (await response.json()) as { message: string };
      setStatus(data.message);
      event.currentTarget.reset();
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="section-shell py-24">
      <div data-reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="eyebrow">Contact</div>
          <h2 className="text-3xl font-medium md:text-5xl">Human connection, AI assistance.</h2>
        </div>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Recruiters can talk directly, leave a note, or use the embedded assistant to navigate the profile faster.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div data-reveal className="space-y-4">
          <div className="glass-panel rounded-[30px] p-6">
            <div className="space-y-4 text-sm text-white/80">
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-[var(--accent)]" />
                <a href={`mailto:${profile.contacts.email}`}>{profile.contacts.email}</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-[var(--accent-2)]" />
                <a href={`tel:${profile.contacts.phone}`}>{profile.contacts.phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="size-4 text-[var(--accent-3)]" />
                <span>{profile.contacts.location}</span>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="glass-panel rounded-[30px] p-6">
            <p className="section-title text-xs text-[var(--muted)]">Contact Form</p>
            <div className="mt-5 space-y-4">
              <input
                name="name"
                required
                placeholder="Your name"
                className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 outline-none placeholder:text-white/35"
              />
              <input
                name="email"
                required
                type="email"
                placeholder="Your email"
                className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 outline-none placeholder:text-white/35"
              />
              <textarea
                name="message"
                required
                placeholder="Tell me about the role, product, or challenge."
                className="min-h-32 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 outline-none placeholder:text-white/35"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-5 rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] px-5 py-3 font-medium text-slate-950"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            <p className="mt-4 text-sm text-[var(--muted)]">{status}</p>
          </form>
        </div>

        <div data-reveal>
          <ChatbotPanel />
        </div>
      </div>
    </section>
  );
}
