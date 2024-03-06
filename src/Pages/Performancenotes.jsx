// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import fireDB from "../firebase/FirebaseConfig";

// const Performancenotes = () => {
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(fireDB, "notes"));
//         const noteData = [];
//         querySnapshot.forEach((doc) => {
//           noteData.push({ id: doc.id, ...doc.data() });
//         });
//         setNotes(noteData);
//       } catch (error) {
//         console.error("Error fetching notes: ", error);
//       }
//     };
//     fetchNotes();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//     <h1 className="text-3xl font-bold text-center mb-8 text-white">Employee Performance Feedback</h1>
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {notes.map((note) => (
//         <div key={note.id} className="bg-gray-800 rounded-lg border border-gray-900 p-4 shadow-lg">
//           <h2 className="text-xl text-white font-bold mb-4">{note.employeeName}</h2>
//           <p className="text-gray-400 font-bold mb-2">Employee ID: <span className="text-gray-100 font-normal">{note.employeeId}</span></p>
//           <p className="text-gray-400 font-bold mb-2">Feedback: <span className="text-gray-100 font-normal">{note.note}</span></p>
//         </div>
//       ))}
//     </div>
//   </div>
  

//   );
// };

// export default Performancenotes;



import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import fireDB from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Performancenotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "notes"));
        const noteData = [];
        querySnapshot.forEach((doc) => {
          noteData.push({ id: doc.id, ...doc.data() });
        });
        setNotes(noteData);
      } catch (error) {
        console.error("Error fetching notes: ", error);
      }
    };
    fetchNotes();
  }, []);

  const handleDeleteNote = async (id) => {
    try {
      await deleteDoc(doc(fireDB, "notes", id));
      setNotes(notes.filter((note) => note.id !== id));
      toast.success("Note deleted successfully.");
    } catch (error) {
      console.error("Error deleting note: ", error);
      toast.error("Failed to delete note.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Employee Performance Feedback</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-gray-800 rounded-lg border border-gray-900 p-4 shadow-lg relative">
            <h2 className="text-xl text-white font-bold mb-4">{note.employeeName}</h2>
            <p className="text-gray-400 font-bold mb-2">Employee ID: <span className="text-gray-100 font-normal">{note.employeeId}</span></p>
            <p className="text-gray-400 font-bold mb-4">Feedback: <span className="text-gray-100 font-normal">{note.note}</span></p>
            <div className="flex justify-end">
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Performancenotes;
