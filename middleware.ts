import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Gestion des routes d'administration
  if (pathname.startsWith('/admin')) {
    // Vérifier l'authentification admin
    const token = request.cookies.get('admin-token')
    if (!token) {
      return NextResponse.redirect(new URL('/login?redirect=admin', request.url))
    }
    // Vérifier les permissions admin
    // TODO: Implémenter la vérification du rôle admin
  }

  // Gestion des routes enseignants
  if (pathname.startsWith('/teacher')) {
    // Vérifier l'authentification enseignant
    const token = request.cookies.get('teacher-token')
    if (!token) {
      return NextResponse.redirect(new URL('/login?redirect=teacher', request.url))
    }
    // Vérifier les permissions enseignant
    // TODO: Implémenter la vérification du rôle teacher
  }

  // Gestion des portails utilisateurs
  if (pathname.startsWith('/portal/')) {
    // Vérifier l'authentification utilisateur
    const token = request.cookies.get('user-token')
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Redirection basée sur le rôle
    if (pathname.startsWith('/portal/student')) {
      // Vérifier rôle étudiant
    } else if (pathname.startsWith('/portal/parent')) {
      // Vérifier rôle parent
    }
  }

  // Désactiver temporairement l'internationalisation automatique
  // pour permettre l'accès direct aux pages
  
  // TODO: Implémenter l'internationalisation plus tard si nécessaire
  // if (pathname.startsWith('/(public)') || pathname === '/') {
  //   const pathnameIsMissingLocale = ['fr', 'en', 'ar'].every(
  //     (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  //   )
  //   if (pathnameIsMissingLocale) {
  //     const locale = 'fr'
  //     return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  //   }
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Seulement matcher les routes qui nécessitent vraiment une vérification
    '/admin/:path*',
    '/teacher/:path*', 
    '/portal/:path*',
  ],
}