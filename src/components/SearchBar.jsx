import React from "react";

const SearchBar = ({ query, setQuery, handleSearch, isSubmitting, submitSuccess }) => {
  return (
    <form onSubmit={handleSearch} className="flex gap-2 max-w-6xl w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter location"
        className="w-full px-2 py-2 border border-[var(--lightGrayColor)] rounded-md focus:outline-none focus:ring-[var(--primaryColor)]"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-4 py-2 rounded-md min-w-[140px] transition-all duration-300 ${
          isSubmitting
            ? "bg-[var(--grayColor)] cursor-not-allowed"
            : submitSuccess
            ? "bg-[var(--successColor)]"
            : "bg-[var(--accentColor)] hover:bg-yellow-600"
        } text-white`}
      >
        {isSubmitting ? "Checking..." : submitSuccess ? "✓ Submitted" : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
