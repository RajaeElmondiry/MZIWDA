import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setSuccess(
      "Votre compte a été créé avec succès ! Redirection vers la page de connexion..."
    );

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center py-12 px-4">

      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-8">

        <div className="flex justify-center mb-6">
          <img
            src="/images/MZIWDA_logo_clean-removebg-preview.png"
            alt="Logo"
            className="h-20"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-green-700">
          Inscription Bénévole
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Rejoignez la communauté MZIWDA et participez à des actions solidaires.
        </p>

        {error && (
          <div className="mb-5 bg-red-100 text-red-700 border border-red-300 rounded-lg p-3">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 bg-green-100 text-green-700 border border-green-300 rounded-lg p-3">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="font-medium mb-2 block">
              Prénom
            </label>

            <div className="relative">
              <FaUser className="absolute left-3 top-4 text-gray-400" />

              <input
                type="text"
                name="firstName"
                required
                value={form.firstName}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-10 pr-3 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Prénom"
              />
            </div>
          </div>

          <div>
            <label className="font-medium mb-2 block">
              Nom
            </label>

            <div className="relative">
              <FaUser className="absolute left-3 top-4 text-gray-400" />

              <input
                type="text"
                name="lastName"
                required
                value={form.lastName}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-10 pr-3 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Nom"
              />
            </div>
          </div>

          <div>
            <label className="font-medium mb-2 block">
              Email
            </label>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-4 text-gray-400" />

              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-10 pr-3 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div>
            <label className="font-medium mb-2 block">
              Téléphone
            </label>

            <div className="relative">
              <FaPhone className="absolute left-3 top-4 text-gray-400" />

              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-10 pr-3 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="+212..."
              />
            </div>
          </div>

          <div>
            <label className="font-medium mb-2 block">
              Ville
            </label>

            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-400" />

              <input
                type="text"
                name="city"
                required
                value={form.city}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-10 pr-3 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Votre ville"
              />
            </div>
          </div>

          <div>
            <label className="font-medium mb-2 block">
              Mot de passe
            </label>

            <div className="relative">
              <FaLock className="absolute left-3 top-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-10 pr-10 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="********"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="font-medium mb-2 block">
              Confirmer le mot de passe
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="********"
            />
          </div>

          <div className="md:col-span-2 mt-2">

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold text-lg"
            >
              Créer mon compte
            </button>

          </div>

        </form>

        <div className="mt-8 text-center">

          <span className="text-gray-600">
            Vous avez déjà un compte ?
          </span>

          <Link
            to="/login"
            className="ml-2 text-green-700 font-semibold hover:underline"
          >
            Se connecter
          </Link>

        </div>

      </div>

    </div>
  );
}