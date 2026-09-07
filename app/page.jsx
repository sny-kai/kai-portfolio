"use client";
import { useEffect, useRef, useState } from "react";
import { Mail, ArrowDown, ExternalLink, UtensilsCrossed, Code2 } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Start" },
  { id: "kainna", label: "Kain Na!" },
  { id: "riscv", label: "RISC-V" },
  { id: "fusion", label: "FUSION" },
  { id: "partiful", label: "Partiful" },
  { id: "asb", label: "ASB" },
  { id: "close", label: "Contact" },
];

const BLUE = "#0F2740";
const LINE = "#3E6E96";
const AMBER = "#E8A33D";
const INK = "#1C2B3A";
const PAPER = "#F3EFE4";
const TEXT = "#EDEFF2";
const MUTED = "#9FB4C7";

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

/* ---------- Section wrapper ---------- */
function Chapter({ index, id, eyebrow, title, meta, children, media }) {
  const [ref, visible] = useReveal();
  return (
    <section
      id={id}
      ref={ref}
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
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: AMBER }}>{String(index).padStart(2, "0")}</span>
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

function Tag({ children }) {
  return (
    <span style={{ display: "inline-block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: AMBER, border: `1px solid rgba(232,163,61,0.4)`, borderRadius: 3, padding: "3px 9px", marginRight: 8, marginBottom: 8 }}>
      {children}
    </span>
  );
}

function Bullet({ children }) {
  return (
    <li style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 16, lineHeight: 1.7, color: "#D8DEE6", marginBottom: 10, paddingLeft: 18, position: "relative" }}>
      <span style={{ position: "absolute", left: 0, color: AMBER }}>&mdash;</span>
      {children}
    </li>
  );
}

/* ---------- KAIN NA!: recipe card pinned on the blueprint ---------- */
function RecipeCardFrame({ src, alt, label, footer, rotate = -1.2 }) {
  return (
    <div style={{ position: "relative", transform: `rotate(${rotate}deg)` }}>
      <div
        style={{
          background: PAPER,
          borderRadius: 3,
          padding: "28px 24px 24px 40px",
          boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
          position: "relative",
          minHeight: 260,
        }}
      >
        <div style={{ position: "absolute", left: 14, top: 24, bottom: 24, width: 1, borderLeft: `2px dashed ${LINE}`, opacity: 0.35 }} />
        {[0.15, 0.5, 0.85].map((p, i) => (
          <div key={i} style={{ position: "absolute", left: 8, top: `calc(${p * 100}% - 6px)`, width: 12, height: 12, borderRadius: "50%", background: BLUE, border: `1px solid ${LINE}` }} />
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <UtensilsCrossed size={18} color={INK} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: INK, letterSpacing: "0.02em" }}>{label}</span>
          <Code2 size={16} color={INK} style={{ marginLeft: "auto" }} />
        </div>
        {src ? (
          <img src={src} alt={alt} style={{ width: "100%", borderRadius: 2, border: `1px solid ${LINE}`, display: "block", minHeight: 150, objectFit: "cover" }} />
        ) : (
          <div style={{ border: `1px dashed ${LINE}`, borderRadius: 2, minHeight: 150, display: "flex", alignItems: "center", justifyContent: "center", color: "#7A8A99", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, textAlign: "center", padding: 16 }}>
            drop screenshot here
          </div>
        )}
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "#8B9AA8", marginTop: 12, marginBottom: 0 }}>
          {footer}
        </p>
      </div>
    </div>
  );
}
/* ---------- RISC-V: PCB / circuit backdrop ---------- */
function DatapathPanel() {
  return (
    <div style={{ position: "relative", border: `1px dashed ${LINE}`, borderRadius: 2, padding: 12, backgroundImage: `linear-gradient(rgba(62,110,150,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(62,110,150,0.15) 1px, transparent 1px)`, backgroundSize: "12px 12px", background: "rgba(15,39,64,0.5)" }}>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, color: MUTED, margin: "0 0 8px", letterSpacing: "0.05em" }}>
        DATAPATH DESIGN &middot; SOURCE SCHEMATIC
      </p>
      <img
        src="/riscv-datapath.png"
        alt="RISC-V datapath schematic used as design basis"
        style={{ width: "100%", borderRadius: 2, border: `1px solid ${LINE}`, display: "block" }}
      />
    </div>
  );
}

function TestbenchPanel() {
  return (
    <div style={{ position: "relative", border: `1px solid ${LINE}`, borderRadius: 2, padding: 12, background: "#050D16", overflow: "hidden" }}>
      {/* scanline texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, rgba(232,163,61,0.04) 0 1px, transparent 1px 3px)", pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: AMBER }} />
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, color: AMBER, margin: 0, letterSpacing: "0.05em" }}>
          TESTBENCH &middot; SIMULATION OUTPUT
        </p>
      </div>
      <img
        src="/riscv-testbench.png"
        alt="RISC-V testbench simulation results"
        style={{ width: "100%", borderRadius: 2, border: `1px solid rgba(232,163,61,0.3)`, display: "block", position: "relative" }}
      />
    </div>
  );
}


function ChipFrame() {
  const pinsPerSide = 8;
  const renderPins = (side) => {
    return Array.from({ length: pinsPerSide }).map((_, i) => {
      const pct = ((i + 1) / (pinsPerSide + 1)) * 100;
      const isHorizontal = side === "top" || side === "bottom";
      const posStyle = isHorizontal ? { left: `${pct}%` } : { top: `${pct}%` };
      const wireLength = 14;
      return (
        <div key={side + i} style={{ position: "absolute", ...posStyle,
          ...(side === "top" && { top: -wireLength, width: 2, height: wireLength, background: MUTED }),
          ...(side === "bottom" && { bottom: -wireLength, width: 2, height: wireLength, background: MUTED }),
          ...(side === "left" && { left: -wireLength, width: wireLength, height: 2, background: MUTED }),
          ...(side === "right" && { right: -wireLength, width: wireLength, height: 2, background: MUTED }),
        }}>
          <div style={{ position: "absolute", width: 4, height: 4, borderRadius: "50%", background: AMBER,
            ...(isHorizontal ? { left: -1, top: side === "top" ? -2 : "auto", bottom: side === "bottom" ? -2 : "auto" }
                             : { top: -1, left: side === "left" ? -2 : "auto", right: side === "right" ? -2 : "auto" }) }} />
        </div>
      );
    });
  };

  return (
    <div style={{ position: "relative", margin: "20px 16px" }}>
      {renderPins("top")}
      {renderPins("bottom")}
      {renderPins("left")}
      {renderPins("right")}
      <div style={{ position: "relative", background: "#0A1B2C", border: `1px solid ${LINE}`, borderRadius: 6, padding: 22 }}>
        <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", width: 24, height: 12, background: BLUE, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, border: `1px solid ${LINE}`, borderTop: "none" }} />
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: MUTED, margin: "0 0 12px", letterSpacing: "0.05em" }}>
          RISCV-32 &middot; SINGLE CYCLE
        </p>

        {/* ▼▼▼ THIS is the only part that changed — everything above stays the same ▼▼▼ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <DatapathPanel />
          <TestbenchPanel />
        </div>
        {/* ▲▲▲ this replaced the old two-column <img><img> grid ▲▲▲ */}

      </div>
    </div>
  );
}


/* ---------- PARTIFUL: scrapbook polaroid ---------- */

function WinterFrame() {
  const Snowflake = ({ style }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ position: "absolute", ...style }}>
      <g stroke={AMBER} strokeWidth="1" strokeLinecap="round">
        <line x1="8" y1="0" x2="8" y2="16" />
        <line x1="0" y1="8" x2="16" y2="8" />
        <line x1="2.3" y1="2.3" x2="13.7" y2="13.7" />
        <line x1="13.7" y1="2.3" x2="2.3" y2="13.7" />
      </g>
    </svg>
  );
  return (
    <div style={{ position: "relative", border: `1px solid ${LINE}`, borderRadius: 3, padding: 18, background: "linear-gradient(180deg, rgba(180,210,230,0.10), rgba(62,110,150,0.06))" }}>
      <Snowflake style={{ top: 6, left: 6 }} />
      <Snowflake style={{ top: 6, right: 6 }} />
      <Snowflake style={{ bottom: 6, left: 6 }} />
      <Snowflake style={{ bottom: 6, right: 6 }} />
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: MUTED, textAlign: "center", margin: "0 0 10px", letterSpacing: "0.05em" }}>
        WINTER RETREAT &middot; 80+ ATTENDEES
      </p>
      <img
        src="/fusion-retreat.jpg"
        alt="FUSION winter retreat"
        style={{ width: "100%", borderRadius: 2, border: `1px solid rgba(210,230,245,0.3)`, display: "block" }}
      />
    </div>
  );
}

function MentorshipFrame() {
  return (
    <div style={{ position: "relative", border: `1px solid ${LINE}`, borderRadius: 3, padding: 18, background: "rgba(62,110,150,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: AMBER }} />
        <div style={{ flex: 1, maxWidth: 60, height: 1, background: `repeating-linear-gradient(90deg, ${AMBER} 0 4px, transparent 4px 8px)` }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", border: `1.5px solid ${AMBER}` }} />
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: MUTED, marginLeft: 8, letterSpacing: "0.05em" }}>
          MENTORSHIP &middot; 50+ PAIRINGS
        </span>
      </div>
      <img
        src="/fusion-mentorship.jpg"
        alt="FUSION mentorship program"
        style={{ width: "100%", borderRadius: 2, border: `1px solid ${LINE}`, display: "block" }}
      />
    </div>
  );
}



/* ---------- PARTIFUL: scrapbook polaroid ---------- */

function ScrapbookFrame() {
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
      <div style={{ position: "relative", transform: "rotate(2.5deg)" }}>
        {/* washi tape */}
        <div
          style={{
            position: "absolute", top: -14, left: "50%", transform: "translateX(-50%) rotate(-4deg)",
            width: 90, height: 26, background: "rgba(232,163,61,0.55)",
            backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.35) 0 4px, transparent 4px 10px)",
            zIndex: 2, borderRadius: 1,
          }}
        />
        <div style={{ background: "#FAF8F2", padding: "16px 16px 20px", boxShadow: "0 14px 30px rgba(0,0,0,0.4)", width: 300 }}>
          <img
            src="/partiful-event.jpg"
            alt="Partiful sponsored event"
            style={{ width: "100%", minHeight: 200, objectFit: "cover", display: "block", border: `1px solid ${LINE}` }}
          />
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic", fontSize: 13, color: "#5B5346", textAlign: "center", marginTop: 12, marginBottom: 14 }}>
            partiful.com &middot; sponsored event
          </p>

          {/* referral strip — a torn-ticket style tab */}
          <div style={{ borderTop: `1px dashed ${LINE}`, paddingTop: 12, textAlign: "center" }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "#8B7F6A", margin: "0 0 6px", letterSpacing: "0.03em" }}>
              hosting something? (yes, this is me growing my own numbers &mdash; on brand, i know)
            </p>
            
            <a
              href="https://m.partiful.com/5bSFYKZhX5b"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600,
                color: "#0F2740", background: AMBER, padding: "6px 14px", borderRadius: 20,
                textDecoration: "none",
              }}
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
    <div style={{ background: BLUE, backgroundImage: `linear-gradient(rgba(62,110,150,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(62,110,150,0.08) 1px, transparent 1px)`, backgroundSize: "40px 40px", color: TEXT, scrollSnapType: "y proximity", height: "100vh", overflowY: "scroll", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap');
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: ${LINE}; }
        @media (max-width: 860px) {
          .chapter-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .rail { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <nav className="rail" style={{ position: "fixed", left: 28, top: "50%", transform: "translateY(-50%)", zIndex: 10, display: "flex", flexDirection: "column", gap: 20 }}>
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => scrollTo(s.id)} aria-label={s.label} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, padding: 0 }}>
            <span style={{ width: active === s.id ? 9 : 6, height: active === s.id ? 9 : 6, borderRadius: "50%", background: active === s.id ? AMBER : "transparent", border: `1px solid ${active === s.id ? AMBER : LINE}`, transition: "all 0.25s ease" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: active === s.id ? AMBER : MUTED, opacity: active === s.id ? 1 : 0, transition: "opacity 0.25s ease", whiteSpace: "nowrap" }}>
              {s.label}
            </span>
          </button>
        ))}
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", scrollSnapAlign: "start", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 6vw" }}>
        <div style={{ maxWidth: 780 }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: MUTED, marginBottom: 18 }}>Kai Snyder &middot; Computer Engineering &middot; Innovation and Entrepreneurship &middot; UC Irvine</p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "clamp(38px, 6vw, 68px)", lineHeight: 1.08, margin: "0 0 24px" }}> 
            Build the system. <br /> Break down the pitch.
          </h1>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 18, lineHeight: 1.7, color: "#D8DEE6", maxWidth: 560, marginBottom: 40 }}>
            A record of the things I've built, pitched, and coordinated &mdash; from a RISC-V processor to a Filipino food app that won the judges over.
          </p>
          <button onClick={() => scrollTo("kainna")} style={{ background: "none", border: `1px solid ${AMBER}`, color: AMBER, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, padding: "10px 20px", borderRadius: 3, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
            Scroll through the work <ArrowDown size={14} />
          </button>
        </div>
      </section>

      <Chapter index={1} id="kainna" eyebrow="Project" title="Kain Na!" meta="Software product developer &middot; Next.js, Tailwind CSS" media={
  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
    <RecipeCardFrame
      src="/kainna-demo.jpg"
      alt="Kain Na! app demo screenshot"
      label="recipe / kain-na.jsx"
      footer="serves: everyone · stack: next.js, tailwind"
      rotate={-1.2}
    />
    <RecipeCardFrame
      src="/kainna-award.jpg"
      alt="Kain Na! award recognition screenshot"
      label="recipe / award.jsx"
      footer="responsive design · tailwind breakpoints"
      rotate={1.5}
    />
  </div>
}>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
          <Bullet>Built frontend software for a Filipino culinary platform &mdash; functional components, dynamic recipe cards, mobile-first Tailwind design.</Bullet>
          <Bullet>Learned Next.Js, Tailwind CSS, and Git in a Scrum cycle: peer code review, Git branching, sprint check-ins.</Bullet>
          <Bullet>Pitched story, value proposition, and technical goals to industry sponsors at FUSIONcon.</Bullet>
          <Bullet>Won "Best Pitch and Storytelling" out of 5 competing teams.</Bullet>
        </ul>
        <div><Tag>Next.js</Tag><Tag>Tailwind CSS</Tag><Tag>Git</Tag><Tag>Best Pitch Award</Tag></div>
      </Chapter>

      <Chapter index={2} id="riscv" eyebrow="Project" title="RISC-V single-cycle processor" meta="Digital design engineer &middot; Verilog" media={<ChipFrame />}>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
          <Bullet>Designed a 32-bit single-cycle processor in Verilog, from datapath to control logic.</Bullet>
          <Bullet>Implemented and verified the full R / I / S / B instruction set against the ALU, register file, and memory.</Bullet>
          <Bullet>Debugged timing and control-signal errors across dozens of test instructions.</Bullet>
        </ul>
        <div><Tag>Verilog</Tag><Tag>Computer Architecture</Tag><Tag>EECS 31L</Tag></div>
      </Chapter>

      <Chapter index={3} id="fusion" eyebrow="Experience" title="FUSION &mdash; Internal Vice President Intern" meta="Nov 2025 &ndash; Mar 2026" media={
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <WinterFrame />
    <MentorshipFrame />
  </div>
}>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
          <Bullet>Coordinated mentorship pairings for 50+ students by academic and career interest.</Bullet>
          <Bullet>Planned retreat activities, managed multi-group communications, and large-scale events for 80+ attendees.</Bullet>
          <Bullet>Organized joint meetings across student orgs to build campus-wide collaboration.</Bullet>
        </ul>
        <div><Tag>Event Ops</Tag><Tag>Cross-club Collaboration</Tag><Tag>Mentorship Program</Tag></div>
      </Chapter>

      <Chapter index={4} id="partiful" eyebrow="Experience" title="Partiful &mdash; Product Growth Lead" meta="Aug 2026 &ndash; Present" media={<ScrapbookFrame />}>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
          <Bullet>Drove brand awareness and new user growth across campus through digital and word-of-mouth outreach.</Bullet>
          <Bullet>Planned and hosted sponsored events showcasing Partiful's platform to boost retention.</Bullet>
          <Bullet>Tracked event analytics and user data to evaluate campaign performance.</Bullet>
        </ul>
        <div><Tag>Brand Outreach</Tag><Tag>Event Sponsorship</Tag><Tag>Analytics</Tag></div>
      </Chapter>

      <Chapter
        index={5}
        id="asb"
        eyebrow="Project"
        title="ASB Club Automation System"
        meta="Developer &middot; Java"
        media={
          <div style={{ border: `1px dashed ${LINE}`, borderRadius: 2, padding: 32, background: "rgba(62,110,150,0.06)", display: "flex", flexDirection: "column", gap: 16, justifyContent: "center", minHeight: 260 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: MUTED }}>Before</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, color: "#D8DEE6" }}>60 min</span>
            </div>
            <div style={{ height: 1, background: LINE }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: MUTED }}>After</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, color: AMBER }}>&lt;5 min</span>
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: MUTED, margin: 0 }}>across 115 club meeting-minute verifications, weekly</p>
          </div>
        }
      >
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
          <Bullet>Built a Java automation system verifying 115 clubs' weekly meeting minutes.</Bullet>
          <Bullet>Designed custom object classes to compare Google Sheets exports against records.</Bullet>
          <Bullet>Debugged for reliability and taught basic coding to fellow student body members.</Bullet>
        </ul>
        <div><Tag>Java</Tag><Tag>Process Automation</Tag></div>
      </Chapter>

      <section id="close" style={{ minHeight: "100vh", scrollSnapAlign: "start", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 6vw" }}>
        <div style={{ maxWidth: 640 }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: AMBER, marginBottom: 14 }}>Honors</p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 17, color: "#D8DEE6", lineHeight: 1.7, marginBottom: 40 }}>
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
