import { useState } from "react";
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
  { icon: "🍱", title: "Distribution alimentaire – Casablanca", date: "15 juillet 2025", spots: 8, category: "Alimentaire", catColor: { bg: "#e8f5ee", color: "#236c42" } },
  { icon: "🌿", title: "Plantation d'arbres – Forêt de Tiflet", date: "2 août 2025", spots: 23, category: "Environnement", catColor: { bg: "#eaf3de", color: "#3B6D11" } },
  { icon: "🏥", title: "Campagne médicale gratuite – Rabat", date: "22 juillet 2025", spots: 5, category: "Santé", catColor: { bg: "#e6f1fb", color: "#185FA5" } },
];

const steps = [
  { icon: "👤", title: "Créez votre profil", desc: "Inscrivez-vous en quelques minutes et précisez vos compétences et disponibilités.", active: false },
  { icon: "🔍", title: "Trouvez une mission", desc: "Parcourez les événements et associations selon vos intérêts et votre région.", active: true },
  { icon: "🤝", title: "Faites la différence", desc: "Participez, contribuez, et suivez l'impact de vos actions en temps réel.", active: false },
];

const associations = [
  {
    icon: "🏘️",
    name: "Solidarité Maroc",
    city: "Casablanca",
    desc: "Distribution alimentaire et aide aux familles vulnérables dans les quartiers défavorisés.",
    volunteers: 240,
    category: "Alimentaire",
    catStyle: { bg: "#e8f5ee", color: "#236c42" },
  },
  {
    icon: "🌳",
    name: "Terre Verte",
    city: "Rabat-Salé",
    desc: "Reboisement, sensibilisation environnementale et projets de développement durable au Maroc.",
    volunteers: 180,
    category: "Environnement",
    catStyle: { bg: "#eaf3de", color: "#3B6D11" },
  },
  {
    icon: "🎓",
    name: "Avenir Jeunesse",
    city: "Marrakech",
    desc: "Soutien scolaire, bourses et accès à l'éducation pour les enfants issus de milieux défavorisés.",
    volunteers: 310,
    category: "Éducation",
    catStyle: { bg: "#e6f1fb", color: "#185FA5" },
  },
];

const DON_PRESETS = [10, 20, 50, 100];

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

  return (
    <main style={s.page}>

      {/* ── HERO ── */}
      <section style={s.heroSection}>
        <div style={s.heroGrid}>

          {/* Left */}
          <div>
            <span style={s.badge}>Plateforme de bénévolat au Maroc</span>
            <h1 style={s.heroHeading}>
              Ensemble, construisons<br />
              un Maroc <span style={{ color: "#236c42" }}>plus solidaire</span>
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
                    <p style={s.statValue}>{st.value}</p>
                    <p style={s.statLabel}>{st.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — events preview */}
          <div style={s.heroCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>Événements à venir</span>
              <Link to="/events" style={{ fontSize: 13, color: "#236c42", textDecoration: "none" }}>Voir tout →</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {events.map((ev, i) => (
                <div key={i} style={s.miniEventCard}>
                  <div style={s.miniEventIcon}>{ev.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={s.miniEventTitle}>{ev.title}</p>
                    <p style={s.miniEventMeta}>{ev.date} · {ev.spots} places restantes</p>
                  </div>
                  <span style={{ ...s.catBadge, background: ev.catColor.bg, color: ev.catColor.color }}>
                    {ev.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={s.divider} />

      {/* ── COMMENT ÇA MARCHE ── */}
      <section style={s.section}>
        <p style={s.sectionLabel}>Comment ça marche</p>
        <h2 style={s.sectionHeading}>Trois étapes pour s'engager</h2>
        <div style={s.stepsGrid}>
          {steps.map((step, i) => (
            <div key={i} style={{ ...s.stepCard, ...(step.active ? s.stepCardActive : {}) }}>
              <div style={{ ...s.stepIcon, ...(step.active ? s.stepIconActive : {}) }}>
                <span style={{ fontSize: 22 }}>{step.icon}</span>
              </div>
              <p style={s.stepTitle}>{step.title}</p>
              <p style={s.stepDesc}>{step.desc}</p>
            </div>
          ))}
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
                <div style={s.assoIconBox}>
                  <span style={{ fontSize: 20 }}>{asso.icon}</span>
                </div>
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
                  <span style={s.checkIcon}>✓</span>
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
    padding: "72px 32px 64px",
    background: "#fff",
  },
  heroGrid: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 48,
    alignItems: "center",
  },
  badge: {
    display: "inline-block",
    background: "#e8f5ee",
    color: "#236c42",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "1px",
    textTransform: "uppercase",
    padding: "5px 12px",
    borderRadius: 20,
    marginBottom: 16,
  },
  heroHeading: {
    fontSize: "clamp(28px, 3.5vw, 40px)",
    fontWeight: 700,
    lineHeight: 1.2,
    color: "#1a1a1a",
    margin: "0 0 18px",
    fontFamily: "'Georgia', serif",
  },
  heroSub: {
    fontSize: 15,
    color: "#666",
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
    background: "#ddd",
  },
  statValue: {
    fontSize: 22,
    fontWeight: 700,
    color: "#236c42",
    margin: 0,
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
    margin: 0,
  },
  heroCard: {
    background: "#f7f6f2",
    borderRadius: 16,
    padding: 24,
    border: "1px solid #ebebeb",
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
  },
  stepCardActive: {
    background: "#f7f6f2",
    border: "1px solid #ebebeb",
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
    color: "#236c42",
    border: "1.5px solid #236c42",
    padding: "12px 24px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Segoe UI', sans-serif",
  },
};