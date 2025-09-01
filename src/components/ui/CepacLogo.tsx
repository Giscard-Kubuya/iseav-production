'use client'

import Image from 'next/image'
import { useWebsiteConfig } from '@/hooks/useWebsiteConfig'

interface CepacLogoProps {
  size?: number
  className?: string
  showText?: boolean
  variant?: 'default' | 'white' | 'dark'
}

export default function CepacLogo({ size = 80, className = '', showText = true, variant = 'default' }: CepacLogoProps) {
  const { websiteConfig, loading } = useWebsiteConfig()
  
  const logoUrl = websiteConfig?.settings?.appearance?.logo || 
                  websiteConfig?.appearance?.logo

  // Text colors based on variant
  const textColors = {
    default: 'text-gray-800',
    white: 'text-white',
    dark: 'text-gray-900'
  }

  const subtitleColors = {
    default: 'text-gray-600',
    white: 'text-gray-200',
    dark: 'text-gray-700'
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div 
        className="relative rounded-full shadow-lg overflow-hidden"
        style={{ width: size, height: size }}
      >
        {logoUrl && !loading ? (
          <Image
            src={logoUrl}
            alt={websiteConfig?.name || '8e CEPAC Projet-Beni'}
            width={size}
            height={size}
            className="w-full h-full object-contain bg-white rounded-full"
            priority
          />
        ) : (
          // Fallback design when API logo is not available
          <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-green-500 rounded-full p-4 w-full h-full">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative overflow-hidden">
              {/* CEPAC Logo Design */}
              <div className="text-center">
                <div className="text-blue-600 font-bold text-lg leading-tight">
                  8<sup className="text-xs">e</sup>
                </div>
                <div className="text-green-600 font-bold text-xs -mt-1">
                  CEPAC
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full opacity-80"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
            </div>
          </div>
        )}
      </div>
      {showText && (
        <div className="mt-3 text-center">
          <div className={`text-lg font-bold ${textColors[variant]}`}>
            {websiteConfig?.name || '8e CEPAC'}
          </div>
          <div className={`text-sm ${subtitleColors[variant]}`}>
            Projet-Beni
          </div>
        </div>
      )}
    </div>
  )
}