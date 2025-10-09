import React from "react";

const MapView = ({ mapCoords }) => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <iframe
        title="Google Map"
        src={`https://maps.google.com/maps?q=${mapCoords.lat},${mapCoords.lng}&z=4&output=embed`}
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default MapView;
