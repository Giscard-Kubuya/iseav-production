'use client'

import { usePathname } from 'next/navigation'
import AdminLayout from './AdminLayout'
import AuthGuard from '@/components/auth/AuthGuard'

interface ConditionalAdminLayoutProps {
  children: React.ReactNode
}

export default function ConditionalAdminLayout({ children }: ConditionalAdminLayoutProps) {
  const pathname = usePathname()
  
  // Don't apply AuthGuard or AdminLayout to login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }
  
  // Apply AuthGuard and AdminLayout to all other admin routes
  return (
    <AuthGuard requiredRole="author">
      <AdminLayout>{children}</AdminLayout>
    </AuthGuard>
  )
}