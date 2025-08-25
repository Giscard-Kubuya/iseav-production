'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useNewsletterSubscriptions, useNewsletterStats, useNewsletterMutations } from '@/hooks/useNewsletter'
import { useDebounce } from '@/hooks/useApi'
import { NewsletterSubscription } from '@/lib/api'

export default function NewsletterManagement() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [interestFilter, setInterestFilter] = useState('')
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const debouncedSearch = useDebounce(search, 300)

  const { data: subscriptions, loading, error, refetch } = useNewsletterSubscriptions()
  const { data: stats } = useNewsletterStats()
  const mutations = useNewsletterMutations()

  // Filter subscriptions locally
  const filteredSubscriptions = useMemo(() => {
    if (!subscriptions) return [];

    return subscriptions.filter((subscription) => {
      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        if (
          !subscription.email.toLowerCase().includes(searchLower) &&
          !(subscription.name && subscription.name.toLowerCase().includes(searchLower)) &&
          !(subscription.company && subscription.company.toLowerCase().includes(searchLower))
        ) {
          return false;
        }
      }

      // Filter by status
      if (statusFilter && subscription.status !== statusFilter) {
        return false;
      }

      // Filter by interest
      if (interestFilter && subscription.interests && !subscription.interests.some(interest => 
        interest.toLowerCase().includes(interestFilter.toLowerCase())
      )) {
        return false;
      }

      return true;
    });
  }, [subscriptions, debouncedSearch, statusFilter, interestFilter])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredSubscriptions.map(item => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id])
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800', 
      unsubscribed: 'bg-red-100 text-red-800'
    }
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800'
  }

  const getStatusText = (status: string) => {
    const statusTexts = {
      active: 'Actif',
      pending: 'En attente',
      unsubscribed: 'Désabonné'
    }
    return statusTexts[status as keyof typeof statusTexts] || status
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletter</h1>
          <p className="text-gray-600">Gérez les abonnements à la newsletter</p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">
                {stats?.data?.total_subscriptions}
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Abonnements</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-green-600">
                {stats?.data?.active_subscriptions}
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-1">Actifs</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-yellow-600">
                {stats?.data?.pending_subscriptions}
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-1">En Attente</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-red-600">
                {stats?.data?.unsubscribed}
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-1">Désabonnés</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats?.data?.new_this_month}
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-1">Ce Mois</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Rechercher
            </label>
            <input
              type="text"
              id="search"
              placeholder="Email, nom, entreprise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="pending">En attente</option>
              <option value="unsubscribed">Désabonnés</option>
            </select>
          </div>
          <div>
            <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
              Intérêt
            </label>
            <input
              type="text"
              id="interest"
              placeholder="Filtrer par intérêt..."
              value={interestFilter}
              onChange={(e) => setInterestFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearch('')
                setStatusFilter('')
                setInterestFilter('')
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredSubscriptions.length && filteredSubscriptions.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entreprise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Abonné le
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-red-600">
                    Erreur lors du chargement des données
                  </td>
                </tr>
              ) : filteredSubscriptions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    Aucun abonnement trouvé
                  </td>
                </tr>
              ) : (
                filteredSubscriptions.map((subscription) => (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(subscription.id)}
                        onChange={(e) => handleSelectItem(subscription.id, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {subscription.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {subscription.name || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {subscription.company || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(subscription.status)}`}>
                        {getStatusText(subscription.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {subscription.source || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(subscription.subscribed_at)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          Voir
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}