"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useApiData, useDebounce } from "@/hooks/useApi";
import { apiRequest, HeroSlide } from "@/lib/api";

export default function HeroSlidesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: response, loading, error, refetch } = useApiData<{data: HeroSlide[]}>(
    () => apiRequest.get('/hero-slides', {
      headers: { 'Website-ID': '1' }
    }),
    []
  );
  
  const slides = response?.data || [];

  // Filter slides locally
  const filteredSlides = useMemo(() => {
    if (!slides) return [];

    return slides.filter((slide) => {
      // Filter by status
      if (filter === "active" && !slide.is_active) return false;
      if (filter === "inactive" && slide.is_active) return false;

      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        return (
          slide.title.toLowerCase().includes(searchLower) ||
          slide.subtitle?.toLowerCase().includes(searchLower) ||
          slide.description.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [slides, filter, debouncedSearch]);

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette diapositive ?")) {
      try {
        await apiRequest.delete(`/hero-slides/${id}`, {
          headers: { 'Website-ID': '1' }
        });
        refetch();
      } catch (error) {
        console.error("Error deleting slide:", error);
      }
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await apiRequest.patch(`/hero-slides/${id}/toggle-active`, {}, {
        headers: { 'Website-ID': '1' }
      });
      refetch();
    } catch (error) {
      console.error("Error toggling slide status:", error);
    }
  };

  const getStatusBadge = (is_active: boolean | string | number) => {
    const isActive = is_active === true || is_active === 1 || is_active === '1';
    return isActive ? (
      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
        Actif
      </span>
    ) : (
      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
        Inactif
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        Erreur lors du chargement des diapositives: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des Diapositives Hero
          </h1>
          <p className="text-gray-600">
            Gérez les diapositives de la section hero de votre site
          </p>
        </div>
        <Link
          href="/admin/hero-slides/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nouvelle Diapositive
        </Link>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher une diapositive..."
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
            <option value="all">Tous les statuts</option>
            <option value="active">Actives</option>
            <option value="inactive">Inactives</option>
          </select>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🖼️</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {slides?.length || 0}
              </p>
              <p className="text-gray-600">Total Diapositives</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">✅</div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {slides?.filter((s) => s.is_active).length || 0}
              </p>
              <p className="text-gray-600">Actives</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📋</div>
            <div>
              <p className="text-2xl font-bold text-gray-600">
                {slides?.filter((s) => !s.is_active).length || 0}
              </p>
              <p className="text-gray-600">Inactives</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slides table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Diapositive
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ordre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date de création
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSlides.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  <div className="text-4xl mb-4">📭</div>
                  <div className="text-lg font-medium mb-2">Aucune diapositive trouvée</div>
                  <div className="text-sm">
                    {searchTerm || filter !== "all"
                      ? "Aucune diapositive ne correspond à vos critères de recherche"
                      : "Commencez par créer votre première diapositive"}
                  </div>
                </td>
              </tr>
            ) : (
              filteredSlides.map((slide) => (
                <tr key={slide.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-24">
                        {slide.image_url && (
                          <img
                            className="h-16 w-24 object-cover rounded-lg"
                            src={slide.image_url}
                            alt={slide.title}
                          />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {slide.title}
                        </div>
                        {slide.subtitle && (
                          <div className="text-sm text-gray-500">
                            {slide.subtitle}
                          </div>
                        )}
                        <div className="text-xs text-gray-400 mt-1 max-w-md truncate">
                          {slide.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(slide.is_active)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {slide.display_order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(slide.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleToggleActive(slide.id)}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                      >
                        {(slide.is_active === true || slide.is_active === 1 || slide.is_active === '1') ? "Désactiver" : "Activer"}
                      </button>
                      <Link
                        href={`/admin/hero-slides/${slide.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 text-sm"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => handleDelete(slide.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
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