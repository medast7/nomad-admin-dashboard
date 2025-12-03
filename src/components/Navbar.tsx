// src/components/Navbar.tsx
import React from 'react';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 border-b">
      <div className="flex items-center gap-4">
        <button className="md:hidden">☰</button>
        <input placeholder="Search..." className="px-3 py-2 rounded-md border w-72 bg-gray-50 dark:bg-gray-700 text-sm" />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative">🔔<span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1">3</span></button>
        <div className="flex items-center gap-2">
          <img src="/avatar.png" alt="admin" className="w-8 h-8 rounded-full" />
          <div className="text-sm">Admin</div>
        </div>
      </div>
    </header>
  );
}
