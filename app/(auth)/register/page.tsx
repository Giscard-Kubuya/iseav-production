export default function RegisterPage() {
  return (
    <div>
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
        Créer un compte
      </h2>
      <form className="space-y-6">
        <div>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Prénom"
          />
        </div>
        <div>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Nom"
          />
        </div>
        <div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Adresse email"
          />
        </div>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Mot de passe"
          />
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Créer le compte
          </button>
        </div>
      </form>
    </div>
  )
}