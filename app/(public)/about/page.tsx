import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-blue-900 mb-6">
              À propos d'ISEAV-ARU
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une institution d'excellence dédiée à la formation de leaders dans un monde en constante évolution
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Notre Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                L'Institut Supérieur d'Enseignement Appliqué et de Valorisation d'Ariana a pour mission de 
                former les futurs leaders et innovateurs dans un environnement académique d'excellence.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nous nous engageons à fournir une éducation de qualité supérieure qui combine rigueur 
                académique, innovation pédagogique et ouverture sur le monde professionnel.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-500 to-yellow-500 rounded-2xl">
                <div className="absolute inset-4 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white text-6xl">🎓</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2">
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Notre Vision</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Être reconnue comme une institution universitaire de référence en Tunisie et dans la région, 
                formant des diplômés compétents et responsables.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nous aspirons à être un catalyseur d'innovation et de développement économique et social, 
                contribuant activement à la construction d'une société du savoir.
              </p>
            </div>
            <div className="lg:order-1 relative">
              <div className="aspect-square bg-gradient-to-br from-yellow-500 to-blue-500 rounded-2xl">
                <div className="absolute inset-4 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white text-6xl">🌟</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Nos Valeurs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes fondamentaux qui guident notre action quotidienne
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                Nous visons l'excellence dans tous nos programmes et activités académiques.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-yellow-600 text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                Nous encourageons la créativité et l'innovation dans l'enseignement et la recherche.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Collaboration</h3>
              <p className="text-gray-600">
                Nous privilégions le travail d'équipe et les partenariats stratégiques.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-yellow-600 text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Ouverture</h3>
              <p className="text-gray-600">
                Nous valorisons la diversité et l'ouverture sur le monde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Notre Histoire</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un parcours d'excellence depuis notre création
            </p>
          </div>

          <div className="space-y-12">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mr-8">
                <span className="text-white font-bold text-lg">2010</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Création de l'Institut</h3>
                <p className="text-gray-600 text-lg">
                  Fondation d'ISEAV-ARU avec une vision claire : former les talents de demain dans un environnement d'excellence académique.
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0 w-24 h-24 bg-yellow-600 rounded-full flex items-center justify-center mr-8">
                <span className="text-white font-bold text-lg">2015</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Expansion des Programmes</h3>
                <p className="text-gray-600 text-lg">
                  Lancement de nouveaux programmes de formation et développement des partenariats internationaux.
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mr-8">
                <span className="text-white font-bold text-lg">2020</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Innovation Numérique</h3>
                <p className="text-gray-600 text-lg">
                  Adoption des technologies éducatives avancées et développement de plateformes d'apprentissage en ligne.
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0 w-24 h-24 bg-yellow-600 rounded-full flex items-center justify-center mr-8">
                <span className="text-white font-bold text-lg">2024</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Centre d'Excellence</h3>
                <p className="text-gray-600 text-lg">
                  Reconnaissance comme centre d'excellence régional et inauguration du nouveau campus technologique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Notre Direction</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe dirigeante expérimentée et visionnaire
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-blue-500 to-blue-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Dr. Ahmed Ben Salem</h3>
                <p className="text-yellow-600 font-semibold mb-3">Directeur Général</p>
                <p className="text-gray-600 text-sm">
                  Docteur en Sciences de Gestion, 20 ans d'expérience dans l'enseignement supérieur.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-yellow-500 to-yellow-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Dr. Fatma Trabelsi</h3>
                <p className="text-yellow-600 font-semibold mb-3">Directrice Académique</p>
                <p className="text-gray-600 text-sm">
                  Docteur en Informatique, spécialiste en innovation pédagogique et technologies éducatives.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-blue-500 to-yellow-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Dr. Mohamed Karim</h3>
                <p className="text-yellow-600 font-semibold mb-3">Directeur de la Recherche</p>
                <p className="text-gray-600 text-sm">
                  Docteur en Intelligence Artificielle, pionnier de la recherche appliquée en Tunisie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Rejoignez l'Excellence</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Découvrez comment ISEAV-ARU peut transformer votre avenir académique et professionnel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/admissions" 
              className="bg-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              Candidater maintenant
            </Link>
            <Link 
              href="/visit" 
              className="border-2 border-yellow-400 text-yellow-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-400 hover:text-white transition-colors"
            >
              Planifier une visite
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}