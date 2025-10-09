import React from "react";
import { useNavigate } from "react-router-dom";

const InsightBlock = ({ typedResult, query, typingDone, distance }) => {
  const navigate = useNavigate();
  const isFallback = typedResult.startsWith("Sorry, I couldn't generate insight");

  const getTrimmedInsight = (text) => {
    const words = text.split(" ");
    if (words.length <= 100) return text;
    return words.slice(0, 100).join(" ") + "…";
  };

  return (
    <div className="mt-12 px-4 max-w-4xl mx-auto text-center">
      <h4 className="text-2xl font-semibold text-[var(--primaryColor)] capitalize mb-4">
        Cultural Overview: {query}
      </h4>
      <p className="text-[var(--textColor)] text-lg mb-4 whitespace-pre-line">
        {getTrimmedInsight(typedResult)}
      </p>
      {typingDone && !isFallback && (
        <button
          onClick={() => navigate(`/LocationSearch?q=${encodeURIComponent(query)}&auto=true`)}
          className="text-[var(--primaryColor)] underline hover:text-[var(--accentColor)] transition"
        >
          See more
        </button>
      )}
      {distance && (
        <p className="text-sm text-[var(--grayColor)] mt-2">
          Approximate distance from your location: {distance} km
        </p>
      )}
    </div>
  );
};

export default InsightBlock;
