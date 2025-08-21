export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord Administration</h1>
        <p className="text-gray-600">Vue d'ensemble du système ISEAV WALUNGU</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Étudiants</h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
          <p className="text-sm text-gray-500">+12% ce mois</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Enseignants</h3>
          <p className="text-3xl font-bold text-green-600">89</p>
          <p className="text-sm text-gray-500">+2 nouveaux</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Candidatures</h3>
          <p className="text-3xl font-bold text-orange-600">156</p>
          <p className="text-sm text-gray-500">En attente</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenus</h3>
          <p className="text-3xl font-bold text-purple-600">45,320€</p>
          <p className="text-sm text-gray-500">Ce mois</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-gray-50 rounded hover:bg-gray-100">
              Gérer les utilisateurs
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded hover:bg-gray-100">
              Réviser les candidatures
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded hover:bg-gray-100">
              Publier une actualité
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Nouvelle candidature reçue</span>
              <span className="text-gray-500">Il y a 2h</span>
            </div>
            <div className="flex justify-between">
              <span>Résultats publiés</span>
              <span className="text-gray-500">Il y a 4h</span>
            </div>
            <div className="flex justify-between">
              <span>Nouveau paiement reçu</span>
              <span className="text-gray-500">Il y a 6h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}