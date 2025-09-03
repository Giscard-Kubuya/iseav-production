"use client";

import PageSEO from "@/components/layout/PageSEO";
import Image from "next/image";

export default function CampusPage() {
  const facilities = [
    {
      id: 1,
      name: "Amphithéâtre Principal",
      capacity: "200 places",
      description: "Salle de conférence moderne équipée de matériel audiovisuel",
      icon: "🎓",
      image: "/images/campus/amphitheatre.jpg"
    },
    {
      id: 2,
      name: "Laboratoire d'Agronomie",
      capacity: "50 étudiants",
      description: "Équipements modernes pour l'analyse des sols et des plantes",
      icon: "🧪",
      image: "/images/campus/lab-agro.jpg"
    },
    {
      id: 3,
      name: "Clinique Vétérinaire",
      capacity: "Centre de soins",
      description: "Clinique complète pour la formation pratique et les soins",
      icon: "🏥",
      image: "/images/campus/clinic.jpg"
    },
    {
      id: 4,
      name: "Ferme Expérimentale",
      capacity: "15 hectares",
      description: "Terrain d'application pratique et de recherche",
      icon: "🚜",
      image: "/images/campus/farm.jpg"
    },
    {
      id: 5,
      name: "Bibliothèque",
      capacity: "100 places",
      description: "Collection spécialisée en sciences agricoles et vétérinaires",
      icon: "📚",
      image: "/images/campus/library.jpg"
    },
    {
      id: 6,
      name: "Résidence Étudiante",
      capacity: "150 lits",
      description: "Hébergement moderne pour étudiants",
      icon: "🏠",
      image: "/images/campus/residence.jpg"
    }
  ];

  const campusLife = [
    {
      title: "Clubs Étudiants",
      description: "Association étudiante, club de débat, groupe culturel",
      icon: "👥"
    },
    {
      title: "Sport et Loisirs",
      description: "Terrain de football, basketball, activités récréatives",
      icon: "⚽"
    },
    {
      title: "Restauration",
      description: "Cafétéria avec cuisine locale et internationale",
      icon: "🍽️"
    },
    {
      title: "Transport",
      description: "Navettes régulières vers Bukavu et villages environnants",
      icon: "🚌"
    }
  ];

  return (
    <PageSEO
      title="Notre Campus - ISEAV-WALUNGU"
      description="Découvrez notre campus moderne à Walungu avec ses installations de pointe pour l'enseignement agricole et vétérinaire."
      keywords="campus ISEAV, Walungu, installations, laboratoires, ferme expérimentale, résidence"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white overflow-hidden agricultural-pattern">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Notre <span className="text-yellow-300">Campus</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Un environnement d'apprentissage moderne au cœur du Sud-Kivu
            </p>
            <p className="text-lg mb-12 max-w-3xl mx-auto opacity-90">
              Installations Modernes • Cadre Naturel • Excellence Pédagogique
            </p>
          </div>
        </section>

        {/* Campus Overview */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Walungu, Territoire d'Excellence
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Notre campus s'étend sur plus de 50 hectares dans le territoire de Walungu, 
                  offrant un cadre idéal pour l'enseignement et la recherche en sciences agricoles et vétérinaires.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Situé à altitude moyenne de 1800m, notre campus bénéficie d'un climat tempéré 
                  tropical favorable à diverses cultures expérimentales et à l'élevage.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Superficie", value: "50+ hectares" },
                    { label: "Altitude", value: "1800m" },
                    { label: "Étudiants", value: "400+" },
                    { label: "Personnel", value: "60+" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                      <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                      <p className="text-gray-600 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    {["🏫", "🌾", "🐄", "🌲", "🧪", "📚"].map((emoji, index) => (
                      <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg">
                        <div className="text-4xl mb-2">{emoji}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nos Installations
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des équipements modernes pour une formation d'excellence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility) => (
                <div key={facility.id} className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-5xl">{facility.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{facility.name}</h3>
                        <p className="text-green-600 font-semibold">{facility.capacity}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Campus Life */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Vie Étudiante
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une expérience étudiante riche et épanouissante
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {campusLife.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Access */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Localisation & Accès
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Comment nous rejoindre</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                      🛣️
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Par route</h4>
                      <p className="text-gray-600">45 minutes depuis Bukavu par la route nationale</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
                      🚌
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Transport public</h4>
                      <p className="text-gray-600">Bus réguliers depuis Bukavu et villages</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xl">
                      ✈️
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Aéroport</h4>
                      <p className="text-gray-600">1h15 depuis l'aéroport de Kavumu</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Coordonnées</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">📍 Adresse</h4>
                    <p className="text-gray-700">
                      Territoire de Walungu<br />
                      Province du Sud-Kivu<br />
                      République Démocratique du Congo
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">📞 Contact</h4>
                    <p className="text-gray-700">+243 XXX XXX XXX</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">✉️ Email</h4>
                    <p className="text-gray-700">campus@iseav-walungu.ac.cd</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-green-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Visitez Notre <span className="text-yellow-400">Campus</span>
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Découvrez nos installations et rencontrez notre communauté académique
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-10 py-4 rounded-full text-lg font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Planifier une Visite
              </a>
              <a
                href="/inscription"
                className="border-2 border-yellow-400 text-yellow-300 px-10 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                S'Inscrire
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageSEO>
  );
}