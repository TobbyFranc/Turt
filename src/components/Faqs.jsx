// src/components/Faqs.jsx
import React, { useState } from "react";
import { faqs } from "./faqData";
import FaqItem from "./FaqItem";
import ChatBox from './ChatBox'

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="FAQS" className="px-4 py-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-12 cormorant-garamond-400 text-[var(--textColor)]">
        <h3 className="text-4xl md:text-5xl font-bold font-cormorant capitalize">
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
        <h3 className="text-2xl font-bold mb-4 text-[var(--textColor)] text-center">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              index={index}
              openIndex={openIndex}
              toggle={toggleAccordion}
            />
          ))}
        </div>

        {/* Chat Trigger */}
        <div className="text-center mt-6">
          <button
            className="px-6 py-3 bg-[var(--primaryColor)] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setShowChat((prev) => !prev)}
          >
            More questions? Ask Tura
          </button>
        </div>

        {/* Chatbox */}
        {showChat && <ChatBox />}
      </div>
    </section>
  );
};

export default Faqs;
