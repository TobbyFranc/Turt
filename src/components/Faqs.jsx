import { useRef, useEffect, useState } from "react";

const faqs = [
  {
    question: "What is Turtura?",
    answer:
      "Turtura connects travelers with authentic cultural experiences worldwide, offering real-time cultural alerts and local insights for respectful and safe travel.",
  },
  {
    question: "How does Turtura work?",
    answer:
      "Turtura provides real-time cultural alerts, local insights, and community engagement. Users explore experiences, connect with locals, and stay updated on cultural norms.",
  },
  {
    question: "Is Turtura available worldwide?",
    answer:
      "While Turtural is a global concept, we are currently capturing National Youth Service Corps (NYSC) members and everyday travellers within Nigeria.",
  },
  // {
  //   question: "Is Turtura available worldwide?",
  //   answer:
  //     "Yes, Turtura is a global platform offering cultural experiences and insights across the world.",
  // },
  {
    question: "How can I join Turtura?",
    answer:
      "Sign up on our website or download the mobile app. Create an account to start exploring and receiving alerts.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [typingIdx, setTypingIdx] = useState(null);
  const chatEndRef = useRef(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const typeWriter = (text, setter, cb) => {
    setter("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setter((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
        if (cb) cb();
      }
    }, 40);
  };

  const handleSend = async () => {
    if (!chatInput.trim()) return;
    setLoading(true);
    const userMessage = { sender: "user", text: chatInput };
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:5050/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput }),
      });
      const data = await res.json();
      const aiText = data.choices?.[0]?.message?.content || "Sorry, I couldn't answer that.";
      setTypingIdx(chatHistory.length + 1);
      typeWriter(aiText, setTypedText, () => setTypingIdx(null));
      setChatHistory((prev) => [...prev, { sender: "ai", text: aiText }]);
    } catch {
      const errorMsg = "Error contacting AI.";
      setTypingIdx(chatHistory.length + 1);
      typeWriter(errorMsg, setTypedText, () => setTypingIdx(null));
      setChatHistory((prev) => [...prev, { sender: "ai", text: errorMsg }]);
    }

    setChatInput("");
    setLoading(false);
  };

  useEffect(() => {
    if (!typingIdx && chatEndRef.current) {
      const timeout = setTimeout(() => {
        chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [chatHistory, typingIdx]);

  return (
    <div id="FAQS" className="px-4 py-12 ">
      {/* Header */}
      <div className="text-center space-y-4 mb-12 cormorant-garamond-400 text-[var(--textColor)] ">
        <h3 className="text-2xl md:text-4xl xl:text-6xl font-bold font-cormorant capitalize">
          Have some questions?
        </h3>
        <p>We're here to help! Explore our FAQs or chat with TuraAI for more info.</p>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto">
        <hr className="my-8 border-[var(--lightGraycolor)] text-[var(--grayColor)]" />
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto p-6 bg-[var(--bgColor)] shadow-lg rounded-lg space-y-6">
        <h3 className="text-2xl font-bold mb-4 text-[var(--textColor)] text-center">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-[var(--textColor)] rounded-lg">
              <button
                className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-[var(--primaryColor)]">{faq.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 text-[var(--textColor)] transform transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="p-4 border-t border-[var(--grayColor)]" id={`faq-answer-${index}`}>
                  <p className="text-[var(--textColor)]">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chat Trigger */}
        <div className="text-center mt-6">
          <button
            className="px-6 py-3 bg-[var(--primaryColor)] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setShowChat(true)}
          >
            More questions? Ask Tura
          </button>
        </div>

        {/* Chatbox */}
        {showChat && (
          <div className="mt-6 p-4 border border-[var(--lightGrayColor)] rounded-lg">
            <h5 className="text-lg text-[var(--textColor)] font-medium mb-4 text-center">Turtura AI Chatbox</h5>
            <div className="bg-[var(--whiteColor)] p-4 rounded-lg h-64 overflow-y-auto scroll-smooth">
              {chatHistory.length === 0 && (
                <p className="text-[var(--grayColor)]">Hi, I'm Tura. <br /> Ask me anything about Turtura!</p>
              )}
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                  <span className={`border-2 p-2 bg-[var(--lightrayColor)] rounded-xl inline-block max-w-xs break-words ${
                    msg.sender === "user" ? "bg-[var(--lightrayColor)] text-white" : "bg-green-500/90 text-white"
                  }`}>
                    {msg.sender === "ai" && idx === chatHistory.length - 1 && typingIdx === idx
                      ? typedText
                      : msg.text}
                  </span>
                </div>
              ))}
              {loading && <p className="text-gray-400">Thinking...</p>}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="flex mt-4 space-x-2">
              <input
                type="text"
                placeholder="Type your question here..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={loading}
              />
              <button
                className="px-4 py-2 bg-[var(--primaryColor)] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleSend}
                disabled={loading}
              >
                Send
              </button>
            </div>

            {/* Chat Controls */}
            <div className="text-center mt-4 space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={() => setShowChat(false)}
              >
                Close Chatbox
              </button>
              <button
                                className="px-4 py-2 bg-red-200 text-red-700 rounded-md hover:bg-red-300"
                onClick={() => {
                  setChatHistory([]);
                  setTypedText("");
                  setTypingIdx(null);
                }}
              >
                Clear Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Faqs;
