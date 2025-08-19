import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-iseav-50 to-gold-50">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Nous sommes là pour répondre à toutes vos questions concernant 
              l'ISEAV-ARU et nos programmes de formation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-8">Informations de Contact</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-iseav-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-iseav-600 text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900 mb-2">Adresse</h3>
                    <p className="text-navy-600">
                      Avenue de la République<br />
                      2080 Ariana, Tunisie
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-gold-600 text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900 mb-2">Téléphone</h3>
                    <p className="text-navy-600">
                      +216 71 123 456<br />
                      +216 71 789 012
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-iseav-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-iseav-600 text-xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900 mb-2">Email</h3>
                    <p className="text-navy-600">
                      info@iseav-aru.tn<br />
                      admissions@iseav-aru.tn
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-gold-600 text-xl">🌐</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900 mb-2">Site Web & Réseaux</h3>
                    <p className="text-navy-600">
                      www.iseav-aru.org<br />
                      <a href="https://facebook.com/iseav.aru" className="text-iseav-600 hover:text-iseav-700">
                        Facebook: @iseav.aru
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Departments */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-navy-900 mb-6">Contacts par Département</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-iseav-50 rounded-lg">
                    <h4 className="font-semibold text-iseav-800">Admissions & Orientation</h4>
                    <p className="text-iseav-700">admissions@iseav-aru.tn • +216 71 123 456</p>
                  </div>
                  <div className="p-4 bg-gold-50 rounded-lg">
                    <h4 className="font-semibold text-gold-800">Recherche & Innovation</h4>
                    <p className="text-gold-700">recherche@iseav-aru.tn • +216 71 789 012</p>
                  </div>
                  <div className="p-4 bg-iseav-50 rounded-lg">
                    <h4 className="font-semibold text-iseav-800">Vie Étudiante</h4>
                    <p className="text-iseav-700">vie-etudiante@iseav-aru.tn • +216 71 456 789</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-8">Envoyez-nous un Message</h2>
              
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-navy-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iseav-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-navy-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iseav-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iseav-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-navy-700 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iseav-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="admissions">Admissions & Inscriptions</option>
                    <option value="programs">Programmes de Formation</option>
                    <option value="research">Recherche & Partenariats</option>
                    <option value="student-life">Vie Étudiante</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iseav-500 focus:border-transparent transition-colors resize-vertical"
                    placeholder="Décrivez votre demande en détail..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-iseav-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-iseav-700 transition-colors duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Envoyer le Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Hours & Additional Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-iseav-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-iseav-600 text-2xl">🕒</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-4">Heures d'Ouverture</h3>
              <div className="text-navy-600 space-y-1">
                <p>Lundi - Vendredi: 8h00 - 17h00</p>
                <p>Samedi: 8h00 - 12h00</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gold-600 text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-4">Rendez-vous</h3>
              <p className="text-navy-600 mb-4">
                Pour un entretien personnalisé, prenez rendez-vous avec nos conseillers.
              </p>
              <Link 
                href="/visit"
                className="text-iseav-600 font-semibold hover:text-iseav-700 transition-colors"
              >
                Planifier une visite →
              </Link>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-iseav-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-iseav-600 text-2xl">🚌</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-4">Comment nous Trouver</h3>
              <p className="text-navy-600">
                Facilement accessible en transport public. 
                Bus ligne 15, 28 - Arrêt "ISEAV-ARU"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}