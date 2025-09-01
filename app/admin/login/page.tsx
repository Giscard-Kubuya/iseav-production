'use client'

import { Suspense } from 'react'
import ComprehensiveLoginForm from '@/components/auth/ComprehensiveLoginForm'

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    }>
      <ComprehensiveLoginForm />
    </Suspense>
  )
}