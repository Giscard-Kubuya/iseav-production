'use client'

import { useState } from 'react'

export default function ContactContent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      
      setTimeout(() => setSubmitStatus(''), 5000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-blue-100">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contactez-Nous</h1>
          <p className="text-xl max-w-3xl mx-auto">
            N'hésitez pas à nous contacter pour toute information concernant notre établissement
          </p>
        </div>
      </section>


      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Formulaire de <span className="text-blue-600">Contact</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous contacter pour toute information concernant l'éducation de votre enfant
            </p>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <div className="text-green-500 text-2xl mr-3">✅</div>
                <div>
                  <h3 className="text-green-800 font-semibold">Message envoyé avec succès!</h3>
                  <p className="text-green-700">Nous vous répondrons dans les 24 heures.</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors duration-300 bg-white"
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors duration-300 bg-white"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors duration-300 bg-white"
                  placeholder="votre.email@exemple.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors duration-300 bg-white"
                  placeholder="+216 XX XXX XXX"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                Sujet *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-white"
              >
                <option value="">Sélectionnez un sujet</option>
                <option value="inscription">Inscription d'un élève</option>
                <option value="information">Demande d'information</option>
                <option value="pedagogie">Questions pédagogiques</option>
                <option value="administration">Questions administratives</option>
                <option value="vie-scolaire">Vie scolaire</option>
                <option value="emploi">Recrutement/Emploi</option>
                <option value="other">Autre demande</option>
              </select>
            </div>

            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors duration-300 resize-vertical bg-white"
                placeholder="Décrivez votre demande en détail..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-amber-600 text-white hover:from-blue-700 hover:to-amber-700 hover:shadow-blue-500/25'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Envoi en cours...
                </div>
              ) : (
                'Envoyer le Message'
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Notre <span className="text-blue-600">Localisation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              8e CEPAC situé à Projet-Beni, République du Bénin
            </p>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-xl p-8">
            <div className="bg-gradient-to-br from-blue-100 to-amber-100 rounded-2xl flex items-center justify-center h-96">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Carte Interactive</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Projet-Beni, République Démocratique du Congo (RDC)
                </p>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-semibold">📞 Téléphone:</span> +243 XX XX XX XX
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">📧 Email:</span> contact@cepac-beni.edu.cd
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=Projet-Beni+Democratic+Republic+Congo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 bg-gradient-to-r from-blue-600 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Ouvrir dans Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}