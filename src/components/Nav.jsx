import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Turt from "../assets/Turt.png";
import { useTheme } from "./ThemeProvider";

const sections = ["Home", "About", "Explore", "Teams", "FAQS"];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const { darkMode, setDarkMode } = useTheme();
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed w-full top-0 left-0 z-50 bg-[var(--whiteColor)] text-[var(--grayColor)] shadow-md">
      <div className="w-full flex justify-between items-center px-6 h-16 border-b border-b-gray-300">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Turt} alt="Turtura Logo" className="w-14 h-14" />
          <p className="text-xl lg:text-2xl inter-500 ml-2">Turtura</p>
        </div>

        <nav className="hidden md:flex md:items-center md:space-x-10">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`relative text-sm font-normal px-2 py-1 transition duration-300 outline-none focus:outline-none ${
                activeSection === section
                  ? "text-[var(--primaryColor)] border-b-2 border-[var(--primaryColor)]"
                  : "hover:text-[var(--accentColor)] group"
              }`}
            >
              {section === "FAQS" ? "FAQs" : section}
              {activeSection !== section && (
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[var(--accentColor)] transition-all duration-300 group-hover:w-full"></span>
              )}
            </button>
          ))}
          <button
            onClick={() => navigate("/auth")}
            className="px-4 py-2 rounded-md bg-[var(--accentColor)] text-[var(--whiteColor)] hover:bg-[var(--primaryColor)] transition duration-300"
          >
            Get Started
          </button>
        </nav>

        <button
          onClick={toggleMenu}
          className="block md:hidden p-2 text-[var(--primaryColor)] rounded-md hover:bg-[var(--lightGrayColor)] focus:outline-none"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-[var(--backgroundColor)] text-[var(--textColor)] z-[60] flex flex-col items-center pt-10 space-y-5 px-6 md:hidden">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`relative text-base font-normal px-2 py-1 transition duration-300 outline-none focus:outline-none ${
                activeSection === section
                  ? "text-[var(--primaryColor)] border-b-2 border-[var(--primaryColor)]"
                  : "hover:text-[var(--accentColor)] group"
              }`}
            >
              {section === "FAQS" ? "FAQs" : section}
              {activeSection !== section && (
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[var(--accentColor)] transition-all duration-300 group-hover:w-full"></span>
              )}
            </button>
          ))}
          <button
            onClick={() => {
              navigate("/auth");
              setIsOpen(false);
            }}
            className="mt-6 px-6 py-3 rounded-md bg-[var(--accentColor)] text-[var(--whiteColor)] hover:bg-[var(--primaryColor)] transition duration-300"
          >
            Get Started
          </button>
        </div>
      )}

      <div className="fixed top-20 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="bg-[var(--grayColor)] text-[var(--alertColor)] p-2 rounded-md shadow-lg hover:scale-105 hover:bg-[var(--primaryColor)] dark:hover:bg-[var(--accentColor)] transition duration-300"
          title="Toggle Dark Mode"
        >
          {!darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.36 4.95l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 5a7 7 0 000 14a7 7 0 000-14z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

      {showToast && (
        <div className="fixed bottom-24 right-6 bg-[var(--blackColor)] text-[var(--whiteColor)] dark:bg-[var(--whiteColor)] dark:text-[var(--blackColor)] px-4 py-2 rounded-md shadow-lg animate-fadeIn z-50">
          {darkMode ? "Dark mode enabled 🌙" : "Light mode enabled ☀️"}
        </div>
      )}
    </div>
  );
};

export default Nav;
