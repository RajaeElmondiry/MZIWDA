import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaHandsHelping,
  FaCalendarAlt,
  FaHeart,
  FaClipboardList,
  FaSignOutAlt,
  FaBell,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function VolunteerProfile() {
  return (
    <div className="min-h-screen bg-green-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white py-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

          <div className="flex items-center gap-5">

            <div className="bg-white text-green-700 rounded-full p-5 shadow-lg">
              <FaUserCircle size={60} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Bonjour, Bénévole 👋
              </h1>

              <p className="opacity-90 mt-1">
                Merci de faire partie de la communauté MZIWDA.
              </p>
            </div>

          </div>

          <Link
            to="/"
            className="mt-6 md:mt-0 bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-100 transition flex items-center gap-2"
          >
            <FaSignOutAlt />
            Déconnexion
          </Link>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <FaHandsHelping className="text-green-600 text-4xl mx-auto mb-4" />
            <h2 className="font-bold text-xl">12</h2>
            <p className="text-gray-600">
              Missions réalisées
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <FaCalendarAlt className="text-green-600 text-4xl mx-auto mb-4" />
            <h2 className="font-bold text-xl">3</h2>
            <p className="text-gray-600">
              Événements à venir
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <FaHeart className="text-red-500 text-4xl mx-auto mb-4" />
            <h2 className="font-bold text-xl">
              120 h
            </h2>
            <p className="text-gray-600">
              Heures de bénévolat
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <FaBell className="text-yellow-500 text-4xl mx-auto mb-4" />
            <h2 className="font-bold text-xl">
              4
            </h2>
            <p className="text-gray-600">
              Notifications
            </p>
          </div>

        </div>

        {/* Main */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left */}

          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold text-green-700 mb-5">
                Mes prochaines missions
              </h2>

              <div className="space-y-4">

                <div className="border rounded-xl p-4 hover:bg-green-50 transition">

                  <h3 className="font-semibold text-lg">
                    Distribution alimentaire
                  </h3>

                  <p className="text-gray-600 flex items-center gap-2 mt-2">
                    <FaMapMarkerAlt />
                    Casablanca
                  </p>

                  <p className="text-gray-500 mt-1">
                    20 Juin 2026
                  </p>

                </div>

                <div className="border rounded-xl p-4 hover:bg-green-50 transition">

                  <h3 className="font-semibold text-lg">
                    Nettoyage de plage
                  </h3>

                  <p className="text-gray-600 flex items-center gap-2 mt-2">
                    <FaMapMarkerAlt />
                    Agadir
                  </p>

                  <p className="text-gray-500 mt-1">
                    28 Juin 2026
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold text-green-700 mb-5">
                Activité récente
              </h2>

              <ul className="space-y-4">

                <li className="border-b pb-3">
                  ✅ Participation à une collecte de vêtements.
                </li>

                <li className="border-b pb-3">
                  ✅ Inscription à l'événement "Nettoyons notre ville".
                </li>

                <li>
                  ✅ Don effectué à une association.
                </li>

              </ul>

            </div>

          </div>

          {/* Right */}

          <div className="space-y-6">

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold text-green-700 mb-5">
                Profil
              </h2>

              <p className="mb-3">
                <strong>Nom :</strong> Volunteer
              </p>

              <p className="mb-3">
                <strong>Email :</strong> volunteer@mziwda.ma
              </p>

              <p className="mb-3">
                <strong>Ville :</strong> Casablanca
              </p>

              <button className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition">
                Modifier mon profil
              </button>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold text-green-700 mb-5">
                Accès rapide
              </h2>

              <div className="space-y-3">

                <button className="w-full bg-green-100 hover:bg-green-200 rounded-xl py-3">
                  Rechercher une mission
                </button>

                <button className="w-full bg-green-100 hover:bg-green-200 rounded-xl py-3">
                  Mes candidatures
                </button>

                <button className="w-full bg-green-100 hover:bg-green-200 rounded-xl py-3">
                  Mes certificats
                </button>

                <button className="w-full bg-green-100 hover:bg-green-200 rounded-xl py-3 flex justify-center items-center gap-2">
                  <FaClipboardList />
                  Historique
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}