import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ---------------------------------------------
   DATA
--------------------------------------------- */
const allAssociations = [
  {
    name: "Green Future",
    city: "Casablanca",
    since: 2018,
    desc: "Reforestation and clean water access across rural Morocco.",
    volunteers: 142,
    category: "Environnement",
    catStyle: { bg: "#eaf5ea", color: "#286638" },
    impact: "2,400 trees planted",
    trending: true,
  },
  {
    name: "EduRise",
    city: "Rabat",
    since: 2015,
    desc: "Providing quality education to underprivileged children.",
    volunteers: 87,
    category: "Éducation",
    catStyle: { bg: "#eef5ff", color: "#1f5d9d" },
    impact: "350+ students helped",
    trending: false,
  },
  {
    name: "HealthFirst",
    city: "Fes",
    since: 2020,
    desc: "Mobile health clinics reaching remote communities.",
    volunteers: 63,
    category: "Santé",
    catStyle: { bg: "#fff0f2", color: "#b31d4f" },
    impact: "5,200 patients served",
    trending: false,
  },
  {
    name: "CodeYouth",
    city: "Marrakech",
    since: 2021,
    desc: "Teaching coding and digital skills to young Moroccans.",
    volunteers: 55,
    category: "Éducation",
    catStyle: { bg: "#eef5ff", color: "#1f5d9d" },
    impact: "120 coders trained",
    trending: true,
  },
  {
    name: "FoodBridge",
    city: "Agadir",
    since: 2019,
    desc: "Fighting hunger through food banks and community kitchens.",
    volunteers: 110,
    category: "Alimentaire",
    catStyle: { bg: "#ecf8ea", color: "#2d7842" },
    impact: "12,000 meals served",
    trending: false,
  },
  {
    name: "BloodLink",
    city: "Meknès",
    since: 2017,
    desc: "Organizing blood donation campaigns nationwide.",
    volunteers: 200,
    category: "Santé",
    catStyle: { bg: "#fff0f2", color: "#b31d4f" },
    impact: "8,500 units collected",
    trending: false,
  },
  {
    name: "Solidarité Maroc",
    city: "Casablanca",
    since: 2016,
    desc: "Food distribution and aid for vulnerable families.",
    volunteers: 240,
    category: "Alimentaire",
    catStyle: { bg: "#ecf8ea", color: "#2d7842" },
    impact: "1,200 families supported",
    trending: true,
  },
  {
    name: "Terre Verte",
    city: "Rabat-Salé",
    since: 2014,
    desc: "Reforestation and environmental awareness projects.",
    volunteers: 180,
    category: "Environnement",
    catStyle: { bg: "#eaf5ea", color: "#286638" },
    impact: "3,600 hectares protected",
    trending: false,
  },
  {
    name: "Avenir Jeunesse",
    city: "Marrakech",
    since: 2013,
    desc: "School support, scholarships, and education access.",
    volunteers: 310,
    category: "Éducation",
    catStyle: { bg: "#eef5ff", color: "#1f5d9d" },
    impact: "600+ scholarships awarded",
    trending: true,
  },
];

const categories = ["Tous", "Santé", "Éducation", "Environnement", "Alimentaire"];

const stats = [
  { number: "9", label: "Active Associations" },
  { number: "1,247", label: "Total Volunteers" },
  { number: "35M", label: "Lives Impacted" },
];

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
      setDisplay(Math.round(current).toLocaleString("fr-FR") + suffix);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return display;
}

export default function AssociationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const filterRefs = useRef([]);
  const filterContainerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeCategoryIndex = categories.indexOf(selectedCategory);

  useEffect(() => {
    const updateIndicator = () => {
      const current = filterRefs.current[activeCategoryIndex];
      const container = filterContainerRef.current;
      if (current && container) {
        const rect = current.getBoundingClientRect();
        const parentRect = container.getBoundingClientRect();
        setIndicator({ left: rect.left - parentRect.left, width: rect.width });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeCategoryIndex]);

  const filtered =
    selectedCategory === "Tous"
      ? allAssociations
      : allAssociations.filter((a) => a.category === selectedCategory);

  return (
    <main style={s.page}>
      <div style={s.backgroundLayer} />
      <div style={s.glowOne} />
      <div style={s.glowTwo} />
      <div style={s.floatingDotOne} />
      <div style={s.floatingDotTwo} />

      <section style={{ ...s.heroSection, ...(mounted ? s.sectionVisible : s.sectionHidden) }}>

        <div style={s.heroGrid}>
          <div style={s.heroCopy}>
            <p style={s.heroLabel}>Communauté · Impact · Confiance</p>
            <h1 style={s.heroHeading}>
              Rejoignez des équipes durables et
              <span style={s.heroGradient}> créez un impact réel.</span>
            </h1>
            <p style={s.heroText}>
              Explorez des associations de confiance au Maroc, trouvez la mission qui vous ressemble et contribuez à des projets qui changent des vies.
            </p>
            <div style={s.heroActions}>
              <Link to="/events" style={s.heroLink}>
                <button type="button" style={s.btnPrimary}>
                  Explorer les missions
                </button>
              </Link>
              <Link to="/donation" style={s.heroLink}>
                <button type="button" style={s.btnSecondary}>
                  Soutenir un projet
                </button>
              </Link>
            </div>
          </div>

          <div style={s.heroVisual}>
            <div style={s.heroVisualGlass}>
              <div style={s.heroStatsRow}>
                {stats.map((stat, index) => (
                  <div key={index} style={s.heroStatCard}>
                    <p style={s.heroStatNumber}>
                      <CountUp value={stat.number} />
                    </p>
                    <p style={s.heroStatLabel}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ ...s.filterSection, ...(mounted ? s.sectionVisible : s.sectionHidden) }}>
        <div style={s.filterIntro}>
          <p style={s.filterOverline}>Filtrer par impact</p>
          <h2 style={s.filterHeadline}>Trouvez une cause qui vous ressemble.</h2>
        </div>

        <div style={s.filterControls} ref={filterContainerRef}>
          <div style={{ ...s.filterIndicator, width: indicator.width, transform: `translateX(${indicator.left}px)` }} />
          {categories.map((cat, index) => (
            <button
              key={cat}
              type="button"
              ref={(el) => (filterRefs.current[index] = el)}
              onClick={() => setSelectedCategory(cat)}
              style={{
                ...s.filterBtn,
                ...(selectedCategory === cat ? s.filterBtnActive : {}),
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section style={{ ...s.gridSection, ...(mounted ? s.sectionVisible : s.sectionHidden) }}>
        <div style={s.gridContainer}>
          {filtered.map((asso, i) => (
            <div
              key={i}
              style={{
                ...s.cardFrame,
                ...(hoveredCard === i ? s.cardFrameHover : {}),
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={s.assoCard}>
                <div style={{ ...s.cardBanner, background: `linear-gradient(135deg, ${asso.catStyle.bg} 0%, rgba(255,255,255,0.03) 100%)` }}>
                  <div style={s.cardBannerMeta}>
                    <div style={{ ...s.categoryTag, background: "rgba(255,255,255,0.9)", color: asso.catStyle.color, boxShadow: "none" }}>
                      {asso.category}
                    </div>
                    {asso.trending && <div style={s.trendingBadge}>Trending</div>}
                  </div>
                </div>
                <div style={s.cardBody}>
                  <div style={s.cardTitleBlock}>
                    <h3 style={s.assoName}>{asso.name}</h3>
                  </div>
                  <p style={s.assoDesc}>{asso.desc}</p>

                  <div style={s.metaRowPremium}>
                    <span style={s.metaChip}>{asso.city}</span>
                    <span style={s.metaChip}>Depuis {asso.since}</span>
                  </div>

                  <div style={s.impactBlock}>
                    <p style={s.impactLabel}>Impact en chiffres</p>
                    <p style={s.impactText}>{asso.impact}</p>
                  </div>

                  <div style={s.cardFooter}>
                    <span style={s.volunteerBadge}>{asso.volunteers} bénévoles</span>
                    <Link to={`/association/${asso.name}`} style={s.profileLink}>
                      <button type="button" style={{ ...s.viewProfileBtn, ...(hoveredCard === i ? s.viewProfileBtnHover : {}) }}>
                        Voir le profil
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={s.emptyState}>
            <div style={s.emptyIllustration} />
            <h3 style={s.emptyTitle}>Aucune association ne correspond à ce filtre.</h3>
            <p style={s.emptyText}>
              Modifiez votre sélection ou réinitialisez les filtres pour retrouver des associations inspirantes.
            </p>
            <button type="button" style={s.emptyButton} onClick={() => setSelectedCategory("Tous")}>Voir tout</button>
          </div>
        )}
      </section>

      <section style={{ ...s.ctaSection, ...(mounted ? s.sectionVisible : s.sectionHidden) }}>
        <div style={s.ctaContent}>
          <div style={s.ctaBadge}>Prêt à passer de l'envie à l'action ?</div>
          <h2 style={s.ctaTitle}>Faites partie d'une communauté qui change le Maroc.</h2>
          <p style={s.ctaDesc}>
            Explorez les missions, trouvez votre match et commencez à agir dès aujourd'hui avec une plateforme pensée pour les bénévoles exigeants.
          </p>
          <div style={s.ctaActions}>
            <Link to="/events" style={s.ctaLink}>
              <button type="button" style={s.ctaPrimary}>
                Découvrir les missions
              </button>
            </Link>
            <Link to="/login" style={s.ctaLink}>
              <button type="button" style={s.ctaSecondary}>Créer un compte gratuit</button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const s = {
  page: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    background: "radial-gradient(circle at 14% 12%, rgba(84, 170, 113, 0.18), transparent 24%), radial-gradient(circle at 88% 16%, rgba(255, 242, 215, 0.2), transparent 22%), radial-gradient(circle at 50% 90%, rgba(170, 236, 200, 0.08), transparent 30%), #f7f6f2",
    color: "#111",
    fontFamily: "'Inter', system-ui, sans-serif",
    paddingBottom: 72,
  },
  backgroundLayer: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%)",
  },
  glowOne: {
    position: "absolute",
    top: "10%",
    left: "6%",
    width: 220,
    height: 220,
    background: "radial-gradient(circle, rgba(156, 235, 182, 0.32), transparent 55%)",
    filter: "blur(60px)",
    pointerEvents: "none",
  },
  glowTwo: {
    position: "absolute",
    top: "8%",
    right: "8%",
    width: 180,
    height: 180,
    background: "radial-gradient(circle, rgba(255, 223, 187, 0.28), transparent 52%)",
    filter: "blur(56px)",
    pointerEvents: "none",
  },
  floatingDotOne: {
    position: "absolute",
    top: "42%",
    left: "12%",
    width: 54,
    height: 54,
    borderRadius: "50%",
    background: "rgba(44, 129, 83, 0.08)",
    pointerEvents: "none",
  },
  floatingDotTwo: {
    position: "absolute",
    bottom: "20%",
    right: "14%",
    width: 68,
    height: 68,
    borderRadius: "50%",
    background: "rgba(255, 207, 160, 0.08)",
    pointerEvents: "none",
  },
  sectionVisible: {
    opacity: 1,
    transform: "translateY(0)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  },
  sectionHidden: {
    opacity: 0,
    transform: "translateY(20px)",
  },
  heroSection: {
    position: "relative",
    maxWidth: 1180,
    margin: "0 auto",
    padding: "80px 32px 56px",
    zIndex: 1,
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 18px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.7)",
    color: "#335a31",
    fontWeight: 700,
    fontSize: 13,
    marginBottom: 28,
    boxShadow: "0 16px 40px rgba(14, 35, 18, 0.08)",
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 36,
    alignItems: "start",
  },
  heroCopy: {
    display: "grid",
    gap: 24,
  },
  heroLabel: {
    margin: 0,
    fontSize: 14,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#236c42",
    fontWeight: 800,
  },
  heroHeading: {
    margin: 0,
    fontSize: "clamp(40px, 5vw, 62px)",
    lineHeight: 1.02,
    letterSpacing: "-0.05em",
    fontWeight: 900,
    color: "#111",
    maxWidth: 680,
  },
  heroGradient: {
    display: "inline-block",
    background: "linear-gradient(135deg, #2f7b44, #95deaf)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroText: {
    margin: 0,
    fontSize: 18,
    lineHeight: 1.85,
    color: "#565656",
    maxWidth: 640,
  },
  heroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    alignItems: "center",
  },
  heroLink: {
    textDecoration: "none",
  },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    minHeight: 56,
    padding: "0 28px",
    borderRadius: 18,
    border: "none",
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    background: "linear-gradient(135deg, #2b7540 0%, #95d7b1 100%)",
    boxShadow: "0 14px 40px rgba(45, 123, 68, 0.22)",
    cursor: "pointer",
    transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease",
  },
  btnSecondary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    padding: "0 26px",
    borderRadius: 18,
    border: "1px solid rgba(35, 108, 66, 0.18)",
    background: "rgba(255,255,255,0.82)",
    color: "#2c5f39",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 12px 30px rgba(35, 108, 66, 0.1)",
    backdropFilter: "blur(12px)",
    transition: "transform 0.35s ease, border-color 0.35s ease, background 0.35s ease",
  },
  heroVisual: {
    position: "relative",
    minHeight: 410,
    display: "grid",
    alignItems: "center",
  },
  heroVisualGlass: {
    position: "relative",
    padding: "24px",
    borderRadius: 28,
    border: "1px solid rgba(255,255,255,0.55)",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(22px)",
    boxShadow: "0 30px 80px rgba(20, 70, 35, 0.12)",
    overflow: "hidden",
  },
  heroStatsRow: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 18,
  },
  heroStatCard: {
    display: "grid",
    gap: 10,
    padding: "22px 24px",
    borderRadius: 24,
    background: "rgba(250, 255, 249, 0.95)",
    border: "1px solid rgba(42, 131, 62, 0.08)",
    boxShadow: "0 18px 50px rgba(34, 95, 42, 0.08)",
    transition: "transform 0.35s ease, box-shadow 0.35s ease",
  },
  heroStatNumber: {
    margin: 0,
    fontSize: 30,
    lineHeight: 1.05,
    fontWeight: 800,
    color: "#1b3b21",
  },
  heroStatLabel: {
    margin: 0,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#55685a",
    fontWeight: 700,
  },
  heroFloatingCard: {
    position: "absolute",
    bottom: -24,
    right: -10,
    left: "auto",
    width: "calc(100% - 48px)",
    padding: "22px 24px",
    borderRadius: 24,
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(255,255,255,0.72)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 28px 60px rgba(30, 88, 43, 0.09)",
  },
  floatingCardLabel: {
    margin: 0,
    fontSize: 13,
    color: "#6b7a6d",
    letterSpacing: "0.12em",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  floatingCardText: {
    margin: "10px 0 0",
    color: "#1d2b1c",
    fontSize: 15,
    lineHeight: 1.8,
  },
  filterSection: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "48px 32px",
    position: "relative",
    zIndex: 1,
  },
  filterIntro: {
    maxWidth: 720,
    marginBottom: 22,
  },
  filterOverline: {
    margin: 0,
    color: "#236c42",
    fontWeight: 800,
    letterSpacing: "0.16em",
    fontSize: 13,
    textTransform: "uppercase",
  },
  filterHeadline: {
    margin: "16px 0 0",
    fontSize: "clamp(28px, 3vw, 38px)",
    lineHeight: 1.08,
    fontWeight: 900,
    color: "#111",
  },
  filterControls: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: 14,
    padding: "4px",
    borderRadius: 24,
    background: "rgba(255,255,255,0.62)",
    border: "1px solid rgba(255,255,255,0.7)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.65), 0 24px 70px rgba(31, 86, 38, 0.06)",
    backdropFilter: "blur(18px)",
    overflow: "hidden",
  },
  filterIndicator: {
    position: "absolute",
    top: 4,
    height: "calc(100% - 8px)",
    borderRadius: 20,
    background: "linear-gradient(135deg, rgba(43, 117, 64, 0.22), rgba(148, 222, 163, 0.28))",
    boxShadow: "0 18px 40px rgba(43, 117, 64, 0.12)",
    transition: "transform 0.36s cubic-bezier(0.22, 1, 0.36, 1), width 0.36s cubic-bezier(0.22, 1, 0.36, 1)",
    zIndex: 0,
  },
  filterBtn: {
    position: "relative",
    zIndex: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 56,
    padding: "0 18px",
    borderRadius: 18,
    border: "1px solid transparent",
    background: "transparent",
    color: "#334d3a",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "color 0.3s ease, transform 0.3s ease",
  },
  filterBtnActive: {
    color: "#21472d",
  },
  gridSection: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "18px 32px 36px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 28,
  },
  cardFrame: {
    borderRadius: 28,
    padding: 1,
    background: "linear-gradient(180deg, rgba(255,255,255,0.4), rgba(255,255,255,0.16))",
    boxShadow: "0 14px 40px rgba(22, 58, 28, 0.08)",
    transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border 0.35s ease",
  },
  cardFrameHover: {
    transform: "translateY(-10px) scale(1.02)",
    boxShadow: "0 28px 90px rgba(24, 88, 38, 0.16)",
    border: "1px solid rgba(43, 117, 64, 0.25)",
  },
  assoCard: {
    display: "grid",
    gap: 0,
    borderRadius: 28,
    background: "rgba(255,255,255,0.9)",
    padding: 0,
    minHeight: 420,
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(18px)",
  },
  cardBanner: {
    position: "relative",
    minHeight: 140,
    width: "100%",
  },
  cardBannerMeta: {
    position: "absolute",
    inset: 18,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  cardBody: {
    display: "grid",
    gap: 18,
    padding: "26px 24px 28px",
  },
  trendingBadge: {
    position: "absolute",
    top: 18,
    right: 18,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    borderRadius: 20,
    background: "rgba(255,255,255,0.82)",
    color: "#a73b45",
    fontSize: 12,
    fontWeight: 800,
    boxShadow: "0 16px 36px rgba(170, 49, 67, 0.08)",
  },
  cardTopRow: {
    display: "flex",
    gap: 18,
    alignItems: "flex-start",
  },
  cardTitleBlock: {
    display: "grid",
    gap: 8,
    minWidth: 0,
  },
  categoryTag: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    maxWidth: "fit-content",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
  },
  assoName: {
    margin: 0,
    fontSize: 22,
    lineHeight: 1.15,
    fontWeight: 800,
    color: "#111",
  },
  assoDesc: {
    margin: 0,
    color: "#555",
    fontSize: 15,
    lineHeight: 1.9,
    minHeight: 90,
  },
  metaRowPremium: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  metaChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    borderRadius: 18,
    background: "rgba(240, 250, 239, 0.95)",
    color: "#536a50",
    fontSize: 13,
    fontWeight: 600,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
  },
  impactBlock: {
    display: "grid",
    gap: 10,
    padding: "18px 22px",
    borderRadius: 24,
    background: "linear-gradient(180deg, rgba(224, 247, 229, 0.95), rgba(247, 255, 250, 0.95))",
    border: "1px solid rgba(110, 214, 160, 0.24)",
    boxShadow: "0 14px 32px rgba(51, 100, 68, 0.08)",
  },
  impactLabel: {
    margin: 0,
    fontSize: 12,
    fontWeight: 700,
    color: "#556f58",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },
  impactText: {
    margin: "4px 0 0",
    fontSize: 16,
    color: "#1c3a27",
    fontWeight: 700,
    lineHeight: 1.4,
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  volunteerBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    borderRadius: 18,
    background: "rgba(255,255,255,0.9)",
    color: "#3b5a3f",
    fontSize: 13,
    fontWeight: 700,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
  },
  profileLink: {
    textDecoration: "none",
    width: "100%",
  },
  viewProfileBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    minHeight: 52,
    width: "100%",
    padding: "0 18px",
    borderRadius: 16,
    border: "1px solid transparent",
    background: "linear-gradient(135deg, rgba(43, 117, 64, 0.12), rgba(255,255,255,0.65))",
    color: "#225133",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 14px 32px rgba(26, 69, 37, 0.08)",
    transition: "transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease, color 0.35s ease",
  },
  viewProfileBtnHover: {
    transform: "translateY(-2px)",
    background: "linear-gradient(135deg, #2f7d47, #7fd3a0)",
    color: "#fff",
    boxShadow: "0 22px 52px rgba(41, 118, 64, 0.18)",
  },
  emptyState: {
    gridColumn: "1 / -1",
    borderRadius: 28,
    padding: "48px 40px",
    marginTop: 18,
    background: "rgba(255,255,255,0.95)",
    border: "1px solid rgba(228, 245, 228, 0.7)",
    boxShadow: "0 24px 60px rgba(32, 91, 47, 0.08)",
    display: "grid",
    gap: 20,
    justifyItems: "center",
    textAlign: "center",
  },
  emptyIllustration: {
    width: 96,
    height: 96,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    background: "radial-gradient(circle, rgba(149, 226, 175, 0.35), rgba(255,255,255,0.2))",
    fontSize: 40,
  },
  emptyTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 800,
    color: "#1a3120",
  },
  emptyText: {
    margin: 0,
    maxWidth: 520,
    color: "#5e6c5c",
    fontSize: 15,
    lineHeight: 1.9,
  },
  emptyButton: {
    minWidth: 180,
    padding: "14px 24px",
    borderRadius: 16,
    border: "none",
    background: "linear-gradient(135deg, #2b7540 0%, #94d5b0 100%)",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 16px 40px rgba(43, 117, 64, 0.14)",
  },
  ctaSection: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "72px 32px 92px",
    borderRadius: 28,
    background: "linear-gradient(135deg, rgba(46, 106, 58, 0.1), rgba(255,255,255,0.96))",
    border: "1px solid rgba(255,255,255,0.75)",
    boxShadow: "0 28px 90px rgba(25, 91, 40, 0.08)",
    backdropFilter: "blur(22px)",
  },
  ctaContent: {
    display: "grid",
    gap: 24,
    textAlign: "center",
    alignItems: "center",
  },
  ctaBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 18px",
    borderRadius: 999,
    background: "rgba(223, 247, 229, 0.95)",
    color: "#31683a",
    fontWeight: 700,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
  },
  ctaTitle: {
    margin: 0,
    fontSize: "clamp(32px, 4vw, 48px)",
    lineHeight: 1.08,
    fontWeight: 900,
    color: "#111",
  },
  ctaDesc: {
    margin: 0,
    maxWidth: 700,
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 17,
    lineHeight: 1.9,
    color: "#4f6452",
  },
  ctaActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
  },
  ctaPrimary: {
    minHeight: 60,
    padding: "0 34px",
    borderRadius: 18,
    border: "none",
    background: "linear-gradient(135deg, #2c7f48 0%, #a8e7c4 100%)",
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 18px 48px rgba(34, 102, 56, 0.19)",
    transition: "transform 0.35s ease, box-shadow 0.35s ease",
  },
  ctaSecondary: {
    minHeight: 60,
    padding: "0 32px",
    borderRadius: 18,
    border: "1px solid rgba(43, 117, 64, 0.2)",
    background: "rgba(255,255,255,0.92)",
    color: "#265234",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 14px 34px rgba(31, 83, 44, 0.12)",
  },
};
