"use client";

import PageSEO from "@/components/layout/PageSEO";
import Image from "next/image";

export default function RecherchePage() {
  const researchProjects = [
    {
      id: 1,
      title: "Amélioration des Variétés de Manioc",
      category: "Agronomie",
      status: "En cours",
      description: "Développement de variétés de manioc résistantes aux maladies et adaptées au climat du Sud-Kivu.",
      leader: "Prof. Dr. Mukanda Jean",
      duration: "2023-2025",
      funding: "Ministère de l'Agriculture - RDC",
      icon: "🌱",
      color: "from-green-600 to-green-800"
    },
    {
      id: 2,
      title: "Santé Animale en Zone Tropicale",
      category: "Vétérinaire",
      status: "En cours",
      description: "Étude des pathologies animales spécifiques à la région tropicale et développement de traitements adaptés.",
      leader: "Dr. Nsimba Marie",
      duration: "2024-2026",
      funding: "OMS - Organisation Mondiale de la Santé",
      icon: "🐄",
      color: "from-blue-600 to-blue-800"
    },
    {
      id: 3,
      title: "Agroforesterie Durable",
      category: "Environnement",
      status: "Terminé",
      description: "Développement de systèmes agroforestiers durables pour la région des Grands Lacs.",
      leader: "Prof. Kabamba Paul",
      duration: "2022-2024",
      funding: "Union Européenne",
      icon: "🌲",
      color: "from-emerald-600 to-emerald-800"
    }
  ];

  const publications = [
    {
      title: "Impact des Changements Climatiques sur l'Agriculture au Sud-Kivu",
      authors: "Mukanda J., Nsimba M., Kabamba P.",
      journal: "Revue Africaine d'Agriculture",
      year: "2024",
      type: "Article"
    },
    {
      title: "Gestion Intégrée des Ravageurs en Culture de Café",
      authors: "Kabongo L., Mwanza K.",
      journal: "Journal of Tropical Agriculture",
      year: "2023",
      type: "Recherche"
    }
  ];

  return (
    <PageSEO
      title="Recherche et Innovation - ISEAV-WALUNGU"
      description="Découvrez nos projets de recherche en agronomie, vétérinaire et environnement. Innovation pour l'agriculture durable au Sud-Kivu."
      keywords="recherche agricole, innovation, ISEAV, Sud-Kivu, agronomie, vétérinaire"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white overflow-hidden agricultural-pattern">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Recherche & <span className="text-yellow-300">Innovation</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Pionniers de la recherche agricole et vétérinaire au Sud-Kivu
            </p>
            <p className="text-lg mb-12 max-w-3xl mx-auto opacity-90">
              Excellence Scientifique • Innovation Durable • Impact Communautaire
            </p>
          </div>
        </section>

        {/* Research Projects */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nos Projets de Recherche
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des recherches appliquées pour transformer l'agriculture congolaise
              </p>
            </div>

            <div className="grid gap-8">
              {researchProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="lg:flex">
                    <div className="lg:w-1/4 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="text-6xl mb-4">{project.icon}</div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${
                          project.status === 'En cours' ? 'from-green-500 to-green-600' : 'from-blue-500 to-blue-600'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="lg:w-3/4 p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {project.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">👨‍🔬 Responsable</h4>
                          <p className="text-gray-600">{project.leader}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">⏱️ Durée</h4>
                          <p className="text-gray-600">{project.duration}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">💰 Financement</h4>
                          <p className="text-gray-600">{project.funding}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Publications Récentes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Partage de nos découvertes avec la communauté scientifique
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {publications.map((pub, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">📄</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {pub.type}
                    </span>
                    <span className="text-gray-500 text-sm">{pub.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{pub.title}</h3>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Auteurs:</span> {pub.authors}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Journal:</span> {pub.journal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Facilities */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nos Installations de Recherche
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Laboratoire d'Agronomie", icon: "🧪", description: "Analyses de sols et tests de variétés" },
                { name: "Clinique Vétérinaire", icon: "🏥", description: "Diagnostic et recherche en santé animale" },
                { name: "Ferme Expérimentale", icon: "🚜", description: "Tests terrain et démonstrations" }
              ].map((facility, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                  <div className="text-6xl mb-4">{facility.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{facility.name}</h3>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-green-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Rejoignez Notre <span className="text-yellow-400">Équipe de Recherche</span>
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Contribuez à l'innovation agricole et vétérinaire au Sud-Kivu
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-10 py-4 rounded-full text-lg font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Nous Contacter
              </a>
              <a
                href="/programmes"
                className="border-2 border-yellow-400 text-yellow-300 px-10 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                Nos Programmes
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageSEO>
  );
}