import React from "react";
import Globe from "react-globe.gl";

const GlobeView = ({
  location,
  mapCoords,
  arcsData,
  globeRef,
  setGlobeError,
  setIsHoveringGlobe,
}) => {
  return (
    <div
      style={{ cursor: "grab" }}
      className="w-full h-[500px] flex mx-auto rounded-lg items-center justify-center overflow-hidden transition duration-500"
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
        pointsData={[
          location?.lat && location?.lng && {
            lat: location.lat,
            lng: location.lng,
            label: "You",
          },
          mapCoords?.lat && mapCoords?.lng && {
            lat: mapCoords.lat,
            lng: mapCoords.lng,
            label: "Target",
          },
        ].filter(Boolean)}
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
  );
};

export default GlobeView;
