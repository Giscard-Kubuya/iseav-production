"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useApiData, useDebounce } from "@/hooks/useApi";
import { apiRequest, TechnologyPartner } from "@/lib/api";

export default function TechnologyPartnersManagement() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: response, loading, error, refetch } = useApiData<{data: TechnologyPartner[], meta: any}>(
    () => apiRequest.get('/technology-partners', {
      headers: { 'Website-ID': '1' }
    }),
    []
  );

  const partners = response?.data || [];

  // Filter partners locally
  const filteredPartners = useMemo(() => {
    if (!partners) return [];

    return partners.filter((partner) => {
      // Filter by status
      if (filter === "active" && !partner.is_active) return false;
      if (filter === "inactive" && partner.is_active) return false;
      if (filter === "featured" && !partner.is_featured) return false;

      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        return (
          partner.name.toLowerCase().includes(searchLower) ||
          partner.description?.toLowerCase().includes(searchLower) ||
          partner.partnership_type?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [partners, filter, debouncedSearch]);

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce partenaire ?")) {
      try {
        await apiRequest.delete(`/technology-partners/${id}`, {
          headers: { 'Website-ID': '1' }
        });
        refetch();
      } catch (error) {
        console.error("Error deleting partner:", error);
      }
    }
  };

  const handleToggleFeatured = async (id: number) => {
    try {
      await apiRequest.patch(`/technology-partners/${id}/toggle-featured`, {}, {
        headers: { 'Website-ID': '1' }
      });
      refetch();
    } catch (error) {
      console.error("Error toggling featured:", error);
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await apiRequest.patch(`/technology-partners/${id}/toggle-active`, {}, {
        headers: { 'Website-ID': '1' }
      });
      refetch();
    } catch (error) {
      console.error("Error toggling active:", error);
    }
  };

  const getStatusBadge = (partner: TechnologyPartner) => {
    return (
      <div className="flex gap-1">
        {partner.is_active ? (
          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
            Actif
          </span>
        ) : (
          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
            Inactif
          </span>
        )}
        {partner.is_featured && (
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
            Partenaires Technologiques
          </h1>
          <p className="text-gray-600">
            Gérez les partenaires et fournisseurs technologiques
          </p>
        </div>
        <Link
          href="/admin/technology-partners/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Nouveau Partenaire
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">
            {partners.length}
          </div>
          <div className="text-sm text-gray-600">Total Partenaires</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {partners.filter(p => p.is_active).length}
          </div>
          <div className="text-sm text-gray-600">Actifs</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-600">
            {partners.filter(p => p.is_featured).length}
          </div>
          <div className="text-sm text-gray-600">Vedettes</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-purple-600">
            {[...new Set(partners.map(p => p.partnership_type).filter(Boolean))].length}
          </div>
          <div className="text-sm text-gray-600">Types</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher par nom, description, type..."
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
            <option value="all">Tous les partenaires</option>
            <option value="active">Partenaires actifs</option>
            <option value="inactive">Partenaires inactifs</option>
            <option value="featured">Partenaires vedettes</option>
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
                  Partenaire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Site Web
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
              ) : filteredPartners.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Aucun partenaire trouvé
                  </td>
                </tr>
              ) : (
                filteredPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {partner.logo_url && (
                          <img
                            src={partner.logo_url}
                            alt={partner.name}
                            className="h-10 w-10 object-contain mr-3"
                          />
                        )}
                        <div className="text-sm font-medium text-gray-900">
                          {partner.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {partner.description || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {partner.partnership_type || '-'}
                    </td>
                    <td className="px-6 py-4">
                      {partner.website_url ? (
                        <a
                          href={partner.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900 text-sm"
                        >
                          Visiter
                        </a>
                      ) : (
                        <span className="text-gray-500 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(partner)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/admin/technology-partners/${partner.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleToggleFeatured(partner.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          {partner.is_featured ? "Retirer vedette" : "Mettre en vedette"}
                        </button>
                        <button
                          onClick={() => handleToggleActive(partner.id)}
                          className={partner.is_active ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                        >
                          {partner.is_active ? "Désactiver" : "Activer"}
                        </button>
                        <button
                          onClick={() => handleDelete(partner.id)}
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