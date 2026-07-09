import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <div className="max-w-8xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/images/MZIWDA_logo_clean-removebg-preview.png" alt="MZIWDA" className="h-10" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-gray-700 hover:text-green-700">Accueil</Link>
          <Link to="/associations" className="text-sm text-gray-700 hover:text-green-700">Associations</Link>
          <Link to="/events" className="text-sm text-gray-700 hover:text-green-700">Événements</Link>
          <Link to="/donation" className="text-sm text-gray-700 hover:text-green-700">Faire un don</Link>
          <Link
            to="/login"
            className="rounded-full border border-green-700 bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
          >
            Connexion
          </Link>
        </div>

        {/* Mobile burger */}
        <div className="md:hidden">
          <button
            aria-label="Open menu"
            className="p-2 rounded bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-sm text-gray-700 hover:text-green-700 pt-3">Accueil</Link>
          <Link to="/associations" onClick={() => setMenuOpen(false)} className="text-sm text-gray-700 hover:text-green-700">Associations</Link>
          <Link to="/events" onClick={() => setMenuOpen(false)} className="text-sm text-gray-700 hover:text-green-700">Événements</Link>
          <Link to="/donation" onClick={() => setMenuOpen(false)} className="text-sm text-gray-700 hover:text-green-700">Faire un don</Link>
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="rounded-full border border-green-700 bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
          >
            Connexion
          </Link>
        </div>
      )}
    </nav>
  );
}