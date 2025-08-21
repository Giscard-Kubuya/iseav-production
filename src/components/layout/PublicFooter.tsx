import Link from 'next/link'

export default function PublicFooter() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 mr-3">
                <img 
                  src="/images/logos/logo_extracted.png" 
                  alt="ISEAV WALUNGU Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <div className="font-bold text-lg">ISEAV WALUNGU</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm mb-6 leading-relaxed">
              Institut Supérieur d'Études Agronomiques et Vétérinaires - Walungu. 
              Excellence en éducation, innovation en recherche.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors">
                <span className="text-sm">📘</span>
              </a>
              <a href="#" className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors">
                <span className="text-sm">🐦</span>
              </a>
              <a href="#" className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors">
                <span className="text-sm">📷</span>
              </a>
              <a href="#" className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors">
                <span className="text-sm">💼</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg">Académique</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/academics/faculties" className="text-blue-200 hover:text-yellow-300 transition-colors">Facultés & Départements</Link></li>
              <li><Link href="/academics/programs" className="text-blue-200 hover:text-yellow-300 transition-colors">Programmes d'études</Link></li>
              <li><Link href="/academics/courses" className="text-blue-200 hover:text-yellow-300 transition-colors">Catalogue des cours</Link></li>
              <li><Link href="/academics/calendar" className="text-blue-200 hover:text-yellow-300 transition-colors">Calendrier académique</Link></li>
              <li><Link href="/research" className="text-blue-200 hover:text-yellow-300 transition-colors">Recherche & Innovation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/admissions" className="text-blue-200 hover:text-yellow-300 transition-colors">Admissions</Link></li>
              <li><Link href="/library" className="text-blue-200 hover:text-yellow-300 transition-colors">Bibliothèque</Link></li>
              <li><Link href="/student-life" className="text-blue-200 hover:text-yellow-300 transition-colors">Vie étudiante</Link></li>
              <li><Link href="/portal/student" className="text-blue-200 hover:text-yellow-300 transition-colors">Portails étudiants</Link></li>
              <li><Link href="/careers" className="text-blue-200 hover:text-yellow-300 transition-colors">Carrières</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg">Contact & Infos</h4>
            <div className="space-y-3 text-sm text-blue-200">
              <div className="flex items-start">
                <span className="mr-2 mt-1">📍</span>
                <div>
                  <p>Campus Universitaire</p>
                  <p>Walungu, République Démocratique du Congo</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📞</span>
                <p>+243 97 123 4567</p>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✉️</span>
                <p>info@iseav-walungu.edu.cd</p>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🌐</span>
                <p>www.iseav-walungu.edu.cd</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="font-semibold mb-3">Newsletter</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="flex-1 px-3 py-2 bg-blue-800 border border-blue-700 rounded-l text-sm focus:outline-none focus:border-yellow-500"
                />
                <button className="bg-yellow-600 px-4 py-2 rounded-r hover:bg-yellow-700 transition-colors">
                  <span className="text-sm">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue-300">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2025 ISEAV WALUNGU. Tous droits réservés.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-yellow-300 transition-colors">Politique de confidentialité</Link>
              <Link href="/terms" className="hover:text-yellow-300 transition-colors">Conditions d'utilisation</Link>
              <Link href="/accessibility" className="hover:text-yellow-300 transition-colors">Accessibilité</Link>
              <Link href="/sitemap" className="hover:text-yellow-300 transition-colors">Plan du site</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}