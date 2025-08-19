import Link from 'next/link'

export default function AdminSidebar() {
  const menuItems = [
    { href: '/admin', label: 'Tableau de bord', icon: '📊' },
    { href: '/admin/users', label: 'Utilisateurs', icon: '👥' },
    { href: '/admin/admissions', label: 'Candidatures', icon: '📝' },
    { href: '/admin/academic', label: 'Académique', icon: '🎓' },
    { href: '/admin/content', label: 'Contenu', icon: '📄' },
    { href: '/admin/finances', label: 'Finances', icon: '💰' },
    { href: '/admin/communications', label: 'Communications', icon: '💬' },
    { href: '/admin/library', label: 'Bibliothèque', icon: '📚' },
    { href: '/admin/facilities', label: 'Installations', icon: '🏢' },
    { href: '/admin/reports', label: 'Rapports', icon: '📈' },
    { href: '/admin/settings', label: 'Paramètres', icon: '⚙️' },
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