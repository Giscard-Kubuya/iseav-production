export default function AdmissionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admissions</h1>
      <div className="bg-primary-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Candidatures ouvertes</h2>
        <p className="text-lg mb-4">
          Les candidatures pour l'année académique 2024-2025 sont maintenant ouvertes.
        </p>
        <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700">
          Postuler maintenant
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Conditions</h3>
          <p className="text-gray-600">Critères d'admission</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Dates limites</h3>
          <p className="text-gray-600">Calendrier des admissions</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Frais</h3>
          <p className="text-gray-600">Coûts de scolarité</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Statut</h3>
          <p className="text-gray-600">Suivre votre candidature</p>
        </div>
      </div>
    </div>
  )
}