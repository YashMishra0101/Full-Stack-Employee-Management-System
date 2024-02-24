import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAdminLoggedIn(true);
    } else {
      setIsAdminLoggedIn(false);
    }
  }, []);

  const handleSeeAllEmployee = () => {
    navigate("/employeedetails");
  };

  const handleAddEmployee = () => {
    navigate("/employeeinfo");
  };

  const handleEmployeeLogin = () => {
    navigate("/employeelogin");
  };

  const handleEmployeeLogout = () => {
    navigate("/employeelogout");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    setIsAdminLoggedIn(false);
    navigate("/");
    toast.success("Logout Successful", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
      iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
      },
    });
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSeeLoginLogoutData = () => {
    navigate("/loginlogoutdata");
  };

  const handleEmployeeDataPage = () => {
    navigate("/employeeDataPage");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center select-none relative">
      {!isAdminLoggedIn ? (
        <button
          className="absolute top-4 right-4 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-6 py-3 mt-10 md:mt-0"
          onClick={handleLoginClick}
        >
          Login
        </button>
      ) : (
        <button
          className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-6 py-3 mt-10 md:mt-0"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      )}

      <h1 className="text-center text-3xl font-bold cursor-pointer select-none mt-12">
        <img src={logo} width="200" alt="" className="-mb-10 -mt-28" />
      </h1>
      <div className="text-sm text-gray-500 mb-4 -mt-6 hover:text-gray-300 cursor-pointer select-none">
        TECHNOLOGY AND SERVICES PRIVATE LIMITED
      </div>
      <h1 className="text-3xl sm:text-5xl font-bold sm:mb-20 text-center md:mb-12 mb-5">
        Employee Management System
      </h1>
      <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
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
          className="bg-gray-800 sm:w-64 w-72 h-64 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-gray-700 transition duration-300"
          onClick={handleAddEmployee}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Add Employee Details
          </h2>
          <button className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-6 py-3 sm:px-8 sm:py-4">
            Add
          </button>
        </div>
        {/* Rectangle box for "Employee Login" */}
        <div
          className="bg-gray-800 sm:w-64 w-72 h-64 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-gray-700 transition duration-300"
          onClick={handleEmployeeLogin}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Employee Login
          </h2>
          <button className="text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-6 py-3 sm:px-8 sm:py-4">
            Login
          </button>
        </div>
        {/* Rectangle box for "Employee Logout" */}
        <div
          className="bg-gray-800 sm:w-64 w-72 h-64 mb-6 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-gray-700 transition duration-300"
          onClick={handleEmployeeLogout}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4 ">
            Employee Logout
          </h2>
          <button className="text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-6 py-3 sm:px-8 sm:py-4">
            Logout
          </button>
        </div>
        {/* Rectangle box for "All Employee Login and Logout Data" */}
        <div
          className="bg-gray-800 sm:w-64 w-72 h-64 mb-6 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-gray-700 transition duration-300"
          onClick={handleSeeLoginLogoutData}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center px-2">
            All Employee Login and Logout Data
          </h2>
          <button className="text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-6 py-3 sm:px-8 sm:py-4">
            View
          </button>
        </div>
        {/* Rectangle box for "See Login and Logout Data In Detail" */}
        <div
          className="bg-gray-800 sm:w-64 w-72 h-64 mb-6 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-gray-700 transition duration-300"
          onClick={handleEmployeeDataPage}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center px-2">
            See Login and Logout Data In Detail
          </h2>
          <button className="text-white bg-orange-500 hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-6 py-3 sm:px-8 sm:py-4">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
