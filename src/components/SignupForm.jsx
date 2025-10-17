import React from "react";

const SignupForm = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center text-[var(--primaryColor)] mb-2">Create an Account</h1>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
        Join Turtura and start your cultural journey
      </p>

      <form className="space-y-5 animate-fade-in">
        {/* Full Name */}
        <div>
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="e.g. Tobi Adeyemi"
            autoComplete="name"
            required
            className="w-full px-4 py-3 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] transition"
          />
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="e.g. turtura_tobi"
            autoComplete="username"
            required
            className="w-full px-4 py-3 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] transition"
          />
        </div>

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
            className="w-full px-4 py-3 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] transition"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            className="w-full px-4 py-3 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] transition"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] transition"
          />
        </div>

        {/* Terms */}
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <input type="checkbox" id="terms" name="terms" required className="accent-[var(--primaryColor)] mr-2" />
          <label htmlFor="terms">
            I agree to the <a href="#" className="text-[var(--primaryColor)] underline">terms & conditions</a>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-md text-white font-semibold bg-[var(--accentColor)] hover:bg-yellow-600 transition duration-300"
        >
          Sign Up
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white dark:bg-gray-900 px-3 text-gray-500 dark:text-gray-400">Or sign up with</span>
        </div>
      </div>

      {/* Social Signup */}
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

export default SignupForm;
