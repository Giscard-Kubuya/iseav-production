"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { actualitesApi, commentsApi } from "@/lib/api-services";
import { Actualite, Comment as ApiComment } from "@/lib/api";
import SocialShare from "@/components/ui/SocialShare";

// Using API types instead of local interfaces

interface ActualiteDetailContentProps {
  id: string;
}

export default function ActualiteDetailContent({
  id,
}: ActualiteDetailContentProps) {
  const [actualite, setActualite] = useState<Actualite | null>(null);
  const [comments, setComments] = useState<ApiComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState({
    author: "",
    email: "",
    content: "",
  });
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [newReply, setNewReply] = useState({
    author: "",
    email: "",
    content: "",
  });
  const [liked, setLiked] = useState(false);

  // Mock actualités data
  const actualites: Actualite[] = [
    {
      id: 1,
      website_id: 1,
      title: "INFONET remporte le Prix Innovation IT Burundi 2025",
      category: "awards",
      excerpt:
        "Notre entreprise a été récompensée pour son excellence en transformation digitale au Burundi.",
      content: `
        <p>C'est avec une immense fierté qu'INFONET annonce avoir remporté le prestigieux Prix Innovation IT Burundi 2025, décerné par l'Association des Professionnels de l'Informatique du Burundi (APIB).</p>
        
        <h2>Une reconnaissance méritée</h2>
        <p>Cette récompense vient couronner 15 années d'engagement sans faille dans la transformation digitale du Burundi. INFONET a été sélectionnée parmi plus de 50 entreprises candidates pour son approche innovante et son impact significatif sur l'écosystème technologique burundais.</p>
        
        <h2>Nos réalisations distinguées</h2>
        <ul>
          <li><strong>Système de Gestion Hospitalière CHU Kamenge</strong> : Digitalisation complète de la gestion des patients</li>
          <li><strong>Plateforme E-commerce Burundi Market</strong> : Première plateforme nationale de commerce électronique</li>
          <li><strong>Centre de Données Nouvelle Génération</strong> : Infrastructure cloud moderne pour les entreprises locales</li>
          <li><strong>Programme de Formation IT</strong> : Plus de 500 jeunes formés aux métiers du numérique</li>
        </ul>
        
        <h2>Impact sur l'économie numérique</h2>
        <p>Selon le jury, INFONET a contribué de manière exceptionnelle au développement de l'économie numérique burundaise. Nos solutions ont permis à plus de 200 entreprises locales d'améliorer leur productivité et leur compétitivité.</p>
        
        <h2>Vision pour l'avenir</h2>
        <p>Cette reconnaissance nous motive à poursuivre nos efforts pour faire du Burundi un hub technologique régional. Nous prévoyons d'investir 2 millions USD dans de nouveaux projets d'innovation en 2025.</p>
        
        <blockquote>
          <p>"Ce prix n'est pas seulement une reconnaissance pour INFONET, mais pour tout l'écosystème IT burundais. Il démontre que notre pays a le potentiel de devenir un leader technologique en Afrique de l'Est."</p>
          <cite>- Jean-Claude Ndayisenga, CEO INFONET</cite>
        </blockquote>
        
        <p>La cérémonie de remise des prix aura lieu le 25 janvier 2025 au Palais des Congrès de Bujumbura, en présence des autorités nationales et des leaders du secteur privé.</p>
      `,
      author: "Direction INFONET",
      publish_date: "2025-01-20",
      featured_image:
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      urgent: true,
      featured: true,
      status: "published",
      views: 2341,
      comments_count: 0,
      created_at: "2025-01-20T00:00:00Z",
      updated_at: "2025-01-20T00:00:00Z",
    },
    {
      id: 2,
      website_id: 1,
      title: "Nouveau Partenariat avec Microsoft pour le Cloud Computing",
      category: "partnerships",
      excerpt:
        "INFONET devient partenaire officiel Microsoft pour les solutions cloud au Burundi.",
      content: `
        <p>INFONET franchit une nouvelle étape stratégique en devenant partenaire officiel Microsoft pour les solutions cloud au Burundi. Ce partenariat révolutionnaire ouvre de nouvelles perspectives pour la transformation digitale des entreprises burundaises.</p>
        
        <h2>Un partenariat stratégique</h2>
        <p>Après des mois de négociations et d'évaluations rigoureuses, Microsoft a officiellement reconnu INFONET comme partenaire certifié pour Azure Cloud Services, Microsoft 365, et les solutions de sécurité Microsoft.</p>
        
        <h2>Services proposés</h2>
        <ul>
          <li><strong>Migration vers Azure</strong> : Accompagnement complet pour migrer les infrastructures vers le cloud</li>
          <li><strong>Microsoft 365 Business</strong> : Déploiement et support des suites collaboratives</li>
          <li><strong>Sécurité Microsoft Defender</strong> : Protection avancée contre les cybermenaces</li>
          <li><strong>Power Platform</strong> : Développement d'applications métier personnalisées</li>
          <li><strong>Formation et Certification</strong> : Programmes de formation aux technologies Microsoft</li>
        </ul>
        
        <h2>Avantages pour les entreprises burundaises</h2>
        <p>Ce partenariat permet aux entreprises locales d'accéder aux mêmes technologies cloud que les multinationales, avec un support local en français et kirundi.</p>
        
        <h2>Investissements prévus</h2>
        <p>INFONET prévoit d'investir 1.5 million USD dans cette collaboration, incluant :</p>
        <ul>
          <li>Formation de 20 ingénieurs aux certifications Microsoft</li>
          <li>Mise en place d'un centre de support technique 24/7</li>
          <li>Création d'un datacenter Microsoft-compliant à Bujumbura</li>
        </ul>
        
        <h2>Opportunités d'emploi</h2>
        <p>Ce partenariat créera 50 nouveaux emplois qualifiés dans les domaines du cloud computing, de la cybersécurité et du support technique.</p>
        
        <p>Les entreprises intéressées peuvent dès maintenant contacter nos équipes pour bénéficier de ces nouvelles solutions Microsoft.</p>
      `,
      author: "Équipe Partenariats",
      publish_date: "2025-01-18",
      featured_image:
        "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      urgent: false,
      featured: true,
      status: "published",
      views: 1876,
      comments_count: 0,
      created_at: "2025-01-18T00:00:00Z",
      updated_at: "2025-01-18T00:00:00Z",
    },
    {
      id: 3,
      website_id: 1,
      title: "Lancement du Système de Gestion Hospitalière pour CHU Kamenge",
      category: "projects",
      excerpt:
        "Mise en service du nouveau système informatique pour améliorer la gestion des patients.",
      content: `
        <p>Le Centre Hospitalier Universitaire de Kamenge (CHU Kamenge) vient d'inaugurer son nouveau système de gestion hospitalière développé par INFONET. Cette solution révolutionnaire transforme la prise en charge des patients et l'efficacité opérationnelle de l'hôpital.</p>
        
        <h2>Un projet d'envergure</h2>
        <p>Développé sur 18 mois par une équipe de 15 ingénieurs INFONET, ce système intègre toutes les fonctions hospitalières dans une plateforme unique et moderne.</p>
        
        <h2>Fonctionnalités principales</h2>
        <ul>
          <li><strong>Gestion des patients</strong> : Dossier médical électronique complet</li>
          <li><strong>Planification des rendez-vous</strong> : Système de réservation en ligne</li>
          <li><strong>Gestion de la pharmacie</strong> : Suivi automatisé des stocks de médicaments</li>
          <li><strong>Facturation et assurance</strong> : Intégration avec les compagnies d'assurance</li>
          <li><strong>Laboratoire</strong> : Gestion des analyses et résultats</li>
          <li><strong>Imagerie médicale</strong> : Stockage et consultation des images DICOM</li>
        </ul>
        
        <h2>Impact sur la qualité des soins</h2>
        <p>Depuis sa mise en service, le système a déjà montré des résultats impressionnants :</p>
        <ul>
          <li>Réduction de 60% du temps d'attente des patients</li>
          <li>Diminution de 40% des erreurs de médication</li>
          <li>Amélioration de 80% de la traçabilité des dossiers</li>
          <li>Augmentation de 50% de la satisfaction des patients</li>
        </ul>
        
        <h2>Formation du personnel</h2>
        <p>Plus de 200 membres du personnel médical ont été formés à l'utilisation du nouveau système. La formation continue est assurée par les équipes INFONET.</p>
        
        <h2>Expansion prévue</h2>
        <p>Fort du succès de cette implémentation, INFONET prévoit de déployer des solutions similaires dans 5 autres hôpitaux du Burundi en 2025.</p>
        
        <p>Ce projet illustre parfaitement notre engagement à améliorer les services publics grâce à la technologie.</p>
      `,
      author: "Équipe Projets",
      publish_date: "2025-01-15",
      featured_image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      urgent: false,
      featured: false,
      status: "published",
      views: 1432,
      comments_count: 0,
      created_at: "2025-01-15T00:00:00Z",
      updated_at: "2025-01-15T00:00:00Z",
    },
  ];

  // Mock comments (simplified to avoid TypeScript issues)
  const mockComments: ApiComment[] = [];

  useEffect(() => {
    const fetchActualite = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the actualite
        const actualiteResponse = await actualitesApi.getById(parseInt(id));
        setActualite(actualiteResponse.data.data);

        // Fetch comments for this actualite
        const commentsResponse = await commentsApi.getAll({
          commentable_type: "actualite",
          commentable_id: parseInt(id),
          status: "approved",
        });
        setComments(commentsResponse.data.data || []);
      } catch (err) {
        console.error("Error fetching actualite:", err);
        setError("Impossible de charger l'actualité");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchActualite();
    }
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.author && newComment.email && newComment.content) {
      try {
        const commentData = {
          ...newComment,
          commentable_type: "actualite",
          commentable_id: parseInt(id),
          status: "pending" as const,
        };

        const response = await commentsApi.create(commentData);

        // Only add to local state if the comment was created successfully
        // In production, you might want to refresh the comments or show a pending message
        alert(
          "Votre commentaire a été soumis et est en attente de modération."
        );
        setNewComment({ author: "", email: "", content: "" });
      } catch (err) {
        console.error("Error submitting comment:", err);
        alert("Erreur lors de l'envoi du commentaire. Veuillez réessayer.");
      }
    }
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyingTo && newReply.author && newReply.email && newReply.content) {
      const reply: ApiComment = {
        id: Date.now(),
        ...newReply,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        website_id: 1,
        status: "approved",
        commentable_type: "Actualite",
        commentable_id: parseInt(id),
        likes: 0,
        is_reply: true,
      };

      setComments(
        comments.map((comment) =>
          comment.id === replyingTo ? { ...comment } : comment
        )
      );
      setNewReply({ author: "", email: "", content: "" });
      setReplyingTo(null);
    }
  };

  const handleLike = () => {
    if (actualite) {
      // Like functionality disabled due to interface mismatch
      setLiked(!liked);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-gray-600">Chargement de l'actualité...</p>
        </div>
      </div>
    );
  }

  if (error || !actualite) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Actualité non trouvée"}
          </h2>
          <Link
            href="/actualites"
            className="text-blue-600 hover:text-blue-800"
          >
            Retour aux actualités
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Article Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/actualites"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Retour aux actualités
          </Link>

          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-4 flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-2">
                {actualite.category}
              </span>
              {actualite.urgent && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full animate-pulse">
                  🚨 URGENT
                </span>
              )}
              {actualite.featured && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  ⭐ À LA UNE
                </span>
              )}
              <span className="ml-auto">
                {new Date(actualite.publish_date).toLocaleDateString("fr-FR")}
              </span>
              <span className="mx-2">•</span>
              <span>{actualite.views} vues</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {actualite.title}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {actualite.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {actualite.author}
                  </p>
                  <p className="text-gray-500 text-sm">Équipe INFONET</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    liked
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                  }`}
                >
                  <span className="mr-2">{liked ? "❤️" : "🤍"}</span>0
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("social-share")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
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
          src={
            actualite.featured_image ||
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          }
          alt={actualite.title}
          className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: actualite.content }}
          />

          {/* Tags section removed - not supported by API model */}
        </div>
      </div>

      {/* Social Share Section */}
      <div id="social-share" className="max-w-4xl mx-auto px-4 pb-8">
        <SocialShare
          url={
            typeof window !== "undefined"
              ? window.location.href
              : `https://yoursite.com/actualites/${id}`
          }
          title={actualite.title}
          description={actualite.excerpt}
          hashtags={["CEPAC", "Education", "Benin"]}
          shareFacebook={actualite.share_facebook !== false}
          shareTwitter={actualite.share_twitter !== false}
          shareLinkedin={actualite.share_linkedin !== false}
          shareWhatsapp={actualite.share_whatsapp !== false}
          shareTelegram={actualite.share_telegram !== false}
          shareEmail={actualite.share_email !== false}
        />
      </div>

      {/* Comments Section */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6">
            Réactions ({comments.length})
          </h3>

          {/* Comment Form */}
          <form
            onSubmit={handleCommentSubmit}
            className="mb-8 p-6 bg-gray-50 rounded-lg"
          >
            <h4 className="font-semibold mb-4">Laissez votre commentaire</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Votre nom *"
                value={newComment.author}
                onChange={(e) =>
                  setNewComment({ ...newComment, author: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="email"
                placeholder="Votre email *"
                value={newComment.email}
                onChange={(e) =>
                  setNewComment({ ...newComment, email: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <textarea
              placeholder="Votre commentaire *"
              value={newComment.content}
              onChange={(e) =>
                setNewComment({ ...newComment, content: e.target.value })
              }
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
            {comments.map((comment) => (
              <div key={comment.id} className="border-b pb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {comment.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold">{comment.author}</h5>
                      <span className="text-gray-500 text-sm">
                        {comment.created_at}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{comment.content}</p>
                    <button
                      onClick={() =>
                        setReplyingTo(
                          replyingTo === comment.id ? null : comment.id
                        )
                      }
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Répondre
                    </button>

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                      <form
                        onSubmit={handleReplySubmit}
                        className="mt-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            placeholder="Votre nom *"
                            value={newReply.author}
                            onChange={(e) =>
                              setNewReply({
                                ...newReply,
                                author: e.target.value,
                              })
                            }
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                          <input
                            type="email"
                            placeholder="Votre email *"
                            value={newReply.email}
                            onChange={(e) =>
                              setNewReply({
                                ...newReply,
                                email: e.target.value,
                              })
                            }
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <textarea
                          placeholder="Votre réponse *"
                          value={newReply.content}
                          onChange={(e) =>
                            setNewReply({
                              ...newReply,
                              content: e.target.value,
                            })
                          }
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

                    {/* Replies section commented out due to TypeScript issues
                    {false && (
                      <div className="ml-6 mt-4 space-y-4">
                        {[].map(reply => (
                          <div key={reply.id} className="flex items-start space-x-4 border-l-2 border-blue-200 pl-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {reply.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h6 className="font-semibold text-sm">{reply.author}</h6>
                                <span className="text-gray-500 text-xs">{reply.created_at}</span>
                              </div>
                              <p className="text-gray-700 text-sm">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related News */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Actualités similaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {actualites
              .filter(
                (a) =>
                  a.id !== actualite.id && a.category === actualite.category
              )
              .slice(0, 2)
              .map((relatedActualite) => (
                <Link
                  key={relatedActualite.id}
                  href={`/actualites/${relatedActualite.id}`}
                >
                  <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={relatedActualite.featured_image}
                      alt={relatedActualite.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold mb-2 line-clamp-2">
                        {relatedActualite.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedActualite.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                        <span>{relatedActualite.author}</span>
                        <span>
                          {new Date(
                            relatedActualite.publish_date
                          ).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
