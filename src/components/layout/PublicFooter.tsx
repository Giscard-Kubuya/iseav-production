'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useWebsiteConfig } from '@/hooks/useWebsiteConfig'
import LegalModal from '@/components/ui/LegalModal'

export default function PublicFooter() {
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'privacy' | 'terms' | null }>({
    isOpen: false,
    type: null
  })
  
  const { websiteConfig, loading: configLoading } = useWebsiteConfig()

  const openLegalModal = (type: 'privacy' | 'terms') => {
    setLegalModal({ isOpen: true, type })
  }

  const closeLegalModal = () => {
    setLegalModal({ isOpen: false, type: null })
  }
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 mr-3">
                <img 
                  src={websiteConfig?.settings?.appearance?.logo || websiteConfig?.appearance?.logo || "/images/logos/cepac-logo.png"} 
                  alt={`${websiteConfig?.name || '8e CEPAC'} Logo`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <div className="font-bold text-lg">{websiteConfig?.name || websiteConfig?.settings?.general?.siteName || '8e CEPAC'}</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm mb-6 leading-relaxed">
              {websiteConfig?.description || websiteConfig?.settings?.general?.siteDescription || 'Contribuer au développement communautaire, promouvoir le bien-être social et améliorer les conditions de vie des populations en République Démocratique du Congo.'}
            </p>
            <div className="flex space-x-4">
              {(websiteConfig?.social_media?.facebook || websiteConfig?.social?.facebook || websiteConfig?.settings?.social?.facebook) && (
                <a 
                  href={websiteConfig?.social_media?.facebook || websiteConfig?.social?.facebook || websiteConfig?.settings?.social?.facebook}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors"
                  title="Facebook"
                >
                  <span className="text-sm">📘</span>
                </a>
              )}
              {(websiteConfig?.social_media?.twitter || websiteConfig?.social?.twitter || websiteConfig?.settings?.social?.twitter) && (
                <a 
                  href={websiteConfig?.social_media?.twitter || websiteConfig?.social?.twitter || websiteConfig?.settings?.social?.twitter}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors"
                  title="Twitter"
                >
                  <span className="text-sm">🐦</span>
                </a>
              )}
              {(websiteConfig?.social_media?.instagram || websiteConfig?.social?.instagram || websiteConfig?.settings?.social?.instagram) && (
                <a 
                  href={websiteConfig?.social_media?.instagram || websiteConfig?.social?.instagram || websiteConfig?.settings?.social?.instagram}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors"
                  title="Instagram"
                >
                  <span className="text-sm">📷</span>
                </a>
              )}
              {(websiteConfig?.social_media?.linkedin || websiteConfig?.social?.linkedin || websiteConfig?.settings?.social?.linkedin) && (
                <a 
                  href={websiteConfig?.social_media?.linkedin || websiteConfig?.social?.linkedin || websiteConfig?.settings?.social?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors"
                  title="LinkedIn"
                >
                  <span className="text-sm">💼</span>
                </a>
              )}
              {(websiteConfig?.social_media?.youtube || websiteConfig?.social?.youtube || websiteConfig?.settings?.social?.youtube) && (
                <a 
                  href={websiteConfig?.social_media?.youtube || websiteConfig?.social?.youtube || websiteConfig?.settings?.social?.youtube}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors"
                  title="YouTube"
                >
                  <span className="text-sm">📺</span>
                </a>
              )}
              {(websiteConfig?.social_media?.github || websiteConfig?.social?.github || websiteConfig?.settings?.social?.github) && (
                <a 
                  href={websiteConfig?.social_media?.github || websiteConfig?.social?.github || websiteConfig?.settings?.social?.github}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors"
                  title="GitHub"
                >
                  <span className="text-sm">🔧</span>
                </a>
              )}
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
                  <p>{websiteConfig?.address || websiteConfig?.settings?.address || websiteConfig?.general?.address || 'Projet-Beni, République Démocratique du Congo'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📞</span>
                <p>{websiteConfig?.contact_phone || websiteConfig?.phone || websiteConfig?.settings?.phone || websiteConfig?.general?.phone || '+243 970 102 102'}</p>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✉️</span>
                <p>{websiteConfig?.contact_email || websiteConfig?.settings?.contact_email || websiteConfig?.general?.contactEmail || 'contact@projetcepacbeni.org'}</p>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🌐</span>
                <p>{websiteConfig?.domain || websiteConfig?.settings?.general?.siteUrl || 'projetcepacbeni.org'}</p>
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
              <p>{websiteConfig?.settings?.appearance?.footerText || websiteConfig?.appearance?.footerText || '© 2025 8e CEPAC. Tous droits réservés.'}</p>
            </div>
            <div className="flex space-x-6">
              <button 
                onClick={() => openLegalModal('privacy')}
                className="hover:text-yellow-300 transition-colors cursor-pointer"
              >
                Politique de confidentialité
              </button>
              <button 
                onClick={() => openLegalModal('terms')}
                className="hover:text-yellow-300 transition-colors cursor-pointer"
              >
                Conditions d'utilisation
              </button>
              <Link href="/accessibility" className="hover:text-yellow-300 transition-colors">Accessibilité</Link>
              <Link href="/sitemap" className="hover:text-yellow-300 transition-colors">Plan du site</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legal Modal */}
      {legalModal.type && (
        <LegalModal
          isOpen={legalModal.isOpen}
          onClose={closeLegalModal}
          type={legalModal.type}
        />
      )}
    </footer>
  )
}