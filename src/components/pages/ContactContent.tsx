'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ContactContent() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    department: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const departments = [
    {
      name: 'Direction Générale',
      email: 'direction@iseav-aru.tn',
      phone: '+216 71 123 000',
      description: 'Administration générale et direction exécutive',
      head: 'Prof. Dr. Rachid Ben Mansour',
      color: 'from-blue-500 to-indigo-600',
      icon: '🏛️'
    },
    {
      name: 'Admissions & Scolarité',
      email: 'admissions@iseav-aru.tn',
      phone: '+216 71 123 456',
      description: 'Candidatures, inscriptions et services étudiants',
      head: 'Dr. Leila Gharbi',
      color: 'from-green-500 to-emerald-600',
      icon: '🎓'
    },
    {
      name: 'Recherche & Innovation',
      email: 'recherche@iseav-aru.tn',
      phone: '+216 71 789 012',
      description: 'Projets de recherche et partenariats scientifiques',
      head: 'Prof. Mahmoud Sellami',
      color: 'from-purple-500 to-violet-600',
      icon: '🔬'
    },
    {
      name: 'Relations Internationales',
      email: 'international@iseav-aru.tn',
      phone: '+216 71 456 789',
      description: 'Mobilité étudiante et coopération internationale',
      head: 'Dr. Sonia Bouaziz',
      color: 'from-teal-500 to-cyan-600',
      icon: '🌍'
    },
    {
      name: 'Vie Étudiante',
      email: 'vie-etudiante@iseav-aru.tn',
      phone: '+216 71 654 321',
      description: 'Activités, clubs et services aux étudiants',
      head: 'Mme Fatma Ben Ali',
      color: 'from-orange-500 to-red-600',
      icon: '🎪'
    },
    {
      name: 'Bibliothèque & Documentation',
      email: 'bibliotheque@iseav-aru.tn',
      phone: '+216 71 987 654',
      description: 'Ressources documentaires et services numériques',
      head: 'M. Ahmed Trabelsi',
      color: 'from-pink-500 to-rose-600',
      icon: '📚'
    }
  ]

  const contactInfo = [
    {
      type: 'Adresse Principal',
      value: 'Avenue de la République, 2080 Ariana, Tunisie',
      icon: '📍',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      type: 'Téléphone Général',
      value: '+216 71 123 456',
      icon: '📞',
      color: 'from-green-500 to-emerald-600'
    },
    {
      type: 'Email Principal',
      value: 'info@iseav-aru.tn',
      icon: '✉️',
      color: 'from-purple-500 to-violet-600'
    },
    {
      type: 'Fax',
      value: '+216 71 123 457',
      icon: '📠',
      color: 'from-teal-500 to-cyan-600'
    }
  ]

  const officeHours = [
    { day: 'Lundi - Vendredi', hours: '8h00 - 17h00', type: 'Administration' },
    { day: 'Samedi', hours: '8h00 - 12h00', type: 'Services essentiels' },
    { day: 'Dimanche', hours: 'Fermé', type: 'Repos hebdomadaire' }
  ]

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/iseav.aru', icon: '📘', followers: '12K+' },
    { name: 'LinkedIn', url: 'https://linkedin.com/school/iseav-aru', icon: '💼', followers: '8K+' },
    { name: 'YouTube', url: 'https://youtube.com/@iseav-aru', icon: '📺', followers: '5K+' },
    { name: 'Instagram', url: 'https://instagram.com/iseav_aru', icon: '📸', followers: '15K+' }
  ]

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
        department: '',
        message: ''
      })
      
      setTimeout(() => setSubmitStatus(''), 5000)
    }, 2000)
  }

  const stats = [
    { label: 'Étudiants Accompagnés', value: '1,200+', icon: '🎓', description: 'Chaque année' },
    { label: 'Temps de Réponse', value: '< 24h', icon: '⚡', description: 'Réponse garantie' },
    { label: 'Satisfaction', value: '98%', icon: '😊', description: 'Clients satisfaits' },
    { label: 'Langues Parlées', value: '5', icon: '🌐', description: 'Support multilingue' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/85 via-blue-800/75 to-cyan-700/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className={`text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up">
                <span className="bg-gradient-to-r from-cyan-300 via-white to-blue-300 bg-clip-text text-transparent">
                  Contactez-Nous
                </span>
              </h1>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-cyan-100 animate-fade-in-up delay-200">
                Nous Sommes Là Pour Vous
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Contactez notre équipe dédiée pour toutes vos questions concernant ISEAV-ARU, 
                nos programmes et services.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-600">
                <a 
                  href="#contact-form"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-10 py-5 rounded-full text-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-cyan-500/25"
                >
                  Nous Écrire
                </a>
                <a 
                  href="tel:+21671123456"
                  className="border-3 border-white text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-cyan-900 transition-all duration-300 transform hover:scale-110 shadow-2xl"
                >
                  📞 Nous Appeler
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Contact Icons */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/20 rounded-full animate-bounce delay-1000 flex items-center justify-center text-2xl">📞</div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-400/20 rounded-full animate-bounce delay-1500 flex items-center justify-center text-xl">✉️</div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-teal-400/20 rounded-full animate-bounce delay-2000 flex items-center justify-center text-lg">📍</div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-1500 {
          animation-delay: 1.5s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group transform hover:scale-110 transition-all duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform duration-500 shadow-lg group-hover:shadow-2xl">
                    {stat.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-5xl font-bold text-gray-800 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-gray-700 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Informations de <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Contact</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Toutes les coordonnées pour nous joindre facilement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`p-6 bg-gradient-to-r ${info.color} text-white`}>
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-bold">{info.type}</h3>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 font-medium text-lg">{info.value}</p>
                  {info.type === 'Téléphone Général' && (
                    <a 
                      href={`tel:${info.value}`}
                      className="mt-3 inline-block text-cyan-600 hover:text-cyan-700 font-semibold"
                    >
                      Appeler maintenant →
                    </a>
                  )}
                  {info.type === 'Email Principal' && (
                    <a 
                      href={`mailto:${info.value}`}
                      className="mt-3 inline-block text-cyan-600 hover:text-cyan-700 font-semibold"
                    >
                      Envoyer un email →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Contacts par <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Département</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contactez directement le département concerné par votre demande
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`p-6 bg-gradient-to-r ${dept.color} text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {dept.icon}
                    </div>
                    <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
                  <p className="text-white/90 text-sm">{dept.description}</p>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-1">Responsable</div>
                    <div className="font-semibold text-gray-800">{dept.head}</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <span className="w-5 h-5 flex items-center justify-center mr-3">📧</span>
                      <a href={`mailto:${dept.email}`} className="hover:text-cyan-600 transition-colors duration-300">
                        {dept.email}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="w-5 h-5 flex items-center justify-center mr-3">📞</span>
                      <a href={`tel:${dept.phone}`} className="hover:text-cyan-600 transition-colors duration-300">
                        {dept.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`mailto:${dept.email}`}
                      className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-center text-sm"
                    >
                      Email
                    </a>
                    <a
                      href={`tel:${dept.phone}`}
                      className="px-4 py-3 border-2 border-cyan-600 text-cyan-600 rounded-lg font-semibold hover:bg-cyan-600 hover:text-white transition-all duration-300 transform hover:scale-105 text-sm"
                    >
                      Appeler
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Envoyez-nous un <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Message</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre équipe vous répondra dans les plus brefs délais
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

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Sujet *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors duration-300 bg-white"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="admissions">Admissions & Inscriptions</option>
                  <option value="programs">Programmes de Formation</option>
                  <option value="research">Recherche & Partenariats</option>
                  <option value="international">Relations Internationales</option>
                  <option value="student-life">Vie Étudiante</option>
                  <option value="employment">Emploi & Carrières</option>
                  <option value="other">Autre demande</option>
                </select>
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-semibold text-gray-700 mb-2">
                  Département concerné
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors duration-300 bg-white"
                >
                  <option value="">Sélectionnez un département</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>
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
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 hover:shadow-cyan-500/25'
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

      {/* Office Hours & Social Media */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Office Hours */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center lg:text-left">
                Heures d'<span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Ouverture</span>
              </h2>
              
              <div className="space-y-4">
                {officeHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
                          {schedule.day}
                        </div>
                        <div className="text-sm text-gray-600">{schedule.type}</div>
                      </div>
                      <div className="text-xl font-semibold text-cyan-600">
                        {schedule.hours}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-100">
                <h3 className="text-xl font-bold text-cyan-800 mb-3 flex items-center">
                  <span className="text-2xl mr-3">🚨</span>
                  Urgences
                </h3>
                <p className="text-cyan-700 mb-3">
                  Pour les urgences académiques ou administratives en dehors des heures d'ouverture
                </p>
                <a 
                  href="tel:+21671123000"
                  className="inline-block bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors duration-300"
                >
                  📞 Ligne d'urgence: +216 71 123 000
                </a>
              </div>
            </div>

            {/* Social Media & Additional Info */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center lg:text-left">
                Suivez-<span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Nous</span>
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100 text-center"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                    <div className="font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
                      {social.name}
                    </div>
                    <div className="text-sm text-gray-600">{social.followers}</div>
                  </a>
                ))}
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    Rendez-vous Personnalisé
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Planifiez un entretien avec nos conseillers pour une orientation personnalisée
                  </p>
                  <Link 
                    href="/visit"
                    className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Planifier une Visite →
                  </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">🚌</span>
                    Comment Nous Trouver
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Facilement accessible en transport public
                  </p>
                  <div className="text-sm text-gray-600">
                    <div>• Bus lignes 15, 28, 42 - Arrêt "ISEAV-ARU"</div>
                    <div>• Métro ligne 2 - Station "Ariana Centre" (10min à pied)</div>
                    <div>• Parking gratuit disponible sur le campus</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Notre <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Localisation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Campus principal situé au cœur d'Ariana, facilement accessible
            </p>
          </div>

          <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center h-96">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Carte Interactive</h3>
                <p className="text-gray-600 mb-4">
                  Avenue de la République, 2080 Ariana, Tunisie
                </p>
                <a
                  href="https://maps.google.com/?q=ISEAV-ARU+Ariana+Tunisie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Ouvrir dans Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Prêt à Nous Rejoindre ?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed">
            Découvrez toutes les opportunités qu'offre ISEAV-ARU pour votre formation 
            et votre développement professionnel.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/admissions" 
              className="bg-white text-cyan-600 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Candidater Maintenant
            </Link>
            <Link 
              href="/programs" 
              className="border-3 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-cyan-600 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Découvrir nos Programmes
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}