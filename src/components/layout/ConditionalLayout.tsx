'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import ISEAVLayout from './ISEAVLayout'

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
  
  // Otherwise, use the new ISEAV website layout
  return <ISEAVLayout>{children}</ISEAVLayout>
}