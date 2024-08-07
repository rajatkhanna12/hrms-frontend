import React, { FC } from "react";

const ProfileIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-6 w-6 mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2a6 6 0 016 6v4.5h-3.75V9a2.25 2.25 0 00-4.5 0v3.5H6V8a6 6 0 016-6zM9.75 15.5h4.5v6H9.75v-6z"
      />
    </svg>
  );
};

export default ProfileIcon;
