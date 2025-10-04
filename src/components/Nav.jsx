import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Turt from "../assets/Turt.png";
import Tuur from "../assets/Tuur.png";
import { useTheme } from "./ThemeProvider";

const sections = ["Home", "About", "Explore", "Teams", "FAQS"];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
const { darkMode, setDarkMode } = useTheme();
  const [showToast, setShowToast] = useState(false);
  const [showToastE, setShowToastE] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMode, setChatMode] = useState("ai"); // 'ai' or 'support'
  const [chatInput, setChatInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatLog, setChatLog] = useState([]);
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
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;
    const userMessage = { sender: "user", text: chatInput };
    setChatLog((prev) => [...prev, userMessage]);
    setChatInput("");

    if (chatMode === "ai") {
      const aiResponse = { sender: "ai", text: `You said: "${chatInput}"` };
      setTimeout(() => setChatLog((prev) => [...prev, aiResponse]), 1000);
    } else {
      try {
        await fetch("https://your-support-api.com/message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: chatInput }),
        });
        const supportResponse = { sender: "support", text: "Support team will reply shortly." };
        setChatLog((prev) => [...prev, supportResponse]);
      } catch {
        const errorResponse = { sender: "system", text: "Failed to reach support. Try again later." };
        setChatLog((prev) => [...prev, errorResponse]);
      }
    }
  };

  return (
    <div className="fixed w-full top-0 left-0 z-50 bg-[var(--whiteColor)] text-[var(--grayColor)] md:bg-[var(--whiteColor)] shadow-md">
      <div className="w-full flex justify-between p-8 items-center h-16 border-b shadow-b-md border-b-gray-300">
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <img src={Turt} alt="Turtura Logo" className="w-20 h-20" />
          <p className="text-2xl lg:text-3xl inter-500">Turtura</p>
        </div>

        {/* Navigation */}
        <div className="flex md:justify-end md:items-end">
          <nav
            className={`${
              isOpen
                ? "py-6 flex flex-1 absolute right-0 top-16 z-50 flex-col space-y-8 bg-[var(--backgroundColor)] w-full min-h-[100dvh] pb-24 overflow-y-auto items-center md:bg-transparent md:sticky md:flex-row md:py-0 md:space-y-0 md:space-x-8"
                : "hidden md:flex"
            }`}
          >
            <ul className="flex flex-col space-y-12 items-center w-full md:flex-1 md:space-y-0 md:space-x-8 lg:space-x-12 xl:space-x-20 md:justify-end md:flex-row sm:mr-2 md:mr-6 lg:mr-24">
              {sections.map((section) => (
                <li
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`border-b-2 w-full h-16 flex justify-center items-center cursor-pointer md:w-auto transition duration-300 ${
                    activeSection === section
                      ? "text-[var(--primaryColor)] font-semibold border-b-[var(--primaryColor)]"
                      : "border-b-2 md:border-b-transparent hover:text-[var(--accentColor)] hover:border-b-[var(--accentColor)]"
                  }`}
                >
                  <button>{section === "FAQS" ? "FAQs" : section}</button>
                </li>
              ))}
            </ul>

            {/* Get Started Button */}
            <div className="flex flex-col items-center md:space-x-4 md:flex-row">
              <button
                onClick={() => navigate("/Signup")}
                className="px-4 py-2 w-[280px] md:w-auto rounded-md bg-[var(--accentColor)] text-[var(--whiteColor)] hover:bg-[var(--primaryColor)] transition duration-300"
              >
                Get Started
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none p-2 text-[var(--primaryColor)] rounded-md hover:bg-[var(--lightGrayColor)]"
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
      </div>

      {/* Dark Mode Toggle */}
      <div className={`fixed z-50 ${isOpen ? "bottom-6 right-6" : "top-20 right-6"}`}>
        <button
          onClick={toggleTheme}
          className="bg-[var(--grayColor)] dark:bg-slate-800 text-[var(--lightGrayColor)] dark:text-yellow-400 p-2 rounded-md shadow-lg hover:scale-105 hover:bg-[var(--primaryColor)] dark:hover:bg-[var(--accentColor)] transition duration-300"
          title="Toggle Dark Mode"
        >
          {!darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round"               strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.36 4.95l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 5a7 7 0 000 14a7 7 0 000-14z"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>
    </div>

    {/* Toast Notification */}
{showToast && (
  <div className="fixed bottom-24 right-6 bg-[var(--blackColor)] text-[var(--whiteColor)] dark:bg-[var(--whiteColor)] dark:text-[var(--blackColor)] px-4 py-2 rounded-md shadow-lg animate-fadeIn z-50">
    {darkMode ? "Dark mode enabled 🌙" : "Light mode enabled ☀️"}
  </div>
)}


{/* Floating Chat Button */}
{/* Floating Chat Button */}
<div className="fixed bottom-6 left-2 z-40 transition duration-300">
  <button
    onClick={() => setChatOpen(!chatOpen)}
    className="bg-[var(--accentColor)] text-[var(--whiteColor)] p-3 rounded-full shadow-lg hover:bg-[var(--primaryColor)] transition duration-300"
  >
    {chatOpen ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 13v-3a8 8 0 0116 0v3" />
        <path d="M6 13h1a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 012-2zM17 13h1a2 2 0 012 2v3a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2z" />
      </svg>
    )}
  </button>

  {chatOpen && (
    <div className={`mt-4 ${isExpanded ? "w-full h-[80vh]" : "w-full max-h-[70vh]"} overflow-hidden bg-[var(--whiteColor)] dark:bg-slate-900 text-[var(--blackColor)] dark:text-[var(--whiteColor)] rounded-xl shadow-2xl flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 dark:border-[var(--grayColor)]">
        <div className="flex items-center gap-3">
          <img
  src="https://randomuser.me/api/portraits/men/48.jpg"
  alt="Support 1"
  onError={(e) => (e.currentTarget.src = Tuur)}
  className="w-8 h-8 rounded-full"
/>

          <img src="https://randomuser.me/api/portraits/women/48.jpg" alt="Support 2" onError={(e) => (e.currentTarget.src = Tuur)} className="w-8 h-8 rounded-full" />
          <span className="font-semibold text-sm text-[var(--accentColor)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2H4C2.89543 2 2 2.89543 2 4V22L6 18H20C21.1046 18 22 17.1046 22 16V4C22 2.89543 21.1046 2 20 2Z" fill="currentColor"/>
</svg>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
              setShowToastE(true);
              setTimeout(() => setShowToastE(false), 2000);
            }}
            className="text-md text-gray-500 hover:text-[var(--blueColor)]"
            title="Expand/Collapse"
          >
            {isExpanded ? ">🗕<" : "⛶"}
          </button>
          <button
            onClick={() => setChatOpen(false)}
            className="text-sm text-gray-500 hover:text-red-500"
            title="Close"
          >
            ✖
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {showToastE && (
        <div className="absolute top-2 right-2 bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-md shadow-lg text-xs z-50">
          {isExpanded ? "Expanded view enabled" : "Collapsed view"}
        </div>
      )}

      {/* Mode Switch */}
      <div className="flex justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800">
        <button
          onClick={() => {
            setChatMode("ai");
            setChatLog([]);
          }}
          className={`flex-1 px-3 py-2 rounded-l-md text-sm ${chatMode === "ai" ? "bg-[var(--blueColor)] text-white" : "bg-[var(--lightGrayColor)] dark:bg-[var(--grayColor)]"}`}
        >
          AI Chat 🤖
        </button>
        <button
          onClick={() => {
            setChatMode("support");
            setChatLog([]);
          }}
          className={`flex-1 px-3 py-2 rounded-r-md text-sm ${chatMode === "support" ? "bg-[var(--accentColor)] text-white" : "bg-[var(--lightGrayColor)] dark:bg-[var(--grayColor)]"}`}
        >
          Support 🧑‍💼
        </button>
      </div>

      {/* Chat Log */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 text-sm">
        {chatLog.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-4 p-6">
            {chatMode === "ai" ? "Hello, I am Tura. Ask me any question 🤖" : "Chat with our team 🧑‍💼"}
          </div>
        ) : (
          chatLog.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-[var(--primaryColor)] text-[var(--whiteColor)] self-end ml-auto text-right"
                  : msg.sender === "ai"
                  ? "bg-blue-100 dark:bg-[var(--darkBlueColor)]"
                  : msg.sender === "support"
                  ? "bg-yellow-100 dark:bg-yellow-800"
                  : "bg-red-100 dark:bg-red-800"
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-300 dark:border-[var(--grayColor)] flex gap-2">
        <textarea
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type your message..."
          rows={1}
          className="flex-grow resize-none p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]"
        />
        <button
          onClick={async () => {
            if (!chatInput.trim()) return;
            const userMessage = { sender: "user", text: chatInput };
            setChatLog((prev) => [...prev, userMessage]);
            setChatInput("");

            if (chatMode === "ai") {
              const aiReply = await getOpenAIResponse(chatInput);
              setChatLog((prev) => [...prev, { sender: "ai", text: aiReply }]);
            } else {
              const supportReply = { sender: "support", text: "Thanks! Our team will reply shortly." };
              setChatLog((prev) => [...prev, supportReply]);
            }
          }}
          className="bg-[var(--accentColor)] text-[var(--whiteColor)] px-4 py-2 rounded-md hover:bg-[var(--primaryColor)] transition"
        >
          Send
        </button>
      </div>
    </div>
  )}
</div>



  </div>
);
};

export default Nav;
