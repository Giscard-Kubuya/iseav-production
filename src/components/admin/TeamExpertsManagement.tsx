"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useApiData, useDebounce } from "@/hooks/useApi";
import { apiRequest, TeamExpert } from "@/lib/api";

export default function TeamExpertsManagement() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: response, loading, error, refetch } = useApiData<{success: boolean, data: TeamExpert[]}>(
    () => apiRequest.get('/team-experts', {
      headers: { 'Website-ID': '1' }
    }),
    []
  );

  const experts = response?.data || [];

  // Filter experts locally
  const filteredExperts = useMemo(() => {
    if (!experts) return [];

    return experts.filter((expert) => {
      // Filter by status
      if (filter === "active" && !expert.is_active) return false;
      if (filter === "inactive" && expert.is_active) return false;
      if (filter === "featured" && !expert.is_featured) return false;

      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        return (
          expert.name.toLowerCase().includes(searchLower) ||
          expert.position.toLowerCase().includes(searchLower) ||
          expert.department?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [experts, filter, debouncedSearch]);

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet expert ?")) {
      try {
        await apiRequest.delete(`/team-experts/${id}`, {
          headers: { 'Website-ID': '1' }
        });
        refetch();
      } catch (error) {
        console.error("Error deleting expert:", error);
      }
    }
  };

  const handleToggleFeatured = async (id: number) => {
    try {
      await apiRequest.patch(`/team-experts/${id}/toggle-featured`, {}, {
        headers: { 'Website-ID': '1' }
      });
      refetch();
    } catch (error) {
      console.error("Error toggling featured:", error);
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await apiRequest.patch(`/team-experts/${id}/toggle-active`, {}, {
        headers: { 'Website-ID': '1' }
      });
      refetch();
    } catch (error) {
      console.error("Error toggling active:", error);
    }
  };

  const getStatusBadge = (expert: TeamExpert) => {
    return (
      <div className="flex gap-1">
        {expert.is_active ? (
          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
            Actif
          </span>
        ) : (
          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
            Inactif
          </span>
        )}
        {expert.is_featured && (
          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
            Vedette
          </span>
        )}
      </div>
    );
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
            Équipe d'Experts IT
          </h1>
          <p className="text-gray-600">
            Gérez les membres de l'équipe technique
          </p>
        </div>
        <Link
          href="/admin/team-experts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Nouvel Expert
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">
            {experts.length}
          </div>
          <div className="text-sm text-gray-600">Total Experts</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {experts.filter(e => e.is_active).length}
          </div>
          <div className="text-sm text-gray-600">Actifs</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-600">
            {experts.filter(e => e.is_featured).length}
          </div>
          <div className="text-sm text-gray-600">Vedettes</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-purple-600">
            {[...new Set(experts.map(e => e.department).filter(Boolean))].length}
          </div>
          <div className="text-sm text-gray-600">Départements</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher par nom, poste, département..."
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
            <option value="all">Tous les experts</option>
            <option value="active">Experts actifs</option>
            <option value="inactive">Experts inactifs</option>
            <option value="featured">Experts vedettes</option>
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
                  Expert
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Poste
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Département
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expérience
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
                  <td colSpan={6} className="px-6 py-12 text-center text-red-600">
                    Erreur lors du chargement des données
                  </td>
                </tr>
              ) : filteredExperts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Aucun expert trouvé
                  </td>
                </tr>
              ) : (
                filteredExperts.map((expert) => (
                  <tr key={expert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {expert.image_url && (
                          <img
                            src={expert.image_url}
                            alt={expert.name}
                            className="h-10 w-10 rounded-full mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {expert.name}
                          </div>
                          {expert.email && (
                            <div className="text-sm text-gray-500">
                              {expert.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {expert.position}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {expert.department || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {expert.experience_years ? `${expert.experience_years} ans` : '-'}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(expert)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/admin/team-experts/${expert.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleToggleFeatured(expert.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          {expert.is_featured ? "Retirer vedette" : "Mettre en vedette"}
                        </button>
                        <button
                          onClick={() => handleToggleActive(expert.id)}
                          className={expert.is_active ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                        >
                          {expert.is_active ? "Désactiver" : "Activer"}
                        </button>
                        <button
                          onClick={() => handleDelete(expert.id)}
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