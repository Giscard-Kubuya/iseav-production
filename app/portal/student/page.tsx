export default function StudentDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tableau de bord étudiant</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Mes Cours</h3>
          <p className="text-gray-600">Accéder à vos cours actuels</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Notes</h3>
          <p className="text-gray-600">Consulter vos résultats</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Présences</h3>
          <p className="text-gray-600">Suivi de vos présences</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Devoirs</h3>
          <p className="text-gray-600">Travaux à rendre</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Finances</h3>
          <p className="text-gray-600">Frais de scolarité</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Messages</h3>
          <p className="text-gray-600">Communications</p>
        </div>
      </div>
    </div>
  )
}