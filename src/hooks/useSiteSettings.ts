import { useApiData } from './useApi'
import { websiteApi } from '@/lib/api-services'

export interface SiteSettings {
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
    language: 'fr'
  },
  social: {
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    youtube: '',
    github: ''
  },
  seo: {
    metaTitle: 'INFONET - Solutions informatiques au Burundi',
    metaDescription: 'INFONET offre des solutions informatiques innovantes au Burundi. Développement web, mobile, sécurité IT et plus encore.',
    metaKeywords: 'informatique, burundi, développement web, mobile, sécurité IT',
    googleAnalytics: '',
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

export function useSiteSettings() {
  const { data: websiteData, loading, error } = useApiData(
    () => websiteApi.getCurrent(),
    []
  )

  // Merge API data with defaults
  let settings = getDefaultSettings()
  
  if (websiteData?.data) {
    const apiData = websiteData.data
    const apiSettings = apiData.settings || {}
    
    settings = {
      general: {
        siteName: apiData.name || settings.general.siteName,
        siteDescription: apiData.description || settings.general.siteDescription,
        siteUrl: apiSettings.general?.siteUrl || settings.general.siteUrl,
        adminEmail: apiSettings.general?.adminEmail || settings.general.adminEmail,
        contactEmail: apiSettings.general?.contactEmail || settings.general.contactEmail,
        phone: apiSettings.general?.phone || settings.general.phone,
        address: apiSettings.general?.address || settings.general.address,
        timezone: apiSettings.general?.timezone || settings.general.timezone,
        language: apiSettings.general?.language || settings.general.language
      },
      social: {
        facebook: apiSettings.social?.facebook || settings.social.facebook,
        twitter: apiSettings.social?.twitter || settings.social.twitter,
        linkedin: apiSettings.social?.linkedin || settings.social.linkedin,
        instagram: apiSettings.social?.instagram || settings.social.instagram,
        youtube: apiSettings.social?.youtube || settings.social.youtube,
        github: apiSettings.social?.github || settings.social.github
      },
      seo: {
        metaTitle: apiSettings.seo?.metaTitle || `${apiData.name} - Solutions informatiques`,
        metaDescription: apiSettings.seo?.metaDescription || apiData.description || settings.seo.metaDescription,
        metaKeywords: apiSettings.seo?.metaKeywords || settings.seo.metaKeywords,
        googleAnalytics: apiSettings.seo?.googleAnalytics || settings.seo.googleAnalytics,
        facebookPixel: apiSettings.seo?.facebookPixel || settings.seo.facebookPixel,
        googleVerification: apiSettings.seo?.googleVerification || settings.seo.googleVerification
      },
      legal: apiSettings.legal || settings.legal,
      security: apiSettings.security || settings.security,
      appearance: apiSettings.appearance || settings.appearance
    }
  }

  return {
    settings,
    loading,
    error,
    isLoaded: !loading && websiteData
  }
}