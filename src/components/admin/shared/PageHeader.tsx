'use client'

import { ReactNode } from 'react'
import Button from './Button'

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
    icon?: ReactNode
  }
  children?: ReactNode
}

export default function PageHeader({ title, subtitle, action, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
      <div className="flex-1">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm lg:text-base text-gray-600">
            {subtitle}
          </p>
        )}
        {children}
      </div>
      
      {action && (
        <div className="flex-shrink-0">
          {action.href ? (
            <a href={action.href}>
              <Button variant="primary" icon={action.icon}>
                {action.label}
              </Button>
            </a>
          ) : (
            <Button 
              variant="primary" 
              icon={action.icon}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}