import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // TODO: Récupérer les programmes depuis la base de données
    const programs = [
      {
        id: '1',
        name: 'Licence en Informatique',
        description: 'Programme de licence en informatique sur 3 ans',
        duration: 3,
        credits: 180,
        faculty: 'Sciences et Technologies'
      },
      {
        id: '2',
        name: 'Master en Intelligence Artificielle',
        description: 'Master spécialisé en IA et apprentissage automatique',
        duration: 2,
        credits: 120,
        faculty: 'Sciences et Technologies'
      }
    ]

    return NextResponse.json({
      success: true,
      data: programs
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération des programmes' },
      { status: 500 }
    )
  }
}