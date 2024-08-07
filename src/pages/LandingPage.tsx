import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 text-white overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-black opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-bold mb-6">Welcome to HRMS</h1>
          <p className="text-xl mb-8">
            Manage your HR tasks efficiently and effectively.
          </p>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-gray-200 transition duration-300"
          >
            Get Started
          </Link>
        </motion.div>
        <motion.div
          className="absolute bottom-0 right-0 w-full h-full"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <svg
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 1024 1024"
            stroke="currentColor"
          >
            <path d="M0 512l512 512L1024 512 512 0 0 512z" />
          </svg>
        </motion.div>
      </div>
    </>
  );
};

export default LandingPage;
