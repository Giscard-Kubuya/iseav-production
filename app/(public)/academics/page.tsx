export default function AcademicsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Programmes Académiques</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Facultés</h3>
          <p className="text-gray-600">Découvrez nos différentes facultés et départements</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Programmes</h3>
          <p className="text-gray-600">Licence, Master et programmes de certification</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Cours</h3>
          <p className="text-gray-600">Catalogue des cours disponibles</p>
        </div>
      </div>
    </div>
  )
}