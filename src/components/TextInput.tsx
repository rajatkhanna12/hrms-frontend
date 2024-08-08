import React from "react";
import { cn } from "../utils";

interface TextInputProps {
  label?: string;
  id?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  className?: string;
  labelStyle?: string;
  inputStyle?: string;
  placeholder?: string;
  name?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string; // Error message as a string
}

const TextInput: React.FC<TextInputProps> = ({
  label = "",
  labelStyle = "",
  id = "",
  value = "",
  onChange,
  type = "text",  // Set default type to "text"
  required = false,
  inputStyle = "",
  className = "",
  placeholder = "",
  name = "",
  onBlur = () => {},
  error = "", // Receive the error message as a prop
}) => {
  return (
    <div className={cn("flex flex-col", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn("block text-sm font-medium text-gray-600", labelStyle)}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={cn(
          "mt-1 block w-full border p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
          inputStyle,
          error ? "border-red-500" : "border-gray-300"  // Highlight the border in red if there's an error
        )}
        aria-required={required}
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
