"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import ImageUpload from "./ImageUpload";

interface HeroSlideEditorProps {
  mode: "create" | "edit";
  id?: string;
}

export default function HeroSlideEditor({ mode, id }: HeroSlideEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image_url: "",
    primary_action_text: "",
    primary_action_url: "",
    secondary_action_text: "",
    secondary_action_url: "",
    display_order: 0,
    is_active: true,
  });

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadData = async () => {
      if (mode === "edit" && id) {
        try {
          setLoading(true);
          const response = await apiRequest.get(`/hero-slides/${id}`, {
            headers: { "Website-ID": "1" },
          });
          const slide = response?.data?.data ?? {};

          setFormData({
            title: slide.title || "",
            subtitle: slide.subtitle || "",
            description: slide.description || "",
            image_url: slide.image_url || "",
            primary_action_text: slide.primary_action_text || "",
            primary_action_url: slide.primary_action_url || "",
            secondary_action_text: slide.secondary_action_text || "",
            secondary_action_url: slide.secondary_action_url || "",
            display_order: parseInt(slide.display_order) || 0,
            is_active:
              slide.is_active === true ||
              slide.is_active === 1 ||
              slide.is_active === "1",
          });
        } catch (error) {
          console.error("Error loading slide:", error);
          setErrors({ general: "Erreur lors du chargement de la diapositive" });
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, [mode, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSaving(true);

    try {
      const payload = {
        ...formData,
        display_order: parseInt(formData.display_order.toString()) || 0,
        is_active: formData.is_active ? 1 : 0,
      };

      if (mode === "create") {
        await apiRequest.post("/hero-slides", payload, {
          headers: { "Website-ID": "1" },
        });
      } else if (id) {
        await apiRequest.put(`/hero-slides/${id}`, payload, {
          headers: { "Website-ID": "1" },
        });
      }

      router.push("/admin/hero-slides");
    } catch (error: any) {
      console.error("Error saving slide:", error);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general:
            error.response?.data?.message || "Erreur lors de la sauvegarde",
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === "create"
              ? "Nouvelle Diapositive Hero"
              : "Modifier la Diapositive"}
          </h1>
          <p className="text-gray-600">
            {mode === "create"
              ? "Créez une nouvelle diapositive pour la section hero"
              : "Modifiez les informations de la diapositive"}
          </p>
        </div>
        <Link
          href="/admin/hero-slides"
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Retour à la liste
        </Link>
      </div>

      {/* Error Alert */}
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-6">Informations de base</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Titre *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Titre principal de la diapositive"
                required
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Subtitle */}
            <div className="md:col-span-2">
              <label
                htmlFor="subtitle"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Sous-titre
              </label>
              <input
                type="text"
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleInputChange("subtitle", e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.subtitle ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Sous-titre (optionnel)"
              />
              {errors.subtitle && (
                <p className="text-red-600 text-sm mt-1">{errors.subtitle}</p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Description complète de la diapositive"
                required
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image de la diapositive *
              </label>
              <ImageUpload
                module="hero-slides"
                onImageUploaded={(imageData) => {
                  handleInputChange("image_url", imageData.url);
                }}
                currentImageUrl={formData.image_url}
                altText={formData.title}
              />
              {errors.image_url && (
                <p className="text-red-600 text-sm mt-1">{errors.image_url}</p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-6">Boutons d'action</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Action */}
            <div>
              <label
                htmlFor="primary_action_text"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Texte du bouton principal
              </label>
              <input
                type="text"
                id="primary_action_text"
                value={formData.primary_action_text}
                onChange={(e) =>
                  handleInputChange("primary_action_text", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="En savoir plus"
              />
            </div>

            <div>
              <label
                htmlFor="primary_action_url"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                URL du bouton principal
              </label>
              <input
                type="text"
                id="primary_action_url"
                value={formData.primary_action_url}
                onChange={(e) =>
                  handleInputChange("primary_action_url", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="/contact"
              />
            </div>

            {/* Secondary Action */}
            <div>
              <label
                htmlFor="secondary_action_text"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Texte du bouton secondaire
              </label>
              <input
                type="text"
                id="secondary_action_text"
                value={formData.secondary_action_text}
                onChange={(e) =>
                  handleInputChange("secondary_action_text", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nos services"
              />
            </div>

            <div>
              <label
                htmlFor="secondary_action_url"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                URL du bouton secondaire
              </label>
              <input
                type="text"
                id="secondary_action_url"
                value={formData.secondary_action_url}
                onChange={(e) =>
                  handleInputChange("secondary_action_url", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="/services"
              />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-6">Paramètres</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="display_order"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Ordre d'affichage
              </label>
              <input
                type="number"
                id="display_order"
                value={formData.display_order}
                onChange={(e) =>
                  handleInputChange(
                    "display_order",
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) =>
                  handleInputChange("is_active", e.target.checked)
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="is_active"
                className="ml-2 block text-sm text-gray-700"
              >
                Diapositive active
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/hero-slides"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving
              ? "Sauvegarde..."
              : mode === "create"
              ? "Créer"
              : "Mettre à jour"}
          </button>
        </div>
      </form>
    </div>
  );
}
