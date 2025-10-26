import React, { useState, useEffect } from "react";
import { useVoiceSearch } from "../hooks/useVoiceSearch";
import regionMap from "./regionMap";

const regionOptions = [
  "Anywhere",
  "africa",
  "asia",
  "europe",
  "americas",
  "middle-east",
  "oceania",
];

const SmartSearchInput = ({ onSearch, showRegionMap = false, onPreviewUpdate }) => {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("Anywhere");
  const [regionLocked, setRegionLocked] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [pendingAutoSearch, setPendingAutoSearch] = useState(false);
  const [statusPhase, setStatusPhase] = useState("idle"); // idle | loading | done

  const startVoiceRecognition = useVoiceSearch((result) => {
    setQuery(result);
    setRegionLocked(false);
    setIsListening(false);
    setPendingAutoSearch(true);
  });

  useEffect(() => {
    if (isListening) {
      const timeout = setTimeout(() => setIsListening(false), 10000);
      return () => clearTimeout(timeout);
    }
  }, [isListening]);

  const detectRegionFromQuery = (query) => {
    const normalizedQuery = query.toLowerCase();
    const match = Object.keys(regionMap).find((key) =>
      normalizedQuery.includes(key.toLowerCase())
    );
    const detected = match ? regionMap[match] : "Anywhere";
    return regionOptions.includes(detected.toLowerCase()) ? detected : "Anywhere";
  };

  useEffect(() => {
    if (query.trim()) {
      onPreviewUpdate?.(null);
      if (!regionLocked) {
        const detectedRegion = detectRegionFromQuery(query);
        if (detectedRegion !== region) {
          setRegion(detectedRegion);
        }
      }
    }
  }, [query, regionLocked]);

  useEffect(() => {
    if (pendingAutoSearch && query.trim()) {
      setCountdown(3);
      let timer = 3;
      const interval = setInterval(() => {
        timer -= 1;
        setCountdown(timer);
        if (timer === 0) {
          clearInterval(interval);
          setCountdown(null);
          setPendingAutoSearch(false);
          triggerSearch();
        }
      }, 1000);
    }
  }, [query, pendingAutoSearch]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onPreviewUpdate?.(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("providers", "google");
    formData.append("file", file);

    try {
      const response = await fetch("https://api.edenai.run/v2/vision/image/label_detection", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_EDENAI_API_KEY}`,
        },
        body: formData,
      });

      const result = await response.json();
      const label = result.google?.items?.[0]?.label || "";

      if (!label) {
        setQuery("");
        onSearch?.("Image insight unavailable");
        return;
      }

      setQuery(label);
      setRegionLocked(false);
      setCountdown(null);
      setPendingAutoSearch(false);
      triggerSearch();
    } catch {
      console.error("Photo recognition failed.");
      setQuery("");
      onSearch?.("Image insight unavailable");
    }
  };

  const triggerSearch = () => {
    if (!query.trim()) return;
    setStatusPhase("loading");
    onSearch?.(query);
    setTimeout(() => {
      setStatusPhase("done");
      setTimeout(() => setStatusPhase("idle"), 1500);
    }, 1500);
  };

  return (
    <div className="w-full p-4 rounded-md">
      <div className="relative flex flex-col md:flex-row md:items-center gap-2">
        <div className="relative w-full md:flex-1">
          <div className="flex items-stretch h-[50px] border border-[var(--grayColor)] rounded-md overflow-hidden bg-transparent">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setRegionLocked(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && triggerSearch()}
              placeholder="Search culture, country, or tradition..."
              className="flex-1 px-4 py-3 h-full min-w-0 focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]"
            />
            <div className="flex items-center gap-2 px-2 border-l border-gray-200 bg-white h-full">
              <button
                onClick={() => {
                  setIsListening(true);
                  startVoiceRecognition();
                }}
                title="Voice Search"
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v11m-4-6a4 4 0 118 0v6a4 4 0 11-8 0zM19 10v2a7 7 0 01-14 0v-2m7 9v3m-4 0h8" />
                </svg>
              </button>

              <label htmlFor="photoInput" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer" title="Upload Photo">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h3l2-3h8l2 3h3a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </label>
              <input type="file" accept="image/*" capture="environment" onChange={handlePhotoUpload} className="hidden" id="photoInput" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          {showRegionMap && (
            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setRegionLocked(true);
              }}
              className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] bg-white w-full md:w-auto"
            >
              {regionOptions.map((r) => (
                <option key={r} value={r}>
                  {r === "Anywhere"
                    ? "Select Region"
                    : r.charAt(0).toUpperCase() + r.slice(1).replace("-", " ")}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={triggerSearch}
            disabled={statusPhase === "loading"}
            className={`w-full md:min-w-[150px] px-6 py-3 rounded-md transition duration-500 ease-in-out flex items-center justify-center gap-2 ${
              statusPhase === "done"
                ? "bg-green-600 text-white"
                : statusPhase === "loading"
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[var(--accentColor)] hover:bg-[var(--primaryColor)] text-white"
            } transition-colors`}
          >
            {statusPhase === "done" ? (
              <>
                <span>Completed</span>
                <span className="text-white">✓</span>
              </>
            ) : statusPhase === "loading" ? (
              <>
                <span>Loading...</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6" />
                </svg>
              </>
            ) : (
              <>
                <span>Search</span>
              </>
            )}
          </button>
        </div>

        {/* Status Indicators */}
        <div className="h-6 mb-2 text-center text-sm absolute -top-6 -left-2 w-full">
          <span
            className={`transition-opacity duration-500 ease-in-out ${
              isListening ? "opacity-100 text-blue-600 animate-pulse" : "opacity-0"
            }`}
          >
            🎙️ Listening... Speak now
          </span>
          <span
            className={`transition-opacity duration-500 ease-in-out ${
              !isListening && countdown !== null
                ? "opacity-100 text-[var(--accentColor)] animate-pulse"
                : "opacity-0"
            }`}
          >
            ⏳ Searching in {countdown}...
          </span>
        </div>
      </div>
    </div>
  );
};

export default SmartSearchInput;
