import React, { useState } from "react";
import {
  HomeIcon,
  CalendarIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { label: "Home", icon: <HomeIcon className="w-5 h-5" /> },
  { label: "Events", icon: <CalendarIcon className="w-5 h-5" /> },
  { label: "Chat", icon: <ChatBubbleBottomCenterTextIcon className="w-5 h-5" /> },
  { label: "Settings", icon: <Cog6ToothIcon className="w-5 h-5" /> },
];

const Dashnav = ({ isCollapsed, toggleCollapse }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col h-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
        {/* Collapse Toggle */}
        <div className="flex justify-end items-center h-16 px-4">
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Collapse"
          >
            <svg className={`w-6 h-6 text-gray-500 transition-transform ${isCollapsed ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {navItems.map((item, index) => (
            <div key={index} className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition ${isCollapsed ? "justify-center" : ""}`}>
              {item.icon}
              {!isCollapsed && <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.label}</span>}
            </div>
          ))}
        </nav>

        {/* Bottom Controls */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:opacity-80"
          >
            {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            {!isCollapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center justify-between w-full text-sm text-gray-700 dark:text-gray-200 hover:opacity-80"
            >
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=687&q=80"
                  alt="User"
                  className="w-6 h-6 rounded-full object-cover"
                />
                {!isCollapsed && <span>Tobi</span>}
              </div>
              {!isCollapsed && <ChevronDownIcon className="w-4 h-4" />}
            </button>

            {profileOpen && (
              <div className="absolute bottom-10 left-0 w-48 bg-white dark:bg-gray-800 border rounded shadow-lg z-50">
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Profile</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Settings</button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900 flex items-center gap-2">
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 shadow-inner flex justify-around items-center h-16 lg:hidden z-50">
        {navItems.map((item, index) => (
          <button key={index} className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200">
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Dashnav;
