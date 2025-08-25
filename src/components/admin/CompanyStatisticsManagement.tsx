'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useApiData } from '@/hooks/useApi'
import { companyStatisticsApi } from '@/lib/api-services'
import { CompanyStatistic } from '@/lib/api'

export default function CompanyStatisticsManagement() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  // Fetch statistics from API
  const { data: statisticsResponse, loading, error } = useApiData(
    () => companyStatisticsApi.getAll(),
    []
  )

  const allStatistics = statisticsResponse?.data || []
  
  // Filter statistics based on search and filters
  const statistics = allStatistics.filter(statistic => {
    const matchesSearch = !search || 
      statistic.name.toLowerCase().includes(search.toLowerCase()) ||
      statistic.label?.toLowerCase().includes(search.toLowerCase()) ||
      statistic.value.toLowerCase().includes(search.toLowerCase())
    
    const matchesCategory = !categoryFilter || 
      statistic.name.toLowerCase().includes(categoryFilter.toLowerCase())
    
    const matchesStatus = !statusFilter || 
      (statusFilter === 'active' && statistic.is_active) ||
      (statusFilter === 'inactive' && !statistic.is_active)
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(statistics.map(item => item.id))
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

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette statistique ?')) {
      try {
        await companyStatisticsApi.delete(id)
        // Refresh data - the useApiData hook should handle this automatically
        window.location.reload()
      } catch (error) {
        alert('Erreur lors de la suppression')
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Statistiques Entreprise</h1>
          <p className="text-gray-600">Gérez les chiffres clés de votre entreprise</p>
        </div>
        <Link
          href="/admin/company-statistics/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nouvelle Statistique
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">
            {allStatistics.length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Total Statistiques</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {allStatistics.filter(s => s.is_active).length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Statistiques Actives</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-purple-600">
            {[...new Set(allStatistics.map(s => s.name).filter(Boolean))].length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Types de Statistiques</div>
        </div>
      </div>

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
              placeholder="Libellé, description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <input
              type="text"
              id="category"
              placeholder="Filtrer par catégorie..."
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
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
              <option value="active">Actives</option>
              <option value="inactive">Inactives</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearch('')
                setCategoryFilter('')
                setStatusFilter('')
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
                    checked={selectedItems.length === statistics.length && statistics.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statistique
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valeur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ordre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-red-600">
                    Erreur lors du chargement des données
                  </td>
                </tr>
              ) : statistics.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Aucune statistique trouvée
                  </td>
                </tr>
              ) : (
                statistics.map((statistic) => (
                  <tr key={statistic.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(statistic.id)}
                        onChange={(e) => handleSelectItem(statistic.id, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {statistic.icon && (
                          <i className={`mr-3 text-2xl ${statistic.icon}`}></i>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {statistic.name}
                          </div>
                          {statistic.label && (
                            <div className="text-sm text-gray-500">
                              {statistic.label}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-bold text-blue-600">
                        {statistic.value}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {statistic.name || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        statistic.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {statistic.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {statistic.display_order}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/company-statistics/${statistic.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Modifier
                        </Link>
                        <button 
                          onClick={() => handleDelete(statistic.id)}
                          className="text-red-600 hover:text-red-900"
                        >
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