import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSeeAllEmployee = () => {
    // Redirect to the page to see all employee info
    navigate("/employeedetails");
  };

  const handleAddEmployee = () => {
    // Redirect to the page to add employee details
    navigate("/employeeinfo");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center select-none">
      <h1 className="text-3xl mt-6 md:-mt-6 sm:text-5xl font-bold mb-8 sm:mb-20 text-center">
        Employee Management System
      </h1>
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
        {/* Rectangle box for "See All Employee Info" */}
        <div
          className="bg-gray-800 sm:w-64 w-72 h-64 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-gray-700 transition duration-300"
          onClick={handleSeeAllEmployee}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            See All Employees
          </h2>
          <button className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 sm:px-8 sm:py-4">
            View
          </button>
        </div>
        {/* Rectangle box for "Add Employee Details" */}
        <div
          className="bg-gray-800 w-full sm:w-64 h-64 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-gray-700 transition duration-300"
          onClick={handleAddEmployee}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Add Employee Details
          </h2>
          <button className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-6 py-3 sm:px-8 sm:py-4">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
