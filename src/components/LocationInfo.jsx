import React from "react";

const LocationInfo = ({ locationData }) => {
  if (!locationData) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-40 md:mt-28 mb-6 font-cormorant">
      <h2 className="text-3xl font-semibold text-[var(--primaryColor)] capitalize">
        {locationData.name}
      </h2>
      <p className="text-[var(--textColor)]">🌍 Continent: {locationData.continent}</p>
      <p className="text-[var(--textColor)]">📍 Lat: {locationData.lat}, Lon: {locationData.lon}</p>
      <p className="text-[var(--textColor)]">🌦️ Weather: {locationData.weather}</p>
      <p className="text-[var(--textColor)]">🗣️ Language: {locationData.language}</p>
    </div>
  );
};

export default LocationInfo;
