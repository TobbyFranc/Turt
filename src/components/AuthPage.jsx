import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MultiStepSignup from "./MultiStepSignup";
import LoginForm from "./LoginForm";

// SVG illustrations
import profileSvg from "../assets/undraw_profile-data_xkr9.svg";
import travelingSvg from "../assets/undraw_traveling_c18z.svg";
import experienceSvg from "../assets/undraw_experience-design_d4md.svg";
import celebrationSvg from "../assets/undraw_celebration_wtm8.svg";
import adventureSvg from "../assets/undraw_adventure_9my9.svg";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const isReturning = query.get("returning") === "true";

  const [isReturningUser, setIsReturningUser] = useState(isReturning);
  const [step, setStep] = useState(1);

  const quotes = [
    "“Every journey begins with a single step.” — Lao Tzu",
    "“To travel is to live.” — Hans Christian Andersen",
    "“Culture is the widening of the mind and of the spirit.” — Nehru",
    "“Travel far enough, you meet yourself.” — David Mitchell",
    "“The world is a book, and those who do not travel read only one page.” — Augustine",
  ];

  const illustrations = [
    adventureSvg,
    profileSvg,
    travelingSvg,
    experienceSvg,
    celebrationSvg,
  ];

  const currentStep = Math.max(1, Math.min(step, 5));
  const illustration = illustrations[currentStep - 1] || profileSvg;
  const quote = quotes[currentStep - 1] || "";

  return (
    <div className="min-h-screen w-full grid md:grid-cols-2 bg-gradient-to-br from-teal-100 via-indigo-100 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-700">
      {/* Left: Illustration + Quote */}
      <div className="hidden md:flex flex-col items-center justify-center px-10 space-y-6 text-center text-gray-700 dark:text-gray-300 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 text-[var(--primaryColor)] hover:text-[var(--accentColor)] transition"
          aria-label="Go to home"
        >
          ← Home
        </button>
        <img
          src={illustration}
          alt="Step Illustration"
          className="w-full max-w-md"
        />
        <p className="text-sm italic max-w-sm">{quote}</p>
      </div>

      {/* Right: Form Panel */}
      <div className="relative flex flex-col items-center justify-center px-6 py-10">
        {/* Mobile Back Button */}
        <button
          onClick={() => navigate("/")}
          className="md:hidden absolute top-4 left-4 text-[var(--primaryColor)] hover:text-[var(--accentColor)] transition"
          aria-label="Go to home"
        >
          ← Home
        </button>

        <div className="w-full max-w-xl space-y-6">
          <div className="text-center">
            <button
              onClick={() => setIsReturningUser(!isReturningUser)}
              className="text-sm text-[var(--grayColor)]  underline hover:text-[var(--primaryColor)] px-3 py-1 rounded-full  bg-[var(--alertColor)]"
            >
              {isReturningUser
                ? "New to Turtura? Start your journey"
                : "Already onboarded? Log in instead"}
            </button>
          </div>

          {isReturningUser ? (
            <LoginForm />
          ) : (
            <MultiStepSignup step={step} setStep={setStep} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
