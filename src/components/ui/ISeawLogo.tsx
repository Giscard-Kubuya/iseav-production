'use client'

import Image from 'next/image'
import { useWebsiteConfig } from '@/hooks/useWebsiteConfig'

interface ISeawLogoProps {
  size?: number
  className?: string
  showText?: boolean
  variant?: 'default' | 'white' | 'dark'
}

export default function ISeawLogo({ size = 80, className = '', showText = true, variant = 'default' }: ISeawLogoProps) {
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
            alt={websiteConfig?.name || 'ISEAV-WALUNGU'}
            width={size}
            height={size}
            className="w-full h-full object-contain bg-white rounded-full"
            priority
          />
        ) : (
          // Fallback design when API logo is not available - ISEAV inspired
          <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-green-500 rounded-full p-2 w-full h-full">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative overflow-hidden">
              {/* ISEAV Shield Design */}
              <div className="text-center relative">
                {/* EU Stars representation */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* Main Logo */}
                <div className="text-blue-600 font-bold text-sm leading-tight">
                  ISEAV
                </div>
                
                {/* Agricultural symbols */}
                <div className="flex justify-center items-center space-x-1 mt-1">
                  <span className="text-green-600 text-xs">🌾</span>
                  <span className="text-orange-500 text-xs">🐄</span>
                </div>
              </div>
              
              {/* Book representation at bottom */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-1 bg-yellow-400 rounded-sm opacity-80"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showText && (
        <div className="mt-3 text-center">
          <div className={`text-lg font-bold ${textColors[variant]}`}>
            {websiteConfig?.name || 'ISEAV-WALUNGU'}
          </div>
          <div className={`text-xs ${subtitleColors[variant]} leading-tight`}>
            Institut Supérieur d'Études<br/>Agronomiques et Vétérinaires
          </div>
        </div>
      )}
    </div>
  )
}