import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import globalCulture from "../assets/global-culture.jpg";
import Nav from './Nav';
import market from '../assets/market.jpg'
import fashion from '../assets/fashion.jpg'
import afrofashion from '../assets/afrofashion.jpg'
import afrowedding from '../assets/afrowedding.jpg'
import indianwedding from '../assets/indianwedding.jpg'
import marriage from '../assets/marriage.jpg'
import cuisine from '../assets/cuisine.jpg'

const LocationSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const passedQuery = location.state?.query || "";
  const [query, setQuery] = useState(passedQuery);
  const [locationData, setLocationData] = useState(location.state?.locationData || null);
  const [images, setImages] = useState(location.state?.images || {});
  const [activeTab, setActiveTab] = useState("Description");
  const [showTura, setShowTura] = useState(false);
  const [turaQuestion, setTuraQuestion] = useState("");

  const tabs = ["Description", "Fashion", "Cuisine", "Greetings", "Taboos", "Marriage", "Festival"];
const fallbackImagesMap = {
  Fashion: [fashion, afrofashion],
  Cuisine: [cuisine],
  Greetings: [market],
  Taboos: [globalCulture],
  Marriage: [afrowedding, indianwedding, marriage],
  Festival: [globalCulture],
};


  useEffect(() => {
    if (passedQuery && !locationData) {
      handleSearch({ preventDefault: () => {} });
    }
  }, [passedQuery]);

  const getContinent = (code) => ({ NG: "Africa", US: "North America", FR: "Europe" }[code] || "Unknown");
  const getLanguage = (code) => ({ NG: "English", FR: "French", JP: "Japanese" }[code] || "Unknown");
  const getWeather = async () => "Partly Cloudy";

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
    if (!query) return;
    setActiveTab("Description");

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

      const imageResults = {};
      for (const tab of tabs) {
        if (tab !== "Description") {
          imageResults[tab] = await fetchImagesForTab(tab.toLowerCase());
        }
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
    } catch (error) {
      console.error("Search error:", error);
      setLocationData({
        name: query,
        continent: "Unknown",
        lat: "Unknown",
        lon: "Unknown",
        weather: "Unknown",
        language: "Unknown",
        summary: "Unable to fetch cultural summary.",
      });
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
      {/* <Nav /> */}
      <div className="hidden">
        < Nav />
      </div>

      {/* Search Bar */}
      <div className=" p-8 mt-24 flex items-center justify-center gap-4 ">
        <button onClick={() => navigate(-1)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">←</button>
        <form onSubmit={handleSearch} className="flex space-x-4 max-w-6xl w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter location"
            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primaryColor)]"
          />
          <button type="submit" className="bg-[var(--accentColor)] text-white px-4 py-2 rounded-md hover:bg-yellow-600">Search</button>
        </form>
      </div>

      {/* Location Info */}
      {locationData && (
        <div className="max-w-6xl mx-auto px-4 mb-6 font-cormorant">
          <h2 className="text-3xl font-semibold text-[var(--primaryColor)] capitalize">{locationData.name}</h2>
          <p className="text-[var(--textColor)]">🌍 Continent: {locationData.continent}</p>
          <p className="text-[var(--textColor)]">📍 Lat: {locationData.lat}, Lon: {locationData.lon}</p>
          <p className="text-[var(--textColor)]">🌦️ Weather: {locationData.weather}</p>
          <p className="text-[var(--textColor)]">🗣️ Language: {locationData.language}</p>
        </div>
      )}

      {/* Image Section */}
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
<Swiper
  key={activeTab}
  modules={[Navigation, Pagination]}
  spaceBetween={10}
  slidesPerView={1}
  navigation
  pagination={{ clickable: true }}
>
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
                    ? "text-[var(--primaryColor)] border-[var(--primaryColor)] "
                    : "text-[var(--grayColor)] hover:text-[var(--accentColor)] hover:border-b-[var(--accentColor)]"
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>
          <div className="mt-4 text-[var(--textColor)] text-justify">{contentMap[activeTab]}</div>
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


      {/* Join Community Button */}
      <div className="max-w-5xl mx-auto px-4 mb-6 flex justify-start pointer-events-none">
        <a
          href="/CommunityChatroom"
          className="bg-[var(--accentColor)] text-white px-4 py-2 rounded-md hover:bg-[var(--primaryColor)]"
        >
          Join Community 💬
        </a>
      </div>

      {/* Tura AI Sidebar */}
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
    {/* </div> */}
    </div>
  );
};

export default LocationSearch;
