import React, { useState } from "react";

const StepThree = ({ data, updateForm, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});
  const [customCulture, setCustomCulture] = useState("");
  const [customExperience, setCustomExperience] = useState("");

  const predefinedCultures = [
    "West Africa", "East Asia", "Middle East", "South America",
    "Europe", "Indigenous Cultures", "South Asia", "Southeast Asia",
    "North Africa", "Oceania", "Caribbean", "Central Asia"
  ];

  const predefinedExperiences = [
    "Food", "History", "Language", "Rituals", "Art", "Spirituality"
  ];

  const handleCheckbox = (e, field) => {
    const value = e.target.value;
    const checked = e.target.checked;
    const current = data[field] || [];

    const updated = checked
      ? [...current, value]
      : current.filter((item) => item !== value);

    updateForm({ [field]: updated });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleAddCustom = (field, value, setValue) => {
    const trimmed = value.trim();
    if (trimmed && !data[field]?.includes(trimmed)) {
      updateForm({ [field]: [...(data[field] || []), trimmed] });
      setValue("");
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const removeSelected = (field, item) => {
    const updated = data[field]?.filter((i) => i !== item);
    updateForm({ [field]: updated });
  };

  const validate = () => {
    const newErrors = {};
    if (!data.cultures || data.cultures.length === 0) {
      newErrors.cultures = "Please select or add at least one culture or region.";
    }
    if (!data.experiences || data.experiences.length === 0) {
      newErrors.experiences = "Please select or add at least one experience.";
    }
    return newErrors;
  };

  const isValid = () => {
    return data.cultures?.length > 0 && data.experiences?.length > 0;
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
          src="https://www.svgrepo.com/show/354379/culture.svg"
          alt="Culture"
          className="w-24 h-24 opacity-80"
        />
      </div>

      {/* Cultures or Regions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Which cultures or regions are you most drawn to? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
          {predefinedCultures.map((region) => (
            <label key={region} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={region}
                checked={data.cultures?.includes(region)}
                onChange={(e) => handleCheckbox(e, "cultures")}
                className="accent-[var(--primaryColor)]"
              />
              {region}
            </label>
          ))}
        </div>

        {/* Custom Culture Input */}
        <div className="mt-4 flex gap-2 items-center">
          <input
            type="text"
            value={customCulture}
            onChange={(e) => setCustomCulture(e.target.value)}
            placeholder="Add your own (e.g. Nordic, Afro-Caribbean)"
            className="flex-1 border-0 border-b border-gray-400 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-[var(--primaryColor)]"
          />
          <button
            type="button"
            onClick={() => handleAddCustom("cultures", customCulture, setCustomCulture)}
            className="px-4 py-2 text-sm rounded-md border border-[var(--primaryColor)] text-[var(--primaryColor)] hover:bg-[var(--primaryColor)] hover:text-white transition"
          >
            Add
          </button>
        </div>

        {/* Selected Cultures Preview */}
        {data.cultures?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {data.cultures.map((culture) => (
              <span
                key={culture}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs"
              >
                {culture}
                <button
                  type="button"
                  onClick={() => removeSelected("cultures", culture)}
                  className="text-gray-500 hover:text-red-500"
                  aria-label={`Remove ${culture}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {errors.cultures && <p className="text-sm text-red-500 mt-1">{errors.cultures}</p>}
      </div>

      {/* Experiences */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          What kind of experiences excite you? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
          {predefinedExperiences.map((exp) => (
            <label key={exp} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={exp}
                checked={data.experiences?.includes(exp)}
                onChange={(e) => handleCheckbox(e, "experiences")}
                className="accent-[var(--primaryColor)]"
              />
              {exp}
            </label>
          ))}
        </div>

        {/* Custom Experience Input */}
        <div className="mt-4 flex gap-2 items-center">
          <input
            type="text"
            value={customExperience}
            onChange={(e) => setCustomExperience(e.target.value)}
            placeholder="Add your own (e.g. Dance, Festivals)"
            className="flex-1 border-0 border-b border-gray-400 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-[var(--primaryColor)]"
          />
          <button
            type="button"
            onClick={() => handleAddCustom("experiences", customExperience, setCustomExperience)}
            className="px-4 py-2 text-sm rounded-md border border-[var(--primaryColor)] text-[var(--primaryColor)] hover:bg-[var(--primaryColor)] hover:text-white transition"
          >
            Add
          </button>
        </div>

        {/* Selected Experiences Preview */}
        {data.experiences?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {data.experiences.map((exp) => (
              <span
                key={exp}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs"
              >
                {exp}
                <button
                  type="button"
                  onClick={() => removeSelected("experiences", exp)}
                  className="text-gray-500 hover:text-red-500"
                  aria-label={`Remove ${exp}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {errors.experiences && <p className="text-sm text-red-500 mt-1">{errors.experiences}</p>}
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

export default StepThree;

