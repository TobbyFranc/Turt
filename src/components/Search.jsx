import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import { useNavigate } from "react-router-dom";

const regionMap = {
ghana: "africa",
  nigeria: "africa",
  china: "asia",
  japan: "asia",
  india: "south-asia",
  france: "europe",
  england: "europe",
  germany: "europe",
  usa: "americas",
  canada: "americas",
  australia: "oceania",
  "saudi arabia": "middle-east",
  egypt: "africa",
  kenya: "africa",
  brazil: "americas",
  mexico: "americas",
  italy: "europe",
  spain: "europe",
  russia: "europe",
  "united kingdom": "europe",
  "south africa": "africa",
  argentina: "americas",
  chile: "americas",
  peru: "americas",
  colombia: "americas",
  indonesia: "asia",
  thailand: "asia",
  vietnam: "asia",
  malaysia: "asia",
  singapore: "asia",
  philippines: "asia",
  turkey: "middle-east",
  iran: "middle-east",
  iraq: "middle-east",
  malawi: "africa",
  yoruba: "africa",
  igbo: "africa",
  hausa: "africa",
  efik: "africa",
  viking: "europe",
  norsemen: "europe",
  


};


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
  const globeRef = useRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => console.warn("Location access denied:", err.message)
    );
  }, []);

  useEffect(() => {
    let i = 0;
    setTypingDone(false);
    const interval = setInterval(() => {
      setTypedResult(rawResult.slice(0, i));
      i++;
      if (i > rawResult.length){ clearInterval(interval); setTypingDone(true);}
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

    const navigate = useNavigate();

  const degToRad = (deg) => (deg * Math.PI) / 180;

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = degToRad(lat2 - lat1);
    const dLng = degToRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSearch = async () => {
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
    } catch {
      setRawResult("Unable to fetch insights at the moment.");
    }
  };

  const handleClearSearch = () => {
  setQuery("");
  setRegion("");
  setRawResult("");
  setTypedResult("");
  setDistance(null);
  setArcsData([]);
  setMapCoords({ lat: 7.9465, lng: -1.0232 });
  setAutoRotate(true);
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
      {/*  */}
      {/* Static Heading */}
      <div className=" text-center space-y-4 mb-12 rounded-md py-2 text-[var(--textColor)]">
        <h3 className="text-2xl font-bold  capitalize">Search for Cultural Insights</h3>
        <p className=" inter-200 ">Type in a country or culture to get instant insights and tips from Turtura.</p>
      </div>


      {/*  */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 px-4 max-w-4xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter a country or culture..."
          className="w-full md:w-1/2 p-4 border border-[var(--lightGrayColor)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]"
        />
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
        <button
          onClick={handleSearch}
          className="bg-[var(--accentColor)] w-[140px] text-[var(--whiteColor)] px-6 py-4 rounded-md hover:bg-[var(--primaryColor)] transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>

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
  {typingDone && (
  <button className="text-[var(--accentColor)] hover:text-[var(--primaryColor)]" onClick={() => navigate("/LocationSearch", { state: { query } })}>
    ...see more
  </button>
)}



        </div>
      )}

      <div className="text-center mt-8 flex gap-2 items-center justify-center">
        <button
          onClick={handleViewToggle}
          className="hover:bg-[var(--primaryColor)] border-2 border-[var(--primaryColor)] text-[var(--textColor)] hover:text-[var(--whiteColor)] transition duration-300 px-6 py-2 rounded-md"
        >
          Switch to {viewMode === "globe" ? "Google Map" : "Globe View"}
        </button>

        {/* clear search and cultural hx btn */}
<button
  onClick={handleClearSearch}
  className="bg-[var(--accentColor)] border-2 hover:bg-[var(--primaryColor)] text-[var(--textColor)] hover:text-[var(--whiteColor)] transition duration-300 px-6 py-2 rounded-md"
>
  Clear Search
</button>



      </div>

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
            <img src={sphere} alt="Fallback Globe" className="w-64 h-64 object-contain" />
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
