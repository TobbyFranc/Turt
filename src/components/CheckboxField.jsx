import React from "react";

const CheckboxField = ({ label, name, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-3">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e)}
        className="h-5 w-5 text-[var(--primaryColor)] border-gray-300 rounded focus:ring-[var(--primaryColor)]"
      />
      <label htmlFor={name} className="text-sm text-gray-700 dark:text-gray-300">
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
