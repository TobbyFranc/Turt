import React, { useState, useEffect } from 'react';


const Dashnav = () => {
  const [darkMode, setDarkMode] = useState(() => {
  // Check localStorage or system preference
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) return JSON.parse(saved);
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
});

  // Apply dark mode class to <html>
useEffect(() => {
  const root = window.document.documentElement;
  if (darkMode) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
}, [darkMode]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white h-screen w-64 fixed top-0 left-0 shadow-lg">
      <div className="flex justify-end items-center h-16 px-4">
        <button className="p-2 rounded-full hover:bg-[var(--grayColor)]">
          {/* Back button icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
          </svg>
        </button>
      </div>

      <nav className="p-6 space-y-6">
        {[
          { label: 'Dashboard', href: '/Dashboard', icon: 'home' },
          { label: 'Profile', href: '/Profile', icon: 'user' },
          { label: 'Support', href: '/Support', icon: 'lifebuoy' },
          { label: 'Messages', href: '/Messages', icon: 'chat' },
          { label: 'Bookmarks', href: '/Bookmarks', icon: 'bookmark' },
          { label: 'Notes', href: '/Notes', icon: 'note' },
          { label: 'Settings', href: '/Settings', icon: 'cog' },
        ].map((item, idx) => (
          <a key={idx} href={item.href} className="flex items-center justify-between p-2 rounded-full border hover:text-[var(--primaryColor)] hover:shadow-md">
            <span className="flex items-center gap-2">
              {/* Replace with actual icons or use Heroicons */}
              <span className="w-6 h-6 bg-gray-300 rounded-full"></span>
              {item.label}
            </span>
            {item.label === 'Messages' && (
              <span className="bg-[var(--accentColor)] text-white rounded-full h-6 w-6 flex items-center justify-center text-sm">5</span>
            )}
          </a>
        ))}

        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-[var(--grayColor)]">Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 border-1 ${
              darkMode ? 'bg-[var(--lightGrayColor)]' : 'bg-[var(--grayColor)]'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>

        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        {/* Logout */}
        <a href="/" className="flex items-center justify-center p-2 rounded-full border bg-[var(--grayColor)] text-white hover:shadow-md">
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Logout
          </span>
        </a>
      </nav>
    </div>
  );
};

export default Dashnav;
