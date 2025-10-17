import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

const MultiStepSignup = () => {
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

  const updateForm = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const steps = [
    <StepOne data={formData} updateForm={updateForm} nextStep={nextStep} />,
    <StepTwo data={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />,
    <StepThree data={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />,
    <StepFour data={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />,
    <StepFive data={formData} prevStep={prevStep} />,
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-700 px-4">
      <div className="w-full max-w-2xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-md p-8 rounded-xl shadow-xl text-gray-900 dark:text-white transition-all duration-700 ease-in-out">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[var(--primaryColor)]">Join Turtura</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Step {step} of 5</p>
        </div>
        {steps[step - 1]}
      </div>
    </div>
  );
};

export default MultiStepSignup;
