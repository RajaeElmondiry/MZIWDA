import { useState } from "react";

/* ─────────────────────────────────────────────
   DATA — événements fictifs (à remplacer par API)
───────────────────────────────────────────── */
const CATEGORIES = ["Tous", "Éducation", "Santé", "Environnement", "Alimentaire", "Social"];

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
    image: null,
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
    image: null,
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
    image: null,
  },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   MODAL D'INSCRIPTION
───────────────────────────────────────────── */
function InscriptionModal({ event, onClose }) {
  const [form, setForm] = useState({ nom: "", email: "", tel: "", message: "" });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("form"); // form | success

  const validate = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = "Requis";
    if (!form.email.match(/\S+@\S+\.\S+/)) e.email = "Email invalide";
    if (!form.tel.match(/^\+?[\d\s]{8,15}$/)) e.tel = "Numéro invalide";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep("success");
  };

  return (
    <div style={modal.overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={modal.box}>
        {/* Header */}
        <div style={modal.header}>
          <div>
            <p style={modal.headerSub}>Inscription à l'événement</p>
            <p style={modal.headerTitle}>{event.title}</p>
          </div>
          <button style={modal.closeBtn} onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {step === "form" && (
          <>
            {/* Résumé événement */}
            <div style={modal.eventSummary}>
              <span style={modal.summaryItem}>📅 {formatDate(event.date)}</span>
              <span style={modal.summaryItem}>📍 {event.location}</span>
              <span style={{ ...modal.summaryItem, color: spotsColor(event.spotsLeft, event.spots) }}>
                👥 {event.spotsLeft} place{event.spotsLeft > 1 ? "s" : ""} restante{event.spotsLeft > 1 ? "s" : ""}
              </span>
            </div>

            {/* Formulaire */}
            <Field label="Nom complet" placeholder="Prénom Nom" value={form.nom} error={errors.nom}
              onChange={v => setForm(f => ({ ...f, nom: v }))} />
            <Field label="Adresse e-mail" type="email" placeholder="exemple@email.com" value={form.email} error={errors.email}
              onChange={v => setForm(f => ({ ...f, email: v }))} />
            <Field label="Téléphone" placeholder="+212 6XX XXX XXX" value={form.tel} error={errors.tel}
              onChange={v => setForm(f => ({ ...f, tel: v }))} />
            <div style={{ marginBottom: 14 }}>
              <label style={modal.label}>Message (optionnel)</label>
              <textarea
                placeholder="Parlez-nous de votre motivation..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
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
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
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
      {error && <p style={{ fontSize: 12, color: "#d32f2f", margin: "4px 0 0", fontFamily: "'Segoe UI', sans-serif" }}>{error}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   EVENT CARD
───────────────────────────────────────────── */
function EventCard({ event, onInscription }) {
  const full = event.spotsLeft === 0;
  const pct = Math.round(((event.spots - event.spotsLeft) / event.spots) * 100);

  return (
    <div style={card.wrapper}>
      {/* Image placeholder */}
      <div style={card.imagePlaceholder}>
        <span style={card.imageIcon}>
          {event.category === "Alimentaire" ? "🍱"
            : event.category === "Santé" ? "🏥"
            : event.category === "Environnement" ? "🌿"
            : event.category === "Éducation" ? "📚"
            : "🤝"}
        </span>
        <span style={card.categoryBadge}>{event.category}</span>
        {full && <span style={card.fullBadge}>Complet</span>}
      </div>

      {/* Content */}
      <div style={card.content}>
        <h3 style={card.title}>{event.title}</h3>
        <p style={card.description}>{event.description}</p>

        <div style={card.meta}>
          <span style={card.metaItem}>📅 {formatDate(event.date)}</span>
          <span style={card.metaItem}>📍 {event.location}</span>
        </div>

        {/* Progress bar places */}
        <div style={card.progressWrapper}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={card.progressLabel}>Places disponibles</span>
            <span style={{ ...card.progressLabel, color: spotsColor(event.spotsLeft, event.spots), fontWeight: 600 }}>
              {event.spotsLeft}/{event.spots}
            </span>
          </div>
          <div style={card.progressBg}>
            <div style={{
              ...card.progressFill,
              width: `${pct}%`,
              background: full ? "#d32f2f" : pct > 70 ? "#e65100" : "#236c42",
            }} />
          </div>
        </div>

        <button
          style={{ ...card.btn, ...(full ? card.btnFull : {}) }}
          onClick={() => !full && onInscription(event)}
          disabled={full}
        >
          {full ? "Événement complet" : "S'inscrire"}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Events() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filtered = EVENTS.filter(e => {
    const matchCat = activeCategory === "Tous" || e.category === activeCategory;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase())
      || e.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section style={styles.section}>
      <div style={styles.container}>

        {/* Hero */}
        <div style={styles.hero}>
          <span style={styles.badge}>Agenda caritatif</span>
          <h1 style={styles.heading}>
            Événements &amp; <span style={styles.accent}>Missions bénévoles</span>
          </h1>
          <p style={styles.subheading}>
            Rejoignez une communauté engagée. Inscrivez-vous aux événements qui correspondent à vos valeurs.
          </p>
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          {/* Search */}
          <div style={styles.searchWrapper}>
            <svg style={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Rechercher un événement ou une ville…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* Categories */}
          <div style={styles.categories}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  ...styles.catBtn,
                  ...(activeCategory === cat ? styles.catBtnActive : {}),
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p style={styles.resultsCount}>
          {filtered.length} événement{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={styles.grid}>
            {filtered.map(event => (
              <EventCard key={event.id} event={event} onInscription={setSelectedEvent} />
            ))}
          </div>
        ) : (
          <div style={styles.empty}>
            <span style={{ fontSize: 48 }}>🔍</span>
            <p style={styles.emptyText}>Aucun événement ne correspond à votre recherche.</p>
            <button style={styles.resetBtn} onClick={() => { setSearch(""); setActiveCategory("Tous"); }}>
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {selectedEvent && (
        <InscriptionModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const styles = {
  section: {
    background: "#f7f6f2",
    minHeight: "100vh",
    padding: "60px 24px 80px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: { maxWidth: "1100px", margin: "0 auto" },
  hero: { textAlign: "center", marginBottom: "40px" },
  badge: {
    display: "inline-block",
    background: "#e8f5ee",
    color: "#236c42",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    padding: "6px 14px",
    borderRadius: "20px",
    marginBottom: "16px",
  },
  heading: {
    fontSize: "clamp(28px, 5vw, 42px)",
    fontWeight: "700",
    color: "#1a1a1a",
    fontFamily: "'Georgia', serif",
    margin: "0 0 12px",
  },
  accent: { color: "#236c42" },
  subheading: { fontSize: "16px", color: "#666", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 },
  filters: { marginBottom: "24px" },
  searchWrapper: {
    position: "relative",
    marginBottom: "16px",
  },
  searchIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  searchInput: {
    width: "100%",
    padding: "12px 14px 12px 42px",
    border: "1.5px solid #ddd",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    background: "#fff",
    fontFamily: "'Segoe UI', sans-serif",
  },
  categories: { display: "flex", gap: "10px", flexWrap: "wrap" },
  catBtn: {
    padding: "8px 18px",
    border: "1.5px solid #ddd",
    borderRadius: "20px",
    background: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    color: "#555",
  },
  catBtnActive: { background: "#236c42", borderColor: "#236c42", color: "#fff" },
  resultsCount: { fontSize: "13px", color: "#999", marginBottom: "24px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px",
  },
  empty: {
    textAlign: "center",
    padding: "60px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  emptyText: { fontSize: "16px", color: "#888" },
  resetBtn: {
    padding: "10px 24px",
    background: "#236c42",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

const card = {
  wrapper: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  imagePlaceholder: {
    height: "140px",
    background: "linear-gradient(135deg, #e8f5ee 0%, #c8e6d4 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  imageIcon: { fontSize: "52px" },
  categoryBadge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "#236c42",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "12px",
    letterSpacing: "0.5px",
  },
  fullBadge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "#d32f2f",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "12px",
  },
  content: { padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" },
  title: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#1a1a1a",
    margin: 0,
    fontFamily: "'Georgia', serif",
    lineHeight: 1.3,
  },
  description: { fontSize: "13px", color: "#777", lineHeight: 1.6, margin: 0 },
  meta: { display: "flex", flexDirection: "column", gap: "4px" },
  metaItem: { fontSize: "13px", color: "#555" },
  progressWrapper: { marginTop: "4px" },
  progressLabel: { fontSize: "12px", color: "#888" },
  progressBg: { height: "6px", background: "#eee", borderRadius: "3px", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: "3px", transition: "width 0.3s" },
  btn: {
    marginTop: "auto",
    padding: "12px",
    background: "#236c42",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    width: "100%",
  },
  btnFull: {
    background: "#f5f5f5",
    color: "#aaa",
    cursor: "not-allowed",
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
    width: 36, height: 36,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  eventSummary: {
    background: "#f0faf4",
    borderRadius: "10px",
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
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