'use client'

import { useState, useEffect } from 'react'
import { apiRequest } from '@/lib/api'

interface AboutData {
  id?: number
  website_id: number
  hero_title: string
  hero_subtitle: string
  organization_description: string
  our_story: string
  why_choose_us: Array<{
    title: string
    description: string
    icon: string
  }>
  achievements: Array<{
    title: string
    count: string
    description: string
  }>
  certifications: Array<{
    name: string
    description: string
    year: string
  }>
  team_intro: string
  impact_statement: string
  future_goals: string
  call_to_action_title: string
  call_to_action_description: string
  is_active: boolean
}

export function useAboutFront() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAbout()
  }, [])

  const fetchAbout = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiRequest.get('/about')
      
      if (response.data && response.data.data) {
        setAboutData(response.data.data)
      } else {
        // Set fallback data if API call fails
        setAboutData({
          id: 0,
          website_id: 8,
          hero_title: 'Projet 8e CEPAC Beni',
          hero_subtitle: 'Organisation Non Gouvernementale dédiée au développement communautaire en République Démocratique du Congo',
          organization_description: 'Contribuer au développement communautaire, promouvoir le bien-être social et améliorer les conditions de vie des populations en République Démocratique du Congo à travers des programmes innovants et adaptés aux besoins locaux.',
          our_story: 'Fondée avec la mission de transformer les communautés en République Démocratique du Congo, le Projet 8e CEPAC Beni s\'engage depuis plusieurs années dans des programmes de développement communautaire innovants et durables.',
          why_choose_us: [
            {
              title: 'Expertise Locale',
              description: 'Une connaissance approfondie du contexte local et des besoins communautaires',
              icon: '🏆'
            },
            {
              title: 'Programmes Durables',
              description: 'Des solutions à long terme qui créent un impact positif durable',
              icon: '🌱'
            },
            {
              title: 'Transparence',
              description: 'Une gestion transparente et responsable de tous nos programmes',
              icon: '💎'
            }
          ],
          achievements: [
            {
              title: 'Familles Aidées',
              count: '500+',
              description: 'Familles bénéficiaires de nos programmes'
            },
            {
              title: 'Projets Réalisés',
              count: '25',
              description: 'Projets de développement communautaire menés à bien'
            },
            {
              title: 'Partenaires',
              count: '15',
              description: 'Partenaires locaux et internationaux'
            }
          ],
          certifications: [
            {
              name: 'Agrément ONG',
              description: 'Agréé officiellement comme ONG en RDC',
              year: '2020'
            }
          ],
          team_intro: 'Notre équipe dirigeante expérimentée guide le Projet 8e CEPAC Beni vers l\'excellence dans le développement communautaire',
          impact_statement: 'Ensemble, nous construisons un avenir meilleur pour les communautés de la République Démocratique du Congo',
          future_goals: 'D\'ici 2030, nous aspirons à étendre nos programmes à 10 nouvelles régions et toucher 2000 familles supplémentaires.',
          call_to_action_title: 'Rejoignez Notre Mission',
          call_to_action_description: 'Rejoignez les communautés qui nous font confiance pour leur développement',
          is_active: true
        })
      }
    } catch (err: any) {
      console.error('Error fetching about data:', err)
      setError(null) // Don't show error, use fallback data
      
      // Set fallback data on error
      setAboutData({
        id: 0,
        website_id: 8,
        hero_title: 'Projet 8e CEPAC Beni',
        hero_subtitle: 'Organisation Non Gouvernementale dédiée au développement communautaire en République Démocratique du Congo',
        organization_description: 'Contribuer au développement communautaire, promouvoir le bien-être social et améliorer les conditions de vie des populations en République Démocratique du Congo à travers des programmes innovants et adaptés aux besoins locaux.',
        our_story: 'Fondée avec la mission de transformer les communautés en République Démocratique du Congo, le Projet 8e CEPAC Beni s\'engage depuis plusieurs années dans des programmes de développement communautaire innovants et durables.',
        why_choose_us: [
          {
            title: 'Expertise Locale',
            description: 'Une connaissance approfondie du contexte local et des besoins communautaires',
            icon: '🏆'
          },
          {
            title: 'Programmes Durables',
            description: 'Des solutions à long terme qui créent un impact positif durable',
            icon: '🌱'
          },
          {
            title: 'Transparence',
            description: 'Une gestion transparente et responsable de tous nos programmes',
            icon: '💎'
          }
        ],
        achievements: [
          {
            title: 'Familles Aidées',
            count: '500+',
            description: 'Familles bénéficiaires de nos programmes'
          },
          {
            title: 'Projets Réalisés',
            count: '25',
            description: 'Projets de développement communautaire menés à bien'
          },
          {
            title: 'Partenaires',
            count: '15',
            description: 'Partenaires locaux et internationaux'
          }
        ],
        certifications: [
          {
            name: 'Agrément ONG',
            description: 'Agréé officiellement comme ONG en RDC',
            year: '2020'
          }
        ],
        team_intro: 'Notre équipe dirigeante expérimentée guide le Projet 8e CEPAC Beni vers l\'excellence dans le développement communautaire',
        impact_statement: 'Ensemble, nous construisons un avenir meilleur pour les communautés de la République Démocratique du Congo',
        future_goals: 'D\'ici 2030, nous aspirons à étendre nos programmes à 10 nouvelles régions et toucher 2000 familles supplémentaires.',
        call_to_action_title: 'Rejoignez Notre Mission',
        call_to_action_description: 'Rejoignez les communautés qui nous font confiance pour leur développement',
        is_active: true
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    aboutData,
    loading,
    error,
    refetch: fetchAbout
  }
}