'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PageSEO from '@/components/layout/PageSEO'
import { getPageSEO } from '@/hooks/useSEO'

interface Comment {
  id: number
  author: string
  email: string
  content: string
  date: string
  replies?: Comment[]
}

interface BlogPost {
  id: number
  title: string
  category: string
  content: string
  excerpt: string
  author: string
  date: string
  readTime: string
  image: string
  featured: boolean
  tags: string[]
  views: number
  likes: number
}

interface BlogDetailContentProps {
  id: string
}

export default function BlogDetailContent({ id }: BlogDetailContentProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ author: '', email: '', content: '' })
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [newReply, setNewReply] = useState({ author: '', email: '', content: '' })
  const [liked, setLiked] = useState(false)
  const router = useRouter()

  // Mock blog posts data (in a real app, this would come from an API or database)
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Les Tendances Technologiques 2025 au Burundi',
      category: 'technology',
      excerpt: 'Découvrez les innovations qui vont transformer le paysage technologique burundais en 2025.',
      content: `
        <p>Le Burundi se positionne comme un acteur émergent dans l'écosystème technologique de l'Afrique de l'Est. En 2025, plusieurs tendances majeures dessinent l'avenir numérique du pays.</p>
        
        <h2>1. L'Intelligence Artificielle au Service des Entreprises</h2>
        <p>Les entreprises burundaises commencent à intégrer des solutions d'IA pour optimiser leurs processus. Des chatbots pour le service client aux systèmes de recommandation pour l'e-commerce, l'IA devient accessible aux PME locales.</p>
        
        <h2>2. La Blockchain pour la Transparence</h2>
        <p>Le gouvernement burundais explore l'utilisation de la blockchain pour améliorer la transparence dans les services publics. Cette technologie pourrait révolutionner la gestion des documents officiels et les transactions financières.</p>
        
        <h2>3. L'Internet des Objets (IoT) dans l'Agriculture</h2>
        <p>L'agriculture intelligente prend de l'ampleur avec des capteurs IoT qui surveillent l'humidité du sol, la météo et la croissance des cultures. Cette innovation aide les agriculteurs à optimiser leurs rendements.</p>
        
        <h2>4. La Cybersécurité, Priorité Nationale</h2>
        <p>Avec la digitalisation croissante, la cybersécurité devient cruciale. Le Burundi investit dans la formation d'experts en sécurité informatique et le développement de centres de réponse aux incidents.</p>
        
        <h2>5. Le Cloud Computing Démocratisé</h2>
        <p>Les solutions cloud deviennent plus accessibles aux entreprises burundaises, permettant une réduction des coûts IT et une meilleure flexibilité opérationnelle.</p>
        
        <p>Ces tendances positionnent le Burundi comme un hub technologique régional en devenir. INFONET accompagne cette transformation en proposant des solutions adaptées aux besoins locaux.</p>
      `,
      author: 'Jean-Baptiste Niyonzima',
      date: '15 Janvier 2025',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      tags: ['Innovation', 'Burundi', 'Tech 2025'],
      views: 1247,
      likes: 89
    },
    {
      id: 2,
      title: 'Comment Sécuriser votre Infrastructure IT',
      category: 'security',
      excerpt: 'Guide complet pour protéger votre entreprise contre les cybermenaces modernes.',
      content: `
        <p>La cybersécurité est devenue un enjeu majeur pour toutes les entreprises, quelle que soit leur taille. Voici un guide complet pour sécuriser votre infrastructure IT.</p>
        
        <h2>1. Audit de Sécurité Initial</h2>
        <p>Commencez par un audit complet de votre infrastructure existante. Identifiez les vulnérabilités, les points d'accès non sécurisés et les données sensibles.</p>
        
        <h2>2. Mise en Place de Pare-feu Avancés</h2>
        <p>Déployez des pare-feu de nouvelle génération avec inspection profonde des paquets, détection d'intrusion et filtrage d'applications.</p>
        
        <h2>3. Authentification Multi-facteurs (MFA)</h2>
        <p>Implémentez l'authentification à deux facteurs pour tous les accès sensibles. Cela réduit drastiquement les risques d'intrusion.</p>
        
        <h2>4. Sauvegarde et Plan de Continuité</h2>
        <p>Établissez une stratégie de sauvegarde 3-2-1 : 3 copies de vos données, sur 2 supports différents, avec 1 copie hors site.</p>
        
        <h2>5. Formation du Personnel</h2>
        <p>Le facteur humain reste le maillon faible. Formez régulièrement vos équipes aux bonnes pratiques de sécurité et aux techniques de phishing.</p>
        
        <h2>6. Surveillance Continue</h2>
        <p>Implémentez des outils de monitoring 24/7 pour détecter les activités suspectes et réagir rapidement aux incidents.</p>
        
        <p>INFONET propose des solutions complètes de cybersécurité adaptées au contexte burundais. Contactez-nous pour un audit gratuit de votre infrastructure.</p>
      `,
      author: 'Espérance Mukamana',
      date: '10 Janvier 2025',
      readTime: '12 min',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      tags: ['Cybersécurité', 'Protection', 'Enterprise'],
      views: 892,
      likes: 67
    },
    {
      id: 3,
      title: 'Développement d\'Applications Mobiles : Best Practices',
      category: 'development',
      excerpt: 'Les meilleures pratiques pour créer des applications mobiles performantes et user-friendly.',
      content: `
        <p>Le développement d'applications mobiles nécessite une approche méthodique et l'application de bonnes pratiques. Voici notre guide pour créer des apps de qualité.</p>
        
        <h2>1. Design First, Code Second</h2>
        <p>Commencez toujours par le design UX/UI. Créez des wireframes, des prototypes et testez l'expérience utilisateur avant de coder.</p>
        
        <h2>2. Architecture Modulaire</h2>
        <p>Adoptez une architecture claire : MVVM, Clean Architecture ou MVI. Cela facilite la maintenance et les tests.</p>
        
        <h2>3. Performance et Optimisation</h2>
        <p>Optimisez les images, gérez efficacement la mémoire et implémentez le lazy loading pour les listes longues.</p>
        
        <h2>4. Tests Automatisés</h2>
        <p>Implémentez des tests unitaires, d'intégration et UI. Un taux de couverture de 80% minimum est recommandé.</p>
        
        <h2>5. Sécurité Mobile</h2>
        <p>Chiffrez les données sensibles, utilisez des certificats SSL et implémentez l'authentification biométrique quand possible.</p>
        
        <h2>6. Compatibilité Multi-plateforme</h2>
        <p>Considérez React Native ou Flutter pour développer une seule base de code pour iOS et Android.</p>
        
        <h2>7. Analytics et Monitoring</h2>
        <p>Intégrez des outils d'analytics pour comprendre l'usage et identifier les bugs en production.</p>
        
        <p>Chez INFONET, nous développons des applications mobiles suivant ces best practices. Nos apps atteignent des scores de performance de 90+ sur les stores.</p>
      `,
      author: 'Arlette Uwimana',
      date: '8 Janvier 2025',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      tags: ['Mobile', 'Development', 'Best Practices'],
      views: 654,
      likes: 45
    }
  ]

  // Mock comments data
  const mockComments: Comment[] = [
    {
      id: 1,
      author: 'Marie Uwimana',
      email: 'marie@example.com',
      content: 'Excellent article ! Ces tendances sont très pertinentes pour le contexte burundais. Merci pour ces insights.',
      date: '16 Janvier 2025',
      replies: [
        {
          id: 11,
          author: 'Jean-Baptiste Niyonzima',
          email: 'jean@infonet.bi',
          content: 'Merci Marie ! N\'hésitez pas si vous avez des questions spécifiques sur l\'implémentation de ces technologies.',
          date: '16 Janvier 2025'
        }
      ]
    },
    {
      id: 2,
      author: 'Paul Ndikumana',
      email: 'paul@company.bi',
      content: 'Très intéressant ! Nous cherchons justement à implémenter des solutions IoT dans notre exploitation agricole. Pouvez-vous nous aider ?',
      date: '17 Janvier 2025'
    }
  ]

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === parseInt(id))
    if (foundPost) {
      setPost(foundPost)
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

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (replyingTo && newReply.author && newReply.email && newReply.content) {
      const reply: Comment = {
        id: Date.now(),
        ...newReply,
        date: new Date().toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
      
      setComments(comments.map(comment => 
        comment.id === replyingTo 
          ? { ...comment, replies: [...(comment.replies || []), reply] }
          : comment
      ))
      setNewReply({ author: '', email: '', content: '' })
      setReplyingTo(null)
    }
  }

  const handleLike = () => {
    if (post) {
      setPost({ ...post, likes: liked ? post.likes - 1 : post.likes + 1 })
      setLiked(!liked)
    }
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h2>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">
            Retour au blog
          </Link>
        </div>
      </div>
    )
  }

  const seoData = getPageSEO('blog', {
    title: post.title,
    description: post.excerpt,
    image: post.image,
    slug: id
  });

  return (
    <PageSEO {...seoData}>
      <div className="min-h-screen bg-gray-50">
      {/* Article Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Retour au blog
          </Link>
          
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-4">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime} de lecture</span>
              <span className="mx-2">•</span>
              <span>{post.views} vues</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{post.author}</p>
                  <p className="text-gray-500 text-sm">Expert INFONET</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    liked 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  <span className="mr-2">{liked ? '❤️' : '🤍'}</span>
                  {post.likes}
                </button>
                
                <button className="flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                  <span className="mr-2">📤</span>
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Image */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Tags */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
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
            <h4 className="font-semibold mb-4">Laisser un commentaire</h4>
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
                    <p className="text-gray-700 mb-3">{comment.content}</p>
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Répondre
                    </button>

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                      <form onSubmit={handleReplySubmit} className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            placeholder="Votre nom *"
                            value={newReply.author}
                            onChange={(e) => setNewReply({...newReply, author: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                          <input
                            type="email"
                            placeholder="Votre email *"
                            value={newReply.email}
                            onChange={(e) => setNewReply({...newReply, email: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <textarea
                          placeholder="Votre réponse *"
                          value={newReply.content}
                          onChange={(e) => setNewReply({...newReply, content: e.target.value})}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                          required
                        />
                        <div className="flex space-x-2">
                          <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Répondre
                          </button>
                          <button
                            type="button"
                            onClick={() => setReplyingTo(null)}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                          >
                            Annuler
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-6 mt-4 space-y-4">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className="flex items-start space-x-4 border-l-2 border-blue-200 pl-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {reply.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h6 className="font-semibold text-sm">{reply.author}</h6>
                                <span className="text-gray-500 text-xs">{reply.date}</span>
                              </div>
                              <p className="text-gray-700 text-sm">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Articles similaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 2)
              .map(relatedPost => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                  <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold mb-2 line-clamp-2">{relatedPost.title}</h4>
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                        <span>{relatedPost.author}</span>
                        <span>{relatedPost.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
    </PageSEO>
  )
}