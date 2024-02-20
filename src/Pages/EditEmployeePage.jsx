import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import fireDB from "../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditEmployeePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState({
    employeeName: "",
    gender: "",
    employeePost: "",
    contactNumber: "",
    aadhaarNumber: "",
    panNumber: "",
    bankName: "",
    bankBranch: "",
    ifccode: "",
    accountNumber: "",
    address: "",
    emailid: "",
  });
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const employeeDoc = await getDoc(doc(fireDB, "employees", id));
        if (employeeDoc.exists()) {
          setEmployeeDetails(employeeDoc.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };
    fetchEmployeeDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(fireDB, "employees", id), employeeDetails);
      toast.success("Employee details updated successfully");
      navigate("/employeedetails");
    } catch (error) {
      console.error("Error updating employee details:", error);
      toast.error("Failed to update employee details");
    }
  };

  return (
    <div>
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto py-3 px-4">
          <h1 className="mt-5 text-3xl font-extrabold text-center mb-3 text-blue-600 hover:text-blue-100 select-none cursor-pointer">
            Edit Employee Details
          </h1>
          <div className="max-w-6xl mx-auto bg-gray-800 p-6 rounded-lg mt-10 min-h-[28rem]">
            <form onSubmit={handleSubmit}>
              <div className="mb-4 grid md:grid-cols-3 gap-4 justify-items-center">
                <div>
                  <label
                    htmlFor="employeeName"
                    className="block text-sm font-medium mb-2"
                  >
                    Employee Name
                  </label>
                  <input
                    type="text"
                    id="employeeName"
                    name="employeeName"
                    value={employeeDetails.employeeName}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto"
                    placeholder="Enter employee name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="bankName"
                    className="block text-sm font-medium mb-2"
                  >
                    Bank Name
                  </label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={employeeDetails.bankName}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto"
                    placeholder="Enter bank name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium mb-2"
                  >
                    Gender
                  </label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    value={employeeDetails.gender}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto"
                    placeholder="Enter Gender"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="bankbranch"
                    className="block text-sm font-medium mb-2"
                  >
                    Bank Branch
                  </label>
                  <input
                    type="text"
                    id="bankBranch"
                    name="bankBranch"
                    value={employeeDetails.bankBranch}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto"
                    placeholder="Enter Bank Branch"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium mb-2"
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    value={employeeDetails.contactNumber}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto"
                    placeholder="Enter contact number"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="ifccode"
                    className="block text-sm font-medium mb-2"
                  >
                    IFC Code
                  </label>
                  <input
                    type="text"
                    id="ifccode"
                    name="ifccode"
                    value={employeeDetails.ifccode}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto"
                    placeholder="Enter IFC Code"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="employeePost"
                    className="block text-sm font-medium mb-2"
                  >
                    Employee Post
                  </label>
                  <input
                    type="text"
                    id="employeePost"
                    name="employeePost"
                    value={employeeDetails.employeePost}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto"
                    placeholder="Enter employee post"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="accountNumber"
                    className="block text-sm font-medium mb-2"
                  >
                    Account Number
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={employeeDetails.accountNumber}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto"
                    placeholder="Enter Account number"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="aadhaarNumber"
                    className="block text-sm font-medium mb-2"
                  >
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    id="aadhaarNumber"
                    name="aadhaarNumber"
                    value={employeeDetails.aadhaarNumber}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto"
                    placeholder="Enter Aadhaar number"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="panNumber"
                    className="block text-sm font-medium mb-2"
                  >
                    PAN Number
                  </label>
                  <input
                    type="text"
                    id="panNumber"
                    name="panNumber"
                    value={employeeDetails.panNumber}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto"
                    placeholder="Enter PAN number"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="emailid"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="emailid"
                    name="emailid"
                    value={employeeDetails.emailid}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto"
                    placeholder="Enter Email id"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium mb-2"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={employeeDetails.address}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto"
                    placeholder="Enter address"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit Updated Info
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeePage;
