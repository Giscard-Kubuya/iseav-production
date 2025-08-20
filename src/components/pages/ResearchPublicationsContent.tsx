'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ResearchPublicationsContent() {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedJournal, setSelectedJournal] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const publicationTypes = [
    { id: 'all', name: 'Toutes les Publications', count: 156 },
    { id: 'article', name: 'Articles de Recherche', count: 98 },
    { id: 'conference', name: 'Communications', count: 32 },
    { id: 'book', name: 'Ouvrages & Chapitres', count: 15 },
    { id: 'patent', name: 'Brevets', count: 11 }
  ]

  const years = [
    { id: 'all', name: 'Toutes les Années' },
    { id: '2024', name: '2024' },
    { id: '2023', name: '2023' },
    { id: '2022', name: '2022' },
    { id: '2021', name: '2021' },
    { id: '2020', name: '2020' }
  ]

  const journals = [
    { id: 'all', name: 'Toutes les Revues' },
    { id: 'nature', name: 'Nature & Sous-revues' },
    { id: 'science', name: 'Science Family' },
    { id: 'ieee', name: 'IEEE Transactions' },
    { id: 'elsevier', name: 'Revues Elsevier' },
    { id: 'springer', name: 'Springer Journals' }
  ]

  const publications = [
    {
      id: 1,
      type: 'article',
      year: '2024',
      journal: 'nature',
      title: 'CRISPR-Cas9 Enhanced Drought Tolerance in Mediterranean Olive Cultivars: A Breakthrough in Climate-Resilient Agriculture',
      authors: ['Khadhraoui, S.', 'Benali, A.', 'Mansouri, K.', 'Trabelsi, M.'],
      journal_name: 'Nature Biotechnology',
      volume: '42',
      pages: '156-167',
      doi: '10.1038/s41587-024-02234-x',
      impact_factor: 46.9,
      citations: 23,
      abstract: 'We demonstrate successful CRISPR-Cas9 editing of drought stress response genes in olive trees, resulting in 40% improved water use efficiency and maintained oil quality under water-limited conditions.',
      keywords: ['CRISPR-Cas9', 'Drought tolerance', 'Olive cultivation', 'Climate adaptation', 'Gene editing'],
      category: 'biotechnology',
      open_access: true,
      pdf_url: '/publications/2024/nature_olive_crispr.pdf'
    },
    {
      id: 2,
      type: 'article',
      year: '2024',
      journal: 'ieee',
      title: 'AI-Driven Precision Agriculture: Real-time Crop Monitoring Using IoT Sensor Networks and Machine Learning',
      authors: ['Guesmi, R.', 'Benali, A.', 'Ben Ahmed, F.Z.'],
      journal_name: 'IEEE Transactions on Artificial Intelligence',
      volume: '5',
      pages: '89-102',
      doi: '10.1109/TAI.2024.3376543',
      impact_factor: 8.7,
      citations: 15,
      abstract: 'Novel AI framework combining IoT sensors, satellite imagery, and deep learning for precision agriculture, achieving 95% accuracy in yield prediction and 30% reduction in resource usage.',
      keywords: ['Artificial Intelligence', 'IoT', 'Precision Agriculture', 'Machine Learning', 'Crop Monitoring'],
      category: 'technology',
      open_access: false,
      pdf_url: '/publications/2024/ieee_ai_agriculture.pdf'
    },
    {
      id: 3,
      type: 'article',
      year: '2023',
      journal: 'elsevier',
      title: 'Smart Packaging Technologies for Extended Shelf-life of Fresh Produce: Integration of Nanosensors and Biodegradable Materials',
      authors: ['Ben Ahmed, F.Z.', 'Boudhrioua, N.', 'Khadhraoui, S.'],
      journal_name: 'Food Packaging and Shelf Life',
      volume: '38',
      pages: '101-115',
      doi: '10.1016/j.fpsl.2023.101087',
      impact_factor: 6.2,
      citations: 42,
      abstract: 'Development of intelligent packaging system with integrated nanosensors for real-time freshness monitoring, extending produce shelf-life by 60% while maintaining nutritional quality.',
      keywords: ['Smart packaging', 'Nanosensors', 'Food preservation', 'Biodegradable materials', 'Shelf-life extension'],
      category: 'food',
      open_access: true,
      pdf_url: '/publications/2023/elsevier_smart_packaging.pdf'
    },
    {
      id: 4,
      type: 'conference',
      year: '2024',
      journal: 'springer',
      title: 'Microbial Bioremediation of Heavy Metal Contaminated Agricultural Soils: A Sustainable Approach for Soil Health Restoration',
      authors: ['Oueslati, A.', 'Trabelsi, M.', 'Mansouri, K.'],
      journal_name: 'International Conference on Environmental Biotechnology',
      volume: 'LNCS 14789',
      pages: '234-248',
      doi: '10.1007/978-3-031-45123-4_18',
      impact_factor: 4.1,
      citations: 8,
      abstract: 'Comprehensive study on indigenous microbial consortia for heavy metal bioremediation, achieving 95% lead and cadmium removal from contaminated agricultural soils.',
      keywords: ['Bioremediation', 'Heavy metals', 'Soil contamination', 'Microbial consortia', 'Environmental restoration'],
      category: 'environment',
      open_access: false,
      pdf_url: '/publications/2024/springer_bioremediation.pdf'
    },
    {
      id: 5,
      type: 'patent',
      year: '2023',
      journal: 'patent',
      title: 'Autonomous Drone System for Precision Application of Agricultural Inputs with AI-Guided Navigation',
      authors: ['Guesmi, R.', 'Benali, A.', 'Trabelsi, M.'],
      journal_name: 'US Patent Office',
      volume: 'US Patent',
      pages: 'US11,789,456',
      doi: 'Patent US11789456B2',
      impact_factor: 0,
      citations: 0,
      abstract: 'Innovative autonomous drone system with AI-powered navigation for precise application of fertilizers and pesticides, reducing chemical usage by 45% while maintaining crop protection efficacy.',
      keywords: ['Autonomous drones', 'Precision agriculture', 'AI navigation', 'Agricultural inputs', 'Sustainability'],
      category: 'technology',
      open_access: false,
      pdf_url: '/patents/2023/drone_system_patent.pdf'
    },
    {
      id: 6,
      type: 'article',
      year: '2023',
      journal: 'science',
      title: 'Functional Foods Development Using Biotechnology: Enhancing Nutritional Value and Bioavailability of Traditional Mediterranean Crops',
      authors: ['Boudhrioua, N.', 'Ben Ahmed, F.Z.', 'Khadhraoui, S.'],
      journal_name: 'Science of Food',
      volume: '7',
      pages: '45-58',
      doi: '10.1038/s41538-023-00198-2',
      impact_factor: 5.8,
      citations: 28,
      abstract: 'Novel biotechnological approaches for developing functional foods from Mediterranean crops, increasing antioxidant content by 300% and improving bioavailability of essential nutrients.',
      keywords: ['Functional foods', 'Biotechnology', 'Mediterranean crops', 'Nutrition enhancement', 'Bioavailability'],
      category: 'food',
      open_access: true,
      pdf_url: '/publications/2023/science_functional_foods.pdf'
    },
    {
      id: 7,
      type: 'book',
      year: '2023',
      journal: 'springer',
      title: 'Sustainable Agriculture in the Digital Age: Integrating IoT, AI, and Biotechnology for Climate-Smart Farming',
      authors: ['Benali, A.', 'Guesmi, R.', 'Khadhraoui, S.', 'Oueslati, A.'],
      journal_name: 'Springer Nature',
      volume: 'Book',
      pages: '1-342',
      doi: '10.1007/978-3-031-41234-5',
      impact_factor: 0,
      citations: 67,
      abstract: 'Comprehensive guide on implementing digital technologies in sustainable agriculture, covering IoT applications, AI algorithms, and biotechnological innovations for climate-resilient farming systems.',
      keywords: ['Sustainable agriculture', 'Digital farming', 'IoT', 'Artificial Intelligence', 'Climate adaptation'],
      category: 'agriculture',
      open_access: false,
      pdf_url: '/books/2023/sustainable_agriculture_digital_age.pdf'
    },
    {
      id: 8,
      type: 'article',
      year: '2022',
      journal: 'nature',
      title: 'Genomic Selection for Climate Adaptation in Durum Wheat: Accelerating Breeding Programs Through Advanced Biotechnology',
      authors: ['Mansouri, K.', 'Khadhraoui, S.', 'Trabelsi, M.'],
      journal_name: 'Nature Plants',
      volume: '8',
      pages: '1123-1134',
      doi: '10.1038/s41477-022-01198-w',
      impact_factor: 15.8,
      citations: 89,
      abstract: 'Revolutionary genomic selection pipeline for durum wheat breeding, reducing breeding cycles from 12 to 6 years while improving heat and drought tolerance by 35%.',
      keywords: ['Genomic selection', 'Durum wheat', 'Climate adaptation', 'Plant breeding', 'Biotechnology'],
      category: 'biotechnology',
      open_access: true,
      pdf_url: '/publications/2022/nature_genomic_selection.pdf'
    }
  ]

  const filteredPublications = publications.filter(pub => {
    const matchesType = selectedType === 'all' || pub.type === selectedType
    const matchesYear = selectedYear === 'all' || pub.year === selectedYear
    const matchesJournal = selectedJournal === 'all' || pub.journal === selectedJournal
    const matchesSearch = searchTerm === '' || 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesType && matchesYear && matchesJournal && matchesSearch
  })

  const stats = [
    { label: 'Publications Totales', value: '156', icon: '📚', description: 'Articles et communications' },
    { label: 'Citations', value: '2,847', icon: '📈', description: 'Citations totales' },
    { label: 'Index H', value: '24', icon: '🏆', description: 'H-index institutionnel' },
    { label: 'Revues Impact', value: '89%', icon: '⭐', description: 'Publications à fort impact' }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return '📄'
      case 'conference': return '🎤'
      case 'book': return '📚'
      case 'patent': return '💡'
      default: return '📋'
    }
  }

  const getJournalIcon = (journal: string) => {
    switch (journal) {
      case 'nature': return '🌟'
      case 'science': return '🔬'
      case 'ieee': return '🤖'
      case 'elsevier': return '📖'
      case 'springer': return '📘'
      case 'patent': return '💡'
      default: return '📄'
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-indigo-800/75 to-purple-700/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className={`text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up">
                <span className="bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
                  Publications Scientifiques
                </span>
              </h1>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-cyan-100 animate-fade-in-up delay-200">
                Excellence & Impact International
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Découvrez notre production scientifique de premier plan publiée dans les revues 
                les plus prestigieuses et reconnues internationalement.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Academic Icons */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-bounce delay-1000 flex items-center justify-center text-2xl">📚</div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-bounce delay-1500 flex items-center justify-center text-xl">📈</div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-indigo-400/20 rounded-full animate-bounce delay-2000 flex items-center justify-center text-lg">🏆</div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-1500 {
          animation-delay: 1.5s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group transform hover:scale-110 transition-all duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform duration-500 shadow-lg group-hover:shadow-2xl">
                    {stat.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-5xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-gray-700 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Rechercher par titre, auteur, mots-clés..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none transition-colors duration-300"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-6">
            {/* Type Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Type de Publication</h3>
              <div className="flex flex-wrap gap-3">
                {publicationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedType === type.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.name}
                    <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                      {type.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Year and Journal Filters */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Année de Publication</h3>
                <div className="flex flex-wrap gap-2">
                  {years.map((year) => (
                    <button
                      key={year.id}
                      onClick={() => setSelectedYear(year.id)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedYear === year.id
                          ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {year.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Éditeur/Revue</h3>
                <div className="flex flex-wrap gap-2">
                  {journals.map((journal) => (
                    <button
                      key={journal.id}
                      onClick={() => setSelectedJournal(journal.id)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedJournal === journal.id
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {journal.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Publications</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {filteredPublications.length} publications selon vos critères de recherche
            </p>
          </div>

          <div className="space-y-8">
            {filteredPublications.map((publication, index) => (
              <div
                key={publication.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-8">
                  {/* Publication Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                        {getTypeIcon(publication.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                            {publication.year}
                          </span>
                          {publication.impact_factor > 0 && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                              IF: {publication.impact_factor}
                            </span>
                          )}
                          {publication.open_access && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                              🔓 Open Access
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">{getJournalIcon(publication.journal)}</span>
                          <span className="font-medium">{publication.journal_name}</span>
                          {publication.volume && (
                            <span className="ml-2 text-sm">Vol. {publication.volume}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{publication.citations}</div>
                      <div className="text-sm text-gray-600">Citations</div>
                    </div>
                  </div>

                  {/* Publication Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {publication.title}
                  </h3>

                  {/* Authors */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-1">Auteurs:</div>
                    <div className="flex flex-wrap gap-2">
                      {publication.authors.map((author, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {author}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Abstract */}
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {publication.abstract}
                  </p>

                  {/* Keywords */}
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-2">Mots-clés:</div>
                    <div className="flex flex-wrap gap-2">
                      {publication.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Publication Details */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">DOI</div>
                      <div className="font-mono text-sm text-blue-600 break-all">{publication.doi}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Pages</div>
                      <div className="font-semibold text-gray-800">{publication.pages}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Type</div>
                      <div className="font-semibold text-purple-600 capitalize">
                        {publication.type === 'article' ? 'Article' : 
                         publication.type === 'conference' ? 'Communication' :
                         publication.type === 'book' ? 'Ouvrage' : 'Brevet'}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={publication.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      📄 Télécharger PDF
                    </a>
                    <a
                      href={`https://doi.org/${publication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                      🔗 DOI
                    </a>
                    <button className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                      📚 Citer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPublications.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Aucune publication trouvée</h3>
              <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Contribuez à la Science
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed">
            Rejoignez notre communauté scientifique et participez aux recherches qui façonnent 
            l'avenir de l'agriculture et des sciences appliquées.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/research/projects" 
              className="bg-white text-blue-600 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Nos Projets de Recherche
            </Link>
            <Link 
              href="/contact" 
              className="border-3 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Collaborer avec Nous
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}