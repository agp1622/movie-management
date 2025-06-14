'use client';
import { useState, useEffect } from 'react';
import { api } from '@/api';
import { Movie } from '@/types';
import Modal from '@/components/Modal';
import MovieForm from '@/components/MovieForm';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const loadMovies = async () => {
    try {
      const data = await api.getMovies();
      setMovies(data);
      setFilteredMovies(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load movies');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [search, movies]);

  const handleDelete = async (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await api.deleteMovie(id);
        loadMovies();
      } catch (err) {
        alert('Failed to delete movie');
      }
    }
  };

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    loadMovies();
  };

  const handleEditSuccess = () => {
    setEditingMovie(null);
    loadMovies();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div>Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Movies</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search movies..."
            className="border p-2 rounded w-full sm:w-auto sm:max-w-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Movie
          </button>
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <div className="py-8">
          <p className="text-gray-500 mb-4">
            {search ? 'No movies found matching your search.' : 'No movies available.'}
          </p>
          {!search && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create Your First Movie
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredMovies.length} of {movies.length} movies
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMovies.map(movie => {
              const actorCount = movie.movieActors?.length || 0;

              return (
                <div key={movie.id} className="border p-4 rounded">
                  <div className="mb-3">
                    <p className="text-gray-600">{movie.year}</p>
                    <p className="text-sm text-gray-500">
                      {actorCount} {actorCount === 1 ? 'actor' : 'actors'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <a href={`/movies/${movie.id}`} className="block">
                      <button className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm">
                        View Details
                      </button>
                    </a>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingMovie(movie)}
                        className="flex-1 bg-yellow-500 text-white py-1 px-3 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(movie.id, movie.title)}
                        className="flex-1 bg-red-500 text-white py-1 px-3 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Movie"
      >
        <MovieForm
          onSuccess={handleCreateSuccess}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingMovie}
        onClose={() => setEditingMovie(null)}
        title="Edit Movie"
      >
        {editingMovie && (
          <MovieForm
            movie={editingMovie}
            onSuccess={handleEditSuccess}
            onCancel={() => setEditingMovie(null)}
          />
        )}
      </Modal>
    </div>
  );
}