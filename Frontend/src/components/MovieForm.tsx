'use client';
import { useState } from 'react';
import { api } from '@/api';
import { Movie } from '@/types';

interface MovieFormProps {
  movie?: Movie;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function MovieForm({ movie, onSuccess, onCancel }: MovieFormProps) {
  const [title, setTitle] = useState(movie?.title || '');
  const [year, setYear] = useState(movie?.year || new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = { title, year };

      if (movie) {
        await api.updateMovie(movie.id, data);
      } else {
        await api.createMovie(data);
      }

      onSuccess();
    } catch (err: any) {
      setError('Failed to save movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-medium mb-1">Movie Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1888"
          max={new Date().getFullYear() + 10}
          required
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : movie ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}