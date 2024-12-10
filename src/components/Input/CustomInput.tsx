import React, { FC } from "react";
import "./CustomInput.css";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string | number;
}

const CustomInput: FC<CustomInputProps> = ({ label, value, ...props }) => {
  return (
    <div className="custom-input-container">
      <label className="input-label">{label}</label>
      <input
        type="text"
        className="input-box"
        value={value}
        {...props} 
      />
    </div>
  );
};

export default CustomInput;
