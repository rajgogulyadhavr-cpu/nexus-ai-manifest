import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const INTRO: Msg = {
  role: "assistant",
  content:
    "Hi! I'm RG InfoBot 🤖 — I know everything about Rajalingam's resume, projects, achievements & certifications. Ask me anything.",
};

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INTRO]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) throw new Error(await res.text());
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, I couldn't reach the neural core. Please try again." }]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 220 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full glass-neon neon-border transition hover:scale-110"
        aria-label="Open RG InfoBot"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 blur-lg animate-pulse-glow" />
        {open ? <X className="relative h-6 w-6 text-white" /> : <Bot className="relative h-7 w-7 text-cyan-200" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed bottom-28 right-6 z-50 flex h-[560px] w-[92vw] max-w-[400px] flex-col overflow-hidden rounded-3xl glass-neon"
          >
            <div className="flex items-center gap-3 border-b border-white/10 p-4">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500">
                <Bot className="h-5 w-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-400 animate-pulse-glow" />
              </div>
              <div>
                <div className="font-display text-sm font-bold tracking-wider text-white">RG INFOBOT</div>
                <div className="text-[10px] uppercase tracking-widest text-cyan-300/80">Neural core • online</div>
              </div>
              <Sparkles className="ml-auto h-4 w-4 text-cyan-300 animate-pulse-glow" />
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-blue-500 to-fuchsia-500 text-white shadow-[0_0_20px_rgba(90,120,255,0.5)]"
                        : "glass text-white/95"
                    }`}
                  >
                    {m.content || <span className="opacity-60">▍</span>}
                  </div>
                </div>
              ))}
              {loading && messages[messages.length-1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="glass rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse-glow" />
                      <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse-glow" style={{animationDelay:"0.15s"}} />
                      <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse-glow" style={{animationDelay:"0.3s"}} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); void send(); }}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Rajalingam..."
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-cyan-400/60"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-white shadow-[0_0_20px_rgba(90,180,255,0.6)] transition hover:scale-105 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
