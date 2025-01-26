"use client";
import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  className = "",
}) => {
  const toggleCheckbox = () => {
    const newValue = !checked;
    onChange?.(newValue);
  };

  return (
    <div
      onClick={toggleCheckbox}
      className={`cursor-pointer ${className}`}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ padding: "2px" }}
      >
        <rect
          width="20"
          height="20"
          rx="2"
          fill={checked ? "#6E6E6E" : "none"}
          stroke="#6E6E6E"
          strokeWidth="2"
          x="2"
          y="2"
        />
        {checked && (
          <path
            d="M7 12L10.5 16L17 7"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
};

export default Checkbox;
