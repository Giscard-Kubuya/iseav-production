"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ISEAVHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: "Accueil", href: "/" },
    { name: "Programmes", href: "/programmes", 
      submenu: [
        { name: "Agronomie Générale", href: "/programmes/agronomie" },
        { name: "Agrovétérinaire", href: "/programmes/agroveterinaire" },
        { name: "Agroforesterie", href: "/programmes/agroforesterie" },
        { name: "Gestion des Ressources", href: "/programmes/gestion-ressources" },
        { name: "Transformation Agricole", href: "/programmes/transformation" },
      ]
    },
    { name: "Recherche", href: "/recherche" },
    { name: "À Propos", href: "/about" },
    { name: "Campus", href: "/campus" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-green-800 to-blue-800 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <span className="mr-2">📍</span>
              Walungu, Sud-Kivu, RDC
            </span>
            <span className="flex items-center">
              <span className="mr-2">📞</span>
              +243 XXX XXX XXX
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span>🎓 Inscriptions Ouvertes 2024</span>
            <Link href="/inscription" className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-400 transition">
              Candidater
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <Image 
                  src="/images/logos/logo_iseav.png" 
                  alt="ISEAV-WALUNGU" 
                  width={60} 
                  height={60} 
                  className="group-hover:scale-110 transition-transform duration-300 rounded-full"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  ISEAV
                </h1>
                <p className="text-xs text-gray-600 uppercase tracking-wide">
                  Walungu • Sud-Kivu
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <div key={index} className="relative group">
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center space-x-1"
                  >
                    <span>{item.name}</span>
                    {item.submenu && (
                      <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  
                  {/* Submenu */}
                  {item.submenu && (
                    <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-2 min-w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/inscription"
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                S'inscrire
              </Link>
              <Link
                href="/contact"
                className="border-2 border-green-600 text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-3' : 'rotate-0 top-1'
                }`}></span>
                <span className={`absolute w-full h-0.5 bg-current top-3 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-3' : 'rotate-0 top-5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white border-t border-gray-200 px-4 py-4">
            {navigationItems.map((item, index) => (
              <div key={index} className="mb-4">
                <Link
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="block py-1 text-sm text-gray-600 hover:text-green-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              <Link
                href="/inscription"
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-center px-6 py-3 rounded-full font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                S'inscrire
              </Link>
              <Link
                href="/contact"
                className="border-2 border-green-600 text-green-600 text-center px-6 py-3 rounded-full font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}