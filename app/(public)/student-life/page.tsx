export default function StudentLifePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Vie Étudiante</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Hébergement</h3>
          <p className="text-gray-600">Résidences universitaires et logements</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Clubs & Associations</h3>
          <p className="text-gray-600">Rejoignez nos clubs étudiants</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Sports</h3>
          <p className="text-gray-600">Activités sportives et équipes</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Événements</h3>
          <p className="text-gray-600">Calendrier des événements étudiants</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <p className="text-gray-600">Services d'aide aux étudiants</p>
        </div>
      </div>
    </div>
  )
}