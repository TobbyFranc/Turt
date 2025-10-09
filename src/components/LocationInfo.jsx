import React from "react";

const LocationInfo = ({ locationData }) => {
  if (!locationData) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-40 md:mt-28 mb-6 font-cormorant">
      <h2 className="text-3xl font-semibold text-[var(--primaryColor)] capitalize">
        {locationData.name}
      </h2>
      <p className="text-[var(--textColor)] flex items-center gap-2 "><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[var(--primaryColor)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
</svg>
 Continent: {locationData.continent}</p>
      <p className="text-[var(--textColor)] flex items-center gap-2 "><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[var(--primaryColor)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
</svg>
 Lat: {locationData.lat}, Lon: {locationData.lon}</p>
      <p className="text-[var(--textColor)] flex items-center gap-2 "><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[var(--primaryColor)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 014-4h1a4 4 0 018 0h1a4 4 0 010 8H7a4 4 0 01-4-4z" />
</svg>
 Weather: {locationData.weather}</p>
      <p className="text-[var(--textColor)] flex items-center gap-2 "><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[var(--primaryColor)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
</svg>
 Language: {locationData.language}</p>
    </div>
  );
};

export default LocationInfo;
