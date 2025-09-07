'use client'

import { InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
}

export default function SearchInput({ 
  label, 
  error, 
  className, 
  placeholder = "🔍 Rechercher...",
  ...props 
}: SearchInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type="text"
        className={clsx(
          'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        placeholder={placeholder}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}