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

export function useAbout() {
  const [about, setAbout] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAbout()
  }, [])

  const fetchAbout = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiRequest.get('/about', {
        headers: { 'Website-ID': '1' }
      })
      
      if (response.status === 200 && response.data) {
        setAbout(response.data)
      } else {
        // Set fallback data if API call fails
        setAbout({
          id: 0,
          website_id: 1,
          hero_title: '8e CEPAC Projet-Beni',
          hero_subtitle: 'Organisation Non Gouvernementale dédiée au développement communautaire en République Démocratique du Congo',
          organization_description: 'Contribuer au développement communautaire, promouvoir le bien-être social et améliorer les conditions de vie des populations en République Démocratique du Congo à travers des programmes innovants et adaptés aux besoins locaux.',
          our_story: 'Fondée avec la mission de transformer les communautés en République Démocratique du Congo, le 8e CEPAC Projet-Beni s\'engage depuis plusieurs années dans des programmes de développement communautaire innovants et durables.',
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
            },
            {
              title: 'Innovation',
              description: 'Des approches innovantes adaptées aux défis du développement communautaire',
              icon: '💡'
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
            },
            {
              title: 'Années d\'Expérience',
              count: '8+',
              description: 'Années d\'engagement communautaire en RDC'
            }
          ],
          certifications: [
            {
              name: 'Agrément ONG',
              description: 'Agréé officiellement comme ONG en RDC',
              year: '2020'
            },
            {
              name: 'Partenaire UN',
              description: 'Partenaire reconnu des Nations Unies pour le développement',
              year: '2022'
            }
          ],
          team_intro: 'Notre équipe dirigeante expérimentée et passionnée guide le 8e CEPAC vers l\'excellence dans le développement communautaire',
          impact_statement: 'Ensemble, nous construisons un avenir meilleur pour les communautés de la République Démocratique du Congo',
          future_goals: 'D\'ici 2030, nous aspirons à étendre nos programmes à 10 nouvelles régions, toucher 2000 familles supplémentaires et devenir l\'organisation de référence en développement communautaire en RDC.',
          call_to_action_title: 'Rejoignez Notre Mission',
          call_to_action_description: 'Rejoignez les communautés qui nous font confiance pour leur développement',
          is_active: true
        })
      }
    } catch (err: any) {
      // Handle API errors gracefully - don't show errors for expected API unavailability
      if (err.response?.status === 404) {
        console.log('About API endpoint not found - using fallback data')
        setError(null)
      } else if (err.response?.status >= 500) {
        console.log('Server error when fetching About data - using fallback data')
        setError(null)
      } else {
        console.error('Error fetching about data:', err)
        setError('Erreur lors du chargement des données About')
      }
      
      // Set fallback data on error
      setAbout({
        id: 0,
        website_id: 1,
        hero_title: '8e CEPAC Projet-Beni',
        hero_subtitle: 'Organisation Non Gouvernementale dédiée au développement communautaire en République Démocratique du Congo',
        organization_description: 'Contribuer au développement communautaire, promouvoir le bien-être social et améliorer les conditions de vie des populations en République Démocratique du Congo à travers des programmes innovants et adaptés aux besoins locaux.',
        our_story: 'Fondée avec la mission de transformer les communautés en République Démocratique du Congo, le 8e CEPAC Projet-Beni s\'engage depuis plusieurs années dans des programmes de développement communautaire innovants et durables.',
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
        team_intro: 'Notre équipe dirigeante expérimentée guide le 8e CEPAC vers l\'excellence dans le développement communautaire',
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
    about,
    loading,
    error,
    refetch: fetchAbout
  }
}