import React from "react";

const features = [
  {
    title: "🌍 Cultural Insights",
    description: "Tailored knowledge to help you understand local values, norms, and behaviors.",
    bg: "bg-indigo-100 dark:bg-indigo-900",
  },
  {
    title: "🧳 Traveler Toolkit",
    description: "Practical tips for respectful communication, gestures, and etiquette.",
    bg: "bg-green-100 dark:bg-green-900",
  },
  {
    title: "💬 Community Chatroom",
    description: "Follow local trends, ask questions, and build global connections.",
    bg: "bg-yellow-100 dark:bg-yellow-900",
  },
  {
    title: "❓ Did You Know?",
    description: "Daily cultural trivia to spark curiosity and deepen awareness.",
    bg: "bg-pink-100 dark:bg-pink-900",
  },
  {
    title: "🎮 Games & Quizzes",
    description: "Test your cultural fluency and earn badges for respectful travel.",
    bg: "bg-blue-100 dark:bg-blue-900",
  },
  {
    title: "🚨 SOS Support",
    description: "Urgent cultural help and safety guidance when you need it most.",
    bg: "bg-red-100 dark:bg-red-900",
  },
  {
    title: "📅 Cultural Calendar",
    description: "Discover holidays, festivals, and rituals happening around the world.",
    bg: "bg-purple-100 dark:bg-purple-900",
  },
  {
    title: "🌱 Impact Tracker",
    description: "See how your travel supports local communities and sustainability.",
    bg: "bg-teal-100 dark:bg-teal-900",
  },
];

const FeaturePanel = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {features.map((feature, index) => (
        <div key={index} className={`${feature.bg} p-6 rounded-xl shadow-md hover:shadow-lg transition`}>
          <h3 className="text-xl font-bold text-[var(--primaryColor)] mb-2">{feature.title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturePanel;
