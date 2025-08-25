"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useApiData, useDebounce } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";

interface SocialMedia {
  id: number;
  platform: string;
  name: string;
  url: string;
  username: string;
  icon: string;
  color: string;
  followers_count: number;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function SocialMediaManagement() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: response, loading, error, refetch } = useApiData<{success: boolean, data: SocialMedia[]}>(
    () => apiRequest.get('/social-media', {
      headers: { 'Website-ID': '1' }
    }),
    []
  );

  const socialMedia = response?.data || [];

  // Filter social media locally
  const filteredSocialMedia = useMemo(() => {
    if (!socialMedia) return [];

    return socialMedia.filter((media) => {
      // Filter by status
      if (filter === "active" && !media.is_active) return false;
      if (filter === "inactive" && media.is_active) return false;

      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        return (
          media.platform.toLowerCase().includes(searchLower) ||
          media.name.toLowerCase().includes(searchLower) ||
          media.username?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [socialMedia, filter, debouncedSearch]);

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce réseau social ?")) {
      try {
        await apiRequest.delete(`/social-media/${id}`, {
          headers: { 'Website-ID': '1' }
        });
        refetch();
      } catch (error) {
        console.error("Error deleting social media:", error);
      }
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await apiRequest.patch(`/social-media/${id}/toggle-active`, {}, {
        headers: { 'Website-ID': '1' }
      });
      refetch();
    } catch (error) {
      console.error("Error toggling active:", error);
    }
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
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
            Réseaux Sociaux
          </h1>
          <p className="text-gray-600">
            Gérez les liens vers les réseaux sociaux de l'entreprise
          </p>
        </div>
        <Link
          href="/admin/social-media/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Nouveau Réseau
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">
            {socialMedia.length}
          </div>
          <div className="text-sm text-gray-600">Total Réseaux</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {socialMedia.filter(s => s.is_active).length}
          </div>
          <div className="text-sm text-gray-600">Actifs</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-600">
            {socialMedia.reduce((sum, s) => sum + (s.followers_count || 0), 0) > 0 
              ? formatFollowers(socialMedia.reduce((sum, s) => sum + (s.followers_count || 0), 0))
              : '0'
            }
          </div>
          <div className="text-sm text-gray-600">Total Abonnés</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-purple-600">
            {[...new Set(socialMedia.map(s => s.platform).filter(Boolean))].length}
          </div>
          <div className="text-sm text-gray-600">Plateformes</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher par plateforme, nom, username..."
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
            <option value="all">Tous les réseaux</option>
            <option value="active">Réseaux actifs</option>
            <option value="inactive">Réseaux inactifs</option>
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
                  Réseau Social
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Abonnés
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
              ) : filteredSocialMedia.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Aucun réseau social trouvé
                  </td>
                </tr>
              ) : (
                filteredSocialMedia.map((media) => (
                  <tr key={media.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {media.icon && (
                          <span 
                            className="mr-3 text-2xl"
                            style={{ color: media.color }}
                          >
                            {media.icon}
                          </span>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {media.name || media.platform}
                          </div>
                          <div className="text-sm text-gray-500">
                            {media.platform}
                          </div>
                          <div className="text-sm text-gray-500">
                            Ordre: {media.display_order}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {media.username ? (
                        <div className="text-sm text-gray-900">
                          @{media.username}
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {media.followers_count > 0 ? (
                        <div className="text-sm font-medium text-blue-600">
                          {formatFollowers(media.followers_count)}
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {media.is_active ? (
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
                        {media.url && (
                          <a
                            href={media.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-900"
                          >
                            Visiter
                          </a>
                        )}
                        <Link
                          href={`/admin/social-media/${media.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleToggleActive(media.id)}
                          className={media.is_active ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                        >
                          {media.is_active ? "Désactiver" : "Activer"}
                        </button>
                        <button
                          onClick={() => handleDelete(media.id)}
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