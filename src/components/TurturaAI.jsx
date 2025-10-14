import React, { useState } from "react";

const TurturaAI = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", text: "Here's something helpful from Turtura AI." }]);
    }, 500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-[var(--primaryColor)]">Turtura AI Assistant</h2>
        <button
          onClick={() => setOpen(!open)}
          className="text-sm text-[var(--accentColor)] hover:underline"
        >
          {open ? "Hide Chat" : "Open Chat"}
        </button>
      </div>
      {open && (
        <div className="space-y-2">
          <div className="h-40 overflow-y-auto bg-gray-50 dark:bg-gray-700 p-2 rounded">
            {messages.map((msg, i) => (
              <div key={i} className={`text-sm ${msg.role === "user" ? "text-right text-[var(--primaryColor)]" : "text-left text-gray-600 dark:text-gray-300"}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600"
              placeholder="Ask Turtura AI..."
            />
            <button
              onClick={handleSend}
              className="bg-[var(--accentColor)] text-white px-4 py-2 rounded hover:opacity-90"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TurturaAI;
