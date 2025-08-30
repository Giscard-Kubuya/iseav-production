'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useServices, useServiceMutations } from '@/hooks/useServices'
import { useDebounce, useApiData } from '@/hooks/useApi'
import { servicesApi } from '@/lib/api-services'
import { Service } from '@/lib/api'

export default function ServicesManagement() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const debouncedSearch = useDebounce(search, 300)

  const { data: services, loading, error, refetch } = useServices()
  const { data: stats } = useApiData(() => servicesApi.getStats())
  const mutations = useServiceMutations()

  // Filter services locally
  const filteredServices = useMemo(() => {
    if (!services) return [];

    return services.filter((service) => {
      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        if (
          !(service.title && service.title.toLowerCase().includes(searchLower)) &&
          !(service.name && service.name.toLowerCase().includes(searchLower)) &&
          !service.description.toLowerCase().includes(searchLower) &&
          !(service.category && service.category.toLowerCase().includes(searchLower))
        ) {
          return false;
        }
      }

      // Filter by category
      if (categoryFilter && service.category !== categoryFilter) {
        return false;
      }

      // Filter by status
      if (statusFilter === 'active' && !service.is_active) {
        return false;
      }
      if (statusFilter === 'inactive' && service.is_active) {
        return false;
      }

      return true;
    });
  }, [services, debouncedSearch, categoryFilter, statusFilter])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredServices.map(item => item.id))
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
      year: 'numeric'
    })
  }

  const formatPrice = (price: number | string | null | undefined, unit: string) => {
    if (!price || price === 0 || price === '0' || price === null || price === undefined) return 'Sur devis'
    const numPrice = typeof price === 'string' ? parseFloat(price) : price
    return `${numPrice.toLocaleString('fr-FR')} €${unit ? ' / ' + unit : ''}`
  }

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le service "${name}" ?`)) {
      try {
        await mutations.deleteService(id, {
          onSuccess: () => {
            refetch()
          }
        })
      } catch (error) {
        console.error('Error deleting service:', error)
        alert('Erreur lors de la suppression du service')
      }
    }
  }

  const handleToggleActive = async (id: number) => {
    try {
      await mutations.toggleActive(id, {
        onSuccess: () => {
          refetch()
        }
      })
    } catch (error) {
      console.error('Error toggling active status:', error)
      alert('Erreur lors de la modification du statut')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600">Gérez vos services et expertises</p>
        </div>
        <Link
          href="/admin/services/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nouveau Service
        </Link>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">
                {stats?.data?.total_services}
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Services</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-green-600">
                {stats?.data?.active_services}
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-1">Services Actifs</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats?.data?.featured_services}
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-1">Services Vedettes</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats?.data?.categories}
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-1">Catégories</div>
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
              placeholder="Nom, description..."
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
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
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
                    checked={selectedItems.length === filteredServices.length && filteredServices.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Créé le
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
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Aucun service trouvé
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(service.id)}
                        onChange={(e) => handleSelectItem(service.id, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {service.icon && (
                          <span className="mr-3 text-2xl">{service.icon}</span>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {service.title || service.name}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-2">
                            {service.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {service.category || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatPrice(service.starting_price, service.price_unit || '')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          service.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {service.is_active ? 'Actif' : 'Inactif'}
                        </span>
                        {service.is_featured && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Vedette
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(service.created_at)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/services/${service.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Modifier
                        </Link>
                        <button 
                          onClick={() => handleDelete(service.id, service.title || service.name)}
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