export default function TeacherDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Portail Enseignant</h1>
        <p className="text-gray-600">Bonjour Dr. Ahmed Ben Ali</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Mes Classes</h3>
          <p className="text-3xl font-bold text-blue-600">5</p>
          <p className="text-sm text-gray-500">Classes actives</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Étudiants</h3>
          <p className="text-3xl font-bold text-green-600">127</p>
          <p className="text-sm text-gray-500">Total étudiants</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Devoirs</h3>
          <p className="text-3xl font-bold text-orange-600">8</p>
          <p className="text-sm text-gray-500">À corriger</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Classes aujourd'hui</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded">
              <div className="font-medium">Algorithmique - L2 Info</div>
              <div className="text-sm text-gray-600">09:00 - 10:30 • Salle A101</div>
            </div>
            <div className="p-3 bg-green-50 rounded">
              <div className="font-medium">Base de données - L3 Info</div>
              <div className="text-sm text-gray-600">14:00 - 15:30 • Salle B203</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-gray-50 rounded hover:bg-gray-100">
              Marquer les présences
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded hover:bg-gray-100">
              Saisir les notes
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded hover:bg-gray-100">
              Créer un devoir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}