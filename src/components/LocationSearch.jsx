import React, { useState, useEffect, lazy, Suspense } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SmartSearchInput from "./SmartSearchInput";
import LocationInfo from "./LocationInfo";
import regionMap from "./regionMap";
import Skeleton from "./Skeleton";
import {
  generateContentMap,
  defaultTabs,
  extraTabs
} from "../utils/contentMap";
import { getTurturaTip } from "../utils/turturaTip";
import globalCulture from "../assets/global-culture.jpg";
import market from "../assets/market.jpg";
import fashion from "../assets/fashion.jpg";
import afrofashion from "../assets/afrofashion.jpg";
import afrowedding from "../assets/afrowedding.jpg";
import indianwedding from "../assets/indianwedding.jpg";
import marriage from "../assets/marriage.jpg";
import cuisine from "../assets/cuisine.jpg";

const TabContent = lazy(() => import("./TabContent"));
const ImageSlider = lazy(() => import("./ImageSlider"));
const FilterModal = lazy(() => import("./FilterModal"));

const fallbackImagesMap = {
  Fashion: [fashion, afrofashion],
  Cuisine: [cuisine],
  Greetings: [market],
  Taboos: [globalCulture],
  Marriage: [afrowedding, indianwedding, marriage],
  Festival: [globalCulture],
  Music: [globalCulture],
  Dance: [globalCulture],
  Spirituality: [globalCulture],
  Architecture: [globalCulture],
  Art: [globalCulture],
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
  const [locationData, setLocationData] = useState(null);
  const [images, setImages] = useState({});
  const [activeTab, setActiveTab] = useState("Description");
  const [availableTabs, setAvailableTabs] = useState(defaultTabs);
  const [showFilter, setShowFilter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(autoSearch);
  const [trendingToday, setTrendingToday] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [savedGallery, setSavedGallery] = useState([]);
  const [contentMap, setContentMap] = useState({});
  const [turturaTip, setTurturaTip] = useState("");

  const hasValidLocation = locationData &&
    locationData.lat !== "Unknown" &&
    locationData.lon !== "Unknown" &&
    locationData.lat !== "0" &&
    locationData.lon !== "0";

  useEffect(() => {
    const savedTabs = localStorage.getItem("turtura_tab_filters");
    if (savedTabs) {
      setAvailableTabs(JSON.parse(savedTabs));
    }
  }, []);

  useEffect(() => {
    if (passedQuery && autoSearch) {
      setQuery(passedQuery);
      handleSearch({ preventDefault: () => {} }, passedQuery);
    }
  }, [passedQuery, autoSearch]);

  const fetchImagesForTab = async (topic, baseQuery) => {
    try {
      const query = `${baseQuery} ${topic}`;
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
      );
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error("Unsplash fetch error:", err);
      return [];
    }
  };

  const handleSearch = async (e, overrideQuery = null) => {
    e.preventDefault();
    const finalQuery = overrideQuery || query;
    if (!finalQuery.trim()) return;

    setIsSubmitting(true);
    setIsLoading(true);

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

      const tip = await getTurturaTip(finalQuery);
      setTurturaTip(tip);

      const suggested = suggestTabs(finalQuery);
      const allTabs = [...new Set([...suggested, ...extraTabs])];

      const imageResults = {};
      for (const tab of allTabs) {
        imageResults[tab] = await fetchImagesForTab(tab.toLowerCase(), finalQuery);
      }

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
      setAvailableTabs(suggested);

      const map = await generateContentMap(finalQuery, wikiData.extract);
      setContentMap(map);
      setActiveTab("Description");
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
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
        {previewUrl && (
          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--grayColor)] mb-2">📷 Preview:</p>
            <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-md mx-auto shadow-md" />
            {query && <p className="text-sm text-[var(--grayColor)] mt-2">Detected: {query}</p>}
          </div>
        )}
      </div>

      {/* Turtura Tip */}
      {hasValidLocation && turturaTip && (
        <div className="max-w-6xl mx-auto px-4 mt-2 mb-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-md shadow-sm">
            <strong className="block font-semibold">💡 Turtura Tip:</strong>
                        <span className="block mt-1 text-sm">{turturaTip}</span>
          </div>
        </div>
      )}

      {/* Image Slider or Fallback */}
      <div className="max-w-6xl mx-auto px-4 mb-6">
        {isLoading ? (
          <Skeleton height="200px" />
        ) : hasValidLocation ? (
          <Suspense fallback={<Skeleton height="200px" />}>
            <ImageSlider
              activeTab={activeTab}
              images={images}
              fallbackImagesMap={fallbackImagesMap}
              locationData={locationData}
              savedGallery={savedGallery}
              setSavedGallery={setSavedGallery}
            />
          </Suspense>
        ) : (
          <div className="w-full h-64 flex flex-col items-center justify-center bg-gray-100 rounded-md text-[var(--grayColor)] text-sm">
            🗺️ No insight found for <strong>{query}</strong>
            <div className="mt-2 text-xs text-center">
              Try exploring:
              <ul className="list-disc mt-1 ml-4 text-left text-sm text-[var(--grayColor)]">
                <li>Try a broader cultural region (e.g. “Māori” → “Polynesia”, “Berber” → “North Africa”)</li>
                <li>Explore related traditions or practices (e.g. “Tea ceremony” → “Japanese rituals”, “Henna” → “Wedding customs”)</li>
                <li>Search by theme (e.g. “Traditional weddings”, “Spiritual dances”, “Cultural festivals”)</li>
                <li>Use a more general term (e.g. “Igbo” → “Nigeria”, “Andean rituals” → “South American culture”)</li>
                <li>Try a cultural keyword like “fashion”, “music”, “architecture”, or “spirituality”</li>
              </ul>
              <button
                onClick={() => handleSearch({ preventDefault: () => {} }, query)}
                className="mt-4 bg-[var(--accentColor)] text-white px-4 py-2 rounded-md hover:bg-[var(--primaryColor)] transition"
              >
                🔄 Retry Search
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tabs and Content */}
      {hasValidLocation && locationData && (
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

          {showFilter && (
            <Suspense fallback={<Skeleton height="300px" />}>
              <FilterModal
                availableTabs={availableTabs}
                setAvailableTabs={setAvailableTabs}
                setShowFilter={setShowFilter}
              />
            </Suspense>
          )}

          <Suspense fallback={<Skeleton height="100px" />}>
            <TabContent activeTab={activeTab} contentMap={contentMap} />
          </Suspense>
        </div>
      )}

      {/* Saved Gallery */}
      {savedGallery.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <h4 className="text-lg font-semibold text-[var(--primaryColor)] mb-2">Your Saved Gallery</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {savedGallery.map((url, i) => (
              <img key={i} src={url} alt={`Saved-${i}`} className="w-full h-40 object-cover rounded-md shadow" />
            ))}
          </div>
        </div>
      )}

      {/* Community Link */}
      <div className="max-w-6xl mx-auto px-4 mb-12 flex justify-start">
        <button
          disabled={!hasValidLocation}
          onClick={() => hasValidLocation && navigate("/CommunityChatroom")}
          className={`px-4 py-2 flex items-center rounded-md transition-all duration-300 ${
            hasValidLocation
              ? "bg-[var(--accentColor)] text-white hover:bg-[var(--primaryColor)]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Join Community
          <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.84L3 20l1.4-3.6A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LocationSearch;
