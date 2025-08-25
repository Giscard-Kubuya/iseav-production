"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiData } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";
import ImageUpload from "./ImageUpload";

interface TestimonialEditorProps {
  mode: "create" | "edit";
  id?: string;
}

interface TestimonialForm {
  client_name: string;
  client_company: string;
  client_position: string;
  content: string;
  rating: number;
  client_photo_url: string;
  project_type: string;
  is_featured: boolean;
  is_active: boolean;
}

export default function TestimonialEditor({ mode, id }: TestimonialEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<TestimonialForm>({
    client_name: "",
    client_company: "",
    client_position: "",
    content: "",
    rating: 5,
    client_photo_url: "",
    project_type: "",
    is_featured: false,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing testimonial data if editing
  const { data: testimonialData } = useApiData(
    () => mode === "edit" && id ? apiRequest.get(`/testimonials/${id}`, {
      headers: { 'Website-ID': '1' }
    }) : null,
    [mode, id]
  );

  useEffect(() => {
    if (mode === "edit" && testimonialData?.data) {
      setFormData(testimonialData.data);
    }
  }, [mode, testimonialData]);

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
        await apiRequest.post("/testimonials", formData, {
          headers: { 'Website-ID': '1' }
        });
      } else {
        await apiRequest.put(`/testimonials/${id}`, formData, {
          headers: { 'Website-ID': '1' }
        });
      }
      router.push("/admin/testimonials");
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const projectTypes = [
    "Développement Web",
    "Application Mobile",
    "Système d'Information",
    "Infrastructure IT",
    "Consulting IT",
    "Maintenance",
    "Formation",
    "Autre"
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-2xl ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ⭐
      </span>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            {mode === "create" ? "Nouveau Témoignage" : "Modifier le Témoignage"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Client Information */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informations Client</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du client *
                </label>
                <input
                  type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entreprise *
                </label>
                <input
                  type="text"
                  name="client_company"
                  value={formData.client_company}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poste du client
                </label>
                <input
                  type="text"
                  name="client_position"
                  value={formData.client_position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo du client
                </label>
                <ImageUpload
                  module="testimonials"
                  onImageUploaded={(imageData) => {
                    setFormData(prev => ({ ...prev, client_photo_url: imageData.url }));
                  }}
                  currentImageUrl={formData.client_photo_url}
                  altText={`Photo de ${formData.client_name}`}
                />
              </div>
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contenu du Témoignage</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Témoignage *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Le témoignage complet du client..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note (1-5 étoiles) *
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>5 étoiles</option>
                  <option value={4}>4 étoiles</option>
                  <option value={3}>3 étoiles</option>
                  <option value={2}>2 étoiles</option>
                  <option value={1}>1 étoile</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de projet
                </label>
                <select
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start space-x-4">
                {formData.client_photo_url && (
                  <img
                    src={formData.client_photo_url}
                    alt={formData.client_name}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="flex-1">
                  <div className="flex mb-2">
                    {renderStars(formData.rating)}
                  </div>
                  <blockquote className="text-gray-700 italic mb-4">
                    "{formData.content || "Contenu du témoignage..."}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {formData.client_name || "Nom du client"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formData.client_position && `${formData.client_position}, `}
                      {formData.client_company || "Entreprise"}
                    </div>
                    {formData.project_type && (
                      <div className="text-xs text-blue-600 mt-1">
                        Projet: {formData.project_type}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Témoignage actif
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