import React, { useState } from "react";
import Turtle from "../assets/Turt.png";
import emailjs from "@emailjs/browser";

const LandingFooter = () => {
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
    <footer className="">
        {/*  */}
        <div className="w-full bg-[var(--primaryColor)]  py-12 px-4 mt-12">

          
          {/*  */}
                  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div className="space-y-4">
          <div className="flex items-center bg-[var(--backgroundColor)] text-[var(--grayColor)] rounded-md px-2 w-fit">
            <img src={Turtle} alt="Turtura Logo" className="w-12 h-12" />
            <h2 className="text-2xl font-bold ml-2">Turtura</h2>
          </div>
          <p className="text-[var(--backgroundColor)]">
            Illuminating cultural blind spots. Navigate unfamiliar places with confidence, curiosity, and connection.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold bg-[var(--backgroundColor)] text-[var(--grayColor)] rounded-md px-2 py-1 w-fit">
            Quick Links
          </h3>
          <ul className="space-y-2 text-[var(--backgroundColor)]">
            <li><a href="#About" className="hover:text-[var(--accentColor)] ">About Us</a></li>
            <li><a href="#Features" className="hover:text-[var(--accentColor)] ">Features</a></li>
            <li><a href="#Contact" className="hover:text-[var(--accentColor)] ">Contact</a></li>
            <li><a href="#Privacy" className="hover:text-[var(--accentColor)] ">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold bg-[var(--backgroundColor)] text-[var(--grayColor)] rounded-md px-2 py-1 w-fit">
            Contact Us
          </h3>
          <ul className="space-y-2 text-[var(--backgroundColor)]">
            <li>Email: <a href="mailto:turtura@gmail.com" className="hover:underline">culturetour@turtura.com</a></li>
            <li>Phone: <a href="tel:+2348144950975" className="hover:underline">(+234) 81-4495-0975</a></li>
            <li>Address: Ibadan, Oyo State, Nigeria</li>
          </ul>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="max-w-6xl mx-auto mt-12">
        <h3 className="text-xl font-semibold mb-4 text-[var(--backgroundColor)]">Subscribe to our Newsletter</h3>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-grow p-2 border border-[var(--grayColor)] text-[var(--grayColor)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--grayColor)]"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={`px-4 py-2 rounded-md text-[var(--grayColor)] flex items-center justify-center transition ${
              status === "success"
                ? "bg-green-600 text-[var(--whiteColor)]"
                : "bg-[var(--grayColor)] text-[var(--whiteColor)] hover:bg-[var(--accentColor)] transition duration-300"
            }`}
          >
            {status === "loading" ? (
                "Loading..."
            //   <svg
            //     className="animate-spin h-5 w-5 text-white"
            //     xmlns="http://www.w3.org/2000/svg"
            //     fill="none"
            //     viewBox="0 0 24 24"
            //   >
            //     <circle
            //       className="opacity-25"
            //       cx="12"
            //       cy="12"
            //       r="10"
            //       stroke="currentColor"
            //       strokeWidth="4"
            //     />
            //     <path
            //       className="opacity-75"
            //       fill="currentColor"
            //       d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            //     />
            //   </svg>
            ) : status === "success" ? (
              "✓ Subscribed"
            ) : (
              "Subscribe"
            )}
          </button>
        </form>
        {error && <p className="text-[var(--errorColor)] text-sm mt-2 shadow-sm">{error}</p>}
      </div>

      {/* Divider */}
      <hr className="my-8 border-[var(--lightGrayColor)]" />

      {/* Legal Links */}
      <div className="text-[var(--backgroundColor)] flex flex-col md:flex-row  justify-center items-center space-y-6 md:space-y-0 md:space-x-6 px-4 ">
        <div className="text-center">
          <a href="#Terms" className="hover:underline mx-2">Terms of Service</a> |
          <a href="#Privacy" className="hover:underline mx-2">Privacy Policy</a> |
          <a href="#Cookie" className="hover:underline mx-2">Cookie Policy</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 text-[var(--backgroundColor)]">
        &copy; {new Date().getFullYear()} Turtura. All rights reserved.
      </div>

        </div>
        {/*  */}
      <div className="text-center text-gray-500 py-4">
        Made by Tobi Francis — Not for commercial use.
      </div>
    </footer>
  );
};

export default LandingFooter;
