import React, { useState, useEffect } from "react";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";

const StepTwo = ({ data, updateForm, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateAll = () => {
    const newErrors = {};
    if (!data.role) newErrors.role = "Please select a role.";
    if (!data.intent.trim()) newErrors.intent = "Intent is required.";
    return newErrors;
  };

  const isValid = () => {
    return data.role && data.intent.trim();
  };

  const handleNext = () => {
    const validationErrors = validateAll();
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
          src="https://www.svgrepo.com/show/354380/explore-location-map.svg"
          alt="Explore"
          className="w-24 h-24 opacity-80"
        />
      </div>

      {/* Role Selection */}
      <SelectField
        label="What best describes you? *"
        name="role"
        value={data.role}
        options={[
          "Traveler",
          "Tourist",
          "Culture Enthusiast",
          "Local Host",
          "Researcher",
        ]}
        onChange={handleChange}
        error={errors.role}
      />

      {/* Intent Textarea */}
      <TextAreaField
        label="Why are you joining Turtura? *"
        name="intent"
        value={data.intent}
        placeholder="Share your goals, dreams, or curiosity..."
        onChange={handleChange}
        error={errors.intent}
      />

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

export default StepTwo;
