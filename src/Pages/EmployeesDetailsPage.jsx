import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import fireDB from "../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const EmployeesDetailsPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "employees"));
        const employeeData = [];
        querySnapshot.forEach((doc) => {
          employeeData.push({ id: doc.id, ...doc.data() });
        });
        setEmployees(employeeData);
      } catch (error) {
        console.error("Error fetching employees: ", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear("user");
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (employeeId) => {
    try {
      await deleteDoc(doc(fireDB, "employees", employeeId));

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== employeeId)
      );
      toast.success("Employee Deleted Successfully");
    } catch (error) {
      console.error("Error deleting employee: ", error);
      toast.error("Error Deleting Employee");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen px-4">
      <div className="container mx-auto ">
        <h1 className="text-3xl font-bold text-center pt-3 select-none cursor-pointer">
          All Employee Details
        </h1>

        <div className="flex w-full mt-4 justify-between mb-3">
          <div>
            <form className="mx-auto">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <IoIosSearch className="text-xl" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm  border  rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none"
                  placeholder="Search Employee Name"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </form>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleLogout}
              className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
          {employees
            .filter(
              (employee) =>
                employee.employeeName &&
                employee.employeeName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )
            .map((employee) => (
              <div
                key={employee.id}
                className="bg-gray-800 rounded-lg border border-gray-800 pr-2 pl-3 pb-1 pt-1 shadow-lg transition hover:border-blue-600 hover:shadow-blue-500 cursor-pointer  hover:shadow-md"
              >
                <h2 className="text-2xl font-semibold mb-3">
                  {employee.employeeName}
                </h2>
                <p className="text-gray-400 mb-2">Gender: {employee.gender}</p>
                <p className="text-gray-400 mb-2">
                  Employee Post:{" "}
                  <span className="text-gray-300">{employee.employeePost}</span>
                </p>
                <p className="text-gray-400 mb-2">
                  Contact Number:{" "}
                  <span className="text-gray-300">
                    {employee.contactNumber}
                  </span>
                </p>
                <p className="text-gray-400 mb-2">
                  Email id:{" "}
                  <span className="text-gray-300">{employee.emailid}</span>
                </p>
                <p className="text-gray-400 mb-2">
                  Aadhaar Number:{" "}
                  <span className="text-gray-300">
                    {employee.aadhaarNumber}
                  </span>
                </p>
                <p className="text-gray-400 mb-2">
                  PAN Number:{" "}
                  <span className="text-gray-300">{employee.panNumber}</span>{" "}
                </p>
                <p className="text-gray-400 mb-2">
                  Bank Name:{" "}
                  <span className="text-gray-300">{employee.bankName}</span>{" "}
                </p>
                <p className="text-gray-400 mb-2">
                  Bank Branch:{" "}
                  <span className="text-gray-300"> {employee.bankBranch}</span>
                </p>
                <p className="text-gray-400 mb-2">
                  IFC Code:{" "}
                  <span className="text-gray-300">{employee.ifccode}</span>{" "}
                </p>
                <p className="text-gray-400 mb-2">
                  Account Number:{" "}
                  <span className="text-gray-300">
                    {employee.accountNumber}
                  </span>{" "}
                </p>
                <p className="text-gray-400 mb-2">
                  Address:{" "}
                  <span className="text-gray-300">{employee.address}</span>{" "}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Delete
                  </button>
                  <Link to={`/editEmployeePage/${employee.id}`}>
                    <button className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeesDetailsPage;
