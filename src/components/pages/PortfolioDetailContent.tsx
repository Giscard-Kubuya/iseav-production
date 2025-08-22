'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Comment {
  id: number
  author: string
  email: string
  content: string
  date: string
  replies?: Comment[]
}

interface Project {
  id: number
  title: string
  category: string
  description: string
  fullDescription: string
  technologies: string[]
  images: string[]
  client: string
  duration: string
  budget: string
  team: string[]
  challenges: string[]
  solutions: string[]
  results: string[]
  testimonial?: {
    content: string
    author: string
    position: string
    company: string
  }
  date: string
  status: 'completed' | 'in-progress' | 'maintenance'
  featured: boolean
  views: number
  likes: number
}

interface PortfolioDetailContentProps {
  id: string
}

export default function PortfolioDetailContent({ id }: PortfolioDetailContentProps) {
  const [project, setProject] = useState<Project | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ author: '', email: '', content: '' })
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [newReply, setNewReply] = useState({ author: '', email: '', content: '' })
  const [liked, setLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Mock projects data
  const projects: Project[] = [
    {
      id: 1,
      title: 'Système de Gestion Hospitalière CHU Kamenge',
      category: 'web-development',
      description: 'Solution complète de gestion hospitalière pour améliorer les soins aux patients.',
      fullDescription: 'Développement d\'un système intégré de gestion hospitalière pour le Centre Hospitalier Universitaire de Kamenge, incluant la gestion des patients, la pharmacie, les laboratoires et la facturation.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Redis', 'WebSocket'],
      images: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      client: 'CHU Kamenge',
      duration: '18 mois',
      budget: '$250,000',
      team: ['Jean-Claude Ndayisenga', 'Marie-Claire Nzeyimana', 'Emmanuel Hakizimana', 'Consolée Uwimana'],
      challenges: [
        'Intégration avec les systèmes existants',
        'Formation du personnel médical',
        'Sécurisation des données patients',
        'Optimisation des performances'
      ],
      solutions: [
        'APIs RESTful pour l\'intégration',
        'Programme de formation personnalisé',
        'Chiffrement end-to-end des données',
        'Optimisation de la base de données'
      ],
      results: [
        'Réduction de 60% du temps d\'attente',
        'Diminution de 40% des erreurs médicales',
        'Amélioration de 80% de la traçabilité',
        'Satisfaction patient à 95%'
      ],
      testimonial: {
        content: 'Le système développé par INFONET a révolutionné notre façon de travailler. La qualité des soins s\'est considérablement améliorée.',
        author: 'Dr. Espérance Mukamana',
        position: 'Directrice Médicale',
        company: 'CHU Kamenge'
      },
      date: 'Décembre 2024',
      status: 'completed',
      featured: true,
      views: 2841,
      likes: 187
    },
    {
      id: 2,
      title: 'Plateforme E-commerce Burundi Market',
      category: 'e-commerce',
      description: 'Première plateforme de commerce électronique nationale connectant vendeurs et acheteurs.',
      fullDescription: 'Création de la première marketplace nationale du Burundi, permettant aux commerçants locaux de vendre en ligne et aux consommateurs d\'acheter facilement.',
      technologies: ['Next.js', 'Stripe', 'MongoDB', 'AWS', 'Redux', 'Tailwind CSS'],
      images: [
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      client: 'Ministère du Commerce',
      duration: '12 mois',
      budget: '$180,000',
      team: ['Emmanuel Hakizimana', 'Arlette Uwimana', 'Jean-Baptiste Niyonzima'],
      challenges: [
        'Éducation des commerçants au digital',
        'Intégration des paiements mobiles',
        'Logistique de livraison',
        'Confiance des consommateurs'
      ],
      solutions: [
        'Formation et accompagnement personnalisé',
        'Partenariat avec les opérateurs télécoms',
        'Réseau de points relais',
        'Système de notation et avis clients'
      ],
      results: [
        '500+ commerçants inscrits',
        '10,000+ produits référencés',
        '50,000+ utilisateurs actifs',
        '$2M de transactions en 6 mois'
      ],
      date: 'Octobre 2024',
      status: 'completed',
      featured: true,
      views: 1952,
      likes: 134
    },
    {
      id: 3,
      title: 'Application Mobile Banking BIC',
      category: 'mobile-development',
      description: 'Application mobile sécurisée pour les services bancaires en ligne.',
      fullDescription: 'Développement d\'une application mobile complète pour la Banque de l\'Investissement et du Commerce (BIC), offrant tous les services bancaires essentiels.',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'JWT', 'Biometric Auth', 'Push Notifications'],
      images: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      client: 'BIC Burundi',
      duration: '10 mois',
      budget: '$150,000',
      team: ['Marie-Claire Nzeyimana', 'Emmanuel Hakizimana', 'Claudine Nibigira'],
      challenges: [
        'Sécurité bancaire maximale',
        'Performance en zone de faible connectivité',
        'Conformité réglementaire',
        'Expérience utilisateur intuitive'
      ],
      solutions: [
        'Authentification biométrique et 2FA',
        'Mode hors ligne et synchronisation',
        'Audit de sécurité externe',
        'Tests utilisateurs itératifs'
      ],
      results: [
        '80,000+ téléchargements',
        '95% de satisfaction utilisateur',
        '40% de réduction des visites en agence',
        'Certification sécurité bancaire'
      ],
      date: 'Septembre 2024',
      status: 'completed',
      featured: false,
      views: 1456,
      likes: 98
    }
  ]

  // Mock comments
  const mockComments: Comment[] = [
    {
      id: 1,
      author: 'Dr. Pacifique Ntihabose',
      email: 'pacifique@medical.bi',
      content: 'Excellent travail ! Le système fonctionne parfaitement dans notre service. Bravo à l\'équipe INFONET.',
      date: '22 Janvier 2025',
    },
    {
      id: 2,
      author: 'Sylvie Ndayishimiye',
      email: 'sylvie@tech.bi',
      content: 'Très impressionnant ! Pourriez-vous développer une solution similaire pour les cliniques privées ?',
      date: '21 Janvier 2025'
    }
  ]

  useEffect(() => {
    const foundProject = projects.find(p => p.id === parseInt(id))
    if (foundProject) {
      setProject(foundProject)
      setComments(mockComments)
    }
  }, [id])

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.author && newComment.email && newComment.content) {
      const comment: Comment = {
        id: Date.now(),
        ...newComment,
        date: new Date().toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
      setComments([...comments, comment])
      setNewComment({ author: '', email: '', content: '' })
    }
  }

  const handleLike = () => {
    if (project) {
      setProject({ ...project, likes: liked ? project.likes - 1 : project.likes + 1 })
      setLiked(!liked)
    }
  }

  const nextImage = () => {
    if (project) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
    }
  }

  const prevImage = () => {
    if (project) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
    }
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Projet non trouvé</h2>
          <Link href="/portfolio" className="text-blue-600 hover:text-blue-800">
            Retour au portfolio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Project Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link href="/portfolio" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Retour au portfolio
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-4 flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {project.category.replace('-', ' ')}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status === 'completed' ? 'Terminé' :
                   project.status === 'in-progress' ? 'En cours' : 'Maintenance'}
                </span>
                {project.featured && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                    ⭐ Projet vedette
                  </span>
                )}
                <span className="ml-auto">{project.date}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {project.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {project.fullDescription}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Client</h3>
                  <p className="text-gray-600">{project.client}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Durée</h3>
                  <p className="text-gray-600">{project.duration}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Budget</h3>
                  <p className="text-gray-600">{project.budget}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Vues</h3>
                  <p className="text-gray-600">{project.views}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    liked 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  <span className="mr-2">{liked ? '❤️' : '🤍'}</span>
                  {project.likes}
                </button>
                
                <button className="flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                  <span className="mr-2">📤</span>
                  Partager
                </button>

                <Link href="/contact" className="flex items-center px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                  <span className="mr-2">💬</span>
                  Projet similaire
                </Link>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-64 md:h-96 bg-gray-200 rounded-xl overflow-hidden">
                <img 
                  src={project.images[currentImageIndex]} 
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
              
              {project.images.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Technologies */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Technologies Utilisées</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map(tech => (
                  <span key={tech} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Défis et Solutions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-4">🎯 Défis</h3>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span className="text-gray-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-4">💡 Solutions</h3>
                  <ul className="space-y-3">
                    {project.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-700">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Résultats Obtenus</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.results.map((result, index) => (
                  <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700 font-medium">{result}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            {project.testimonial && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Témoignage Client</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <blockquote className="text-lg italic text-gray-700 mb-4">
                    "{project.testimonial.content}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {project.testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{project.testimonial.author}</p>
                      <p className="text-gray-600 text-sm">{project.testimonial.position}</p>
                      <p className="text-gray-500 text-sm">{project.testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Team */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Équipe Projet</h3>
              <div className="space-y-3">
                {project.team.map((member, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                      {member.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-gray-700">{member}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Projet similaire ?</h3>
              <p className="text-blue-100 mb-4">
                Vous avez un projet similaire ? Contactez-nous pour discuter de vos besoins.
              </p>
              <Link href="/contact" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors block text-center">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6">
            Commentaires ({comments.length})
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-4">Laissez votre avis sur ce projet</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Votre nom *"
                value={newComment.author}
                onChange={(e) => setNewComment({...newComment, author: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="email"
                placeholder="Votre email *"
                value={newComment.email}
                onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <textarea
              placeholder="Votre commentaire *"
              value={newComment.content}
              onChange={(e) => setNewComment({...newComment, content: e.target.value})}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Publier le commentaire
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="border-b pb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {comment.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold">{comment.author}</h5>
                      <span className="text-gray-500 text-sm">{comment.date}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Projects */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Projets similaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter(p => p.id !== project.id && p.category === project.category)
              .slice(0, 3)
              .map(relatedProject => (
                <Link key={relatedProject.id} href={`/portfolio/${relatedProject.id}`}>
                  <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={relatedProject.images[0]} 
                      alt={relatedProject.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold mb-2 line-clamp-2">{relatedProject.title}</h4>
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedProject.description}</p>
                      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                        <span>{relatedProject.client}</span>
                        <span>{relatedProject.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}