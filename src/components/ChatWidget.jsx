import { useState, useEffect, useRef } from "react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState("ai");
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState(() => {
    const saved = localStorage.getItem("turtura-chat");
    return saved ? JSON.parse(saved) : [];
  });
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning ☀️";
    if (hour < 18) return "Good afternoon 👋";
    return "Good evening 🌙";
  };

  const toggleChat = () => setIsOpen(!isOpen);

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;
    const userMessage = { sender: "user", text: chatInput };
    setChatLog((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);

    if (chatMode === "ai") {
      setTimeout(() => {
        const aiResponse = { sender: "ai", text: `You said: "${chatInput}"` };
        setChatLog((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1000);
    } else {
      try {
        await fetch("https://your-support-api.com/message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: chatInput }),
        });
        const supportResponse = { sender: "support", text: "Support team will reply shortly." };
        setTimeout(() => {
          setChatLog((prev) => [...prev, supportResponse]);
          setIsTyping(false);
        }, 1000);
      } catch {
        const errorResponse = { sender: "system", text: "Failed to reach support. Try again later." };
        setChatLog((prev) => [...prev, errorResponse]);
        setIsTyping(false);
      }
    }
  };

  const clearChat = () => {
    setChatLog([]);
    localStorage.removeItem("turtura-chat");
  };

  useEffect(() => {
    localStorage.setItem("turtura-chat", JSON.stringify(chatLog));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-30 bg-[var(--accentColor)] text-white p-4 rounded-full shadow-xl hover:bg-[var(--primaryColor)] transition-all duration-300"
        title="Chat with us"
      >
        {isOpen ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.84L3 20l1.4-3.6A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[clamp(280px,90vw,360px)] max-h-[75vh] bg-[var(--whiteColor)] dark:bg-[var(--bgColor)] text-[var(--textColor)] shadow-2xl rounded-xl flex flex-col overflow-hidden border border-[var(--lightGrayColor)] dark:border-[var(--darkGrayColor)] transition-all duration-500 ${
          isOpen ? "animate-slideUp opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 h-16 bg-[var(--primaryColor)] text-white inter-500">
          <div className="flex items-center gap-3">
            {chatMode === "support" && (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src="https://randomuser.me/api/portraits/women/65.jpg"
                    alt="Support Agent"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.84L3 20l1.4-3.6A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            )}
            <span>{chatMode === "ai" ? "Ask Turtura AI" : "Live Support"}</span>
          </div>
          <div className="flex items-center gap-2">
            {["ai", "support"].map((mode) => (
              <button
                key={mode}
                onClick={() => setChatMode(mode)}
                className={`text-xs px-3 py-1 rounded-full transition-all duration-300 shadow-sm border ${
                  chatMode === mode
                    ? "bg-[var(--whiteColor)] text-[var(--primaryColor)] border-[var(--primaryColor)] dark:bg-[var(--bgColor)]"
                    : "bg-transparent text-white border-white hover:bg-[var(--accentColor)]"
                }`}
              >
                {mode === "ai" ? "AI" : "Support"}
              </button>
            ))}
            <button
              onClick={clearChat}
              className="text-xs p-2 rounded-full bg-transparent border border-white text-white hover:bg-white hover:text-[var(--primaryColor)] transition"
              title="Clear chat"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 7h12M9 7v10m6-10v10M4 7h16l-1 12H5L4 7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 py-3 space-y-2 overflow-y-auto text-sm bg-[var(--bgColor)] dark:bg-[var(--backgroundColor)]">
          {chatLog.length === 0 && (
            <div className="text-center text-[var(--grayColor)] italic py-6">{getGreeting()}</div>
          )}
          {chatLog.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-md max-w-[80%] shadow-sm ${
                msg.sender === "user"
                  ? "ml-auto bg-[var(--accentColor)] text-white"
                  :                 msg.sender === "ai"
                  ? "bg-[var(--lightGrayColor)] dark:bg-[var(--darkGrayColor)] text-[var(--textColor)]"
                  : "bg-[var(--alertColor)] text-[var(--blackColor)]"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="text-xs italic text-[var(--grayColor)]">Typing…</div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-4 bg-[var(--whiteColor)] dark:bg-[var(--bgColor)] border-t border-[var(--lightGrayColor)] dark:border-[var(--darkGrayColor)]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
              placeholder="Ask us anything…"
              className="flex-1 px-4 py-2 text-sm rounded-full bg-[var(--bgColor)] dark:bg-[var(--backgroundColor)] text-[var(--textColor)] outline-none shadow-sm"
            />
            <button
              onClick={handleChatSubmit}
              className="px-3 py-2 rounded-full bg-[var(--primaryColor)] text-white hover:bg-[var(--accentColor)] transition"
              title="Send"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
