'use client'

import PageSEO from '@/components/layout/PageSEO'

export default function EquipePage() {
  const teamMembers = [
    {
      id: 1,
      name: 'M. Jean-Baptiste AKPO',
      position: 'Directeur Général',
      department: 'Direction',
      description: 'Directeur expérimenté avec 15 ans dans le domaine éducatif. Passionné par l\'excellence pédagogique et le développement intégral des élèves.',
      email: 'direction@cepac-beni.edu.cd',
      image: '/images/team/jean-akpo.jpg',
      specialties: ['Leadership pédagogique', 'Gestion éducative', 'Développement stratégique']
    },
    {
      id: 2,
      name: 'Mme Marie DOSSOU',
      position: 'Coordinatrice Pédagogique',
      department: 'Pédagogie',
      description: 'Coordinatrice pédagogique avec une expertise en méthodologies d\'enseignement innovantes et suivi des élèves.',
      email: 'pedagogie@cepac-beni.edu.cd',
      image: '/images/team/marie-dossou.jpg',
      specialties: ['Méthodologie pédagogique', 'Formation des enseignants', 'Évaluation scolaire']
    },
    {
      id: 3,
      name: 'M. Paul AGBO',
      position: 'Responsable Vie Scolaire',
      department: 'Vie Scolaire',
      description: 'Responsable de la vie scolaire, garant du bien-être des élèves et de l\'harmonie dans l\'établissement.',
      email: 'viescolaire@cepac-beni.edu.cd',
      image: '/images/team/paul-agbo.jpg',
      specialties: ['Encadrement des élèves', 'Gestion de conflits', 'Animation éducative']
    },
    {
      id: 4,
      name: 'Mme Félicité HOUNSOU',
      position: 'Responsable Administrative',
      department: 'Administration',
      description: 'Gestionnaire administrative expérimentée, elle assure le bon fonctionnement administratif de l\'établissement.',
      email: 'administration@cepac-beni.edu.cd',
      image: '/images/team/felicite-hounsou.jpg',
      specialties: ['Gestion administrative', 'Ressources humaines', 'Communication']
    },
    {
      id: 5,
      name: 'M. Rodrigue KPEVI',
      position: 'Enseignant Principal - Mathématiques',
      department: 'Enseignement',
      description: 'Enseignant passionné de mathématiques, spécialisé dans les méthodes pédagogiques innovantes.',
      email: 'mathematiques@cepac-beni.edu.cd',
      image: '/images/team/rodrigue-kpevi.jpg',
      specialties: ['Mathématiques', 'Pédagogie active', 'Suivi individualisé']
    },
    {
      id: 6,
      name: 'Mme Claudine ADEBO',
      position: 'Enseignante Principale - Français',
      department: 'Enseignement',
      description: 'Enseignante de français avec une expertise en littérature et expression écrite et orale.',
      email: 'francais@cepac-beni.edu.cd',
      image: '/images/team/claudine-adebo.jpg',
      specialties: ['Français', 'Littérature', 'Expression créative']
    }
  ]

  return (
    <PageSEO
      title="Notre Équipe - 8e CEPAC Projet-Beni"
      description="Découvrez l'équipe pédagogique et administrative du 8e CEPAC Projet-Beni. Des professionnels dévoués à l'excellence éducative."
      keywords="équipe, enseignants, CEPAC, direction, pédagogie, administration, RDC, République Démocratique du Congo"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-blue-100">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-800 to-amber-600 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Notre Équipe</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Une équipe de professionnels dévoués à l'excellence éducative et au développement intégral de chaque élève
            </p>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nos <span className="text-blue-600">Professionnels</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une équipe expérimentée et passionnée, engagée dans la réussite de nos élèves
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative h-64">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {member.department}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Spécialités :</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      <span className="mr-2">✉️</span>
                      Contacter
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nos <span className="text-amber-600">Valeurs d'Équipe</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Les valeurs qui nous unissent et nous guident dans notre mission éducative
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center p-6 rounded-xl bg-blue-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🤝</span>
                </div>
                <h3 className="text-lg font-bold text-blue-800 mb-2">Collaboration</h3>
                <p className="text-gray-600 text-sm">
                  Travail d'équipe et entraide pour la réussite commune
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-amber-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🎯</span>
                </div>
                <h3 className="text-lg font-bold text-amber-800 mb-2">Excellence</h3>
                <p className="text-gray-600 text-sm">
                  Recherche constante de la qualité dans notre enseignement
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-blue-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">❤️</span>
                </div>
                <h3 className="text-lg font-bold text-blue-800 mb-2">Bienveillance</h3>
                <p className="text-gray-600 text-sm">
                  Accompagnement attentif et respectueux de chaque élève
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-amber-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🚀</span>
                </div>
                <h3 className="text-lg font-bold text-amber-800 mb-2">Innovation</h3>
                <p className="text-gray-600 text-sm">
                  Méthodes pédagogiques modernes et créatives
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-800 to-amber-600 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Rejoignez Notre Équipe</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Vous êtes passionné par l'éducation ? Consultez nos offres d'emploi et rejoignez notre équipe de professionnels dévoués.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/recrutement"
                className="bg-white text-blue-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Voir les Postes Disponibles
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-800 transition-all duration-300 transform hover:scale-105"
              >
                Nous Contacter
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageSEO>
  )
}