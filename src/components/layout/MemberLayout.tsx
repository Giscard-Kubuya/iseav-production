'use client'

import { ReactNode } from 'react'

interface MemberLayoutProps {
  children: ReactNode
}

export default function MemberLayout({ children }: MemberLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      
      {/* Member Space Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                © 2024 CEPAC Projet-Beni • Version 2.1.0
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                Designed & Developed by{' '}
                <span className="text-blue-400 font-semibold">Gis Kubuya</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}