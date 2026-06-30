import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("FR");

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/MZIWDA_logo_clean-removebg-preview.png"
            alt="MZIWDA"
            className="h-11"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7">

          <Link
            to="/"
            className="text-gray-700 hover:text-green-700 font-medium"
          >
            Accueil
          </Link>

          <Link
            to="/associations"
            className="text-gray-700 hover:text-green-700 font-medium"
          >
            Associations
          </Link>

          <Link
            to="/events"
            className="text-gray-700 hover:text-green-700 font-medium"
          >
            Événements
          </Link>

          <Link
            to="/donation"
            className="text-gray-700 hover:text-green-700 font-medium"
          >
            Faire un don
          </Link>

          {/* Language */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="FR">🇫🇷 FR</option>
            <option value="EN">🇬🇧 EN</option>
            <option value="AR">🇲🇦 AR</option>
          </select>

          {/* Login Button */}
          <Link
            to="/login"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            Connexion
          </Link>

        </div>

        {/* Mobile Button */}
        <div className="md:hidden">

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg bg-gray-100"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="md:hidden bg-white border-t px-6 py-5 flex flex-col gap-4 shadow">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Accueil
          </Link>

          <Link
            to="/associations"
            onClick={() => setMenuOpen(false)}
          >
            Associations
          </Link>

          <Link
            to="/events"
            onClick={() => setMenuOpen(false)}
          >
            Événements
          </Link>

          <Link
            to="/donation"
            onClick={() => setMenuOpen(false)}
          >
            Faire un don
          </Link>

          {/* Language */}

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="FR">🇫🇷 Français</option>
            <option value="EN">🇬🇧 English</option>
            <option value="AR">🇲🇦 العربية</option>
          </select>

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="bg-green-600 text-white text-center py-3 rounded-lg font-semibold"
          >
            Connexion
          </Link>

        </div>

      )}

    </nav>
  );
}