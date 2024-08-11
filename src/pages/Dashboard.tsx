// import React from "react";
// import Sidebar from "./Sidebar";
// import AddEmployee from "./admin/AddEmployee";
// import ReportEmployee from "./admin/ReportEmployee";
// import EmployeeAttendance from "./Employee/EmployeeAttendance";
// import WorkDiaryPage from "./Employee/WorkDiaryPage";
// import EmployeeList from "./Employee/AddEmpList";

// const Dashboard: React.FC = () => {
//   const [currentSection, setCurrentSection] = React.useState<"add" | "report" | "attendance" | "profile"|"workDiary">("add");

//   const handleSectionChange = (section: "add" | "report" | "attendance" | "profile"|"workDiary") => {
//     setCurrentSection(section);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar
//         activeSection={currentSection}
//         onSectionChange={handleSectionChange}
//       />
//       <div className="flex-1">
//         {currentSection === "add" && <AddEmployee />}
//         {currentSection === "report" && <ReportEmployee />}
//         {currentSection === "attendance" && <EmployeeAttendance />}
//         {currentSection === "workDiary" && <WorkDiaryPage />}
//         {currentSection === "profile" && <EmployeeList />}

//         {/* Optionally add a case for "profile" */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// Dashboard.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import AddEmployee from './addEmployee';
import ReportEmployee from './ReportEmployee';
import EmployeeAttendance from './Employee/EmployeeAttendance';
import WorkDiaryPage from './Employee/WorkDiaryPage';

import { RootState } from '../store/store'; 
import { setActiveSection } from '../store/dashboard/sidebarSlice';
import EmployeeList from './Employee/AddEmpList';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const currentSection = useSelector((state: RootState) => state.sidebar.activeSection);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeSection={currentSection}
        onSectionChange={(section) => dispatch(setActiveSection(section))}
      />
      <div className="flex-1">
        {currentSection === 'add' && <AddEmployee />}
        {currentSection === 'report' && <ReportEmployee />}
        {currentSection === 'attendance' && <EmployeeAttendance />}
        {currentSection === 'workDiary' && <WorkDiaryPage />}
        {currentSection === 'profile' && <EmployeeList />}
      </div>
    </div>
  );
};

export default Dashboard;


