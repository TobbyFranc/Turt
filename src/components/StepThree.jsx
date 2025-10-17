import React from "react";

const StepThree = ({ data, updateForm, nextStep, prevStep }) => {
  const handleCheckbox = (e, field) => {
    const value = e.target.value;
    const checked = e.target.checked;
    const current = data[field] || [];

    const updated = checked
      ? [...current, value]
      : current.filter((item) => item !== value);

    updateForm({ [field]: updated });
  };

  return (
    <div className="space-y-6 animate-fade-in">
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
          Which cultures or regions are you most drawn to?
        </label>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
          {["West Africa", "East Asia", "Middle East", "South America", "Europe", "Indigenous Cultures"].map((region) => (
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
      </div>

      {/* Experiences */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          What kind of experiences excite you?
        </label>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
          {["Food", "History", "Language", "Rituals", "Art", "Spirituality"].map((exp) => (
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

export default StepThree;
