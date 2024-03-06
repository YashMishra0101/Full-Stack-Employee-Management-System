import React, { useState } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import fireDB from "../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddEmployeePerformance = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [note, setNote] = useState("");

  const handleAddNote = async () => {
    if (!employeeId.trim() || !note.trim() || !employeeName.trim()) {
      toast.error("Please provide employee ID, name, and note");
      return;
    }

    try {
      // Check if employee ID and name match
      const q = query(
        collection(fireDB, "employees"),
        where("employeeUniqueid", "==", employeeId),
        where("employeeName", "==", employeeName)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        toast.error("Employee ID and Name do not match");
        return;
      }

      // Add note to Firebase
      await addDoc(collection(fireDB, "notes"), {
        employeeId,
        employeeName,
        note,
        timestamp: new Date().toISOString(),
      });
      toast.success("Note added successfully");
      navigate("/performancenotes"); // Navigate to performance notes page
    } catch (error) {
      console.error("Error adding note: ", error);
      toast.error("Error adding note");
    }
  };

  const handleViewNotes = () => {
    navigate("/performancenotes"); // Navigate to performance notes page
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8 relative top-3 text-white">
        Add Note
      </h1>
      <div className="bg-gray-900 text-white flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-center text-gray-500 mb-6">
            Employee Performance
          </h2>
          <div className="mb-4">
            <label htmlFor="employeeName" className="block mb-1">
              Employee Name
            </label>
            <input
              type="text"
              id="employeeName"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="employeeId" className="block mb-1">
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="note" className="block mb-1">
              Note
            </label>
            <textarea
              id="note"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <button
            onClick={handleAddNote}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 mb-4"
          >
            Add Note
          </button>
          <button
            onClick={handleViewNotes}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
          >
            View Employee Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeePerformance;
