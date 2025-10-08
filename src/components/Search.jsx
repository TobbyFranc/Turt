import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import { useNavigate } from "react-router-dom";
import { useVoiceSearch } from "../hooks/useVoiceSearch";
import regionMap from './regionMap'


const Search = () => {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [rawResult, setRawResult] = useState("");
  const [typedResult, setTypedResult] = useState("");
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [mapCoords, setMapCoords] = useState({ lat: 7.9465, lng: -1.0232 });
  const [arcsData, setArcsData] = useState([]);
  const [viewMode, setViewMode] = useState(() => localStorage.getItem("viewMode") || "globe");
  const [autoRotate, setAutoRotate] = useState(true);
  const [isHoveringGlobe, setIsHoveringGlobe] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [globeError, setGlobeError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const globeRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.warn("Location access denied:", err.message)
    );
  }, []);

  useEffect(() => {
    let i = 0;
    setTypingDone(false);
    const interval = setInterval(() => {
      setTypedResult(rawResult.slice(0, i));
      i++;
      if (i > rawResult.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [rawResult]);

  useEffect(() => {
    if (!autoRotate || !globeRef.current) return;
    const interval = setInterval(() => {
      const currPOV = globeRef.current.pointOfView();
      globeRef.current.pointOfView({
        lat: currPOV.lat,
        lng: currPOV.lng + 0.2,
        altitude: currPOV.altitude,
      });
    }, 100);
    return () => clearInterval(interval);
  }, [autoRotate]);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.enableZoom = true;
        controls.enablePan = true;
        controls.enableRotate = true;
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.zoomSpeed = 0.5;
        controls.panSpeed = 0.5;
      }
    }
  }, [isHoveringGlobe]);

  const degToRad = (deg) => (deg * Math.PI) / 180;

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = degToRad(lat2 - lat1);
    const dLng = degToRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

const handleSearch = async () => {
  if (!query.trim()) return;
  setIsSubmitting(true);
  setSubmitSuccess(false);
  setPreviewUrl(null); // 👈 Clears preview on every search

  const normalizedQuery = query.trim().toLowerCase();
  const correctedRegion = regionMap[normalizedQuery];
  if (correctedRegion && correctedRegion !== region) {
    setRegion(correctedRegion);
  }

  try {
    const wikiRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    );
    const wikiData = await wikiRes.json();
    setRawResult(wikiData.extract || "No insights found.");

    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    );
    const geoData = await geoRes.json();

    if (geoData.length > 0) {
      const { lat, lon } = geoData[0];
      const target = { lat: parseFloat(lat), lng: parseFloat(lon) };
      setMapCoords(target);
      setAutoRotate(false);

      if (globeRef.current) {
        globeRef.current.pointOfView({ lat: target.lat, lng: target.lng, altitude: 1.5 }, 2000);
      }

      if (location?.lat && location?.lng) {
        const km = calculateDistance(location.lat, location.lng, target.lat, target.lng);
        setDistance(km.toFixed(2));
        setArcsData([
          {
            startLat: location.lat,
            startLng: location.lng,
            endLat: target.lat,
            endLng: target.lng,
            color: ["#f59e0b", "#1e3a8a"],
          },
        ]);
      }
    }

    await new Promise((r) => setTimeout(r, 1500));
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 2000);
  } catch {
    setRawResult("Unable to fetch insights at the moment.");
  } finally {
    setIsSubmitting(false);
  }
};


  const startVoiceRecognition = useVoiceSearch(setQuery, handleSearch);

const handlePhotoUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setPreviewUrl(URL.createObjectURL(file));
  setIsAnalyzing(true); // 👈 Start analyzing

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
    handleSearch();
  } catch (err) {
    console.error("Image recognition failed:", err);
    setRawResult("Sorry, we couldn't identify anything from the photo.");
  } finally {
    setIsAnalyzing(false); // 👈 Done analyzing
  }
};
useEffect(() => {
  if (typedResult && !["No insights found.", "Unable to fetch insights at the moment.",  "Sorry, we couldn't identify anything from the photo."].includes(typedResult)) {
    const recent = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    const updated = [query, ...recent.filter((q) => q !== query)].slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  }
}, [typedResult]);



  const handleClearSearch = () => {
    setQuery("");
    setRegion("");
    setRawResult("");
    setTypedResult("");
    setDistance(null);
    setArcsData([]);
    setMapCoords({ lat: 7.9465, lng: -1.0232 });
    setAutoRotate(true);
    setPreviewUrl(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleViewToggle = () => {
    const newMode = viewMode === "globe" ? "map" : "globe";
    setViewMode(newMode);
    localStorage.setItem("viewMode", newMode);
  };

  const globePoints = [
    location?.lat && location?.lng && { lat: location.lat, lng: location.lng, label: "You" },
    mapCoords?.lat && mapCoords?.lng && { lat: mapCoords.lat, lng: mapCoords.lng, label: query || "Target" },
  ].filter(Boolean);

  return (
    <section className="py-12 my-6 text-[var(--grayColor)] open-sans-400">
      <div className="text-center space-y-4 mb-12 rounded-md py-2 text-[var(--textColor)]">
        <h3 className="text-2xl font-bold capitalize">Search for Cultural Insights</h3>
        <p className="inter-200">Type in a country or culture to get instant insights and tips from Turtura.</p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 px-4 max-w-4xl mx-auto">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter a country or culture..."
            className="w-full p-4 pr-20 border border-[var(--lightGrayColor)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]"
          />
          <div className="absolute top-1/2 right-4 flex gap-2 -translate-y-1/2 border-l pl-2 border-[var(--lightGrayColor)]">
            <button onClick={startVoiceRecognition} className="hover:scale-110 transition">
              {/* 🎤 Voice SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="w-5 h-5 text-[var(--grayColor)] hover:text-[var(--primaryColor)]">
                <path d="M12 1v11" />
                <path d="M8 5a4 4 0 0 1 8 0v6a4 4 0 0 1-8 0z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>

            <label htmlFor="photoInput" className="cursor-pointer hover:scale-110 hover: transition">
              {/* 📷 Photo SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="w-5 h-5 text-[var(--grayColor)] hover:text-[var(--primaryColor)]">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z" />
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
        </div>

        {/* Region Dropdown */}
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full md:w-1/4 p-4 border border-[var(--lightGrayColor)] rounded-md focus:outline-none"
        >
          <option value="">Select Region</option>
          <option value="all">All Regions</option>
          <option value="middle-east">Middle East</option>
          <option value="south-asia">South Asia</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="oceania">Oceania</option>
        </select>

        {/* Search Button */}
        <button
          disabled={isSubmitting}
          onClick={handleSearch}
          className={`min-w-[140px] px-6 py-4 rounded-md transition duration-300 ${
            isSubmitting
              ? "bg-gray-400 text-white"
              : submitSuccess
              ? "bg-green-600 text-white"
              : "bg-[var(--accentColor)] text-white hover:bg-[var(--primaryColor)]"
          }`}
        >
          {isSubmitting ? "Loading..." : submitSuccess ? "✔ Completed" : "Search"}
        </button>
      </div>

      {/* Image Preview */}
{previewUrl && (
  <div className="mt-6 text-center">
    <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-md mx-auto" />
    {isAnalyzing && (
      <p className="text-sm text-[var(--grayColor)] mt-2">Analyzing image...</p>
    )}
  </div>
)}


      {/* Cultural Insights */}
      {typedResult && (
        <div className="mt-12 px-4 max-w-4xl mx-auto text-center">
          <h4 className="text-2xl font-semibold text-[var(--primaryColor)] capitalize cormorant-garamond-200 mb-4">
            Cultural Overview: {query}
          </h4>
          <p className="text-[var(--textColor)] text-lg mb-4 whitespace-pre-line">{typedResult}</p>
          {distance && (
            <p className="text-sm text-[var(--grayColor)]">
              Approximate distance from your location: {distance} km
            </p>
          )}
{typingDone &&
  typedResult &&
  !["No insights found.", "Unable to fetch insights at the moment.", "Sorry, we couldn't identify anything from the photo."].includes(typedResult.trim()) && (
    <button
      onClick={() => navigate("/LocationSearch", { state: { query } })}
      className="mt-4 px-4 py-2 bg-[var(--accentColor)] text-white rounded-md hover:bg-[var(--primaryColor)]"
    >
      ...see more
    </button>
)}

        </div>
      )}

      {/* View Toggle and Clear */}
      <div className="text-center mt-8 flex gap-2 items-center justify-center">
        <button
          onClick={handleViewToggle}
          className="hover:bg-[var(--primaryColor)] border-2 border-[var(--primaryColor)] text-[var(--textColor)] hover:text-[var(--whiteColor)] transition duration-300 px-6 py-2 rounded-md"
        >
          Switch to {viewMode === "globe" ? "Google Map" : "Globe View"}
        </button>
        <button
          onClick={handleClearSearch}
          className="bg-[var(--accentColor)] border-2 hover:bg-[var(--primaryColor)] text-[var(--textColor)] hover:text-[var(--whiteColor)] transition duration-300 px-6 py-2 rounded-md"
        >
          Clear Search
        </button>
        
      </div>

      {/* Map or Globe View */}
      <div className="mt-8 px-4">
        {viewMode === "map" ? (
          <div className="w-full h-[400px] rounded-lg overflow-hidden">
            <iframe
              title="Google Map"
              src={`https://maps.google.com/maps?q=${mapCoords.lat},${mapCoords.lng}&z=4&output=embed`}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        ) : globeError ? (
          <div className="w-full h-[400px] flex justify-center items-center">
            <p className="text-[var(--grayColor)]">Unable to load globe view.</p>
          </div>
        ) : (
          <div
            style={{ cursor: isHoveringGlobe ? "grab" : "default" }}
            className="w-auto h-[500px] flex mx-auto rounded-lg items-center justify-center overflow-hidden hover:bg-[var(--blackColor)] transition duration-500"
            onMouseEnter={() => setIsHoveringGlobe(true)}
            onMouseLeave={() => setIsHoveringGlobe(false)}
            onTouchStart={() => setIsHoveringGlobe(true)}
            onTouchEnd={() => setIsHoveringGlobe(false)}
          >
            <Globe
              ref={globeRef}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              backgroundColor="rgba(255,255,255,0)"
              onGlobeReady={() => setGlobeError(false)}
              onGlobeError={() => setGlobeError(true)}
              pointsData={globePoints}
              pointLat={(d) => d.lat}
              pointLng={(d) => d.lng}
              pointLabel={(d) => d.label}
              pointColor={() => "#ff5722"}
              pointAltitude={0.02}
              arcsData={arcsData}
              arcStartLat={(d) => d.startLat}
              arcStartLng={(d) => d.startLng}
              arcEndLat={(d) => d.endLat}
              arcEndLng={(d) => d.endLng}
              arcColor={(d) => d.color}
              arcDashLength={0.5}
              arcDashGap={4}
              arcDashInitialGap={() => Math.random() * 5}
              arcDashAnimateTime={1000}
              width={window.innerWidth * 0.9}
              height={500}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;

