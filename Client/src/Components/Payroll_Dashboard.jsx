import React from 'react'
import { Navigation } from '../Navigation';

export const Payroll_Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-6 flex items-center">
        <div className="text-xl">
          <img  src="/public/Images/Logo (1).jpg"
                alt="PayMe"
                className="text-xl" />
        </div>
        <div className="ml-auto flex items-center">
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mr-2">
            Notification
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mr-2">
            Logout
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-500 mr-2"></div>
            <span className="text-sm">John Doe</span>
          </div>
        </div>
      </header>
      <main className="flex flex-row flex-grow">
        <aside className="bg-gray-200 p-4">
          <ul className="space-y-2">
            <li className="hover:bg-gray-300 py-2 px-4 rounded">Payroll</li>
            <li className="hover:bg-gray-300 py-2 px-4 rounded">Processor</li>
          </ul>
        </aside>
        <div className="flex-grow bg-white p-4">
          <div className="flex justify-end mb-4">
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
              Upload
            </button>
          </div>
          {/* Other content */}
        </div>
      </main>
    </div>
  );
}
