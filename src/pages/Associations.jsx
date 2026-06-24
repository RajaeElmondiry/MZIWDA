import { useState } from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const allAssociations = [
  {
    icon: "🌿",
    name: "Green Future",
    city: "Casablanca",
    since: 2018,
    desc: "Reforestation and clean water access across rural Morocco.",
    volunteers: 142,
    category: "Environnement",
    catStyle: { bg: "#eaf3de", color: "#3B6D11" },
    impact: "2,400 trees planted",
    trending: true,
  },
  {
    icon: "📚",
    name: "EduRise",
    city: "Rabat",
    since: 2015,
    desc: "Providing quality education to underprivileged children.",
    volunteers: 87,
    category: "Éducation",
    catStyle: { bg: "#e6f1fb", color: "#185FA5" },
    impact: "350+ students helped",
    trending: false,
  },
  {
    icon: "❤️",
    name: "HealthFirst",
    city: "Fes",
    since: 2020,
    desc: "Mobile health clinics reaching remote communities.",
    volunteers: 63,
    category: "Santé",
    catStyle: { bg: "#ffe6eb", color: "#d4185f" },
    impact: "5,200 patients served",
    trending: false,
  },
  {
    icon: "💡",
    name: "CodeYouth",
    city: "Marrakech",
    since: 2021,
    desc: "Teaching coding and digital skills to young Moroccans.",
    volunteers: 55,
    category: "Éducation",
    catStyle: { bg: "#e6f1fb", color: "#185FA5" },
    impact: "120 coders trained",
    trending: true,
  },
  {
    icon: "🍎",
    name: "FoodBridge",
    city: "Agadir",
    since: 2019,
    desc: "Fighting hunger through food banks and community kitchens.",
    volunteers: 110,
    category: "Alimentaire",
    catStyle: { bg: "#e8f5ee", color: "#236c42" },
    impact: "12,000 meals served",
    trending: false,
  },
  {
    icon: "🩸",
    name: "BloodLink",
    city: "Meknès",
    since: 2017,
    desc: "Organizing blood donation campaigns nationwide.",
    volunteers: 200,
    category: "Santé",
    catStyle: { bg: "#ffe6eb", color: "#d4185f" },
    impact: "8,500 units collected",
    trending: false,
  },
  {
    icon: "🏘️",
    name: "Solidarité Maroc",
    city: "Casablanca",
    since: 2016,
    desc: "Food distribution and aid for vulnerable families.",
    volunteers: 240,
    category: "Alimentaire",
    catStyle: { bg: "#e8f5ee", color: "#236c42" },
    impact: "1,200 families supported",
    trending: true,
  },
  {
    icon: "🌳",
    name: "Terre Verte",
    city: "Rabat-Salé",
    since: 2014,
    desc: "Reforestation and environmental awareness projects.",
    volunteers: 180,
    category: "Environnement",
    catStyle: { bg: "#eaf3de", color: "#3B6D11" },
    impact: "3,600 hectares protected",
    trending: false,
  },
  {
    icon: "🎓",
    name: "Avenir Jeunesse",
    city: "Marrakech",
    since: 2013,
    desc: "School support, scholarships, and education access.",
    volunteers: 310,
    category: "Éducation",
    catStyle: { bg: "#e6f1fb", color: "#185FA5" },
    impact: "600+ scholarships awarded",
    trending: true,
  },
];

const categories = ["Tous", "Santé", "Éducation", "Environnement", "Alimentaire"];

const stats = [
  { number: "9", label: "Active Associations", icon: "🏛️" },
  { number: "1,247", label: "Total Volunteers", icon: "👥" },
  { number: "35M", label: "Lives Impacted", icon: "💫" },
];

/* ─────────────────────────────────────────────
   ASSOCIATIONS PAGE
───────────────────────────────────────────── */
export default function AssociationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [hoveredCard, setHoveredCard] = useState(null);

  const filtered =
    selectedCategory === "Tous"
      ? allAssociations
      : allAssociations.filter(a => a.category === selectedCategory);

  return (
    <main style={s.page}>

      {/* ── HERO SECTION ── */}
      <section style={s.heroSection}>
        <div style={s.heroContent}>
          <div style={s.heroBadge}>
            <span style={s.badgeGlow}>✨</span>
            <span>Discover & Support</span>
          </div>
          <h1 style={s.heroTitle}>
            Find Your <span style={s.gradientText}>Impact Zone</span>
          </h1>
          <p style={s.heroDesc}>
            Join 1,247+ volunteers making tangible change across Morocco. Every association has a story. Discover yours.
          </p>

          {/* Stats Row */}
          <div style={s.statsRow}>
            {stats.map((stat, i) => (
              <div key={i} style={s.statCard}>
                <div style={s.statIcon}>{stat.icon}</div>
                <div>
                  <p style={s.statNumber}>{stat.number}</p>
                  <p style={s.statLabel}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <section style={s.filterSection}>
        <div style={s.filterContainer}>
          <p style={s.filterLabel}>Filter by Category</p>
          <div style={s.filterRow}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  ...s.filterBtn,
                  ...(selectedCategory === cat ? s.filterBtnActive : {}),
                }}
              >
                {cat === "Tous" ? "🌍" : ""}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ASSOCIATIONS GRID ── */}
      <section style={s.gridSection}>
        <div style={s.gridContainer}>
          {filtered.map((asso, i) => (
            <div
              key={i}
              style={{
                ...s.assoCard,
                ...(hoveredCard === i ? s.assoCardHover : {}),
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* TRENDING BADGE */}
              {asso.trending && (
                <div style={s.trendingBadge}>
                  🔥 Trending
                </div>
              )}

              {/* ICON */}
              <div style={{...s.assoIconBox, ...(hoveredCard === i ? s.assoIconBoxHover : {})}}>
                <span style={{ fontSize: 32 }}>{asso.icon}</span>
              </div>

              {/* MAIN CONTENT */}
              <div style={s.cardContent}>
                <h3 style={s.assoName}>{asso.name}</h3>
                <div style={s.metaRow}>
                  <span style={s.metaText}>📍 {asso.city}</span>
                  <span style={s.metaText}>•</span>
                  <span style={s.metaText}>Since {asso.since}</span>
                </div>

                <p style={s.assoDesc}>{asso.desc}</p>

                {/* IMPACT HIGHLIGHT */}
                <div style={s.impactBox}>
                  <span style={s.impactEmoji}>⭐</span>
                  <span style={s.impactText}>{asso.impact}</span>
                </div>

                {/* FOOTER */}
                <div style={s.cardFooter}>
                  <div style={s.footerLeft}>
                    <span style={s.volunteerBadge}>👥 {asso.volunteers}</span>
                  </div>
                  <span style={{ ...s.catBadge, background: asso.catStyle.bg, color: asso.catStyle.color }}>
                    {asso.category}
                  </span>
                </div>

                {/* BUTTON */}
                <Link to={`/association/${asso.name}`} style={{ textDecoration: "none" }}>
                  <button style={{...s.viewProfileBtn, ...(hoveredCard === i ? s.viewProfileBtnHover : {})}}>
                    View Profile
                    <span style={s.btnArrow}>→</span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* NO RESULTS */}
        {filtered.length === 0 && (
          <div style={s.emptyState}>
            <p style={s.emptyIcon}>🔍</p>
            <p style={s.emptyText}>No associations found in this category</p>
          </div>
        )}
      </section>

      {/* ── CTA SECTION ── */}
      <section style={s.ctaSection}>
        <div style={s.ctaContent}>
          <h2 style={s.ctaTitle}>Ready to Make a Difference?</h2>
          <p style={s.ctaDesc}>Join thousands of volunteers transforming communities across Morocco</p>
          <div style={s.ctaButtons}>
            <Link to="/events">
              <button style={s.btnPrimary}>Become a Volunteer</button>
            </Link>
            <Link to="/donation">
              <button style={s.btnSecondary}>Make a Donation</button>
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
    fontFamily: "'Segoe UI', -apple-system, sans-serif",
    background: "linear-gradient(135deg, #f9f7f4 0%, #f5f3f0 100%)",
    minHeight: "100vh",
  },

  /* ── HERO ── */
  heroSection: {
    background: "linear-gradient(135deg, #236c42 0%, #1a4f2f 100%)",
    padding: "80px 32px 60px",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
  },
  heroContent: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255, 255, 255, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding: "10px 16px",
    borderRadius: 25,
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 20,
    backdropFilter: "blur(10px)",
  },
  badgeGlow: {
    fontSize: 16,
    animation: "pulse 2s ease-in-out infinite",
  },
  heroTitle: {
    fontSize: "clamp(32px, 4vw, 52px)",
    fontWeight: 800,
    lineHeight: 1.1,
    margin: "0 0 16px",
    fontFamily: "'Georgia', serif",
  },
  gradientText: {
    background: "linear-gradient(135deg, #a8e6c1 0%, #56d8a8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroDesc: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    maxWidth: 600,
    lineHeight: 1.8,
    marginBottom: 40,
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
  },
  statCard: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "rgba(255, 255, 255, 0.1)",
    padding: "16px",
    borderRadius: 12,
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
  },
  statIcon: {
    fontSize: 28,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 800,
    margin: "0 0 2px",
    color: "#fff",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    margin: 0,
  },

  /* ── FILTERS ── */
  filterSection: {
    background: "#fff",
    padding: "32px",
    borderBottom: "1px solid #efefef",
  },
  filterContainer: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  filterLabel: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    fontWeight: 700,
    marginBottom: 16,
  },
  filterRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "10px 18px",
    border: "1.5px solid #ddd",
    borderRadius: 24,
    background: "#fff",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    color: "#666",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  filterBtnActive: {
    background: "linear-gradient(135deg, #236c42 0%, #1a4f2f 100%)",
    borderColor: "transparent",
    color: "#fff",
    boxShadow: "0 4px 15px rgba(35, 108, 66, 0.3)",
  },

  /* ── GRID ── */
  gridSection: {
    padding: "48px 32px",
  },
  gridContainer: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: 28,
  },

  /* ── CARD ── */
  assoCard: {
    background: "#fff",
    borderRadius: 18,
    padding: "28px",
    border: "1px solid #efefef",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
  },
  assoCardHover: {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 32px rgba(35, 108, 66, 0.15)",
    borderColor: "rgba(35, 108, 66, 0.2)",
  },
  trendingBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    background: "linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: 12,
    fontSize: 11,
    fontWeight: 700,
    zIndex: 10,
  },
  assoIconBox: {
    width: 64,
    height: 64,
    background: "linear-gradient(135deg, #e8f5ee 0%, #eaf3de 100%)",
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    transition: "all 0.3s ease",
  },
  assoIconBoxHover: {
    transform: "scale(1.08) rotate(-2deg)",
  },
  cardContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  assoName: {
    fontSize: 18,
    fontWeight: 800,
    color: "#1a1a1a",
    margin: "0 0 8px",
    fontFamily: "'Georgia', serif",
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    color: "#888",
    marginBottom: 12,
  },
  metaText: {
    color: "#888",
  },
  assoDesc: {
    fontSize: 13,
    color: "#666",
    lineHeight: 1.7,
    margin: "0 0 16px",
    flex: 1,
  },
  impactBox: {
    background: "linear-gradient(135deg, #f0fdf4 0%, #f1fdf7 100%)",
    border: "1px solid #d1f5d8",
    borderRadius: 12,
    padding: "12px 14px",
    marginBottom: 18,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  impactEmoji: {
    fontSize: 14,
  },
  impactText: {
    fontSize: 12,
    fontWeight: 600,
    color: "#3B6D11",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottom: "1px solid #f5f5f5",
  },
  footerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  volunteerBadge: {
    fontSize: 12,
    color: "#555",
    fontWeight: 600,
  },
  catBadge: {
    fontSize: 11,
    fontWeight: 700,
    padding: "6px 12px",
    borderRadius: 14,
    whiteSpace: "nowrap",
  },
  viewProfileBtn: {
    width: "100%",
    padding: "12px 16px",
    border: "1.5px solid #236c42",
    borderRadius: 10,
    background: "transparent",
    color: "#236c42",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  viewProfileBtnHover: {
    background: "#236c42",
    color: "#fff",
    borderColor: "#236c42",
  },
  btnArrow: {
    transition: "transform 0.3s ease",
  },

  /* ── EMPTY STATE ── */
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    gridColumn: "1 / -1",
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    margin: 0,
  },

  /* ── CTA SECTION ── */
  ctaSection: {
    background: "linear-gradient(135deg, #236c42 0%, #1a4f2f 100%)",
    padding: "60px 32px",
    color: "#fff",
    textAlign: "center",
  },
  ctaContent: {
    maxWidth: 700,
    margin: "0 auto",
  },
  ctaTitle: {
    fontSize: "clamp(28px, 3.5vw, 40px)",
    fontWeight: 800,
    margin: "0 0 12px",
    fontFamily: "'Georgia', serif",
  },
  ctaDesc: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 28,
    lineHeight: 1.6,
  },
  ctaButtons: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btnPrimary: {
    background: "#fff",
    color: "#236c42",
    border: "none",
    padding: "14px 32px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: "'Segoe UI', sans-serif",
  },
  btnSecondary: {
    background: "transparent",
    color: "#fff",
    border: "2px solid #fff",
    padding: "12px 30px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: "'Segoe UI', sans-serif",
  },
};