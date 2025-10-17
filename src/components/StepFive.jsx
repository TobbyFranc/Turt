import React from "react";

const StepFive = ({ data, prevStep }) => {
  const handleSubmit = () => {
    // You can replace this with actual submission logic
    alert("Welcome to Turtura, " + data.fullName + "!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Optional SVG */}
      <div className="flex justify-center">
        <img
          src="https://www.svgrepo.com/show/354381/celebration.svg"
          alt="Celebrate"
          className="w-24 h-24 opacity-80"
        />
      </div>

      {/* Review Summary */}
      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
        <p><strong>Name:</strong> {data.fullName}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Role:</strong> {data.role}</p>
        <p><strong>Intent:</strong> {data.intent}</p>
        <p><strong>Cultures:</strong> {data.cultures?.join(", ") || "None selected"}</p>
        <p><strong>Experiences:</strong> {data.experiences?.join(", ") || "None selected"}</p>
        <p><strong>Travel Style:</strong> {data.travelStyle}</p>
        <p><strong>Accessibility:</strong> {data.accessibility || "None specified"}</p>
      </div>

      {/* Terms Agreement */}
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
        <input
          type="checkbox"
          id="termsAgreed"
          checked={data.termsAgreed}
          onChange={(e) => updateForm({ termsAgreed: e.target.checked })}
          className="accent-[var(--primaryColor)] mr-2"
        />
        <label htmlFor="termsAgreed">
          I agree to Turtura’s <a href="#" className="text-[var(--primaryColor)] underline">terms & conditions</a>
        </label>
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
          onClick={handleSubmit}
          disabled={!data.termsAgreed}
          className={`px-6 py-3 rounded-md font-semibold transition duration-300 ${
            data.termsAgreed
              ? "bg-[var(--accentColor)] text-white hover:bg-yellow-600"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StepFive;
