import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  // Hidden credentials
  const ADMIN = {
    email: "admin@mziwda.ma",
    password: "admin123",
  };

  const VOLUNTEER = {
    email: "volunteer@mziwda.ma",
    password: "123456",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    // Admin Login
    if (
      email === ADMIN.email &&
      password === ADMIN.password
    ) {
      navigate("/admin/overview");
      return;
    }

    // Volunteer Login
    if (
      email === VOLUNTEER.email &&
      password === VOLUNTEER.password
    ) {
      navigate("/volunteer/profile");
      return;
    }

    setError("Email ou mot de passe incorrect.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-10">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

        <div className="flex justify-center mb-6">
          <img
            src="/images/MZIWDA_logo_clean-removebg-preview.png"
            alt="MZIWDA Logo"
            className="h-20"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-green-700">
          Connexion
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Connectez-vous à votre espace.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-600 rounded-lg p-3 mb-5 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Adresse Email
            </label>

            <input
              type="email"
              required
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>

            <label className="block mb-2 font-medium">
              Mot de passe
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-green-700 hover:underline"
            >
              Mot de passe oublié ?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold"
          >
            Se connecter
          </button>

        </form>
                <div className="mt-8 text-center">

          <p className="text-gray-600">
            Vous n'avez pas encore de compte ?
          </p>

          <Link
            to="/register"
            className="inline-block mt-3 text-green-700 font-semibold hover:underline"
          >
            Créer un compte bénévole
          </Link>

        </div>

        <div className="mt-8 border-t pt-6">

          <div className="bg-green-50 rounded-xl p-4">

            <h3 className="font-semibold text-green-700 mb-2">
              Démonstration
            </h3>

            <p className="text-sm text-gray-600">
              Cette application utilise une authentification simulée côté
              frontend. Les identifiants sont vérifiés en interne mais ne sont
              pas affichés dans l'interface.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}