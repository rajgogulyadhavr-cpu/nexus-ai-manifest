import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Props { onDone: () => void }

/** Cinematic intro: dark particles -> robotic hand -> plasma explosion -> WELCOME text -> name typing. */
export function CinematicIntro({ onDone }: Props) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [typed, setTyped] = useState("");
  const [subTyped, setSubTyped] = useState("");
  const explosionRef = useRef<HTMLCanvasElement>(null);

  // Phase timeline
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 900);   // hand enters
    const t2 = setTimeout(() => setPhase(2), 2600);  // wave + Hi
    const t3 = setTimeout(() => setPhase(3), 5000);  // plasma + explosion -> WELCOME
    const t4 = setTimeout(() => setPhase(4), 7200);  // name typing
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, []);

  // Typing effect
  useEffect(() => {
    if (phase < 4) return;
    const full = "RAJALINGAM N";
    const sub = "Artificial Intelligence & Data Science Engineer";
    let i = 0, j = 0;
    const it1 = setInterval(() => {
      i++; setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(it1);
        const it2 = setInterval(() => {
          j++; setSubTyped(sub.slice(0, j));
          if (j >= sub.length) {
            clearInterval(it2);
            setTimeout(onDone, 1400);
          }
        }, 32);
      }
    }, 85);
    return () => clearInterval(it1);
  }, [phase, onDone]);

  // Explosion particles
  useEffect(() => {
    if (phase < 3) return;
    const c = explosionRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const resize = () => { c.width = innerWidth*dpr; c.height=innerHeight*dpr; c.style.width=innerWidth+"px"; c.style.height=innerHeight+"px"; ctx.setTransform(dpr,0,0,dpr,0,0); };
    resize(); addEventListener("resize", resize);

    const cx = innerWidth/2, cy = innerHeight/2;
    const parts = Array.from({length: 380}, () => {
      const a = Math.random()*Math.PI*2;
      const s = Math.random()*7+2;
      return { x:cx, y:cy, vx: Math.cos(a)*s, vy: Math.sin(a)*s, life: 1, hue: 200 + Math.random()*100 };
    });
    let raf = 0;
    const step = () => {
      ctx.fillStyle = "rgba(5,8,20,0.18)"; ctx.fillRect(0,0,innerWidth,innerHeight);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.985; p.vy *= 0.985; p.vy += 0.02;
        p.life -= 0.006;
        if (p.life <= 0) continue;
        ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, Math.PI*2);
        ctx.fillStyle = `hsla(${p.hue},100%,70%,${p.life})`;
        ctx.shadowColor = `hsla(${p.hue},100%,65%,1)`;
        ctx.shadowBlur = 18; ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, [phase]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-[#050814]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
    >
      {/* Dust / holograms scene 1 */}
      <IntroParticles />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-blue-500/25 blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-[120px] animate-pulse-glow" />

      {/* Moving lab silhouettes */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute bottom-10 left-10 h-40 w-1 bg-gradient-to-t from-cyan-400/70 to-transparent animate-pulse-glow" />
        <div className="absolute bottom-10 left-20 h-56 w-1 bg-gradient-to-t from-fuchsia-400/70 to-transparent animate-pulse-glow" style={{animationDelay:"0.4s"}} />
        <div className="absolute bottom-10 right-16 h-48 w-1 bg-gradient-to-t from-blue-400/70 to-transparent animate-pulse-glow" style={{animationDelay:"0.8s"}} />
      </div>

      {/* Scene 2: robot hand */}
      <AnimatePresence>
        {phase >= 1 && phase < 3 && (
          <motion.div
            key="hand"
            initial={{ x: "-60%", y: "10%", opacity: 0, rotate: -25 }}
            animate={{ x: "-8%", y: "0%", opacity: 1, rotate: -8 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <RoboticHand waving={phase >= 2} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hi text */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.4, filter: "blur(20px)" }}
            transition={{ duration: 0.6 }}
            className="absolute left-1/2 top-[38%] -translate-x-1/2 text-center"
          >
            <div className="font-display text-6xl font-bold text-white neon-glow md:text-8xl">
              👋 Hi<span className="animate-flicker">...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plasma burst orb */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.2, 0.9], opacity: [1, 1, 0] }}
            transition={{ duration: 1.6, times: [0, 0.55, 1] }}
            className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(120,220,255,0.95), rgba(90,120,255,0.6) 35%, rgba(180,80,255,0.35) 60%, transparent 75%)",
              filter: "blur(4px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Explosion canvas */}
      {phase >= 3 && (
        <canvas ref={explosionRef} className="pointer-events-none absolute inset-0" />
      )}

      {/* WELCOME text after explosion */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4, filter: "blur(30px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-[36%] w-full -translate-x-1/2 px-4 text-center"
          >
            <div className="font-display text-4xl font-black tracking-[0.18em] text-white neon-glow sm:text-6xl md:text-7xl">
              WELCOME TO MY
            </div>
            <div className="mt-3 font-display text-5xl font-black tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-400 to-fuchsia-400 neon-glow sm:text-7xl md:text-8xl">
              PORTFOLIO
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name typing */}
      <AnimatePresence>
        {phase === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-x-0 bottom-[18%] text-center"
          >
            <div className="font-display text-3xl font-bold tracking-[0.25em] text-white neon-glow sm:text-5xl">
              {typed}<span className="ml-1 inline-block h-8 w-[3px] bg-cyan-300 animate-pulse-glow align-middle" />
            </div>
            <div className="mt-4 font-mono text-sm text-cyan-200/90 sm:text-base">
              &gt; {subTyped}<span className="animate-flicker">_</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip */}
      <button
        onClick={onDone}
        className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-widest text-white/80 backdrop-blur transition hover:bg-white/10"
      >
        Skip Intro →
      </button>
    </motion.div>
  );
}

function IntroParticles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w=0, h=0, raf=0;
    const resize = () => { w=innerWidth; h=innerHeight; c.width=w*dpr; c.height=h*dpr; c.style.width=w+"px"; c.style.height=h+"px"; ctx.setTransform(dpr,0,0,dpr,0,0); };
    resize(); addEventListener("resize", resize);
    const N = 200;
    const parts = Array.from({length:N}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
      r: Math.random()*1.8+0.3,
      hue: [200, 220, 285, 300][Math.floor(Math.random()*4)],
      a: Math.random()*0.6+0.3,
    }));
    const step = () => {
      ctx.fillStyle = "rgba(5,8,20,0.35)"; ctx.fillRect(0,0,w,h);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x<0||p.x>w) p.vx*=-1;
        if (p.y<0||p.y>h) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `hsla(${p.hue},100%,70%,${p.a})`;
        ctx.shadowColor = `hsla(${p.hue},100%,60%,1)`; ctx.shadowBlur = 10;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0" />;
}

/** Stylized 3D-looking robotic hand built with SVG + gradients. */
function RoboticHand({ waving }: { waving: boolean }) {
  return (
    <div className={waving ? "animate-[wave_1.4s_ease-in-out_infinite]" : ""} style={{ transformOrigin: "60% 90%" }}>
      <style>{`@keyframes wave { 0%,100%{transform:rotate(-6deg)} 50%{transform:rotate(14deg)} }`}</style>
      <svg width="340" height="420" viewBox="0 0 340 420" className="drop-shadow-[0_0_40px_rgba(80,180,255,0.55)]">
        <defs>
          <linearGradient id="metal" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#e8f2ff" />
            <stop offset="0.35" stopColor="#7aa4d8" />
            <stop offset="0.6" stopColor="#2b3a55" />
            <stop offset="1" stopColor="#0a1226" />
          </linearGradient>
          <linearGradient id="joint" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#4fd7ff" />
            <stop offset="1" stopColor="#0a5cff" />
          </linearGradient>
          <radialGradient id="plasma">
            <stop offset="0" stopColor="#bfeaff" stopOpacity="1" />
            <stop offset="0.5" stopColor="#3b8dff" stopOpacity="0.7" />
            <stop offset="1" stopColor="#8b5cff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Forearm */}
        <rect x="120" y="300" width="100" height="110" rx="18" fill="url(#metal)" stroke="#5aa4ff" strokeOpacity="0.6" />
        <circle cx="170" cy="315" r="8" fill="url(#joint)" className="animate-pulse-glow" />

        {/* Palm */}
        <path d="M110 200 Q100 170 130 155 L210 155 Q240 170 230 200 L235 285 Q235 305 215 310 L125 310 Q105 305 105 285 Z"
              fill="url(#metal)" stroke="#5aa4ff" strokeOpacity="0.7" strokeWidth="1.5" />

        {/* Circuitry on palm */}
        <g stroke="#4fd7ff" strokeOpacity="0.6" strokeWidth="1" fill="none">
          <path d="M130 230 L200 230 L210 250 L170 250 L170 280" />
          <circle cx="170" cy="280" r="3" fill="#4fd7ff" />
          <circle cx="130" cy="230" r="2.5" fill="#4fd7ff" />
        </g>

        {/* Plasma orb in palm */}
        <circle cx="170" cy="235" r="42" fill="url(#plasma)" className="animate-pulse-glow" />

        {/* Fingers */}
        {[0,1,2,3].map((i) => {
          const x = 118 + i*30;
          return (
            <g key={i}>
              <rect x={x} y="70" width="22" height="42" rx="7" fill="url(#metal)" />
              <circle cx={x+11} cy="115" r="5" fill="url(#joint)" />
              <rect x={x} y="118" width="22" height="36" rx="7" fill="url(#metal)" />
            </g>
          );
        })}
        {/* Thumb */}
        <g transform="rotate(-30 90 190)">
          <rect x="70" y="170" width="22" height="40" rx="7" fill="url(#metal)" />
          <circle cx="81" cy="215" r="5" fill="url(#joint)" />
          <rect x="70" y="216" width="22" height="30" rx="7" fill="url(#metal)" />
        </g>

        {/* Sparks */}
        {waving && Array.from({length: 8}).map((_,i)=>(
          <circle key={i} cx={170 + Math.cos(i)*30} cy={235 + Math.sin(i)*30} r="1.6"
                  fill="#7ee9ff" className="animate-pulse-glow" style={{animationDelay: `${i*0.12}s`}} />
        ))}
      </svg>
    </div>
  );
}
