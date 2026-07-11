import { useEffect, useRef } from "react";

/** Persistent living background: particles + neural links + digital rain. */
export function LiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    let particles: P[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(140, Math.floor((w * h) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.4,
        hue: Math.random() < 0.5 ? 210 : 285,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      // vignette glow
      const g = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, Math.max(w,h)/1.2);
      g.addColorStop(0, "rgba(20,30,80,0.0)");
      g.addColorStop(1, "rgba(0,0,0,0.35)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx*dx + dy*dy;
        if (d2 < 14000) {
          const f = (14000 - d2) / 14000;
          p.x += (dx / Math.sqrt(d2+1)) * f * 1.2;
          p.y += (dy / Math.sqrt(d2+1)) * f * 1.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, 0.9)`;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 65%, 0.9)`;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // neural links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx*dx + dy*dy;
          if (d2 < 11000) {
            const alpha = 1 - d2 / 11000;
            ctx.strokeStyle = `hsla(${(a.hue+b.hue)/2}, 90%, 65%, ${alpha * 0.25})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <DigitalRain />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,rgba(0,0,0,0.55))]" />
    </div>
  );
}

function DigitalRain() {
  const cols = 24;
  return (
    <div className="absolute inset-0 opacity-[0.14] mix-blend-screen">
      {Array.from({ length: cols }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 font-mono text-[10px] leading-3 text-cyan-300"
          style={{
            left: `${(i / cols) * 100}%`,
            animation: `digital-rain ${8 + (i % 7)}s linear ${(i % 5) * -2}s infinite`,
            writingMode: "vertical-rl",
            whiteSpace: "nowrap",
            textShadow: "0 0 8px rgba(0,220,255,0.7)",
          }}
        >
          {Array.from({ length: 40 }).map(() => (Math.random() > 0.5 ? "1" : "0")).join(" ")}
        </div>
      ))}
    </div>
  );
}
