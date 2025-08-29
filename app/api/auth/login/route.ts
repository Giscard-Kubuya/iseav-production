import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Forward to your CI4 API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://nic-africa-api-ci.infonet.bi/api'
    const apiToken = process.env.NEXT_PUBLIC_API_TOKEN

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Website-ID': process.env.NEXT_PUBLIC_WEBSITE_ID || '1',
        ...(apiToken && { 'Authorization': `Bearer ${apiToken}` })
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error during login' 
      }, 
      { status: 500 }
    )
  }
}