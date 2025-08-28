'use client'

import { useState, useEffect } from 'react'
import { useApiData } from '@/hooks/useApi'
import { websiteApi } from '@/lib/api-services'
import ImageUpload from './ImageUpload'

interface SiteSettings {
  general: {
    siteName: string
    siteDescription: string
    siteUrl: string
    adminEmail: string
    contactEmail: string
    phone: string
    address: string
    timezone: string
    language: string
    mission: string
    vision: string
  }
  social: {
    facebook: string
    twitter: string
    linkedin: string
    instagram: string
    youtube: string
    github: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    metaKeywords: string
    googleAnalytics: string
    facebookPixel: string
    googleVerification: string
  }
  legal: {
    privacyPolicy: string
    termsOfService: string
  }
  security: {
    enableRegistration: boolean
    requireEmailVerification: boolean
    enableCommentModeration: boolean
    enableRecaptcha: boolean
    recaptchaSiteKey: string
    recaptchaSecretKey: string
    sessionTimeout: number
    maxLoginAttempts: number
  }
  appearance: {
    logo: string | null
    favicon: string | null
    primaryColor: string
    secondaryColor: string
    fontFamily: string
    headerStyle: 'default' | 'minimal' | 'modern'
    footerText: string
  }
}

export default function SettingsManagement() {
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)
  
  // Fetch current website settings
  const { data: websiteData, loading: websiteLoading } = useApiData(
    () => websiteApi.getCurrent(),
    []
  )

  // Fetch current parameters
  const { data: parametersData, loading: parametersLoading } = useApiData(
    () => websiteApi.getParameters(),
    []
  )

  const getDefaultSettings = (): SiteSettings => ({
      general: {
        siteName: 'INFONET',
        siteDescription: 'Solutions informatiques innovantes au Burundi',
        siteUrl: 'https://infonet.bi',
        adminEmail: 'admin@infonet.bi',
        contactEmail: 'contact@infonet.bi',
        phone: '+257 22 123 456',
        address: 'Avenue de l\'Indépendance, Bujumbura, Burundi',
        timezone: 'Africa/Bujumbura',
        language: 'fr',
        mission: 'Fournir des solutions informatiques innovantes et accessibles pour accompagner la transformation digitale au Burundi.',
        vision: 'Devenir le leader technologique incontournable au Burundi et contribuer au développement numérique de la région.'
      },
      social: {
        facebook: 'https://facebook.com/infonetbi',
        twitter: 'https://twitter.com/infonetbi',
        linkedin: 'https://linkedin.com/company/infonet-burundi',
        instagram: 'https://instagram.com/infonetbi',
        youtube: 'https://youtube.com/@infonetbi',
        github: 'https://github.com/infonet-bi'
      },
      seo: {
        metaTitle: 'INFONET - Solutions informatiques au Burundi',
        metaDescription: 'INFONET offre des solutions informatiques innovantes au Burundi. Développement web, mobile, sécurité IT et plus encore.',
        metaKeywords: 'informatique, burundi, développement web, mobile, sécurité IT',
        googleAnalytics: 'G-XXXXXXXXXX',
        facebookPixel: '',
        googleVerification: ''
      },
      legal: {
        privacyPolicy: 'Notre politique de confidentialité protège vos données personnelles selon les normes internationales.',
        termsOfService: 'Nos conditions d\'utilisation définissent les règles d\'usage de nos services.'
      },
      security: {
        enableRegistration: true,
        requireEmailVerification: true,
        enableCommentModeration: true,
        enableRecaptcha: false,
        recaptchaSiteKey: '',
        recaptchaSecretKey: '',
        sessionTimeout: 30,
        maxLoginAttempts: 5
      },
      appearance: {
        logo: '/images/logos/infonet-logo.png',
        favicon: '/favicon.ico',
        primaryColor: '#059669',
        secondaryColor: '#1f2937',
        fontFamily: 'Inter',
        headerStyle: 'modern',
        footerText: '© 2025 INFONET. Tous droits réservés.'
      }
    })

  // Merge API data with defaults
  const [settings, setSettings] = useState<SiteSettings>(getDefaultSettings())

  // Update settings when API data is loaded
  useEffect(() => {
    if (websiteData?.data && parametersData?.data) {
      const apiData = websiteData.data
      const apiSettings = apiData.settings || {}
      const parametersApiData = parametersData.data
      
      setSettings({
        general: {
          siteName: apiData.name || 'INFONET',
          siteDescription: apiData.description || 'Solutions informatiques innovantes au Burundi',
          siteUrl: apiSettings.general?.siteUrl || 'https://infonet.bi',
          adminEmail: apiSettings.general?.adminEmail || 'admin@infonet.bi',
          contactEmail: parametersApiData.contact_email || apiSettings.general?.contactEmail || 'contact@infonet.bi',
          phone: parametersApiData.contact_phone || apiSettings.general?.phone || '+257 22 123 456',
          address: parametersApiData.address || apiSettings.general?.address || 'Avenue de l\'Indépendance, Bujumbura, Burundi',
          timezone: apiSettings.general?.timezone || 'Africa/Bujumbura',
          language: apiSettings.general?.language || 'fr',
          mission: parametersApiData.mission || 'Fournir des solutions informatiques innovantes et accessibles pour accompagner la transformation digitale au Burundi.',
          vision: parametersApiData.vision || 'Devenir le leader technologique incontournable au Burundi et contribuer au développement numérique de la région.'
        },
        social: {
          facebook: parametersApiData.social_media?.facebook || apiSettings.social?.facebook || '',
          twitter: parametersApiData.social_media?.twitter || apiSettings.social?.twitter || '',
          linkedin: parametersApiData.social_media?.linkedin || apiSettings.social?.linkedin || '',
          instagram: parametersApiData.social_media?.instagram || apiSettings.social?.instagram || '',
          youtube: parametersApiData.social_media?.youtube || apiSettings.social?.youtube || '',
          github: parametersApiData.social_media?.github || apiSettings.social?.github || ''
        },
        seo: {
          metaTitle: apiSettings.seo?.metaTitle || `${apiData.name} - Solutions informatiques`,
          metaDescription: apiSettings.seo?.metaDescription || apiData.description || '',
          metaKeywords: apiSettings.seo?.metaKeywords || '',
          googleAnalytics: apiSettings.seo?.googleAnalytics || '',
          facebookPixel: apiSettings.seo?.facebookPixel || '',
          googleVerification: apiSettings.seo?.googleVerification || ''
        },
        legal: apiSettings.legal || getDefaultSettings().legal,
        security: apiSettings.security || getDefaultSettings().security,
        appearance: apiSettings.appearance || getDefaultSettings().appearance
      })
    }
  }, [websiteData, parametersData])

  const tabs = [
    { id: 'general', label: 'Général', icon: '⚙️' },
    { id: 'social', label: 'Réseaux sociaux', icon: '🌐' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    { id: 'legal', label: 'Légal', icon: '📋' },
    { id: 'security', label: 'Sécurité', icon: '🔒' },
    { id: 'appearance', label: 'Apparence', icon: '🎨' }
  ]

  const handleSave = async () => {
    setSaving(true)
    try {
      // Update basic website info
      await websiteApi.update({
        name: settings.general.siteName,
        description: settings.general.siteDescription,
      })
      
      // Update parameters (mission, vision, etc.)
      await websiteApi.updateParameters({
        mission: settings.general.mission,
        vision: settings.general.vision,
        contact_email: settings.general.contactEmail,
        contact_phone: settings.general.phone,
        address: settings.general.address,
        social_media: settings.social,
      })
      
      alert('Paramètres sauvegardés avec succès!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Erreur lors de la sauvegarde: ' + (error.response?.data?.error || error.message))
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (section: keyof SiteSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  if (websiteLoading || parametersLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Chargement des paramètres...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres du Site</h1>
          <p className="text-gray-600">Configurez tous les aspects de votre site web</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Sauvegarde...' : 'Sauvegarder les changements'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Paramètres généraux</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du site
                  </label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL du site
                  </label>
                  <input
                    type="url"
                    value={settings.general.siteUrl}
                    onChange={(e) => handleInputChange('general', 'siteUrl', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description du site
                  </label>
                  <textarea
                    value={settings.general.siteDescription}
                    onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email administrateur
                  </label>
                  <input
                    type="email"
                    value={settings.general.adminEmail}
                    onChange={(e) => handleInputChange('general', 'adminEmail', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email de contact
                  </label>
                  <input
                    type="email"
                    value={settings.general.contactEmail}
                    onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={settings.general.phone}
                    onChange={(e) => handleInputChange('general', 'phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuseau horaire
                  </label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Africa/Bujumbura">Africa/Bujumbura</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse
                  </label>
                  <textarea
                    value={settings.general.address}
                    onChange={(e) => handleInputChange('general', 'address', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mission de l'entreprise
                  </label>
                  <textarea
                    value={settings.general.mission}
                    onChange={(e) => handleInputChange('general', 'mission', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez la mission de votre entreprise..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    La mission définit le but et les objectifs de votre entreprise.
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vision de l'entreprise
                  </label>
                  <textarea
                    value={settings.general.vision}
                    onChange={(e) => handleInputChange('general', 'vision', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez la vision d'avenir de votre entreprise..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    La vision décrit où vous voyez votre entreprise dans le futur.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Réseaux sociaux</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(settings.social).map(([platform, url]) => (
                  <div key={platform}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {platform}
                    </label>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleInputChange('social', platform, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`https://${platform}.com/votre-profil`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Optimisation SEO</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre Meta par défaut
                  </label>
                  <input
                    type="text"
                    value={settings.seo.metaTitle}
                    onChange={(e) => handleInputChange('seo', 'metaTitle', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description Meta par défaut
                  </label>
                  <textarea
                    value={settings.seo.metaDescription}
                    onChange={(e) => handleInputChange('seo', 'metaDescription', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mots-clés par défaut
                  </label>
                  <input
                    type="text"
                    value={settings.seo.metaKeywords}
                    onChange={(e) => handleInputChange('seo', 'metaKeywords', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="mot1, mot2, mot3"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Google Analytics ID
                    </label>
                    <input
                      type="text"
                      value={settings.seo.googleAnalytics}
                      onChange={(e) => handleInputChange('seo', 'googleAnalytics', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Facebook Pixel ID
                    </label>
                    <input
                      type="text"
                      value={settings.seo.facebookPixel}
                      onChange={(e) => handleInputChange('seo', 'facebookPixel', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'legal' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Documents légaux</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Politique de Confidentialité
                  </label>
                  <textarea
                    value={settings.legal.privacyPolicy}
                    onChange={(e) => handleInputChange('legal', 'privacyPolicy', e.target.value)}
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Rédigez votre politique de confidentialité..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Décrivez comment vous collectez, utilisez et protégez les données personnelles des utilisateurs.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conditions d'Utilisation
                  </label>
                  <textarea
                    value={settings.legal.termsOfService}
                    onChange={(e) => handleInputChange('legal', 'termsOfService', e.target.value)}
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Rédigez vos conditions d'utilisation..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Définissez les règles et conditions d'utilisation de vos services.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Paramètres de sécurité</h3>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableRegistration"
                      checked={settings.security.enableRegistration}
                      onChange={(e) => handleInputChange('security', 'enableRegistration', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enableRegistration" className="ml-2 block text-sm text-gray-900">
                      Permettre l'inscription de nouveaux utilisateurs
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="requireEmailVerification"
                      checked={settings.security.requireEmailVerification}
                      onChange={(e) => handleInputChange('security', 'requireEmailVerification', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="requireEmailVerification" className="ml-2 block text-sm text-gray-900">
                      Exiger la vérification par email
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableCommentModeration"
                      checked={settings.security.enableCommentModeration}
                      onChange={(e) => handleInputChange('security', 'enableCommentModeration', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enableCommentModeration" className="ml-2 block text-sm text-gray-900">
                      Modération des commentaires
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Délai d'expiration de session (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tentatives de connexion max
                    </label>
                    <input
                      type="number"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Apparence du site</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo du site
                  </label>
                  <ImageUpload
                    module="settings"
                    currentImageUrl={settings.appearance.logo || undefined}
                    onImageUploaded={(imageData) => {
                      handleInputChange('appearance', 'logo', imageData.url)
                    }}
                    acceptedFormats={['jpg', 'jpeg', 'png', 'webp', 'svg']}
                    maxSizeMB={2}
                    altText="Site logo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favicon
                  </label>
                  <ImageUpload
                    module="settings"
                    currentImageUrl={settings.appearance.favicon || undefined}
                    onImageUploaded={(imageData) => {
                      handleInputChange('appearance', 'favicon', imageData.url)
                    }}
                    acceptedFormats={['ico', 'png', 'jpg', 'jpeg']}
                    maxSizeMB={1}
                    altText="Site favicon"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Formats recommandés: ICO, PNG (16x16 ou 32x32 pixels)
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur primaire
                  </label>
                  <input
                    type="color"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur secondaire
                  </label>
                  <input
                    type="color"
                    value={settings.appearance.secondaryColor}
                    onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Police de caractères
                  </label>
                  <select
                    value={settings.appearance.fontFamily}
                    onChange={(e) => handleInputChange('appearance', 'fontFamily', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Lato">Lato</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Style d'en-tête
                  </label>
                  <select
                    value={settings.appearance.headerStyle}
                    onChange={(e) => handleInputChange('appearance', 'headerStyle', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="default">Par défaut</option>
                    <option value="minimal">Minimal</option>
                    <option value="modern">Moderne</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texte du pied de page
                  </label>
                  <input
                    type="text"
                    value={settings.appearance.footerText}
                    onChange={(e) => handleInputChange('appearance', 'footerText', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}