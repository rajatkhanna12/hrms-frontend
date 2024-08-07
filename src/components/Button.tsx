import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className = '',
  onClick,
  disabled = false,
  label=''

}) => {
  return (
    <button
      type={type}
      className={clsx(
        "w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300",
        className,
        { 'opacity-50 cursor-not-allowed': disabled }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
