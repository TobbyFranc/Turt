import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden bg-[var(--backgroundColor)]">
      {/* Image Panel */}
      <div
        className={`absolute top-0 left-0 w-full md:w-1/2 h-full transition-all duration-700 ease-in-out z-0 ${
          isLogin ? "translate-x-full" : ""
        }`}
      >
        <img
          src={
            isLogin
              ? "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1170&q=80"
              : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1170&q=80"
          }
          alt="Auth Visual"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 md:bg-opacity-0" />
      </div>

      {/* Form Panel */}
      <div className="relative z-10 flex items-center justify-center w-full md:w-1/2 h-full px-6 md:px-12">
        <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl transition-opacity duration-500">
          {isLogin ? <LoginForm /> : <SignupForm />}
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="underline text-[var(--primaryColor)] font-semibold"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="underline text-[var(--primaryColor)] font-semibold"
                >
                  Login
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
