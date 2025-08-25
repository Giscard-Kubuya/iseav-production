'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { portfolioProjectsApi, commentsApi } from '@/lib/api-services'
import { PortfolioProject, Comment as ApiComment } from '@/lib/api'

// Using API types instead of local interfaces

interface PortfolioDetailContentProps {
  id: string
}

export default function PortfolioDetailContent({ id }: PortfolioDetailContentProps) {
  const [project, setProject] = useState<PortfolioProject | null>(null)
  const [comments, setComments] = useState<ApiComment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newComment, setNewComment] = useState({ author: '', email: '', content: '' })
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [newReply, setNewReply] = useState({ author: '', email: '', content: '' })
  const [liked, setLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch the portfolio project
        const projectResponse = await portfolioProjectsApi.getById(parseInt(id))
        setProject(projectResponse.data.data)
        
        // Fetch comments for this project
        const commentsResponse = await commentsApi.getAll({
          commentable_type: 'portfolio_project',
          commentable_id: parseInt(id),
          status: 'approved'
        })
        setComments(commentsResponse.data.data || [])
        
      } catch (err) {
        console.error('Error fetching portfolio project:', err)
        setError('Impossible de charger le projet')
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchProject()
    }
  }, [id])

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.author && newComment.email && newComment.content) {
      try {
        const commentData = {
          ...newComment,
          commentable_type: 'portfolio_project',
          commentable_id: parseInt(id),
          status: 'pending' as const
        }
        
        const response = await commentsApi.create(commentData)
        
        // Only add to local state if the comment was created successfully
        // In production, you might want to refresh the comments or show a pending message
        alert('Votre commentaire a été soumis et est en attente de modération.')
        setNewComment({ author: '', email: '', content: '' })
        
      } catch (err) {
        console.error('Error submitting comment:', err)
        alert('Erreur lors de l\'envoi du commentaire. Veuillez réessayer.')
      }
    }
  }

  const handleLike = () => {
    if (project) {
      // Note: This would need to be implemented in the API to persist likes
      setLiked(!liked)
    }
  }

  const nextImage = () => {
    if (project && project.gallery_images && project.gallery_images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % (project.gallery_images?.length || 1))
    }
  }

  const prevImage = () => {
    if (project && project.gallery_images && project.gallery_images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + (project.gallery_images?.length || 1)) % (project.gallery_images?.length || 1))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-gray-600">Chargement du projet...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Projet non trouvé"}
          </h2>
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
                  {project.category?.replace('-', ' ')}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status === 'completed' ? 'Terminé' :
                   project.status === 'in_progress' ? 'En cours' : 'Planifié'}
                </span>
                {project.featured && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                    ⭐ Projet vedette
                  </span>
                )}
                <span className="ml-auto">{project.start_date ? new Date(project.start_date).toLocaleDateString('fr-FR') : ''}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {project.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {project.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Client</h3>
                  <p className="text-gray-600">{project.client}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Durée</h3>
                  <p className="text-gray-600">
                    {project.start_date && project.end_date 
                      ? `${Math.ceil((new Date(project.end_date).getTime() - new Date(project.start_date).getTime()) / (1000 * 60 * 60 * 24))} jours`
                      : 'Non spécifiée'
                    }
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Budget</h3>
                  <p className="text-gray-600">{project.budget ? `$${project.budget}` : 'Confidentiel'}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Statut</h3>
                  <p className="text-gray-600">{project.status}</p>
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
                  J'aime
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
                  src={
                    project.gallery_images && project.gallery_images.length > 0 
                      ? project.gallery_images[currentImageIndex]
                      : project.featured_image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                  } 
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {project.gallery_images && project.gallery_images.length > 1 && (
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
              
              {project.gallery_images && project.gallery_images.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {project.gallery_images.map((_, index) => (
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
            {project.technologies && project.technologies.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Technologies Utilisées</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges & Solutions */}
            {(project.challenges || project.solutions) && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Défis et Solutions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.challenges && (
                    <div>
                      <h3 className="text-lg font-semibold text-red-600 mb-4">🎯 Défis</h3>
                      <div className="text-gray-700 prose">
                        <div dangerouslySetInnerHTML={{ __html: project.challenges }} />
                      </div>
                    </div>
                  )}
                  {project.solutions && (
                    <div>
                      <h3 className="text-lg font-semibold text-green-600 mb-4">💡 Solutions</h3>
                      <div className="text-gray-700 prose">
                        <div dangerouslySetInnerHTML={{ __html: project.solutions }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Project URLs */}
            {(project.project_url || project.repository_url) && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Liens du Projet</h2>
                <div className="flex flex-wrap gap-4">
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <span className="mr-2">🌐</span>
                      Voir le projet en ligne
                    </a>
                  )}
                  {project.repository_url && (
                    <a
                      href={project.repository_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <span className="mr-2">📁</span>
                      Code source
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Team */}
            {project.team && project.team.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">Équipe Projet</h3>
                <div className="space-y-3">
                  {project.team.map((member, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                        {member.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <span className="text-gray-700">{member}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                      <span className="text-gray-500 text-sm">{new Date(comment.created_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Intéressé par un projet similaire ?</h3>
          <p className="text-blue-100 mb-6">
            Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.
          </p>
          <Link href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Demander un devis
          </Link>
        </div>
      </div>
    </div>
  )
}