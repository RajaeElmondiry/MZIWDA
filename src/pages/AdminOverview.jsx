import { Link } from "react-router-dom";
import {
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaDonate,
  FaChartBar,
  FaUserShield,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaBell,
} from "react-icons/fa";

export default function AdminOverview() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-green-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">

          <div className="flex items-center gap-4">
            <div className="bg-white text-green-700 p-4 rounded-full">
              <FaUserShield size={40} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Tableau de Bord Administrateur
              </h1>
              <p className="opacity-90">
                Bienvenue sur l'espace d'administration MZIWDA
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="bg-white text-green-700 px-5 py-3 rounded-xl font-semibold hover:bg-green-100 transition flex items-center gap-2"
          >
            <FaSignOutAlt />
            Déconnexion
          </Link>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Statistics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <FaUsers className="mx-auto text-green-600 text-5xl mb-4" />
            <h2 className="text-3xl font-bold">254</h2>
            <p className="text-gray-600 mt-2">
              Bénévoles
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <FaBuilding className="mx-auto text-green-600 text-5xl mb-4" />
            <h2 className="text-3xl font-bold">42</h2>
            <p className="text-gray-600 mt-2">
              Associations
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <FaCalendarAlt className="mx-auto text-green-600 text-5xl mb-4" />
            <h2 className="text-3xl font-bold">18</h2>
            <p className="text-gray-600 mt-2">
              Événements
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <FaDonate className="mx-auto text-green-600 text-5xl mb-4" />
            <h2 className="text-3xl font-bold">
              85 000 DH
            </h2>
            <p className="text-gray-600 mt-2">
              Dons collectés
            </p>
          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Section */}

          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold text-green-700 mb-5">
                Gestion rapide
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <button className="bg-green-100 hover:bg-green-200 rounded-xl p-5 text-left transition">
                  <FaUsers className="text-3xl text-green-700 mb-3" />
                  <h3 className="font-bold">
                    Gérer les bénévoles
                  </h3>
                  <p className="text-gray-600">
                    Ajouter, modifier ou supprimer des bénévoles.
                  </p>
                </button>

                <button className="bg-green-100 hover:bg-green-200 rounded-xl p-5 text-left transition">
                  <FaBuilding className="text-3xl text-green-700 mb-3" />
                  <h3 className="font-bold">
                    Gérer les associations
                  </h3>
                  <p className="text-gray-600">
                    Validation des associations partenaires.
                  </p>
                </button>

                <button className="bg-green-100 hover:bg-green-200 rounded-xl p-5 text-left transition">
                  <FaCalendarAlt className="text-3xl text-green-700 mb-3" />
                  <h3 className="font-bold">
                    Gérer les événements
                  </h3>
                  <p className="text-gray-600">
                    Ajouter ou modifier les événements.
                  </p>
                </button>

                <button className="bg-green-100 hover:bg-green-200 rounded-xl p-5 text-left transition">
                  <FaDonate className="text-3xl text-green-700 mb-3" />
                  <h3 className="font-bold">
                    Gérer les dons
                  </h3>
                  <p className="text-gray-600">
                    Consulter les statistiques financières.
                  </p>
                </button>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold text-green-700 mb-5">
                Activité récente
              </h2>

              <ul className="space-y-4">

                <li className="border-b pb-3">
                  ✅ Nouvelle association inscrite.
                </li>

                <li className="border-b pb-3">
                  ✅ Nouvel événement créé.
                </li>

                <li className="border-b pb-3">
                  ✅ 15 nouveaux bénévoles inscrits.
                </li>

                <li>
                  ✅ Don reçu de 2 500 DH.
                </li>

              </ul>

            </div>

          </div>

          {/* Right Section */}

          <div className="space-y-6">

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold text-green-700 mb-5">
                Raccourcis
              </h2>

              <div className="space-y-3">

                <button className="w-full bg-green-100 hover:bg-green-200 rounded-xl py-3 flex items-center justify-center gap-2">
                  <FaClipboardList />
                  Rapports
                </button>

                <button className="w-full bg-green-100 hover:bg-green-200 rounded-xl py-3 flex items-center justify-center gap-2">
                  <FaChartBar />
                  Statistiques
                </button>

                <button className="w-full bg-green-100 hover:bg-green-200 rounded-xl py-3 flex items-center justify-center gap-2">
                  <FaBell />
                  Notifications
                </button>

                <button className="w-full bg-green-100 hover:bg-green-200 rounded-xl py-3 flex items-center justify-center gap-2">
                  <FaCog />
                  Paramètres
                </button>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold text-green-700 mb-5">
                Administrateur
              </h2>

              <p className="mb-3">
                <strong>Nom :</strong> Admin
              </p>

              <p className="mb-3">
                <strong>Email :</strong> admin@mziwda.ma
              </p>

              <p className="mb-3">
                <strong>Rôle :</strong> Super Administrateur
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}