import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import fireDB from "../firebase/FirebaseConfig";
import { IoIosSearch } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LoginLogoutData = ({ loggedInEmployee }) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // Fetch login and logout data
        const loginSnapshot = await getDocs(collection(fireDB, "logindata"));
        const logoutSnapshot = await getDocs(collection(fireDB, "logoutdata"));
        const loginData = loginSnapshot.docs.map((doc) => doc.data());
        const logoutData = logoutSnapshot.docs.map((doc) => doc.data());
  
        // Combine login and logout data
        const combinedData = [];
        loginData.forEach((login) => {
          const logout = logoutData.find(
            (logout) =>
              logout.employeeId === login.employeeId &&
              new Date(logout.timestamp).toDateString() ===
                new Date(login.timestamp).toDateString()
          );
          combinedData.push({
            ...login,
            logoutTime: logout ? logout.timestamp : null,
          });
        });
  
        // Set combined data state
        setEmployeeData(combinedData);
  
        // Check if logout data is available
        const hasLogoutData = combinedData.some(
          (data) => data.logoutTime !== null
        );
        if (!hasLogoutData) {
          // If logout data is absent by 7:00 PM (Indian time), send a message
          const currentTime = new Date();
          const indianTime = new Date(
            currentTime.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
          );
          if (indianTime.getHours() >= 19) {
            console.log("Logout data is not available.");
          }
          return; // Stop further execution if logout data is not available
        }
  
        // Store employee login and logout data in 'dayhalfdaydata' collection in Firebase
        const todaysDate = selectedDate.toDateString();
        const existingDataQuery = query(
          collection(fireDB, "dayhalfdaydata"),
          where("loginTime", ">=", todaysDate + "T00:00:00"),
          where("loginTime", "<=", todaysDate + "T23:59:59")
        );
        const existingDataSnapshot = await getDocs(existingDataQuery);
        const existingUserIds = new Set();
        existingDataSnapshot.forEach((doc) => {
          existingUserIds.add(doc.data().employeeId);
        });
  
        // Filter out data for users who have already been added
        const newData = combinedData.filter(
          (data) => !existingUserIds.has(data.employeeId)
        );
  
        // Save only the new data
        newData.forEach(async (data) => {
          if (data.logoutTime) {
            const workDuration = determineWorkDuration(
              data.timestamp,
              data.logoutTime
            );
            const dayHalfDayData = {
              employeeName: data.employeeName,
              employeeId: data.employeeId,
              loginTime: data.timestamp,
              logoutTime: data.logoutTime,
              workDuration: workDuration,
            };
            await addDoc(collection(fireDB, "dayhalfdaydata"), dayHalfDayData);
            existingUserIds.add(data.employeeId); // Add the user ID to the set to prevent duplicates
          }
        });
      } catch (error) {
        console.error("Error fetching and storing data: ", error);
      }
    };
  
    fetchEmployeeData();
  }, [selectedDate]);
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateTimeString).toLocaleTimeString("en-US", options);
  };

  const formatDate = (dateTimeString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateTimeString).toLocaleDateString("en-US", options);
  };

  const determineWorkDuration = (loginTime, logoutTime) => {
    const loginHour = new Date(loginTime).getHours();
    const logoutHour = new Date(logoutTime).getHours();
    const logoutMinute = new Date(logoutTime).getMinutes();

    if (
      (loginHour < 10 || (loginHour === 10 && logoutMinute <= 30)) &&
      logoutHour >= 17 &&
      logoutMinute >= 50
    ) {
      return "Full Day";
    } else {
      return "Half Day";
    }
  };

  const filteredData = employeeData.filter(
    (data) =>
      data.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      new Date(data.timestamp).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8 cursor-pointer">
        Employee Login and Logout Data
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full mt-4 mb-3">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 ">
          <form>
            <label
              htmlFor="login-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search Login Data
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IoIosSearch className="text-xl" />
              </div>
              <input
                type="search"
                id="login-search"
                className="block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none"
                placeholder="Search Employee Name"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </form>
        </div>
        <div className="w-full flex md:justify-end">
          <label
            htmlFor="date-picker"
            className="text-sm font-medium text-gray-900"
          >
            Select Date:
          </label>
          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            className="block w-full p-4 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none"
          />
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4 text-white">
        {formatDate(selectedDate)}
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800">
                Employee Name
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800">
                Employee ID
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800">
                Login Time
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800">
                Logout Time
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800">
                Work Duration
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
              >
                <td className="px-4 py-2 text-sm font-medium text-gray-100">
                  {data.employeeName}
                </td>{" "}
                <td className="px-4 py-2 text-sm font-medium text-gray-100">
                  {data.employeeId}
                </td>
                <td className="px-4 py-2 text-sm font-medium text-gray-100">
                  {formatDateTime(data.timestamp)}
                </td>
                <td className="px-4 py-2 text-sm font-medium text-gray-100">
                  {data.logoutTime ? formatDateTime(data.logoutTime) : "N/A"}
                </td>
                <td className="px-4 py-2 text-sm font-medium text-gray-100">
                  {data.logoutTime
                    ? determineWorkDuration(data.timestamp, data.logoutTime)
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoginLogoutData;
