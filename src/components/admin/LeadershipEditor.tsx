"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiData } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";
import ImageUpload from "./ImageUpload";

interface LeadershipEditorProps {
  mode: "create" | "edit";
  id?: string;
}

interface LeadershipForm {
  name: string;
  position: string;
  bio: string;
  image_url: string;
  email: string;
  phone: string;
  linkedin_url: string;
  experience_years: number;
  display_order: number;
  is_active: boolean;
  is_featured: boolean;
}

export default function LeadershipEditor({ mode, id }: LeadershipEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<LeadershipForm>({
    name: "",
    position: "",
    bio: "",
    image_url: "",
    email: "",
    phone: "",
    linkedin_url: "",
    experience_years: 0,
    display_order: 0,
    is_active: true,
    is_featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing leader data if editing
  const { data: leaderData } = useApiData(
    () => mode === "edit" && id ? apiRequest.get(`/leadership/${id}`, {
      headers: { 'Website-ID': '1' }
    }) : null,
    [mode, id]
  );

  useEffect(() => {
    if (mode === "edit" && leaderData?.data) {
      setFormData(leaderData.data);
    }
  }, [mode, leaderData]);

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
        await apiRequest.post("/leadership", formData, {
          headers: { 'Website-ID': '1' }
        });
      } else {
        await apiRequest.put(`/leadership/${id}`, formData, {
          headers: { 'Website-ID': '1' }
        });
      }
      router.push("/admin/leadership");
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
            {mode === "create" ? "Nouveau Dirigeant" : "Modifier le Dirigeant"}
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
                Nom complet *
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
                Poste *
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Années d'expérience
              </label>
              <input
                type="number"
                name="experience_years"
                value={formData.experience_years}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Biographie
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Décrivez l'expérience et les compétences du dirigeant..."
            />
          </div>

          {/* URLs and Media */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo de profil
              </label>
              <ImageUpload
                module="leadership"
                onImageUploaded={(imageData) => {
                  setFormData(prev => ({ ...prev, image_url: imageData.url }));
                }}
                currentImageUrl={formData.image_url}
                altText={`Photo de ${formData.name}`}
              />
            </div>
          </div>

          {/* Preview */}
          {(formData.image_url || formData.name || formData.position) && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start space-x-6">
                  {formData.image_url && (
                    <img
                      src={formData.image_url}
                      alt={formData.name}
                      className="w-24 h-24 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {formData.name || "Nom du dirigeant"}
                    </h3>
                    <p className="text-lg text-blue-600 font-semibold mb-3">
                      {formData.position || "Poste du dirigeant"}
                    </p>
                    {formData.experience_years > 0 && (
                      <p className="text-sm text-gray-600 mb-3">
                        {formData.experience_years} années d'expérience
                      </p>
                    )}
                    {formData.bio && (
                      <p className="text-gray-700 leading-relaxed">
                        {formData.bio}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 mt-4">
                      {formData.email && (
                        <span className="text-sm text-gray-600">
                          📧 {formData.email}
                        </span>
                      )}
                      {formData.phone && (
                        <span className="text-sm text-gray-600">
                          📞 {formData.phone}
                        </span>
                      )}
                      {formData.linkedin_url && (
                        <span className="text-sm text-blue-600">
                          🔗 LinkedIn
                        </span>
                      )}
                    </div>
                  </div>
                </div>
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
              Dirigeant actif
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