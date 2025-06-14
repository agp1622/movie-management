'use client';
import { useState, useEffect } from 'react';
import { api } from '@/api';
import { Actor } from '@/types';
import Modal from '@/components/Modal';
import ActorForm from '@/components/ActorForm';

export default function ActorsPage() {
  const [actors, setActors] = useState<Actor[]>([]);
  const [filteredActors, setFilteredActors] = useState<Actor[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingActor, setEditingActor] = useState<Actor | null>(null);

  const loadActors = async () => {
    try {
      const data = await api.getActors();
      setActors(data);
      setFilteredActors(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load actors');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActors();
  }, []);

  useEffect(() => {
    const filtered = actors.filter(actor =>
      `${actor.first_name} ${actor.last_name}`.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredActors(filtered);
  }, [search, actors]);

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await api.deleteActor(id);
        loadActors();
      } catch (err) {
        alert('Failed to delete actor');
      }
    }
  };

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    loadActors();
  };

  const handleEditSuccess = () => {
    setEditingActor(null);
    loadActors();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div>Loading actors...</div>
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
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Actors</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search actors..."
            className="border p-2 rounded w-full sm:w-auto sm:max-w-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Actor
          </button>
        </div>
      </div>

      {filteredActors.length === 0 ? (
        <div className="py-8">
          <p className="text-gray-500 mb-4">
            {search ? 'No actors found matching your search.' : 'No actors available.'}
          </p>
          {!search && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Your First Actor
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredActors.length} of {actors.length} actors
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredActors.map(actor => (
              <div key={actor.id} className="border p-4 rounded">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg">
                    {actor.first_name} {actor.last_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {actor.movieActors?.length || 0} {(actor.movieActors?.length || 0) === 1 ? 'movie' : 'movies'}
                  </p>
                </div>

                <div className="space-y-2">
                  <a href={`/actors/${actor.id}`} className="block">
                    <button className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm">
                      View Profile
                    </button>
                  </a>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingActor(actor)}
                      className="flex-1 bg-yellow-500 text-white py-1 px-3 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(actor.id, `${actor.first_name} ${actor.last_name}`)}
                      className="flex-1 bg-red-500 text-white py-1 px-3 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Actor"
      >
        <ActorForm
          onSuccess={handleCreateSuccess}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingActor}
        onClose={() => setEditingActor(null)}
        title="Edit Actor"
      >
        {editingActor && (
          <ActorForm
            actor={editingActor}
            onSuccess={handleEditSuccess}
            onCancel={() => setEditingActor(null)}
          />
        )}
      </Modal>
    </div>
  );
}