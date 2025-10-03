import React, { useState } from "react";
import axios from "axios";
import Turt from "../assets/Tuur.png";

const ChatRoom = () => {
  const [chatMode, setChatMode] = useState("ai"); // 'ai' or 'support'
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { sender: "user", text: chatInput };
    setChatLog((prev) => [...prev, userMessage]);
    setChatInput("");

    if (chatMode === "ai") {
      try {
        const res = await axios.post("http://localhost:5000/api/chat", {
          message: chatInput,
        });
        const aiReply = { sender: "ai", text: res.data.reply };
        setChatLog((prev) => [...prev, aiReply]);
      } catch (error) {
        setChatLog((prev) => [
          ...prev,
          { sender: "system", text: "AI is currently unavailable." },
        ]);
      }
    } else {
      const supportReply = {
        sender: "support",
        text: "Thanks! Our team will reply shortly.",
      };
      setChatLog((prev) => [...prev, supportReply]);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div
        className={`${
          isExpanded ? "w-[700px] h-[80vh]" : "w-[500px] max-h-[70vh]"
        } overflow-hidden bg-white dark:bg-slate-900 text-black dark:text-white rounded-xl shadow-2xl flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src="/support1.jpg"
              alt="Support 1"
              onError={(e) => (e.currentTarget.src = Turt)}
              className="w-8 h-8 rounded-full"
            />
            <img
              src="/support2.jpg"
              alt="Support 2"
              onError={(e) => (e.currentTarget.src = Turt)}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold text-sm">Support Team</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsExpanded(!isExpanded);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
              }}
              className="text-sm text-gray-500 hover:text-blue-600"
              title="Expand/Collapse"
            >
              {isExpanded ? "🗕" : "⛶"}
            </button>
            <button
              onClick={() => {
                setChatLog([]);
                setChatInput("");
              }}
              className="text-sm text-gray-500 hover:text-red-500"
              title="Clear Chat"
            >
              ✖
            </button>
          </div>
        </div>

        {/* Toast */}
        {showToast && (
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
            className={`flex-1 px-3 py-2 rounded-md text-sm ${
              chatMode === "ai"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            AI Chat 🤖
          </button>
          <button
            onClick={() => {
              setChatMode("support");
              setChatLog([]);
            }}
            className={`flex-1 px-3 py-2 rounded-md text-sm ${
              chatMode === "support"
                ? "bg-yellow-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            Support 🧑‍💼
          </button>
        </div>

        {/* Chat Log */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 text-sm">
          {chatLog.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
              {chatMode === "ai"
                ? "Ask me any question 🤖"
                : "Chat with our team 🧑‍💼"}
            </div>
          ) : (
            chatLog.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white self-end ml-auto text-right"
                    : msg.sender === "ai"
                    ? "bg-blue-100 dark:bg-blue-800"
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
        <div className="px-4 py-3 border-t border-gray-300 dark:border-gray-700 flex gap-2">
          <textarea
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type your message..."
            rows={2}
            className="flex-grow resize-none p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleSend}
            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
