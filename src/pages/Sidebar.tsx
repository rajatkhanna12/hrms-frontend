import React from "react";
import { Link } from "react-router-dom";
import AddEmployeeIcon from "../assets/icon/AddEmployeeIcon";
import ReportEmployeeIcon from "../assets/icon/ReportEmployeeIcon";
import ProfileIcon from "../assets/icon/ProfileIcon";
import LogoutIcon from "../assets/icon/LogoutIcon";
import AttendanceIcon from "../assets/icon/AttendanceIcon";
import WorkDiaryIcon from "../assets/icon/WorkDiaryIcon";

const options = [
  { id: 1, label: "Add Employee", icon: <AddEmployeeIcon />, onClick: "add" },
  {
    id: 2,
    label: "Report Employee",
    icon: <ReportEmployeeIcon />,
    onClick: "report",
  },
  {
    id: 3,
    label: "Attendance",
    icon: <AttendanceIcon />,
    onClick: "attendance",
  },
  { id: 4, label: "Work Diary", icon: <WorkDiaryIcon />, onClick: "workDiary" },
  { id: 5, label: "Profile", icon: <ProfileIcon />, onClick: "profile" },
  { id: 6, label: "Logout", icon: <LogoutIcon />, onClick: "/" },
];

interface SidebarProps {
  activeSection: "add" | "report" | "attendance" | "profile" | "workDiary";
  onSectionChange: (
    section: "add" | "report" | "attendance" | "profile" | "workDiary"
  ) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  return (
    <div className="w-64 h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 shadow-lg">
      <div className="flex items-center mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="h-12 w-12 mr-2 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <h2 className="text-3xl font-bold">HRMS</h2>
      </div>
      <ul>
        {options.map((option) => (
          <li key={option.id} className="mb-4">
            {option.label !== "Logout" ? (
              <button
                onClick={() =>
                  onSectionChange(
                    option.onClick as
                      | "add"
                      | "report"
                      | "attendance"
                      | "profile"
                      | "workDiary"
                  )
                }
                className={`flex items-center w-full text-left px-4 py-2 rounded-lg transition-colors duration-200
                  ${
                    option.onClick === activeSection
                      ? "bg-blue-700 text-white"
                      : "hover:bg-blue-600"
                  }`}
              >
                {option.icon}
                <span className="ml-3 text-lg font-medium">{option.label}</span>
              </button>
            ) : (
              <Link
                to={option.onClick}
                className="flex items-center w-full text-left px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                {option.icon}
                <span className="ml-3 text-lg font-medium">{option.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
