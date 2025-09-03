"use client";

import { useState } from "react";
import PageSEO from "@/components/layout/PageSEO";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "general"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <PageSEO
        title="Message Envoyé - ISEAV-WALUNGU"
        description="Votre message a été envoyé avec succès à ISEAV-WALUNGU"
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Message Envoyé !</h1>
            <p className="text-gray-600 mb-8">
              Merci pour votre message. Notre équipe vous contactera dans les 24h.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300"
            >
              Envoyer un Autre Message
            </button>
          </div>
        </div>
      </PageSEO>
    );
  }

  return (
    <PageSEO
      title="Contact - ISEAV-WALUNGU"
      description="Contactez l'Institut Supérieur d'Études Agronomiques et Vétérinaires de Walungu. Admissions, informations, orientation."
      keywords="contact ISEAV, Walungu, admission, information, téléphone, email"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white overflow-hidden agricultural-pattern">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contactez <span className="text-yellow-300">ISEAV-WALUNGU</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
            <p className="text-lg mb-12 max-w-3xl mx-auto opacity-90">
              Admissions • Orientation • Programmes • Partenariats
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Envoyez-nous un Message</h2>
                  <p className="text-gray-600">Nous vous répondrons dans les 24 heures</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom Complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="+243 XXX XXX XXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de Demande
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="general">Information Générale</option>
                        <option value="admission">Admission</option>
                        <option value="programs">Programmes d'Études</option>
                        <option value="partnership">Partenariat</option>
                        <option value="research">Recherche</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Sujet de votre message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Décrivez votre demande en détail..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                      isSubmitting
                        ? 'opacity-70 cursor-not-allowed'
                        : 'hover:from-blue-700 hover:to-green-700 transform hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      'Envoyer le Message'
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Institution Info */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <div className="text-center mb-8">
                    <Image 
                      src="/images/logos/logo_iseav.png" 
                      alt="ISEAV-WALUNGU" 
                      width={120} 
                      height={120} 
                      className="mx-auto mb-4 rounded-full"
                    />
                    <h3 className="text-2xl font-bold text-gray-900">ISEAV-WALUNGU</h3>
                    <p className="text-gray-600">Institut Supérieur d'Études Agronomiques et Vétérinaires</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xl">📍</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Adresse</h4>
                        <p className="text-gray-600">
                          Territoire de Walungu<br />
                          Province du Sud-Kivu<br />
                          République Démocratique du Congo
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xl">📞</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Téléphone</h4>
                        <p className="text-gray-600">
                          +243 XXX XXX XXX<br />
                          +243 XXX XXX XXX
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xl">✉️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                        <p className="text-gray-600">
                          info@iseav-walungu.ac.cd<br />
                          admission@iseav-walungu.ac.cd
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xl">🕒</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Heures d'ouverture</h4>
                        <p className="text-gray-600">
                          Lun - Ven: 7h30 - 17h00<br />
                          Sam: 8h00 - 12h00<br />
                          Dim: Fermé
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Departments */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Contacts Spécialisés</h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Service des Admissions</h4>
                      <p className="text-gray-600 text-sm">admission@iseav-walungu.ac.cd</p>
                      <p className="text-gray-600 text-sm">+243 XXX XXX XXX</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Direction des Études</h4>
                      <p className="text-gray-600 text-sm">etudes@iseav-walungu.ac.cd</p>
                      <p className="text-gray-600 text-sm">+243 XXX XXX XXX</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Recherche et Partenariats</h4>
                      <p className="text-gray-600 text-sm">recherche@iseav-walungu.ac.cd</p>
                      <p className="text-gray-600 text-sm">+243 XXX XXX XXX</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageSEO>
  );
}