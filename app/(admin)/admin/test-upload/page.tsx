'use client'

import { useState } from 'react'
import ImageUpload from '@/components/admin/ImageUpload'

export default function TestUploadPage() {
  const [uploadResults, setUploadResults] = useState<{[key: string]: string}>({})

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Test Upload - Logo et Favicon</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Upload Test */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Test Logo</h3>
              
              <ImageUpload
                module="settings"
                currentImageUrl={uploadResults.logo}
                onImageUploaded={(imageData) => {
                  setUploadResults(prev => ({ ...prev, logo: imageData.url }))
                }}
                acceptedFormats={['jpg', 'jpeg', 'png', 'webp', 'svg']}
                maxSizeMB={2}
                altText="Logo test"
              />
              
              {uploadResults.logo && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-600">✅ Upload réussi!</p>
                  <p className="text-xs text-gray-500 break-all mt-1">{uploadResults.logo}</p>
                </div>
              )}
            </div>

            {/* Favicon Upload Test */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Test Favicon</h3>
              
              <ImageUpload
                module="settings"
                currentImageUrl={uploadResults.favicon}
                onImageUploaded={(imageData) => {
                  setUploadResults(prev => ({ ...prev, favicon: imageData.url }))
                }}
                acceptedFormats={['ico', 'png', 'jpg', 'jpeg']}
                maxSizeMB={1}
                altText="Favicon test"
              />
              
              {uploadResults.favicon && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-600">✅ Upload réussi!</p>
                  <p className="text-xs text-gray-500 break-all mt-1">{uploadResults.favicon}</p>
                </div>
              )}
              
              <p className="text-sm text-gray-500">
                Formats recommandés: ICO, PNG (16x16 ou 32x32 pixels)
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Instructions de test</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Testez avec des images de différents formats (PNG, JPG, ICO)</li>
              <li>• Vérifiez que les images sont redimensionnées correctement</li>
              <li>• Confirmez que les URLs Cloudinary sont générées</li>
              <li>• Testez avec des fichiers de tailles différentes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}