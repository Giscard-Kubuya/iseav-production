"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiData } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";

interface BusinessHoursEditorProps {
  mode: "create" | "edit";
  id?: string;
}

interface BusinessHourForm {
  day_of_week: string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
  is_active: boolean;
}

export default function BusinessHoursEditor({
  mode,
  id,
}: BusinessHoursEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<BusinessHourForm>({
    day_of_week: "monday",
    open_time: "09:00",
    close_time: "17:00",
    is_closed: false,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing business hour data if editing
  const { data: businessHourData } = useApiData(
    () =>
      mode === "edit" && id
        ? apiRequest.get(`/business-hours/${id}`, {
            headers: { "Website-ID": "1" },
          })
        : "",
    [mode, id]
  );

  useEffect(() => {
    if (mode === "edit" && businessHourData?.data) {
      const data = businessHourData.data;
      setFormData({
        day_of_week: data.day_of_week,
        open_time: data.open_time || "09:00",
        close_time: data.close_time || "17:00",
        is_closed: data.is_closed,
        is_active: data.is_active,
      });
    }
  }, [mode, businessHourData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
        await apiRequest.post("/business-hours", formData, {
          headers: { "Website-ID": "1" },
        });
      } else {
        await apiRequest.put(`/business-hours/${id}`, formData, {
          headers: { "Website-ID": "1" },
        });
      }
      router.push("/admin/business-hours");
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const daysOfWeek = [
    { value: "monday", label: "Lundi" },
    { value: "tuesday", label: "Mardi" },
    { value: "wednesday", label: "Mercredi" },
    { value: "thursday", label: "Jeudi" },
    { value: "friday", label: "Vendredi" },
    { value: "saturday", label: "Samedi" },
    { value: "sunday", label: "Dimanche" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            {mode === "create"
              ? "Nouvelle Heure d'Ouverture"
              : "Modifier les Heures d'Ouverture"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Day Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jour de la semaine *
              </label>
              <select
                name="day_of_week"
                value={formData.day_of_week}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {daysOfWeek.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_closed"
                  checked={formData.is_closed}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Fermé ce jour
              </label>
            </div>
          </div>

          {/* Time Settings */}
          {!formData.is_closed && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure d'ouverture *
                </label>
                <input
                  type="time"
                  name="open_time"
                  value={formData.open_time}
                  onChange={handleInputChange}
                  required={!formData.is_closed}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure de fermeture *
                </label>
                <input
                  type="time"
                  name="close_time"
                  value={formData.close_time}
                  onChange={handleInputChange}
                  required={!formData.is_closed}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Preview */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">
                  {
                    daysOfWeek.find((d) => d.value === formData.day_of_week)
                      ?.label
                  }
                </span>
                <span className="text-gray-600">
                  {formData.is_closed
                    ? "Fermé"
                    : `${formData.open_time} - ${formData.close_time}`}
                </span>
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
