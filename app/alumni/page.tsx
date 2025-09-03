"use client";

import PageSEO from "@/components/layout/PageSEO";
import Image from "next/image";

export default function AlumniPage() {
  const featuredAlumni = [
    {
      id: 1,
      name: "Dr. Amani Mubalama",
      graduation: "2018",
      program: "Master Agronomie",
      position: "Directeur Technique, Ministère Agriculture - Sud-Kivu",
      company: "Gouvernement Provincial",
      achievement: "Leader de la réforme agricole provinciale",
      image: "/images/alumni/amani.jpg",
      quote: "ISEAV-WALUNGU m'a donné les compétences pour transformer l'agriculture de ma région."
    },
    {
      id: 2,
      name: "Dr. Nyota Kashindi",
      graduation: "2019",
      program: "Master Agrovétérinaire",
      position: "Responsable Santé Animale",
      company: "FAO - Programme Grands Lacs",
      achievement: "Expert international en santé animale tropicale",
      image: "/images/alumni/nyota.jpg",
      quote: "Ma formation m'a permis d'avoir un impact régional en santé vétérinaire."
    },
    {
      id: 3,
      name: "Ing. Mukenge Safari",
      graduation: "2020",
      program: "Master Agroforesterie",
      position: "Fondateur & CEO",
      company: "EcoVert Solutions",
      achievement: "Entrepreneur social, reboisement de 5000 hectares",
      image: "/images/alumni/mukenge.jpg",
      quote: "L'esprit d'innovation d'ISEAV m'a inspiré à créer ma propre entreprise."
    }
  ];

  const successStories = [
    {
      category: "Agriculture Durable",
      count: "85+",
      description: "Diplômés travaillant dans l'agriculture durable"
    },
    {
      category: "Santé Animale",
      count: "45+",
      description: "Vétérinaires pratiquant en RDC et région"
    },
    {
      category: "Entrepreneuriat",
      count: "30+",
      description: "Entrepreneurs ayant créé leur entreprise"
    },
    {
      category: "Recherche",
      count: "20+",
      description: "Chercheurs dans des institutions prestigieuses"
    }
  ];

  const industries = [
    { name: "Gouvernement", icon: "🏛️", percentage: "35%" },
    { name: "ONG Internationales", icon: "🌍", percentage: "25%" },
    { name: "Entrepreneuriat", icon: "💼", percentage: "20%" },
    { name: "Recherche", icon: "🔬", percentage: "15%" },
    { name: "Secteur Privé", icon: "🏢", percentage: "5%" }
  ];

  return (
    <PageSEO
      title="Nos Alumni - ISEAV-WALUNGU"
      description="Découvrez le parcours exceptionnel de nos diplômés qui transforment l'agriculture et l'élevage en RDC et dans la région."
      keywords="alumni ISEAV, diplômés, success stories, agriculture, vétérinaire, Sud-Kivu"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white overflow-hidden agricultural-pattern">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Nos <span className="text-yellow-300">Alumni</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Ils transforment l'agriculture et l'élevage en RDC et dans le monde
            </p>
            <p className="text-lg mb-12 max-w-3xl mx-auto opacity-90">
              Excellence • Leadership • Impact • Innovation
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm opacity-90">Diplômés depuis 2015</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm opacity-90">Pays d'activité</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm opacity-90">Taux d'employabilité</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Alumni */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Portraits de Réussite
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez les parcours inspirants de nos diplômés d'exception
              </p>
            </div>

            <div className="grid gap-12">
              {featuredAlumni.map((alumni, index) => (
                <div key={alumni.id} className={`bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } lg:flex`}>
                  {/* Photo & Quote */}
                  <div className="lg:w-1/3 bg-gradient-to-br from-blue-100 to-green-100 p-8 flex flex-col justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <span className="text-4xl text-white">👨‍🎓</span>
                      </div>
                      <blockquote className="text-lg italic text-gray-700 mb-4">
                        "{alumni.quote}"
                      </blockquote>
                      <span className="text-sm text-gray-600">Promotion {alumni.graduation}</span>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="lg:w-2/3 p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900">{alumni.name}</h3>
                        <p className="text-blue-600 font-semibold text-lg">{alumni.program}</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                        Promotion {alumni.graduation}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">💼 Position Actuelle</h4>
                        <p className="text-gray-700 font-semibold">{alumni.position}</p>
                        <p className="text-gray-600">{alumni.company}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">🏆 Réalisation Majeure</h4>
                        <p className="text-gray-700">{alumni.achievement}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6">
                      <h4 className="font-bold text-gray-900 mb-3">🎯 Impact & Contribution</h4>
                      <p className="text-gray-700">
                        Contributeur actif au développement agricole régional, 
                        {alumni.name} illustre l'excellence de la formation ISEAV-WALUNGU 
                        et son impact positif sur les communautés.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Impact de Nos Diplômés
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des chiffres qui témoignent de l'excellence de notre formation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {successStories.map((story, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{story.count}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{story.category}</h3>
                  <p className="text-gray-600">{story.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career Paths */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Secteurs d'Activité
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nos diplômés excellent dans divers secteurs
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              {industries.map((industry, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-4">
                    {industry.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{industry.name}</h3>
                  <div className="text-2xl font-bold text-blue-600">{industry.percentage}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alumni Network */}
        <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Réseau Alumni
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Un réseau professionnel actif et solidaire
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Rejoignez Notre Communauté
                </h3>
                <div className="space-y-6">
                  {[
                    { icon: "🤝", title: "Networking", desc: "Connexions professionnelles et opportunités" },
                    { icon: "🎓", title: "Mentorat", desc: "Accompagnement des nouveaux diplômés" },
                    { icon: "💼", title: "Opportunités", desc: "Offres d'emploi exclusives au réseau" },
                    { icon: "📚", title: "Formation Continue", desc: "Webinaires et formations spécialisées" }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-xl">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Inscrivez-vous au Réseau
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nom complet"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Année de diplôme</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>Autre</option>
                  </select>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300">
                    Rejoindre le Réseau
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-green-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Inspiré par Nos <span className="text-yellow-400">Alumni</span> ?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Rejoignez ISEAV-WALUNGU et écrivez votre propre histoire de succès
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/inscription"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-10 py-4 rounded-full text-lg font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Candidater Maintenant
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