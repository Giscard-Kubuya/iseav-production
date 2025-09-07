"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { useActualites, useActualiteMutations } from "@/hooks/useActualites";
import { Actualite } from "@/lib/api";
import { PageHeader, DataTable, Badge, Button, Card } from "./shared";

export default function ActualitesManagement() {
  const {
    data: actualites,
    loading,
    error,
    refetch,
  } = useActualites();
  const mutations = useActualiteMutations();

  const categories = {
    company: "Entreprise",
    projects: "Projets de Recherche", 
    partnerships: "Partenariats",
    events: "Événements Académiques",
    awards: "Récompenses & Distinctions",
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

  // Define columns for the data table
  const columns = useMemo<ColumnDef<Actualite>[]>(() => [
    {
      accessorKey: "title",
      header: "Actualité",
      cell: ({ row }) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 truncate">
            {row.original.title}
          </div>
          <div className="text-xs text-gray-500 mb-1">
            Par {row.original.author}
          </div>
          <div className="flex flex-wrap gap-1">
            {row.original.urgent && (
              <Badge variant="error" size="sm">🚨 Urgent</Badge>
            )}
            {row.original.featured && (
              <Badge variant="info" size="sm">⭐ Vedette</Badge>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Catégorie",
      cell: ({ getValue }) => {
        const category = getValue() as string;
        return (
          <Badge variant="info" size="sm">
            {categories[category as keyof typeof categories] || category || "Non catégorisé"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "status", 
      header: "Statut",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <Badge variant={status === "published" ? "success" : "warning"} size="sm">
            {status === "published" ? "Publié" : "Brouillon"}
          </Badge>
        );
      },
    },
    {
      id: "stats",
      header: "Stats",
      cell: ({ row }) => (
        <div className="text-xs text-gray-600">
          <div>👀 {row.original.views}</div>
          <div>💬 {row.original.comments_count}</div>
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ getValue }) => (
        <div className="text-xs text-gray-600">
          {new Date(getValue() as string).toLocaleDateString('fr-FR', { 
            day: '2-digit', 
            month: '2-digit' 
          })}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.open(`/actualites/${row.original.id}`, '_blank')}
            className="text-blue-600 hover:text-blue-700 text-lg"
            title="Voir l'actualité"
          >
            📝
          </button>
          <button
            onClick={() => handleToggleUrgent(row.original.id)}
            className="text-red-500 hover:text-red-600 text-lg"
            title={row.original.urgent ? "Retirer l'urgence" : "Marquer comme urgent"}
          >
            ❌
          </button>
          <button
            onClick={() => handleToggleFeatured(row.original.id)}
            className="text-emerald-600 hover:text-emerald-700 text-lg"
            title={row.original.featured ? "Retirer de la vedette" : "Mettre en vedette"}
          >
            🔔
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="text-red-500 hover:text-red-600 text-lg"
            title="Supprimer l'actualité"
          >
            🗑️
          </button>
        </div>
      ),
    },
  ], [categories, handleDelete, handleToggleUrgent, handleToggleFeatured]);

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <div className="text-red-700">
          Erreur lors du chargement des actualités: {error}
        </div>
      </Card>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Fixed Header */}
      <div className="flex-shrink-0 bg-gray-50 border-b border-gray-200 px-6 py-4">
        <PageHeader
          title="Gestion des Actualités"
          subtitle="Gérez toutes les actualités et nouvelles du projet"
          action={{
            label: "+ Nouvelle Actualité",
            href: "/admin/actualites/new",
            icon: <span>📰</span>
          }}
        />
      </div>

      {/* Scrollable Table Content */}
      <div className="flex-1 overflow-hidden px-6 py-4">
        <DataTable
          columns={columns}
          data={actualites || []}
          loading={loading}
          searchPlaceholder="🔍 Rechercher une actualité..."
          emptyMessage="Aucune actualité trouvée"
          pageSize={15}
          showSearch={true}
          showPagination={true}
          className="h-full"
        />
      </div>
    </div>
  );
}
