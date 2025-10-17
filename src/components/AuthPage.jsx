import React, { useState } from "react";
import MultiStepSignup from "./MultiStepSignup";
import LoginForm from "./LoginForm";

const AuthPage = () => {
  const [isReturningUser, setIsReturningUser] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-700">
      {/* Optional Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1170&q=80"
          alt="Cultural Journey"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Auth Panel */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-4xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-gray-900 dark:text-white transition-all duration-700 ease-in-out">
          {/* Toggle */}
          <div className="mb-6 text-center">
            <button
              onClick={() => setIsReturningUser(!isReturningUser)}
              className="text-sm text-[var(--primaryColor)] underline font-medium"
            >
              {isReturningUser
                ? "New to Turtura? Start your journey"
                : "Already onboarded? Log in instead"}
            </button>
          </div>

          {/* Form Content */}
          {isReturningUser ? <LoginForm /> : <MultiStepSignup />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
