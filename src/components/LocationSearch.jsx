import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import LocationInfo from "./LocationInfo";
import SmartSearchInput from "./SmartSearchInput";
import regionMap from "./regionMap";

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

const languageMap = {
  nigeria: "English (widely spoken: Nigerian Pidgin)",
  yoruba: "English (widely spoken: Yoruba)",
  france: "French",
  japan: "Japanese",
  india: "Hindi, English",
};

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
  const [searchParams] = useSearchParams();

  const passedQuery = location.state?.query || searchParams.get("q") || "";
  const autoSearch = searchParams.get("auto") === "true";

  const [query, setQuery] = useState(passedQuery);
  const [locationData, setLocationData] = useState(location.state?.locationData || null);
  const [images, setImages] = useState({});
  const [activeTab, setActiveTab] = useState("Description");
  const [availableTabs, setAvailableTabs] = useState(defaultTabs);
  const [showFilter, setShowFilter] = useState(false);
  const [showTura, setShowTura] = useState(false);
  const [turaQuestion, setTuraQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trendingToday, setTrendingToday] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (passedQuery && autoSearch) {
      setQuery(passedQuery);
      handleSearch({ preventDefault: () => {} }, passedQuery);
    }
  }, [passedQuery, autoSearch]);

  const fetchImagesForTab = async (topic, baseQuery) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(baseQuery + " " + topic)}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      );
      const data = await res.json();
      return data.results || [];
    } catch {
      return [];
    }
  };

  const handleSearch = async (e, overrideQuery = null) => {
    e.preventDefault();
    const finalQuery = overrideQuery || query;
    if (!finalQuery.trim()) return;

    setIsSubmitting(true);

    try {
      const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(finalQuery)}`);
      const wikiData = await wikiRes.json();

      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(finalQuery)}`);
      const geoData = await geoRes.json();
      const { lat, lon } = geoData[0] || {};

      const normalizedQuery = finalQuery.toLowerCase().replace(/\s+/g, "");
      const continent = regionMap[normalizedQuery] || "Unknown";
      const language = languageMap[normalizedQuery] || "Unknown";
      const weather = "Mostly Cloudy, 29°C";
      const trending = `#CulturalFusion — trending in ${finalQuery}`;

      const suggested = suggestTabs(finalQuery);
      setAvailableTabs(suggested);
      setActiveTab("Description");

      const imageResults = {};
      for (const tab of suggested) {
        imageResults[tab] = await fetchImagesForTab(tab.toLowerCase(), finalQuery);
      }

      // Set preview image from first available image
      const previewImage = imageResults[suggested[0]]?.[0]?.urls?.thumb;
      if (previewImage) {
        setPreviewUrl(previewImage);
      }

      setImages(imageResults);
      setLocationData({
        name: finalQuery,
        continent,
        lat: lat || "Unknown",
        lon: lon || "Unknown",
        weather,
        language,
        summary: wikiData.extract || "No cultural summary found.",
      });

      setTrendingToday([trending]);
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
    <div className="min-h-screen pt-[100px] bg-[var(--bgColor)] open-sans-400 transition-all duration-300">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full px-4 py-2 bg-[var(--bgColor)] z-50">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-2 max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-[var(--grayColor)] px-4 py-2 rounded-md hover:bg-[var(--accentColor)] transition"
          >
            ←
          </button>

          <div className="flex-1 w-full">
            <SmartSearchInput
              onSearch={(incomingQuery) => {
                setQuery(incomingQuery);
                handleSearch({ preventDefault: () => {} }, incomingQuery);
              }}
              showRegionMap={false}
              onPreviewUpdate={(url) => setPreviewUrl(url)}
            />
          </div>
        </div>


      </div>

      {/* Location Info */}
      <div className="flex items-center max-w-6xl mx-auto justify-between">
        <LocationInfo locationData={locationData} trendingToday={trendingToday} />

        {/*  */}
                {previewUrl && (
          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--grayColor)] mb-2">📷 Preview:</p>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md mx-auto shadow-md"
            />
            {query && (
              <p className="text-sm text-[var(--grayColor)] mt-2">Detected: {query}</p>
            )}
          </div>
        )}
      </div>

      {/* Map or Image Slider */}
      {locationData && (
        <div className="max-w-6xl mx-auto px-4 mb-6">
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
        <div className="relative max-w-6xl mx-auto px-4 mb-6">
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
      <div className="max-w-6xl mx-auto px-4 mb-12 flex justify-start">
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
