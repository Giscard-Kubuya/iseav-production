"use client";

import Link from "next/link";
import Image from "next/image";
import PageSEO from "@/components/layout/PageSEO";

export default function ProgrammesPage() {
  const programs = [
    {
      id: 1,
      title: "Agronomie Générale",
      level: "Master",
      duration: "2 ans",
      credits: 120,
      icon: "🌾",
      color: "from-green-600 to-green-800",
      description: "Formation complète en techniques agricoles modernes et durables adaptées au climat tropical du Sud-Kivu. Développement des compétences en gestion des cultures, amélioration des sols et technologies agricoles innovantes.",
      objectives: [
        "Maîtrise des techniques culturales modernes",
        "Gestion durable des sols et des ressources",
        "Protection phytosanitaire intégrée",
        "Agriculture de précision et technologies émergentes"
      ],
      careers: [
        "Ingénieur Agronome",
        "Conseiller Agricole",
        "Gestionnaire de Projets Agricoles",
        "Chercheur en Sciences Agricoles"
      ],
      admission: "Licence en Sciences Agricoles ou équivalent"
    },
    {
      id: 2,
      title: "Agrovétérinaire",
      level: "Master",
      duration: "2 ans",
      credits: 120,
      icon: "🐄",
      color: "from-blue-600 to-blue-800",
      description: "Médecine vétérinaire spécialisée pour le développement de l'élevage en milieu tropical africain. Formation en santé animale, reproduction et nutrition adaptées aux conditions locales.",
      objectives: [
        "Diagnostic et traitement des maladies animales",
        "Médecine préventive et prophylaxie",
        "Reproduction et amélioration génétique",
        "Nutrition et alimentation du bétail tropical"
      ],
      careers: [
        "Vétérinaire Praticien",
        "Inspecteur Sanitaire",
        "Spécialiste en Reproduction Animale",
        "Consultant en Élevage"
      ],
      admission: "Licence en Sciences Vétérinaires ou Biologie"
    },
    {
      id: 3,
      title: "Agroforesterie",
      level: "Master",
      duration: "2 ans",
      credits: 120,
      icon: "🌲",
      color: "from-emerald-600 to-emerald-800",
      description: "Intégration durable de l'agriculture et de la foresterie pour la conservation des écosystèmes. Approche innovante combinant production agricole et préservation environnementale.",
      objectives: [
        "Conception de systèmes agroforestiers durables",
        "Conservation de la biodiversité",
        "Gestion intégrée des ressources naturelles",
        "Technologies de restauration écologique"
      ],
      careers: [
        "Expert en Agroforesterie",
        "Gestionnaire d'Aires Protégées",
        "Consultant Environnemental",
        "Spécialiste en Développement Rural"
      ],
      admission: "Licence en Foresterie, Agronomie ou Environnement"
    },
    {
      id: 4,
      title: "Gestion des Ressources Naturelles",
      level: "Licence",
      duration: "3 ans",
      credits: 180,
      icon: "🌿",
      color: "from-teal-600 to-teal-800",
      description: "Conservation et valorisation durable des ressources naturelles du Sud-Kivu. Formation en gestion environnementale, énergies renouvelables et développement durable.",
      objectives: [
        "Évaluation des ressources naturelles",
        "Planification de la conservation",
        "Technologies d'énergies renouvelables",
        "Développement communautaire durable"
      ],
      careers: [
        "Gestionnaire Environnemental",
        "Spécialiste en Énergies Renouvelables",
        "Coordonnateur de Projets Verts",
        "Expert en Développement Durable"
      ],
      admission: "Diplôme d'État (Baccalauréat) série scientifique"
    },
    {
      id: 5,
      title: "Transformation des Produits Agricoles",
      level: "Licence",
      duration: "3 ans",
      credits: 180,
      icon: "🏭",
      color: "from-orange-600 to-orange-800",
      description: "Technologies de transformation et valorisation des produits agricoles locaux. Innovation en industrie agroalimentaire et qualité des produits transformés.",
      objectives: [
        "Technologies de transformation alimentaire",
        "Conservation et conditionnement",
        "Contrôle qualité et sécurité alimentaire",
        "Innovation en industrie agroalimentaire"
      ],
      careers: [
        "Technologue Alimentaire",
        "Responsable Qualité Agroalimentaire",
        "Entrepreneur Agroalimentaire",
        "Consultant en Transformation Agricole"
      ],
      admission: "Diplôme d'État (Baccalauréat) série scientifique"
    }
  ];

  return (
    <PageSEO
      title="Nos Programmes d'Études - ISEAV-WALUNGU"
      description="Découvrez nos 5 programmes d'études accrédités par le Ministère de l'Enseignement Supérieur : Agronomie, Agrovétérinaire, Agroforesterie et plus."
      keywords="programmes ISEAV, agronomie, vétérinaire, agroforesterie, formation supérieure, Sud-Kivu"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white overflow-hidden agricultural-pattern">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Nos Programmes d'<span className="text-yellow-300">Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              5 Programmes Accrédités par l'Arrêté Ministériel N° 0041/2021
            </p>
            <p className="text-lg mb-12 max-w-3xl mx-auto opacity-90">
              Des formations de qualité reconnues par l'État, conçues pour répondre aux défis agricoles du 21ème siècle
            </p>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid gap-12">
              {programs.map((program, index) => (
                <div
                  key={program.id}
                  className={`bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } lg:flex`}
                >
                  {/* Content */}
                  <div className="lg:w-2/3 p-12">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-6xl">{program.icon}</div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          {program.title}
                        </h2>
                        <div className="flex gap-4">
                          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                            {program.level}
                          </span>
                          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                            {program.duration}
                          </span>
                          <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
                            {program.credits} crédits
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed mb-8">
                      {program.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Objectifs</h3>
                        <ul className="space-y-2">
                          {program.objectives.map((objective, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-gray-600">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">💼 Débouchés</h3>
                        <ul className="space-y-2">
                          {program.careers.map((career, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-gray-600">{career}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">📋 Conditions d'Admission</h3>
                      <p className="text-gray-700">{program.admission}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href={`/programmes/${program.id}`}
                        className={`inline-block bg-gradient-to-r ${program.color} text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center`}
                      >
                        Plus d'Informations
                      </Link>
                      <Link
                        href="/inscription"
                        className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 text-center"
                      >
                        Candidater
                      </Link>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="lg:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-12">
                    <div className="text-center">
                      <div className="text-8xl mb-4">{program.icon}</div>
                      <div className={`w-24 h-1 bg-gradient-to-r ${program.color} mx-auto mb-4`}></div>
                      <h3 className="text-xl font-bold text-gray-800">{program.level}</h3>
                      <p className="text-gray-600">{program.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-green-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Prêt à Transformer Votre <span className="text-yellow-400">Avenir</span> ?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Rejoignez ISEAV-WALUNGU et devenez un leader dans le secteur agricole et vétérinaire
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/inscription"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-10 py-4 rounded-full text-lg font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Déposer ma Candidature
              </Link>
              <Link
                href="/contact"
                className="border-2 border-yellow-400 text-yellow-300 px-10 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                Demander des Informations
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageSEO>
  );
}