import React, { useState } from "react";
import inca from "../assets/inca-mayan-sculpted-stones.png";
import {
  GlobeAltIcon,
  ChatBubbleBottomCenterTextIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  PuzzlePieceIcon,
  SignalIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

// Card data
const cardDataLeft = [
  {
    title: "Global Understanding",
    description: "Learn how values, behaviors, and norms differ across regions.",
    bgColor: "bg-red-900",
  },
  {
    title: "Inclusive Travel Experience",
    description: "Make every journey dignified, respectful, and rooted in understanding.",
    bgColor: "bg-teal-900",
  },
  {
    title: "Personal Growth",
    description: "Become a more empathetic, culturally aware global citizen.",
    bgColor: "bg-[var(--accentColor)]",
  },
];

const cardDataRight = [
  {
    title: "Ethical Impact",
    description: "Support sustainable tourism that uplifts and preserves local cultures.",
    bgColor: "bg-[var(--darkGrayColor)]",
  },
  {
    title: "Community Focused",
    description: "Empowering local communities through sustainable tourism practices.",
    bgColor: "bg-[var(--blackColor)]",
  },
  {
    title: "Cultural Confidence",
    description: "Navigate unfamiliar places with clarity, respect, and self-assurance.",
    bgColor: "bg-blue-900",
  },
];

const featureCards = [
  {
    title: "Cultural Insights",
    description: "Tailored knowledge to help you understand local values, norms, and behaviors.",
    icon: <GlobeAltIcon className="w-8 h-8 text-[var(--primaryColor)] mx-auto mb-4" />,
  },
  {
    title: "Traveler Toolkit",
    description: "Practical tips for respectful communication, gestures, and etiquette.",
    icon: <ShieldCheckIcon className="w-8 h-8 text-[var(--primaryColor)] mx-auto mb-4" />,
  },
  {
    title: "Community Chatroom",
    description: "Follow local trends, ask questions, and build global connections.",
    icon: <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-[var(--primaryColor)] mx-auto mb-4" />,
  },
  {
    title: "Did You Know?",
    description: "Daily cultural trivia to spark curiosity and deepen awareness.",
    icon: <LightBulbIcon className="w-8 h-8 text-[var(--primaryColor)] mx-auto mb-4" />,
  },
  {
    title: "Games & Quizzes",
    description: "Test your cultural fluency and earn badges for respectful travel.",
    icon: <PuzzlePieceIcon className="w-8 h-8 text-[var(--primaryColor)] mx-auto mb-4" />,
  },
  {
    title: "SOS Support",
    description: "Urgent cultural help and safety guidance when you need it most.",
    icon: <SignalIcon className="w-8 h-8 text-[var(--primaryColor)] mx-auto mb-4" />,
  },
  {
    title: "Cultural Calendar",
    description: "Discover holidays, festivals, and rituals happening around the world.",
    icon: <CalendarDaysIcon className="w-8 h-8 text-[var(--primaryColor)] mx-auto mb-4" />,
  },
  {
    title: "Impact Tracker",
    description: "See how your travel supports local communities and sustainability.",
    icon: <SparklesIcon className="w-8 h-8 text-[var(--primaryColor)] mx-auto mb-4" />,
  },
];

const AboutUs = () => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [storyRef, storyVisible] = useRevealOnScroll();
  const [commitmentRef, commitmentVisible] = useRevealOnScroll();
  const [featuresRef, featuresVisible] = useRevealOnScroll();

  return (
    <div id="About" className="w-full py-12">
      {/* Header */}
      <div className="text-center cormorant-garamond-400 text-[var(--textColor)] space-y-4 mb-12 px-4">
        <h3 className="text-4xl md:text-5xl font-bold capitalize">About Us</h3>
        <p className="max-w-2xl mx-auto">Your gateway to cultural understanding and respectful travel</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <hr className="my-8 border-[var(--lightGraycolor)] text-[var(--grayColor)]" />
      </div>

      {/* Our Story */}
      <section
        ref={storyRef}
        className={`max-w-[80%] mx-auto text-center pb-12 transition-all duration-1000 ease-out transform ${
          storyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4 text-[var(--primaryColor)] cormorant-garamond-400">Our Story</h2>
        <p className="text-[var(--textColor)] mb-4 open-sans-200">
          At Turtura, we believe culture is a bridge—not a barrier. It connects people across borders, drives meaningful mobility, and fosters mutual respect. Our mission is to illuminate cultural blindspots and empower travelers with the intelligence to explore boldly, connect deeply, and move through the world with dignity and understanding.
        </p>
      </section>

      {/* Mobile Image */}
      <div className="flex flex-col justify-center items-center lg:hidden mb-8">
        <img src={inca} alt="Cultural Connection" className="w-1/2 h-auto rounded-lg" />
        <h2 className="text-2xl font-semibold mt-4 text-[var(--primaryColor)] cormorant-garamond-400">How We Empower You</h2>
      </div>

      {/* Desktop Layout */}
      <div className="flex flex-col md:flex-row justify-center items-start md:space-x-6 px-4 mb-12 max-w-[90%] mx-auto">
        {/* Left Cards */}
        <div className="flex flex-col space-y-6 w-full md:w-1/3">
          {cardDataLeft.map((card, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredImage(card.hoverImage)}
              onMouseLeave={() => setHoveredImage(null)}
              className={`${card.bgColor} shadow-lg rounded-lg p-6 text-[var(--whiteColor)] hover:shadow-md hover:-translate-y-1 cursor-pointer transition duration-300`}
            >
              <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
              <p>{card.description}</p>
            </div>
          ))}
        </div>

        {/* Center Image */}
        <div className="hidden lg:flex flex-col justify-center items-center w-full md:w-1/3">
          <h2 className="text-3xl font-semibold mb-4 text-[var(--primaryColor)] cormorant-garamond-400">How We Empower You</h2>
          <div className="relative w-full max-w-md h-[300px] overflow-hidden rounded-lg">
            <img
              src={inca}
              alt="Default Cultural Connection"
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                hoveredImage ? "opacity-0" : "opacity-100"
              }`}
            />
            {hoveredImage && (
              <img
                src={hoveredImage}
                alt="Hover Cultural Connection"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-100 transition-opacity duration-500 ease-in-out"
              />
            )}
          </div>
        </div>

        {/* Right Cards */}
        <div className="flex flex-col space-y-6 w-full md:w-1/3 mt-6 md:mt-0">
          {cardDataRight.map((card, index) => (
            <div
              key={index + 3}
              onMouseEnter={() => setHoveredImage(card.hoverImage)}
              onMouseLeave={() => setHoveredImage(null)}
              className={`${card.bgColor} shadow-lg rounded-lg p-6 text-[var(--whiteColor)] hover:shadow-md hover:-translate-y-1 cursor-pointer transition duration-300`}
            >
              <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>

            {/* Our Commitment */}
      <section
        ref={commitmentRef}
        className={`max-w-[80%] mx-auto text-center pb-12 transition-all duration-1000 ease-out transform ${
          commitmentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4 text-[var(--primaryColor)] cormorant-garamond-400">Our Commitment</h2>
        <p className="text-[var(--textColor)] mb-4 open-sans-200">
          We are committed to providing you with a seamless and enjoyable travel experience. We strive to make every journey informed, dignified, and culturally aware. Your feedback is invaluable to us, and we continuously strive to improve our platform to better serve your needs.
        </p>
      </section>

      {/* Turtura Features */}
      <section
        ref={featuresRef}
        className={`max-w-7xl mx-auto px-4 text-center pb-12 transition-all duration-1000 ease-out transform ${
          featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-8 text-[var(--primaryColor)] cormorant-garamond-400">Turtura Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((feature, index) => (
            <div
              key={index}
              style={{ transitionDelay: `${index * 100}ms` }}
              className={`text-[var(--textColor)] rounded-lg p-6 transition-all duration-700 ease-out transform ${
                featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              } hover:shadow-lg hover:shadow-[var(--shadowColor)] hover:-translate-y-1`}
            >
              {feature.icon}
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team Button */}
      <div className="text-center mt-8">
        <a
          href="#Teams"
          className="inline-block text-[var(--whiteColor)] font-semibold py-3 px-6 rounded-lg shadow-md bg-[var(--accentColor)] hover:bg-[var(--primaryColor)] transition duration-300"
        >
          Meet the Team
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
