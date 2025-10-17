import React from "react";

const StepTwo = ({ data, updateForm, nextStep, prevStep }) => {
  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Optional SVG */}
      <div className="flex justify-center">
        <img
          src="https://www.svgrepo.com/show/354380/explore-location-map.svg"
          alt="Explore"
          className="w-24 h-24 opacity-80"
        />
      </div>

      {/* Role Selection */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          What best describes you?
        </label>
        <select
          id="role"
          name="role"
          value={data.role}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] transition"
        >
          <option value="">Select one</option>
          <option value="traveler">Traveler</option>
          <option value="tourist">Tourist</option>
          <option value="enthusiast">Culture Enthusiast</option>
          <option value="local">Local Host</option>
          <option value="researcher">Researcher</option>
        </select>
      </div>

      {/* Intent Textarea */}
      <div>
        <label htmlFor="intent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Why are you joining Turtura?
        </label>
        <textarea
          id="intent"
          name="intent"
          value={data.intent}
          onChange={handleChange}
          placeholder="Share your goals, dreams, or curiosity..."
          rows={4}
          required
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

export default StepTwo;
