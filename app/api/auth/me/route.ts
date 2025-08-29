import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: 'Authorization header required' },
        { status: 401 }
      )
    }

    // Forward to your CI4 API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://nic-africa-api-ci.infonet.bi/api'

    const response = await fetch(`${apiUrl}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authHeader,
        'Website-ID': process.env.NEXT_PUBLIC_WEBSITE_ID || '1'
      }
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('Me API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error during user verification' 
      }, 
      { status: 500 }
    )
  }
}