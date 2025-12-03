// src/pages/ToursPage.tsx
import React, { useState } from 'react';
import ToursList from '../components/ToursList';
import { useTours } from '../hooks/useTours';
import { Tour } from '../types';

export default function ToursPage() {
  const { tours, loading, saveTours, setTours } = useTours();
  const [editing, setEditing] = useState<Tour | null>(null);

  async function handleDelete(id: string) {
    if (!confirm('Delete this tour?')) return;
    const newArr = tours.filter(t => t.id !== id);
    await saveTours(newArr);
  }

  function startEdit(t: Tour) {
    setEditing(t);
  }

  async function saveEdit(updated: Tour) {
    const newArr = tours.map(t => t.id === updated.id ? updated : t);
    await saveTours(newArr);
    setEditing(null);
  }

  function cancelEdit() {
    setEditing(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tours</h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded">New Tour</button>
      </div>

      {loading ? <div>Loading...</div> : <ToursList tours={tours} onEdit={startEdit} onDelete={handleDelete} />}

      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 max-w-2xl">
            <h3 className="font-bold mb-3">Edit Tour</h3>
            <label className="block mb-2 text-sm">Title</label>
            <input value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} className="w-full p-2 rounded mb-3 border" />
            <label className="block mb-2 text-sm">Highlights (comma separated)</label>
            <input value={editing.highlights.join(', ')} onChange={e => setEditing({...editing, highlights: e.target.value.split(',').map(s=>s.trim())})} className="w-full p-2 rounded mb-3 border" />
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 border rounded" onClick={cancelEdit}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => saveEdit(editing)}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
