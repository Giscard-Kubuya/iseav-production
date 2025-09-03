'use client'

import { ReactNode } from 'react'
import ISEAVHeader from './ISEAVHeader'
import ISEAVFooter from './ISEAVFooter'

interface ISEAVLayoutProps {
  children: ReactNode
}

export default function ISEAVLayout({ children }: ISEAVLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <ISEAVHeader />
      <main className="flex-grow">
        {children}
      </main>
      <ISEAVFooter />
    </div>
  )
}