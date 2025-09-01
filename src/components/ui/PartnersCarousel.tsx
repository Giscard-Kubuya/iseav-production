'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Partner {
  id: number
  name: string
  description?: string
  logo_url?: string
  website_url?: string
}

interface PartnersCarouselProps {
  partners: Partner[]
}

export default function PartnersCarousel({ partners }: PartnersCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [partnersPerView, setPartnersPerView] = useState(4)
  
  // Responsive partners per view
  useEffect(() => {
    const updatePartnersPerView = () => {
      if (window.innerWidth < 640) {
        setPartnersPerView(1) // Mobile: 1 partner
      } else if (window.innerWidth < 768) {
        setPartnersPerView(2) // Tablet: 2 partners
      } else if (window.innerWidth < 1024) {
        setPartnersPerView(3) // Small desktop: 3 partners
      } else {
        setPartnersPerView(4) // Large desktop: 4 partners
      }
    }

    updatePartnersPerView()
    window.addEventListener('resize', updatePartnersPerView)
    return () => window.removeEventListener('resize', updatePartnersPerView)
  }, [])
  
  // Duplicate partners for seamless loop
  const extendedPartners = [...partners, ...partners, ...partners]
  
  useEffect(() => {
    if (!isAutoPlaying || partners.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1
        // Reset to beginning when we've shown all partners
        if (nextIndex >= partners.length) {
          return 0
        }
        return nextIndex
      })
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, partners.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1
      if (nextIndex >= partners.length) {
        return 0
      }
      return nextIndex
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1
      if (prevIndex < 0) {
        return partners.length - 1
      }
      return prevIndex
    })
  }

  if (partners.length === 0) return null

  return (
    <div 
      className="relative w-full overflow-hidden group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div 
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex * 100) / partnersPerView}%)`,
          width: `${(extendedPartners.length * 100) / partnersPerView}%`
        }}
      >
        {extendedPartners.map((partner, index) => (
          <div
            key={`${partner.id}-${Math.floor(index / partners.length)}`}
            className="flex-shrink-0 px-4"
            style={{ width: `${100 / extendedPartners.length}%` }}
          >
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 h-full">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <div className="aspect-[2/1] bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
                  {partner.logo_url ? (
                    <Image
                      src={partner.logo_url}
                      alt={partner.name}
                      width={160}
                      height={80}
                      className="object-contain max-w-full max-h-full group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="text-gray-500 font-semibold text-lg">
                      {partner.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-center mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {partner.name}
              </h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                {partner.description || ''}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 flex items-center justify-center"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 flex items-center justify-center"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {partners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-blue-600 scale-125' 
                : 'bg-gray-300 hover:bg-blue-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}