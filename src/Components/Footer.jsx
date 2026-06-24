import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer({ onLanguageChange, currentLang }) {
  const languages = [
    { code: "fr", label: "🇫🇷 Français" },
    { code: "en", label: "🇬🇧 English" },
    { code: "ar", label: "🇸🇦 العربية" },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1 — Brand */}
        <div>
          <img
            src="/images/MZIWDA_logo_clean-removebg-preview.png"
            alt="MZIWDA Logo"
            className="h-14 w-18 mb-4"
          />
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            La Plateforme des Bénévolats
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Connecter bénévoles, associations et donateurs pour un impact social durable au Maroc et à l'international.
          </p>
          <div className="flex space-x-4 text-green-700">
            <a href="#" className="hover:text-green-600">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-green-600">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-green-600">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-green-600">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Column 2 — Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-green-600">Accueil</Link>
            </li>
            <li>
              <Link to="/associations" className="hover:text-green-600">Associations</Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-green-600">Événements</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-green-600">Faire un don</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 — Espace utilisateur */}
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            Espace Utilisateur
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/login" className="hover:text-green-600">Connexion</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-green-600">Inscription bénévole</Link>
            </li>
            <li>
              <Link to="/volunteer/profile" className="hover:text-green-600">Tableau de bord</Link>
            </li>
            <li>
              <Link to="/admin/overview" className="hover:text-green-600">Espace Admin</Link>
            </li>
          </ul>
        </div>

        {/* Column 4 — Contact & Infos */}
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 mb-4">
            <li> Maroc</li>
            <li> contact@mziwda.ma</li>
            <li> www.mziwda.ma</li>
          </ul>

          
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center items-center text-sm text-gray-500">
          <span>© 2026 MZIWDA. Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  );
}
