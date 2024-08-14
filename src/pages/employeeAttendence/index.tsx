import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useApiActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { toast, ToastContainer } from "react-toastify";

const EmployeeAttendance: React.FC = () => {
  const { saveAttendance , getAttendance } = useApiActions();
  const { userId } = useTypedSelector((state) => state.auth);
  const { loading } = useTypedSelector((state) => state.saveAttendance);

  useEffect(() => {
    getAttendance({userId})
  }, []);

  const handlePunchIn = async () => {
    const currentDateTime = new Date();
    try {
      const response = await saveAttendance({
        userId,
        punchIn: currentDateTime,
        punchOut: currentDateTime,
      });
      // alert("Punch In Successful: " + JSON.stringify(response));
      if (response?.isError) {
        toast.error("Punch In Failed: " + response.message);
      } else {
        toast.success("Punch In Successful!");
      }
    } catch (error) {
      console.error("Punch In failed", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handlePunchOut = async () => {
    const currentDateTime = new Date();
    try {
      const response = await saveAttendance({
        userId,
        punchIn: currentDateTime,
        punchOut: currentDateTime,
      });
      if (response?.isError) {
        toast.error("Punch Out Failed: " + response.message);
      } else {
        toast.success("Punch Out Successful!");
      }
    } catch (error) {
      console.error("Punch Out failed", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-gray-50 w-full p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-500">
        Employee Attendance
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl mb-4 text-gray-500 font-bold text-center">
          Punch In/Punch Out
        </h3>

        <div className="flex flex-col gap-10">
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              label="Punch In"
              onClick={handlePunchIn}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2"
            />
            <Button
              type="button"
              label="Punch Out"
              onClick={handlePunchOut}
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Employee ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Punch In
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Punch Out
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Work Hours
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* {attendanceData.length > 0 ? (
              attendanceData.map((entry:any) => (
                <tr key={entry.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {entry.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {entry.employeeUserID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {entry.punchIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {entry.punchOut || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {entry.totalWorkHours || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No attendance records available
                </td>
              </tr>
            )} */}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmployeeAttendance;
