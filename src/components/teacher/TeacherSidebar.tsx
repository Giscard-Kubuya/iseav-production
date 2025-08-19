import Link from 'next/link'

export default function TeacherSidebar() {
  const menuItems = [
    { href: '/teacher', label: 'Tableau de bord', icon: '📊' },
    { href: '/teacher/classes', label: 'Mes Classes', icon: '🏫' },
    { href: '/teacher/schedule', label: 'Emploi du temps', icon: '📅' },
    { href: '/teacher/materials', label: 'Supports de cours', icon: '📚' },
    { href: '/teacher/communications', label: 'Communications', icon: '💬' },
    { href: '/teacher/reports', label: 'Rapports', icon: '📈' },
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