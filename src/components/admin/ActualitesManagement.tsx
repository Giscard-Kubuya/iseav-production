"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useActualites, useActualiteMutations } from "@/hooks/useActualites";
import { useDebounce } from "@/hooks/useApi";
import { Actualite } from "@/lib/api";

export default function ActualitesManagement() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    data: actualites,
    loading,
    error,
    updateParams,
    refetch,
  } = useActualites();
  const mutations = useActualiteMutations();

  // Filter actualites locally to avoid API loop issues
  const filteredActualites = useMemo(() => {
    if (!actualites) return [];

    return actualites.filter((actualite) => {
      // Filter by category
      if (filter !== "all") {
        if (actualite.category !== filter) return false;
      }

      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        return (
          actualite.title.toLowerCase().includes(searchLower) ||
          actualite.excerpt?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [actualites, filter, debouncedSearch]);

  const displayActualites = filteredActualites;

  const categories = {
    company: "Entreprise",
    projects: "Projets",
    partnerships: "Partenariats",
    events: "Événements",
    awards: "Récompenses",
  };

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette actualité ?")) {
      try {
        await mutations.deleteActualite(id, {
          onSuccess: () => {
            refetch();
          },
        });
      } catch (error) {
        console.error("Error deleting actualite:", error);
      }
    }
  };

  const handleToggleUrgent = async (id: number) => {
    try {
      await mutations.toggleUrgent(id, {
        onSuccess: () => {
          refetch();
        },
      });
    } catch (error) {
      console.error("Error toggling urgent:", error);
    }
  };

  const handleToggleFeatured = async (id: number) => {
    try {
      await mutations.toggleFeatured(id, {
        onSuccess: () => {
          refetch();
        },
      });
    } catch (error) {
      console.error("Error toggling featured:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        Erreur lors du chargement des actualités: {error || error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des Actualités
          </h1>
          <p className="text-gray-600">
            Gérez toutes les actualités et nouvelles de l'entreprise
          </p>
        </div>
        <Link
          href="/admin/actualites/new"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Nouvelle Actualité
        </Link>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher une actualité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">Toutes les catégories</option>
            {Object.entries(categories).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📰</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {actualites?.length || 0}
              </p>
              <p className="text-gray-600">Total Actualités</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🚨</div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {actualites?.filter((a) => a.urgent).length || 0}
              </p>
              <p className="text-gray-600">Urgentes</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">⭐</div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {actualites?.filter((a) => a.featured).length || 0}
              </p>
              <p className="text-gray-600">En vedette</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">👀</div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {actualites?.reduce((sum, a) => sum + a.views, 0) || 0}
              </p>
              <p className="text-gray-600">Total Vues</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">💬</div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {actualites?.reduce(
                  (sum, a) => sum + (a?.comments_count ?? 0),
                  0
                ) || 0}
              </p>
              <p className="text-gray-600">Commentaires</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actualités table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actualité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statistiques
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayActualites &&
                displayActualites.map((actualite) => (
                  <tr key={actualite.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {actualite.title}
                          </div>
                          <div className="flex ml-2 space-x-1">
                            {actualite.urgent && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                🚨 Urgent
                              </span>
                            )}
                            {actualite.featured && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                ⭐ Vedette
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {actualite.author}
                        </div>
                        <div className="text-xs text-gray-400">
                          {actualite.created_at}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {categories[actualite.category]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          actualite.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {actualite.status === "published"
                          ? "Publié"
                          : "Brouillon"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>👀 {actualite.views} vues</div>
                      <div>💬 {actualite.comments_count} commentaires</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col space-y-1">
                        <div className="space-x-2">
                          <Link
                            href={`/actualites/${actualite.id}`}
                            target="_blank"
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Voir
                          </Link>
                          <Link
                            href={`/admin/actualites/${actualite.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Modifier
                          </Link>
                        </div>
                        <div className="space-x-2">
                          <button
                            onClick={() => handleToggleUrgent(actualite.id)}
                            className={`${
                              actualite.urgent ? "text-red-900" : "text-red-600"
                            } hover:text-red-900`}
                          >
                            {actualite.urgent
                              ? "Retirer urgent"
                              : "Marquer urgent"}
                          </button>
                        </div>
                        <div className="space-x-2">
                          <button
                            onClick={() => handleToggleFeatured(actualite.id)}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            {actualite.featured
                              ? "Retirer vedette"
                              : "Mettre en vedette"}
                          </button>
                          <button
                            onClick={() => handleDelete(actualite.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {(!displayActualites || displayActualites.length === 0) && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Aucune actualité trouvée</div>
          <p className="text-gray-400 mt-2">
            {searchTerm
              ? "Essayez un autre terme de recherche"
              : "Commencez par créer votre première actualité"}
          </p>
        </div>
      )}
    </div>
  );
}
