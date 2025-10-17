import React, { useState } from "react";

const StepFour = ({ data, updateForm, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!data.travelStyle) {
      newErrors.travelStyle = "Please select a travel style.";
    }
    return newErrors;
  };

  const isValid = () => {
    return !!data.travelStyle;
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      nextStep();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Optional SVG */}
      <div className="flex justify-center">
        <img
          src="https://www.svgrepo.com/show/354378/travel-map.svg"
          alt="Travel Preferences"
          className="w-24 h-24 opacity-80"
        />
      </div>

      {/* Travel Style */}
      <div className="space-y-1">
        <label htmlFor="travelStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          What’s your preferred travel style? <span className="text-red-500">*</span>
        </label>
        <select
          id="travelStyle"
          name="travelStyle"
          value={data.travelStyle}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-md border ${
            errors.travelStyle ? "border-red-500" : "border-gray-300 dark:border-gray-600"
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] transition`}
        >
          <option value="">Select one</option>
          <option value="solo">Solo</option>
          <option value="group">Group</option>
          <option value="guided">Guided</option>
          <option value="immersive">Immersive</option>
        </select>
        {errors.travelStyle && <p className="text-sm text-red-500">{errors.travelStyle}</p>}
      </div>

      {/* Accessibility / Language Needs */}
      <div className="space-y-1">
        <label htmlFor="accessibility" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Any accessibility or language needs? <span className="text-gray-400">(optional)</span>
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
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="text-[var(--primaryColor)] underline font-medium"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!isValid()}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition ${
            isValid()
              ? "text-[var(--primaryColor)] border border-[var(--primaryColor)] hover:bg-[var(--primaryColor)] hover:text-white"
              : "text-gray-400 border border-gray-300 cursor-not-allowed"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default StepFour;
