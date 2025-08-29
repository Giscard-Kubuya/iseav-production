'use client'

import { useState, useEffect } from 'react'
import { useWebsiteSettings } from '@/hooks/useWebsiteSettings'
import { useSiteSettings } from '@/hooks/useSiteSettings'

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'privacy' | 'terms'
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const websiteSettings = useWebsiteSettings()
  const siteSettings = useSiteSettings()
  
  // Try to get content from various sources with proper fallbacks
  const privacyPolicy = websiteSettings.privacyPolicy || siteSettings.settings.legal.privacyPolicy
  const termsOfService = websiteSettings.termsOfService || siteSettings.settings.legal.termsOfService
  const loading = websiteSettings.loading || siteSettings.loading
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const title = type === 'privacy' ? 'Politique de Confidentialité' : 'Conditions d\'Utilisation'
  
  // Determine what content to show - always fall back to default if needed
  let content = ''
  if (type === 'privacy') {
    content = privacyPolicy || (siteSettings.settings?.legal?.privacyPolicy) || ''
  } else {
    content = termsOfService || (siteSettings.settings?.legal?.termsOfService) || ''
  }
  
  const defaultContent = type === 'privacy' 
    ? `# Politique de Confidentialité - INFONET

## Collecte des informations
Nous collectons des informations lorsque vous vous enregistrez sur notre site, vous connectez à votre compte, faites un achat, participez à un concours, et / ou lorsque vous vous déconnectez.

## Utilisation des informations
Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :
- Personnaliser votre expérience et répondre à vos besoins individuels
- Fournir un contenu publicitaire personnalisé
- Améliorer notre site Web
- Améliorer le service client et vos besoins de prise en charge
- Vous contacter par e-mail
- Administrer un concours, une promotion, ou une enquête

## Confidentialité du commerce en ligne
Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande et / ou une transaction.

## Divulgation à des tiers
Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers.

## Protection des informations
Nous mettons en œuvre diverses mesures de sécurité pour préserver la sécurité de vos informations personnelles.

## Consentement
En utilisant notre site, vous consentez à notre politique de confidentialité.`
    : `# Conditions d'Utilisation - INFONET

## Acceptation des conditions
En accédant et en utilisant ce site Web, vous acceptez d'être lié par les termes et conditions de service énoncées ci-dessous.

## Utilisation du site
Ce site Web peut être utilisé uniquement à des fins licites et d'une manière qui ne porte pas atteinte aux droits de, ou restreindre ou inhiber l'utilisation et la jouissance de ce site par un tiers.

## Contenu
Le contenu de ce site Web est fourni à titre informatif uniquement. Bien que nous nous efforcions de maintenir les informations à jour et correctes, nous ne faisons aucune déclaration ou garantie d'aucune sorte, expresse ou implicite, concernant l'exactitude, l'adéquation, la validité, la fiabilité, la disponibilité ou l'exhaustivité de toute information sur le site Web.

## Propriété intellectuelle
Le contenu de ce site Web, y compris mais sans s'y limiter, le texte, les graphiques, les images, les logos, les clips audio, les clips vidéo et les données, est protégé par des droits d'auteur et d'autres lois sur la propriété intellectuelle.

## Limitation de responsabilité
En aucun cas, INFONET ne sera responsable de tout dommage spécial, direct, indirect, consécutif ou accessoire ou de tout dommage quel qu'il soit.

## Modifications des conditions
INFONET se réserve le droit de réviser ces conditions d'utilisation à tout moment sans préavis.

## Contact
Pour toute question concernant ces conditions d'utilisation, vous pouvez nous contacter à contact@infonet.bi`

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(3px)' }}
      onClick={handleBackdropClick}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-gray-300 ring-4 ring-white/20 drop-shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Chargement...</p>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none text-gray-700">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: (content && content.trim() ? content : defaultContent)
                    .replace(/\n\n/g, '</p><p class="mb-4">')
                    .replace(/\n/g, '<br>')
                    .replace(/## ([^\n]+)/g, '<h3 class="text-xl font-semibold mt-6 mb-3 text-gray-900">$1</h3>')
                    .replace(/# ([^\n]+)/g, '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">$1</h2>')
                    .replace(/- ([^\n]+)/g, '<li class="mb-2">$1</li>')
                    .replace(/(<li.*<\/li>)/g, '<ul class="list-disc list-inside mb-4 space-y-1 ml-4">$1</ul>')
                }} 
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}