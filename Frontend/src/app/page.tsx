import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Movie Management System</h1>
      <p className="text-gray-600 text-center mb-8">
        Create, browse, and manage movies, actors, and ratings
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border p-6 rounded">
          <h2 className="text-lg font-semibold mb-3">Movies</h2>
          <p className="text-gray-600 mb-4">
            Manage movies.
          </p>
          <div className="flex gap-2">
            <Link href="/movies">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Browse Movies
              </button>
            </Link>
          </div>
        </div>

        <div className="border p-6 rounded">
          <h2 className="text-lg font-semibold mb-3">Actors</h2>
          <p className="text-gray-600 mb-4">
            Manage actors.
          </p>
          <div className="flex gap-2">
            <Link href="/actors">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Browse Actors
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}