import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { collection, getDocs, query, where } from "firebase/firestore";
import fireDB from "../firebase/FirebaseConfig";

const LoginPage = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  const handleLogin = async () => {
    const trimmedEmployeeId = employeeId.trim();
    const trimmedEmployeeName = employeeName.trim();
  
    if (trimmedEmployeeId === "" || trimmedEmployeeName === "") {
      toast.error("Please enter both Employee ID and name");
      return;
    }
  
    try {
      const q = query(
        collection(fireDB, "employees"),
        where("employeeUniqueid", "==", trimmedEmployeeId),
        where("employeeName", "==", trimmedEmployeeName)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        toast.error("Invalid Employee ID or name");
        return;
      }
      // If employee ID and name match, redirect to employee details page
      navigate("/employeesdetails");
    } catch (error) {
      console.error("Error logging in: ", error);
      toast.error("Failed to login. Please try again.");
    }
  };
  

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
      {/* Your UI code */}
      <div className="md:w-96 bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-5">Employee Login Page 😀</h1>
        <div className="mb-4">
          <label
            htmlFor="employename"
            className="block text-sm font-medium mb-2"
          >
            Employee Name
          </label>
          <input
            type="text"
            id="employename"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="w-full bg-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="employeeId"
            className="block text-sm font-medium mb-2"
          >
            Employee ID
          </label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full bg-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Employee ID"
            required
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full -mb-16 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
