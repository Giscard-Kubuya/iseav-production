import InscriptionContent from '@/components/pages/InscriptionContent'
import MemberLayout from '@/components/layout/MemberLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inscription Employé - 8e CEPAC Projet-Beni',
  description: 'Créez votre compte employé CEPAC pour accéder aux fonctionnalités internes de l\'établissement.',
  keywords: 'inscription, employé, CEPAC, compte, connexion, dashboard'
}

export default function InscriptionPage() {
  return (
    <MemberLayout>
      <InscriptionContent />
    </MemberLayout>
  )
}