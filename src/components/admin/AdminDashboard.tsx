'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blog: { total: 24, published: 20, drafts: 4, thisMonth: 5 },
    actualites: { total: 18, urgent: 2, featured: 6, thisMonth: 8 },
    portfolio: { total: 12, featured: 4, completed: 10, thisMonth: 2 },
    comments: { total: 156, pending: 8, approved: 148, thisWeek: 23 },
    users: { total: 2341, active: 1892, thisMonth: 234 },
    gallery: { total: 48, categories: 5, thisMonth: 12 }
  })

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'comment',
      user: 'Marie Uwimana',
      action: 'a commenté l\'article',
      target: 'Les Tendances Technologiques 2025',
      time: 'Il y a 5 minutes',
      icon: '💬'
    },
    {
      id: 2,
      type: 'blog',
      user: 'Admin',
      action: 'a publié un nouvel article',
      target: 'Guide de Cybersécurité',
      time: 'Il y a 2 heures',
      icon: '📝'
    },
    {
      id: 3,
      type: 'actualite',
      user: 'Admin',
      action: 'a ajouté une actualité',
      target: 'Partenariat Microsoft',
      time: 'Il y a 4 heures',
      icon: '📰'
    },
    {
      id: 4,
      type: 'portfolio',
      user: 'Admin',
      action: 'a mis à jour le projet',
      target: 'Système CHU Kamenge',
      time: 'Hier',
      icon: '💼'
    }
  ])

  const quickActions = [
    {
      title: 'Nouvel Article',
      description: 'Créer un nouvel article de blog',
      href: '/admin/blog/new',
      icon: '📝',
      color: 'bg-blue-500'
    },
    {
      title: 'Nouvelle Actualité',
      description: 'Publier une nouvelle actualité',
      href: '/admin/actualites/new',
      icon: '📰',
      color: 'bg-green-500'
    },
    {
      title: 'Nouveau Projet',
      description: 'Ajouter un projet au portfolio',
      href: '/admin/portfolio/new',
      icon: '💼',
      color: 'bg-purple-500'
    },
    {
      title: 'Gérer Commentaires',
      description: 'Modérer les commentaires en attente',
      href: '/admin/comments',
      icon: '💬',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Bienvenue sur le Dashboard INFONET</h1>
        <p className="text-blue-100">
          Gérez facilement tout le contenu de votre site web depuis cette interface d'administration.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Articles de Blog</p>
              <p className="text-3xl font-bold text-gray-900">{stats.blog.total}</p>
              <p className="text-sm text-green-600">+{stats.blog.thisMonth} ce mois</p>
            </div>
            <div className="text-3xl">📝</div>
          </div>
          <div className="mt-4 flex text-xs text-gray-500">
            <span className="mr-4">Publiés: {stats.blog.published}</span>
            <span>Brouillons: {stats.blog.drafts}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Actualités</p>
              <p className="text-3xl font-bold text-gray-900">{stats.actualites.total}</p>
              <p className="text-sm text-green-600">+{stats.actualites.thisMonth} ce mois</p>
            </div>
            <div className="text-3xl">📰</div>
          </div>
          <div className="mt-4 flex text-xs text-gray-500">
            <span className="mr-4">Urgentes: {stats.actualites.urgent}</span>
            <span>Vedettes: {stats.actualites.featured}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Projets Portfolio</p>
              <p className="text-3xl font-bold text-gray-900">{stats.portfolio.total}</p>
              <p className="text-sm text-green-600">+{stats.portfolio.thisMonth} ce mois</p>
            </div>
            <div className="text-3xl">💼</div>
          </div>
          <div className="mt-4 flex text-xs text-gray-500">
            <span className="mr-4">Terminés: {stats.portfolio.completed}</span>
            <span>Vedettes: {stats.portfolio.featured}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commentaires</p>
              <p className="text-3xl font-bold text-gray-900">{stats.comments.total}</p>
              <p className="text-sm text-green-600">+{stats.comments.thisWeek} cette semaine</p>
            </div>
            <div className="text-3xl">💬</div>
          </div>
          <div className="mt-4 flex text-xs text-gray-500">
            <span className="mr-4">En attente: {stats.comments.pending}</span>
            <span>Approuvés: {stats.comments.approved}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Visiteurs</p>
              <p className="text-3xl font-bold text-gray-900">{stats.users.total.toLocaleString()}</p>
              <p className="text-sm text-green-600">+{stats.users.thisMonth} ce mois</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
          <div className="mt-4 flex text-xs text-gray-500">
            <span>Actifs: {stats.users.active.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Images Galerie</p>
              <p className="text-3xl font-bold text-gray-900">{stats.gallery.total}</p>
              <p className="text-sm text-green-600">+{stats.gallery.thisMonth} ce mois</p>
            </div>
            <div className="text-3xl">🖼️</div>
          </div>
          <div className="mt-4 flex text-xs text-gray-500">
            <span>Catégories: {stats.gallery.categories}</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white text-2xl mr-4`}>
                {action.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity and charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action}{' '}
                    <span className="font-medium">"{activity.target}"</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/admin/activity"
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Voir toute l'activité →
          </Link>
        </div>

        {/* Content overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Aperçu du Contenu</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  📝
                </div>
                <span className="text-sm text-gray-900">Articles de blog publiés</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{stats.blog.published}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  📰
                </div>
                <span className="text-sm text-gray-900">Actualités en ligne</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{stats.actualites.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  💼
                </div>
                <span className="text-sm text-gray-900">Projets portfolio</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{stats.portfolio.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  💬
                </div>
                <span className="text-sm text-gray-900">Commentaires non modérés</span>
              </div>
              <span className="text-sm font-medium text-red-600">{stats.comments.pending}</span>
            </div>
          </div>
        </div>
      </div>

      {/* System status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">État du Système</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Site Web</p>
              <p className="text-xs text-gray-500">En ligne et fonctionnel</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Base de Données</p>
              <p className="text-xs text-gray-500">Connectée et stable</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Sauvegarde</p>
              <p className="text-xs text-gray-500">Dernière: il y a 2h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}