import React, { useState } from "react";
import MultiStepSignup from "./MultiStepSignup";
import LoginForm from "./LoginForm";

const AuthPage = () => {
  const [isReturningUser, setIsReturningUser] = useState(false);

  return (
    <div className="h-screen w-full grid md:grid-cols-2 bg-gradient-to-br from-teal-100 via-indigo-100 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-700">
      {/* Left: Illustration + Quote */}
      <div className="hidden md:flex flex-col items-center justify-center px-10 space-y-6 text-center text-gray-700 dark:text-gray-300 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md">
        <img
          src={`/assets/undraw_adventure_re_ncqp.svg`}
          alt="Cultural Journey"
          className="w-full max-w-md"
        />
        <p className="text-sm italic max-w-sm">
          “Culture is the widening of the mind and of the spirit.”<br />— Jawaharlal Nehru
        </p>
      </div>

      {/* Right: Form Panel */}
      <div className="flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl space-y-6">
          <div className="text-center">
            <button
              onClick={() => setIsReturningUser(!isReturningUser)}
              className="text-sm text-[var(--primaryColor)] underline font-medium"
            >
              {isReturningUser
                ? "New to Turtura? Start your journey"
                : "Already onboarded? Log in instead"}
            </button>
          </div>
          {isReturningUser ? <LoginForm /> : <MultiStepSignup />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
