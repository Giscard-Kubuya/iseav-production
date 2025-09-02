"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Partner {
  id: number;
  name: string;
  description?: string;
  logo_url?: string;
  website_url?: string;
}

interface ModernPartnersGridProps {
  partners: Partner[];
}

export default function ModernPartnersGrid({
  partners,
}: ModernPartnersGridProps) {
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isManualControl, setIsManualControl] = useState(false);

  // Continuous auto-sliding
  useEffect(() => {
    if (isManualControl || partners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentOffset((prev) => prev + 0.5);
    }, 50); // Move 0.5px every 50ms for ultra-smooth continuous motion

    return () => clearInterval(interval);
  }, [isManualControl, partners.length]);

  // Manual control timeout
  useEffect(() => {
    if (isManualControl) {
      const timeout = setTimeout(() => {
        setIsManualControl(false);
      }, 5000); // Resume auto-slide after 5 seconds of inactivity

      return () => clearTimeout(timeout);
    }
  }, [isManualControl, currentOffset]);

  const nextSlide = () => {
    setIsManualControl(true);
    setCurrentOffset((prev) => prev + 180); // Jump forward by one partner width
  };

  const prevSlide = () => {
    setIsManualControl(true);
    setCurrentOffset((prev) => prev - 180); // Jump backward by one partner width
  };

  if (partners.length === 0) return null;

  return (
    <div className="w-full">
      {/* Mobile & Tablet: Controlled carousel with continuous sliding */}
      <div className="block lg:hidden relative overflow-hidden py-4 group">
        {/* Controlled infinite scroll */}
        <div 
          className="flex space-x-6 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${((currentOffset % (partners.length * 180)) + (partners.length * 180)) % (partners.length * 180)}px)`,
            width: `${partners.length * 180 * 3}px` // Triple width for seamless loop
          }}
        >
          {/* First set of partners */}
          {partners.map((partner) => (
            <PartnerLogo
              key={`first-${partner.id}`}
              partner={partner}
              isHovered={hoveredPartner === partner.id}
              onHover={() => setHoveredPartner(partner.id)}
              onLeave={() => setHoveredPartner(null)}
            />
          ))}

          {/* Duplicate for seamless scroll */}
          {partners.map((partner) => (
            <PartnerLogo
              key={`second-${partner.id}`}
              partner={partner}
              isHovered={hoveredPartner === partner.id}
              onHover={() => setHoveredPartner(partner.id)}
              onLeave={() => setHoveredPartner(null)}
            />
          ))}

          {/* Third set for extra seamless effect */}
          {partners.map((partner) => (
            <PartnerLogo
              key={`third-${partner.id}`}
              partner={partner}
              isHovered={hoveredPartner === partner.id}
              onHover={() => setHoveredPartner(partner.id)}
              onLeave={() => setHoveredPartner(null)}
            />
          ))}
        </div>

        {/* Navigation Arrows for mobile */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 
                   bg-white/95 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-blue-600 
                   w-10 h-10 rounded-full shadow-lg hover:shadow-xl 
                   transition-all duration-300 opacity-70 hover:opacity-100
                   flex items-center justify-center border border-gray-200/50
                   hover:scale-110 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 
                   bg-white/95 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-blue-600 
                   w-10 h-10 rounded-full shadow-lg hover:shadow-xl 
                   transition-all duration-300 opacity-70 hover:opacity-100
                   flex items-center justify-center border border-gray-200/50
                   hover:scale-110 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {partners.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsManualControl(true);
                setCurrentOffset(index * 180);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(((currentOffset / 180) % partners.length + partners.length) % partners.length) === index
                  ? 'bg-blue-600 w-6' 
                  : 'bg-gray-300 hover:bg-blue-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Scrolling carousel with arrows */}
      <div className="hidden lg:block relative">
        {/* Controlled infinite scroll */}
        <div className="relative overflow-hidden py-4 group">
          <div 
            className="flex space-x-8 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${((currentOffset % (partners.length * 200)) + (partners.length * 200)) % (partners.length * 200)}px)`,
              width: `${partners.length * 200 * 3}px` // Triple width for seamless loop
            }}
          >
            {/* First set of partners */}
            {partners.map((partner) => (
              <PartnerLogo
                key={`desktop-first-${partner.id}`}
                partner={partner}
                isHovered={hoveredPartner === partner.id}
                onHover={() => setHoveredPartner(partner.id)}
                onLeave={() => setHoveredPartner(null)}
                isStatic
              />
            ))}

            {/* Duplicate for seamless scroll */}
            {partners.map((partner) => (
              <PartnerLogo
                key={`desktop-second-${partner.id}`}
                partner={partner}
                isHovered={hoveredPartner === partner.id}
                onHover={() => setHoveredPartner(partner.id)}
                onLeave={() => setHoveredPartner(null)}
                isStatic
              />
            ))}

            {/* Third set for extra seamless effect */}
            {partners.map((partner) => (
              <PartnerLogo
                key={`desktop-third-${partner.id}`}
                partner={partner}
                isHovered={hoveredPartner === partner.id}
                onHover={() => setHoveredPartner(partner.id)}
                onLeave={() => setHoveredPartner(null)}
                isStatic
              />
            ))}
          </div>

          {/* Navigation Arrows for desktop */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 
                     bg-white/95 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-blue-600 
                     w-12 h-12 rounded-full shadow-lg hover:shadow-2xl 
                     transition-all duration-300 opacity-0 group-hover:opacity-90 hover:opacity-100
                     flex items-center justify-center border border-gray-200/50
                     hover:scale-110 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 
                     bg-white/95 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-blue-600 
                     w-12 h-12 rounded-full shadow-lg hover:shadow-2xl 
                     transition-all duration-300 opacity-0 group-hover:opacity-90 hover:opacity-100
                     flex items-center justify-center border border-gray-200/50
                     hover:scale-110 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

interface PartnerLogoProps {
  partner: Partner;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isStatic?: boolean;
}

function PartnerLogo({
  partner,
  isHovered,
  onHover,
  onLeave,
  isStatic = false,
}: PartnerLogoProps) {
  const content = (
    <div
      className={`
        group relative bg-white/90 backdrop-blur-sm rounded-2xl transition-all duration-500 ease-out
        border border-gray-100/50 hover:border-blue-200/50
        ${
          isStatic
            ? "p-6 min-h-[100px] shadow-sm hover:shadow-xl transform hover:-translate-y-2 hover:scale-105"
            : "p-4 min-h-[80px] flex-shrink-0 w-40 shadow-md"
        }
        flex items-center justify-center cursor-pointer
        hover:bg-white hover:shadow-2xl
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/5 before:to-amber-500/5 
        before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100
      `}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Logo container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
        {partner.logo_url &&
        partner.logo_url !== "https://example.com/ui-test-logo.png" &&
        partner.logo_url !== "https://example.com/frontend-logo.png" &&
        partner.logo_url !== "https://example.com/new-logo.png" ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={partner.logo_url}
              alt={partner.name}
              width={isStatic ? 120 : 100}
              height={isStatic ? 60 : 50}
              className={`
                object-contain max-w-full max-h-full transition-all duration-500
                filter brightness-75 grayscale-[0.5] contrast-110
                group-hover:brightness-100 group-hover:grayscale-0 group-hover:scale-110
                ${isHovered ? "scale-110 brightness-110 grayscale-0" : ""}
              `}
              sizes={isStatic ? "(max-width: 768px) 50vw, 25vw" : "100px"}
            />
          </div>
        ) : (
          <div
            className={`
            ${isStatic ? "w-20 h-20" : "w-16 h-16"} 
            bg-gradient-to-br from-blue-500 via-blue-600 to-amber-500 rounded-2xl 
            flex flex-col items-center justify-center text-white font-bold 
            transition-all duration-500 group-hover:scale-110 group-hover:rotate-1
            ${isHovered ? "shadow-xl scale-110 rotate-1" : "shadow-lg"}
            border border-white/20
          `}
          >
            <div className={`${isStatic ? "text-2xl" : "text-xl"} mb-1`}>
              {partner.name.charAt(0).toUpperCase()}
            </div>
            <div
              className={`${
                isStatic ? "text-xs" : "text-[10px]"
              } font-medium opacity-80 leading-none`}
            >
              PARTNER
            </div>
          </div>
        )}
      </div>

      {/* Hover tooltip - only on desktop and when static */}
      {isStatic && (
        <div
          className={`
          absolute -top-14 left-1/2 transform -translate-x-1/2 
          bg-gray-900/95 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-medium
          transition-all duration-300 pointer-events-none z-30
          ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          whitespace-nowrap shadow-2xl border border-white/10
          hidden lg:block
        `}
        >
          <div className="flex items-center space-x-2">
            <span>{partner.name}</span>
            {partner.website_url && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95" />
        </div>
      )}

      {/* Subtle glow effect */}
      <div
        className={`
        absolute inset-0 rounded-2xl transition-all duration-700 -z-10
        ${isHovered ? "shadow-2xl shadow-blue-200/30 scale-105" : ""}
      `}
      />
    </div>
  );

  // Wrap in Link if website_url exists
  if (partner.website_url) {
    return (
      <Link
        href={partner.website_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${!isStatic ? "flex-shrink-0" : ""} cursor-pointer`}
      >
        {content}
      </Link>
    );
  }

  return content;
}
