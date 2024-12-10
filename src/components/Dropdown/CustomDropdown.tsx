import React, { FC, useState } from "react";
import "./CustomDropdown.css";

export interface Option {
  value: string | number;
  label: string;
}

interface CustomDropdownProps {
  label: string;
  options: Option[];
  value: string | number;
  onChange: (value: string|number) => void;
}

const CustomDropdown: FC<CustomDropdownProps> = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (optionValue: string|number) => {
    onChange(optionValue);
    setIsOpen(false); 
  };

  return (
    <div className="custom-dropdown-container">
      <label className="input-label">{label}</label>
      <div className="dropdown-box" onClick={toggleDropdown}>
        {value || `Select ${label}`}
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-option"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
