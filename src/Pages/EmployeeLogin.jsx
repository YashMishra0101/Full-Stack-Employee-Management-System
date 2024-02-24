import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import fireDB from "../firebase/FirebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import logo from "../assets/logo.png";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "employees"));
        const fetchedEmployees = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEmployees(fetchedEmployees);
      } catch (error) {
        console.error("Error fetching employees: ", error);
        toast.error("Error fetching employees");
      }
    };

    fetchEmployees();
  }, []);

  const handleLogin = async () => {
    try {
      if (!employeeName || !employeeId) {
        throw new Error("Please enter both name and ID");
      }

      const foundEmployee = employees.find(
        (item) =>
          item.employeeName === employeeName &&
          item.employeeUniqueid === employeeId
      );

      if (!foundEmployee) {
        throw new Error("Invalid Name or Id");
      }

      toast.success("Login Successful");

      await addDoc(collection(fireDB, "logindata"), {
        action: "login",
        employeeName: foundEmployee.employeeName,
        employeeId: foundEmployee.employeeUniqueid,
        timestamp: new Date().toISOString(),
      });

      navigate("/loginlogoutdata");
    } catch (error) {
      console.error("Error handling login: ", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
      <h1 className="text-center text-3xl font-bold cursor-pointer select-none -mt-20">
        <img src={logo} width="200" alt="" className="-mb-10" />
      </h1>
      <div className="text-sm text-gray-500 mb-4 -mt-6 hover:text-gray-300 cursor-pointer select-none">
        TECHNOLOGY AND SERVICES PRIVATE LIMITED
      </div>
      <div className="md:w-96 bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-5">
          Employee Login Page 😀
        </h1>
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default EmployeeLogin;
