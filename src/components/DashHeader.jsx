import React from "react";

const DashHeader = ({ onToggleNav }) => (
  <header className="fixed top-0 left-0 w-full h-20 bg-white dark:bg-gray-900 shadow-md z-40 flex items-center justify-between px-6">
    {/* Left: Logo + Nav Toggle */}
    <div className="flex items-center gap-4">
      <button
        className="lg:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={onToggleNav}
        aria-label="Toggle Navigation"
      >
        <svg className="w-6 h-6 text-[var(--primaryColor)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <img src="/logo.svg" alt="Turtura Logo" className="w-8 h-8" />
      <h1 className="text-xl font-bold text-[var(--primaryColor)]">Turtura</h1>
    </div>

    {/* Right: Language + User */}
    <div className="flex items-center gap-4">
      <select className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm">
        <option value="en">EN</option>
        <option value="ig">IG</option>
        <option value="yo">YO</option>
      </select>
      <div className="flex items-center gap-2">
        <img
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=687&q=80"
          alt="User"
          className="w-10 h-10 rounded-full object-cover border-2 border-[var(--primaryColor)]"
        />
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-[var(--primaryColor)]">Tobi</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Port Harcourt, Nigeria</p>
        </div>
      </div>
    </div>
  </header>
);

export default DashHeader;
