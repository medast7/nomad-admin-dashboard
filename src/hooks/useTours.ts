// src/hooks/useTours.ts
import { useEffect, useState } from 'react';
import { Tour } from '../types';

export function useTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTours() {
    setLoading(true);
    const r = await fetch('/api/update-tours'); // serverless GET
    const data = await r.json();
    setTours(data);
    setLoading(false);
  }

  async function saveTours(newTours: Tour[]) {
    const r = await fetch('/api/update-tours', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTours)
    });
    if (!r.ok) {
      const err = await r.json();
      throw new Error(err.message || 'Save failed');
    }
    await fetchTours();
  }

  useEffect(() => { fetchTours(); }, []);

  return { tours, loading, fetchTours, saveTours, setTours };
}
