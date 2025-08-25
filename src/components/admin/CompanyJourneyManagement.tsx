"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useApiData, useDebounce } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";

interface CompanyJourneyStep {
  id: number;
  title: string;
  year: number;
  description: string;
  achievements: string;
  milestone_type: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function CompanyJourneyManagement() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: response, loading, error, refetch } = useApiData<{success: boolean, data: CompanyJourneyStep[]}>(
    () => apiRequest.get('/company-journey', {
      headers: { 'Website-ID': '1' }
    }),
    []
  );

  const steps = response?.data || [];

  // Filter steps locally
  const filteredSteps = useMemo(() => {
    if (!steps) return [];

    return steps.filter((step) => {
      // Filter by status
      if (filter === "active" && !step.is_active) return false;
      if (filter === "inactive" && step.is_active) return false;

      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        return (
          step.title.toLowerCase().includes(searchLower) ||
          step.description?.toLowerCase().includes(searchLower) ||
          step.milestone_type?.toLowerCase().includes(searchLower) ||
          step.year.toString().includes(searchLower)
        );
      }

      return true;
    });
  }, [steps, filter, debouncedSearch]);

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette étape ?")) {
      try {
        await apiRequest.delete(`/company-journey/${id}`, {
          headers: { 'Website-ID': '1' }
        });
        refetch();
      } catch (error) {
        console.error("Error deleting step:", error);
      }
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await apiRequest.patch(`/company-journey/${id}/toggle-active`, {}, {
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
            Notre Parcours
          </h1>
          <p className="text-gray-600">
            Gérez l'histoire et les étapes importantes de l'entreprise
          </p>
        </div>
        <Link
          href="/admin/company-journey/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Nouvelle Étape
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">
            {steps.length}
          </div>
          <div className="text-sm text-gray-600">Total Étapes</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {steps.filter(s => s.is_active).length}
          </div>
          <div className="text-sm text-gray-600">Actives</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-600">
            {steps.length > 0 ? Math.min(...steps.map(s => s.year)) : 0}
          </div>
          <div className="text-sm text-gray-600">Année Début</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-purple-600">
            {[...new Set(steps.map(s => s.milestone_type).filter(Boolean))].length}
          </div>
          <div className="text-sm text-gray-600">Types d'Étapes</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher par titre, description, année..."
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
            <option value="all">Toutes les étapes</option>
            <option value="active">Étapes actives</option>
            <option value="inactive">Étapes inactives</option>
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
                  Étape
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Année
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
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
              ) : filteredSteps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Aucune étape trouvée
                  </td>
                </tr>
              ) : (
                filteredSteps.map((step) => (
                  <tr key={step.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {step.image_url && (
                          <img
                            src={step.image_url}
                            alt={step.title}
                            className="h-10 w-10 rounded mr-3 object-cover"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {step.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            Ordre: {step.display_order}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-2xl font-bold text-blue-600">
                        {step.year}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {step.milestone_type || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {step.description || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {step.is_active ? (
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
                          href={`/admin/company-journey/${step.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleToggleActive(step.id)}
                          className={step.is_active ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                        >
                          {step.is_active ? "Désactiver" : "Activer"}
                        </button>
                        <button
                          onClick={() => handleDelete(step.id)}
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