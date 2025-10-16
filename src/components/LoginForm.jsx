import React from "react";

const LoginForm = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center text-[var(--primaryColor)]">Welcome Back</h1>
      <form className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm text-gray-600 dark:text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm text-gray-600 dark:text-gray-300">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-md text-white bg-[var(--accentColor)] hover:bg-yellow-600 transition"
        >
          Login
        </button>
      </form>

      {/* Social Login */}
      <div className="space-y-3">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">Or login with</p>
        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span className="text-sm">Google</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <img src="https://www.svgrepo.com/show/452196/facebook.svg" alt="Facebook" className="w-5 h-5" />
            <span className="text-sm">Facebook</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
