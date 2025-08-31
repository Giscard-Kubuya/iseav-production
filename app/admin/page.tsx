export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 lg:mb-6">Tableau de Bord - 8e CEPAC Projet-Beni</h1>
      <p className="text-sm lg:text-base text-gray-600 mb-6 lg:mb-8">Organisation Non Gouvernementale - République Démocratique du Congo</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 lg:p-6 text-white">
          <div className="flex items-center">
            <span className="text-xl lg:text-2xl mr-2 lg:mr-3">👨‍💼</span>
            <div>
              <p className="text-blue-100 text-xs lg:text-sm">Équipe Projet</p>
              <p className="text-xl lg:text-2xl font-bold">25</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 lg:p-6 text-white">
          <div className="flex items-center">
            <span className="text-xl lg:text-2xl mr-2 lg:mr-3">👥</span>
            <div>
              <p className="text-green-100 text-xs lg:text-sm">Bénéficiaires</p>
              <p className="text-xl lg:text-2xl font-bold">450</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-4 lg:p-6 text-white">
          <div className="flex items-center">
            <span className="text-xl lg:text-2xl mr-2 lg:mr-3">📰</span>
            <div>
              <p className="text-amber-100 text-xs lg:text-sm">Actualités</p>
              <p className="text-xl lg:text-2xl font-bold">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 lg:p-6 text-white">
          <div className="flex items-center">
            <span className="text-xl lg:text-2xl mr-2 lg:mr-3">🤝</span>
            <div>
              <p className="text-purple-100 text-xs lg:text-sm">Partenaires</p>
              <p className="text-xl lg:text-2xl font-bold">8</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">Actions Rapides</h2>
          <div className="space-y-2">
            <a href="/admin/actualites/new" className="flex items-center p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm lg:text-base">
              <span className="mr-3 text-lg">➕</span>
              Créer une nouvelle actualité
            </a>
            <a href="/admin/team-experts/new" className="flex items-center p-3 text-green-600 hover:bg-green-50 rounded-lg transition-colors text-sm lg:text-base">
              <span className="mr-3 text-lg">👨‍💼</span>
              Ajouter un membre d'équipe
            </a>
            <a href="/admin/galerie" className="flex items-center p-3 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors text-sm lg:text-base">
              <span className="mr-3 text-lg">📸</span>
              Gérer la galerie
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">Activités Récentes</h2>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600 mr-3 text-lg">📰</span>
              <div>
                <p className="font-medium text-sm lg:text-base">Nouvelle actualité publiée</p>
                <p className="text-xs lg:text-sm text-gray-600">Il y a 2 heures</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600 mr-3 text-lg">👨‍💼</span>
              <div>
                <p className="font-medium text-sm lg:text-base">Profil équipe mis à jour</p>
                <p className="text-xs lg:text-sm text-gray-600">Il y a 1 jour</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600 mr-3 text-lg">📸</span>
              <div>
                <p className="font-medium text-sm lg:text-base">Photos ajoutées à la galerie</p>
                <p className="text-xs lg:text-sm text-gray-600">Il y a 2 jours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}