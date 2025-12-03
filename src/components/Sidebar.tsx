// src/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white dark:bg-gray-800 border-r hidden md:block">
      <div className="p-6">
        <h2 className="text-xl font-bold">Nomad Admin</h2>
      </div>
      <nav className="p-4 space-y-2">
        <NavLink to="/" className={({isActive}) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200'}`}>Dashboard</NavLink>
        <NavLink to="/users" className="block px-4 py-2 rounded text-gray-700 dark:text-gray-200">Users</NavLink>
        <NavLink to="/tours" className={({isActive}) => `block px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200'}`}>Tours</NavLink>
        <NavLink to="/bookings" className="block px-4 py-2 rounded text-gray-700 dark:text-gray-200">Bookings</NavLink>
        <NavLink to="/settings" className="block px-4 py-2 rounded text-gray-700 dark:text-gray-200">Settings</NavLink>
        <button className="w-full text-left px-4 py-2 rounded text-red-600">Logout</button>
      </nav>
    </aside>
  );
}
