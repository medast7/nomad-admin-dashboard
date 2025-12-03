// src/pages/DashboardPage.tsx
import React from 'react';
import SummaryCard from '../components/SummaryCard';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <SummaryCard title="Total Users" value={1245} />
        <SummaryCard title="Active Tours" value={24} />
        <SummaryCard title="Total Bookings" value={523} />
        <SummaryCard title="Revenue" value={'$36,200'} subtitle="Last 30 days" />
      </div>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
        <h2 className="font-semibold mb-2">Monthly Bookings</h2>
        <div className="h-48 flex items-center justify-center text-gray-400">[Line chart placeholder]</div>
      </section>
    </div>
  );
}
