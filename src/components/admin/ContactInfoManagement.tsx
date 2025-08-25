'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useApiData } from '@/hooks/useApi'
import { contactInformationApi } from '@/lib/api-services'
import { ContactInfo } from '@/lib/api'

export default function ContactInfoManagement() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  // Fetch contact information from API
  const { data: contactResponse, loading, error } = useApiData(
    () => contactInformationApi.getAll(),
    []
  )

  const allContacts = contactResponse?.data || []
  
  // Filter contacts based on search and filters
  const contacts = allContacts.filter(contact => {
    const matchesSearch = !search || 
      contact.label.toLowerCase().includes(search.toLowerCase()) ||
      contact.value.toLowerCase().includes(search.toLowerCase()) ||
      contact.description?.toLowerCase().includes(search.toLowerCase())
    
    const matchesType = !typeFilter || contact.type === typeFilter
    
    const matchesStatus = !statusFilter || 
      (statusFilter === 'public' && contact.is_public) ||
      (statusFilter === 'private' && !contact.is_public) ||
      (statusFilter === 'primary' && contact.is_primary)
    
    return matchesSearch && matchesType && matchesStatus
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(contacts.map(item => item.id))
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
    if (confirm('Êtes-vous sûr de vouloir supprimer cette information de contact ?')) {
      try {
        await contactInformationApi.delete(id)
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

  const getTypeColor = (type: string) => {
    const colors = {
      phone: 'bg-green-100 text-green-800',
      email: 'bg-blue-100 text-blue-800',
      address: 'bg-purple-100 text-purple-800',
      fax: 'bg-gray-100 text-gray-800',
      website: 'bg-orange-100 text-orange-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Informations de Contact</h1>
          <p className="text-gray-600">Gérez les coordonnées de contact de l'entreprise</p>
        </div>
        <Link
          href="/admin/contact-info/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nouvelle Information
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">
            {allContacts.length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Total Informations</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {allContacts.filter(c => c.is_public).length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Publiques</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-600">
            {allContacts.filter(c => c.is_primary).length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Principales</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-purple-600">
            {[...new Set(allContacts.map(c => c.type))].length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Types</div>
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
              placeholder="Libellé, valeur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              id="type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tous les types</option>
              <option value="phone">Téléphone</option>
              <option value="email">Email</option>
              <option value="address">Adresse</option>
              <option value="fax">Fax</option>
              <option value="website">Site web</option>
            </select>
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
              <option value="public">Publiques</option>
              <option value="private">Privées</option>
              <option value="primary">Principales</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearch('')
                setTypeFilter('')
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
                    checked={selectedItems.length === contacts.length && contacts.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valeur
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
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Aucune information de contact trouvée
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(contact.id)}
                        onChange={(e) => handleSelectItem(contact.id, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {contact.icon && (
                          <i className={`mr-3 text-xl ${contact.icon}`}></i>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {contact.label}
                          </div>
                          {contact.description && (
                            <div className="text-sm text-gray-500">
                              {contact.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(contact.type)}`}>
                        {contact.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {contact.type === 'email' ? (
                        <a href={`mailto:${contact.value}`} className="text-blue-600 hover:text-blue-900">
                          {contact.value}
                        </a>
                      ) : contact.type === 'phone' ? (
                        <a href={`tel:${contact.value}`} className="text-blue-600 hover:text-blue-900">
                          {contact.value}
                        </a>
                      ) : contact.type === 'website' ? (
                        <a href={contact.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900">
                          {contact.value}
                        </a>
                      ) : (
                        contact.value
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {contact.is_primary && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Principal
                          </span>
                        )}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          contact.is_public 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {contact.is_public ? 'Public' : 'Privé'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {contact.display_order}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/contact-info/${contact.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Modifier
                        </Link>
                        <button 
                          onClick={() => handleDelete(contact.id)}
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