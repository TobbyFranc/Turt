import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SmartSearchInput from "./SmartSearchInput";
import GlobeView from "./GlobeView";
import MapView from "./MapView";
import InsightBlock from "./InsightBlock";

const Search = () => {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("Anywhere");
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
  const [previewUrl, setPreviewUrl] = useState(null);

  const globeRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setLocation(null)
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

  const handleSearch = async (searchQuery, searchRegion) => {
    if (!searchQuery.trim()) return;

    setQuery(searchQuery);
    setRegion(searchRegion);
    setRawResult("");
    setTypedResult("");
    setTypingDone(false);

    let wikiExtract = "";

    try {
      const wikiRes = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchQuery)}`
      );
      const wikiData = await wikiRes.json();
      wikiExtract = wikiData.extract?.trim() || "";
    } catch {
      wikiExtract = "";
    }

    const fallbackMessage = `Sorry, I couldn't generate insight for this input: ${searchQuery}`;
    setRawResult(wikiExtract || fallbackMessage);

    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
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
    } catch {
      console.error("Geo lookup failed.");
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    setRegion("Anywhere");
    setRawResult("");
    setTypedResult("");
    setDistance(null);
    setArcsData([]);
    setMapCoords({ lat: 7.9465, lng: -1.0232 });
    setAutoRotate(true);
    setPreviewUrl(null);
    setTypingDone(false);
  };

  const handleViewToggle = () => {
    const newMode = viewMode === "globe" ? "map" : "globe";
    setViewMode(newMode);
    localStorage.setItem("viewMode", newMode);
  };

  return (
    <section className="py-12 my-6 text-[var(--grayColor)] open-sans-400">
      <div className="text-center space-y-4 mb-12 text-[var(--textColor)]">
        <h3 className="text-2xl font-bold capitalize">Search for Cultural Insights</h3>
        <p className="inter-200">
          Type in a country or culture or upload an image to get instant insights from Turtura.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <SmartSearchInput
          onSearch={handleSearch}
          showRegionMap={true}
          onPreviewUpdate={(url) => setPreviewUrl(url)}
        />
      </div>

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

      {typedResult && (
        <InsightBlock
          typedResult={typedResult}
          query={query}
          typingDone={typingDone}
          distance={distance}
        />
      )}

      <div className="text-center mt-8 flex gap-2 items-center justify-center">
        <button
          onClick={handleViewToggle}
          className="hover:bg-[var(--primaryColor)] border-2 border-[var(--primaryColor)] text-[var(--textColor)] hover:text-white transition duration-300 px-6 py-2 rounded-md"
        >
          Switch to {viewMode === "globe" ? "Google Map" : "Globe View"}
        </button>
        <button
          onClick={handleClearSearch}
          className="bg-[var(--accentColor)] border-2 hover:bg-[var(--primaryColor)] text-white transition duration-300 px-6 py-2 rounded-md"
        >
          Clear Search
        </button>
      </div>

      <div className="mt-8 px-4">
        {viewMode === "map" ? (
          <MapView mapCoords={mapCoords} />
        ) : (
          <GlobeView
            location={location}
            mapCoords={mapCoords}
            arcsData={arcsData}
            globeRef={globeRef}
            setGlobeError={setGlobeError}
            setIsHoveringGlobe={setIsHoveringGlobe}
          />
        )}
      </div>
    </section>
  );
};

export default Search;
