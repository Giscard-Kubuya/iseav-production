export default function AdminHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Administration ISEAV-ARU</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <span className="sr-only">Notifications</span>
              🔔
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="text-sm">
                <div className="font-medium text-gray-900">Admin User</div>
                <div className="text-gray-500">admin@iseav-aru.tn</div>
              </div>
              <button className="w-8 h-8 bg-gray-300 rounded-full"></button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}