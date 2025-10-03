import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";

const LocationSearch = () => {
  const [query, setQuery] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");
  const [coords, setCoords] = useState(null);
  const [images, setImages] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTura, setShowTura] = useState(false);
  const [turaQuestion, setTuraQuestion] = useState("");

  const tabs = ["Description", "Fashion", "Cuisine", "Greetings", "Taboos", "Marriage", "Festival"];

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setActiveTab("Description");

    try {
      const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
      const wikiData = await wikiRes.json();

      if (!wikiData || wikiData.title === "Not found.") {
        setLocationData(null);
        return;
      }

      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
      const geoData = await geoRes.json();
      const { lat, lon } = geoData[0] || {};

      const unsplashRes = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + " culture")}&client_id=UNSPLASH_ACCESS_KEY`
      );
      const unsplashData = await unsplashRes.json();

      setCoords({ lat, lon });
      setImages(unsplashData.results || []);

      setLocationData({
        name: query,
        continent: "Unknown",
        lat: lat || "Unknown",
        lon: lon || "Unknown",
        weather: "Unknown",
        heritage: "Unknown",
        summary: wikiData.extract || "No cultural summary found.",
      });
    } catch (error) {
      console.error("Search error:", error);
      setLocationData(null);
    }
  };

  const getImageForTab = () => {
    if (!locationData) return null;
    // const { lat, lon } = locationData;

    switch (activeTab) {
      case "Description":
        return `https://maps.google.com/maps?q=${lat},${lon}&z=6&output=embed`;
      case "Fashion":
        return images[0]?.urls?.regular || "";
      case "Cuisine":
        return images[1]?.urls?.regular || "";
      case "Greetings":
        return images[2]?.urls?.regular || "";
      case "Taboos":
        return images[3]?.urls?.regular || "";
      case "Marriage":
        return images[4]?.urls?.regular || "";
      case "Festival":
        return images[5]?.urls?.regular || "";
      default:
        return "";
    }
  };

  const contentMap = {
    Description: ` ${locationData?.summary}`,
    Fashion: `Traditional fashion in ${locationData?.name} reflects elegance and heritage. ${locationData?.fashion || ""}`,
    Cuisine: ` ${locationData?.name} offers a rich culinary tradition with diverse flavors. ${locationData?.food || ""}`,
    Greetings: `In ${locationData?.name}, greetings are rituals of respect. ${locationData?.greetings || ""}`,
    Taboos: `Every culture has its boundaries. In ${locationData?.name}, taboos are deeply rooted. ${locationData?.taboos || ""}`,
    Marriage: `Marriage in ${locationData?.name} is a tapestry of rituals and family traditions. ${locationData?.marriage || ""}`,
    Festival: `Festivals in ${locationData?.name} are vibrant expressions of joy and community. ${locationData?.festivals || ""}`,
  };

  return (
    <div className="min-h-screen bg-white text-slate-700 relative font-open-sans">
      {/* Hamburger */}
      <button onClick={toggleSidebar} className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md">
        <FiMenu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen w-64 bg-white border-r z-40 transform ${showSidebar ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:translate-x-0 md:w-16 md:flex md:flex-col md:items-center py-4 space-y-4`}>
        <a href="/Dashboard" className="hover:text-[var(--primaryColor)]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955..." />
          </svg>
        </a>
        <a href="/Profile" className="hover:text-[var(--primaryColor)]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75..." />
          </svg>
        </a>
      </div>

      {/* Search Bar */}
      <div className="ml-0 md:ml-16 p-8 mt-8 flex items-center justify-center">
        <form onSubmit={handleSearch} className="flex-1 flex space-x-4 max-w-4xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter location"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primaryColor)]"
          />
          <button type="submit" className="bg-[var(--accentColor)] text-white px-4 py-2 rounded-md hover:bg-yellow-600">
            Search
          </button>
        </form>
      </div>

      {/* Location Info */}
      {locationData ? (
        <div className="max-w-5xl mx-auto px-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center font-cormorant">
          <div className="space-y-2 text-sm text-gray-600">
            <h2 className="text-3xl font-semibold text-[var(--primaryColor)] capitalize">{locationData.name}</h2>
            <div><span className="mr-2">🌍</span>Continent: {locationData.continent}</div>
            <div><span className="mr-2">📍</span>Lat: {locationData.lat}, Lon: {locationData.lon}</div>
            <div><span className="mr-2">🌦️</span>Weather: {locationData.weather}</div>
            <div><span className="mr-2">🧬</span>Heritage: {locationData.heritage}</div>
          </div>
          <button className="mt-4 md:mt-0 bg-[var(--accentColor)] text-white px-4 py-2 rounded-md hover:bg-yellow-600">
            Join Community Chatroom
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-500 font-cormorant text-lg">Location not found. Try another search.</div>
      )}

      {/* Image Section */}
      {locationData && (
<div className="max-w-5xl mx-auto px-4 mb-6 relative h-64 overflow-hidden rounded-md">
  {activeTab === "Description" ? (
    <iframe
      title="Map"
      src={`https://maps.google.com/maps?q=${locationData.lat},${locationData.lon}&z=6&output=embed`}
      className="absolute top-0 left-0 w-full h-full border-0"
      allowFullScreen
      loading="lazy"
    ></iframe>
  ) : (
    <img
      src={getImageForTab()}
      alt={activeTab}
      className="absolute top-0 left-0 w-full h-full object-cover"
    />
  )}
</div>
      )}

      {/* Tabs */}
      {locationData && (
        <div className="max-w-5xl mx-auto px-4 mb-6">
          <ul className="flex gap-4 overflow-x-scroll text-sm font-medium">
            {tabs.map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`p-2 border-b-2 cursor-pointer ${
                  activeTab === tab
                    ? "text-[var(--primaryColor)] border-[var(--primaryColor)]"
                    : "text-gray-400 hover:text-black"
                }`}
                >{tab}</li>
            ))}
          </ul>
          <div className="mt-4 text-gray-700 text-justify">{contentMap[activeTab]}</div>
        </div>
      )}

      {/* Tura Sidebar */}
      {showTura && (
        <div className="fixed top-0 right-0 h-screen w-80 bg-white border-l z-40 p-4 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4 text-[var(--primaryColor)]">Ask Tura</h3>
          <textarea
            value={turaQuestion}
            onChange={(e) => setTuraQuestion(e.target.value)}
            placeholder="Ask a cultural question..."
            className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primaryColor)] mb-4"
          ></textarea>
          <button className="bg-[var(--accentColor)] text-white px-4 py-2 rounded-md hover:bg-yellow-600 w-full">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;