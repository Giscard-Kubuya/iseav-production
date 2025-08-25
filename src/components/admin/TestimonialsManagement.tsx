"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useApiData, useDebounce } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";

interface Testimonial {
  id: number
  client_name: string
  client_position: string
  client_company: string
  content: string
  rating: number
  client_photo_url: string
  project_type: string
  is_featured: boolean
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export default function TestimonialsManagement() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: response, loading, error, refetch } = useApiData<{success: boolean, data: Testimonial[]}>(
    () => apiRequest.get('/testimonials', {
      headers: { 'Website-ID': '1' }
    }),
    []
  );

  const testimonials = response?.data || [];

  // Filter testimonials locally
  const filteredTestimonials = useMemo(() => {
    if (!testimonials) return [];

    return testimonials.filter((testimonial) => {
      // Filter by status
      if (filter === "active" && !testimonial.is_active) return false;
      if (filter === "inactive" && testimonial.is_active) return false;
      if (filter === "featured" && !testimonial.is_featured) return false;

      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        return (
          testimonial.client_name.toLowerCase().includes(searchLower) ||
          testimonial.client_company.toLowerCase().includes(searchLower) ||
          testimonial.content.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [testimonials, filter, debouncedSearch]);

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) {
      try {
        await apiRequest.delete(`/testimonials/${id}`, {
          headers: { 'Website-ID': '1' }
        });
        refetch();
      } catch (error) {
        console.error("Error deleting testimonial:", error);
      }
    }
  };

  const handleToggleFeatured = async (id: number) => {
    try {
      await apiRequest.patch(`/testimonials/${id}/toggle-featured`, {}, {
        headers: { 'Website-ID': '1' }
      });
      refetch();
    } catch (error) {
      console.error("Error toggling featured:", error);
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await apiRequest.patch(`/testimonials/${id}/toggle-active`, {}, {
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Témoignages Clients</h1>
          <p className="text-gray-600">Gérez les témoignages et avis clients</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nouveau Témoignage
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">
            {testimonials.length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Total Témoignages</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {testimonials.filter(t => t.is_active).length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Actifs</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-600">
            {testimonials.filter(t => t.is_featured).length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Mis en avant</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-yellow-600">
            {testimonials.length > 0 
              ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
              : '0'
            }
          </div>
          <div className="text-sm text-gray-600 mt-1">Note Moyenne</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher par nom, entreprise, contenu..."
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
            <option value="all">Tous les témoignages</option>
            <option value="active">Témoignages actifs</option>
            <option value="inactive">Témoignages inactifs</option>
            <option value="featured">Témoignages vedettes</option>
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
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Témoignage
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
              ) : filteredTestimonials.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Aucun témoignage trouvé
                  </td>
                </tr>
              ) : (
                filteredTestimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {testimonial.client_photo_url && (
                          <img
                            src={testimonial.client_photo_url}
                            alt={testimonial.client_name}
                            className="h-10 w-10 rounded-full mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {testimonial.client_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {testimonial.client_position}
                          </div>
                          <div className="text-sm text-gray-500">
                            {testimonial.client_company}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {renderStars(testimonial.rating)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {testimonial.content}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {testimonial.is_active ? (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            Actif
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                            Inactif
                          </span>
                        )}
                        {testimonial.is_featured && (
                          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                            Vedette
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/admin/testimonials/${testimonial.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleToggleFeatured(testimonial.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          {testimonial.is_featured ? "Retirer vedette" : "Mettre en vedette"}
                        </button>
                        <button
                          onClick={() => handleToggleActive(testimonial.id)}
                          className={testimonial.is_active ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                        >
                          {testimonial.is_active ? "Désactiver" : "Activer"}
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
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