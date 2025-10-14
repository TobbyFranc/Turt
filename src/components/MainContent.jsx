import React from "react";

const MainContent = () => {
  return (
    <div className="py-6 space-y-10">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-100 to-yellow-300 dark:from-yellow-900 dark:to-yellow-700 rounded-xl p-6 shadow-md">
        <h2 className="text-3xl font-bold text-[var(--primaryColor)] mb-2">Welcome to Turtura 🌍</h2>
        <p className="text-gray-800 dark:text-gray-200 text-lg">
          Discover Nigeria’s cultural heartbeat — from festivals to fashion, language to local legends.
        </p>
        <div className="absolute top-4 right-4 text-6xl">🪘</div>
      </section>

      {/* Interactive Map + Search */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--primaryColor)] mb-3">Explore Your Region</h3>
        <div className="bg-gray-200 dark:bg-gray-800 h-64 rounded-lg mb-4 flex items-center justify-center text-gray-500 dark:text-gray-400">
          {/* Replace with actual map component */}
          🗺️ Interactive Map Coming Soon
        </div>
        <input
          type="text"
          placeholder="Search culture, events, places..."
          className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]"
        />
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
