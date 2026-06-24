import { useState } from "react";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.37c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.55-1.31 3.08-2.53 4.02zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const EyeIcon = ({ show }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {show ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </>
    )}
  </svg>
);

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "register" | "forgot"
  const [step, setStep] = useState("email"); // "email" | "password"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Veuillez remplir ce champ.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Adresse e-mail invalide.");
      return;
    }
    if (mode === "login" && step === "email") {
      setStep("password");
      return;
    }
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const resetForm = (newMode) => {
    setMode(newMode);
    setStep("email");
    setError("");
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoArea}>
          <div style={styles.logo}>
            <img src="/images/MZIWDA_logo_clean-removebg-preview.png" alt="Mziwda" style={{height: '45px'}} />
          </div>
        </div>

        {/* Title */}
        <h1 style={styles.title}>
          {mode === "login" && "Bienvenue"}
          {mode === "register" && "Créer un compte"}
          {mode === "forgot" && "Mot de passe oublié ?"}
        </h1>
        <p style={styles.subtitle}>
          {mode === "login" && step === "email" && "Connectez-vous ou créez un compte pour continuer."}
          {mode === "login" && step === "password" && `Entrez votre mot de passe pour ${email}`}
          {mode === "register" && "Remplissez les informations ci-dessous."}
          {mode === "forgot" && "Entrez votre e-mail pour réinitialiser votre mot de passe."}
        </p>

        {/* Social Buttons — only on first step */}
        {(mode !== "login" || step === "email") && mode !== "forgot" && (
          <>
            <button style={styles.socialBtn} onMouseOver={e => e.currentTarget.style.background = "#f5f5f5"} onMouseOut={e => e.currentTarget.style.background = "#fff"}>
              <GoogleIcon />
              <span>Poursuivre avec Google</span>
            </button>
            <button style={{ ...styles.socialBtn, color: "#000" }} onMouseOver={e => e.currentTarget.style.background = "#f5f5f5"} onMouseOut={e => e.currentTarget.style.background = "#fff"}>
              <AppleIcon />
              <span>Poursuivre avec Apple</span>
            </button>
            <div style={styles.divider}>
              <div style={styles.dividerLine} />
              <span style={styles.dividerText}>ou</span>
              <div style={styles.dividerLine} />
            </div>
          </>
        )}

        {/* Form */}
        <form onSubmit={handleContinue} noValidate>
          {mode === "register" && (
            <div style={styles.fieldGroup}>
              <input
                style={{ ...styles.input, ...(error && name === "" ? styles.inputError : {}) }}
                type="text"
                placeholder="Nom complet"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          )}

          <div style={styles.fieldGroup}>
            <input
              style={{ ...styles.input, ...(error && !email ? styles.inputError : {}) }}
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
              autoFocus
            />
          </div>

          {(mode === "register" || (mode === "login" && step === "password")) && (
            <div style={{ ...styles.fieldGroup, position: "relative" }}>
              <input
                style={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder={mode === "register" ? "Créer un mot de passe" : "Mot de passe"}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                <EyeIcon show={showPassword} />
              </button>
            </div>
          )}

          {error && <p style={styles.errorText}>{error}</p>}

          {mode === "login" && step === "password" && (
            <button type="button" style={styles.forgotLink} onClick={() => resetForm("forgot")}>
              Mot de passe oublié ?
            </button>
          )}

          <button
            type="submit"
            style={{ ...styles.primaryBtn, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
            onMouseOver={e => { if (!loading) e.currentTarget.style.background = "#1a5c38"; }}
            onMouseOut={e => { e.currentTarget.style.background = "#236c42"; }}
          >
            {loading ? "Chargement..." : mode === "forgot" ? "Envoyer le lien" : mode === "register" ? "Créer un compte" : step === "email" ? "Continuer" : "Se connecter"}
          </button>
        </form>

        {/* Footer links */}
        <div style={styles.footer}>
          {mode === "login" ? (
            <p style={styles.footerText}>
              Pas encore de compte ?{" "}
              <button style={styles.link} onClick={() => resetForm("register")}>S'inscrire</button>
            </p>
          ) : (
            <p style={styles.footerText}>
              Déjà un compte ?{" "}
              <button style={styles.link} onClick={() => resetForm("login")}>Se connecter</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f0ee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', -apple-system, sans-serif",
    padding: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "40px 48px 32px",
    width: "100%",
    maxWidth: "440px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  },
  logoArea: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "24px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoText: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#236c42",
    letterSpacing: "-0.5px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    margin: "0 0 8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
    margin: "0 0 24px",
    lineHeight: "1.5",
  },
  socialBtn: {
    width: "100%",
    padding: "12px 16px",
    border: "1.5px solid #ddd",
    borderRadius: "8px",
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#222",
    marginBottom: "10px",
    transition: "background 0.15s",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "8px 0 16px",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#e0e0e0",
  },
  dividerText: {
    fontSize: "13px",
    color: "#999",
    fontWeight: "500",
  },
  fieldGroup: {
    marginBottom: "12px",
  },
  input: {
    width: "100%",
    padding: "13px 14px",
    border: "1.5px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
    color: "#111",
    background: "#fff",
  },
  inputError: {
    borderColor: "#d32f2f",
  },
  errorText: {
    color: "#d32f2f",
    fontSize: "13px",
    margin: "-4px 0 10px",
  },
  eyeBtn: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#888",
    padding: "4px",
    display: "flex",
    alignItems: "center",
  },
  forgotLink: {
    background: "none",
    border: "none",
    color: "#236c42",
    fontSize: "13px",
    cursor: "pointer",
    padding: "0 0 12px",
    display: "block",
    fontWeight: "500",
  },
  primaryBtn: {
    width: "100%",
    padding: "14px",
    background: "#236c42",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.15s",
    marginTop: "4px",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
  },
  footerText: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
  },
  link: {
    background: "none",
    border: "none",
    color: "#236c42",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    padding: 0,
    textDecoration: "underline",
  },
};
