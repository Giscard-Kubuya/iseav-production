'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import CepacLayout from './CepacLayout'

interface ConditionalLayoutProps {
  children: ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Routes that should NOT have the main website layout
  const memberRoutes = ['/inscription', '/dashboard', '/admin']
  
  // Check if current route is a member space route
  const isMemberSpace = memberRoutes.some(route => pathname.startsWith(route))
  
  // If it's a member space route, render children without main layout
  if (isMemberSpace) {
    return <>{children}</>
  }
  
  // Otherwise, use the main website layout
  return <CepacLayout>{children}</CepacLayout>
}