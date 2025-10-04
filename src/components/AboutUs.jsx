import React from "react";
import inca from "../assets/inca-mayan-sculpted-stones.png";
// what to know about Turtura
const AboutUs = () => {
  return (
    <div id="About" className=" w-full py-12">
      {/* Subheader */}
      <div className=" z-10 w-full text-center cormorant-garamond-400  space-y-4 mb-12 px-4">
        <h3 className="text-2xl md:text-4xl lg:text-4xl xl:text-6xl font-bold text-[var(--grayColor)] capitalize">
          {/* About us */}
          About Us
        </h3>
        <p className="max-w-2xl mx-auto">
          Your Gateway to Cultural Understanding and Respectful Travel
        </p>
      </div>

      {/* divider hr */}
      <div className="max-w-6xl mx-auto">
        <hr className="my-8 border-[var(--lightGraycolor)]" />
      </div>
      {/*  */}

      {/* main about us section  */}
      <div className=" mb-4">
        <div className="max-w-[80%] mx-auto text-center pb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--primaryColor)] cormorant-garamond-400">
            Our Story
          </h2>
          <p className="text-[var(--grayColor)] mb-4 open-sans-200">
            At Turtura, we believe culture is a bridge—not a barrier. It
            connects people across borders, drives meaningful mobility, and
            fosters mutual respect. Our mission is to illuminate cultural
            blindspots and empower travelers with the intelligence to explore
            boldly, connect deeply, and move through the world with dignity and
            understanding.
          </p>
        </div>
        {/* masqurade */}
        <div className="flex flex-col justify-center items-center md:hidden">
          {/* what we offer */}
          <img
            src={inca}
            alt="Cultural Connection"
            className="w-1/2 h-auto rounded-lg"
          />
          <h2 className="text-3xl font-semibold mb-4 text-[var(--primaryColor)] cormorant-garamond-400">
            What We Offer?
          </h2>
        </div>
        {/*  */}

        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch md:justify-around space-y-6 md:space-y-0 md:space-x-6 px-4 mb-12 max-w-[90%] mx-auto">
          <div className=" flex flex-col-reverse  md:flex-row-reverse items-center">
              {/* subheading */}
              {/* card 1 */}
              <div className="flex flex-col w-full space-y-2 ">
                <div className="bg-red-900 shadow-lg rounded-lg p-6 w-full  text-[var(--whiteColor)] hover:shadow-md hover:-translate-y-1 cursor-pointer transision duration-300">
                  <div className="flex items-center mb-4">
                    {/* svg of a globe */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mr-4 text-[var(--primaryColor)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <h4 className="text-xl font-semibold">Global Understanding</h4>
                  </div>
                  <p className="text-[var(--whiteColor)]">
                    Learn how values, behaviors, and norms differ across regions.
                  </p>
                </div>
                {/*  */}
                <div className="bg-teal-900 shadow-lg rounded-lg p-6 w-full  text-[var(--whiteColor)] hover:shadow-md hover:-translate-y-1 cursor-pointer transision duration-300">
                  <div className="flex items-center mb-4">
                    {/* svg for inclusive travel experience */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mr-4 text-[var(--primaryColor)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h11M9 21V3m0 0L5 7m4-4l4 4m6 0h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.343M16 3l4 4m0 0l-4 4m4-4H9" 
                      />
                    </svg>

                    {/* what we offer */}
                    <h4 className="text-xl font-semibold">
                      Inclusive Travel Experience
                    </h4>
                  </div>
                  <p className="text-[var(--whiteColor)]">
                    Make every journey dignified, respectful, and rooted in understanding.
                  </p>
                </div>
                <div className="bg-[var(--accentColor)] shadow-lg rounded-lg p-6 w-full  text-[var(--whiteColor)] hover:shadow-md hover:-translate-y-1 cursor-pointer transision duration-300">
                  <div className="flex items-center mb-4">
                    {/* svg of security */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mr-4 text-[var(--primaryColor)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2h8z"
                      />
                    </svg>
                    <h4 className="text-xl font-semibold">Personal Growth</h4>
                  </div>
                  <p className="text-[var(--whiteColor)]">
                    Become a more empathetic, culturally aware global citizen.
                  </p>
                </div>
              </div>
            {/* </div> */}

            {/*  */}
            <div className=" hidden md:flex flex-col justify-center items-center">
              {/* what we offer */}
              <h2 className="text-3xl font-semibold mb-4 text-[var(--primaryColor)] cormorant-garamond-400">
                What We Offer?
              </h2>
              <img
                src={inca}
                alt="Cultural Connection"
                className=" h-auto rounded-lg"
              />
            </div>

            {/* create list items of features with decorated bullets with svgs */}
              {/* subheading */}
              <div className="flex flex-col justify-center items-center w-full space-y-2 my-2 md:">
                <div className="bg-[var(--accentColor)] shadow-lg rounded-lg p-6 w-full  text-[var(--whiteColor)] hover:shadow-md hover:-translate-y-1 cursor-pointer transision duration-300">
                  <div className="flex items-center mb-4">

                    {/* svg of impact */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mr-4 text-[var(--primaryColor)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>



                    <h4 className="text-xl font-semibold">Ethical Impact</h4>
                  </div>
                  <p className="text-[var(--whiteColor)]">
                    Support sustainable tourism that uplifts and preserves local cultures.
                  </p>
                </div>
                <div className="bg-black shadow-lg rounded-lg p-6 w-full  text-[var(--whiteColor)] hover:shadow-md hover:-translate-y-1 cursor-pointer transision duration-300">
                  <div className="flex items-center mb-4">
                    {/* svg of collaboration or community */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mr-4 text-[var(--primaryColor)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <h4 className="text-xl font-semibold">Community Focused</h4>
                  </div>
                  <p className="text-[var(--whiteColor)]">
                    Empowering local communities through sustainable tourism
                    practices.
                  </p>
                </div>
                <div className="bg-blue-900 shadow-lg rounded-lg p-6 w-full  text-[var(--whiteColor)] hover:shadow-md hover:-translate-y-1 cursor-pointer transision duration-300">
                  <div className="flex items-center mb-4">
                    {/* svg for culture */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mr-4 text-[var(--primaryColor)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>


                    <h4 className="text-xl font-semibold">Cultural Confidence</h4>
                  </div>
                  <p className="text-[var(--whiteColor)]">
                   Navigate unfamiliar places with clarity, respect, and self-assurance.
                  </p>
                </div>
              </div>
          </div>
        </div>
        {/* our commitment */}
                <div className="max-w-[80%] mx-auto text-center pb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--primaryColor)] cormorant-garamond-400">
            Our Commitment
          </h2>
          <p className="text-[var(--grayColor)] mb-4 open-sans-200">
                 We are committed to providing you with a seamless and enjoyable
              travel experience. We strive to make every journey informed,
              dignified, and culturally aware. Your feedback is invaluable to
              us, and we continuously strive to improve our platform to better
              serve your needs.
          </p>
        </div>
      </div>

          {/* meet the team center button that redirects to the team section */}
          <div className="text-center">
            <a
              href="#Team"
              className="inline-block text-[var(--whiteColor)] font-semibold py-3 px-6 rounded-lg shadow-md bg-[var(--accentColor)] hover:bg-[var(--primaryColor)] transition duration-300"
            >
              Meet the Team
            </a>
          </div>
    </div>
  );
};

export default AboutUs;
