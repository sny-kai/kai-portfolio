"use client";
import { useEffect, useRef, useState } from "react";
import { Mail, ArrowDown, ExternalLink, UtensilsCrossed, Code2 } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Start", color: "#E8A33D" },
  { id: "kainna", label: "Kain Na!", color: "#FF8A5B" },
  { id: "riscv", label: "RISC-V", color: "#4ADE80" },
  { id: "fusion", label: "FUSION", color: "#FF5C5C" },
  { id: "partiful", label: "Partiful", color: "#E85DA8" },
  { id: "asb", label: "ASB", color: "#4DD8E8" },
  { id: "close", label: "Contact", color: "#E8A33D" },
];
const ACCENT = Object.fromEntries(SECTIONS.map((s) => [s.id, s.color]));

const BG = "#08090A";
const LINE = "#33383F";
const AMBER = "#E8A33D";
const INK = "#1C2B3A";
const PAPER = "#F3EFE4";
const TEXT = "#F1F1F0";
const MUTED = "#8A8F97";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ---------- glowing wire motif ---------- */
function WireLine({ color }) {
  return (
    <div style={{ position: "absolute", left: -20, top: 0, bottom: 0, width: 2 }}>
      <div style={{ position: "absolute", inset: 0, background: color, boxShadow: `0 0 6px ${color}, 0 0 14px ${color}88`, opacity: 0.85 }} />
      {[0.18, 0.5, 0.82].map((p, i) => (
        <div key={i} style={{ position: "absolute", left: -3, top: `${p * 100}%`, width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
      ))}
    </div>
  );
}

/* ---------- Section wrapper ---------- */
function Chapter({ index, id, eyebrow, title, meta, children, media }) {
  const [ref, visible] = useReveal();
  const accent = ACCENT[id] || AMBER;
  return (
    <section
      id={id}
      ref={ref}
      className="page-section"
      style={{ minHeight: "100vh", scrollSnapAlign: "start", display: "flex", alignItems: "center", padding: "6rem 6vw", boxSizing: "border-box" }}
    >
      <div
        className="chapter-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          maxWidth: 1180,
          margin: "0 auto",
          width: "100%",
          alignItems: "start",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={{ position: "relative" }}>
          <WireLine color={accent} />
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: accent, textShadow: `0 0 10px ${accent}77` }}>{String(index).padStart(2, "0")}</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: MUTED }}>{eyebrow}</span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 500, color: TEXT, margin: "0 0 6px", lineHeight: 1.15 }}>
            {title}
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: MUTED, margin: "0 0 28px" }}>{meta}</p>
          {children}
        </div>
        <div>{media}</div>
      </div>
    </section>
  );
}

function LinkedInIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function Tag({ children, color = AMBER }) {
  return (
    <span style={{ display: "inline-block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color, border: `1px solid ${color}66`, borderRadius: 3, padding: "3px 9px", marginRight: 8, marginBottom: 8 }}>
      {children}
    </span>
  );
}

function Bullet({ children, color = AMBER }) {
  return (
    <li style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 16, lineHeight: 1.7, color: "#D6D6D4", marginBottom: 10, paddingLeft: 18, position: "relative" }}>
      <span style={{ position: "absolute", left: 0, color }}>&mdash;</span>
      {children}
    </li>
  );
}

/* ---------- KAIN NA!: recipe card ---------- */
function RecipeCardFrame({ src, alt, label, footer, rotate = -1.2 }) {
  const accent = ACCENT.kainna;
  return (
    <div style={{ position: "relative", transform: `rotate(${rotate}deg)` }}>
      <div style={{ background: PAPER, borderRadius: 3, padding: "28px 24px 24px 40px", boxShadow: `0 12px 28px rgba(0,0,0,0.5), 0 0 30px ${accent}22`, position: "relative", minHeight: 260 }}>
        <div style={{ position: "absolute", left: 14, top: 24, bottom: 24, width: 1, borderLeft: `2px dashed ${accent}88`, opacity: 0.5 }} />
        {[0.15, 0.5, 0.85].map((p, i) => (
          <div key={i} style={{ position: "absolute", left: 8, top: `calc(${p * 100}% - 6px)`, width: 12, height: 12, borderRadius: "50%", background: BG, border: `1px solid ${accent}` }} />
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <UtensilsCrossed size={18} color={INK} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: INK, letterSpacing: "0.02em" }}>{label}</span>
          <Code2 size={16} color={INK} style={{ marginLeft: "auto" }} />
        </div>
        {src ? (
          <img src={src} alt={alt} style={{ width: "100%", borderRadius: 2, border: `1px solid ${accent}55`, display: "block", minHeight: 150, objectFit: "cover" }} />
        ) : (
          <div style={{ border: `1px dashed ${accent}66`, borderRadius: 2, minHeight: 150, display: "flex", alignItems: "center", justifyContent: "center", color: "#7A8A99", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, textAlign: "center", padding: 16 }}>
            drop screenshot here
          </div>
        )}
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "#8B9AA8", marginTop: 12, marginBottom: 0 }}>{footer}</p>
      </div>
    </div>
  );
}

/* ---------- RISC-V: chip + panels ---------- */
function DatapathPanel() {
  const accent = ACCENT.riscv;
  return (
    <div style={{ position: "relative", border: `1px dashed ${accent}55`, borderRadius: 2, padding: 12, background: "rgba(74,222,128,0.05)" }}>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, color: accent, margin: "0 0 8px", letterSpacing: "0.05em" }}>
        DATAPATH DESIGN &middot; SOURCE SCHEMATIC
      </p>
      <img src="/riscv-datapath.png" alt="RISC-V datapath schematic used as design basis" style={{ width: "100%", borderRadius: 2, border: `1px solid ${accent}55`, display: "block" }} />
    </div>
  );
}

function TestbenchPanel() {
  const accent = ACCENT.riscv;
  return (
    <div style={{ position: "relative", border: `1px solid ${accent}55`, borderRadius: 2, padding: 12, background: "#020604", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(0deg, ${accent}0A 0 1px, transparent 1px 3px)`, pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}` }} />
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, color: accent, margin: 0, letterSpacing: "0.05em" }}>
          TESTBENCH &middot; SIMULATION OUTPUT
        </p>
      </div>
      <img src="/riscv-testbench.png" alt="RISC-V testbench simulation results" style={{ width: "100%", borderRadius: 2, border: `1px solid ${accent}44`, display: "block", position: "relative" }} />
    </div>
  );
}

function ChipFrame() {
  const accent = ACCENT.riscv;
  const pinsPerSide = 8;
  const renderPins = (side) => {
    return Array.from({ length: pinsPerSide }).map((_, i) => {
      const pct = ((i + 1) / (pinsPerSide + 1)) * 100;
      const isHorizontal = side === "top" || side === "bottom";
      const posStyle = isHorizontal ? { left: `${pct}%` } : { top: `${pct}%` };
      const wireLength = 14;
      return (
        <div key={side + i} style={{ position: "absolute", ...posStyle,
          ...(side === "top" && { top: -wireLength, width: 2, height: wireLength, background: accent, boxShadow: `0 0 4px ${accent}` }),
          ...(side === "bottom" && { bottom: -wireLength, width: 2, height: wireLength, background: accent, boxShadow: `0 0 4px ${accent}` }),
          ...(side === "left" && { left: -wireLength, width: wireLength, height: 2, background: accent, boxShadow: `0 0 4px ${accent}` }),
          ...(side === "right" && { right: -wireLength, width: wireLength, height: 2, background: accent, boxShadow: `0 0 4px ${accent}` }),
        }} />
      );
    });
  };

  return (
    <div style={{ position: "relative", margin: "20px 16px" }}>
      {renderPins("top")}
      {renderPins("bottom")}
      {renderPins("left")}
      {renderPins("right")}
      <div style={{ position: "relative", background: "#050807", border: `1px solid ${accent}55`, borderRadius: 6, padding: 22 }}>
        <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", width: 24, height: 12, background: BG, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, border: `1px solid ${accent}55`, borderTop: "none" }} />
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: accent, margin: "0 0 12px", letterSpacing: "0.05em" }}>
          RISCV-32 &middot; SINGLE CYCLE
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <DatapathPanel />
          <TestbenchPanel />
        </div>
      </div>
    </div>
  );
}

/* ---------- FUSION: winter + mentorship ---------- */
function WinterFrame() {
  const accent = ACCENT.fusion;
  const Snowflake = ({ style }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ position: "absolute", ...style }}>
      <g stroke={accent} strokeWidth="1" strokeLinecap="round">
        <line x1="8" y1="0" x2="8" y2="16" />
        <line x1="0" y1="8" x2="16" y2="8" />
        <line x1="2.3" y1="2.3" x2="13.7" y2="13.7" />
        <line x1="13.7" y1="2.3" x2="2.3" y2="13.7" />
      </g>
    </svg>
  );
  return (
    <div style={{ position: "relative", border: `1px solid ${accent}55`, borderRadius: 3, padding: 18, background: `linear-gradient(180deg, ${accent}14, transparent)` }}>
      <Snowflake style={{ top: 6, left: 6 }} />
      <Snowflake style={{ top: 6, right: 6 }} />
      <Snowflake style={{ bottom: 6, left: 6 }} />
      <Snowflake style={{ bottom: 6, right: 6 }} />
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: MUTED, textAlign: "center", margin: "0 0 10px", letterSpacing: "0.05em" }}>
        WINTER RETREAT &middot; 80+ ATTENDEES
      </p>
      <img src="/fusion-retreat.jpg" alt="FUSION winter retreat" style={{ width: "100%", borderRadius: 2, border: `1px solid ${accent}44`, display: "block" }} />
    </div>
  );
}

function MentorshipFrame() {
  const accent = ACCENT.fusion;
  return (
    <div style={{ position: "relative", border: `1px solid ${accent}55`, borderRadius: 3, padding: 18, background: `${accent}0D` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}` }} />
        <div style={{ flex: 1, maxWidth: 60, height: 1, background: `repeating-linear-gradient(90deg, ${accent} 0 4px, transparent 4px 8px)` }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", border: `1.5px solid ${accent}` }} />
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: MUTED, marginLeft: 8, letterSpacing: "0.05em" }}>
          MENTORSHIP &middot; 50+ PAIRINGS
        </span>
      </div>
      <img src="/fusion-mentorship.jpg" alt="FUSION mentorship program" style={{ width: "100%", borderRadius: 2, border: `1px solid ${accent}44`, display: "block" }} />
    </div>
  );
}

/* ---------- PARTIFUL: scrapbook polaroid ---------- */
function ScrapbookFrame() {
  const accent = ACCENT.partiful;
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
      <div style={{ position: "relative", transform: "rotate(2.5deg)" }}>
        <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%) rotate(-4deg)", width: 90, height: 26, background: `${accent}88`, backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.35) 0 4px, transparent 4px 10px)", zIndex: 2, borderRadius: 1, boxShadow: `0 0 12px ${accent}55` }} />
        <div style={{ background: "#FAF8F2", padding: "16px 16px 20px", boxShadow: `0 14px 30px rgba(0,0,0,0.5), 0 0 24px ${accent}22`, width: 300 }}>
          <img src="/partiful-event.jpg" alt="Partiful sponsored event" style={{ width: "100%", minHeight: 200, objectFit: "cover", display: "block", border: `1px solid ${accent}55` }} />
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic", fontSize: 13, color: "#5B5346", textAlign: "center", marginTop: 12, marginBottom: 14 }}>
            partiful.com &middot; sponsored event
          </p>
          <div style={{ borderTop: `1px dashed ${accent}88`, paddingTop: 12, textAlign: "center" }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "#8B7F6A", margin: "0 0 6px", letterSpacing: "0.03em" }}>
              hosting something? (yes, this is me growing my own numbers &mdash; on brand, i know)
            </p>
            <a
              href="https://m.partiful.com/5bSFYKZhX5b"
              target="_blank"
              rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: "#1C0E16", background: accent, padding: "6px 14px", borderRadius: 20, textDecoration: "none", boxShadow: `0 0 14px ${accent}88` }}
            >
              Use my referral link <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.5 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: BG, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`, backgroundSize: "36px 36px", color: TEXT, scrollSnapType: "y proximity", height: "100vh", overflowY: "scroll", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap');
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: ${LINE}; }
        @media (max-width: 860px) {
          .chapter-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .rail { display: none !important; }
        }
        @media (min-width: 861px) and (max-width: 1180px) {
          .rail .rail-label { display: none; }
          .page-section { padding-left: 100px !important; }
        }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <nav className="rail" style={{ position: "fixed", left: 28, top: "50%", transform: "translateY(-50%)", zIndex: 10, display: "flex", flexDirection: "column", gap: 20 }}>
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => scrollTo(s.id)} aria-label={s.label} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, padding: 0 }}>
            <span style={{ width: active === s.id ? 9 : 6, height: active === s.id ? 9 : 6, borderRadius: "50%", background: active === s.id ? s.color : "transparent", border: `1px solid ${active === s.id ? s.color : LINE}`, boxShadow: active === s.id ? `0 0 8px ${s.color}` : "none", transition: "all 0.25s ease" }} />
            <span className="rail-label" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: active === s.id ? s.color : MUTED, opacity: active === s.id ? 1 : 0, transition: "opacity 0.25s ease", whiteSpace: "nowrap" }}>
              {s.label}
            </span>
          </button>
        ))}
      </nav>

      {/* HERO */}
      <section id="hero" className="page-section" style={{ minHeight: "100vh", scrollSnapAlign: "start", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 6vw" }}>
        <div style={{ maxWidth: 780 }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: MUTED, marginBottom: 18 }}>Kai Snyder &middot; Computer Engineering &middot; Innovation and Entrepreneurship &middot; UC Irvine</p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "clamp(38px, 6vw, 68px)", lineHeight: 1.08, margin: "0 0 24px" }}>
            Build the system. <br /> Break down the pitch.
          </h1>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 18, lineHeight: 1.7, color: "#D6D6D4", maxWidth: 560, marginBottom: 40 }}>
            A record of the things I've built, pitched, and coordinated &mdash; from a RISC-V processor to a Filipino food app that won the judges over.
          </p>
          <button onClick={() => scrollTo("kainna")} style={{ background: "none", border: `1px solid ${AMBER}`, color: AMBER, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, padding: "10px 20px", borderRadius: 3, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: `0 0 12px ${AMBER}33` }}>
            Scroll through the work <ArrowDown size={14} />
          </button>
        </div>
      </section>

      <Chapter index={1} id="kainna" eyebrow="Project" title="Kain Na!" meta="Software product developer &middot; Next.js, Tailwind CSS" media={
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <RecipeCardFrame src="/kainna-demo.jpg" alt="Kain Na! app demo screenshot" label="recipe / kain-na.jsx" footer="serves: everyone &middot; stack: next.js, tailwind" rotate={-1.2} />
          <RecipeCardFrame src="/kainna-award.jpg" alt="Kain Na! award recognition screenshot" label="recipe / award.jsx" footer="responsive design &middot; tailwind breakpoints" rotate={1.5} />
        </div>
      }>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
          <Bullet color={ACCENT.kainna}>Built frontend software for a Filipino culinary platform &mdash; functional components, dynamic recipe cards, mobile-first Tailwind design.</Bullet>
          <Bullet color={ACCENT.kainna}>Learned Next.js, Tailwind CSS, and Git in a Scrum cycle: peer code review, Git branching, sprint check-ins.</Bullet>
          <Bullet color={ACCENT.kainna}>Pitched story, value proposition, and technical goals to industry sponsors at FUSIONcon.</Bullet>
          <Bullet color={ACCENT.kainna}>Won "Best Pitch and Storytelling" out of 5 competing teams.</Bullet>
        </ul>
        <div>
          <Tag color={ACCENT.kainna}>Next.js</Tag><Tag color={ACCENT.kainna}>Tailwind CSS</Tag><Tag color={ACCENT.kainna}>Git</Tag><Tag color={ACCENT.kainna}>Best Pitch Award</Tag>
        </div>
      </Chapter>

      <Chapter index={2} id="riscv" eyebrow="Project" title="RISC-V single-cycle processor" meta="Digital design engineer &middot; Verilog" media={<ChipFrame />}>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
          <Bullet color={ACCENT.riscv}>Designed a 32-bit single-cycle processor in Verilog, from datapath to control logic.</Bullet>
          <Bullet color={ACCENT.riscv}>Implemented and verified the full R / I / S / B instruction set against the ALU, register file, and memory.</Bullet>
          <Bullet color={ACCENT.riscv}>Debugged timing and control-signal errors across dozens of test instructions.</Bullet>
        </ul>
        <div><Tag color={ACCENT.riscv}>Verilog</Tag><Tag color={ACCENT.riscv}>Computer Architecture</Tag><Tag color={ACCENT.riscv}>EECS 31L</Tag></div>
      </Chapter>

      <Chapter index={3} id="fusion" eyebrow="Experience" title="FUSION &mdash; Internal Vice President Intern" meta="Nov 2025 &ndash; Mar 2026" media={
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <WinterFrame />
          <MentorshipFrame />
        </div>
      }>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
          <Bullet color={ACCENT.fusion}>Coordinated mentorship pairings for 50+ students by academic and career interest.</Bullet>
          <Bullet color={ACCENT.fusion}>Organized retreat programming, managed multi-group communications, and large-scale events for 80+ attendees.</Bullet>
          <Bullet color={ACCENT.fusion}>Planned joint meetings across student orgs to build campus-wide collaboration.</Bullet>
        </ul>
        <div><Tag color={ACCENT.fusion}>Event Ops</Tag><Tag color={ACCENT.fusion}>Cross-club Collaboration</Tag><Tag color={ACCENT.fusion}>Mentorship Program</Tag></div>
      </Chapter>

      <Chapter index={4} id="partiful" eyebrow="Experience" title="Partiful &mdash; Product Growth Lead" meta="Aug 2026 &ndash; Present" media={<ScrapbookFrame />}>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
          <Bullet color={ACCENT.partiful}>Drove brand awareness and new user growth across campus through digital and word-of-mouth outreach.</Bullet>
          <Bullet color={ACCENT.partiful}>Planned and hosted sponsored events showcasing Partiful's platform to boost retention.</Bullet>
          <Bullet color={ACCENT.partiful}>Tracked event analytics and user data to evaluate campaign performance.</Bullet>
        </ul>
        <div><Tag color={ACCENT.partiful}>Brand Outreach</Tag><Tag color={ACCENT.partiful}>Event Sponsorship</Tag><Tag color={ACCENT.partiful}>Analytics</Tag></div>
      </Chapter>

      <Chapter
        index={5}
        id="asb"
        eyebrow="Project"
        title="ASB Club Automation System"
        meta="Developer &middot; Java"
        media={
          <div style={{ border: `1px dashed ${ACCENT.asb}55`, borderRadius: 2, padding: 32, background: `${ACCENT.asb}0D`, display: "flex", flexDirection: "column", gap: 16, justifyContent: "center", minHeight: 260 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: MUTED }}>Before</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, color: "#D6D6D4" }}>60 min</span>
            </div>
            <div style={{ height: 1, background: `${ACCENT.asb}55` }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: MUTED }}>After</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, color: ACCENT.asb, textShadow: `0 0 10px ${ACCENT.asb}88` }}>&lt;5 min</span>
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: MUTED, margin: 0 }}>across 115 club meeting-minute verifications, weekly</p>
          </div>
        }
      >
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
          <Bullet color={ACCENT.asb}>Built a Java automation system verifying 115 clubs' weekly meeting minutes.</Bullet>
          <Bullet color={ACCENT.asb}>Designed custom object classes to compare Google Sheets exports against records.</Bullet>
          <Bullet color={ACCENT.asb}>Debugged for reliability and taught basic coding to fellow student body members.</Bullet>
        </ul>
        <div><Tag color={ACCENT.asb}>Java</Tag><Tag color={ACCENT.asb}>Process Automation</Tag></div>
      </Chapter>

      <section id="close" className="page-section" style={{ minHeight: "100vh", scrollSnapAlign: "start", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 6vw" }}>
        <div style={{ maxWidth: 640 }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: AMBER, marginBottom: 14 }}>Honors</p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 17, color: "#D6D6D4", lineHeight: 1.7, marginBottom: 40 }}>
            California State Seal of Biliteracy (Tagalog) &middot; Career Pathway Completion, Information &amp; Communication Technologies
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "clamp(26px, 3vw, 36px)", margin: "0 0 24px" }}>Let's talk.</h2>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <a href="mailto:29snyderk@gmail.com" style={{ display: "flex", alignItems: "center", gap: 8, color: TEXT, textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif", fontSize: 15 }}>
              <Mail size={16} /> 29snyderk@gmail.com
            </a>
            <a href="https://linkedin.com/in/snyderkai" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: TEXT, textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif", fontSize: 15 }}>
              <LinkedInIcon size={16} /> linkedin.com/in/snyderkai
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
