"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useApiData, useDebounce } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";

interface WhyChooseUsItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  statistics: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function WhyChooseUsManagement() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: response, loading, error, refetch } = useApiData<{success: boolean, data: WhyChooseUsItem[]}>(
    () => apiRequest.get('/why-choose-us', {
      headers: { 'Website-ID': '1' }
    }),
    []
  );

  const items = response?.data || [];

  // Filter items locally
  const filteredItems = useMemo(() => {
    if (!items) return [];

    return items.filter((item) => {
      // Filter by status
      if (filter === "active" && !item.is_active) return false;
      if (filter === "inactive" && item.is_active) return false;

      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        return (
          item.title.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [items, filter, debouncedSearch]);

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce point fort ?")) {
      try {
        await apiRequest.delete(`/why-choose-us/${id}`, {
          headers: { 'Website-ID': '1' }
        });
        refetch();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await apiRequest.patch(`/why-choose-us/${id}/toggle-active`, {}, {
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
          <h1 className="text-2xl font-bold text-gray-900">
            Pourquoi Nous Choisir
          </h1>
          <p className="text-gray-600">
            Gérez les avantages et points forts de l'entreprise
          </p>
        </div>
        <Link
          href="/admin/why-choose-us/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Nouveau Point Fort
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">
            {items.length}
          </div>
          <div className="text-sm text-gray-600">Total Points Forts</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {items.filter(i => i.is_active).length}
          </div>
          <div className="text-sm text-gray-600">Actifs</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-600">
            {items.reduce((sum, item) => sum + (item.benefits?.length || 0), 0)}
          </div>
          <div className="text-sm text-gray-600">Total Avantages</div>
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
            <option value="all">Tous les points forts</option>
            <option value="active">Points forts actifs</option>
            <option value="inactive">Points forts inactifs</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Point Fort
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avantages
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {error ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-red-600">
                    Erreur lors du chargement des données
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Aucun point fort trouvé
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {item.icon && (
                          <span className="mr-3 text-2xl">{item.icon}</span>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            Ordre: {item.display_order}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {item.description || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.benefits?.length ? `${item.benefits.length} avantages` : '-'}
                    </td>
                    <td className="px-6 py-4">
                      {item.is_active ? (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Actif
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                          Inactif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/admin/why-choose-us/${item.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleToggleActive(item.id)}
                          className={item.is_active ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                        >
                          {item.is_active ? "Désactiver" : "Activer"}
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
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
  );
}