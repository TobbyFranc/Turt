import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-[var(--primaryColor)] mb-2">Welcome Back</h1>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
        Log in to continue your journey with Turtura
      </p>

      <form className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="w-full px-4 py-3 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
            className="w-full px-4 py-3 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[38px] right-3 text-gray-500 dark:text-gray-300 hover:text-[var(--primaryColor)]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FiEyeOff size={20} />
            ) : (
             <FiEye size={20} />
            )}
          </button>
        </div>

        {/* Options */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <input type="checkbox" className="accent-[var(--primaryColor)]" />
            Remember me
          </label>
          <a href="#" className="text-[var(--primaryColor)] hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-md text-white font-semibold bg-[var(--accentColor)] hover:bg-yellow-600 transition duration-300"
        >
          <a href="./Dashboard">Logiiin</a>
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white dark:bg-gray-900 px-3 text-gray-500 dark:text-gray-400">Or login with</span>
        </div>
      </div>

      {/* Social Login */}
      <div className="flex justify-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <img src="https://www.svgrepo.com/show/452196/facebook.svg" alt="Facebook" className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Facebook</span>
        </button>
      </div>
    </>
  );
};

export default LoginForm;
