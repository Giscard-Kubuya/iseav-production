"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiData } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";

interface TechnologyPartnerEditorProps {
  mode: "create" | "edit";
  id?: string;
}

interface TechnologyPartnerForm {
  name: string;
  description: string;
  partnership_type: string;
  website_url: string;
  logo_url: string;
  contact_email: string;
  contact_phone: string;
  contact_person: string;
  is_active: boolean;
  is_featured: boolean;
}

export default function TechnologyPartnerEditor({ mode, id }: TechnologyPartnerEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<TechnologyPartnerForm>({
    name: "",
    description: "",
    partnership_type: "",
    website_url: "",
    logo_url: "",
    contact_email: "",
    contact_phone: "",
    contact_person: "",
    is_active: true,
    is_featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing partner data if editing
  const { data: partnerData } = useApiData(
    () => mode === "edit" && id ? apiRequest.get(`/technology-partners/${id}`, {
      headers: { 'Website-ID': '1' }
    }) : null,
    [mode, id]
  );

  useEffect(() => {
    if (mode === "edit" && partnerData?.data) {
      setFormData(partnerData.data);
    }
  }, [mode, partnerData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        await apiRequest.post("/technology-partners", formData, {
          headers: { 'Website-ID': '1' }
        });
      } else {
        await apiRequest.put(`/technology-partners/${id}`, formData, {
          headers: { 'Website-ID': '1' }
        });
      }
      router.push("/admin/technology-partners");
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
            {mode === "create" ? "Nouveau Partenaire" : "Modifier le Partenaire"}
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
                Nom du partenaire *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de partenariat
              </label>
              <select
                name="partnership_type"
                value={formData.partnership_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner un type</option>
                <option value="Technology Vendor">Fournisseur Technologique</option>
                <option value="Strategic Partner">Partenaire Stratégique</option>
                <option value="Integration Partner">Partenaire d'Intégration</option>
                <option value="Reseller">Revendeur</option>
                <option value="Solution Provider">Fournisseur de Solutions</option>
                <option value="Other">Autre</option>
              </select>
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
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description du partenaire et des services offerts..."
            />
          </div>

          {/* URLs and Media */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site web
              </label>
              <input
                type="url"
                name="website_url"
                value={formData.website_url}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL du logo
              </label>
              <input
                type="url"
                name="logo_url"
                value={formData.logo_url}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informations de Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personne de contact
                </label>
                <input
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email de contact
                </label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone de contact
                </label>
                <input
                  type="text"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          {(formData.logo_url || formData.name) && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  {formData.logo_url && (
                    <img
                      src={formData.logo_url}
                      alt={formData.name}
                      className="h-12 w-12 object-contain mr-4"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <div>
                    <div className="font-medium text-gray-900">{formData.name || "Nom du partenaire"}</div>
                    {formData.partnership_type && (
                      <div className="text-sm text-gray-500">{formData.partnership_type}</div>
                    )}
                  </div>
                </div>
                {formData.description && (
                  <p className="mt-2 text-sm text-gray-600">{formData.description}</p>
                )}
              </div>
            </div>
          )}

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
              Partenaire actif
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Mettre en vedette
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