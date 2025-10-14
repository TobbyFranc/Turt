import React from 'react';

const Login = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left: Image background on mobile, side panel on desktop */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-full">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1170&q=80"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 lg:bg-opacity-0" />
      </div>

      {/* Right: Login Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 py-10 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md space-y-6">
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
              onClick={() => window.location.href = '/Dashboard'}
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

          {/* Signup Link */}
          <p className="text-xs text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <a href="/Signup" className="underline text-[var(--primaryColor)] font-semibold">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
