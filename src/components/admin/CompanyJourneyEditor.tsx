"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiData } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";
import ImageUpload from "./ImageUpload";

interface CompanyJourneyEditorProps {
  mode: "create" | "edit";
  id?: string;
}

interface CompanyJourneyForm {
  title: string;
  description: string;
  year: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

export default function CompanyJourneyEditor({
  mode,
  id,
}: CompanyJourneyEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CompanyJourneyForm>({
    title: "",
    description: "",
    year: new Date().getFullYear().toString(),
    image_url: "",
    display_order: 0,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: companyJourneyData } = useApiData(
    () =>
      mode === "edit" && id
        ? apiRequest.get(`/company-journey/${id}`, {
            headers: { "Website-ID": "1" },
          })
        : null,
    [mode, id]
  );

  useEffect(() => {
    if (mode === "edit" && companyJourneyData?.data) {
      setFormData(companyJourneyData.data);
    }
  }, [mode, companyJourneyData]);

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
        await apiRequest.post("/company-journey", formData, {
          headers: { "Website-ID": "1" },
        });
      } else {
        await apiRequest.put(`/company-journey/${id}`, formData, {
          headers: { "Website-ID": "1" },
        });
      }
      router.push("/admin/company-journey");
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            {mode === "create"
              ? "Nouvelle Étape du Parcours"
              : "Modifier l'Étape du Parcours"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

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
                placeholder="Ex: Création de l'entreprise"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Année *
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 2015"
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
                placeholder="Description de cette étape importante..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image illustrative
              </label>
              <ImageUpload
                module="company-journey"
                onImageUploaded={(imageData) => {
                  setFormData((prev) => ({
                    ...prev,
                    image_url: imageData.url,
                  }));
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
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {formData.year || "YYYY"}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {formData.title || "Titre de l'étape"}
                  </h4>
                  <p className="text-gray-600 mb-3">
                    {formData.description || "Description de l'étape..."}
                  </p>
                  {formData.image_url && (
                    <img
                      src={formData.image_url}
                      alt={formData.title}
                      className="w-32 h-20 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

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
              {loading
                ? "Sauvegarde..."
                : mode === "create"
                ? "Créer"
                : "Mettre à jour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
