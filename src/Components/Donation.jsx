import { useState } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const stats = [
  { value: "12,480", label: "Personnes aidées" },
  { value: "94%", label: "Taux de satisfaction" },
  { value: "3,200+", label: "Campagnes réussies" },
];

const presets = [10, 20, 50, 100];

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const PayPalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M19.5 6.5C19.5 9.8 17.1 12.5 13.5 12.5H11L9.5 20H6L8.5 6H13.5C16.8 6 19.5 6.5 19.5 6.5Z" fill="#003087"/>
    <path d="M20.5 4C20.5 7.3 18.1 10 14.5 10H12L10.5 17.5H7L9.5 4H14.5C17.8 4 20.5 4 20.5 4Z" fill="#009cde"/>
  </svg>
);

const CardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#236c42" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

/* ─────────────────────────────────────────────
   PAYMENT MODAL
───────────────────────────────────────────── */
function PaymentModal({ amount, onClose }) {
  const [method, setMethod] = useState(null); // null | "paypal" | "cmi"
  const [step, setStep] = useState("choose"); // choose | form | processing | success | error
  const [form, setForm] = useState({ name: "", card: "", expiry: "", cvv: "", email: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (method === "paypal") {
      if (!form.email.match(/\S+@\S+\.\S+/)) e.email = "Email invalide";
    } else {
      if (!form.name.trim()) e.name = "Requis";
      if (!form.card.replace(/\s/g, "").match(/^\d{16}$/)) e.card = "Numéro invalide (16 chiffres)";
      if (!form.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = "Format MM/AA";
      if (!form.cvv.match(/^\d{3,4}$/)) e.cvv = "3 ou 4 chiffres";
    }
    return e;
  };

  const handlePay = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep("processing");
    // Simulate API call (replace with real PayPal SDK / CMI API call)
    setTimeout(() => setStep("success"), 2500);
  };

  const formatCard = (v) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  return (
    <div style={modal.overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={modal.box}>

        {/* Header */}
        <div style={modal.header}>
          <div>
            <p style={modal.headerSub}>Montant du don</p>
            <p style={modal.headerAmount}>€{amount}</p>
          </div>
          <button style={modal.closeBtn} onClick={onClose}><XIcon /></button>
        </div>

        {/* ── STEP: CHOOSE METHOD ── */}
        {step === "choose" && (
          <div>
            <p style={modal.sectionTitle}>Choisissez votre méthode de paiement</p>

            <button
              style={{ ...modal.methodBtn, ...(method === "paypal" ? modal.methodActive : {}) }}
              onClick={() => { setMethod("paypal"); setStep("form"); }}
            >
              <div style={modal.methodLeft}>
                <PayPalIcon />
                <div>
                  <p style={modal.methodName}>PayPal</p>
                  <p style={modal.methodDesc}>Paiement rapide via votre compte PayPal</p>
                </div>
              </div>
              <span style={modal.methodArrow}>›</span>
            </button>

            <button
              style={{ ...modal.methodBtn, ...(method === "cmi" ? modal.methodActive : {}) }}
              onClick={() => { setMethod("cmi"); setStep("form"); }}
            >
              <div style={modal.methodLeft}>
                <CardIcon />
                <div>
                  <p style={modal.methodName}>CMI Maroc – Carte bancaire</p>
                  <p style={modal.methodDesc}>Visa, Mastercard, CIH, Attijariwafa…</p>
                </div>
              </div>
              <span style={modal.methodArrow}>›</span>
            </button>

            <div style={modal.secureRow}>
              <LockIcon />
              <span>Transactions sécurisées </span>
            </div>
          </div>
        )}

        {/* ── STEP: FORM ── */}
        {step === "form" && (
          <div>
            <button style={modal.backBtn} onClick={() => { setStep("choose"); setErrors({}); }}>
              ← Retour
            </button>

            {/* PayPal form */}
            {method === "paypal" && (
              <div>
                <div style={modal.paypalBanner}>
                  <PayPalIcon />
                  <span style={{ fontWeight: 700, color: "#003087", fontSize: 15 }}>
                    Connectez-vous à PayPal
                  </span>
                </div>
                <Field
                  label="Adresse e-mail PayPal"
                  type="email"
                  placeholder="exemple@email.com"
                  value={form.email}
                  error={errors.email}
                  onChange={v => setForm(f => ({ ...f, email: v }))}
                />
                <p style={modal.hint}>
                  Vous serez redirigé vers PayPal pour finaliser votre don de <strong>€{amount}</strong>.
                </p>
              </div>
            )}

            {/* CMI form */}
            {method === "cmi" && (
              <div>
                <div style={modal.cmiHeader}>
                  <span style={modal.cmiLogo}>CMI</span>
                  <span style={{ fontSize: 13, color: "#666" }}>Centre Monétique Interbancaire</span>
                </div>
                <Field
                  label="Nom sur la carte"
                  placeholder="PRÉNOM NOM"
                  value={form.name}
                  error={errors.name}
                  onChange={v => setForm(f => ({ ...f, name: v.toUpperCase() }))}
                />
                <Field
                  label="Numéro de carte"
                  placeholder="0000 0000 0000 0000"
                  value={form.card}
                  error={errors.card}
                  onChange={v => setForm(f => ({ ...f, card: formatCard(v) }))}
                  inputMode="numeric"
                  suffix={<CardIcons />}
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field
                    label="Date d'expiration"
                    placeholder="MM/AA"
                    value={form.expiry}
                    error={errors.expiry}
                    onChange={v => setForm(f => ({ ...f, expiry: formatExpiry(v) }))}
                    inputMode="numeric"
                  />
                  <Field
                    label="CVV"
                    placeholder="• • •"
                    value={form.cvv}
                    error={errors.cvv}
                    onChange={v => setForm(f => ({ ...f, cvv: v.replace(/\D/g, "").slice(0, 4) }))}
                    inputMode="numeric"
                    type="password"
                  />
                </div>
              </div>
            )}

            <button style={modal.payBtn} onClick={handlePay}>
              <LockIcon />
              &nbsp; Confirmer le don de €{amount}
            </button>

            <div style={modal.secureRow}>
              <LockIcon />
              <span> Données protégées</span>
            </div>
          </div>
        )}

        {/* ── STEP: PROCESSING ── */}
        {step === "processing" && (
          <div style={modal.centered}>
            <div style={modal.spinner} />
            <p style={modal.processingText}>Traitement en cours…</p>
            <p style={modal.processingSubText}>Veuillez ne pas fermer cette fenêtre.</p>
          </div>
        )}

        {/* ── STEP: SUCCESS ── */}
        {step === "success" && (
          <div style={modal.centered}>
            <CheckIcon />
            <h3 style={modal.successTitle}>Don confirmé !</h3>
            <p style={modal.successText}>
              Merci pour votre généreux don de <strong style={{ color: "#236c42" }}>€{amount}</strong>.<br />
              Un reçu a été envoyé à votre adresse e-mail.
            </p>
            <button style={modal.closeSuccessBtn} onClick={onClose}>Fermer</button>
          </div>
        )}

      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* Reusable field */
function Field({ label, value, onChange, error, placeholder, type = "text", inputMode, suffix }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={modal.label}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={type}
          inputMode={inputMode}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ ...modal.input, ...(error ? modal.inputErr : {}) }}
        />
        {suffix && <div style={modal.inputSuffix}>{suffix}</div>}
      </div>
      {error && <p style={modal.fieldError}>{error}</p>}
    </div>
  );
}

const CardIcons = () => (
  <div style={{ display: "flex", gap: 4 }}>
    {["VISA", "MC"].map(b => (
      <span key={b} style={{ fontSize: 9, fontWeight: 700, background: "#eee", padding: "2px 5px", borderRadius: 3, color: "#555" }}>
        {b}
      </span>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Donation() {
  const [amount, setAmount] = useState(20);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section style={styles.section}>
        <div style={styles.container}>

          {/* LEFT — Statistics */}
          <div style={styles.left}>
            <span style={styles.badge}>Notre impact</span>
            <h2 style={styles.heading}>
              Statistiques des personnes<br />
              <span style={styles.headingAccent}>aidées par notre site</span>
            </h2>
            <p style={styles.description}>
              Chaque don compte. Grâce à notre communauté, des milliers de personnes
              ont reçu l'aide dont elles avaient besoin.
            </p>
            <div style={styles.statsGrid}>
              {stats.map((s, i) => (
                <div key={i} style={styles.statCard}>
                  <span style={styles.statValue}>{s.value}</span>
                  <span style={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Donation Slider */}
          <div style={styles.right}>
            <div style={styles.donationCard}>
              <div style={styles.donationHeader}>
                <span style={styles.donationTitle}>Combien souhaitez-vous donner ?</span>
                <div style={styles.amountDisplay}>
                  <span style={styles.currency}>€</span>
                  <span style={styles.amountValue}>{amount}</span>
                </div>
              </div>

              {/* Slider */}
              <div style={styles.sliderWrapper}>
                <style>{`
                  .impact-slider {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 100%;
                    height: 6px;
                    border-radius: 3px;
                    background: linear-gradient(
                      to right,
                      #236c42 0%,
                      #236c42 ${(amount / 500) * 100}%,
                      #e0e0e0 ${(amount / 500) * 100}%,
                      #e0e0e0 100%
                    );
                    outline: none;
                    cursor: pointer;
                  }
                  .impact-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    background: #236c42;
                    border: 3px solid #fff;
                    box-shadow: 0 2px 8px rgba(35,108,66,0.4);
                    cursor: pointer;
                    transition: transform 0.15s;
                  }
                  .impact-slider::-webkit-slider-thumb:hover { transform: scale(1.2); }
                  .impact-slider::-moz-range-thumb {
                    width: 22px; height: 22px; border-radius: 50%;
                    background: #236c42; border: 3px solid #fff;
                    box-shadow: 0 2px 8px rgba(35,108,66,0.4); cursor: pointer;
                  }
                `}</style>
                <input
                  className="impact-slider"
                  type="range"
                  min={1} max={500} step={1}
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                />
                <div style={styles.sliderLabels}>
                  <span>€1</span>
                  <span>€500</span>
                </div>
              </div>

              {/* Presets */}
              <div style={styles.presets}>
                {presets.map(p => (
                  <button
                    key={p}
                    onClick={() => setAmount(p)}
                    style={{ ...styles.presetBtn, ...(amount === p ? styles.presetActive : {}) }}
                  >
                    €{p}
                  </button>
                ))}
              </div>

              {/* Impact message */}
              <div style={styles.impactMessage}>
                <span style={styles.impactIcon}>✦</span>
                <span style={styles.impactText}>
                  {amount < 10
                    ? "Chaque centime aide !"
                    : amount < 30
                    ? "Vous pouvez nourrir une famille pour une journée."
                    : amount < 100
                    ? "Vous aidez à couvrir des frais médicaux essentiels."
                    : "Votre générosité change des vies durablement."}
                </span>
              </div>

              {/* Payment method badges */}
              <div style={styles.paymentBadges}>
                <span style={styles.paymentBadge}>
                  <PayPalIcon /> PayPal
                </span>
                <span style={styles.paymentBadge}>
                  <CardIcon /> CMI Maroc
                </span>
              </div>

              <button
                style={styles.donateBtn}
                onClick={() => setShowModal(true)}
                onMouseOver={e => e.currentTarget.style.background = "#1a5c38"}
                onMouseOut={e => e.currentTarget.style.background = "#236c42"}
              >
                Faire un don de €{amount}
              </button>

              <p style={styles.secureNote}>
                <LockIcon /> Paiement sécurisé   100% des dons reversés
              </p>
            </div>
          </div>

        </div>
      </section>

      {showModal && (
        <PaymentModal amount={amount} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const styles = {
  section: {
    background: "#f7f6f2",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    padding: "80px 24px",
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "48px",
    alignItems: "center",
    width: "100%",
  },
  left: { paddingRight: "24px" },
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
    marginBottom: "20px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1a1a1a",
    lineHeight: "1.2",
    margin: "0 0 16px",
  },
  headingAccent: { color: "#236c42" },
  description: {
    fontSize: "16px",
    color: "#666",
    lineHeight: "1.7",
    margin: "0 0 36px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  statCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    borderTop: "3px solid #236c42",
  },
  statValue: { fontSize: "24px", fontWeight: "700", color: "#1a1a1a" },
  statLabel: {
    fontSize: "12px",
    color: "#888",
    fontFamily: "'Segoe UI', sans-serif",
    lineHeight: "1.4",
  },
  right: {},
  donationCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "36px 32px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
  },
  donationHeader: { marginBottom: "28px" },
  donationTitle: {
    display: "block",
    fontSize: "18px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "16px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  amountDisplay: { display: "flex", alignItems: "baseline", gap: "4px" },
  currency: { fontSize: "28px", color: "#236c42", fontWeight: "700" },
  amountValue: { fontSize: "56px", fontWeight: "700", color: "#236c42", lineHeight: "1" },
  sliderWrapper: { marginBottom: "24px" },
  sliderLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#aaa",
    marginTop: "8px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  presets: { display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" },
  presetBtn: {
    padding: "8px 18px",
    border: "1.5px solid #ddd",
    borderRadius: "20px",
    background: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    color: "#555",
    fontFamily: "'Segoe UI', sans-serif",
  },
  presetActive: { background: "#236c42", borderColor: "#236c42", color: "#fff" },
  impactMessage: {
    background: "#f0faf4",
    borderRadius: "10px",
    padding: "14px 16px",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "20px",
  },
  impactIcon: { color: "#236c42", fontSize: "14px", marginTop: "2px", flexShrink: 0 },
  impactText: {
    fontSize: "14px",
    color: "#2d6e4a",
    lineHeight: "1.5",
    fontFamily: "'Segoe UI', sans-serif",
  },
  paymentBadges: {
    display: "flex",
    gap: "10px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  paymentBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#444",
    background: "#fafafa",
    fontFamily: "'Segoe UI', sans-serif",
  },
  donateBtn: {
    width: "100%",
    padding: "16px",
    background: "#236c42",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "'Segoe UI', sans-serif",
    marginBottom: "12px",
    transition: "background 0.15s",
  },
  secureNote: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    textAlign: "center",
    fontSize: "12px",
    color: "#aaa",
    margin: 0,
    fontFamily: "'Segoe UI', sans-serif",
  },
};

const modal = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
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
    maxWidth: "460px",
    boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
    paddingBottom: "20px",
    borderBottom: "1px solid #f0f0f0",
  },
  headerSub: { fontSize: "12px", color: "#999", margin: "0 0 4px", fontFamily: "'Segoe UI', sans-serif" },
  headerAmount: { fontSize: "28px", fontWeight: "700", color: "#236c42", margin: 0, fontFamily: "'Georgia', serif" },
  closeBtn: {
    background: "#f5f5f5",
    border: "none",
    borderRadius: "50%",
    width: 36, height: 36,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#666",
    flexShrink: 0,
  },
  sectionTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "16px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  methodBtn: {
    width: "100%",
    padding: "16px",
    border: "1.5px solid #e0e0e0",
    borderRadius: "12px",
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
    transition: "border-color 0.15s, background 0.15s",
  },
  methodActive: { borderColor: "#236c42", background: "#f0faf4" },
  methodLeft: { display: "flex", alignItems: "center", gap: "14px" },
  methodName: { fontSize: "15px", fontWeight: "600", color: "#1a1a1a", margin: 0, textAlign: "left", fontFamily: "'Segoe UI', sans-serif" },
  methodDesc: { fontSize: "12px", color: "#888", margin: "2px 0 0", textAlign: "left", fontFamily: "'Segoe UI', sans-serif" },
  methodArrow: { fontSize: "20px", color: "#bbb" },
  secureRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    marginTop: "16px",
    fontSize: "12px",
    color: "#aaa",
    fontFamily: "'Segoe UI', sans-serif",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#236c42",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    padding: "0 0 16px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  paypalBanner: {
    background: "#f0f4ff",
    borderRadius: "10px",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  cmiHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
    padding: "14px 16px",
    background: "#f9f9f9",
    borderRadius: "10px",
  },
  cmiLogo: {
    background: "#236c42",
    color: "#fff",
    fontWeight: "800",
    fontSize: "15px",
    padding: "4px 10px",
    borderRadius: "6px",
    letterSpacing: "1px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    color: "#555",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontFamily: "'Segoe UI', sans-serif",
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
    color: "#111",
    transition: "border-color 0.15s",
  },
  inputErr: { borderColor: "#d32f2f" },
  inputSuffix: {
    position: "absolute",
    right: 12, top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
  },
  fieldError: { fontSize: "12px", color: "#d32f2f", margin: "4px 0 0", fontFamily: "'Segoe UI', sans-serif" },
  hint: { fontSize: "13px", color: "#888", lineHeight: "1.5", fontFamily: "'Segoe UI', sans-serif", marginTop: "8px" },
  payBtn: {
    width: "100%",
    padding: "15px",
    background: "#236c42",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  centered: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 0",
    textAlign: "center",
  },
  spinner: {
    width: 48, height: 48,
    border: "4px solid #e0f0e8",
    borderTop: "4px solid #236c42",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    marginBottom: "20px",
  },
  processingText: { fontSize: "18px", fontWeight: "600", color: "#1a1a1a", margin: "0 0 8px", fontFamily: "'Segoe UI', sans-serif" },
  processingSubText: { fontSize: "13px", color: "#999", margin: 0, fontFamily: "'Segoe UI', sans-serif" },
  successTitle: { fontSize: "22px", fontWeight: "700", color: "#1a1a1a", margin: "16px 0 10px", fontFamily: "'Georgia', serif" },
  successText: { fontSize: "15px", color: "#555", lineHeight: "1.6", margin: "0 0 24px", fontFamily: "'Segoe UI', sans-serif" },
  closeSuccessBtn: {
    padding: "12px 32px",
    background: "#236c42",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Segoe UI', sans-serif",
  },
};