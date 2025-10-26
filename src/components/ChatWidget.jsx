import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState("ai");
  const [chatInput, setChatInput] = useState("");
  const [chatLogAI, setChatLogAI] = useState(() => {
    const saved = localStorage.getItem("turtura-chat-ai");
    return saved ? JSON.parse(saved) : [];
  });
  const [chatLogSupport, setChatLogSupport] = useState(() => {
    const saved = localStorage.getItem("turtura-chat-support");
    return saved ? JSON.parse(saved) : [];
  });
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatEndRef = useRef(null);

  const activeLog = chatMode === "ai" ? chatLogAI : chatLogSupport;
  const setActiveLog = chatMode === "ai" ? setChatLogAI : setChatLogSupport;

  const toggleChat = () => setIsOpen(!isOpen);

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;
    const userMessage = { sender: "user", text: chatInput };
    setActiveLog((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);

    if (chatMode === "ai") {
      setTimeout(() => {
        const aiResponse = { sender: "ai", text: `You said: "${chatInput}"` };
        setChatLogAI((prev) => [...prev, aiResponse]);
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
          setChatLogSupport((prev) => [...prev, supportResponse]);
          setIsTyping(false);
        }, 1000);
      } catch {
        const errorResponse = { sender: "system", text: "Failed to reach support. Try again later." };
        setChatLogSupport((prev) => [...prev, errorResponse]);
        setIsTyping(false);
      }
    }
  };

  const clearChat = () => {
    if (chatMode === "ai") {
      setChatLogAI([]);
      localStorage.removeItem("turtura-chat-ai");
    } else {
      setChatLogSupport([]);
      localStorage.removeItem("turtura-chat-support");
    }
  };

  const handleEmojiClick = (emojiData) => {
    setChatInput((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    localStorage.setItem("turtura-chat-ai", JSON.stringify(chatLogAI));
    localStorage.setItem("turtura-chat-support", JSON.stringify(chatLogSupport));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLogAI, chatLogSupport]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning ☀️";
    if (hour < 18) return "Good afternoon 👋";
    return "Good evening 🌙";
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-30 bg-[var(--accentColor)] text-white p-4 rounded-full shadow-xl hover:bg-[var(--primaryColor)] transition-all duration-300"
        title="Chat with us"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.84L3 20l1.4-3.6A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[clamp(280px,90vw,360px)] max-h-[75vh] bg-white dark:bg-[var(--bgColor)] text-[var(--textColor)] shadow-2xl rounded-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 h-14 bg-[var(--primaryColor)] text-white">
          <div className="flex items-center gap-2">
            {chatMode === "support" ? (
              <div className="relative">
                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Support" className="w-8 h-8 rounded-full" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
            ) : (
              <span className="text-xl">🤖</span>
            )}
            <span className="font-semibold">
              {chatMode === "ai" ? "Ask Turtura AI" : "Live Support"}
            </span>
          </div>
          <div className="flex gap-2">
            {["ai", "support"].map((mode) => (
              <button
                key={mode}
                onClick={() => setChatMode(mode)}
                className={`text-xs px-3 py-1 rounded-full ${
                  chatMode === mode
                    ? "bg-white text-[var(--primaryColor)]"
                    : "bg-transparent border border-white text-white"
                }`}
              >
                {mode === "ai" ? "AI" : "Support"}
              </button>
            ))}
            <button
              onClick={clearChat}
              className="text-xs p-2 rounded-full border border-white text-white hover:bg-white hover:text-[var(--primaryColor)] transition"
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
          {activeLog.length === 0 && (
            <div className="text-center text-[var(--grayColor)] italic py-6">
              {getGreeting()}
              <br />
              {chatMode === "ai"
                ? "I'm Tura, ask me anything 🤖"
                : "We’ll attend to you shortly 👩‍💼"}
            </div>
          )}
          {activeLog.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-md rounded-br-none max-w-[80%] shadow-sm ${
                msg.sender === "user"
                  ? "ml-auto bg-[var(--accentColor)] text-white"
                  : msg.sender === "ai"
                  ? " dark:bg-gray-700 text-[var(--textColor)]"
                  : msg.sender === "support"
                  ? "bg-yellow-100 text-black"
                  : "bg-red-100 text-black"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
                        <div className="flex items-center gap-2 text-sm text-[var(--grayColor)]">
              <span className="animate-pulse">💬</span>
              <span className="animate-pulse">Typing...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 bg-[var(--backgroundColor)] border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-xl bg-[var(--accentColor)] px-2 py-1 rounded-md text-white hover:bg-[var(--primaryColor)] transition"
              title="Insert emoji"
            >
              😊
            </button>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
              placeholder="Type a message…"
              className="flex-1 px-4 py-2 text-sm rounded-md bg-[var(--lightGrayColor)] text-[var(--darkGrayColor)] outline-none"
            />
            <button
              onClick={handleChatSubmit}
              className="px-3 py-2 rounded-md bg-[var(--primaryColor)] text-white hover:bg-[var(--accentColor)] transition"
              title="Send"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {showEmojiPicker && (
            <div className="mt-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
