"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiData } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";

interface CompanyStatisticEditorProps {
  mode: "create" | "edit";
  id?: string;
}

interface CompanyStatisticForm {
  label: string;
  value: string;
  unit: string;
  description: string;
  icon: string;
  category: string;
  display_order: number;
  is_active: boolean;
}

export default function CompanyStatisticEditor({ mode, id }: CompanyStatisticEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CompanyStatisticForm>({
    label: "",
    value: "",
    unit: "",
    description: "",
    icon: "",
    category: "",
    display_order: 0,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing statistic data if editing
  const { data: statisticData } = useApiData(
    () => mode === "edit" && id ? apiRequest.get(`/company-statistics/${id}`, {
      headers: { 'Website-ID': '1' }
    }) : null,
    [mode, id]
  );

  useEffect(() => {
    if (mode === "edit" && statisticData?.data) {
      setFormData(statisticData.data);
    }
  }, [mode, statisticData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "create") {
        await apiRequest.post("/company-statistics", formData, {
          headers: { 'Website-ID': '1' }
        });
      } else {
        await apiRequest.put(`/company-statistics/${id}`, formData, {
          headers: { 'Website-ID': '1' }
        });
      }
      router.push("/admin/company-statistics");
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const commonIcons = [
    "📊", "📈", "📉", "💰", "👥", "🏢", "⏰", "🌍", "💼", "🔢",
    "✅", "⭐", "🎯", "📋", "🚀", "💡", "🔧", "📱", "💻", "🌟"
  ];

  const commonCategories = [
    "Performance",
    "Équipe",
    "Clients",
    "Projets",
    "Revenus",
    "Croissance",
    "Qualité",
    "Innovation"
  ];

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            {mode === "create" ? "Nouvelle Statistique" : "Modifier la Statistique"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Libellé *
              </label>
              <input
                type="text"
                name="label"
                value={formData.label}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Clients satisfaits"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valeur *
              </label>
              <input
                type="text"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 98% ou 1500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unité
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: %, +, clients, projets"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner une catégorie</option>
                {commonCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordre d'affichage
              </label>
              <input
                type="number"
                name="display_order"
                value={formData.display_order}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description détaillée de cette statistique..."
            />
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icône
            </label>
            <div className="mb-2">
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Saisissez un emoji ou choisissez ci-dessous"
              />
            </div>
            <div className="grid grid-cols-10 gap-2">
              {commonIcons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  className={`p-2 text-2xl rounded border hover:bg-blue-50 ${
                    formData.icon === icon ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center">
                {formData.icon && (
                  <div className="text-4xl mb-2">{formData.icon}</div>
                )}
                <div className="text-3xl font-bold text-blue-600">
                  {formData.value || "0"}
                  {formData.unit && (
                    <span className="text-lg font-normal text-gray-500 ml-1">
                      {formData.unit}
                    </span>
                  )}
                </div>
                <div className="text-sm font-medium text-gray-900 mt-1">
                  {formData.label || "Libellé de la statistique"}
                </div>
                {formData.description && (
                  <div className="text-xs text-gray-600 mt-1">
                    {formData.description}
                  </div>
                )}
                {formData.category && (
                  <div className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs mt-2">
                    {formData.category}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="flex gap-6 border-t pt-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Statistique active
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Sauvegarde..." : mode === "create" ? "Créer" : "Mettre à jour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}