"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiData } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";

interface ContactInfoEditorProps {
  mode: "create" | "edit";
  id?: string;
}

interface ContactInfoForm {
  type: string;
  label: string;
  value: string;
  description: string;
  icon: string;
  is_primary: boolean;
  is_public: boolean;
  display_order: number;
  metadata: any;
}

export default function ContactInfoEditor({ mode, id }: ContactInfoEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactInfoForm>({
    type: "phone",
    label: "",
    value: "",
    description: "",
    icon: "",
    is_primary: false,
    is_public: true,
    display_order: 0,
    metadata: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing contact info data if editing
  const { data: contactData } = useApiData(
    () => mode === "edit" && id ? apiRequest.get(`/contact-information/${id}`, {
      headers: { 'Website-ID': '1' }
    }) : null,
    [mode, id]
  );

  useEffect(() => {
    if (mode === "edit" && contactData?.data) {
      setFormData(contactData.data);
    }
  }, [mode, contactData]);

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
        await apiRequest.post("/contact-information", formData, {
          headers: { 'Website-ID': '1' }
        });
      } else {
        await apiRequest.put(`/contact-information/${id}`, formData, {
          headers: { 'Website-ID': '1' }
        });
      }
      router.push("/admin/contact-info");
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const contactTypes = [
    { value: "phone", label: "Téléphone", icon: "fas fa-phone" },
    { value: "email", label: "Email", icon: "fas fa-envelope" },
    { value: "address", label: "Adresse", icon: "fas fa-map-marker-alt" },
    { value: "fax", label: "Fax", icon: "fas fa-fax" },
    { value: "website", label: "Site Web", icon: "fas fa-globe" },
    { value: "social", label: "Réseau Social", icon: "fas fa-share-alt" },
    { value: "other", label: "Autre", icon: "fas fa-info-circle" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            {mode === "create" ? "Nouvelle Information de Contact" : "Modifier l'Information de Contact"}
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
                Type de contact *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {contactTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

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
                placeholder="Ex: Téléphone Principal"
              />
            </div>

            <div className="md:col-span-2">
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
                placeholder="Ex: +33 1 23 45 67 89"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description optionnelle..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icône CSS
              </label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: fas fa-phone"
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
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                {formData.icon && (
                  <i className={`${formData.icon} text-blue-600 text-lg`}></i>
                )}
                <div>
                  <div className="font-medium text-gray-900">
                    {formData.label || "Libellé"}
                  </div>
                  <div className="text-gray-600">
                    {formData.value || "Valeur"}
                  </div>
                  {formData.description && (
                    <div className="text-sm text-gray-500 mt-1">
                      {formData.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="flex gap-6 border-t pt-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_public"
                checked={formData.is_public}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Visible publiquement
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_primary"
                checked={formData.is_primary}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Contact principal
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