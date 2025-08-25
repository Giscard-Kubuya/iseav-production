"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiData } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";
import ImageUpload from "./ImageUpload";

interface WhyChooseUsEditorProps {
  mode: "create" | "edit";
  id?: string;
}

interface WhyChooseUsForm {
  title: string;
  description: string;
  icon_class: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

export default function WhyChooseUsEditor({ mode, id }: WhyChooseUsEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<WhyChooseUsForm>({
    title: "",
    description: "",
    icon_class: "",
    image_url: "",
    display_order: 0,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing data if editing
  const { data: whyChooseUsData } = useApiData(
    () => mode === "edit" && id ? apiRequest.get(`/why-choose-us/${id}`, {
      headers: { 'Website-ID': '1' }
    }) : null,
    [mode, id]
  );

  useEffect(() => {
    if (mode === "edit" && whyChooseUsData?.data) {
      setFormData(whyChooseUsData.data);
    }
  }, [mode, whyChooseUsData]);

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
        await apiRequest.post("/why-choose-us", formData, {
          headers: { 'Website-ID': '1' }
        });
      } else {
        await apiRequest.put(`/why-choose-us/${id}`, formData, {
          headers: { 'Website-ID': '1' }
        });
      }
      router.push("/admin/why-choose-us");
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const commonIcons = [
    { value: "fas fa-shield-alt", label: "Sécurité" },
    { value: "fas fa-rocket", label: "Performance" },
    { value: "fas fa-users", label: "Équipe" },
    { value: "fas fa-star", label: "Qualité" },
    { value: "fas fa-clock", label: "Rapidité" },
    { value: "fas fa-award", label: "Excellence" },
    { value: "fas fa-lightbulb", label: "Innovation" },
    { value: "fas fa-handshake", label: "Partenariat" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            {mode === "create" ? "Nouvelle Raison de Nous Choisir" : "Modifier la Raison de Nous Choisir"}
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
            <div className="md:col-span-2">
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
                placeholder="Ex: Expertise Technique"
              />
            </div>

            <div className="md:col-span-2">
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
                placeholder="Description détaillée de cette raison..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icône CSS
              </label>
              <select
                name="icon_class"
                value={formData.icon_class}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner une icône</option>
                {commonIcons.map((icon) => (
                  <option key={icon.value} value={icon.value}>
                    {icon.label} ({icon.value})
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Ou saisissez une classe CSS personnalisée
              </p>
              <input
                type="text"
                name="icon_class"
                value={formData.icon_class}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                placeholder="Ex: fas fa-star"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image illustrative
              </label>
              <ImageUpload
                module="why-choose-us"
                onImageUploaded={(imageData) => {
                  setFormData(prev => ({ ...prev, image_url: imageData.url }));
                }}
                currentImageUrl={formData.image_url}
                altText={formData.title}
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

          {/* Preview */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center">
                {formData.icon_class && (
                  <div className="mb-4">
                    <i className={`${formData.icon_class} text-4xl text-blue-600`}></i>
                  </div>
                )}
                {formData.image_url && (
                  <div className="mb-4">
                    <img
                      src={formData.image_url}
                      alt={formData.title}
                      className="w-16 h-16 mx-auto rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {formData.title || "Titre de la raison"}
                </h4>
                <p className="text-gray-600">
                  {formData.description || "Description de la raison..."}
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
              Actif
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