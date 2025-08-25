"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiData } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";
import ImageUpload from "./ImageUpload";

interface TeamExpertEditorProps {
  mode: "create" | "edit";
  id?: string;
}

interface TeamExpertForm {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  bio: string;
  experience_years: number;
  skills: string[];
  certifications: string[];
  linkedin_url: string;
  image_url: string;
  is_active: boolean;
  is_featured: boolean;
}

export default function TeamExpertEditor({ mode, id }: TeamExpertEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<TeamExpertForm>({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    bio: "",
    experience_years: 0,
    skills: [],
    certifications: [],
    linkedin_url: "",
    image_url: "",
    is_active: true,
    is_featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");

  // Fetch existing expert data if editing
  const { data: expertData } = useApiData(
    () => mode === "edit" && id ? apiRequest.get(`/team-experts/${id}`, {
      headers: { 'Website-ID': '1' }
    }) : null,
    [mode, id]
  );

  useEffect(() => {
    if (mode === "edit" && expertData?.data) {
      const apiData = expertData.data;
      setFormData({
        name: apiData.name || "",
        position: apiData.position || "",
        department: apiData.department || "",
        email: apiData.email || "",
        phone: apiData.phone || "",
        bio: apiData.bio || "",
        experience_years: apiData.experience_years || 0,
        skills: apiData.specializations || [],
        certifications: apiData.certifications || [],
        linkedin_url: apiData.social_links?.linkedin || "",
        image_url: apiData.image_url || "",
        is_active: apiData.is_active ?? true,
        is_featured: apiData.is_featured ?? false,
      });
    }
  }, [mode, expertData]);

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

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((_, i) => i !== index),
    }));
  };

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...(prev.certifications || []), newCertification.trim()],
      }));
      setNewCertification("");
    }
  };

  const handleRemoveCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiData = {
        name: formData.name,
        position: formData.position,
        department: formData.department,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
        experience_years: formData.experience_years,
        specializations: formData.skills,
        certifications: formData.certifications,
        social_links: {
          linkedin: formData.linkedin_url,
        },
        image_url: formData.image_url,
        is_active: formData.is_active,
        is_featured: formData.is_featured,
      };

      if (mode === "create") {
        await apiRequest.post("/team-experts", apiData, {
          headers: { 'Website-ID': '1' }
        });
      } else {
        await apiRequest.put(`/team-experts/${id}`, apiData, {
          headers: { 'Website-ID': '1' }
        });
      }
      router.push("/admin/team-experts");
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
            {mode === "create" ? "Nouvel Expert" : "Modifier l'Expert"}
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
                Département
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
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
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compétences
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Nouvelle compétence"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Ajouter
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(formData.skills || []).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certifications
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                placeholder="Nouvelle certification"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCertification())}
              />
              <button
                type="button"
                onClick={handleAddCertification}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Ajouter
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(formData.certifications || []).map((cert, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {cert}
                  <button
                    type="button"
                    onClick={() => handleRemoveCertification(index)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
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
                module="team"
                onImageUploaded={(imageData) => {
                  setFormData(prev => ({ ...prev, image_url: imageData.url }));
                }}
                currentImageUrl={formData.image_url}
                altText={`Photo de ${formData.name}`}
              />
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
              Expert actif
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