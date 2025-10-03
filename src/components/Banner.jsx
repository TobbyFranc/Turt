import React, { useState } from "react";
import Pose from "../assets/posing.png";
import emailjs from "@emailjs/browser";

const Banner = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      await emailjs.send(
        "service_vbn1r5e",
        "template_qxkwy9y",
        { user_email: email },
        "vikuOyb-8Q3Zt1k4u"
      );
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      setError("Subscription failed. Please try again.");
    }
  };

  return (
    <div className="w-full md:w-[80%] mx-auto bg-[var(--backgroundColor,#f9fafb)] py-12 relative overflow-hidden md:rounded-3xl">
      {/* Background Vectors */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 800 400">
          <circle cx="100" cy="100" r="80" stroke="var(--primaryColor,#3b82f6)" strokeWidth="2" />
          <circle cx="700" cy="300" r="80" stroke="var(--accentColor,#fbbf24)" strokeWidth="2" />
          <circle cx="400" cy="200" r="80" stroke="var(--primaryColor,#3b82f6)" strokeWidth="2" />
          <circle cx="200" cy="300" r="80" stroke="var(--accentColor,#fbbf24)" strokeWidth="2" />
          <circle cx="600" cy="100" r="80" stroke="var(--primaryColor,#3b82f6)" strokeWidth="2" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="md:w-2/3 text-center md:text-left space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-700 cormorant-garamond-400">
            Stay Updated with Turtura
          </h2>
          <p className="text-gray-600 max-w-md mx-auto md:mx-0 open-sans-400">
            Subscribe to our newsletter for the latest travel tips, cultural insights, and exclusive offers.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto md:mx-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-[var(--primaryColor)] focus:ring-[var(--primaryColor)]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className={`min-w-[140px] px-4 py-2 rounded-md text-white flex items-center justify-center transition ${
                status === "success"
                  ? "bg-green-600"
                  : "bg-[var(--accentColor)] hover:bg-[var(--primaryColor)]"
              }`}
            >
              {status === "loading" ? ("Loading..."
                // <svg
                //   className="animate-spin h-5 w-5 text-white"
                //   xmlns="http://www.w3.org/2000/svg"
                //   fill="none"
                //   viewBox="0 0 24 24"
                // >
                //   <circle
                //     className="opacity-25"
                //     cx="12"
                //     cy="12"
                //     r="10"
                //     stroke="currentColor"
                //     strokeWidth="4"
                //   />
                //   <path
                //     className="opacity-75"
                //     fill="currentColor"
                //     d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                //   />
                // </svg>
              ) : status === "success" ? (
                "✓ Subscribed"
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
          <img
            src={Pose}
            alt="Newsletter"
            className="w-64 h-64 object-contain"
            onError={(e) => (e.currentTarget.src = Pose)}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
