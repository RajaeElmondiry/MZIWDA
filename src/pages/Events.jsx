import { useState, useEffect, useRef } from "react";
import clothesImg from "../assets/cloths.jfif";
import medicalImg from "../assets/medical.jfif";
import schoolImg from "../assets/school.jfif";
import natureImg from "../assets/nature.jfif";
import socialImg from "../assets/social.jfif";
import trushImg from "../assets/trush.jfif";
import foodImg from "../assets/food.jfif";

/* ─────────────────────────────────────────────
   DATA — événements fictifs (à remplacer par API)
───────────────────────────────────────────── */
const CATEGORIES = ["Tous", "Éducation", "Santé", "Environnement", "Alimentaire", "Social"];

const HERO_STATS = [
  { label: "Missions réalisées", value: "124%", icon: "🎯" },
  { label: "Associations partenaires", value: "32%", icon: "🤝" },
  { label: "Bénévoles actifs", value: "1 280%", icon: "👥" },
];

const EVENTS = [
  {
    id: 1,
    title: "Distribution alimentaire – Casablanca",
    category: "Alimentaire",
    date: "2025-07-15",
    location: "Casablanca, Maârif",
    spots: 30,
    spotsLeft: 8,
    description: "Distribution de colis alimentaires aux familles dans le besoin durant le mois de juillet.",
    image: foodImg,
  },
  {
    id: 2,
    title: "Campagne médicale gratuite",
    category: "Santé",
    date: "2025-07-22",
    location: "Rabat, Youssoufia",
    spots: 20,
    spotsLeft: 5,
    description: "Consultations médicales gratuites, dépistage et sensibilisation santé pour les populations vulnérables.",
    image: null,
  },
  {
    id: 3,
    title: "Plantation d'arbres – Forêt de Tiflet",
    category: "Environnement",
    date: "2025-08-02",
    location: "Tiflet, Région Rabat-Salé",
    spots: 50,
    spotsLeft: 23,
    description: "Journée de reboisement en partenariat avec le Haut-Commissariat aux Eaux et Forêts.",
    image: null,
  },
  {
    id: 4,
    title: "Soutien scolaire – Rentrée 2025",
    category: "Éducation",
    date: "2025-09-05",
    location: "Marrakech, Gueliz",
    spots: 40,
    spotsLeft: 40,
    description: "Cours de soutien bénévole pour élèves du primaire et collège dans les quartiers défavorisés.",
    image: null,
  },
  {
    id: 5,
    title: "Collecte de vêtements d'hiver",
    category: "Social",
    date: "2025-10-10",
    location: "Fès, Centre-ville",
    spots: 25,
    spotsLeft: 12,
    description: "Collecte, tri et redistribution de vêtements chauds avant l'hiver pour les sans-abri.",
    image: clothesImg,
  },
  {
    id: 6,
    title: "Sensibilisation au tri des déchets",
    category: "Environnement",
    date: "2025-08-18",
    location: "Agadir, Talborjt",
    spots: 35,
    spotsLeft: 0,
    description: "Ateliers de sensibilisation dans les écoles et marchés sur le recyclage et la propreté urbaine.",
    image: trushImg,
  },
];

const CATEGORY_IMAGES = {
  Alimentaire: foodImg,
  Santé: medicalImg,
  Éducation: schoolImg,
  Environnement: natureImg,
  Social: socialImg,
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("fr-MA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function spotsColor(left, total) {
  const pct = left / total;
  if (left === 0) return "#d32f2f";
  if (pct < 0.3) return "#e65100";
  return "#236c42";
}

function InscriptionModal({ event, onClose }) {
  const [form, setForm] = useState({ nom: "", email: "", tel: "", message: "" });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("form");

  const validate = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = "Requis";
    if (!form.email.match(/\S+@\S+\.\S+/)) e.email = "Email invalide";
    if (!form.tel.match(/^\+?[\d\s]{8,15}$/)) e.tel = "Numéro invalide";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setStep("success");
  };

  return (
    <div style={modal.overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={modal.box}>
        <div style={modal.header}>
          <div>
            <p style={modal.headerSub}>Inscription à l'événement</p>
            <p style={modal.headerTitle}>{event.title}</p>
          </div>
          <button style={modal.closeBtn} onClick={onClose} aria-label="Fermer la fenêtre">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {step === "form" && (
          <>
            <div style={modal.eventSummary}>
              <span style={modal.summaryItem}>📅 {formatDate(event.date)}</span>
              <span style={modal.summaryItem}>📍 {event.location}</span>
              <span style={{ ...modal.summaryItem, color: spotsColor(event.spotsLeft, event.spots) }}>
                👥 {event.spotsLeft} place{event.spotsLeft > 1 ? "s" : ""} restante{event.spotsLeft > 1 ? "s" : ""}
              </span>
            </div>

            <Field
              label="Nom complet"
              placeholder="Prénom Nom"
              value={form.nom}
              error={errors.nom}
              onChange={v => setForm(prev => ({ ...prev, nom: v }))}
            />
            <Field
              label="Adresse e-mail"
              type="email"
              placeholder="exemple@email.com"
              value={form.email}
              error={errors.email}
              onChange={v => setForm(prev => ({ ...prev, email: v }))}
            />
            <Field
              label="Téléphone"
              placeholder="+212 6XX XXX XXX"
              value={form.tel}
              error={errors.tel}
              onChange={v => setForm(prev => ({ ...prev, tel: v }))}
            />
            <div style={{ marginBottom: 14 }}>
              <label style={modal.label}>Message (optionnel)</label>
              <textarea
                placeholder="Parlez-nous de votre motivation..."
                value={form.message}
                onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
                style={{ ...modal.input, resize: "vertical" }}
              />
            </div>

            <button style={modal.submitBtn} onClick={handleSubmit}>
              Confirmer mon inscription
            </button>
          </>
        )}

        {step === "success" && (
          <div style={modal.centered}>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#236c42" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3 style={modal.successTitle}>Inscription confirmée !</h3>
            <p style={modal.successText}>
              Merci <strong>{form.nom}</strong>, votre inscription à<br />
              <strong style={{ color: "#236c42" }}>{event.title}</strong><br />
              a bien été enregistrée. Un email de confirmation vous sera envoyé à <strong>{form.email}</strong>.
            </p>
            <button style={modal.submitBtn} onClick={onClose}>Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error, placeholder, type = "text" }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={modal.label}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ ...modal.input, ...(error ? { borderColor: "#d32f2f" } : {}) }}
      />
      {error && (
        <p style={{ fontSize: 12, color: "#d32f2f", margin: "4px 0 0", fontFamily: "'Segoe UI', sans-serif" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function EventCard({ event, onInscription }) {
  const [hovered, setHovered] = useState(false);
  const [readMoreHovered, setReadMoreHovered] = useState(false);
  const [readMoreFocused, setReadMoreFocused] = useState(false);
  const [readMoreActive, setReadMoreActive] = useState(false);
  const full = event.spotsLeft === 0;
  const pct = Math.round(((event.spots - event.spotsLeft) / event.spots) * 100);

  return (
    <div
      style={{ ...card.wrapper, ...(hovered ? card.wrapperHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={card.imagePlaceholder}>
        <img
          src={event.image ?? CATEGORY_IMAGES[event.category]}
          alt={event.title}
          style={{ ...card.image, ...(hovered ? card.imageHover : {}) }}
        />
        <div style={card.imageOverlay} />
        <div style={card.dateBadge}>📅 {formatDate(event.date)}</div>
        <div style={card.categoryBadge}>{event.category}</div>
        <div style={{ ...card.placesBadge, color: event.spotsLeft === 0 ? "#dc2626" : "#0f172a" }}>
          {event.spotsLeft === 0
            ? "🔴 Complet"
            : `🟢 ${event.spotsLeft} place${event.spotsLeft > 1 ? "s" : ""} restante${event.spotsLeft > 1 ? "s" : ""}`}
        </div>
      </div>

      <div style={card.content}>
        <h3 style={card.title}>{event.title}</h3>
        <p style={card.description}>{event.description}</p>

        <div style={card.meta}>
          <span style={card.metaItem}>📍 {event.location}</span>
          <span style={card.metaItem}>📅 {formatDate(event.date)}</span>
        </div>

        <div style={card.progressWrapper}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={card.progressLabel}>Places disponibles</span>
            <span style={{ ...card.progressLabel, color: spotsColor(event.spotsLeft, event.spots), fontWeight: 600 }}>
              {event.spotsLeft}/{event.spots}
            </span>
          </div>
          <div style={card.progressBg}>
            <div
              style={{
                ...card.progressFill,
                width: `${pct}%`,
                background: full ? "#d32f2f" : pct > 70 ? "#e65100" : "#236c42",
              }}
            />
          </div>
        </div>

        <div style={card.actionRow}>
          <button
            type="button"
            style={{
              ...card.primaryBtn,
              ...(full ? card.primaryBtnDisabled : {}),
              ...(hovered && !full ? card.primaryBtnHover : {}),
            }}
            onClick={() => !full && onInscription(event)}
            disabled={full}
          >
            <span>{full ? "Événement complet" : "S'inscrire"}</span>
            {!full && <span style={{ ...card.buttonArrow, ...(hovered && !full ? card.buttonArrowHover : {}) }}>→</span>}
          </button>

          <button
            type="button"
            style={{
              ...card.secondaryBtn,
              ...(readMoreHovered ? card.secondaryBtnHover : {}),
              ...(readMoreFocused ? card.secondaryBtnFocus : {}),
              ...(readMoreActive ? card.secondaryBtnActive : {}),
            }}
            onMouseEnter={() => setReadMoreHovered(true)}
            onMouseLeave={() => {
              setReadMoreHovered(false);
              setReadMoreActive(false);
            }}
            onFocus={() => setReadMoreFocused(true)}
            onBlur={() => setReadMoreFocused(false)}
            onMouseDown={() => setReadMoreActive(true)}
            onMouseUp={() => setReadMoreActive(false)}
            onClick={() => {}}
          >
            <span>En savoir plus</span>
            <span style={{ ...card.secondaryArrow, ...(readMoreHovered ? card.secondaryArrowHover : {}) }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mounted, setMounted] = useState(false);

  const statRefs = useRef([]);
  const statsSectionRef = useRef(null);
  const statsAnimatedRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    const duration = 1000;
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const targets = HERO_STATS.map(stat => Number(stat.value.toString().replace(/\D/g, "")));
    const suffixes = HERO_STATS.map(stat => stat.value.toString().replace(/[\d\s\u202f]/g, ""));
    const startTime = { current: null };

    const animate = now => {
      if (!startTime.current) startTime.current = now;
      const elapsed = Math.min(now - startTime.current, duration);
      const progress = easeOut(elapsed / duration);

      targets.forEach((target, index) => {
        const element = statRefs.current[index];
        if (element) {
          const current = Math.round(target * progress);
          element.textContent = `${current.toLocaleString("fr-FR")}${suffixes[index]}`;
        }
      });

      if (elapsed < duration) requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting && !statsAnimatedRef.current) {
          statsAnimatedRef.current = true;
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.35 }
    );

    if (statsSectionRef.current) observer.observe(statsSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = EVENTS.filter(e => {
    const matchCat = activeCategory === "Tous" || e.category === activeCategory;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase())
      || e.location.toLowerCase().includes(search.toLowerCase());
    const matchCity = !selectedCity || e.location.toLowerCase().includes(selectedCity.toLowerCase());
    return matchCat && matchSearch && matchCity;
  });

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={{ ...styles.hero, ...(mounted ? styles.heroMounted : {}) }}>
          <h1 style={styles.heading}>
            Événements &amp; <span style={styles.accent}>Missions bénévoles</span>
          </h1>
          <p style={styles.subheading}>
            Rejoignez une communauté engagée. Inscrivez-vous aux événements qui correspondent à vos valeurs.
          </p>

          <div ref={statsSectionRef} style={styles.statsSection}>
            <div style={styles.statsSectionGrid}>
              {HERO_STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  style={{
                    ...styles.statSectionItem,
                    ...(index > 0 ? styles.statSectionDivider : {}),
                    ...(hoveredStat === stat.label ? styles.statSectionItemHover : {}),
                  }}
                  onMouseEnter={() => setHoveredStat(stat.label)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <p ref={el => (statRefs.current[index] = el)} style={styles.statSectionValue}>0</p>
                  <p style={styles.statSectionLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.filters}>
          <div style={styles.searchWrapper}>
            <svg style={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher un événement ou une ville…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{ ...styles.searchInput, ...(searchFocused ? styles.searchInputFocus : {}) }}
            />
            {search && (
              <button
                type="button"
                aria-label="Effacer la recherche"
                onClick={() => setSearch("")}
                style={styles.clearButton}
              >
                ×
              </button>
            )}
          </div>

          <div style={styles.categories}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => setHoveredCategory(cat)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{ ...styles.catBtn, ...(activeCategory === cat ? styles.catBtnActive : {}), ...(hoveredCategory === cat ? styles.catBtnHover : {}) }}
              >
                {cat}
              </button>
            ))}
            <div style={styles.filterPill}>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                style={styles.filterPillSelect}
              >
                <option value="" disabled>Ville</option>
                <option value="Casablanca">Casablanca</option>
                <option value="Rabat">Rabat</option>
                <option value="Marrakech">Marrakech</option>
                <option value="Fès">Fès</option>
                <option value="Agadir">Agadir</option>
              </select>
            </div>
          </div>
        </div>

        <p style={styles.resultsCount}>
          {filtered.length} événement{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
        </p>

        {filtered.length > 0 ? (
          <div style={styles.grid}>
            {filtered.map(event => (
              <EventCard key={event.id} event={event} onInscription={setSelectedEvent} />
            ))}
          </div>
        ) : (
          <div style={styles.empty}>
            <span style={styles.emptyIcon}>🔍</span>
            <p style={styles.emptyText}>Aucun événement ne correspond à votre recherche.</p>
            <button style={styles.resetBtn} onClick={() => { setSearch(""); setActiveCategory("Tous"); }}>
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {selectedEvent && <InscriptionModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </section>
  );
}

const styles = {
  section: {
    background: "linear-gradient(180deg, #f7fbfc 0%, #ffffff 64%)",
    minHeight: "100vh",
    padding: "72px 24px 90px",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: "#111827",
  },
  container: { maxWidth: "1160px", margin: "0 auto" },
  hero: { textAlign: "center", marginBottom: "44px", position: "relative", overflow: "hidden", opacity: 0, transform: "translateY(18px)", transition: "opacity 0.8s ease, transform 0.8s ease" },
  heroMounted: { opacity: 1, transform: "translateY(0)" },
  heroGlowOne: {},
  heroGlowTwo: {},
  heading: { fontSize: "clamp(34px, 5vw, 52px)", fontWeight: "800", color: "#0f172a", margin: "0 0 16px", lineHeight: 1.03 },
  accent: { color: "#1f6b48" },
  subheading: { fontSize: "17px", color: "#475569", maxWidth: "620px", margin: "0 auto", lineHeight: 1.8 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px", margin: "32px 0 24px", position: "relative", zIndex: 1 },
  statCard: {
    background: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 14px 32px rgba(15, 23, 42, 0.08)",
    padding: "20px 18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "8px",
    minHeight: "120px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "default",
  },
  statCardHover: { transform: "translateY(-4px)", boxShadow: "0 22px 42px rgba(15, 23, 42, 0.14)" },
  statIcon: { fontSize: "26px", lineHeight: 1 },
  statValue: { fontSize: "34px", fontWeight: "800", color: "#0f172a", margin: 0 },
  statLabel: { fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 },
  statsSection: {
    background: "#ffffff",
    padding: "40px 24px",
    margin: "36px 0",
    display: "flex",
    justifyContent: "center",
  },
  statsSectionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "0",
    alignItems: "center",
    width: "100%",
    maxWidth: "920px",
  },
  statSectionItem: {
    padding: "24px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    color: "#111827",
    transition: "transform 0.2s ease, color 0.2s ease",
  },
  statSectionDivider: {
    borderLeft: "1px solid rgba(22, 163, 74, 0.25)",
  },
  statSectionItemHover: {
    transform: "scale(1.03)",
  },
  statSectionValue: {
    fontSize: "clamp(48px, 5vw, 56px)",
    fontWeight: "800",
    margin: 0,
    color: "#16A34A",
    lineHeight: 1,
  },
  statSectionLabel: {
    fontSize: "18px",
    color: "#475569",
    marginTop: "12px",
    lineHeight: 1.35,
    fontWeight: 500,
  },
  filters: { marginBottom: "32px", display: "grid", gap: "18px", position: "relative", zIndex: 1 },
  filterRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
    alignItems: "end",
    width: "100%",
    maxWidth: "680px",
    margin: "0 auto",
  },
  filterControl: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  filterLabel: {
    fontSize: "12px",
    color: "#475569",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.6px",
  },
  filterSelect: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    background: "#fff",
    color: "#111827",
    outline: "none",
    fontSize: "14px",
    cursor: "pointer",
  },
  filterInput: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    background: "#fff",
    color: "#111827",
    outline: "none",
    fontSize: "14px",
  },
  filterPill: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: "38px",
    border: "1px solid #e5e7eb",
    borderRadius: "999px",
    background: "#fff",
    padding: "0 10px",
    gap: "10px",
    flexShrink: 0,
  },
  filterPillIcon: {
    fontSize: "16px",
    lineHeight: 1,
  },
  filterPillSelect: {
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#111827",
    fontSize: "13px",
    fontWeight: 700,
    minWidth: "120px",
    padding: "10px 0",
    cursor: "pointer",
    appearance: "none",
  },
  filterPillInput: {
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#111827",
    fontSize: "13px",
    fontWeight: 700,
    minWidth: "130px",
    padding: "10px 0",
    cursor: "pointer",
  },
  searchWrapper: {
    position: "relative",
    margin: "0 auto",
    maxWidth: "680px",
    background: "#fff",
    borderRadius: "999px",
    padding: "14px 18px",
    boxShadow: "0 22px 70px rgba(15, 23, 42, 0.08)",
    transition: "box-shadow 0.2s ease",
  },
  searchIcon: { position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" },
  searchInput: {
    width: "100%",
    border: "none",
    padding: "14px 14px 14px 48px",
    borderRadius: "999px",
    fontSize: "15px",
    outline: "none",
    background: "transparent",
    color: "#111827",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  searchInputFocus: { boxShadow: "0 0 0 4px rgba(31, 107, 72, 0.08)" },
  clearButton: {
    position: "absolute",
    right: "18px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "#64748b",
    cursor: "pointer",
    fontSize: "18px",
    lineHeight: 1,
  },
  categories: { display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" },
  catBtn: {
    padding: "10px 18px",
    border: "1px solid #e5e7eb",
    borderRadius: "999px",
    background: "#fff",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    color: "#4b5563",
    transition: "transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
  },
  catBtnHover: { transform: "scale(1.03)", borderColor: "#d1d5db" },
  catBtnActive: {
    background: "#1f6b48",
    borderColor: "#1f6b48",
    color: "#fff",
    boxShadow: "0 16px 30px rgba(31, 107, 72, 0.18)",
  },
  resultsCount: { fontSize: "14px", color: "#64748b", marginBottom: "28px", textAlign: "center", position: "relative", zIndex: 1 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px" },
  empty: {
    textAlign: "center",
    padding: "80px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    position: "relative",
    zIndex: 1,
  },
  emptyIcon: { fontSize: "56px" },
  emptyText: { fontSize: "17px", color: "#475569", maxWidth: "560px", lineHeight: 1.7 },
  resetBtn: {
    padding: "16px 32px",
    background: "#1f6b48",
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.2s ease, transform 0.2s ease",
  },
};

const card = {
  wrapper: {
    background: "#ffffff",
    borderRadius: "26px",
    overflow: "hidden",
    boxShadow: "0 24px 80px rgba(15, 23, 42, 0.08)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    transform: "translateY(0)",
  },
  wrapperHover: {
    transform: "translateY(-8px)",
    boxShadow: "0 36px 120px rgba(15, 23, 42, 0.16)",
  },
  imagePlaceholder: { height: "240px", position: "relative", overflow: "hidden", minHeight: "240px" },
  image: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.45s ease" },
  imageHover: { transform: "scale(1.06)" },
  imageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(15,23,42,0.12) 0%, rgba(15,23,42,0.5) 100%)",
    pointerEvents: "none",
    zIndex: 1,
  },
  dateBadge: {
    position: "absolute",
    top: "18px",
    left: "18px",
    background: "rgba(0,0,0,0.62)",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "700",
    padding: "8px 12px",
    borderRadius: "999px",
    zIndex: 2,
  },
  categoryBadge: {
    position: "absolute",
    top: "18px",
    right: "18px",
    background: "rgba(255,255,255,0.95)",
    color: "#0f172a",
    fontSize: "12px",
    fontWeight: "700",
    padding: "8px 14px",
    borderRadius: "999px",
    boxShadow: "0 16px 32px rgba(15, 23, 42, 0.08)",
    zIndex: 2,
  },
  placesBadge: {
    position: "absolute",
    bottom: "18px",
    left: "18px",
    background: "rgba(255,255,255,0.96)",
    color: "#0f172a",
    fontSize: "12px",
    fontWeight: "700",
    padding: "8px 12px",
    borderRadius: "999px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
    zIndex: 2,
  },
  content: { padding: "24px", display: "flex", flexDirection: "column", gap: "16px", minHeight: "300px" },
  title: { fontSize: "19px", fontWeight: "800", color: "#0f172a", margin: 0, lineHeight: 1.25 },
  description: { fontSize: "14px", color: "#475569", lineHeight: 1.75, margin: 0, flex: 1 },
  meta: { display: "grid", gap: "10px" },
  metaItem: { display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#64748b" },
  progressWrapper: { marginTop: "4px" },
  progressLabel: { fontSize: "12px", color: "#64748b" },
  progressBg: { height: "9px", background: "#e2e8f0", borderRadius: "999px", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: "999px", transition: "width 0.35s ease" },
  btn: {
    marginTop: "auto",
    padding: "14px",
    background: "linear-gradient(135deg, #1f6b48 0%, #256540 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "18px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    width: "100%",
    boxShadow: "0 18px 42px rgba(31, 107, 72, 0.18)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
  },
  btnHover: { transform: "translateY(-1px)", boxShadow: "0 20px 48px rgba(31, 107, 72, 0.25)" },
  btnArrow: { display: "inline-block", transform: "translateX(0)" },
  btnFull: { background: "#e5e7eb", color: "#9ca3af", cursor: "not-allowed", boxShadow: "none" },
  actionRow: { display: "flex", gap: "12px", flexWrap: "nowrap", alignItems: "center", width: "100%" },
  primaryBtn: {
    flex: "0 1 60%",
    minWidth: "160px",
    minHeight: "48px",
    padding: "0 24px",
    border: "1px solid #16A34A",
    background: "#16A34A",
    color: "#ffffff",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "background 250ms ease, color 250ms ease, transform 250ms ease, box-shadow 250ms ease",
    boxShadow: "0 6px 20px rgba(22, 163, 74, 0.12)",
    textDecoration: "none",
    lineHeight: 1,
  },
  primaryBtnHover: {
    background: "#15803D",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(22, 163, 74, 0.18)",
  },
  primaryBtnDisabled: {
    background: "#e5e7eb",
    color: "#9ca3af",
    borderColor: "#d1d5db",
    cursor: "not-allowed",
    boxShadow: "none",
    transform: "none",
  },
  buttonArrow: {
    display: "inline-block",
    transition: "transform 250ms ease",
  },
  buttonArrowHover: {
    transform: "translateX(4px)",
  },
  secondaryBtn: {
    flex: "0 0 40%",
    minHeight: "48px",
    padding: "0 20px",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#334155",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background 250ms ease, color 250ms ease, transform 250ms ease, border-color 250ms ease",
    textDecoration: "none",
    lineHeight: 1,
  },
  secondaryBtnHover: {
    background: "#ecfdf5",
    color: "#16A34A",
    borderColor: "#16A34A",
  },
  secondaryBtnFocus: {
    boxShadow: "0 0 0 4px rgba(22, 163, 74, 0.15)",
  },
  secondaryBtnActive: {
    transform: "scale(0.98)",
  },
  secondaryArrow: {
    display: "inline-block",
    transition: "transform 250ms ease",
    transform: "translateX(0)",
  },
  secondaryArrowHover: {
    transform: "translateX(3px)",
  },
};

const modal = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "16px",
  },
  box: {
    background: "#fff",
    borderRadius: "20px",
    padding: "32px",
    width: "100%",
    maxWidth: "480px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "1px solid #f0f0f0",
  },
  headerSub: { fontSize: "12px", color: "#999", margin: "0 0 4px" },
  headerTitle: { fontSize: "17px", fontWeight: "700", color: "#1a1a1a", margin: 0, fontFamily: "'Georgia', serif" },
  closeBtn: {
    background: "#f5f5f5",
    border: "none",
    borderRadius: "50%",
    width: 36,
    height: 36,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  eventSummary: {
    background: "#f0faf4",
    borderRadius: "14px",
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "20px",
  },
  summaryItem: { fontSize: "13px", color: "#444" },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    color: "#555",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1.5px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', sans-serif",
  },
  submitBtn: {
    width: "100%",
    padding: "14px",
    background: "#236c42",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "8px",
  },
  centered: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "20px 0",
  },
  successTitle: { fontSize: "22px", fontWeight: "700", margin: "16px 0 10px", fontFamily: "'Georgia', serif" },
  successText: { fontSize: "14px", color: "#555", lineHeight: 1.7, margin: "0 0 24px" },
};
