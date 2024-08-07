import React from "react";
import { cn } from "../utils";

interface TextInputProps {
  label?: string;
  id?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string | number | any;
  required?: boolean;
  className?: string;
  labelStyle?:string;
  inputStyle?:string;
  placeholder?:string;
  name?:string;
}

const TextInput: React.FC<TextInputProps> = ({
  label = "",
  labelStyle='',
  id = "",
  value = "",
  onChange,
  type = "",
  required = false,
  inputStyle = "",
  className="",
  placeholder="",
  name=""
}) => {
  return (
    <div className={cn("flex flex-col",className)}>
      <label
        htmlFor={id}
        className={cn("block text-sm font-medium text-gray-600",labelStyle)}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={cn("mt-1 block w-full border border-gray-300 p-3 rounded-md	shadow-sm focus:ring-blue-500 focus:border-blue-500",inputStyle)}
        aria-required={required}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

export default TextInput;
