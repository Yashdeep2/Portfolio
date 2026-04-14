import { useState, useEffect } from "react";
import { Sun, Moon, ExternalLink, Mail, Github, Linkedin } from "lucide-react";

interface Experience {
  id: number;
  title: string;
  company: string;
  description: string;
  link: string;
  images: string[];
}

interface Research {
  id: number;
  title: string;
  tag: string;
  year?: string;
  publisher?: string;
  link?: string;
  focus?: string;
  description: string;
  images: string[];
}

interface Certification {
  id: number;
  title: string;
  issuer: string;
  type: string;
  logo: string;
  description?: string;
}

interface Skill {
  category: string;
  items: string[];
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
  Percentage?: string;
}

const GlobalStyles = () => (
  <style>
    {`
     /* ── DESIGN SYSTEM: TYPOGRAPHY CLASSES ── */

     .text-title {
      font-size: 15px;   /* increased */
      font-weight: 450;
      letter-spacing: -0.02em;
    }
    
    /* Section headings */
    .text-heading {
      font-size: 26px;   /* bigger jump */
      font-weight: 400;
    }
    
    /* Hero */
    .text-hero {
      font-size: clamp(44px, 4vw, 30px);
      font-weight: 800;
    }
    
    /* Body */
    .text-body {
      font-size: 12px;
      line-height: 1.5;   /* IMPORTANT */
      font-weight: 400;   /* lighter → premium */
    }
    
    /* Labels */
    .text-label {
      font-size: 11px;
      letter-spacing: 0.1em;
    }
     /* ── COLOR SYSTEM ── */
     
     /* Light mode */
     .light .text-primary {
       color: #1E293B; /* matches your dynamic text */
     }
     
     .light .text-muted {
       color: #334155; /* matches your dynamic muted body text */
     }
     
     .light .text-subtle {
       color: #64748B; /* matches your dynamic subtle text */
     }
     
     .light .text-accent {
       color: #5a3ec8;
     }
     
     /* ── Dark ── */

     .dark .text-primary {
      color: rgba(255, 255, 255, 0.92);
    }
    
    .dark .text-muted {
      color: rgba(255, 255, 255, 0.65);
    }
    
    .dark .text-subtle {
      color: rgba(255, 255, 255, 0.4);
    }
    
    .dark .text-accent {
      color: #c2dde6; /* soft cyan (matches your bg) */
    }
     
     /* ── HOVER STATES ── */
     
     .text-hover {
       transition: color 0.3s ease;
     }
     
     .dark .text-hover:hover {
      color: #ffffff;
      transform: translateY(-1px);
    }
     
     .light .text-hover:hover {
       color: #000000;
     }
     
     .text-accent-hover:hover {
       color: #5c7c89;
     }

     .text-primary,
.text-muted,
.text-accent {
  transition: color 0.25s ease;
}
    /* Optional: Adds a very subtle parallax to the background orbs */
    .ambient-orb {
      transition: transform 0.8s ease-out;
    }
    /* ── 1. GLOBAL ANIMATIONS & FADE EFFECTS ─────────────────────── */
    @keyframes float1 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-40px); } }
    @keyframes float2 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(50px); } }
    @keyframes float3 { 0%,100% { transform: translateX(0px); } 50% { transform: translateX(-60px); } }
    
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .fade-in-up {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
   
    .fade-in-up.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .animate-text { 
      animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
    }
    
    /* ── 6. INVISIBLE SCROLLBAR FOR INNER CARDS (Modern/Sleek) ── */
    /* Hide scrollbar for Chrome, Safari and Opera */
    .custom-scrollbar::-webkit-scrollbar {
      display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    .custom-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
    
    /* ── 2. HERO SECTION ───────────────────────────────────────── */
    .perspective-container { perspective: 1200px; }
    
    .hero-card {
      transition: transform 0.2s ease-out, box-shadow 0.3s ease;
      transform-style: preserve-3d;
      will-change: transform;
    }

    .card-gloss {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at var(--mouse-x) var(--mouse-y),
        rgba(255, 255, 255, 0.12) 0%,
        transparent 50%
      );
      pointer-events: none;
      z-index: 5;
    }

    /* ── 3. COMPACT PREMIUM CARDS (EXPERIENCE & RESEARCH) ───────── */
    .experience-grid { perspective: 1200px; }

    .premium-card {
      position: relative;
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.05),
        0 20px 60px rgba(0,0,0,0.2);
      min-height: auto;
      background-color: rgba(255, 255, 255, 0.05);
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
      z-index: 1;
      will-change: transform;
    }
      
    html { scroll-behavior: smooth; }
    body { overscroll-behavior: none; }
  
    /* Hover Interaction: Suble Lift & Border Glow */
    .premium-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.3);
    }

    /* Interactive Inner Glow Layer */
    .card-glow-layer {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at var(--m-x) var(--m-y),
        rgba(92, 124, 137, 0.25) 0%,
        transparent 70%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 0; 
    }
    .premium-card:hover .card-glow-layer { opacity: 1; }

    /* Button slide-up reveal inside cards */
    .hover-reveal-btn {
      transform: translateY(101%);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .premium-card:hover .hover-reveal-btn {
      transform: translateY(0);
    }

    @keyframes heroFloat {
      0%, 100% { transform: translateY(0px) rotateX(2deg) rotateY(-2deg); }
      50% { transform: translateY(-12px) rotateX(-1deg) rotateY(2deg); }
    }
    
    .hero-idle-float {
      animation: heroFloat 6s ease-in-out infinite;
    }

    /* Smoother 3D Tracking Transition */
    .hero-track-smooth {
      transition: transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease;
    }
    @media (max-width: 768px) {
      #home img {
        height: 260px !important;
      }
    }
    /* ── 4. DETAILED MODAL ─────────────────────────────────────── */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(3, 7, 18, 0.92);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      z-index: 9999;
      animation: fadeIn 0.4s ease-out forwards;
    }

    @keyframes modalZoomIn {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(30px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    .modal-animate {
      animation: modalZoomIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    /* ── 5. UTILITY & TYPOGRAPHY ───────────────────────────────── */
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* ── 1. GLOBAL SMOOTHNESS ───────────────────────────────────── */
    body { transition: background-color 0.5s ease; }

    /* ── 2. SECTION REVEAL 2.0 (The "Macro" Entrance) ───────────── */
    .section-reveal {
      opacity: 0;
      transform: translateY(40px) scale(0.98);
      filter: blur(10px);
      transition:
        opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
        transform 1.2s cubic-bezier(0.16, 1, 0.3, 1),
        filter 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .section-reveal.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0px);
    }
  `}
  </style>
);

function LoadingScreen({ done }: { done: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#fcfcfc] ${
        done
          ? "opacity-0 pointer-events-none transition-opacity duration-1000 animate-reveal-out"
          : "opacity-100"
      }`}
    >
      <div className="relative w-64 h-64 mb-10 flex items-center justify-center">
        {/* Assembly Bay */}
        <div className="absolute inset-8 border-[1px] border-slate-200/40 rounded-full animate-[spin_6s_linear_infinite]" />

        <svg
          width="80"
          height="120"
          viewBox="0 0 80 120"
          className="relative z-10"
        >
          {/* Grouping the entire robot for the breathing effect at 100% */}
          <g className="robot-final-life">
            {/* 1. Chassis */}
            <g className="robot-part assemble-chassis">
              <rect
                x="20"
                y="40"
                width="40"
                height="50"
                rx="6"
                fill="#cbd5e1"
              />
              <rect
                x="26"
                y="48"
                width="28"
                height="34"
                rx="3"
                fill="#94a3b8"
              />
            </g>

            {/* 2. Core */}
            <circle
              className="robot-part assemble-core core-pulse"
              cx="40"
              cy="65"
              r="8"
              fill="#10b981"
              fillOpacity="0.15"
              stroke="#10b981"
              strokeWidth="2"
            />

            {/* 3. Head */}
            <g className="robot-part assemble-head">
              <rect
                x="28"
                y="16"
                width="24"
                height="20"
                rx="5"
                fill="#475569"
              />
              <circle
                cx="35"
                cy="24"
                r="2.5"
                fill="#fcfcfc"
                className="eye-glow"
              />
              <circle
                cx="45"
                cy="24"
                r="2.5"
                fill="#fcfcfc"
                className="eye-glow"
              />
            </g>

            {/* 4. Arms */}
            <g className="robot-part assemble-arms">
              <path
                d="M18 45 L8 60 Q6 65, 8 70 L12 75"
                fill="none"
                stroke="#475569"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M62 45 L72 60 Q74 65, 72 70 L68 75"
                fill="none"
                stroke="#475569"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </g>
          </g>
        </svg>

        {/* Contact Sparks */}
        <div className="absolute inset-0">
          <div className="spark s1" />
          <div className="spark s2" />
          <div className="spark s3" />
        </div>
      </div>

      {/* Progress UI */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-48 h-[3px] bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#5C7C89] animate-sync-progress" />
        </div>
        <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.4em]">
          Loading_Contents
        </p>
      </div>

      <style>
        {`
          /* ── THE REVEAL DISSOLVE ── */
          @keyframes reveal-out {
            0% { clip-path: circle(100% at 50% 50%); opacity: 1; }
            100% { clip-path: circle(0% at 50% 50%); opacity: 0; }
          }
          .animate-reveal-out {
            animation: reveal-out 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
          }
          
          /* ── ASSEMBLY LOGIC ── */
          @keyframes sync-progress { 0% { width: 0%; } 100% { width: 100%; } }
          .animate-sync-progress { animation: sync-progress 3.0s linear forwards; }

          @keyframes part-snap {
            0% { transform: scale(1.4) translateY(-20px); opacity: 0; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }

          .robot-part { opacity: 0; }
          .assemble-chassis { animation: part-snap 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 0.2s; }
          .assemble-core { animation: part-snap 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 1.0s; }
          .assemble-head { animation: part-snap 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 1.8s; }
          .assemble-arms { animation: part-snap 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 2.6s; }

          /* ── THE "BREATHING" LIFE ── */
          @keyframes breathing {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-3px) scale(1.02); }
          }
          .robot-final-life {
            /* Starts breathing ONLY after arms join (3s mark) */
            animation: breathing 2s ease-in-out infinite 3s;
          }

          /* Eye and Core Effects */
          @keyframes eye-ignite {
            0% { fill: #fcfcfc; }
            100% { fill: #10b981; filter: drop-shadow(0 0 5px #10b981); }
          }
          .eye-glow { animation: eye-ignite 0.3s forwards 2.1s; }

          @keyframes core-throb {
            0%, 100% { r: 8px; fill-opacity: 0.2; }
            50% { r: 11px; fill-opacity: 0.5; }
          }
          .core-pulse { animation: core-throb 0.8s ease-in-out infinite 1.4s; }

          /* Sparks */
          @keyframes burst { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(4); opacity: 0; } }
          .spark { position: absolute; width: 4px; height: 4px; background: #10b981; border-radius: 50%; opacity: 0; }
          .s1 { top: 60%; left: 50%; animation: burst 0.4s forwards 1.0s; }
          .s2 { top: 30%; left: 50%; animation: burst 0.4s forwards 1.8s; }
          .s3 { top: 50%; left: 20%; animation: burst 0.4s forwards 2.6s; }
        `}
      </style>
    </div>
  );
}

// ── Gallery Hook ─────────────────────────────────────────────────────────────
function useGallery() {
  const [indices, setIndices] = useState<Record<string, number>>({});
  const next = (key: string, len: number) =>
    setIndices((p) => ({ ...p, [key]: ((p[key] ?? 0) + 1) % len }));
  const prev = (key: string, len: number) =>
    setIndices((p) => ({ ...p, [key]: ((p[key] ?? 0) - 1 + len) % len }));
  const set = (key: string, idx: number) =>
    setIndices((p) => ({ ...p, [key]: idx }));
  const get = (key: string) => indices[key] ?? 0;
  return { next, prev, set, get };
}

const getTheme = (dark: boolean) => {
  const colors = dark
    ? {
        // DARK: Bluish-black, Bluish-grey, Off-white
        pageBg: "bg-[#011425]",
        primary: "#5C7C89",
        secondary: "#1F4959",
        text: "#F8FAFC",
        muted: "rgba(248,250,252,0.7)",
        border: "border-white/10",
        strongBorder: "border-white/20",
      }
    : {
        // LIGHT: Frosted white, Cool greyish, Dark slate
        pageBg: "bg-[#F8FAFC]",
        primary: "#64748B",
        secondary: "#E2E8F0",
        text: "#1E293B",
        muted: "rgba(30,41,59,0.7)",
        border: "border-slate-300/60",
        strongBorder: "border-slate-400/80",
      };

  const glassBase = "border shadow-[0_8px_24px_rgba(0,0,0,0.12)]";

  const glassStrong = "backdrop-blur-xl";
  const glassSoft = "backdrop-blur-sm";

  return {
    pageBg: colors.pageBg,

    surfaceSolid: `${glassBase} ${glassStrong} bg-[${colors.secondary}]/25 ${colors.border}`,
    surface: `${glassBase} bg-[${colors.secondary}]/15 ${colors.border}`,
    card: `${glassBase} ${glassSoft} ${
      dark ? "bg-[#1F4959]/10" : "bg-[#A0D2EB]/20"
    } ${colors.border} transition-colors duration-300`,

    // Using a richer dark slate (#1E293B) for primary light text, and a smooth medium slate (#334155) for body text
    text: dark ? "text-[#F8FAFC]" : "text-[#1E293B]",
    muted: dark ? "text-[#F8FAFC]/100" : "text-[#334155]",
    subtle: dark ? "text-[#F8FAFC]/40" : "text-[#64748B]",
    accent: dark ? "text-[#8FB7C6]" : "text-[#5A3EC8]",

    badge: `${glassBase} bg-[${colors.primary}]/70 text-white ${colors.strongBorder}`,

    btnPrimary: `${glassBase} bg-[${colors.primary}]/80 text-white ${colors.border} hover:bg-[${colors.secondary}]/80 transition-colors duration-300`,

    btnGhost: `${glassBase} bg-transparent text-[${colors.text}] border-[${colors.primary}]/40 hover:bg-[${colors.primary}]/20 transition-colors duration-300`,

    // Uses your deep bluish-grey for dark, and frosted white for light
    nav: `backdrop-blur-xl ${dark ? "bg-[#011425]/80" : "bg-white/70"} ${
      colors.border
    } border-b`,

    headingGrad: `from-[${colors.primary}] to-[${colors.text}]`,
  };
};

// ── Main App ──────────────────────────────────────────────────────────────────
export function App() {
  const [selectedResearch, setSelectedResearch] = useState<Research | null>(
    null
  );
  const [dark, setDark] = useState(true);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [heroRot, setHeroRot] = useState({ x: 0, y: 0 });
  const [gloss, setGloss] = useState({ x: 50, y: 50 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  const navItems = [
    "home",
    "experience",
    "research",
    "certifications",
    "skills",
    "education",
    "contact",
  ];

  const gallery = useGallery();

  // 1. Independent Loading Timer
  useEffect(() => {
    const t = setTimeout(() => setLoadingDone(true), 3200);
    return () => clearTimeout(t);
  }, []);

  // 2. Scroll Progress Tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Independent Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible((p) => ({ ...p, [e.target.id]: true }));
            setActiveSection(e.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.25, // Works flawlessly with viewport root
      }
    );

    // Slight delay to ensure DOM is ready
    setTimeout(() => {
      document
        .querySelectorAll("section[id]")
        .forEach((s) => observer.observe(s));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const handleHeroMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setHeroRot({ x: (y - 0.5) * -16, y: (x - 0.5) * 16 });
    setGloss({ x: x * 100, y: y * 100 });
    setIsHeroHovered(true);
  };

  const resetHero = () => {
    setIsHeroHovered(false);
    setHeroRot({ x: 0, y: 0 });
    setGloss({ x: 50, y: 50 });
  };

  // ── THEME SYSTEM (CRYSTAL CLEAR GLASSMORPHISM) ──
  const theme = getTheme(dark);

  // ── ALIASES ──
  const surface = theme.surface;
  const surfaceSolid = theme.surfaceSolid;
  const cardBg = theme.card;
  const text = theme.text;
  const muted = theme.muted;
  const accent = theme.accent;
  const badge = theme.badge;
  const headingGrad = theme.headingGrad;
  const btnGhost = theme.btnGhost;
  const navBg = theme.nav;

  // ── Data ─────────────────────────────────────────────────────────────────
  const experiences: Experience[] = [
    {
      id: 1,
      title: "HR Analytics Automation System",
      company: "Avaada Group",
      description:
        "Developed an automated HR analytics system using Excel VBA and Power BI, reducing manual reporting effort by over 85% and enabling real-time workforce insights. Designed end-to-end data pipelines for data collection, processing, and visualization to support faster decision-making.",
      link: "#",
      images: [
        "public/HR 2.0 1.png",
        "public/HR 2.0 2.png",
        "public/HR 2.0 3.png",
      ],
    },
    {
      id: 2,
      title: "Real-Time Production Monitoring Dashboard",
      company: "Enterprise Automation",
      description:
        "Built a real-time web dashboard using Firebase to capture and process hourly production data from authenticated users. Implemented role-based Gmail access control and dynamic data visualization, replacing manual reporting workflows and improving operational efficiency and data reliability.",
      link: "https://yashdeep2.github.io/Stringer1/",
      images: [
        "public/Stringer 1.png",
        "public/Stringer 2.png",
        "public/Stringer 3.png",
      ],
    },
    {
      id: 3,
      title: "SAP Data Extraction Automation",
      company: "Enterprise Automation",
      description:
        "Built a VBA-based automation system to extract and process SAP data, eliminating repetitive manual workflows and improving reporting efficiency. Enabled structured data handling for faster and more reliable business analysis.",
      link: "#",
      images: [
        "public/SAP aut 2.png",
        "public/SAP aut 1.png",
        "public/SAP aut 3.png",
      ],
    },

    {
      id: 4,
      title: "Smart Habit Tracking Web App",
      company: "Personal Product Development",
      description:
        "Built a Firebase-integrated habit tracking web app with real-time data updates, enabling users to manage habits, visualize progress through calendar-based tracking, and analyze consistency using interactive dashboards. Implemented reward-based engagement logic and habit-wise performance insights to enhance user retention and behavioral consistency.",
      link: "https://yashdeep2.github.io/Health/",
      images: [
        "public/Habit 1n.png",
        "public/Habit 2.png",
        "public/Habit 3.png",
        "public/Habit 4.png",
        "public/Habit 5.png",
      ],
    },
    {
      id: 5,
      title: "Enterprise Data Pipeline Automation",
      company: "Data Engineering Project",
      description:
        "Designed automated data pipelines for enterprise workflows, enabling seamless batch processing and structured data movement across systems. Improved data consistency and reduced manual intervention in business operations.",
      link: "#",
      images: ["public/SCript 1.png", "public/Workflow.png"],
    },
    {
      id: 6,
      title: "Industrial Sensor Alarm System",
      company: "Manufacturing Process Innovation",
      description:
        "Developed an industrial monitoring system using sensors to detect conveyor belt slippage & failures and trigger automated alerts. Improved operational safety and reduced equipment downtime in manufacturing processes.",
      link: "#",
      images: ["public/Belt.png"],
    },
    {
      id: 7,
      title: "MediBot IoT Healthcare System",
      company: "IoT & AI Research Project",
      description:
        "Built an IoT-based healthcare monitoring system integrating multiple sensors and machine learning models for early disease prediction. Enabled real-time patient monitoring and cloud-based reporting through an accessible interface.",
      link: "#",
      images: [
        "public/Medibot 1.png",
        "public/Medibot 2.png",
        "public/MEDI BOT 4.png",
      ],
    },
    {
      id: 8,
      title: "Automated File Monitoring System",
      company: "Workflow Automation",
      description:
        "Built a real-time system that automatically detects and processes newly created PDF files across a local network, enabling automated naming, tracking and file management workflows.",
      link: "#",
      images: ["public/File monitoring.png"],
    },
    {
      id: 9,
      title: "Python Automation & Image Processing Tools",
      company: "Software Automation Projects",
      description:
        "Developed automation tools using Python for image processing, data formatting, and workflow optimization. Streamlined repetitive tasks and improved efficiency across multiple use cases.",
      link: "#",
      images: ["public/Python 1.png", "public/Pyhton 3.png"],
    },
  ];

  const research: Research[] = [
    {
      id: 1,
      title:
        "Components & Control Scheme for Line-of-Sight Stabilization in Defense Applications",
      tag: "IEEE",
      year: "2023",
      link: "https://ieeexplore.ieee.org/document/10028746",
      description:
        "Designed control architectures for Line-of-Sight stabilization systems, improving tracking precision and disturbance rejection in dynamic environments. Focused on real-time feedback systems and high-accuracy targeting applications.",
      focus: "Control Systems | Embedded Systems | Defense Technology",
      images: ["public/LOS 1.png", "public/LOS 2.png", "public/LOS $.png"],
    },
    {
      id: 2,
      title: "Experimental Investigation of Roof-top Solar PV System",
      tag: "HBRP Publication",
      year: "2023",
      link: "https://www.researchgate.net/publication/369753826_Experimental_Investigation_of_Roof-top_Solar_PV_System",
      description:
        "Conducted an experimental performance evaluation of a rooftop Solar Photovoltaic (PV) system under varying environmental and load conditions. Analyzed output efficiency, temperature effects, and system losses to optimize power generation and enhance renewable energy utilization in urban installations.",
      focus: "Renewable Energy | Solar PV Systems | Power Optimization",
      images: [
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1000&h=560&fit=crop",
        "public/SOLAR PV 1.png",
      ],
    },
    {
      id: 3,
      title: "Medical Assistance Bot: DOBO",
      tag: "Taylor & Francis Group",
      year: "2023",
      link: "https://www.taylorfrancis.com/chapters/edit/10.1201/9781032644752-18/medical-assistance-bot-dobo-sulekha-saxena-shobhit-singh-rawat-yashdeep-tyagi-yash-rajput-suyash-kumar-srivastava",
      description:
        "Designed and developed 'DOBO', an intelligent medical assistance bot integrating automated response logic and embedded control mechanisms to provide preliminary healthcare support. The system enhances accessibility to basic medical guidance through structured interaction and real-time query handling.",
      focus: "Robotics | Healthcare Automation | Intelligent Systems",
      images: [
        "public/Medibot 1.png",
        "public/Medibot 2.png",
        "public/MEDI BOT 4.png",
      ],
    },
    {
      id: 4,
      title: "Sustainable Energy Production through Piezo Electric Tile",
      tag: "IEEE",
      year: "2024",
      link: "https://ieeexplore.ieee.org/document/10830359",
      description:
        "Developed and evaluated a piezoelectric energy harvesting system capable of generating electrical power from human footsteps and vehicular vibrations. Proposed a scalable smart-floor architecture for micro-energy generation in high-footfall environments and sustainable infrastructure applications.",
      focus:
        "Energy Harvesting | Piezoelectric Systems | Sustainable Engineering",
      images: ["public/TILES 2.png"],
    },
    {
      id: 5,
      title:
        "A Novel Cryptographic Approach: Armstrong Number Key Generation with RGB Encoding for Enhanced Data Security",
      tag: "IEEE",
      year: "2024",
      link: "https://ieeexplore.ieee.org/document/10841574",
      description:
        "Proposed a novel cryptographic key generation algorithm utilizing Armstrong number logic combined with RGB encoding techniques to strengthen data encryption. The approach enhances key unpredictability while maintaining computational efficiency for secure digital communication systems.",
      focus: "Cryptography | Data Security | Secure Communication Systems",
      images: [
        "public/Crypto image 1.png",
        "public/crypto image 2.png",
        "public/Cryptographic graph.png",
      ],
    },
    {
      id: 6,
      title: "Patent: EV Power Saving System",
      tag: "Patent Filed",
      description:
        "Designed an energy optimization framework for electric vehicles to enhance power utilization efficiency and extend operational range. Focused on intelligent load management and energy conservation mechanisms within EV subsystems.",
      focus: "Electric Vehicles | Energy Optimization | Smart Power Management",
      images: [
        "public/EV 1.png",
        "public/EV 2.png",
        "public/EV 3.png",
        "public/EV 4.png",
      ],
    },
    {
      id: 7,
      title:
        "Patent: Method for Sustainable Energy Generation via Piezoelectric Tiles",
      tag: "Patent Filed",
      description:
        "Developed a sustainable energy harvesting method using piezoelectric tiles to capture mechanical stress from footsteps and vehicle motion. Proposed scalable infrastructure integration for smart cities and decentralized micro-power generation.",
      focus: "Sustainable Infrastructure | Energy Harvesting | Smart Cities",
      images: ["public/TILES 2.png"],
    },
  ];

  const certifications: Certification[] = [
    {
      id: 1,
      title: "Telecommunication Internship",
      issuer: "Power Grid",
      type: "Internship",
      logo: "public/UPPCL.png",
      description:
        "Exposure to power transmission networks, telecom infrastructure, and real-time grid communication systems.",
    },
    {
      id: 2,
      title: "Front-End Web Development",
      issuer: "Buzzintely",
      type: "Internship",
      logo: "public/Buzzintely.png",
      description:
        "Built responsive UI components with focus on user experience, layout structuring, and frontend logic.",
    },
    {
      id: 3,
      title: "Build IoT Things",
      issuer: "Udemy",
      type: "Certification",
      logo: "https://cdn.worldvectorlogo.com/logos/udemy-2.svg",
      description:
        "Hands-on IoT systems with sensor integration, data flow, and connected device applications.",
    },
    {
      id: 4,
      title: "Six Sigma Yellow Belt",
      issuer: "Six Sigma",
      type: "Quality",
      logo: "public/six-sigma.png",
      description:
        "Applied process optimization techniques for efficiency improvement and defect reduction.",
    },
    {
      id: 5,
      title: "IMS Internal Auditor",
      issuer: "ISO Standards",
      type: "Compliance",
      logo: "public/iso-symbol.png",
      description:
        "Auditing ISO systems for compliance, process improvement, and operational standardization.",
    },
    {
      id: 6,
      title: "Certified First Aider",
      issuer: "Red Cross",
      type: "Safety",
      logo: "public/red-cross.png",
      description:
        "Trained in emergency response, workplace safety, and critical situation handling.",
    },
    {
      id: 7,
      title: "Enhancing Soft Skills",
      issuer: "NPTEL",
      type: "Certification",
      logo: "public/idkr1SGAoi_logos.jpeg",
      description:
        "Improved communication, teamwork, and professional interaction skills.",
    },
    {
      id: 8,
      title: "Introduction to IoT",
      issuer: "NPTEL",
      type: "Certification",
      logo: "public/idkr1SGAoi_logos.jpeg",
      description:
        "Fundamentals of IoT architecture, sensor networks, and real-time data systems.",
    },
    {
      id: 9,
      title: "Conscious Engineering",
      issuer: "VE Cell",
      type: "Workshop",
      logo: "public/VE cell.jfif",
      description:
        "Focus on sustainable engineering, ethical design, and real-world problem solving.",
    },
    {
      id: 10,
      title: "Best Kaizen Award",
      issuer: "Avaada",
      type: "Award",
      logo: "https://cdn-icons-png.flaticon.com/512/2583/2583344.png",
      description:
        "Recognized for implementing impactful process improvements and efficiency gains.",
    },
    {
      id: 11,
      title: "Employee of the Month",
      issuer: "Avaada",
      type: "Award",
      logo: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
      description:
        "Awarded for high performance, ownership, and strong problem-solving contribution.",
    },
  ];

  const skills: Skill[] = [
    {
      category: "Data Engineering",
      items: [
        "Excel Automation",
        "VBA Development",
        "Power BI Dashboards",
        "Data Pipeline Automation",
        "SAP Data Extraction Automation",
        "Batch Process Automation",
      ],
    },
    {
      category: "Software Dev",
      items: [
        "Python Scripting",
        "Web Application Development",
        "AppSheet Application Development",
        "Automation Tools Development",
        "Network Monitoring Tools",
        "Data Processing Systems",
      ],
    },
    {
      category: "AI-Driven Development",
      items: [
        "Problem Solving & System Design Thinking",
        "AI-Assisted Coding Workflows",
        "Rapid Prototyping with AI Tools",
        "Prompt Engineering for Development",
        "AI-Guided Data Processing",
        "Automation Script Generation",
      ],
    },
    {
      category: "IoT Systems",
      items: [
        "Sensor Based Automation",
        "Industrial Process Optimization",
        "IoT System Design",
        "Embedded Prototyping",
        "Hardware System Integration",
        "Industrial Monitoring Systems",
      ],
    },
  ];

  const education: Education[] = [
    {
      id: 1,
      degree: "B.Tech Electronics and Communication Engineering",
      institution: "Ajay Kumar Garg Engineering College",
      period: "2020 – 2024",
      gpa: "8",
    },
    {
      id: 2,
      degree: "Class XII (CBSE)",
      institution: "Dewan Public School, Hapur",
      period: "2019",
      Percentage: "89.6%",
    },
  ];

  const getSectionCardClasses = (sectionId: string) => {
    // Reveal instantly checks both flags so cards animate up precisely when loading is done
    const isVisible = loadingDone && visible[sectionId];
    return `w-full max-w-[95%] xl:max-w-[85rem] mx-auto transform-gpu transition-colors duration-1000 ease-out z-10 relative ${
      isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-24 scale-95"
    }`;
  };

  return (
    <div className={dark ? "dark" : "light"}>
      <GlobalStyles />
      <LoadingScreen done={loadingDone} />

      {/* 1. PROGRESS BAR */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#5C7C89]/40 via-[#5C7C89] to-[#5C7C89]/40 z-[1000] transition-colors duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 2. BACKGROUND IMAGES (Preloaded & Crossfaded) */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#011425]">
        <img
          src="public/shubham-dhage-rzqjQjGvOBQ-unsplash (2).jpg"
          alt="Light Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src="public/sebastian-svenson-d2w-_1LJioQ-unsplash.jpg"
          alt="Dark Background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
            dark ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-0 transition-colors duration-700 ease-in-out ${
            dark ? "bg-[#011425]/70" : "bg-white/20"
          }`}
        />
      </div>

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 w-full z-50 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className={`text-sm font-semibold tracking-wide ${accent}`}>
            YDT
          </span>
          <div className="flex items-center gap-5">
            <div className="hidden md:flex gap-5">
              {navItems.map((item) => {
                // 1. Check if this specific button is the active section
                const isActive = activeSection === item;

                return (
                  <button
                    key={item}
                    onClick={() =>
                      document
                        .getElementById(item)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className={`text-label capitalize transition-all duration-300 ${
                      isActive
                        ? dark
                          ? "text-[#f8fafc] scale-101" // Dark Mode Active: Off-white
                          : "text-slate-900 scale-101" // Light Mode Active: Darker greyish
                        : dark
                        ? "text-[#8BA3B0] hover:text-slate-200" // Dark Mode Inactive: Bluish-grey
                        : "text-slate-500 hover:text-slate-700" // Light Mode Inactive: Cool greyish
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setDark(!dark)}
              className={`w-8 h-8 flex items-center justify-center rounded-xl border transition-colors duration-200 ${btnGhost}`}
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero / Business Card ────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        <div
          className={`w-full max-w-4xl z-10 section-reveal ${
            visible["home"] ? "visible" : ""
          }`}
          onMouseMove={handleHeroMove}
          onMouseLeave={resetHero}
        >
          <div
            className="w-full h-full transition-transform duration-200 ease-out"
            style={{
              transform: `
              scale(${isHeroHovered ? 0.995 : 1})
              rotateX(${heroRot.x * 0.5}deg)
              rotateY(${heroRot.y * 0.5}deg)
            `,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className={`relative backdrop-blur-2xl glass ${surface} rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-300 ${
                isHeroHovered ? "shadow-black/50 border-white/20" : ""
              }`}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-30 z-10 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${gloss.x}% ${gloss.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
                }}
              />

              <div className="grid md:grid-cols-5 min-h-[520px] relative z-20">
                <div className="md:col-span-2 relative group overflow-hidden bg-slate-900">
                  <img
                    src="public/Hero.png"
                    alt="Profile"
                    className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1623]/80 via-transparent to-transparent" />
                </div>

                <div className="md:col-span-3 p-10 md:p-12 flex flex-col justify-center relative">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-8 bg-[#5C7C89]/50" />
                      <p className="text-label text-accent">
                        Automation • Data Systems • Problem Solving
                      </p>
                    </div>
                    <h1 className="text-hero text-primary tracking-tight">
                      Yashdeep Tyagi
                      <br />
                    </h1>

                    <div className="space-y-4 max-w-sm mt-4">
                      <p className={`text-[13px] leading-relaxed ${muted}`}>
                        Electronics & Communication Engineer focused on building
                        automation systems, data-driven workflows, and
                        intelligent monitoring solutions.
                      </p>

                      <p className={`text-[13px] leading-relaxed ${muted}`}>
                        I specialize in solving real-world problems using
                        structured thinking, rapid learning, and AI-assisted
                        development — enabling faster execution, scalable
                        systems, and efficient decision-making.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4 relative z-20">
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() =>
                          document
                            .getElementById("contact")
                            ?.scrollIntoView({ behavior: "smooth" })
                        }
                        className={`px-8 py-4 text-xs font-black tracking-widest rounded-full border transition-all duration-300 uppercase hover:scale-105 active:scale-95 ${
                          dark
                            ? "bg-[#5C7C89]/80 text-[#F8FAFC] border-[#5C7C89]/30 hover:bg-[#5C7C89] hover:shadow-[0_0_30px_rgba(92,124,137,0.4)]" // Dark mode: Bluish-grey with glow
                            : "bg-[#64748B] text-[#F8FAFC] border-[#64748B]/30 hover:bg-[#64748B] hover:shadow-[0_0_30px_rgba(100,116,139,0.4)]" // Light mode: Solid cool grey, darkens on hover
                        }`}
                      >
                        Get In Touch
                      </button>
                      <button
                        onClick={() =>
                          document
                            .getElementById("experience")
                            ?.scrollIntoView({ behavior: "smooth" })
                        }
                        className={`px-8 py-4 text-xs font-black tracking-widest rounded-full border transition-all duration-300 uppercase hover:scale-101 ${
                          dark
                            ? "bg-transparent text-[#F8FAFC] border-[#5C7C89]/50 hover:bg-[#F8FAFC] hover:text-[#011425]" // Dark mode hover
                            : "bg-transparent text-[#1E293B] border-[#64748B]/50 hover:bg-[#1E293B] hover:text-[#F8FAFC]" // Light mode hover
                        }`}
                      >
                        View Projects
                      </button>
                    </div>

                    <div className="flex items-center gap-6 pt-8 border-t border-white/5">
                      {[
                        {
                          icon: <Github size={20} />,
                          href: "https://github.com/Yashdeep2",
                        },
                        {
                          icon: <Linkedin size={20} />,
                          href: "https://www.linkedin.com/in/yashdeep-tyagi-62489820b/",
                        },
                        {
                          icon: <Mail size={20} />,
                          href: "mailto:yashdeep242002@email.com",
                        },
                      ].map((s, i) => (
                        <a
                          key={i}
                          href={s.href}
                          className={`text-slate-500 hover:${accent} transition-all duration-300 hover:-translate-y-1.5 relative z-30`}
                        >
                          {s.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Work Experience ─────────────────────────────────────────────── */}
      <section
        id="experience"
        className="relative min-h-screen w-full pt-24 pb-12 px-4 flex items-start"
      >
        <div className={getSectionCardClasses("experience")}>
          <div
            className={`rounded-[2.5rem] p-6 md:p-8 border shadow-2xl relative w-full max-h-none ${surfaceSolid}`}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#5C7C89]/50 to-transparent" />

            <SectionHeading
              label="Projects / Experience"
              accent={accent}
              headingGrad={headingGrad}
              muted={muted}
            />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {experiences.map((exp: Experience, i: number) => {
                const technicalFocus = exp.title
                  .split(" ")
                  .slice(0, 2)
                  .join(" • ");

                return (
                  <div
                    key={exp.id}
                    onClick={() => setSelectedExp(exp)}
                    style={{ transitionDelay: `${i * 10}ms` }}
                    className={`group premium-card relative flex flex-col rounded-[2.5rem] border ${cardBg} cursor-pointer p-2 md:p-2 transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.02] hover:border-[#5C7C89]/50 hover:shadow-2xl ${
                      visible["experience"]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <div className="card-glow-layer" />
                    <div className="h-36 overflow-hidden relative rounded-[1.8rem] mb-4">
                      <img
                        src={exp.images[0]}
                        alt={exp.title}
                        className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${
                          dark ? "from-[#0F2230]/90" : "from-white/90"
                        } to-transparent opacity-60`}
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <div className="px-6 py-2.5 bg-[#5C7C89] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-[0_10px_20px_rgba(92,124,137,0.4)]">
                          View
                        </div>
                      </div>
                    </div>

                    <div className="px-4 pb-6 flex flex-col flex-grow justify-between relative z-10">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5C7C89] animate-pulse" />
                          <p className="text-label text-accent">
                            {technicalFocus}
                          </p>
                        </div>
                        <h3 className="text-title text-primary text-hover">
                          {exp.title}
                        </h3>
                      </div>

                      <div className="mt-6 pt-4 border-t dark:border-white/10 border-slate-200 flex items-center justify-between opacity-70 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-primary">
                          Detailed View
                        </span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="translate-x-[-4px] group-hover:translate-x-0 transition-transform"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Modal Logic (Optimized Glassmorphism Modal) */}
      {selectedExp && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setSelectedExp(null)}
          />

          {/* Modal Container */}
          <div
            className={`relative w-full max-w-7xl max-h-[90vh] ${
              dark
                ? "bg-[#0f1623]/70 backdrop-blur-3xl border-white/10 text-white"
                : "bg-white/70 backdrop-blur-3xl border-white text-slate-900"
            } border rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl modal-animate`}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedExp(null)}
              className="absolute top-6 right-6 z-[1100] w-10 h-10 flex items-center justify-center rounded-full bg-black/20 border border-white/10 text-slate-400 hover:text-white hover:bg-[#5C7C89] transition-all"
            >
              ✕
            </button>

            <div className="flex flex-col lg:flex-row h-full overflow-y-auto">
              {/* LEFT SIDE - IMAGES */}
              <div
                className={`lg:w-3/5 p-6 md:p-10 ${
                  dark ? "bg-black/20" : "bg-white/40"
                } flex flex-col gap-6`}
              >
                {/* Main Image */}
                <div className="aspect-video rounded-[2rem] overflow-hidden border dark:border-white/10 border-slate-200 shadow-2xl bg-black">
                  <img
                    src={
                      selectedExp?.images[
                        gallery.get(`modal-${selectedExp?.id}`)
                      ]
                    }
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-3 gap-3">
                  {selectedExp?.images.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      onClick={() =>
                        gallery.set(`modal-${selectedExp?.id}`, idx)
                      }
                      className={`aspect-[16/10] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                        gallery.get(`modal-${selectedExp?.id}`) === idx
                          ? "border-[#5C7C89] scale-95 shadow-lg"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE - CONTENT */}
              <div className="lg:w-2/5 p-8 md:p-12 flex flex-col gap-6 justify-center relative z-10">
                {/* Company Label */}
                <div className="flex items-center gap-3">
                  <div className="h-px w-10 bg-[#5C7C89]" />
                  <span
                    className={`text-xs font-bold tracking-[0.4em] uppercase ${accent}`}
                  >
                    {selectedExp?.company}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className={`text-heading bg-gradient-to-r from-[#5C7C89] via-[#7FA1AE] to-[#A7C0C9] bg-clip-text text-transparent`}
                >
                  {selectedExp?.title}
                </h2>

                {/* Description */}
                <p className="text-body text-muted leading-relaxed text-sm md:text-base">
                  {selectedExp?.description}
                </p>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#5C7C89]/30 to-transparent" />

                {/* Button */}
                <a
                  href={selectedExp?.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit flex items-center gap-3 px-6 py-3 bg-[#5C7C89] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#5C7C89]/80 hover:-translate-y-1 transition-all shadow-lg active:scale-95"
                >
                  Project Link <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Research Work ────────────────────────── */}
      <section
        id="research"
        className="relative min-h-screen w-full pt-24 pb-12 px-4 flex items-start"
      >
        <div className={getSectionCardClasses("research")}>
          <div
            className={`rounded-[2.5rem] p-6 md:p-8 border shadow-2xl relative w-full max-h-none ${surfaceSolid}`}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#5C7C89]/50 to-transparent" />

            <div className="max-w-7xl mx-auto">
              <SectionHeading
                label="Research Repository"
                accent={accent}
                headingGrad={headingGrad}
                muted={muted}
              />

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {research.map((res: Research, i: number) => {
                  const mainFocus = res.focus
                    ? res.focus.split("|")[0].trim()
                    : res.tag;

                  return (
                    <div
                      key={res.id}
                      onClick={() => setSelectedResearch(res)}
                      style={{ transitionDelay: `${i * 10}ms` }}
                      className={`group premium-card relative flex flex-col rounded-[2.5rem] border ${cardBg} cursor-pointer p-2 md:p-2 transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.02] hover:border-[#5C7C89]/50 hover:shadow-2xl ${
                        visible["research"]
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                    >
                      <div className="card-glow-layer" />

                      {/* IMAGE */}
                      <div className="h-36 overflow-hidden relative rounded-[1.8rem] mb-4">
                        <img
                          src={res.images[0]}
                          alt={res.title}
                          className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${
                            dark ? "from-[#0F2230]/90" : "from-white/90"
                          } to-transparent opacity-60`}
                        />

                        {/* HOVER BUTTON */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                          <div className="px-6 py-2.5 bg-[#5C7C89] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-[0_10px_20px_rgba(92,124,137,0.4)]">
                            View
                          </div>
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="px-4 pb-6 flex flex-col flex-grow justify-between relative z-10">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5C7C89] animate-pulse" />
                            <p className="text-label text-accent">
                              {res.focus
                                ? res.focus.split("|")[0].trim()
                                : res.tag}
                            </p>
                          </div>

                          {/* MATCHED TITLE */}
                          <h3 className="text-title text-primary text-hover">
                            {res.title}
                          </h3>
                        </div>

                        {/* FOOTER */}
                        <div className="mt-6 pt-4 border-t dark:border-white/10 border-slate-200 flex items-center justify-between opacity-70 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-primary">
                            Detailed View
                          </span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="translate-x-[-4px] group-hover:translate-x-0 transition-transform"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Research Modal - Unified with Project Modal */}
        {selectedResearch && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setSelectedResearch(null)}
            />

            {/* Modal */}
            <div
              className={`relative w-full max-w-6xl max-h-[90vh] ${
                dark
                  ? "bg-[#0f1623]/70 backdrop-blur-3xl border-white/10 text-white"
                  : "bg-white/70 backdrop-blur-3xl border-white text-slate-900"
              } border rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl modal-animate`}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedResearch(null)}
                className="absolute top-6 right-6 z-[1100] w-10 h-10 flex items-center justify-center rounded-full bg-black/20 border border-white/10 text-slate-400 hover:text-white hover:bg-[#5C7C89] transition-all"
              >
                ✕
              </button>

              <div className="flex flex-col lg:flex-row h-full overflow-hidden">
                {/* LEFT (Images) */}
                <div
                  className={`lg:w-3/5 p-6 md:p-10 ${
                    dark ? "bg-black/20" : "bg-white/40"
                  } flex flex-col gap-6`}
                >
                  <div className="aspect-video rounded-[2rem] overflow-hidden border dark:border-white/10 border-slate-200 shadow-2xl bg-black">
                    <img
                      src={
                        selectedResearch?.images[
                          gallery.get(`res-modal-${selectedResearch?.id}`)
                        ]
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {selectedResearch?.images.map(
                      (img: string, idx: number) => (
                        <div
                          key={idx}
                          onClick={() =>
                            gallery.set(
                              `res-modal-${selectedResearch?.id}`,
                              idx
                            )
                          }
                          className={`aspect-[16/10] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                            gallery.get(`res-modal-${selectedResearch?.id}`) ===
                            idx
                              ? "border-[#5C7C89] scale-95 shadow-lg"
                              : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={img}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* RIGHT (Content) */}
                <div className="lg:w-2/5 p-8 md:p-12 flex flex-col gap-6 justify-center relative z-10">
                  {/* Meta */}
                  <div className="flex items-center gap-3">
                    <div className="h-px w-10 bg-[#5C7C89]" />
                    <span
                      className={`text-xs font-bold tracking-[0.4em] uppercase ${accent}`}
                    >
                      {selectedResearch?.tag} • {selectedResearch?.year}
                    </span>
                  </div>

                  {/* Title (MATCHED) */}
                  <h2
                    className={`text-heading bg-gradient-to-r from-[#5C7C89] via-[#7FA1AE] to-[#A7C0C9] bg-clip-text text-transparent`}
                  >
                    {selectedResearch?.title}
                  </h2>

                  {/* Body (MATCHED) */}
                  <p className="text-body text-muted leading-relaxed text-sm md:text-base">
                    {selectedResearch?.description}
                  </p>

                  {/* Tags */}
                  {selectedResearch?.focus && (
                    <div className="flex flex-wrap gap-2">
                      {selectedResearch?.focus.split("|").map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 text-[10px] rounded-lg ${
                            dark
                              ? "bg-white/5 border border-white/10 text-white/80"
                              : "bg-[#5C7C89]/10 border border-[#5C7C89]/20 text-slate-700"
                          }`}
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#5C7C89]/30 to-transparent" />

                  {/* CTA */}
                  {selectedResearch?.link && (
                    <a
                      href={selectedResearch?.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-fit flex items-center gap-3 px-6 py-3 bg-[#5C7C89] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#5C7C89]/80 hover:-translate-y-1 transition-all shadow-lg active:scale-95"
                    >
                      View Publication <ExternalLink size={14} />
                    </a>
                  )}

                  {/* Footer */}
                  <div className="pt-4 border-t dark:border-white/10 border-slate-200 flex items-center justify-between text-xs opacity-50">
                    <span>PUBLICATION_ID: {selectedResearch?.id}</span>
                    <span>IEEE_READY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Certifications ─────────────────────────────────────────────── */}
      <section
        id="certifications"
        className="relative min-h-screen w-full pt-24 pb-12 px-4 flex items-start"
      >
        <div className={getSectionCardClasses("certifications")}>
          <div
            className={`rounded-[2.5rem] p-6 md:p-8 border shadow-2xl relative w-full max-h-none ${surfaceSolid}`}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#5C7C89]/50 to-transparent" />

            <div className="max-w-7xl mx-auto">
              <SectionHeading
                label="Certifications"
                accent={accent}
                headingGrad={headingGrad}
                muted={muted}
              />

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {certifications.map((cert: Certification, i: number) => {
                  const handleMouseMove = (
                    e: React.MouseEvent<HTMLDivElement>
                  ) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty(
                      "--m-x",
                      `${e.clientX - rect.left}px`
                    );
                    card.style.setProperty(
                      "--m-y",
                      `${e.clientY - rect.top}px`
                    );
                  };

                  return (
                    <div
                      key={cert.id}
                      onMouseMove={handleMouseMove}
                      style={{
                        transitionDelay: `${i * 10}ms`,
                        minHeight: "280px",
                      }}
                      className={`group premium-card relative flex flex-col rounded-[2.5rem] ${cardBg} p-4 md:p-5 transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.02] hover:shadow-2xl ${
                        visible["certifications"]
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                    >
                      <div className="card-glow-layer" />
                      <div className="flex justify-between items-start mb-5 relative z-10">
                        <span
                          className={`px-2 py-0.5 rounded-md ${badge} text-[7px] font-black uppercase tracking-[0.2em] shadow-sm`}
                        >
                          {cert.type}
                        </span>
                        <div className="w-11 h-11 rounded-lg bg-white/10 p-1.5 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                          <img
                            src={cert.logo}
                            alt={cert.issuer}
                            className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col flex-grow gap-3 relative z-10">
                        {/* TITLE */}
                        <h3 className="text-title text-primary text-hover leading-snug">
                          {cert.title}
                        </h3>

                        {/* ISSUER (like technical focus) */}
                        <p className="text-label text-accent">{cert.issuer}</p>

                        {/* DESCRIPTION (lighter + controlled) */}
                        <p className="text-body text-muted text-sm leading-relaxed line-clamp-3">
                          {cert.description ||
                            "Credential verifying expertise in industrial engineering and process automation protocols."}
                        </p>

                        {/* SPACING BALANCER */}
                        <div className="mt-auto pt-4 border-t dark:border-white/10 border-slate-200 opacity-60" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills & Expertise (Updated & Unified) ───────────────────────── */}
      <section
        id="skills"
        className="relative min-h-screen w-full pt-24 pb-12 px-4 flex items-start"
      >
        <div className={getSectionCardClasses("skills")}>
          <div
            className={`rounded-[2.5rem] p-6 md:p-8 border shadow-2xl relative w-full max-h-none ${surfaceSolid}`}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#5C7C89]/50 to-transparent" />

            <div className="max-w-7xl mx-auto">
              <SectionHeading
                label="Technical Skills"
                accent={accent}
                headingGrad={headingGrad}
                muted={muted}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {skills.map((group, i) => {
                  const handleMouseMove = (
                    e: React.MouseEvent<HTMLDivElement>
                  ) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty(
                      "--m-x",
                      `${e.clientX - rect.left}px`
                    );
                    card.style.setProperty(
                      "--m-y",
                      `${e.clientY - rect.top}px`
                    );
                  };

                  return (
                    <div
                      key={group.category}
                      onMouseMove={handleMouseMove}
                      style={{
                        transitionDelay: `${i * 10}ms`,
                        minHeight: "260px",
                      }}
                      className={`group premium-card relative flex flex-col rounded-[2.5rem] border ${cardBg} p-6 md:p-6 transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.02] hover:border-[#5C7C89]/40 hover:shadow-2xl ${
                        visible["skills"]
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                    >
                      <div className="card-glow-layer" />

                      {/* CATEGORY */}
                      <div className="flex items-center gap-2 mb-4 relative z-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5C7C89] animate-pulse" />
                        <p className="text-label text-accent">
                          {group.category}
                        </p>
                      </div>

                      {/* SKILLS */}
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {group.items.map((skill) => (
                          <span
                            key={skill}
                            className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-300 ease-out cursor-default
                      ${
                        dark
                          ? "bg-white/5 border-white/10 text-white/80 hover:text-white hover:border-[#5C7C89]/40 hover:bg-[#5C7C89]/10"
                          : "bg-white/70 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-[#5C7C89]/40 hover:bg-[#5C7C89]/10"
                      }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* FOOTER */}
                      <div className="mt-auto pt-4 border-t dark:border-white/10 border-slate-200 flex justify-end opacity-40 group-hover:opacity-70 transition-opacity duration-300">
                        <div className="flex gap-1">
                          {[1, 2, 3].map((dot) => (
                            <div
                              key={dot}
                              className="w-1 h-1 rounded-full bg-[#5C7C89]"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Education: Academic Foundation ─────────────────────────────── */}
      <section
        id="education"
        className="relative min-h-screen w-full pt-24 pb-12 px-4 flex items-start"
      >
        <div className={getSectionCardClasses("education")}>
          <div
            className={`rounded-[2.5rem] p-6 md:p-8 border shadow-2xl relative w-full max-h-none ${surfaceSolid}`}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#5C7C89]/50 to-transparent" />

            <div className="max-w-5xl mx-auto">
              <SectionHeading
                label="Academic Foundation"
                accent={accent}
                headingGrad={headingGrad}
                muted={muted}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {education.map((edu, i) => {
                  const handleMouseMove = (
                    e: React.MouseEvent<HTMLDivElement>
                  ) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty(
                      "--m-x",
                      `${e.clientX - rect.left}px`
                    );
                    card.style.setProperty(
                      "--m-y",
                      `${e.clientY - rect.top}px`
                    );
                  };

                  return (
                    <div
                      key={edu.id}
                      onMouseMove={handleMouseMove}
                      style={{
                        transitionDelay: `${i * 10}ms`,
                        minHeight: "260px",
                      }}
                      className={`group premium-card relative flex flex-col rounded-[2.5rem] border ${cardBg} p-6 md:p-6 transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.02] hover:border-[#5C7C89]/40 hover:shadow-2xl ${
                        visible["education"]
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                    >
                      <div className="card-glow-layer" />

                      {/* TOP META */}
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <span className="px-3 py-1 rounded-full bg-[#5C7C89]/10 border border-[#5C7C89]/20 text-xs font-bold text-[#5C7C89] uppercase tracking-wider">
                          {edu.period}
                        </span>

                        <div
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center text-[#5C7C89] ${
                            dark
                              ? "bg-black/20 border-white/10"
                              : "bg-white border-slate-200"
                          } transition-transform duration-300 group-hover:scale-110`}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 10L12 5L2 10L12 15L22 10Z"></path>
                            <path d="M6 12.5V16.5C6 16.5 8 18.5 12 18.5C16 18.5 18 16.5 18 16.5V12.5"></path>
                          </svg>
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="flex flex-col flex-grow gap-3 relative z-10">
                        {/* DEGREE */}
                        <h3 className="text-title text-primary text-hover leading-snug">
                          {edu.degree}
                        </h3>

                        {/* INSTITUTION */}
                        <p className="text-label text-accent">
                          {edu.institution}
                        </p>

                        {/* DIVIDER */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#5C7C89]/30 to-transparent my-2" />

                        {/* PERFORMANCE */}
                        <div
                          className={`px-4 py-3 rounded-xl border ${
                            dark
                              ? "bg-white/5 border-white/10"
                              : "bg-white border-slate-200 shadow-sm"
                          }`}
                        >
                          <p
                            className={`text-xs font-medium uppercase tracking-widest ${muted}`}
                          >
                            Performance
                          </p>
                          <p className="text-lg font-bold">
                            {edu.gpa ? `${edu.gpa} / 10` : edu.Percentage}
                          </p>
                        </div>
                      </div>

                      {/* FOOTER */}
                      <div className="mt-auto pt-4 border-t dark:border-white/10 border-slate-200 flex justify-end opacity-40 group-hover:opacity-70 transition-opacity duration-300">
                        <div className="flex gap-1">
                          {[1, 2, 3].map((dot) => (
                            <div
                              key={dot}
                              className="w-1 h-1 rounded-full bg-[#5C7C89]"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Connect: Active Signals ─────────────────────────────────────── */}
      <section
        id="contact"
        className="relative min-h-screen w-full pt-24 pb-12 px-4 flex items-start"
      >
        <div className={getSectionCardClasses("contact")}>
          <div
            className={`rounded-[2.5rem] p-6 md:p-8 border shadow-2xl relative w-full max-h-none ${surfaceSolid}`}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#5C7C89]/50 to-transparent" />

            <div className="max-w-7xl mx-auto">
              <SectionHeading
                label="Establish Connection"
                accent={accent}
                headingGrad={headingGrad}
                muted={muted}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    label: "Direct Mail",
                    value: "yashdeep242002@email.com",
                    icon: <Mail size={24} />,
                    href: "mailto:yashdeep242002@email.com",
                    tag: "SMTP_STABLE",
                  },
                  {
                    label: "Professional",
                    value: "LinkedIn Profile",
                    icon: <Linkedin size={24} />,
                    href: "https://www.linkedin.com/in/yashdeep-tyagi-62489820b/",
                    tag: "ID_VERIFIED",
                  },
                  {
                    label: "Source Code",
                    value: "GitHub Repository",
                    icon: <Github size={24} />,
                    href: "https://github.com/Yashdeep2",
                    tag: "GIT_ACTIVE",
                  },
                ].map((social, i) => {
                  const handleMouseMove = (
                    e: React.MouseEvent<HTMLAnchorElement>
                  ) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty(
                      "--m-x",
                      `${e.clientX - rect.left}px`
                    );
                    card.style.setProperty(
                      "--m-y",
                      `${e.clientY - rect.top}px`
                    );
                  };

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      onMouseMove={handleMouseMove}
                      style={{ transitionDelay: `${i * 10}ms` }}
                      className={`group premium-card relative flex flex-col rounded-[2.5rem] border ${cardBg} p-6 transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.02] hover:border-[#5C7C89]/40 hover:shadow-2xl ${
                        visible["contact"]
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                    >
                      <div className="card-glow-layer" />

                      {/* TOP META */}
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <span
                          className={`px-2 py-1 rounded-md ${badge} text-[10px] font-medium uppercase tracking-wider`}
                        >
                          {social.tag}
                        </span>

                        <div
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center text-[#5C7C89] ${
                            dark
                              ? "bg-black/20 border-white/10"
                              : "bg-white border-slate-200"
                          } transition-all duration-300 group-hover:scale-110 group-hover:border-[#5C7C89]/40`}
                        >
                          {social.icon}
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="flex flex-col gap-3 relative z-10">
                        {/* VALUE (MAIN TITLE) */}
                        <h3 className="text-title text-primary text-hover break-words leading-snug">
                          {social.value}
                        </h3>

                        {/* LABEL */}
                        <p className="text-label text-accent">{social.label}</p>
                      </div>

                      {/* DIVIDER */}
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#5C7C89]/30 to-transparent my-4" />

                      {/* FOOTER */}
                      <div className="mt-auto flex items-center justify-between opacity-40 group-hover:opacity-70 transition-opacity duration-300">
                        <span className="text-xs text-muted">Live Signal</span>
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#5C7C89] animate-pulse" />
                          <div className="w-1.5 h-1.5 rounded-full bg-[#5C7C89]" />
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div
                className={`mt-16 text-center transition-all duration-700 ease-out delay-[300ms] ${
                  visible["contact"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <p
                  className={`text-xs font-mono ${muted} uppercase tracking-[0.4em] mb-6`}
                >
                  Let's Build Something Big Together
                </p>
                <a
                  href="mailto:yashdeep242002@email.com"
                  className="inline-flex items-center gap-4 px-12 py-5 bg-[#5C7C89] hover:bg-[#6f8f9b] text-white rounded-full text-xs font-black uppercase tracking-widest hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95"
                >
                  Initialize Direct Link <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 border-t border-white/10 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <p className={`text-sm ${text} font-medium`}>Yashdeep Tyagi</p>
          <p className={`text-xs ${muted}`}>
            Automation Engineer · Researcher · System Builder
          </p>
          <p className={`text-xs ${muted}`}>
            © 2025 Built with React & TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
}

// ── Section Heading (Unified System) ───────────────────────────────
function SectionHeading({
  label,
  accent,
}: {
  label: string;
  accent: string;
  headingGrad: string;
  muted: string;
}) {
  return (
    <div className="mb-12 text-center relative z-10 flex flex-col items-center gap-3">
      {/* SMALL LABEL */}
      <p className={`text-label ${accent}`}>{label}</p>

      {/* MAIN HEADING */}
      <h2
        className={`text-heading bg-gradient-to-r from-[#5C7C89] via-[#7FA1AE] to-[#A7C0C9] bg-clip-text text-transparent`}
      >
        {label}
      </h2>

      {/* DIVIDER (Premium touch) */}
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#5C7C89]/40 to-transparent" />
    </div>
  );
}
