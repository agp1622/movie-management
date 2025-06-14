'use client';
import { useState, useEffect, use } from 'react';
import { api } from '@/api';
import { Actor } from '@/types';

export default function ActorDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  const [actor, setActor] = useState<Actor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const actorId = parseInt(resolvedParams.id);
    api.getActor(actorId).then(data => {
      setActor(data);
      setLoading(false);
    });
  }, [resolvedParams.id]);

  if (loading) return <div>Loading...</div>;
  if (!actor) return <div>Actor not found</div>;

  return (
    <div>
      <a href="/actors" className="text-blue-600 hover:underline mb-4 block">← Back to Actors</a>

      <h1 className="text-3xl font-bold mb-4">
        {actor.first_name} {actor.last_name}
      </h1>

      <div>
        <h2 className="text-xl font-semibold mb-2">Movies</h2>
        {actor.movieActors && actor.movieActors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {actor.movieActors.map(ma => (
              <div key={ma.id} className="border p-4 rounded">
                <h3 className="font-semibold">
                  <a
                    href={`/movies/${ma.movie?.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {ma.movie?.title}
                  </a>
                </h3>
                <p className="text-gray-600">{ma.movie?.year}</p>
                {ma.character_name && (
                  <p className="text-sm text-gray-500">as {ma.character_name}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No movies found for this actor</p>
        )}
      </div>
    </div>
  );
}