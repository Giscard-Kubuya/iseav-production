import Link from 'next/link'

export default function AdminSidebar() {
  const menuItems = [
    { href: '/admin', label: 'Tableau de bord', icon: '📊' },
    
    // Content Management
    { href: '/admin/hero-slides', label: 'Diapositives Hero', icon: '🖼️' },
    { href: '/admin/services', label: 'Services', icon: '⚙️' },
    { href: '/admin/actualites', label: 'Actualités', icon: '📰' },
    { href: '/admin/blog', label: 'Blog', icon: '📝' },
    { href: '/admin/portfolio', label: 'Portfolio', icon: '💼' },
    { href: '/admin/galerie', label: 'Galerie', icon: '📸' },

    // Team & Partners
    { href: '/admin/team-experts', label: 'Équipe d\'Experts IT', icon: '👨‍💻' },
    { href: '/admin/leadership', label: 'Équipe Dirigeante', icon: '👔' },
    { href: '/admin/technology-partners', label: 'Partenaires Technologiques', icon: '🤝' },

    // Company Information
    { href: '/admin/company-statistics', label: 'Statistiques Entreprise', icon: '📈' },
    { href: '/admin/company-values', label: 'Nos Valeurs', icon: '💎' },
    { href: '/admin/company-journey', label: 'Notre Parcours', icon: '🛣️' },
    { href: '/admin/why-choose-us', label: 'Pourquoi Nous Choisir', icon: '⭐' },
    { href: '/admin/testimonials', label: 'Témoignages Clients', icon: '💬' },

    // Contact & Communication
    { href: '/admin/contact-info', label: 'Informations de Contact', icon: '📞' },
    { href: '/admin/business-hours', label: 'Heures d\'Ouverture', icon: '🕒' },
    { href: '/admin/location', label: 'Notre Localisation', icon: '📍' },
    { href: '/admin/social-media', label: 'Réseaux Sociaux', icon: '📱' },
    { href: '/admin/newsletter', label: 'Newsletter', icon: '📧' },

    // Users & Recruitment
    { href: '/admin/utilisateurs', label: 'Utilisateurs', icon: '👥' },
    { href: '/admin/recrutement', label: 'Recrutement', icon: '🎯' },
    { href: '/admin/commentaires', label: 'Commentaires', icon: '💭' },

    // System
    { href: '/admin/parametres', label: 'Paramètres', icon: '⚙️' }
  ]

  return (
    <aside className="w-64 bg-white shadow-sm border-r min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}