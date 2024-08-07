import React from 'react';

const AttendanceIcon: React.FC = () => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="h-6 w-6 mr-2"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="12"
      y1="16"
      x2="12"
      y2="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="8"
      y1="12"
      x2="16"
      y2="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  
);

export default AttendanceIcon;
