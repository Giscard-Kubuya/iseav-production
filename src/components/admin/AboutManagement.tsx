"use client";

import { useState, useEffect } from "react";
import { apiRequest, About } from "@/lib/api";

interface AboutData {
  id?: number;
  website_id: number;
  hero_title: string;
  hero_subtitle: string;
  organization_description: string;
  our_story: string;
  why_choose_us: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  achievements: Array<{
    title: string;
    count: string;
    description: string;
  }>;
  certifications: Array<{
    name: string;
    description: string;
    year: string;
  }>;
  team_intro: string;
  impact_statement: string;
  future_goals: string;
  call_to_action_title: string;
  call_to_action_description: string;
  is_active: boolean;
}

export default function AboutManagement() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<AboutData>({
    website_id: 1,
    hero_title: "8e CEPAC Projet-Beni",
    hero_subtitle:
      "Organisation Non Gouvernementale dédiée au développement communautaire en République Démocratique du Congo",
    organization_description:
      "Contribuer au développement communautaire, promouvoir le bien-être social et améliorer les conditions de vie des populations en République Démocratique du Congo à travers des programmes innovants et adaptés aux besoins locaux.",
    our_story:
      "Fondée avec la mission de transformer les communautés en République Démocratique du Congo, le 8e CEPAC Projet-Beni s'engage depuis plusieurs années dans des programmes de développement communautaire innovants et durables.",
    why_choose_us: [
      {
        title: "Expertise Locale",
        description:
          "Une connaissance approfondie du contexte local et des besoins communautaires",
        icon: "🏆",
      },
      {
        title: "Programmes Durables",
        description:
          "Des solutions à long terme qui créent un impact positif durable",
        icon: "🌱",
      },
      {
        title: "Transparence",
        description:
          "Une gestion transparente et responsable de tous nos programmes",
        icon: "💎",
      },
    ],
    achievements: [
      {
        title: "Familles Aidées",
        count: "500+",
        description: "Familles bénéficiaires de nos programmes",
      },
      {
        title: "Projets Réalisés",
        count: "25",
        description: "Projets de développement communautaire menés à bien",
      },
      {
        title: "Partenaires",
        count: "15",
        description: "Partenaires locaux et internationaux",
      },
    ],
    certifications: [
      {
        name: "Agrément ONG",
        description: "Agréé officiellement comme ONG en RDC",
        year: "2020",
      },
    ],
    team_intro:
      "Notre équipe dirigeante expérimentée guide le 8e CEPAC vers l'excellence dans le développement communautaire",
    impact_statement:
      "Ensemble, nous construisons un avenir meilleur pour les communautés de la République Démocratique du Congo",
    future_goals:
      "D'ici 2030, nous aspirons à étendre nos programmes à 10 nouvelles régions et toucher 2000 familles supplémentaires.",
    call_to_action_title: "Rejoignez Notre Mission",
    call_to_action_description:
      "Rejoignez les communautés qui nous font confiance pour leur développement",
    is_active: true,
  });

  useEffect(() => {
    console.log("About Management component loaded - testing admin interface");
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      setLoading(true);
      console.log("🔍 Attempting to fetch About data from API...");
      console.log(
        "API URL:",
        process.env.NEXT_PUBLIC_API_URL ||
          "https://new-api.projetcepacbeni.org/api"
      );

      const response = await apiRequest.get("/about", {
        headers: { "Website-ID": "1" },
      });

      console.log("✅ About API response received:", response);

      if (response.data && response.data.data) {
        // API returned data successfully
        setAbout(response.data.data);
        setFormData(response.data.data);
      } else if (response.data) {
        // Direct data format
        setAbout(response.data);
        setFormData(response.data);
      } else {
        // No data - this is a new entry
        console.log("No about data found - ready for creation");
      }
    } catch (err: any) {
      // Comprehensive error logging to identify the 500 error source
      console.error("❌ About API Error Details:");
      console.error("- Status:", err.response?.status);
      console.error("- Status Text:", err.response?.statusText);
      console.error("- Response Data:", err.response?.data);
      console.error("- Error Message:", err.message);
      console.error("- Request URL:", err.config?.url);
      console.error("- Full Error Object:", err);

      // Handle different types of API errors gracefully
      if (err.response?.status === 404) {
        console.log("📍 About endpoint not found - ready for creation");
        setError(null); // Don't show error for 404, just means no data yet
      } else if (err.response?.status === 500) {
        console.error("🚨 Server 500 error detected!");
        console.error("500 Error Data:", err.response?.data);
        setError("Erreur serveur 500 - problème côté API");
      } else if (err.response?.status >= 500) {
        console.log(
          "🔧 Server error when fetching About data - using default form"
        );
        setError(null); // Don't show error, just use default form
      } else {
        console.error("🔍 Other error fetching about data:", err);
        setError("Erreur lors du chargement des données");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof AboutData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addWhyChooseUs = () => {
    setFormData((prev) => ({
      ...prev,
      why_choose_us: [
        ...prev.why_choose_us,
        { title: "", description: "", icon: "⭐" },
      ],
    }));
  };

  const updateWhyChooseUs = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      why_choose_us: prev.why_choose_us.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeWhyChooseUs = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      why_choose_us: prev.why_choose_us.filter((_, i) => i !== index),
    }));
  };

  const addAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        { title: "", count: "", description: "" },
      ],
    }));
  };

  const updateAchievement = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeAchievement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: "",
          description: "",
          year: new Date().getFullYear().toString(),
        },
      ],
    }));
  };

  const updateCertification = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      // Debug: Log the data being sent
      console.log(
        "About POST data being sent:",
        JSON.stringify(formData, null, 2)
      );

      let response;
      if (about && about.id) {
        response = await apiRequest.put(`/about/${about.id}`, formData, {
          headers: { "Website-ID": "1" },
        });
      } else {
        response = await apiRequest.post("/about", formData, {
          headers: { "Website-ID": "1" },
        });
      }

      // Debug: Log the response received
      console.log("About API response:", response);

      if (response.data) {
        setSuccess("Données About mises à jour avec succès!");
        // Handle different response formats
        const aboutData = response.data.data || response.data;
        setAbout(aboutData);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        console.log("No response data received");
      }
    } catch (err: any) {
      // Debug: Log the full error details
      console.log("About POST error details:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
        fullError: err,
      });

      if (err.response?.status === 404) {
        setError(
          "API About non disponible - les données seront sauvegardées quand l'API sera déployée"
        );
      } else if (err.response?.status >= 500) {
        setError("Erreur serveur - veuillez réessayer plus tard");
      } else {
        console.error("Error saving about data:", err);
        setError("Erreur lors de la sauvegarde des données");
      }
      setTimeout(() => setError(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Gestion de la page À Propos
          </h2>
          <p className="text-gray-600 mt-2">
            Gérez le contenu de votre page À Propos
          </p>
          {!about && !loading && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700">
                💡 Interface de gestion prête - Les données seront sauvegardées
                une fois l'API déployée
              </p>
            </div>
          )}
        </div>

        <div className="p-6 space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Section Hero
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre Principal
              </label>
              <input
                type="text"
                value={formData.hero_title}
                onChange={(e) =>
                  handleInputChange("hero_title", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="8e CEPAC Projet-Beni"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sous-titre
              </label>
              <textarea
                value={formData.hero_subtitle}
                onChange={(e) =>
                  handleInputChange("hero_subtitle", e.target.value)
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description de l'organisation..."
              />
            </div>
          </div>

          {/* Organization Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Informations Organisation
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description de l'organisation
              </label>
              <textarea
                value={formData.organization_description}
                onChange={(e) =>
                  handleInputChange("organization_description", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description de votre organisation..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notre Histoire
              </label>
              <textarea
                value={formData.our_story}
                onChange={(e) => handleInputChange("our_story", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Racontez l'histoire de votre organisation..."
              />
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Pourquoi Nous Choisir
              </h3>
              <button
                onClick={addWhyChooseUs}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Ajouter
              </button>
            </div>

            {formData.why_choose_us.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">
                    Article {index + 1}
                  </span>
                  <button
                    onClick={() => removeWhyChooseUs(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Icône
                    </label>
                    <input
                      type="text"
                      value={item.icon}
                      onChange={(e) =>
                        updateWhyChooseUs(index, "icon", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="🏆"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        updateWhyChooseUs(index, "title", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Expertise Locale"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Description
                    </label>
                    <textarea
                      value={item.description}
                      onChange={(e) =>
                        updateWhyChooseUs(index, "description", e.target.value)
                      }
                      rows={2}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Description..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Réalisations
              </h3>
              <button
                onClick={addAchievement}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Ajouter
              </button>
            </div>

            {formData.achievements.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">
                    Réalisation {index + 1}
                  </span>
                  <button
                    onClick={() => removeAchievement(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={item.count}
                      onChange={(e) =>
                        updateAchievement(index, "count", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="500+"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        updateAchievement(index, "title", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Familles Aidées"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Description
                    </label>
                    <textarea
                      value={item.description}
                      onChange={(e) =>
                        updateAchievement(index, "description", e.target.value)
                      }
                      rows={2}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Description..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team & Call to Action */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Équipe & Action
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Introduction Équipe
              </label>
              <textarea
                value={formData.team_intro}
                onChange={(e) =>
                  handleInputChange("team_intro", e.target.value)
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description de votre équipe..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Déclaration d'Impact
              </label>
              <textarea
                value={formData.impact_statement}
                onChange={(e) =>
                  handleInputChange("impact_statement", e.target.value)
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre déclaration d'impact..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objectifs Futurs
              </label>
              <textarea
                value={formData.future_goals}
                onChange={(e) =>
                  handleInputChange("future_goals", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Vos objectifs pour l'avenir..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre Call-to-Action
                </label>
                <input
                  type="text"
                  value={formData.call_to_action_title}
                  onChange={(e) =>
                    handleInputChange("call_to_action_title", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Rejoignez Notre Mission"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description Call-to-Action
                </label>
                <textarea
                  value={formData.call_to_action_description}
                  onChange={(e) =>
                    handleInputChange(
                      "call_to_action_description",
                      e.target.value
                    )
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Description de votre appel à l'action..."
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            {error && (
              <div className="flex-1 bg-red-50 border border-red-200 rounded-md px-4 py-3">
                <div className="text-red-800 text-sm">{error}</div>
              </div>
            )}

            {success && (
              <div className="flex-1 bg-green-50 border border-green-200 rounded-md px-4 py-3">
                <div className="text-green-800 text-sm">{success}</div>
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sauvegarde...
                </>
              ) : (
                "Sauvegarder"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
