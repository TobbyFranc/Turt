// src/components/FaqItem.jsx
import React from "react";

const FaqItem = ({ faq, index, openIndex, toggle }) => {
  const isOpen = openIndex === index;

  return (
    <article className="border border-[var(--textColor)] rounded-lg">
      <button
        className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
        onClick={() => toggle(index)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-medium text-[var(--primaryColor)]">{faq.question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 text-[var(--textColor)] transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 border-t border-[var(--grayColor)]" id={`faq-answer-${index}`}>
          <p className="text-[var(--textColor)]">{faq.answer}</p>
        </div>
      )}
    </article>
  );
};

export default FaqItem;
