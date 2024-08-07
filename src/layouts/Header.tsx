import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 shadow-md fixed w-full z-10 md:relative">
      <div className="flex items-center">
        <img
          src="/src/assets/images/Logo.png"
          alt="Logo"
          className="h-10 w-10 mr-2"
        />
        <h1 className="text-2xl font-bold">HRMS Dashboard</h1>
      </div>
      <div className="flex items-center">
        <div className="mr-4 hidden md:block">
          <p className="text-sm">Welcome,</p>
          <p className="text-lg font-semibold">John Doe</p> {/* Replace with dynamic user name */}
        </div>
        <img
          src="/src/assets/images/ProfilePic.png"
          alt="User Profile"
          className="h-10 w-10 rounded-full border-2 border-white"
        />
      </div>
    </header>
  );
};

export default Header;
