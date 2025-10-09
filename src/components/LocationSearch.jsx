import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LocationInfo from "./LocationInfo";
import { useVoiceSearch } from "../hooks/useVoiceSearch";
import globalCulture from "../assets/global-culture.jpg";
import market from "../assets/market.jpg";
import fashion from "../assets/fashion.jpg";
import afrofashion from "../assets/afrofashion.jpg";
import afrowedding from "../assets/afrowedding.jpg";
import indianwedding from "../assets/indianwedding.jpg";
import marriage from "../assets/marriage.jpg";
import cuisine from "../assets/cuisine.jpg";

const defaultTabs = ["Fashion", "Cuisine", "Greetings", "Taboos", "Marriage", "Festival"];

const fallbackImagesMap = {
  Fashion: [fashion, afrofashion],
  Cuisine: [cuisine],
  Greetings: [market],
  Taboos: [globalCulture],
  Marriage: [afrowedding, indianwedding, marriage],
  Festival: [globalCulture],
};

const getContinent = (code) => ({ NG: "Africa", US: "North America", FR: "Europe" }[code] || "Unknown");
const getLanguage = (code) => ({ NG: "English", FR: "French", JP: "Japanese" }[code] || "Unknown");
const getWeather = async () => "Partly Cloudy";

const suggestTabs = (query) => {
  const lower = query.toLowerCase();
  if (lower.includes("food") || lower.includes("dish")) return ["Cuisine", "Festival"];
  if (lower.includes("fashion") || lower.includes("style")) return ["Fashion", "Greetings"];
  if (lower.includes("wedding") || lower.includes("marriage")) return ["Marriage", "Festival"];
  return defaultTabs;
};

const LocationSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const passedQuery = location.state?.query || "";
  const [query, setQuery] = useState(passedQuery);
  const [locationData, setLocationData] = useState(location.state?.locationData || null);
  const [images, setImages] = useState({});
  const [activeTab, setActiveTab] = useState("Description");
  const [availableTabs, setAvailableTabs] = useState(defaultTabs);
  const [showFilter, setShowFilter] = useState(false);
  const [showTura, setShowTura] = useState(false);
  const [turaQuestion, setTuraQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchComplete, setSearchComplete] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
  if (passedQuery) {
    setQuery(passedQuery);
    handleSearch({ preventDefault: () => {} });
  }
}, [passedQuery]);


  const startVoiceRecognition = useVoiceSearch(
    setQuery,
    () => {
      setIsListening(false);
      setCountdown(3);
      let timer = 3;
      const interval = setInterval(() => {
        timer -= 1;
        setCountdown(timer);
        if (timer === 0) {
          clearInterval(interval);
          setCountdown(null);
          handleSearch({ preventDefault: () => {} });
        }
      }, 1000);
    }
  );

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/api/edenai/recognize", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      const label = result.google?.items?.[0]?.label || "unknown";
      setQuery(label);
      handleSearch({ preventDefault: () => {} });
    } catch {
      console.error("Photo recognition failed.");
    }
  };

  const fetchImagesForTab = async (topic) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + " " + topic)}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      );
      const data = await res.json();
      return data.results || [];
    } catch {
      return [];
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSubmitting(true);
    setSearchComplete(false);

    try {
      const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
      const wikiData = await wikiRes.json();

      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
      const geoData = await geoRes.json();
      const { lat, lon } = geoData[0] || {};
      const countryCode = geoData[0]?.address?.country_code?.toUpperCase() || "NG";

      const continent = getContinent(countryCode);
      const language = getLanguage(countryCode);
      const weather = await getWeather();

      const suggested = suggestTabs(query);
      setAvailableTabs(suggested);
      setActiveTab("Description");

      const imageResults = {};
      for (const tab of suggested) {
        imageResults[tab] = await fetchImagesForTab(tab.toLowerCase());
      }

      setImages(imageResults);
      setLocationData({
        name: query,
        continent,
        lat: lat || "Unknown",
        lon: lon || "Unknown",
        weather,
        language,
        summary: wikiData.extract || "No cultural summary found.",
      });

      setSearchComplete(true);
      setTimeout(() => setSearchComplete(false), 3000);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contentMap = {
    Description: locationData?.summary || "No cultural summary available.",
    Fashion: `Traditional fashion in ${locationData?.name} reflects elegance and heritage.`,
    Cuisine: `${locationData?.name} offers a rich culinary tradition with diverse flavors.`,
    Greetings: `In ${locationData?.name}, greetings are rituals of respect.`,
    Taboos: `Every culture has its boundaries. In ${locationData?.name}, taboos are deeply rooted.`,
    Marriage: `Marriage in ${locationData?.name} is a tapestry of rituals and family traditions.`,
    Festival: `Festivals in ${locationData?.name} are vibrant expressions of joy and community.`,
  };

  return (
    <div className="min-h-screen bg-[var(--bgColor)] open-sans-400 transition-all duration-300">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full px-4 py-4 bg-[var(--bgColor)] z-50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-[var(--grayColor)] px-4 py-2 rounded-md hover:bg-[var(--accentColor)] transition"
          >
            ← 
          </button>

          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              placeholder="Search culture, country, or tradition..."
              className="w-full px-5 py-3 pr-24 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] transition-all duration-300"
              autoFocus
            />
            <div className="absolute top-1/2 right-4 flex gap-2 -translate-y-1/2">
              <button
                onClick={() => {
                  setIsListening(true);
                  startVoiceRecognition();
                }}
                className={`hover:scale-110 transition ${isListening ? "animate-pulse text-[var(--primaryColor)]" : ""}`}
                title="Voice Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[var(--grayColor)] hover:text-[var(--primaryColor)] transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v11m-4-6a4 4 0 118 0v6a4 4 0 11-8 0zM19 10v2a7 7 0 01-14 0v-2m7 9v3m-4 0h8" />
</svg>

              </button>
              <label htmlFor="photoInput" className="cursor-pointer hover:scale-110 transition" title="Upload Photo">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[var(--grayColor)] hover:text-[var(--primaryColor)] transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h3l2-3h8l2 3h3a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z" />
  <circle cx="12" cy="13" r="4" />
</svg>

              </label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photoInput"
              />
            </div>

            {isListening && (
              <div className="absolute top-full left-0 w-full text-center text-[var(--primaryColor)] text-sm mt-2 animate-pulse">
                🎙️ Listening... Speak now
              </div>
            )}
            {countdown !== null && (
              <div className="absolute top-full left-0 w-full text-center text-[var(--accentColor)] text-sm mt-2 animate-pulse">
                ⏳ Searching in {countdown}...
              </div>
            )}
          </div>

          <button
            disabled={isSubmitting}
            onClick={handleSearch}
            className={`min-w-[140px] px-6 py-3 rounded-md transition duration-300 ${
              isSubmitting
                ? "bg-gray-400 text-white"
                : searchComplete
                ? "bg-green-600 text-white"
                : "bg-[var(--accentColor)] text-white hover:bg-[var(--primaryColor)]"
            }`}
          >
            {isSubmitting ? "Searching..." : searchComplete ? "✔ Done" : "Search"}
          </button>
        </div>
      </div>

      {/* Location Info */}
      <LocationInfo locationData={locationData} />

      {/* Map and Image Slider Section */}
      {locationData && (
        <div className="max-w-5xl mx-auto px-4 mb-6">
          {activeTab === "Description" ? (
            <iframe
              title="Map"
              src={`https://maps.google.com/maps?q=${locationData.lat},${locationData.lon}&z=6&output=embed`}
              className="w-full h-[400px] rounded-md border-0"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <Swiper key={activeTab} modules={[Navigation, Pagination]} spaceBetween={10} slidesPerView={1} navigation pagination={{ clickable: true }}>
              {(images[activeTab]?.length > 0 ? images[activeTab] : fallbackImagesMap[activeTab] || [globalCulture]).map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-[400px] rounded-md overflow-hidden">
                    <img
                      src={img?.urls?.regular || img}
                      alt={img?.alt_description || `${activeTab}-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      )}

      {/* Tabs and Content */}
      {locationData && (
        <div className="relative max-w-5xl mx-auto px-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-[var(--primaryColor)]">Explore Topics</h4>
            <button onClick={() => setShowFilter(true)} title="Filter Tabs">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[var(--grayColor)] hover:text-[var(--primaryColor)]">
                <path d="M4 6h16" />
                <path d="M6 12h12" />
                <path d="M10 18h4" />
              </svg>
            </button>
          </div>

          <ul className="flex gap-4 overflow-x-scroll text-sm font-medium">
            {["Description", ...availableTabs].map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`p-2 border-b-2 cursor-pointer ${
                  activeTab === tab
                    ? "text-[var(--primaryColor)] border-[var(--primaryColor)]"
                    : "text-[var(--grayColor)] hover:text-[var(--accentColor)] hover:border-b-[var(--accentColor)]"
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>

          {/* Floating Filter Overlay */}
          {showFilter && (
            <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                <h5 className="text-md font-semibold mb-4 text-[var(--primaryColor)]">Select Tabs to Display</h5>
                {defaultTabs.map((tab) => (
                  <label key={tab} className="block mb-2 text-[var(--textColor)]">
                    <input
                      type="checkbox"
                      checked={availableTabs.includes(tab)}
                      onChange={(e) => {
                        setAvailableTabs((prev) =>
                          e.target.checked ? [...prev, tab] : prev.filter((t) => t !== tab)
                        );
                      }}
                      className="mr-2"
                    />
                    {tab}
                  </label>
                ))}
                <button
                  onClick={() => setShowFilter(false)}
                  className="mt-4 px-4 py-2 bg-[var(--accentColor)] text-white rounded-md hover:bg-[var(--primaryColor)] transition-all duration-300 w-full"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 text-[var(--textColor)] text-justify">
            {contentMap[activeTab]}
          </div>
        </div>
      )}

      {/* Tura AI Button */}
      <div className="fixed bottom-8 right-8 z-50 transition-all duration-500">
        {!showTura && (
          <button
            onClick={() => setShowTura(true)}
            className="bg-[var(--accentColor)] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[var(--blueColor)]"
          >
            Ask Tura AI 💬
          </button>
        )}
      </div>

      {/* Tura AI Chat Panel */}
      <div
        className={`fixed bottom-8 right-0 h-[600px] w-80 bg-white border-l z-40 p-4 overflow-y-auto transition-transform duration-500 ${
          showTura ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setShowTura(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
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

      {/* Community Link */}
      <div className="max-w-5xl mx-auto px-4 mb-12 flex justify-start">
        <a
          href="/CommunityChatroom"
          className="bg-[var(--accentColor)] text-white px-4 py-2 rounded-md hover:bg-[var(--primaryColor)] transition-all duration-300"
        >
          Join Community 💬
        </a>
      </div>
    </div>
  );
};

export default LocationSearch;
