import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DashAside = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className=" space-y-8 py-6">
      {/* Culture Calendar */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--primaryColor)] mb-2">📅 Culture Calendar</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <Calendar value={date} onChange={setDate} />
          <p className="text-xs text-gray-500 mt-2">Tap a date to explore holidays, festivals, and rituals.</p>
        </div>
      </section>

      {/* Happening Now */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--primaryColor)] mb-2">🔥 Happening Now</h2>
        <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-800 dark:text-gray-200">Eke Market Day • Port Harcourt Central</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Live updates from local vendors</p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--primaryColor)] mb-2">📌 Upcoming Events</h2>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>🗣️ Igbo Language Workshop – Oct 15</li>
          <li>💃 Traditional Dance Showcase – Oct 18</li>
          <li>🌽 Farmers Market – Oct 20</li>
          <li>🎶 Palm Wine Music Night – Oct 22</li>
        </ul>
      </section>

      {/* Trending Updates */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--primaryColor)] mb-2">📈 Trending Now</h2>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>“Palm Wine Culture” gaining global attention 🌍</p>
          <p>Yam Festival highlights featured on national TV 📺</p>
          <p>Local textile revival sparks fashion movement 👗</p>
        </div>
      </section>

      {/* Events Around You */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--primaryColor)] mb-2">📍 Events Around You</h2>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>🛍️ Artisan Fair – Mile 1 Market</p>
          <p>🕯️ Candlelight Vigil – Bonny Island</p>
          <p>🎭 Street Theater – GRA Junction</p>
        </div>
      </section>
    </div>
  );
};

export default DashAside;
