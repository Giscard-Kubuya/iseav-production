import DashboardContent from '@/components/pages/DashboardContent'
import MemberLayout from '@/components/layout/MemberLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard Employé - 8e CEPAC Projet-Beni',
  description: 'Accédez à votre espace employé CEPAC avec toutes vos fonctionnalités professionnelles.',
  keywords: 'dashboard, employé, CEPAC, espace personnel, documents, messages'
}

export default function DashboardPage() {
  return (
    <MemberLayout>
      <DashboardContent />
    </MemberLayout>
  )
}