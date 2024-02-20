// import React from "react";
// import { useNavigate } from "react-router-dom";

// const HomePage = () => {
//   const navigate = useNavigate();

//   const handleSeeAllEmployee = () => {
//     // Redirect to the page to see all employee info
//     navigate("/employeedetails");
//   };

//   const handleAddEmployee = () => {
//     // Redirect to the page to add employee details
//     navigate("/employeeinfo");
//   };

//   return (
//     <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center select-none">
//       <h1 className="text-3xl mt-6 md:-mt-6 sm:text-5xl font-bold mb-8 sm:mb-20 text-center">
//         Employee Management System
//       </h1>
//       <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
//         {/* Rectangle box for "See All Employee Info" */}
//         <div
//           className="bg-gray-800 sm:w-64 w-72 h-64 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-gray-700 transition duration-300"
//           onClick={handleSeeAllEmployee}
//         >
//           <h2 className="text-lg sm:text-xl font-semibold mb-4">
//             See All Employees
//           </h2>
//           <button className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 sm:px-8 sm:py-4">
//             View
//           </button>
//         </div>
//         {/* Rectangle box for "Add Employee Details" */}
//         <div
//           className="bg-gray-800 w-full sm:w-64 h-64 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-gray-700 transition duration-300"
//           onClick={handleAddEmployee}
//         >
//           <h2 className="text-lg sm:text-xl font-semibold mb-4">
//             Add Employee Details
//           </h2>
//           <button className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-6 py-3 sm:px-8 sm:py-4">
//             Add
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
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
    navigate("/employeelogin");
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

  return (
    <div className="bg-gray-900 text-white min-h-screen w-[100%] flex flex-col justify-center items-center select-none ">
      {!isAdminLoggedIn && (
        <button
          className="absolute top-4 right-4 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-6 py-3 mt-[8rem] md:mt-0 "
          onClick={handleLoginClick}
        >
          Login
        </button>
      )}
      {isAdminLoggedIn && (
        <button
          className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-6 py-3 mt-[8rem] md:mt-0"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      )}

      <h1 className="text-center text-3xl font-bold cursor-pointer select-none mt-12 md:mt-0">
        <img src={logo} width="200" alt="" className="-mb-10 -mt-28" />
      </h1>
      <div className="text-sm text-gray-500 mb-4 -mt-6 hover:text-gray-300 cursor-pointer select-none">
        TECHNOLOGY AND SERVICES PRIVATE LIMITED
      </div>
      <h1 className="text-3xl  sm:text-5xl font-bold sm:mb-20 text-center md:mb-12 mb-5">
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
          <button className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-6 py-3 sm:px-8 sm:py-4">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
