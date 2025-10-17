import React, { useState } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const StepFive = ({ data, updateForm, prevStep }) => {
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setSubmitted(true);
    setShowSuccess(true);

    // Simulate redirect after delay
    setTimeout(() => {
      navigate("/auth?returning=true");
    }, 5000);
  };

  const openMailClient = () => {
    window.open("mailto:", "_blank");
  };

  return (
    <div className="relative space-y-10 animate-fade-in">
      {/* Confetti */}
      {showSuccess && <Confetti numberOfPieces={300} recycle={false} />}

      {/* Celebration Icon */}
      <div className="flex justify-center">
        <img
          src="https://www.svgrepo.com/show/354381/celebration.svg"
          alt="Celebrate"
          className="w-24 h-24 opacity-90"
        />
      </div>

      {/* Welcome Message */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          🎉 You're all set, {data.fullName?.split(" ")[0]}!
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Here's a quick summary of your onboarding journey.
        </p>
      </div>

      {/* Review Summary */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 shadow-sm text-sm text-gray-700 dark:text-gray-300 space-y-2">
        <p><strong>Full Name:</strong> {data.fullName}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Role:</strong> {data.role}</p>
        <p><strong>Intent:</strong> {data.intent}</p>
        <p><strong>Cultures:</strong> {data.cultures?.join(", ") || "None selected"}</p>
        <p><strong>Experiences:</strong> {data.experiences?.join(", ") || "None selected"}</p>
        <p><strong>Travel Style:</strong> {data.travelStyle}</p>
        <p><strong>Accessibility:</strong> {data.accessibility || "None specified"}</p>
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
        <input
          type="checkbox"
          id="termsAgreed"
          checked={data.termsAgreed}
          onChange={(e) => updateForm({ termsAgreed: e.target.checked })}
          className="mt-1 accent-[var(--primaryColor)]"
        />
        <label htmlFor="termsAgreed" className="cursor-pointer">
          I agree to Turtura’s{" "}
          <a href="#" className="text-[var(--primaryColor)] underline hover:text-[var(--accentColor)]">
            terms & conditions
          </a>
        </label>
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
          onClick={handleSubmit}
          disabled={!data.termsAgreed || submitted}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition ${
            data.termsAgreed && !submitted
              ? "bg-[var(--accentColor)] text-white hover:bg-yellow-600"
              : "bg-gray-300 text-gray-400 cursor-not-allowed"
          }`}
        >
          {submitted ? "Submitting..." : "Submit →"}
        </button>
      </div>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 max-w-md text-center space-y-4 shadow-lg">
            <h3 className="text-xl font-semibold text-[var(--primaryColor)]">🎉 Success!</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              A verification link has been sent to <strong>{data.email}</strong>.
              Please check your inbox to activate your account.
            </p>
            <button
              onClick={openMailClient}
              className="mt-2 px-5 py-2 rounded-md bg-[var(--primaryColor)] text-white hover:bg-[var(--accentColor)] transition"
            >
              Open Email App
            </button>
            <p className="text-xs text-gray-400">Redirecting to login shortly...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepFive;
