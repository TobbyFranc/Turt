import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

const MultiStepSignup = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    intent: "",
    cultures: [],
    experiences: [],
    travelStyle: "",
    accessibility: "",
    termsAgreed: false,
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const updateForm = (updates) => setFormData((prev) => ({ ...prev, ...updates }));

  const steps = [
    <StepOne data={formData} updateForm={updateForm} nextStep={nextStep} />,
    <StepTwo data={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />,
    <StepThree data={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />,
    <StepFour data={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />,
    <StepFive data={formData} updateForm={updateForm} prevStep={prevStep} />,
  ];

  const quotes = [
    "“Every journey begins with a single step.” — Lao Tzu",
    "“To travel is to live.” — Hans Christian Andersen",
    "“Culture is the widening of the mind and of the spirit.” — Nehru",
    "“Travel far enough, you meet yourself.” — David Mitchell",
    "“The world is a book, and those who do not travel read only one page.” — Augustine",
  ];

  const illustrations = [
    "/assets/undraw_adventure_re_ncqp.svg",
    "/assets/undraw_profile_data_re_v81r.svg",
    "/assets/undraw_traveling_re_weve.svg",
    "/assets/undraw_experience_design_re_dmqq.svg",
    "/assets/undraw_celebration_re_kc9k.svg",
  ];

  if (showWelcome) {
    return (
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-[var(--primaryColor)]">Welcome to Turtura</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Begin your cultural journey by telling us a little about yourself.
        </p>
        <button
          onClick={() => setShowWelcome(false)}
          className="px-6 py-3 rounded-md bg-[var(--accentColor)] text-white font-semibold hover:bg-yellow-600 transition duration-300"
        >
          Begin Journey
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={illustrations[step - 1]}
          alt="Step Illustration"
          className="w-full max-w-sm"
        />
        <p className="text-sm italic text-gray-600 dark:text-gray-400 max-w-sm text-center">
          {quotes[step - 1]}
        </p>
      </div>
      <h2 className="text-xl font-semibold text-[var(--primaryColor)] text-center">
        Step {step} of 5
      </h2>
      {steps[step - 1]}
    </div>
  );
};

export default MultiStepSignup;
