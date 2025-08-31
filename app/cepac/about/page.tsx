'use client'

import PageSEO from '@/components/layout/PageSEO'

export default function CepacAboutPage() {
  return (
    <PageSEO
      title="À Propos - 8e CEPAC Projet-Beni"
      description="Découvrez l'histoire, la mission et les valeurs du 8e CEPAC Projet-Beni, centre d'excellence éducative au Bénin."
      keywords="CEPAC, à propos, histoire, mission, valeurs, éducation, Bénin"
    >
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-green-800 to-yellow-700 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">À Propos du CEPAC</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Centre d'Excellence en Education Primaire et Cycle Complémentaire
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-green-800 mb-6">Notre Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Le 8e CEPAC Projet-Beni s'engage à offrir une éducation de qualité 
                  qui favorise l'épanouissement intégral de chaque apprenant. Nous 
                  préparons nos élèves à devenir des citoyens responsables et des 
                  leaders de demain.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full mr-4"></div>
                    <span className="text-gray-700">Excellence académique</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-600 rounded-full mr-4"></div>
                    <span className="text-gray-700">Développement intégral</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full mr-4"></div>
                    <span className="text-gray-700">Innovation pédagogique</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-green-500 to-yellow-500 rounded-3xl p-8">
                  <div className="h-full bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <span className="text-8xl mb-4 block">🎯</span>
                      <h3 className="text-2xl font-bold">Notre Mission</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nos <span className="text-green-600">Valeurs</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des valeurs fortes qui guident notre approche éducative
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-lg bg-green-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-white">🎓</span>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-4">Excellence</h3>
                <p className="text-gray-600">
                  Nous visons l'excellence dans tous les aspects de l'éducation
                </p>
              </div>

              <div className="text-center p-8 rounded-lg bg-yellow-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-white">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-yellow-800 mb-4">Respect</h3>
                <p className="text-gray-600">
                  Le respect mutuel est au cœur de nos relations
                </p>
              </div>

              <div className="text-center p-8 rounded-lg bg-green-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-white">💡</span>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-4">Innovation</h3>
                <p className="text-gray-600">
                  Nous adoptons des méthodes pédagogiques innovantes
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageSEO>
  )
}