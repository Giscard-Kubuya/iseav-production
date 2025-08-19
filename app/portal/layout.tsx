export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Portail ISEAV-ARU</h2>
          </div>
          <nav className="mt-4">
            <div className="px-4 py-2 text-sm text-gray-600">Navigation</div>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}