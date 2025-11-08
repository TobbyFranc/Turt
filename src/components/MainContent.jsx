import React from "react";

const MainContent = () => {
  return (
    <div className="py-6 space-y-10">
      {/* Hero Section */}
      {/* <section className="relative bg-gradient-to-r from-yellow-100 to-yellow-300 dark:from-yellow-900 dark:to-yellow-700 rounded-xl p-6 shadow-md">
        <h2 className="text-3xl font-bold text-[var(--primaryColor)] mb-2">Welcome to Turtura 🌍</h2>
        <p className="text-gray-800 dark:text-gray-200 text-lg">
          Discover Nigeria's cultural heartbeat — from festivals to fashion, language to local legends.
        </p>
        <div className="absolute top-4 right-4 text-6xl">🪘</div>
      </section> */}

      <section className="flex items-center justify-between md:hidden">
        {/* image */}
        <div className="flex">
          <img
            src="https://randomuser.me/api/portraits/men/33.jpg"
            alt="Cultural Celebration"
            className="w-14 h-14 border-2 border-red-400 rounded-full shadow-lg object-cover"
          />
          {/* descrption */}
          <div className="">
            {/* name up and location down */}
            <div className="flex flex-col ml-6">
              <h1 className="text-sm font-bold text-[var(--primaryColor)]">Welcome Back, Tobi</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lagos, Nigeria</p>  
            </div>
          </div>

        </div>
          {/* Notification */}
          <div className="ml-4 relative ">
            <button className="text-2xl bg-[var(--lightGrayColor)] p-2 rounded-full">
              {/* bell svg with notification numbers */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-[var(--primaryColor)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
          </div>
      </section>

      {/* Interactive Map + Search */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--primaryColor)] mb-3">Explore Your Region</h3>
        <div className="bg-gray-200 dark:bg-gray-800 h-64 rounded-lg mb-4 flex items-center justify-center text-gray-500 dark:text-gray-400">
          {/* Replace with actual map component */}
          🗺️ Interactive Map Coming Soon
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-md max-w-screen-md mx-auto">
          <input
            type="text"
            placeholder="Search culture, events, places..."
            className="w-full px-4 py-3 bg-gray-50  border-b focus-none outline-none "
          />
          {/* search result */}
          <div className="mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md max-h-60 overflow-y-auto">
            <ul>
              {["Masquerade Festival", "Yam Festival", "Local Dance Troupe"].map((item, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* btn */}
          <button className="bg-[var(--accentColor)] px-6 py-4 w-full mt-4 rounded-md text-[var(--textColor)] ">Search</button>
        </div>
      </section>

      {/* Featured Events */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--primaryColor)] mb-3">🎉 Featured Events</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Igbo Language Workshop",
              date: "Oct 15 • Port Harcourt",
              emoji: "🗣️",
              bg: "bg-indigo-100 dark:bg-indigo-900",
            },
            {
              title: "Traditional Dance Showcase",
              date: "Oct 18 • Enugu",
              emoji: "💃",
              bg: "bg-pink-100 dark:bg-pink-900",
            },
            {
              title: "Palm Wine Music Night",
              date: "Oct 22 • Aba",
              emoji: "🎶",
              bg: "bg-yellow-100 dark:bg-yellow-900",
            },
          ].map((event, idx) => (
            <div key={idx} className={`${event.bg} p-4 rounded-lg shadow-md`}>
              <div className="text-3xl mb-2">{event.emoji}</div>
              <h4 className="font-bold text-[var(--primaryColor)] text-lg">{event.title}</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">{event.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cultural Highlights */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--primaryColor)] mb-3">🧭 Cultural Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h4 className="font-bold text-[var(--primaryColor)] mb-1">Palm Wine Culture</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              A centuries-old tradition now inspiring global mixology trends.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h4 className="font-bold text-[var(--primaryColor)] mb-1">Yam Festival</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Celebrating harvest, community, and ancestral blessings.
            </p>
          </div>
        </div>
      </section>

      {/* Community Voices */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--primaryColor)] mb-3">🗣️ Community Voices</h3>
        <div className="space-y-4">
          <blockquote className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="italic text-gray-700 dark:text-gray-300">“Turtura helped me reconnect with my roots.”</p>
            <footer className="text-xs text-gray-500 mt-2">— Ada, Enugu</footer>
          </blockquote>
          <blockquote className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="italic text-gray-700 dark:text-gray-300">“I found my first dance troupe through Turtura!”</p>
            <footer className="text-xs text-gray-500 mt-2">— Chinedu, Port Harcourt</footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default MainContent;
