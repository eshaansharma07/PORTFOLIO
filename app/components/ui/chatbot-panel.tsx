"use client";

import { FormEvent, useState } from "react";
import { Bot, SendHorizonal } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterQuestions = [
  "What projects has he done?",
  "Why is he a strong hire for AI roles?",
  "Summarize his technical strengths.",
];

export function ChatbotPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Recruiter assistant online. Ask about projects, skills, leadership, or why Eshaan stands out.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask(question: string) {
    const nextMessages = [...messages, { role: "user" as const, content: question }];
    setMessages(nextMessages);
    setLoading(true);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as { answer: string };
      setMessages([...nextMessages, { role: "assistant", content: data.answer }]);
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim() || loading) return;
    await ask(input.trim());
  }

  return (
    <div className="glass-panel rounded-[28px] p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <Bot className="size-5 text-[var(--accent)]" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--muted)]">AI Recruiter Assistant</p>
          <p className="text-sm text-white/70">Answers are grounded in the resume data and portfolio context.</p>
        </div>
      </div>

      <div className="mask-fade mb-4 h-72 space-y-3 overflow-y-auto pr-2">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6 ${
              message.role === "assistant"
                ? "bg-white/6 text-[var(--text)]"
                : "ml-auto bg-[rgba(94,242,255,0.12)] text-[var(--text)]"
            }`}
          >
            {message.content}
          </div>
        ))}
        {loading ? <div className="rounded-2xl bg-white/6 px-4 py-3 text-sm">Thinking...</div> : null}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {starterQuestions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => void ask(question)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-[var(--muted)] transition hover:border-cyan/40 hover:text-[var(--text)]"
          >
            {question}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-3">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about Eshaan's work..."
          className="h-12 flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 outline-none ring-0 placeholder:text-white/35"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] px-4 font-medium text-slate-950 transition hover:scale-[1.02] disabled:opacity-60"
        >
          Send
          <SendHorizonal className="size-4" />
        </button>
      </form>
    </div>
  );
}
