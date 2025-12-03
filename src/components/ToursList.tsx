// src/components/ToursList.tsx
import React from 'react';
import { Tour } from '../types';

type Props = {
  tours: Tour[];
  onEdit?: (t: Tour) => void;
  onDelete?: (id: string) => void;
};

export default function ToursList({ tours, onEdit, onDelete }: Props) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {tours.map(t => (
        <div key={t.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow hover:shadow-lg transition">
          <img
            src={t.images?.[0] ?? '/placeholder.jpg'}
            alt={t.title}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
          <h3 className="text-lg font-semibold">{t.title}</h3>
          <p className="text-sm text-gray-500">{t.durationDays} days • ${t.price}</p>

          <div className="mt-3">
            <h4 className="text-sm font-medium mb-1">Highlights</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-200">
              {t.highlights?.length ? (
                t.highlights.map((h, i) => <li key={i}>{h}</li>)
              ) : (
                <li className="text-gray-400 italic">No highlights</li>
              )}
            </ul>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className={`px-2 py-1 text-xs rounded-full ${t.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
              {t.status}
            </span>
            <div className="space-x-2">
              <button onClick={() => onEdit?.(t)} className="text-sm px-3 py-1 rounded bg-blue-600 text-white">Edit</button>
              <button onClick={() => onDelete?.(t.id)} className="text-sm px-3 py-1 rounded border">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
