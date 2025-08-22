'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <img 
                  src="/images/logos/infonet-logo.png" 
                  alt="INFONET Logo"
                  className="w-12 h-12 rounded-lg mr-3"
                />
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    INFONET
                  </h3>
                  <p className="text-sm text-gray-400">Solutions IT & Technologies</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                INFONET - Votre partenaire technologique de confiance au Burundi. 
                Spécialisés en développement web, solutions cloud et infrastructure IT.
              </p>
              
              {/* Social Media Links */}
              <div className="flex space-x-4">
                <a href="#" className="group">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </div>
                </a>
                <a href="#" className="group">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </div>
                </a>
                <a href="#" className="group">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-blue-800 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                </a>
                <a href="#" className="group">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.052 0.059c-6.627 0-11.993 5.367-11.993 11.993 0 5.301 3.435 9.801 8.206 11.388.599.111.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-11.993-12-11.993z"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Nos Services</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Développement Web
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Connectivité Internet
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Applications Mobiles
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Sécurité IT
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    À Propos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-start group">
                  <svg className="w-5 h-5 text-blue-400 mr-3 mt-1 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="text-gray-300 leading-relaxed">
                      Boulevard de l'Uprona<br />
                      Bujumbura, Burundi
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <svg className="w-5 h-5 text-blue-400 mr-3 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <a href="tel:+25769080800" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                    +257 69 08 08 00
                  </a>
                </div>
                
                <div className="flex items-center group">
                  <svg className="w-5 h-5 text-blue-400 mr-3 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <a href="mailto:info@infonet.bi" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                    info@infonet.bi
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Newsletter Tech</h4>
              <p className="text-gray-300 mb-4">
                Recevez nos insights technologiques et actualités IT directement dans votre boîte mail.
              </p>
              <form className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                >
                  S'abonner
                </button>
              </form>
              
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h5 className="text-sm font-semibold text-white mb-3">Expertise</h5>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">#Cloud</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">#WebDev</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">#Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 INFONET. Tous droits réservés. | Solutions IT & Technologies Numériques - Burundi
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Politique de Confidentialité
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Conditions d'Utilisation
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Plan du Site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}