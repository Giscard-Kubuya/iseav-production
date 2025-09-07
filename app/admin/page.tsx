"use client";

import Image from "next/image";
import Link from "next/link";

export default function AdminDashboardPage() {
  const projectStats = [
    { label: "ÉTUDIANTS INSCRITS", value: "342", icon: "👨‍🎓", color: "bg-blue-600", textColor: "text-white" },
    { label: "PROFESSEURS", value: "28", icon: "👨‍🏫", color: "bg-emerald-600", textColor: "text-white" },
    { label: "PROGRAMMES", value: "12", icon: "📚", color: "bg-blue-500", textColor: "text-white" },
    { label: "LABORATOIRES", value: "4", icon: "🧪", color: "bg-emerald-500", textColor: "text-white" },
  ];

  const quickActions = [
    { title: "Nouvelle actualité", icon: "📝", color: "bg-blue-600", description: "Publier une actualité institut" },
    { title: "Gérer étudiants", icon: "👨‍🎓", color: "bg-emerald-600", description: "Inscriptions et dossiers" },
    { title: "Programmes d'études", icon: "📚", color: "bg-blue-500", description: "Cursus et modules" },
    { title: "Recherche & Innovation", icon: "🔬", color: "bg-emerald-500", description: "Projets de recherche" },
  ];

  const recentActivities = [
    { 
      icon: "📰", 
      title: "Nouvelle actualité publiée", 
      time: "il y a 1 heure",
      badge: "+"
    },
    { 
      icon: "👤", 
      title: "Profil équipe mis à jour", 
      time: "il y a 1 jour",
      badge: "⟳"
    },
    { 
      icon: "📸", 
      title: "Photos ajoutées à la galerie", 
      time: "il y a 2 jours",
      badge: "+"
    },
    { 
      icon: "🎯", 
      title: "Photos ajoutées à la galerie", 
      time: "il y a 2 jours",
      badge: "+"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Tableau de Bord</h1>
            <p className="text-gray-600">Interface d'administration - Projet 8e CEPAC Beni</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Système actif</p>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-gray-700">Tous les modules</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {projectStats.map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-lg p-6 shadow-sm text-white`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <p className="text-sm opacity-90">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Actions Rapides */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">⚡</span>
            Actions Rapides
          </h3>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <div key={index} className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                <div className={`${action.color} p-3 rounded-lg mr-4`}>
                  <span className="text-white text-lg">{action.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{action.title}</p>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activités Récentes */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">⏱️</span>
            Activités Récentes
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg">
                <div className="bg-blue-500 p-2 rounded-lg mr-4 flex-shrink-0">
                  <span className="text-white text-sm">{activity.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 truncate">{activity.title}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-500 font-bold text-sm">{activity.badge}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
