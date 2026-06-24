import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const stats = [
  { value: "12 480", label: "Personnes aidées" },
  { value: "3 200+", label: "Campagnes réussies" },
  { value: "94%", label: "Taux de satisfaction" },
];

const events = [
  { title: "Distribution alimentaire – Casablanca", date: "15 juillet 2025", spots: 8, category: "Alimentaire", catColor: { bg: "#e8f5ee", color: "#236c42" } },
  { title: "Plantation d'arbres – Forêt de Tiflet", date: "2 août 2025", spots: 23, category: "Environnement", catColor: { bg: "#eaf3de", color: "#3B6D11" } },
  { title: "Campagne médicale gratuite – Rabat", date: "22 juillet 2025", spots: 5, category: "Santé", catColor: { bg: "#e6f1fb", color: "#185FA5" } },
];

const steps = [
  { title: "Créez votre profil", desc: "Inscrivez-vous en quelques minutes et précisez vos compétences et disponibilités.", active: false },
  { title: "Trouvez une mission", desc: "Parcourez les événements et associations selon vos intérêts et votre région.", active: true },
  { title: "Faites la différence", desc: "Partez à l'action, contribuez, et suivez l'impact de vos actions en temps réel.", active: false },
];

const associations = [
  {
    name: "Solidarité Maroc",
    city: "Casablanca",
    desc: "Distribution alimentaire et aide aux familles vulnérables dans les quartiers défavorisés.",
    volunteers: 240,
    category: "Alimentaire",
    catStyle: { bg: "#e8f5ee", color: "#236c42" },
  },
  {
    name: "Terre Verte",
    city: "Rabat-Salé",
    desc: "Reboisement, sensibilisation environnementale et projets de développement durable au Maroc.",
    volunteers: 180,
    category: "Environnement",
    catStyle: { bg: "#eaf3de", color: "#3B6D11" },
  },
  {
    name: "Avenir Jeunesse",
    city: "Marrakech",
    desc: "Soutien scolaire, bourses et accès à l'éducation pour les enfants issus de milieux défavorisés.",
    volunteers: 310,
    category: "Éducation",
    catStyle: { bg: "#e6f1fb", color: "#185FA5" },
  },
];

const DON_PRESETS = [10, 20, 50, 100];

// Simple CountUp component that parses a value string (e.g. "12 480", "3 200+", "94%")
function CountUp({ value, duration = 1400 }) {
  const [display, setDisplay] = useState("0");
  const rafRef = useRef(null);

  useEffect(() => {
    const str = String(value);
    const m = str.match(/^([\d\s,.]+)(.*)$/);
    const numStr = m ? m[1].replace(/[^0-9.]/g, "") : "0";
    const suffix = m ? m[2] : "";
    const target = parseFloat(numStr) || 0;

    const start = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      const current = target * eased;

      // format as integer for these stats
      const formatted = Math.round(current).toLocaleString("fr-FR");
      setDisplay(formatted + suffix);

      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return display;
}

/* ─────────────────────────────────────────────
   HOME
───────────────────────────────────────────── */
export default function Home() {
  const [donAmount, setDonAmount] = useState(20);

  const impactMsg =
    donAmount < 10 ? "Chaque centime aide !"
    : donAmount < 30 ? "Vous pouvez nourrir une famille pour une journée."
    : donAmount < 100 ? "Vous aidez à couvrir des frais médicaux essentiels."
    : "Votre générosité change des vies durablement.";

  const [hoverIndex, setHoverIndex] = useState(null);
  const howSteps = [
    {
      number: "01",
      title: "Créez votre profil",
      desc: "Complétez votre profil, indiquez vos compétences et disponibilités en quelques minutes.",
      hint: "Commencez votre parcours bénévole",
    },
    {
      number: "02",
      title: "Trouvez une mission",
      desc: "Explorez des missions locales alignées avec vos valeurs et votre emploi du temps.",
      hint: "Choisissez une action qui vous inspire",
    },
    {
      number: "03",
      title: "Faites un impact",
      desc: "Agissez sur le terrain, suivez votre contribution et voyez votre impact réel.",
      hint: "Passez à l'action et transformez des vies",
    },
  ];

  return (
    <main style={s.page}>

      {/* ── HERO ── */}
      <section style={s.heroSection}>
        {/* VIDEO BACKGROUND */}
        <video style={s.heroVideoBg} autoPlay muted loop playsInline>
          <source src="/background.mp4" type="video/mp4" />
        </video>
        {/* DARK OVERLAY */}
        <div style={s.heroOverlay} />

        <div style={s.heroGrid}>

          {/* Left */}
          <div>
            <h1 style={s.heroHeading}>
              Ensemble, construisons<br />
              un Maroc <span style={{ color: "#6edfa0" }}>plus solidaire</span>
            </h1>
            <p style={s.heroSub}>
              Connectez bénévoles, associations et donateurs sur une seule plateforme.
              Chaque action compte, chaque don transforme.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/events">
                <button style={s.btnPrimary}>Devenir bénévole</button>
              </Link>
              <Link to="/events">
                <button style={s.btnOutline}>Voir les événements</button>
              </Link>
            </div>

            {/* Stats */}
            <div style={s.statsRow}>
              {stats.map((st, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {i > 0 && <div style={s.statDivider} />}
                  <div>
                    <p style={s.statValue}><CountUp value={st.value} /></p>
                    <p style={s.statLabel}>{st.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* events preview removed */}
        </div>
      </section>

      <div style={s.divider} />

      {/* ── COMMENT ÇA MARCHE ── */}
      <section style={s.howSection}>
        <div style={s.howHeader}>
          <p style={s.howSubtitle}>Commencez à aider en quelques minutes seulement</p>
          <h2 style={s.howTitle}>Comment ça marche</h2>
        </div>

        <div style={s.howCardsRow} onMouseLeave={() => setHoverIndex(null)}>
          {howSteps.flatMap((step, i) => {
            const isHover = hoverIndex === i;
            const nextActive = hoverIndex === i - 1;
            const arrowActive = hoverIndex === i || nextActive;
            const card = (
              <div
                key={`card-${i}`}
                onMouseEnter={() => setHoverIndex(i)}
                onFocus={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  ...s.howCard,
                  ...(isHover ? s.howCardHover : {}),
                  borderColor: isHover ? "#236c42" : "rgba(15,20,25,0.08)",
                  boxShadow: isHover ? s.howCardHover.boxShadow : s.howCard.boxShadow,
                }}
              >
                <div style={s.cardIconWrap}>
                  <div style={{
                    ...s.cardIcon,
                    transform: isHover ? "scale(1.1)" : "scale(1)",
                  }} />
                </div>
                <div style={s.stepHeader}>
                  <span style={s.stepNumber}>{step.number}</span>
                  <h3 style={s.cardTitle}>{step.title}</h3>
                </div>
                <p style={s.cardText}>{step.desc}</p>
                <div style={s.cardHint}>{step.hint} <span style={s.cardHintArrow}>→</span></div>
              </div>
            );

            if (i === howSteps.length - 1) return card;

            const connector = (
              <div key={`conn-${i}`} style={s.cardConnector}>
                <div style={{
                  ...s.connectorLine,
                  background: arrowActive ? "linear-gradient(90deg,#236c42,#8ef3c7)" : "rgba(15,20,25,0.08)",
                }} />
                <div style={{
                  ...s.connectorArrow,
                  transform: arrowActive ? "translateX(6px)" : "translateX(0px)",
                  opacity: arrowActive ? 1 : 0.5,
                }}>→</div>
              </div>
            );

            return [card, connector];
          })}
        </div>
      </section>

      <div style={s.divider} />

      {/* ── ASSOCIATIONS ── */}
      <section style={{ ...s.section, background: "#f7f6f2" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <p style={s.sectionLabel}>Nos partenaires</p>
            <h2 style={{ ...s.sectionHeading, marginBottom: 0 }}>Associations actives</h2>
          </div>
          <Link to="/associations" style={{ fontSize: 13, color: "#236c42", textDecoration: "none" }}>
            Toutes les associations →
          </Link>
        </div>
        <div style={s.assoGrid}>
          {associations.map((asso, i) => (
            <div key={i} style={s.assoCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={s.assoIconBox} />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>{asso.name}</p>
                  <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{asso.city}</p>
                </div>
              </div>
              <p style={s.assoDesc}>{asso.desc}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#888" }}>👥 {asso.volunteers} bénévoles</span>
                <span style={{ ...s.catBadge, background: asso.catStyle.bg, color: asso.catStyle.color }}>
                  {asso.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={s.divider} />

      {/* ── DON CTA ── */}
      <section style={s.section}>
        <div style={s.donGrid}>
          {/* Left text */}
          <div>
            <p style={s.sectionLabel}>Soutien financier</p>
            <h2 style={s.sectionHeading}>Votre don, un impact concret</h2>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.75, marginBottom: 24 }}>
              100% des dons sont reversés aux associations partenaires. Transparence totale, impact mesurable.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {[
                "Paiement sécurisé via PayPal et CMI Maroc",
                "Reçu envoyé par e-mail après chaque don",
                "Suivi de l'utilisation de votre don en ligne",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 13, color: "#555" }}>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/donation">
              <button style={s.btnPrimary}>Faire un don maintenant</button>
            </Link>
          </div>

          {/* Right — mini donation widget */}
          <div style={s.donCard}>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>Choisissez un montant</p>
            <p style={{ fontSize: 44, fontWeight: 700, color: "#236c42", marginBottom: 20, fontFamily: "'Georgia', serif" }}>
              €{donAmount}
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
              {DON_PRESETS.map(p => (
                <button
                  key={p}
                  onClick={() => setDonAmount(p)}
                  style={{
                    ...s.presetBtn,
                    ...(donAmount === p ? s.presetActive : {}),
                  }}
                >
                  €{p}
                </button>
              ))}
            </div>
            <div style={s.impactBox}>
              <span style={{ color: "#236c42", marginRight: 6 }}>✦</span>
              <span style={{ fontSize: 13, color: "#2d6e4a" }}>{impactMsg}</span>
            </div>
            <Link to="/donation">
              <button style={{ ...s.btnPrimary, width: "100%", padding: "14px", marginTop: 4 }}>
                Confirmer le don de €{donAmount}
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const s = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "#fff",
  },
  divider: {
    height: "1px",
    background: "#ebebeb",
  },

  /* HERO */
  heroSection: {
    position: "relative",
    padding: "72px 32px 64px",
    overflow: "hidden",
    minHeight: "520px",
  },
  heroVideoBg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.52)",
    zIndex: 1,
  },
  heroGrid: {
    position: "relative",
    zIndex: 2,
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 48,
    alignItems: "center",
  },
  badge: {
    display: "inline-block",
    background: "rgba(232,245,238,0.18)",
    color: "#a8e6c0",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "1px",
    textTransform: "uppercase",
    padding: "5px 12px",
    borderRadius: 20,
    marginBottom: 16,
    border: "1px solid rgba(168,230,192,0.3)",
  },
  heroHeading: {
    fontSize: "clamp(28px, 3.5vw, 40px)",
    fontWeight: 700,
    lineHeight: 1.2,
    color: "#fff",
    margin: "0 0 18px",
    fontFamily: "'Georgia', serif",
  },
  heroSub: {
    fontSize: 15,
    color: "rgba(255,255,255,0.82)",
    lineHeight: 1.75,
    marginBottom: 28,
    maxWidth: 420,
  },
  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginTop: 36,
    flexWrap: "wrap",
  },
  statDivider: {
    width: 1,
    height: 36,
    background: "rgba(255,255,255,0.25)",
  },
  statValue: {
    fontSize: 22,
    fontWeight: 700,
    color: "#6edfa0",
    margin: 0,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.65)",
    margin: 0,
  },
  heroCard: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    padding: 24,
    border: "1px solid #ebebeb",
    backdropFilter: "blur(8px)",
  },
  miniEventCard: {
    background: "#fff",
    borderRadius: 10,
    padding: "13px 14px",
    border: "1px solid #ebebeb",
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  miniEventIcon: {
    width: 40,
    height: 40,
    background: "#e8f5ee",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    flexShrink: 0,
  },
  miniEventTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1a1a1a",
    margin: "0 0 2px",
  },
  miniEventMeta: {
    fontSize: 11,
    color: "#888",
    margin: 0,
  },
  catBadge: {
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 9px",
    borderRadius: 10,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  /* SECTIONS */
  section: {
    padding: "56px 32px",
    background: "#fff",
  },
  sectionLabel: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    fontWeight: 600,
    marginBottom: 8,
  },
  sectionHeading: {
    fontSize: "clamp(22px, 2.5vw, 28px)",
    fontWeight: 700,
    color: "#1a1a1a",
    margin: "0 0 36px",
    fontFamily: "'Georgia', serif",
  },

  /* STEPS */
  stepsGrid: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
  },
  stepCard: {
    textAlign: "center",
    padding: "28px 20px",
    borderRadius: 14,
    transition: "transform 220ms ease, box-shadow 220ms ease, background 220ms ease",
    cursor: "pointer",
  },
  stepCardActive: {
    background: "#f7f6f2",
    border: "1px solid #ebebeb",
    transform: "translateY(-6px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },
  stepIcon: {
    width: 52,
    height: 52,
    background: "#e8f5ee",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
  },
  stepIconActive: {
    background: "#236c42",
    color: "#fff",
    transform: "scale(1.08)",
    transition: "transform 200ms ease, background 200ms ease",
  },
  stepDescActive: {
    color: "#333",
    fontWeight: 600,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#1a1a1a",
    marginBottom: 8,
  },
  stepDesc: {
    fontSize: 13,
    color: "#777",
    lineHeight: 1.65,
    margin: 0,
  },

  /* HOW IT WORKS */
  howSection: {
    padding: "48px 32px",
    background: "linear-gradient(180deg,#f8fdf7 0%,#ffffff 100%)",
    borderRadius: 24,
    margin: "30px auto",
    maxWidth: 1120,
  },
  howHeader: {
    textAlign: "center",
    maxWidth: 660,
    margin: "0 auto 32px",
  },
  howSubtitle: {
    margin: 0,
    color: "#236c42",
    fontSize: 13,
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontWeight: 800,
  },
  howTitle: {
    margin: "14px 0 0",
    fontSize: "clamp(26px, 2.8vw, 34px)",
    color: "#111",
    lineHeight: 1.15,
    fontWeight: 800,
  },
  howCardsRow: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: 18,
    flexWrap: "wrap",
  },
  howCard: {
    flex: "1 1 0",
    minWidth: 260,
    minHeight: 360,
    background: "#fff",
    borderRadius: 24,
    border: "1px solid rgba(15,20,25,0.08)",
    padding: 26,
    display: "flex",
    flexDirection: "column",
    gap: 18,
    transition: "transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease, background 300ms ease",
    boxShadow: "0 18px 48px rgba(15,20,25,0.08)",
  },
  howCardHover: {
    borderColor: "#236c42",
    boxShadow: "0 30px 70px rgba(35,108,66,0.15)",
    background: "#ffffff",
  },
  cardIconWrap: {
    width: 76,
    height: 76,
    borderRadius: 22,
    background: "rgba(35,108,66,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardIcon: {
    fontSize: 36,
    transition: "transform 300ms ease",
  },
  stepHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
  },
  stepNumber: {
    minWidth: 54,
    padding: "10px 14px",
    borderRadius: 16,
    background: "rgba(35,108,66,0.08)",
    color: "#236c42",
    fontWeight: 800,
    fontSize: 14,
  },
  cardTitle: {
    margin: 0,
    fontSize: 18,
    lineHeight: 1.3,
    fontWeight: 800,
    color: "#111",
  },
  cardText: {
    margin: 0,
    color: "#4a4a4a",
    fontSize: 14,
    lineHeight: 1.75,
    flex: 1,
  },
  cardHint: {
    fontSize: 13,
    fontWeight: 700,
    color: "#236c42",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  cardHintArrow: {
    display: "inline-block",
    transition: "transform 300ms ease",
  },
  cardConnector: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
    paddingTop: 18,
    paddingBottom: 18,
  },
  connectorLine: {
    width: 40,
    height: 2,
    borderRadius: 999,
    background: "rgba(15,20,25,0.08)",
    marginBottom: 10,
    transition: "background 300ms ease",
  },
  connectorArrow: {
    fontSize: 22,
    color: "#236c42",
    transition: "transform 300ms ease, opacity 300ms ease",
  },

  /* ASSOCIATIONS */
  assoGrid: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
  },
  assoCard: {
    background: "#fff",
    borderRadius: 14,
    padding: 20,
    border: "1px solid #ebebeb",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
  },
  assoIconBox: {
    width: 42,
    height: 42,
    background: "#e8f5ee",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  assoDesc: {
    fontSize: 12,
    color: "#777",
    lineHeight: 1.65,
    marginBottom: 14,
  },

  /* DON */
  donGrid: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 48,
    alignItems: "center",
  },
  donCard: {
    background: "#f7f6f2",
    borderRadius: 20,
    padding: 32,
    border: "1px solid #ebebeb",
  },
  presetBtn: {
    padding: "8px 18px",
    border: "1.5px solid #ddd",
    borderRadius: 20,
    background: "#fff",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    color: "#555",
  },
  presetActive: {
    background: "#236c42",
    borderColor: "#236c42",
    color: "#fff",
  },
  impactBox: {
    background: "#e8f5ee",
    borderRadius: 10,
    padding: "12px 14px",
    marginBottom: 16,
    display: "flex",
    alignItems: "flex-start",
  },
  checkIcon: {
    width: 20,
    height: 20,
    background: "#e8f5ee",
    color: "#236c42",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    flexShrink: 0,
  },

  /* BUTTONS */
  btnPrimary: {
    background: "#236c42",
    color: "#fff",
    border: "none",
    padding: "13px 28px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Segoe UI', sans-serif",
  },
  btnOutline: {
    background: "transparent",
    color: "#fff",
    border: "1.5px solid rgba(255,255,255,0.7)",
    padding: "12px 24px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Segoe UI', sans-serif",
  },
};