import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import fireDB from "../../firebase/FirebaseConfig";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const querySnapshot = await getDocs(collection(fireDB, "employees"));
    const employees = [];
    querySnapshot.forEach((doc) => {
      employees.push({ id: doc.id, ...doc.data() });
    });
    return employees;
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employeeDetails) => {
    const docRef = await addDoc(
      collection(fireDB, "employees"),
      employeeDetails
    );
    return { ...employeeDetails, id: docRef.id };
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (employeeId) => {
    await deleteDoc(doc(fireDB, "employees", employeeId));
    return employeeId;
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, employeeDetails }) => {
    await updateDoc(doc(fireDB, "employees", id), employeeDetails);
    return { id, employeeDetails };
  }
);

const initialState = {
  employees: [],
  status: "idle",
  error: null,
};

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const { id, employeeDetails } = action.payload;
        const index = state.employees.findIndex(
          (employee) => employee.id === id
        );
        if (index !== -1) {
          state.employees[index] = {
            ...state.employees[index],
            ...employeeDetails,
          };
        }
      });
  },
});

export default employeeSlice.reducer;
