
import React, { useState, useRef, useEffect } from "react";

const ChatBox = () => {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [typingIdx, setTypingIdx] = useState(null);
  const chatEndRef = useRef(null);

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
      const aiText = data.choices?.[0]?.message?.content || `Sorry, I couldn't answer that.`;
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
    <div className="mt-6 p-4 border border-[var(--lightGrayColor)] rounded-lg">
      <h5 className="text-lg text-[var(--textColor)] font-medium inter-500 mb-4 text-center">Turtura AI Chatbox</h5>
      <div className="bg-[var(--backgroundColor)] p-4 open-sans-400 rounded-lg h-64 overflow-y-auto scroll-smooth ">
        {chatHistory.length === 0 && (
          <p className=" text-[var(--grayColor)] ">Hi, I'm Tura. <br /> Ask me anything about Turtura!</p>
        )}
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`p-2 inline-block max-w-full md:max-w-xs break-words ${
              msg.sender === "user"
                ? "bg-[var(--grayColor)] text-[var(--lightGrayColor)] rounded-l-xl rounded-tr-xl text-start "
                : "rounded-r-xl bg-[var(--backgroundColor)] text-[var(--grayColor)]"
            }`}>
              {msg.sender === "ai" && idx === chatHistory.length - 1 && typingIdx === idx
                ? typedText
                : msg.text}
            </span>
          </div>
        ))}
        {loading && <p className="text-[var(--grayColor)]">Thinking...</p>}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <div className="flex mt-4 space-x-2">
        <input
          type="text"
          aria-label="Ask Tura a question"
          placeholder="Type your question here..."
          className="w-full p-2 border border-[var(--grayColor)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightGrayColor)]"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <button
          className="px-4 py-2 bg-[var(--primaryColor)] text-[var(--whiteColor)] rounded-md hover:bg-[var(--darkBlueColor)] focus:outline-none focus:ring-2 focus:ring-[var(--blueColor)]"
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </button>
      </div>

      {/* Chat Controls */}
      <div className="text-center mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-[var(--lightGrayColor)] text-[var(--grayColor)] rounded-md hover:bg-[var(--errorColor)] hover:text-[var(--lightGrayColor)]"
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
  );
};

export default ChatBox;
