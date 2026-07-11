import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Github, Linkedin, Mail, Phone, Download, ExternalLink, MapPin,
  Cpu, Brain, Code2, Database, Wrench, Trophy, Award, GraduationCap, Briefcase, Sparkles, ArrowRight
} from "lucide-react";

const PROJECTS = [
  { title: "NeuroClass AI", desc: "Multilingual (Tamil + English) adaptive learning platform with real-time face tracking for focus & drowsiness monitoring across Primary, Secondary and Higher Secondary levels.", img: "/portfolio/projects/neuroclass.svg", tag: "AI • Education", link: undefined },
  { title: "FootGuard AI", desc: "AI-powered preventive healthcare platform helping diabetic patients identify risks early, adopt healthy foot care, and access medical support.", img: "/portfolio/projects/footguard.jpg", tag: "AI • Healthcare", link: "http://foot-gold.vercel.app/" },
  { title: "Kural AI", desc: "Intelligent Tamil language learning platform with AI tutor, pronunciation practice, sentence formation and gamified lessons.", img: "/portfolio/projects/kural.svg", tag: "AI • NLP", link: "https://kuralaai.netlify.app/" },
  { title: "Autonomous Service Robot", desc: "IoT-based autonomous service robot with sensor monitoring, intelligent navigation and automated task execution.", img: "/portfolio/projects/autonomous-robot.jpg", tag: "IoT • Robotics", link: undefined },
  { title: "Object Detection & Avoidance Robot", desc: "Robotic car prototype with ultrasonic sensor and servo motor for real-time obstacle detection and avoidance.", img: "/portfolio/projects/object-detection.jpg", tag: "IoT • Robotics", link: undefined },
  { title: "Pressure Release AI", desc: "Behavioral intelligence platform for stress detection, burnout analysis and personalized mental wellness recommendations.", img: "/portfolio/projects/pressure.svg", tag: "AI • Wellness", link: "https://pressure-release-ai.netlify.app/" },
  { title: "Portable Toxic Gas Filtration", desc: "IoT-based portable air filtration system using gas sensors and multi-stage filtration to reduce emissions from agricultural waste burning.", img: "/portfolio/projects/gas-filter.svg", tag: "IoT • Environment", link: undefined },
  { title: "Sri Rajalingam Rice Mill — Canva", desc: "Complete brand poster & visual identity for a local rice mill, designed in Canva.", img: "/portfolio/projects/rice-mill.jpg", tag: "Design", link: undefined },
];

const SKILLS = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Power BI", icon: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Machine Learning", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "IoT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
];

const CERTS = [
  { title: "Python Programming", by: "GUVI", date: "Jan 30, 2025", img: "/portfolio/certs/python.jpg" },
  { title: "Intro to SQL", by: "Le Wagon", date: "Jan 31, 2025", img: "/portfolio/certs/sql.jpg" },
  { title: "Power BI for Business", by: "Microsoft Elevate × FICE", date: "Jan 20, 2026", img: "/portfolio/certs/powerbi.jpg" },
  { title: "Data Science & Analytics", by: "HP LIFE Foundation", date: "Jan 31, 2025", img: "/portfolio/certs/data-science.jpg" },
  { title: "Front End Technologies", by: "IBM Career Education", date: "Nov 1, 2025", img: "/portfolio/certs/frontend.jpg" },
  { title: "Back-End with Node.js & Express", by: "IBM / TNSDC", date: "Nov 1, 2025", img: "/portfolio/certs/backend.jpg" },
];

const ACHIEVEMENTS = [
  { title: "TN EDI Hackathon 2026 — Finalist", desc: "Selected as Finalist at the Tamil Nadu Entrepreneurship Development & Innovation Institute Hackathon 2026.", icon: Trophy },
  { title: "Dr. Kalam Young Achiever Award 2025 — Finalist", desc: "Madurai Regional Finalist, Dr. Kalam Young Achiever Awards 2025 by World Youth Federation.", icon: Award, img: "/portfolio/achievements/kalam-certificate.jpg" },
  { title: "3rd Prize — National Hackathon (VCET, Madurai)", desc: "Third Prize at a National Level Hackathon hosted by VCET, Madurai.", icon: Trophy, img: "/portfolio/achievements/vcet-hackathon.jpg" },
  { title: "Runner-up — Youth Indians Round Table 2025", desc: "Runner-up, Karur — Accessibility & Health Talk.", icon: Award },
  { title: "TN Govt. Centum Award — Computer Science", desc: "Tamil Nadu Government Centum Award in Computer Science, 12th State Board.", icon: GraduationCap },
  { title: "Multiple Essay & Speech Prizes", desc: "Multiple 1st, 2nd, and 3rd prizes in Essay and Speech competitions.", icon: Award, img: "/portfolio/achievements/essay-prize.jpg" },
];

export function Portfolio() {
  return (
    <div className="relative">
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

/* ─────────── Nav ─────────── */
function NavBar() {
  const links = [
    ["About", "#about"], ["Skills", "#skills"], ["Projects", "#projects"],
    ["Achievements", "#achievements"], ["Certifications", "#certifications"], ["Contact", "#contact"],
  ];
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
      className="fixed inset-x-0 top-4 z-40 mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full glass px-5 py-2.5 sm:px-7"
    >
      <a href="#top" className="flex items-center gap-2 font-display font-bold text-white">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(90,180,255,0.7)]">
          <span className="text-xs font-black text-black">RN</span>
        </div>
        <span className="hidden text-sm tracking-widest sm:inline">RAJALINGAM.AI</span>
      </a>
      <nav className="hidden gap-6 text-sm text-white/80 md:flex">
        {links.map(([label, href]) => (
          <a key={href} href={href} className="relative transition hover:text-cyan-300">
            {label}
          </a>
        ))}
      </nav>
      <a href="/portfolio/Rajalingam_N_Resume.pdf" download className="hidden rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-1.5 text-xs font-bold tracking-widest text-black transition hover:scale-105 sm:inline-flex">
        RESUME ↓
      </a>
    </motion.header>
  );
}

/* ─────────── Hero ─────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-28">
      <motion.div style={{ y, opacity }} className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-[1.15fr_1fr]">
        <div className="animate-rise">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full glass-neon px-4 py-1.5 text-xs uppercase tracking-widest text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-glow" /> AI • Data Science Engineer
          </div>
          <h1 className="font-display text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            Hi, I'm <span className="text-gradient neon-glow">Rajalingam N</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/75">
            I build AI-driven software that solves real-world problems — from healthcare vision systems and Tamil-first language tutors to autonomous IoT robots.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-3 text-sm font-bold tracking-wider text-black shadow-[0_0_30px_rgba(90,180,255,0.55)] transition hover:scale-105">
              EXPLORE MY WORK <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="rounded-full glass px-6 py-3 text-sm font-bold tracking-wider text-white transition hover:bg-white/10">
              GET IN TOUCH
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-xs uppercase tracking-widest text-white/60">
            <div><div className="font-display text-2xl font-bold text-cyan-300">8.45<span className="text-sm text-white/40">/10</span></div>CGPA</div>
            <div><div className="font-display text-2xl font-bold text-fuchsia-300">8+</div>AI/IoT Projects</div>
            <div><div className="font-display text-2xl font-bold text-cyan-300">6+</div>Certifications</div>
            <div><div className="font-display text-2xl font-bold text-fuchsia-300">5+</div>Awards</div>
          </div>
        </div>

        {/* Portrait ring */}
        <div className="relative mx-auto aspect-square w-[280px] sm:w-[340px] md:w-[420px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/30 via-blue-500/20 to-fuchsia-500/30 blur-3xl animate-pulse-glow" />
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-cyan-300/30" />
          <div className="absolute inset-4 animate-spin-slow rounded-full border border-fuchsia-300/25" style={{ animationDirection: "reverse" }} />
          <div className="absolute inset-8 animate-spin-slow rounded-full border border-white/10" />
          <div className="absolute inset-10 overflow-hidden rounded-full glass-neon neon-border">
            <img src="/portfolio/profile.jpg" alt="Rajalingam N" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent mix-blend-overlay" />
          </div>
          {/* Orbiting dots */}
          {[0,72,144,216,288].map((deg,i)=>(
            <div key={i} className="absolute left-1/2 top-1/2 h-3 w-3" style={{ transform: `rotate(${deg}deg) translateY(-52%)` }}>
              <div className="h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(120,220,255,1)] animate-pulse-glow" />
            </div>
          ))}
        </div>
      </motion.div>
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-white/40">Scroll ↓</div>
    </section>
  );
}

/* ─────────── About ─────────── */
function About() {
  return (
    <Section id="about" title="About" kicker="// system.profile()">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass rounded-2xl p-6 md:col-span-2">
          <p className="text-lg leading-relaxed text-white/85">
            Results-driven Artificial Intelligence & Data Science undergraduate at Chettinad College of Engineering and Technology
            (B.Tech, 2023–2027, CGPA 8.45). Strong foundation in Python, SQL, Data Structures, OOP, DBMS and Machine Learning.
            I love turning research-grade AI ideas into shipping products — from computer vision for diabetic-foot care to Tamil-first AI tutors.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoRow icon={GraduationCap} label="Education" value="B.Tech AI & Data Science — 2023 to 2027" />
            <InfoRow icon={Briefcase} label="Experience" value="MERN Stack Intern @ IBM (Jul–Sep 2025)" />
            <InfoRow icon={MapPin} label="Based in" value="Tamil Nadu, India" />
            <InfoRow icon={Sparkles} label="Currently" value="Building AI products & seeking SDE roles" />
          </div>
        </div>
        <div className="glass-neon rounded-2xl p-6">
          <div className="mb-3 text-xs uppercase tracking-widest text-cyan-300">Objective</div>
          <p className="text-white/85">
            Passionate about developing AI-driven software solutions for real-world challenges.
            Seeking a Software Engineer opportunity to apply technical and problem-solving skills
            while contributing to innovative and scalable products.
          </p>
          <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-xs text-cyan-200/90">
            &gt; status: <span className="text-emerald-400">available_for_hire</span><br/>
            &gt; focus: <span className="text-fuchsia-300">AI • ML • Full-Stack</span><br/>
            &gt; cgpa: <span className="text-white">8.45 / 10</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 text-cyan-300">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-white/50">{label}</div>
        <div className="text-sm text-white">{value}</div>
      </div>
    </div>
  );
}

/* ─────────── Skills ─────────── */
function Skills() {
  const categories = [
    { icon: Code2, title: "Programming", items: "Python, SQL, JavaScript (Basic)" },
    { icon: Brain, title: "Artificial Intelligence", items: "Machine Learning, Deep Learning (Basic)" },
    { icon: Cpu, title: "Core Concepts", items: "Data Structures, OOP, DBMS" },
    { icon: Database, title: "Web & Databases", items: "HTML5, CSS3, React.js, MERN, MySQL, MongoDB" },
    { icon: Wrench, title: "Tools", items: "Git, GitHub, Power BI, Figma, IoT" },
  ];
  return (
    <Section id="skills" title="Skills & Stack" kicker="// stack.load()">
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((c) => (
          <div key={c.title} className="glass rounded-xl p-4">
            <c.icon className="mb-2 h-5 w-5 text-cyan-300" />
            <div className="text-sm font-bold text-white">{c.title}</div>
            <div className="mt-1 text-xs text-white/60">{c.items}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.04, duration: 0.5 }}
            whileHover={{ y: -6, scale: 1.06 }}
            className="group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl glass p-3 transition"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/0 to-fuchsia-500/0 opacity-0 blur-xl transition group-hover:from-cyan-400/40 group-hover:to-fuchsia-500/40 group-hover:opacity-100" />
            <img src={s.icon} alt={s.name} className="relative h-10 w-10 object-contain drop-shadow-[0_0_12px_rgba(120,220,255,0.6)]" />
            <div className="relative text-center text-[10px] font-semibold uppercase tracking-wider text-white/80">{s.name}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────── Projects ─────────── */
function Projects() {
  return (
    <Section id="projects" title="Featured Projects" kicker="// projects.map()">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.06, duration: 0.6 }}
            className="group relative overflow-hidden rounded-2xl glass transition hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(90,180,255,0.35)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              {p.img.endsWith(".svg") ? (
                <ProjectIllustration title={p.title} />
              ) : (
                <img src={p.img} alt={p.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full glass-neon px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-200">
                {p.tag}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl font-bold text-white">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-white/70">{p.desc}</p>
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer"
                   className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300 transition hover:text-cyan-200">
                  Visit Live <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function ProjectIllustration({ title }: { title: string }) {
  const seed = title.length;
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-blue-950 via-indigo-950 to-fuchsia-950">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`g${seed}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#7ee9ff" />
            <stop offset="1" stopColor="#c07bff" />
          </linearGradient>
        </defs>
        {Array.from({length: 6}).map((_,i)=>(
          <circle key={i} cx={40 + i*60} cy={125 + Math.sin(i+seed)*40} r={20 - i*2}
                  fill={`url(#g${seed})`} opacity={0.7 - i*0.1} />
        ))}
        <path d="M0 180 Q100 120 200 160 T400 130" stroke={`url(#g${seed})`} strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M0 200 Q100 150 200 180 T400 160" stroke="#7ee9ff" strokeWidth="1" fill="none" opacity="0.4" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center font-display text-2xl font-black text-white/90 neon-glow">{title.split(" ")[0]}</div>
      </div>
    </div>
  );
}

/* ─────────── Achievements ─────────── */
function Achievements() {
  return (
    <Section id="achievements" title="Achievements" kicker="// achievements.list()">
      <div className="grid gap-5 md:grid-cols-2">
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, x: i%2 ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55 }}
            className="group flex gap-4 rounded-2xl glass p-5 transition hover:bg-white/[0.06]"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 text-cyan-300 group-hover:scale-110 transition">
              <a.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="font-display font-bold text-white">{a.title}</div>
              <div className="mt-1 text-sm text-white/70">{a.desc}</div>
            </div>
            {a.img && (
              <img src={a.img} alt={a.title} className="hidden h-20 w-20 shrink-0 rounded-lg object-cover ring-1 ring-white/10 sm:block" />
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────── Certifications ─────────── */
function Certifications() {
  return (
    <Section id="certifications" title="Certifications" kicker="// certs.verify()">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CERTS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ delay: i * 0.06, duration: 0.55 }}
            className="group relative overflow-hidden rounded-2xl glass"
          >
            <div className="aspect-[4/3] overflow-hidden bg-white/5">
              <img src={c.img} alt={c.title} className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105" />
            </div>
            <div className="border-t border-white/10 p-4">
              <div className="font-display font-bold text-white">{c.title}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-cyan-300/80">{c.by}</div>
              <div className="mt-0.5 text-xs text-white/50">{c.date}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────── Contact ─────────── */
function Contact() {
  const links = [
    { icon: Mail, label: "Email", value: "rajgogulyadhavr@gmail.com", href: "mailto:rajgogulyadhavr@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 9791703480", href: "tel:+919791703480" },
    { icon: Github, label: "GitHub", value: "@rajgogulyadhavr-cpu", href: "https://github.com/rajgogulyadhavr-cpu" },
    { icon: Linkedin, label: "LinkedIn", value: "rajalingam-narayanakumar", href: "https://www.linkedin.com/in/rajalingam-narayanakumar-578a69348" },
  ];
  return (
    <Section id="contact" title="Let's Build the Future" kicker="// contact.init()">
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl glass-neon p-8">
          <h3 className="font-display text-3xl font-bold text-white">Got an idea worth shipping?</h3>
          <p className="mt-3 text-white/75">
            Whether it's an AI product, a research project, or a full-stack build — I'd love to hear about it.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="mailto:rajgogulyadhavr@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-3 text-sm font-bold text-black shadow-[0_0_25px_rgba(90,180,255,0.55)] transition hover:scale-105">
              <Mail className="h-4 w-4" /> Send an email
            </a>
            <a href="/portfolio/Rajalingam_N_Resume.pdf" download className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1">
          {links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
               className="group flex items-center gap-4 rounded-xl glass p-4 transition hover:bg-white/[0.06]">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 text-cyan-300 group-hover:scale-110 transition">
                <l.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-widest text-white/50">{l.label}</div>
                <div className="truncate text-sm text-white">{l.value}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-white/40 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-xs uppercase tracking-widest text-white/40">
        © {new Date().getFullYear()} Rajalingam N • Built with AI, Ambition & Neon.
      </div>
    </footer>
  );
}

/* ─────────── Section wrapper ─────────── */
function Section({ id, title, kicker, children }: { id: string; title: string; kicker: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-4 py-24 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        className="mb-10 flex items-end justify-between gap-4"
      >
        <div>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-cyan-300/80">{kicker}</div>
          <h2 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
        </div>
        <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent md:block" />
      </motion.div>
      {children}
    </section>
  );
}
