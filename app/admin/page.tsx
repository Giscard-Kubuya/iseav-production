"use client";

import Image from "next/image";
import Link from "next/link";

export default function AdminDashboardPage() {
  const academicStats = [
    { label: "Étudiants Inscrits", value: "342", icon: "👨‍🎓", color: "from-blue-500 to-blue-600", change: "+15" },
    { label: "Corps Professoral", value: "28", icon: "👨‍🏫", color: "from-green-500 to-green-600", change: "+2" },
    { label: "Programmes Actifs", value: "5", icon: "📚", color: "from-amber-500 to-amber-600", change: "0" },
    { label: "Diplômés 2024", value: "95", icon: "🎓", color: "from-emerald-500 to-emerald-600", change: "+95" },
  ];

  const researchStats = [
    { label: "Projets de Recherche", value: "12", icon: "🔬", color: "from-purple-500 to-purple-600" },
    { label: "Publications", value: "24", icon: "📄", color: "from-indigo-500 to-indigo-600" },
    { label: "Partenariats", value: "8", icon: "🤝", color: "from-pink-500 to-pink-600" },
  ];

  const quickActions = [
    { title: "Nouvelle Inscription", icon: "👨‍🎓", href: "/admin/etudiants", color: "bg-blue-600" },
    { title: "Ajouter Professeur", icon: "👨‍🏫", href: "/admin/professeurs", color: "bg-green-600" },
    { title: "Gérer Programmes", icon: "📚", href: "/admin/programmes", color: "bg-amber-600" },
    { title: "Actualités", icon: "📰", href: "/admin/actualites", color: "bg-purple-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-green-600 rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Image 
              src="/images/logos/logo_iseav.png" 
              alt="ISEAV-WALUNGU" 
              width={80} 
              height={80} 
              className="rounded-full border-4 border-white/20"
            />
            <div>
              <h1 className="text-4xl font-bold mb-2">Administration ISEAV-WALUNGU</h1>
              <p className="text-xl opacity-90">Institut Supérieur d'Études Agronomiques et Vétérinaires</p>
              <p className="text-lg opacity-75 mt-1">Sud-Kivu, République Démocratique du Congo</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">Année Académique</p>
            <p className="text-3xl font-bold text-yellow-300">2024-2025</p>
          </div>
        </div>
      </div>

      {/* Academic Statistics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistiques Académiques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {academicStats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-r ${stat.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{stat.icon}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  stat.change.startsWith('+') ? 'bg-green-500/30 text-green-100' : 'bg-gray-500/30 text-gray-100'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research & Innovation */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recherche & Innovation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {researchStats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-r ${stat.color} rounded-2xl p-6 text-white shadow-lg`}>
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{stat.icon}</span>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm opacity-90">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Actions Rapides</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`${action.color} hover:opacity-90 text-white rounded-2xl p-6 text-center transition-opacity shadow-lg hover:shadow-xl`}
            >
              <span className="text-4xl block mb-3">{action.icon}</span>
              <span className="text-sm font-semibold">{action.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-3xl shadow-lg border p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">📅</span>
            Activités Récentes
          </h3>
          <div className="space-y-4">
            {[
              { 
                icon: "👨‍🎓", 
                title: "15 nouveaux étudiants inscrits", 
                subtitle: "Programme Agronomie Générale",
                time: "Il y a 2 heures",
                color: "text-blue-600"
              },
              { 
                icon: "👨‍🏫", 
                title: "Prof. Dr. Mukanda rejoint l'équipe", 
                subtitle: "Spécialiste en Phytopathologie",
                time: "Il y a 1 jour",
                color: "text-green-600"
              },
              { 
                icon: "🔬", 
                title: "Nouveau projet de recherche approuvé", 
                subtitle: "Amélioration des variétés de manioc",
                time: "Il y a 2 jours",
                color: "text-purple-600"
              },
              { 
                icon: "🎓", 
                title: "Cérémonie de remise des diplômes", 
                subtitle: "95 diplômés de la promotion 2024",
                time: "Il y a 1 semaine",
                color: "text-emerald-600"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <span className={`${activity.color} text-2xl mr-4 mt-1`}>{activity.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">{activity.title}</p>
                  <p className="text-sm text-gray-600 mb-2">{activity.subtitle}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Management */}
        <div className="bg-white rounded-3xl shadow-lg border p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🏫</span>
            Gestion Campus
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <span className="text-2xl block mb-2">🏠</span>
                <p className="font-bold text-xl text-blue-600">150</p>
                <p className="text-sm text-gray-600">Lits Résidence</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <span className="text-2xl block mb-2">🚜</span>
                <p className="font-bold text-xl text-green-600">15ha</p>
                <p className="text-sm text-gray-600">Ferme Expérimentale</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                <span className="flex items-center">
                  <span className="text-amber-600 mr-3">🧪</span>
                  <span className="font-medium">Laboratoires</span>
                </span>
                <span className="text-amber-600 font-bold">4 actifs</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <span className="flex items-center">
                  <span className="text-emerald-600 mr-3">📚</span>
                  <span className="font-medium">Bibliothèque</span>
                </span>
                <span className="text-emerald-600 font-bold">5,000+ livres</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="flex items-center">
                  <span className="text-purple-600 mr-3">🎓</span>
                  <span className="font-medium">Amphithéâtres</span>
                </span>
                <span className="text-purple-600 font-bold">3 salles</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Calendar */}
      <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">📅</span>
          Calendrier Académique
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { event: "Examens Session 1", date: "15-30 Décembre", status: "À venir", color: "bg-blue-500" },
            { event: "Vacances Académiques", date: "1-15 Janvier", status: "À venir", color: "bg-green-500" },
            { event: "Session Pratique Ferme", date: "20 Janvier", status: "À venir", color: "bg-amber-500" }
          ].map((event, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className={`${event.color} w-4 h-4 rounded-full mb-4`}></div>
              <h4 className="font-bold text-gray-900 mb-2">{event.event}</h4>
              <p className="text-gray-600 text-sm mb-2">{event.date}</p>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                {event.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
