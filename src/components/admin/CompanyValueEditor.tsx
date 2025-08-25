"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiData } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";

interface CompanyValueEditorProps {
  mode: "create" | "edit";
  id?: string;
}

interface CompanyValueForm {
  title: string;
  description: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

export default function CompanyValueEditor({ mode, id }: CompanyValueEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CompanyValueForm>({
    title: "",
    description: "",
    icon: "",
    display_order: 0,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing value data if editing
  const { data: valueData } = useApiData(
    () => mode === "edit" && id ? apiRequest.get(`/company-values/${id}`, {
      headers: { 'Website-ID': '1' }
    }) : null,
    [mode, id]
  );

  useEffect(() => {
    if (mode === "edit" && valueData?.data) {
      setFormData(valueData.data);
    }
  }, [mode, valueData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        await apiRequest.post("/company-values", formData, {
          headers: { 'Website-ID': '1' }
        });
      } else {
        await apiRequest.put(`/company-values/${id}`, formData, {
          headers: { 'Website-ID': '1' }
        });
      }
      router.push("/admin/company-values");
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const valueIcons = [
    "🎯", "💡", "🤝", "⭐", "🚀", "💼", "🔧", "📈", "🌟", "✅",
    "🏆", "💪", "🎨", "🔒", "🌍", "⚡", "📊", "🎪", "🔥", "💎"
  ];

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            {mode === "create" ? "Nouvelle Valeur" : "Modifier la Valeur"}
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
                Titre *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Innovation, Excellence, Collaboration"
              />
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
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Décrivez cette valeur et son importance pour votre entreprise..."
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
              {valueIcons.map((icon) => (
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
              <div className="text-center max-w-xs mx-auto">
                {formData.icon && (
                  <div className="text-5xl mb-4">{formData.icon}</div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {formData.title || "Titre de la valeur"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {formData.description || "Description de cette valeur fondamentale de l'entreprise."}
                </p>
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
              Valeur active
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