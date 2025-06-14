'use client';
import { useState } from 'react';
import { api } from '@/api';

interface RatingFormProps {
  movieId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function RatingForm({ movieId, onSuccess, onCancel }: RatingFormProps) {
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.createRating({ movieId, rating });
      onSuccess();
    } catch (err: any) {
      setError('Failed to add rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-medium mb-1">Rating (1-10)</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
          max="10"
          required
        />
        <div className="mt-1 text-sm text-gray-500">
          {rating}/10 ⭐
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Rating'}
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