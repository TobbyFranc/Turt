import React from "react";

const StepOne = ({ data, updateForm, nextStep }) => {
  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Optional SVG */}
      <div className="flex justify-center">
        <img
          src="https://www.svgrepo.com/show/354262/user-profile-avatar.svg"
          alt="Profile"
          className="w-24 h-24 opacity-80"
        />
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={data.fullName}
          onChange={handleChange}
          placeholder="e.g. Tobi Adeyemi"
          required
          className="w-full px-4 py-3 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] transition"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="you@example.com"
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
          value={data.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          className="w-full px-4 py-3 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] transition"
        />
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
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

export default StepOne;
