import React from "react";

const Skeleton = ({ height = "20px", width = "100%", className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 rounded ${className}`}
      style={{ height, width }}
    />
  );
};

export default Skeleton;
