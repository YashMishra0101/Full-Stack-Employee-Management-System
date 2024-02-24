// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import fireDB from "../firebase/FirebaseConfig";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const EmployeeDataPage = () => {
//   const [employeeData, setEmployeeData] = useState([]);
//   const [filterCriteria, setFilterCriteria] = useState("All");
//   const [selectedMonth, setSelectedMonth] = useState(new Date());
//   const [employeeId, setEmployeeId] = useState("");

//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       try {
//         const dataSnapshot = await getDocs(collection(fireDB, "dayhalfdaydata"));
//         const data = dataSnapshot.docs.map((doc) => doc.data());

//         let filteredData = data.filter((item) => {
//           if (filterCriteria === "All") {
//             return true;
//           } else if (filterCriteria === "Leave") {
//             return item.workDuration === "Leave";
//           } else if (filterCriteria === "Full Day") {
//             return item.workDuration === "Full Day";
//           } else if (filterCriteria === "Half Day") {
//             return item.workDuration === "Half Day";
//           }
//         });

//         if (selectedMonth) {
//           const selectedMonthData = filteredData.filter((item) => {
//             const loginMonth = new Date(item.loginTime).getMonth() + 1;
//             const selectedMonthValue = selectedMonth.getMonth() + 1;
//             return loginMonth === selectedMonthValue;
//           });
//           filteredData = selectedMonthData;
//         }

//         if (employeeId !== "") {
//           filteredData = filteredData.filter(
//             (item) => item.employeeId === employeeId
//           );
//         }

//         setEmployeeData(filteredData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchEmployeeData();
//   }, [filterCriteria, selectedMonth, employeeId]);

//   const handleFilterChange = (e) => {
//     setFilterCriteria(e.target.value);
//   };

//   const handleMonthChange = (date) => {
//     setSelectedMonth(date);
//   };

//   const handleEmployeeIdChange = (e) => {
//     setEmployeeId(e.target.value);
//   };

//   const renderRows = () => {
//     if (employeeData.length === 0) {
//       return (
//         <tr>
//           <td colSpan="3" className="text-center text-red-300 font-bold pt-10">
//             <span className="py-5 border-2 flex justify-center items-center rounded-lg bg-red-50 text-red-400">
//             Data not available for selected criteria
//             </span></td>
//         </tr>
//       );
//     }
    
//     return employeeData.map((employee, index) => (
//       <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
//         <td className="border px-4 py-2">{employee.employeeName}</td>
//         <td className="border px-4 py-2">{employee.employeeId}</td>
//         <td className="border px-4 py-2">{employee.workDuration}</td>
//       </tr>
//     ));
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center text-white mb-16">
//         Employee Data
//       </h1>
//       <div className="flex flex-wrap justify-between mb-4">
//         <div className="w-full md:w-1/4 mb-4 md:mb-0">
//           <label className="block text-gray-500 text-sm font-bold mb-2">Filter by:</label>
//           <select
//             value={filterCriteria}
//             onChange={handleFilterChange}
//             className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
//           >
//             <option value="All">All</option>
//             <option value="Leave">Leave</option>
//             <option value="Full Day">Full Day</option>
//             <option value="Half Day">Half Day</option>
//           </select>
//         </div>
//         <div className="w-full md:w-1/4 mb-4 md:mb-0">
//           <label className="block text-gray-500 text-sm font-bold mb-2">Select Month:</label>
//           <DatePicker
//             selected={selectedMonth}
//             onChange={handleMonthChange}
//             dateFormat="MM/yyyy"
//             showMonthYearPicker
//             className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
//           />
//         </div>
//         <div className="w-full md:w-1/4">
//           <label className="block text-gray-500 text-sm font-bold mb-2">Filter by Employee ID:</label>
//           <input
//             type="text"
//             value={employeeId}
//             onChange={handleEmployeeIdChange}
//             placeholder="Enter Employee ID"
//             className="w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
//           />
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full text-left">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700">Employee Name</th>
//               <th className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700">Employee ID</th>
//               <th className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700">Work Duration</th>
//             </tr>
//           </thead>
//           <tbody>{renderRows()}</tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDataPage;


import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import fireDB from "../firebase/FirebaseConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EmployeeDataPage = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const dataSnapshot = await getDocs(collection(fireDB, "dayhalfdaydata"));
        const data = dataSnapshot.docs.map((doc) => doc.data());

        let filteredData = data.filter((item) => {
          if (filterCriteria === "All") {
            return true;
          } else if (filterCriteria === "Leave") {
            return item.workDuration === "Leave";
          } else if (filterCriteria === "Full Day") {
            return item.workDuration === "Full Day";
          } else if (filterCriteria === "Half Day") {
            return item.workDuration === "Half Day";
          }
        });

        if (selectedMonth) {
          const selectedMonthData = filteredData.filter((item) => {
            const loginMonth = new Date(item.loginTime).getMonth() + 1;
            const selectedMonthValue = selectedMonth.getMonth() + 1;
            return loginMonth === selectedMonthValue;
          });
          filteredData = selectedMonthData;
        }

        if (employeeId !== "") {
          filteredData = filteredData.filter(
            (item) => item.employeeId === employeeId
          );
        }

        setEmployeeData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEmployeeData();
  }, [filterCriteria, selectedMonth, employeeId]);

  const handleFilterChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const calculateTotalCounts = () => {
    let totalHalfDay = 0;
    let totalFullDay = 0;
    let totalLeave = 0;

    employeeData.forEach((employee) => {
      if (employee.workDuration === 'Half Day') {
        totalHalfDay++;
      } else if (employee.workDuration === 'Full Day') {
        totalFullDay++;
      } else if (employee.workDuration === 'Leave') {
        totalLeave++;
      }
    });

    return { totalHalfDay, totalFullDay, totalLeave };
  };

  const renderTotalCountsCard = () => {
    const { totalHalfDay, totalFullDay, totalLeave } = calculateTotalCounts();




  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md mb-8 mt-10">
      <h2 className="text-xl font-semibold mb-4 text-white">Total Counts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 cursor-pointer">
        <div className="border border-gray-300 p-4 text-center rounded-md hover:bg-gray-800 transition duration-300">
          <h3 className="font-semibold mb-2 text-white">Half Day</h3>
          <p className="text-gray-300">{totalHalfDay}</p>
        </div>
        <div className="border border-gray-300 p-4 text-center rounded-md hover:bg-gray-800 transition duration-300">
          <h3 className="font-semibold mb-2 text-white">Full Day</h3>
          <p className="text-gray-300">{totalFullDay}</p>
        </div>
        <div className="border border-gray-300 p-4 text-center rounded-md hover:bg-gray-800 transition duration-300">
          <h3 className="font-semibold mb-2 text-white">Leave</h3>
          <p className="text-gray-300">{totalLeave}</p>
        </div>
      </div>
    </div>
  );
  };  

  const renderRows = () => {
    if (employeeData.length === 0) {
      return (
        <tr>
          <td colSpan="3" className="text-center text-red-300 font-bold pt-10">
            <span className="py-5 border-2 flex justify-center items-center rounded-lg bg-red-50 text-red-400">
            Data not available for selected criteria
            </span></td>
        </tr>
      );
    }

    return employeeData.map((employee, index) => (
      <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
        <td className="border px-4 py-2">{employee.employeeName}</td>
        <td className="border px-4 py-2">{employee.employeeId}</td>
        <td className="border px-4 py-2">{employee.workDuration}</td>
      </tr>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-white mb-16">
        Employee Data
      </h1>
      <div className="flex flex-wrap justify-between mb-4">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <label className="block text-gray-500 text-sm font-bold mb-2">Filter by:</label>
          <select
            value={filterCriteria}
            onChange={handleFilterChange}
            className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          >
            <option value="All">All</option>
            <option value="Leave">Leave</option>
            <option value="Full Day">Full Day</option>
            <option value="Half Day">Half Day</option>
          </select>
        </div>
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <label className="block text-gray-500 text-sm font-bold mb-2">Select Month:</label>
          <DatePicker
            selected={selectedMonth}
            onChange={handleMonthChange}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          />
        </div>
        <div className="w-full md:w-1/4">
          <label className="block text-gray-500 text-sm font-bold mb-2">Filter by Employee ID:</label>
          <input
            type="text"
            value={employeeId}
            onChange={handleEmployeeIdChange}
            placeholder="Enter Employee ID"
            className="w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700">Employee Name</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700">Employee ID</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700">Work Duration</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </div>
      {employeeId && renderTotalCountsCard()}
    </div>
  );
};

export default EmployeeDataPage;
