"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useApiData, useDebounce } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";

interface CompanyValue {
  id: number
  title: string
  description: string
  detailed_description: string
  icon: string
  image_url: string
  display_order: number
  is_active: boolean
  color: string
  created_at: string
  updated_at: string
}

export default function CompanyValuesManagement() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: response, loading, error, refetch } = useApiData<{success: boolean, data: CompanyValue[]}>(
    () => apiRequest.get('/company-values', {
      headers: { 'Website-ID': '1' }
    }),
    []
  );

  const values = response?.data || [];

  // Filter values locally
  const filteredValues = useMemo(() => {
    if (!values) return [];

    return values.filter((value) => {
      // Filter by status
      if (filter === "active" && !value.is_active) return false;
      if (filter === "inactive" && value.is_active) return false;

      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        return (
          value.title.toLowerCase().includes(searchLower) ||
          value.description?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [values, filter, debouncedSearch]);

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette valeur ?")) {
      try {
        await apiRequest.delete(`/company-values/${id}`, {
          headers: { 'Website-ID': '1' }
        });
        refetch();
      } catch (error) {
        console.error("Error deleting value:", error);
      }
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await apiRequest.patch(`/company-values/${id}/toggle-active`, {}, {
        headers: { 'Website-ID': '1' }
      });
      refetch();
    } catch (error) {
      console.error("Error toggling active:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nos Valeurs</h1>
          <p className="text-gray-600">Gérez les valeurs de l'entreprise</p>
        </div>
        <Link
          href="/admin/company-values/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nouvelle Valeur
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">
            {values.length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Total Valeurs</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {values.filter(v => v.is_active).length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Valeurs Actives</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher par titre, description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Toutes les valeurs</option>
            <option value="active">Valeurs actives</option>
            <option value="inactive">Valeurs inactives</option>
          </select>
        </div>
      </div>

      {/* Grid View */}
      <div className="bg-white rounded-lg shadow p-6">
        {error ? (
          <div className="text-center py-12 text-red-600">
            Erreur lors du chargement des données
          </div>
        ) : filteredValues.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Aucune valeur trouvée
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredValues.map((value) => (
              <div key={value.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    {value.icon && (
                      <span className="text-3xl mr-3">{value.icon}</span>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {value.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {value.is_active ? (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            Actif
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                            Inactif
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          Ordre: {value.display_order}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {value.description}
                </p>

                <div className="flex justify-between items-center space-x-2">
                  <Link
                    href={`/admin/company-values/${value.id}/edit`}
                    className="text-blue-600 hover:text-blue-900 text-sm"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleToggleActive(value.id)}
                    className={`text-sm ${
                      value.is_active ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"
                    }`}
                  >
                    {value.is_active ? "Désactiver" : "Activer"}
                  </button>
                  <button
                    onClick={() => handleDelete(value.id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}