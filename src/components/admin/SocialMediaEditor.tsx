"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiData } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";

interface SocialMediaEditorProps {
  mode: "create" | "edit";
  id?: string;
}

interface SocialMediaForm {
  platform: string;
  platform_name: string;
  url: string;
  username: string;
  icon_class: string;
  display_order: number;
  is_active: boolean;
}

export default function SocialMediaEditor({ mode, id }: SocialMediaEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<SocialMediaForm>({
    platform: "facebook",
    platform_name: "",
    url: "",
    username: "",
    icon_class: "",
    display_order: 0,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: socialMediaData } = useApiData(
    () => mode === "edit" && id ? apiRequest.get(`/social-media/${id}`, {
      headers: { 'Website-ID': '1' }
    }) : null,
    [mode, id]
  );

  useEffect(() => {
    if (mode === "edit" && socialMediaData?.data) {
      setFormData(socialMediaData.data);
    }
  }, [mode, socialMediaData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
        await apiRequest.post("/social-media", formData, {
          headers: { 'Website-ID': '1' }
        });
      } else {
        await apiRequest.put(`/social-media/${id}`, formData, {
          headers: { 'Website-ID': '1' }
        });
      }
      router.push("/admin/social-media");
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const platforms = [
    { value: "facebook", label: "Facebook", icon: "fab fa-facebook" },
    { value: "twitter", label: "Twitter", icon: "fab fa-twitter" },
    { value: "instagram", label: "Instagram", icon: "fab fa-instagram" },
    { value: "linkedin", label: "LinkedIn", icon: "fab fa-linkedin" },
    { value: "youtube", label: "YouTube", icon: "fab fa-youtube" },
    { value: "tiktok", label: "TikTok", icon: "fab fa-tiktok" },
    { value: "pinterest", label: "Pinterest", icon: "fab fa-pinterest" },
    { value: "snapchat", label: "Snapchat", icon: "fab fa-snapchat" },
    { value: "whatsapp", label: "WhatsApp", icon: "fab fa-whatsapp" },
    { value: "telegram", label: "Telegram", icon: "fab fa-telegram" },
    { value: "other", label: "Autre", icon: "fas fa-share-alt" },
  ];

  const selectedPlatform = platforms.find(p => p.value === formData.platform);

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            {mode === "create" ? "Nouveau Réseau Social" : "Modifier le Réseau Social"}
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
                Plateforme *
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {platforms.map((platform) => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </select>
            </div>

            {formData.platform === "other" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de la plateforme *
                </label>
                <input
                  type="text"
                  name="platform_name"
                  value={formData.platform_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Discord"
                />
              </div>
            )}

            <div className={formData.platform === "other" ? "" : "md:col-span-2"}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL *
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://facebook.com/votrepage"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="@votrepage"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classe d'icône CSS
              </label>
              <input
                type="text"
                name="icon_class"
                value={formData.icon_class}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={selectedPlatform?.icon || "fas fa-share-alt"}
              />
              <p className="text-sm text-gray-500 mt-1">
                Suggestion: {selectedPlatform?.icon}
              </p>
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
                {formData.icon_class && (
                  <i className={`${formData.icon_class} text-2xl text-blue-600`}></i>
                )}
                <div>
                  <div className="font-medium text-gray-900">
                    {formData.platform === "other" 
                      ? (formData.platform_name || "Nom de la plateforme") 
                      : (selectedPlatform?.label || "Plateforme")
                    }
                  </div>
                  <div className="text-sm text-gray-600">
                    {formData.username && `${formData.username} • `}
                    {formData.url || "URL de la page"}
                  </div>
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
              {loading ? "Sauvegarde..." : mode === "create" ? "Créer" : "Mettre à jour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}