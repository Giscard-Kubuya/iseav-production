"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import PageSEO from "@/components/layout/PageSEO";
import { notFound } from "next/navigation";

export default function ProgramDetailPage() {
  const { id } = useParams();
  
  const programs = {
    "1": {
      id: 1,
      title: "Agronomie Générale",
      level: "Master",
      duration: "2 ans",
      credits: 120,
      icon: "🌾",
      color: "from-green-600 to-green-800",
      description: "Formation complète en techniques agricoles modernes et durables adaptées au climat tropical du Sud-Kivu.",
      longDescription: "Le programme de Master en Agronomie Générale forme des professionnels capables de développer et d'implémenter des systèmes agricoles durables et productifs. Cette formation combine théories scientifiques avancées et pratiques de terrain pour répondre aux défis agricoles contemporains du Sud-Kivu et de la région des Grands Lacs.",
      objectives: [
        "Maîtriser les techniques culturales modernes et traditionnelles",
        "Développer des stratégies de gestion durable des sols",
        "Implémenter des systèmes de protection phytosanitaire intégrée",
        "Utiliser les technologies de précision en agriculture",
        "Conduire des projets de recherche en sciences agricoles"
      ],
      curriculum: [
        {
          semester: "Semestre 1",
          courses: [
            "Physiologie Végétale Avancée",
            "Chimie et Fertilité des Sols",
            "Génétique et Amélioration des Plantes",
            "Méthodologie de la Recherche",
            "Statistiques Agricoles"
          ]
        },
        {
          semester: "Semestre 2", 
          courses: [
            "Phytopathologie Tropicale",
            "Entomologie Agricole",
            "Technologies de l'Information Agricole",
            "Économie Agricole",
            "Stage Pratique I"
          ]
        },
        {
          semester: "Semestre 3",
          courses: [
            "Agriculture de Précision",
            "Systèmes de Culture Durables",
            "Gestion Intégrée des Ravageurs",
            "Projet de Recherche",
            "Stage Pratique II"
          ]
        },
        {
          semester: "Semestre 4",
          courses: [
            "Mémoire de Fin d'Études",
            "Séminaire de Recherche",
            "Stage Professionnel",
            "Soutenance"
          ]
        }
      ],
      careers: [
        "Ingénieur Agronome",
        "Conseiller Agricole",
        "Gestionnaire de Projets Agricoles", 
        "Chercheur en Sciences Agricoles",
        "Expert en Développement Rural"
      ],
      admission: {
        requirements: "Licence en Sciences Agricoles, Biologie ou équivalent avec minimum 60% de moyenne",
        documents: [
          "Copie certifiée du diplôme de Licence",
          "Relevé de notes complet",
          "Lettre de motivation",
          "CV détaillé",
          "Certificat médical"
        ],
        process: [
          "Dépôt du dossier de candidature",
          "Étude du dossier académique",
          "Entretien de motivation",
          "Test d'évaluation écrit",
          "Notification d'admission"
        ]
      },
      fees: {
        registration: "50 USD",
        tuition: "800 USD/année",
        practical: "200 USD/année",
        thesis: "150 USD"
      }
    },
    "2": {
      id: 2,
      title: "Agrovétérinaire",
      level: "Master", 
      duration: "2 ans",
      credits: 120,
      icon: "🐄",
      color: "from-blue-600 to-blue-800",
      description: "Médecine vétérinaire spécialisée pour le développement de l'élevage en milieu tropical africain.",
      longDescription: "Le programme Agrovétérinaire forme des spécialistes en santé animale adaptés aux conditions tropicales. Cette formation unique combine médecine vétérinaire classique et spécificités de l'élevage tropical, avec un focus sur les maladies endémiques et les pratiques d'élevage locales.",
      objectives: [
        "Diagnostiquer et traiter les maladies animales tropicales",
        "Développer des programmes de médecine préventive",
        "Maîtriser les techniques de reproduction assistée",
        "Optimiser la nutrition animale en climat tropical",
        "Gérer la santé publique vétérinaire"
      ],
      curriculum: [
        {
          semester: "Semestre 1",
          courses: [
            "Anatomie Pathologique Vétérinaire",
            "Microbiologie et Immunologie",
            "Pharmacologie Vétérinaire",
            "Pathologie Infectieuse Tropicale",
            "Zootechnie Tropicale"
          ]
        },
        {
          semester: "Semestre 2",
          courses: [
            "Reproduction et Obstétrique",
            "Médecine Interne Vétérinaire",
            "Parasitologie Vétérinaire",
            "Nutrition Animale Tropicale",
            "Clinique Vétérinaire I"
          ]
        },
        {
          semester: "Semestre 3",
          courses: [
            "Chirurgie Vétérinaire",
            "Médecine Préventive",
            "Épidémiologie Vétérinaire",
            "Santé Publique Vétérinaire",
            "Clinique Vétérinaire II"
          ]
        },
        {
          semester: "Semestre 4",
          courses: [
            "Mémoire de Recherche",
            "Stage Professionnel",
            "Séminaire Clinique",
            "Soutenance"
          ]
        }
      ],
      careers: [
        "Vétérinaire Praticien",
        "Inspecteur Sanitaire",
        "Spécialiste en Reproduction Animale",
        "Consultant en Élevage",
        "Responsable Santé Publique Vétérinaire"
      ],
      admission: {
        requirements: "Licence en Sciences Vétérinaires, Biologie ou Zootechnie avec minimum 65% de moyenne",
        documents: [
          "Copie certifiée du diplôme de Licence",
          "Relevé de notes complet", 
          "Lettre de motivation",
          "CV avec expériences pratiques",
          "Certificat médical et vaccinations"
        ],
        process: [
          "Dépôt du dossier complet",
          "Examen d'entrée (biologie, anatomie)",
          "Entretien technique",
          "Test pratique sur animaux",
          "Notification d'admission"
        ]
      },
      fees: {
        registration: "75 USD",
        tuition: "1000 USD/année", 
        practical: "300 USD/année",
        thesis: "200 USD"
      }
    },
    // Add other programs...
  };

  const program = programs[id as keyof typeof programs];
  
  if (!program) {
    notFound();
  }

  return (
    <PageSEO
      title={`${program.title} - ISEAV-WALUNGU`}
      description={program.description}
      keywords={`${program.title}, ISEAV, ${program.level}, ${program.duration}, Sud-Kivu`}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <section className={`relative py-20 bg-gradient-to-r ${program.color} text-white overflow-hidden`}>
          <div className="absolute inset-0 agricultural-pattern opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-8xl">{program.icon}</div>
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                      {program.title}
                    </h1>
                    <div className="flex gap-4 flex-wrap">
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                        {program.level}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                        {program.duration}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                        {program.credits} crédits
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xl mb-8 leading-relaxed opacity-90">
                  {program.longDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/inscription"
                    className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-center"
                  >
                    Candidater Maintenant
                  </Link>
                  <Link
                    href="/contact"
                    className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 text-center"
                  >
                    Plus d'Informations
                  </Link>
                </div>
              </div>
              
              {/* Quick Info Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6">Informations Rapides</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Durée:</span>
                    <span className="font-semibold">{program.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Crédits ECTS:</span>
                    <span className="font-semibold">{program.credits}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Frais d'inscription:</span>
                    <span className="font-semibold">{program.fees.registration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Frais annuels:</span>
                    <span className="font-semibold">{program.fees.tuition}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Objectives */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-4xl mr-4">🎯</span>
                    Objectifs du Programme
                  </h2>
                  <ul className="space-y-4">
                    {program.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <span className="text-gray-700 text-lg">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Curriculum */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                    <span className="text-4xl mr-4">📚</span>
                    Programme d'Études
                  </h2>
                  <div className="grid gap-8">
                    {program.curriculum.map((semester, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{semester.semester}</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {semester.courses.map((course, courseIndex) => (
                            <div key={courseIndex} className="bg-gray-50 rounded-lg p-4">
                              <span className="text-gray-700">{course}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Careers */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-4xl mr-4">💼</span>
                    Débouchés Professionnels
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {program.careers.map((career, index) => (
                      <div key={index} className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border-l-4 border-blue-500">
                        <span className="text-gray-800 font-medium">{career}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Admission Info */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-3xl mr-3">📋</span>
                    Admission
                  </h3>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Conditions Requises</h4>
                    <p className="text-gray-700 text-sm">{program.admission.requirements}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Documents</h4>
                    <ul className="space-y-2">
                      {program.admission.documents.map((doc, index) => (
                        <li key={index} className="text-gray-600 text-sm flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3">Processus</h4>
                    <ol className="space-y-2">
                      {program.admission.process.map((step, index) => (
                        <li key={index} className="text-gray-600 text-sm flex items-start">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <Link
                    href="/inscription"
                    className={`block bg-gradient-to-r ${program.color} text-white text-center px-6 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    Déposer ma Candidature
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-3xl p-8">
                  <h3 className="text-xl font-bold mb-6">Besoin d'Aide ?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">📞</span>
                      <div>
                        <p className="font-medium">Service des Admissions</p>
                        <p className="text-sm opacity-80">+243 XXX XXX XXX</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">✉️</span>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm opacity-80">admission@iseav-walungu.ac.cd</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href="/contact"
                    className="block bg-white text-gray-900 text-center px-6 py-3 rounded-full font-semibold mt-6 hover:bg-gray-100 transition-all duration-300"
                  >
                    Nous Contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Programs */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Autres Programmes qui Pourraient Vous Intéresser
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/programmes/1" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">🌾</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Agronomie Générale</h3>
                <p className="text-gray-600 text-sm">Master - 2 ans</p>
              </Link>
              <Link href="/programmes/2" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">🐄</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Agrovétérinaire</h3>
                <p className="text-gray-600 text-sm">Master - 2 ans</p>
              </Link>
              <Link href="/programmes/3" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">🌲</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Agroforesterie</h3>
                <p className="text-gray-600 text-sm">Master - 2 ans</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageSEO>
  );
}