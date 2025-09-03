"use client";

import Link from "next/link";
import Image from "next/image";

export default function ISEAVFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 agricultural-pattern opacity-5"></div>
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Institution Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <Image 
                  src="/images/logos/logo_iseav.png" 
                  alt="ISEAV-WALUNGU" 
                  width={80} 
                  height={80} 
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-2xl font-bold">ISEAV-WALUNGU</h3>
                  <p className="text-green-300 text-sm">
                    Institut Supérieur d'Études Agronomiques et Vétérinaires
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Pionniers de l'excellence agricole au Sud-Kivu, nous formons la nouvelle génération 
                d'agronomes et de vétérinaires qui transformeront l'agriculture congolaise.
              </p>
              
              {/* Official Recognition */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <h4 className="text-lg font-semibold mb-3 text-yellow-300">🏛️ Reconnaissance Officielle</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Arrêté Ministériel:</span> N° 0041/2021</p>
                  <p><span className="font-medium">Date:</span> 4 février 2021</p>
                  <p><span className="font-medium">Ministère:</span> Enseignement Supérieur et Universitaire - RDC</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex space-x-4">
                {[
                  { name: 'Facebook', icon: '📘', href: '#' },
                  { name: 'Twitter', icon: '🐦', href: '#' },
                  { name: 'LinkedIn', icon: '💼', href: '#' },
                  { name: 'YouTube', icon: '📺', href: '#' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-xl hover:bg-green-500 transition-all duration-300 hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-yellow-300">Liens Rapides</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Nos Programmes', href: '/programmes' },
                  { name: 'Admission', href: '/inscription' },
                  { name: 'Recherche', href: '/recherche' },
                  { name: 'Campus', href: '/campus' },
                  { name: 'Actualités', href: '/actualites' },
                  { name: 'Emploi', href: '/emploi' },
                  { name: 'Alumni', href: '/alumni' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-green-300 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-yellow-300">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-gray-300 text-sm">
                      Territoire de Walungu<br />
                      Province du Sud-Kivu<br />
                      République Démocratique du Congo
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-gray-300 text-sm">+243 XXX XXX XXX</p>
                    <p className="text-gray-300 text-sm">+243 XXX XXX XXX</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-300 text-sm">info@iseav-walungu.ac.cd</p>
                    <p className="text-gray-300 text-sm">admission@iseav-walungu.ac.cd</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🕒</span>
                  <div>
                    <p className="font-medium">Heures d'ouverture</p>
                    <p className="text-gray-300 text-sm">
                      Lun - Ven: 7h30 - 17h00<br />
                      Sam: 8h00 - 12h00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Programs Banner */}
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h4 className="text-center text-xl font-bold mb-6 text-yellow-300">
              Nos Programmes Accrédités
            </h4>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { name: 'Agronomie Générale', level: 'Master', icon: '🌾' },
                { name: 'Agrovétérinaire', level: 'Master', icon: '🐄' },
                { name: 'Agroforesterie', level: 'Master', icon: '🌲' },
                { name: 'Gestion Ressources', level: 'Licence', icon: '🌿' },
                { name: 'Transformation', level: 'Licence', icon: '🏭' },
              ].map((program) => (
                <div key={program.name} className="text-center">
                  <div className="text-3xl mb-2">{program.icon}</div>
                  <p className="font-medium text-sm">{program.name}</p>
                  <span className="text-xs text-green-300">{program.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-300">
                <p>© {currentYear} ISEAV-WALUNGU. Tous droits réservés.</p>
                <p className="text-xs mt-1">
                  Institut Supérieur d'Études Agronomiques et Vétérinaires de Walungu
                </p>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <Link href="/privacy" className="text-gray-300 hover:text-green-300 transition-colors">
                  Politique de Confidentialité
                </Link>
                <Link href="/terms" className="text-gray-300 hover:text-green-300 transition-colors">
                  Conditions d'Utilisation
                </Link>
                <div className="flex items-center space-x-2 text-gray-400">
                  <span>Développé avec</span>
                  <span className="text-red-400">❤️</span>
                  <span>pour l'excellence agricole</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}