'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import PublicHeader from './PublicHeader'
import Footer from './Footer'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    )
  }
  
  const isAdminRoute = pathname.startsWith('/admin')
  
  if (isAdminRoute) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}