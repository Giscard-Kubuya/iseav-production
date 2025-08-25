"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useApiData, useDebounce } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";

interface LeadershipMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  email: string;
  phone: string;
  linkedin_url: string;
  experience_years: number;
  display_order: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export default function LeadershipManagement() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: response, loading, error, refetch } = useApiData<{success: boolean, data: LeadershipMember[]}>(
    () => apiRequest.get('/leadership', {
      headers: { 'Website-ID': '1' }
    }),
    []
  );

  const leaders = response?.data || [];

  // Filter leaders locally
  const filteredLeaders = useMemo(() => {
    if (!leaders) return [];

    return leaders.filter((leader) => {
      // Filter by status
      if (filter === "active" && !leader.is_active) return false;
      if (filter === "inactive" && leader.is_active) return false;
      if (filter === "featured" && !leader.is_featured) return false;

      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        return (
          leader.name.toLowerCase().includes(searchLower) ||
          leader.position.toLowerCase().includes(searchLower) ||
          leader.bio?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [leaders, filter, debouncedSearch]);

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce dirigeant ?")) {
      try {
        await apiRequest.delete(`/leadership/${id}`, {
          headers: { 'Website-ID': '1' }
        });
        refetch();
      } catch (error) {
        console.error("Error deleting leader:", error);
      }
    }
  };

  const handleToggleFeatured = async (id: number) => {
    try {
      await apiRequest.patch(`/leadership/${id}/toggle-featured`, {}, {
        headers: { 'Website-ID': '1' }
      });
      refetch();
    } catch (error) {
      console.error("Error toggling featured:", error);
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await apiRequest.patch(`/leadership/${id}/toggle-active`, {}, {
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
            Équipe Dirigeante
          </h1>
          <p className="text-gray-600">
            Gérez les membres de l'équipe dirigeante
          </p>
        </div>
        <Link
          href="/admin/leadership/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Nouveau Dirigeant
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">
            {leaders.length}
          </div>
          <div className="text-sm text-gray-600">Total Dirigeants</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {leaders.filter(l => l.is_active).length}
          </div>
          <div className="text-sm text-gray-600">Actifs</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-600">
            {leaders.filter(l => l.is_featured).length}
          </div>
          <div className="text-sm text-gray-600">Vedettes</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-purple-600">
            {leaders.length > 0 
              ? Math.round(leaders.reduce((sum, l) => sum + (l.experience_years || 0), 0) / leaders.length)
              : 0
            }
          </div>
          <div className="text-sm text-gray-600">Exp. Moyenne (ans)</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher par nom, poste, bio..."
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
            <option value="all">Tous les dirigeants</option>
            <option value="active">Dirigeants actifs</option>
            <option value="inactive">Dirigeants inactifs</option>
            <option value="featured">Dirigeants vedettes</option>
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
                  Dirigeant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Poste
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
                  <td colSpan={5} className="px-6 py-12 text-center text-red-600">
                    Erreur lors du chargement des données
                  </td>
                </tr>
              ) : filteredLeaders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Aucun dirigeant trouvé
                  </td>
                </tr>
              ) : (
                filteredLeaders.map((leader) => (
                  <tr key={leader.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {leader.image_url && (
                          <img
                            src={leader.image_url}
                            alt={leader.name}
                            className="h-10 w-10 rounded-full mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {leader.name}
                          </div>
                          {leader.email && (
                            <div className="text-sm text-gray-500">
                              {leader.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {leader.position}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {leader.experience_years ? `${leader.experience_years} ans` : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {leader.is_active ? (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            Actif
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                            Inactif
                          </span>
                        )}
                        {leader.is_featured && (
                          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                            Vedette
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/admin/leadership/${leader.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleToggleFeatured(leader.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          {leader.is_featured ? "Retirer vedette" : "Mettre en vedette"}
                        </button>
                        <button
                          onClick={() => handleToggleActive(leader.id)}
                          className={leader.is_active ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                        >
                          {leader.is_active ? "Désactiver" : "Activer"}
                        </button>
                        <button
                          onClick={() => handleDelete(leader.id)}
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