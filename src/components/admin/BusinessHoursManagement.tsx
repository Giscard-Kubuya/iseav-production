"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useApiData, useDebounce } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";

interface BusinessHour {
  id: number;
  day_of_week: string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
  is_active: boolean;
  special_note: string;
  created_at: string;
  updated_at: string;
}

export default function BusinessHoursManagement() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: response, loading, error, refetch } = useApiData<{success: boolean, data: BusinessHour[]}>(
    () => apiRequest.get('/business-hours', {
      headers: { 'Website-ID': '1' }
    }),
    []
  );

  const hours = response?.data || [];

  // Filter hours locally
  const filteredHours = useMemo(() => {
    if (!hours) return [];

    return hours.filter((hour) => {
      // Filter by status
      if (filter === "open" && hour.is_closed) return false;
      if (filter === "closed" && !hour.is_closed) return false;
      if (filter === "active" && !hour.is_active) return false;
      if (filter === "inactive" && hour.is_active) return false;

      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        return (
          hour.day_of_week.toLowerCase().includes(searchLower) ||
          hour.special_note?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [hours, filter, debouncedSearch]);

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet horaire ?")) {
      try {
        await apiRequest.delete(`/business-hours/${id}`, {
          headers: { 'Website-ID': '1' }
        });
        refetch();
      } catch (error) {
        console.error("Error deleting hour:", error);
      }
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await apiRequest.patch(`/business-hours/${id}/toggle-active`, {}, {
        headers: { 'Website-ID': '1' }
      });
      refetch();
    } catch (error) {
      console.error("Error toggling active:", error);
    }
  };

  const formatTime = (time: string) => {
    if (!time) return '-';
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDayName = (day: string) => {
    const days = {
      'monday': 'Lundi',
      'tuesday': 'Mardi', 
      'wednesday': 'Mercredi',
      'thursday': 'Jeudi',
      'friday': 'Vendredi',
      'saturday': 'Samedi',
      'sunday': 'Dimanche'
    };
    return days[day as keyof typeof days] || day;
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
            Heures d'Ouverture
          </h1>
          <p className="text-gray-600">
            Gérez les horaires d'ouverture de l'entreprise
          </p>
        </div>
        <Link
          href="/admin/business-hours/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Nouveau Horaire
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">
            {hours.length}
          </div>
          <div className="text-sm text-gray-600">Total Horaires</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {hours.filter(h => !h.is_closed && h.is_active).length}
          </div>
          <div className="text-sm text-gray-600">Jours Ouverts</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-red-600">
            {hours.filter(h => h.is_closed).length}
          </div>
          <div className="text-sm text-gray-600">Jours Fermés</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-600">
            {hours.filter(h => h.is_active).length}
          </div>
          <div className="text-sm text-gray-600">Actifs</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher par jour, note spéciale..."
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
            <option value="all">Tous les horaires</option>
            <option value="open">Jours ouverts</option>
            <option value="closed">Jours fermés</option>
            <option value="active">Horaires actifs</option>
            <option value="inactive">Horaires inactifs</option>
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
                  Jour
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horaires
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note Spéciale
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
              ) : filteredHours.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Aucun horaire trouvé
                  </td>
                </tr>
              ) : (
                filteredHours.map((hour) => (
                  <tr key={hour.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {getDayName(hour.day_of_week)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {hour.is_closed ? (
                        <span className="text-red-600 font-medium">Fermé</span>
                      ) : (
                        <div className="text-sm text-gray-900">
                          {formatTime(hour.open_time)} - {formatTime(hour.close_time)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {hour.special_note || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {hour.is_active ? (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            Actif
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                            Inactif
                          </span>
                        )}
                        {hour.is_closed && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                            Fermé
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/admin/business-hours/${hour.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleToggleActive(hour.id)}
                          className={hour.is_active ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                        >
                          {hour.is_active ? "Désactiver" : "Activer"}
                        </button>
                        <button
                          onClick={() => handleDelete(hour.id)}
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