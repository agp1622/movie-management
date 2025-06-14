'use client';
import { useState, useEffect, use } from 'react';
import { api } from '@/api';
import { Movie, Rating, Actor } from '@/types';
import Modal from '@/components/Modal';
import RatingForm from '@/components/RatingForm';

export default function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showAddActorModal, setShowAddActorModal] = useState(false);
  const [selectedActorId, setSelectedActorId] = useState<number>(0);
  const [characterName, setCharacterName] = useState('');

  const loadData = async () => {
    const movieId = parseInt(resolvedParams.id);

    try {
      const [movieData, ratingsData, actorsData] = await Promise.all([
        api.getMovie(movieId),
        api.getRatings(movieId).catch(() => []),
        api.getActors().catch(() => [])
      ]);

      setMovie(movieData);
      setRatings(ratingsData);
      setActors(actorsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load movie details');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [resolvedParams.id]);

  const handleAddRating = () => {
    setShowRatingModal(false);
    loadData();
  };

  const handleDeleteRating = async (ratingId: number) => {
    if (confirm('Are you sure you want to delete this rating?')) {
      try {
        await api.deleteRating(ratingId);
        loadData();
      } catch (err) {
        alert('Failed to delete rating');
      }
    }
  };

  const handleAddActor = async () => {
    if (!selectedActorId) return;

    try {
      await api.addActorToMovie(movie!.id, selectedActorId, characterName || undefined);
      setShowAddActorModal(false);
      setSelectedActorId(0);
      setCharacterName('');
      loadData();
    } catch (err) {
      alert('Failed to add actor to movie');
    }
  };

  const handleRemoveActor = async (actorId: number, actorName: string) => {
    if (confirm(`Remove ${actorName} from this movie?`)) {
      try {
        await api.removeActorFromMovie(movie!.id, actorId);
        loadData();
      } catch (err) {
        alert('Failed to remove actor');
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div>Loading movie details...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="p-6">
        <div className="text-red-600 mb-4">{error || 'Movie not found'}</div>
        <a href="/movies">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            ← Back to Movies
          </button>
        </a>
      </div>
    );
  }


  const availableActors = actors.filter(actor =>
    !movie.movieActors?.some(ma => ma.actor?.id === actor.id)
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <a href="/movies">
          <button className="border px-4 py-2 rounded">
            ← Back to Movies
          </button>
        </a>
      </div>

      <div className="border rounded p-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{movie.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border rounded p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Cast & Characters
              </h2>
              <button
                onClick={() => setShowAddActorModal(true)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Add Actor
              </button>
            </div>

            {movie.movieActors && movie.movieActors.length > 0 ? (
              <div className="space-y-3">
                {movie.movieActors.map(ma => (
                  <div key={ma.id} className="border p-3 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <a href={`/actors/${ma.actor?.id}`}>
                          <button className="text-blue-600 hover:underline font-medium text-left">
                            {ma.actor?.first_name} {ma.actor?.last_name}
                          </button>
                        </a>
                        {ma.character_name && (
                          <div className="text-gray-600 text-sm mt-1">
                            as {ma.character_name}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveActor(ma.actor!.id, `${ma.actor?.first_name} ${ma.actor?.last_name}`)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No cast information available</p>
            )}
          </div>

          <div className="border rounded p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Ratings & Reviews
              </h2>
              <button
                onClick={() => setShowRatingModal(true)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Add Rating
              </button>
            </div>

            {ratings.length > 0 ? (
              <div className="space-y-3">
                <div className="max-h-64 overflow-y-auto">
                  <div className="space-y-2">
                    {ratings.map(rating => (
                      <div key={rating.id} className="border p-3 rounded flex justify-between items-center">
                        <span className="font-bold">{rating.rating}/5.0</span>
                        <button
                          onClick={() => handleDeleteRating(rating.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No ratings available</p>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        title="Add Rating"
      >
        <RatingForm
          movieId={movie.id}
          onSuccess={handleAddRating}
          onCancel={() => setShowRatingModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showAddActorModal}
        onClose={() => setShowAddActorModal(false)}
        title="Add Actor to Movie"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Actor
            </label>
            <select
              value={selectedActorId}
              onChange={(e) => setSelectedActorId(parseInt(e.target.value))}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value={0}>Choose an actor...</option>
              {availableActors.map(actor => (
                <option key={actor.id} value={actor.id}>
                  {actor.first_name} {actor.last_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Character Name (Optional)
            </label>
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. Batman, Joker"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAddActor}
              disabled={!selectedActorId}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded disabled:bg-blue-400"
            >
              Add Actor
            </button>
            <button
              onClick={() => setShowAddActorModal(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}