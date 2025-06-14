import Link from 'next/link';
import { Movie } from '@/types';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const actorCount = movie.movieActors?.length || 0;

  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
        <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
        <p className="text-gray-600">
          {actorCount ? `${actorCount} actors` : 'No actors'}
        </p>
      </div>
    </Link>
  );
}