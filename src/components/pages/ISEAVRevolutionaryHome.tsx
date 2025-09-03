"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useHeroSlides } from "@/hooks/useHeroSlides";
import { useServicesFront } from "@/hooks/useServicesFront";
import { useLatestNews } from "@/hooks/useLatestNews";
import { useTeamExperts } from "@/hooks/useTeamExperts";
import { useCompanyValuesFront } from "@/hooks/useCompanyValuesFront";
import { useCompanyStatsFront } from "@/hooks/useCompanyStatsFront";

export default function ISEAVRevolutionaryHome() {
  const [activeTab, setActiveTab] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const { heroSlides, loading: slidesLoading } = useHeroSlides();
  const { services, loading: servicesLoading } = useServicesFront(4);
  const { news, loading: newsLoading } = useLatestNews(4);
  const { teamExperts, loading: teamLoading } = useTeamExperts();
  const { companyValues, loading: valuesLoading } = useCompanyValuesFront();
  const { companyStats, loading: statsLoading } = useCompanyStatsFront();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const programs = [
    {
      id: 1,
      title: "Agronomie Générale",
      level: "Master",
      duration: "2 ans",
      icon: "🌾",
      color: "from-green-600 to-green-800",
      description: "Formation complète en techniques agricoles modernes et durables pour la région des Grands Lacs."
    },
    {
      id: 2,
      title: "Agrovétérinaire",
      level: "Master",
      duration: "2 ans", 
      icon: "🐄",
      color: "from-blue-600 to-blue-800",
      description: "Médecine vétérinaire spécialisée pour le développement de l'élevage en milieu tropical."
    },
    {
      id: 3,
      title: "Agroforesterie",
      level: "Master",
      duration: "2 ans",
      icon: "🌲",
      color: "from-emerald-600 to-emerald-800",
      description: "Intégration durable de l'agriculture et de la foresterie pour la conservation des écosystèmes."
    },
    {
      id: 4,
      title: "Gestion des Ressources Naturelles",
      level: "Licence",
      duration: "3 ans",
      icon: "🌿",
      color: "from-teal-600 to-teal-800",
      description: "Conservation et valorisation des ressources naturelles du Sud-Kivu."
    },
    {
      id: 5,
      title: "Transformation Agricole",
      level: "Licence", 
      duration: "3 ans",
      icon: "🏭",
      color: "from-orange-600 to-orange-800",
      description: "Technologies de transformation et valorisation des produits agricoles locaux."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Revolutionary Hero Section with Vertical Layout */}
      <section className="relative h-screen flex">
        {/* Left Panel - Content */}
        <div className="w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-green-900 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 agricultural-pattern opacity-10"></div>
          <div className="relative z-10 text-center text-white px-8">
            {/* Logo */}
            <div className="mb-8">
              <Image 
                src="/images/logos/logo_iseav.png" 
                alt="ISEAV-WALUNGU Logo" 
                width={150} 
                height={150} 
                className="mx-auto filter drop-shadow-xl"
              />
            </div>
            
            <h1 className="text-6xl font-bold mb-4 leading-tight">
              ISEAV
              <span className="block text-4xl font-normal text-yellow-300">WALUNGU</span>
            </h1>
            
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            
            <h2 className="text-xl mb-8 max-w-md mx-auto leading-relaxed">
              Institut Supérieur d'Études Agronomiques et Vétérinaires de Walungu
            </h2>
            
            <p className="text-lg mb-12 max-w-lg mx-auto opacity-90">
              Pionnier de l'excellence agricole au Sud-Kivu • Formation • Recherche • Innovation
            </p>
            
            <div className="flex flex-col gap-4">
              <Link 
                href="#programs" 
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Découvrir nos Programmes
              </Link>
              <Link 
                href="/inscription" 
                className="border-2 border-yellow-400 text-yellow-300 px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 transform hover:scale-105"
              >
                Candidater Maintenant
              </Link>
            </div>
          </div>
        </div>

        {/* Right Panel - Visual */}
        <div className="w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20"></div>
          <div className="h-full flex flex-col justify-center items-center p-12">
            {/* Animated Agricultural Stats */}
            <div className="grid grid-cols-2 gap-8 mb-12">
              {[
                { number: "15+", label: "Années d'Excellence", icon: "🏆" },
                { number: "500+", label: "Diplômés", icon: "🎓" },
                { number: "5", label: "Programmes Accrédités", icon: "📜" },
                { number: "20+", label: "Enseignants Experts", icon: "👨‍🏫" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-blue-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Visual Elements */}
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Autorisation Ministérielle</h3>
                <div className="text-center">
                  <div className="text-3xl mb-2">📜</div>
                  <p className="text-sm text-gray-600">Arrêté N° 0041/2021</p>
                  <p className="text-xs text-gray-500">Ministère ESU - RDC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovative Programs Section */}
      <section id="programs" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Programmes d'<span className="text-green-600">Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des formations reconnues par l'État, adaptées aux défis agricoles du 21ème siècle
            </p>
          </div>

          {/* Interactive Program Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={program.id}
                className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative p-8">
                  <div className="text-6xl mb-4 text-center">{program.icon}</div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                    {program.title}
                  </h3>
                  
                  <div className="flex justify-center gap-4 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {program.level}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {program.duration}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-center leading-relaxed mb-6">
                    {program.description}
                  </p>
                  
                  <div className="text-center">
                    <Link 
                      href={`/programmes/${program.id}`}
                      className={`inline-block bg-gradient-to-r ${program.color} text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      En Savoir Plus
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Lab Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Laboratoire d'<span className="text-blue-600">Innovation</span> Agricole
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: "🔬",
                    title: "Recherche Appliquée",
                    description: "Développement de solutions agricoles adaptées au climat tropical du Sud-Kivu"
                  },
                  {
                    icon: "🌱",
                    title: "Semences Améliorées",
                    description: "Sélection et amélioration de variétés résistantes aux maladies locales"
                  },
                  {
                    icon: "💡",
                    title: "Technologies Durables",
                    description: "Innovation en matière d'irrigation, de conservation des sols et d'agroécologie"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-4xl">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: "🧪", title: "Lab Chimie", desc: "Analyse des sols" },
                    { icon: "🦠", title: "Microbiologie", desc: "Pathologie végétale" },
                    { icon: "🌾", title: "Génétique", desc: "Amélioration variétale" },
                    { icon: "🔍", title: "Diagnostics", desc: "Maladies animales" }
                  ].map((lab, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-3xl mb-3">{lab.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-1">{lab.title}</h4>
                      <p className="text-sm text-gray-600">{lab.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership & Impact Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Impact et <span className="text-yellow-300">Partenariats</span>
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Transformer l'agriculture du Sud-Kivu à travers l'éducation et l'innovation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Partenaires Académiques",
                items: ["Universités Internationales", "Centres de Recherche", "ONG Spécialisées"],
                icon: "🤝",
                color: "bg-yellow-500"
              },
              {
                title: "Projets en Cours",
                items: ["Agriculture Durable", "Sécurité Alimentaire", "Conservation Biodiversité"],
                icon: "🚀",
                color: "bg-green-500"
              },
              {
                title: "Impact Régional",
                items: ["Développement Rural", "Formation Paysans", "Amélioration Revenus"],
                icon: "🌍",
                color: "bg-blue-500"
              }
            ].map((section, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-white">
                <div className={`w-16 h-16 ${section.color} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto`}>
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6 text-center">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Unique Design */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 agricultural-pattern opacity-5"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-8">
            Votre Avenir Commence à <span className="text-yellow-400">ISEAV-WALUNGU</span>
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Rejoignez la nouvelle génération d'agronomes et vétérinaires qui transforment l'agriculture africaine
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
              Visiter le Campus
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Admission", value: "Ouverte", icon: "✅" },
              { label: "Rentrée", value: "Sept 2024", icon: "📅" },
              { label: "Campus", value: "Walungu", icon: "🏛️" }
            ].map((info, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-2">{info.icon}</div>
                <div className="text-sm text-gray-300">{info.label}</div>
                <div className="text-lg font-semibold">{info.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}