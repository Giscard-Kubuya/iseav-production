'use client'

import ServiceTest from '@/components/admin/ServiceTest'

export default function ServicesTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Services CRUD Testing</h1>
        <ServiceTest />
      </div>
    </div>
  )
}