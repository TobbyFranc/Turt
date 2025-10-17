import React, { useState } from "react";
import InputField from "./InputField";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const StepOne = ({ data, updateForm, nextStep }) => {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateAll = () => {
    const newErrors = {};
    if (!data.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!data.password) {
      newErrors.password = "Password is required.";
    } else if (!isPasswordValid()) {
      newErrors.password = "Password does not meet all requirements.";
    }
    return newErrors;
  };

  const isPasswordValid = () => {
    return (
      data.password.length >= 8 &&
      /[A-Z]/.test(data.password) &&
      /[a-z]/.test(data.password) &&
      /[0-9]/.test(data.password) &&
      /[^A-Za-z0-9]/.test(data.password)
    );
  };

  const handleNext = () => {
    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      nextStep();
    }
  };

  const passwordRules = [
    {
      label: "At least 8 characters",
      valid: data.password.length >= 8,
    },
    {
      label: "At least one uppercase letter",
      valid: /[A-Z]/.test(data.password),
    },
    {
      label: "At least one lowercase letter",
      valid: /[a-z]/.test(data.password),
    },
    {
      label: "At least one number",
      valid: /[0-9]/.test(data.password),
    },
    {
      label: "At least one special character",
      valid: /[^A-Za-z0-9]/.test(data.password),
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Full Name */}
      <InputField
        label="Full Name *"
        name="fullName"
        value={data.fullName}
        placeholder="e.g. Tobi Adeyemi"
        onChange={handleChange}
        error={errors.fullName}
      />

      {/* Email Address */}
      <InputField
        label="Email Address *"
        name="email"
        type="email"
        value={data.email}
        placeholder="you@example.com"
        onChange={handleChange}
        error={errors.email}
      />

      {/* Password Field with Toggle and Rules */}
      <div className="space-y-1 relative">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="••••••••"
          className={`w-full px-4 py-3 rounded-md border ${
            errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] transition`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-[38px] text-gray-500 hover:text-[var(--primaryColor)]"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}

        {/* Password Rules */}
        <ul className="mt-2 space-y-1 text-sm">
          {passwordRules.map((rule, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 ${
                rule.valid ? "text-green-600" : "text-red-500"
              }`}
            >
              {rule.valid ? <FaCheckCircle size={14} /> : <FaTimesCircle size={14} />}
              {rule.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={handleNext}
          disabled={!isPasswordValid()}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition ${
            isPasswordValid()
              ? "text-[var(--primaryColor)] border border-[var(--primaryColor)] hover:bg-[var(--primaryColor)] hover:text-white"
              : "text-gray-400 border border-gray-300 cursor-not-allowed"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default StepOne;
