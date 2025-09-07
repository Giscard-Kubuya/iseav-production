"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ISEAVHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: "Accueil", href: "/" },
    { name: "À Propos", href: "/about" },
    { name: "Programmes", href: "/programmes" },
    { name: "Recherche", href: "/recherche" },
    { name: "Campus", href: "/campus" },
    { name: "Galerie", href: "/galerie" },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-green-800 to-blue-800 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm gap-2">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6">
            <span className="flex items-center">
              <span className="mr-2">📧</span>
              info@iseav-walungu.ac.cd
            </span>
            <span className="flex items-center">
              <span className="mr-2">📞</span>
              +243 XXX XXX XXX
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="hidden sm:inline">🎓 Inscriptions Ouvertes 2024</span>
            <span className="sm:hidden">🎓 Inscriptions 2024</span>
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
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-4 group">
              <div className="relative">
                <Image 
                  src="/images/logos/logo_iseav.png" 
                  alt="ISEAV-WALUNGU" 
                  width={50} 
                  height={50} 
                  className="group-hover:scale-110 transition-transform duration-300 rounded-full sm:w-[60px] sm:h-[60px]"
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  ISEAV
                </h1>
                <p className="text-xs text-gray-600 uppercase tracking-wide hidden sm:block">
                  Walungu • Sud-Kivu
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item, index) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={`px-4 py-2 font-medium transition-all duration-200 rounded-lg relative ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <Link
                href="/inscription"
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 lg:px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm lg:text-base"
              >
                S'inscrire
              </Link>
              <Link
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 lg:px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm lg:text-base"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
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
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white border-t border-gray-200 px-4 py-4">
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`block py-3 px-4 font-medium rounded-lg mb-2 transition-all duration-200 ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              <Link
                href="/inscription"
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                S'inscrire
              </Link>
              <Link
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300"
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