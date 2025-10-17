import React from "react";

const StepFour = ({ data, updateForm, nextStep, prevStep }) => {
  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Optional SVG */}
      <div className="flex justify-center">
        <img
          src="https://www.svgrepo.com/show/354378/travel-map.svg"
          alt="Travel Preferences"
          className="w-24 h-24 opacity-80"
        />
      </div>

      {/* Travel Style */}
      <div>
        <label htmlFor="travelStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          What’s your preferred travel style?
        </label>
        <select
          id="travelStyle"
          name="travelStyle"
          value={data.travelStyle}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] transition"
        >
          <option value="">Select one</option>
          <option value="solo">Solo</option>
          <option value="group">Group</option>
          <option value="guided">Guided</option>
          <option value="immersive">Immersive</option>
        </select>
      </div>

      {/* Accessibility / Language Needs */}
      <div>
        <label htmlFor="accessibility" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Any accessibility or language needs?
        </label>
        <textarea
          id="accessibility"
          name="accessibility"
          value={data.accessibility}
          onChange={handleChange}
          placeholder="Let us know how we can support you..."
          rows={4}
          className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] transition resize-none"
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-300"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 rounded-md bg-[var(--accentColor)] text-white font-semibold hover:bg-yellow-600 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepFour;
