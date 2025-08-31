'use client'

import PageSEO from '@/components/layout/PageSEO'

export default function CepacContactPage() {
  return (
    <PageSEO
      title="Contact - 8e CEPAC Projet-Beni"
      description="Contactez le 8e CEPAC Projet-Beni pour toute information sur nos programmes éducatifs et inscriptions."
      keywords="CEPAC, contact, information, inscription, Bénin, école"
    >
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-green-800 to-yellow-700 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Nous Contacter</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Nous sommes là pour répondre à toutes vos questions
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-white">📍</span>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-4">Adresse</h3>
                <p className="text-gray-600">
                  Projet-Beni<br/>
                  République du Bénin
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-white">📞</span>
                </div>
                <h3 className="text-xl font-bold text-yellow-800 mb-4">Téléphone</h3>
                <p className="text-gray-600">
                  +229 XX XX XX XX<br/>
                  +229 XX XX XX XX
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-white">📧</span>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-4">Email</h3>
                <p className="text-gray-600">
                  contact@cepac-beni.edu.bj<br/>
                  direction@cepac-beni.edu.bj
                </p>
              </div>
            </div>

            {/* Services */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Nos <span className="text-green-600">Services</span>
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Direction',
                    email: 'direction@cepac-beni.edu.bj',
                    phone: '+229 XX XX XX XX',
                    description: 'Administration générale et direction pédagogique',
                    icon: '🏢',
                    color: 'from-green-500 to-green-600'
                  },
                  {
                    name: 'Inscriptions',
                    email: 'inscriptions@cepac-beni.edu.bj',
                    phone: '+229 XX XX XX XX',
                    description: 'Admission des nouveaux élèves et réinscriptions',
                    icon: '📝',
                    color: 'from-yellow-500 to-yellow-600'
                  },
                  {
                    name: 'Pédagogie',
                    email: 'pedagogie@cepac-beni.edu.bj',
                    phone: '+229 XX XX XX XX',
                    description: 'Coordination pédagogique et programmes éducatifs',
                    icon: '📚',
                    color: 'from-green-500 to-green-600'
                  },
                  {
                    name: 'Vie Scolaire',
                    email: 'viescolaire@cepac-beni.edu.bj',
                    phone: '+229 XX XX XX XX',
                    description: 'Suivi des élèves et discipline scolaire',
                    icon: '👥',
                    color: 'from-yellow-500 to-yellow-600'
                  },
                  {
                    name: 'Comptabilité',
                    email: 'comptabilite@cepac-beni.edu.bj',
                    phone: '+229 XX XX XX XX',
                    description: 'Gestion financière et frais de scolarité',
                    icon: '💰',
                    color: 'from-green-500 to-green-600'
                  },
                  {
                    name: 'Bibliothèque',
                    email: 'bibliotheque@cepac-beni.edu.bj',
                    phone: '+229 XX XX XX XX',
                    description: 'Ressources documentaires et soutien scolaire',
                    icon: '📖',
                    color: 'from-yellow-500 to-yellow-600'
                  }
                ].map((service, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className={`p-6 bg-gradient-to-r ${service.color} text-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl">{service.icon}</div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                      <p className="text-white/90 text-sm">{service.description}</p>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <span className="w-5 h-5 flex items-center justify-center mr-3">📧</span>
                          <a href={`mailto:${service.email}`} className="hover:text-green-600 transition-colors text-sm">
                            {service.email}
                          </a>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="w-5 h-5 flex items-center justify-center mr-3">📞</span>
                          <a href={`tel:${service.phone}`} className="hover:text-green-600 transition-colors">
                            {service.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageSEO>
  )
}