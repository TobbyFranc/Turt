import React, { useState, useEffect } from "react";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  error,
}) => {
  const [status, setStatus] = useState(""); // focus, typing, success

  useEffect(() => {
    if (error) {
      setStatus("error");
    } else if (value && !error) {
      setStatus("success");
    }
  }, [value, error]);

  const handleFocus = () => setStatus("focus");

  const handleInput = (e) => {
    onChange(e);
    setStatus("typing");
  };

  const getClasses = () => {
    const base =
      "w-full px-4 py-3 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none transition";
    const border = {
      default: "border border-gray-300 dark:border-gray-600",
      focus: "focus:ring-2 focus:ring-blue-500",
      typing: "border-orange-500",
      error: "border-red-500",
      success: "border-green-500",
    };
    const statusClass = error
      ? border.error
      : border[status] || "";
    return `${base} ${border.default} ${statusClass} ${border.focus}`;
  };

  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleInput}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={getClasses()}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
