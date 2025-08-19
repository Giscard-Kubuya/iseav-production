import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Page non trouvée</h2>
      <p className="mb-4">La page que vous recherchez n'existe pas.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
      >
        Retour à l'accueil
      </Link>
    </div>
  )
}