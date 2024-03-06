import React from "react";
import App from "./App.jsx";
import "./index.css";
import ReactDOM from "react-dom/client";
import Adminlogin from "./Pages/Adminlogin.jsx";
import AddEmployeePage from "./Pages/AddEmployeePage.jsx";
import EmployeesDetailsPage from "./Pages/EmployeesDetailsPage.jsx";
import HomePage from "./Pages/Home.jsx";
import EditEmployeePage from "./Pages/EditEmployeePage.jsx";
import EmployeeLogin from "./Pages/EmployeeLogin.jsx";
import EmployeeLogout from "./Pages/EmployeeLogout.jsx";
import LoginLogoutData from "./Pages/LoginLogoutData.jsx";
import EmployeeDataPage from "./Pages/EmployeePage .jsx";
import AddEmployeePerformance from "./Pages/AddEmployeePerformance.jsx";
import Performancenotes from "./Pages/Performancenotes.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import { ProtectedRoute } from "./protectRoute/ProtectedRoute.jsx";
import { store } from "./redux/store.jsx";
import { Provider } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="adminlogin" element={<Adminlogin />} />

      <Route
        path="employeeinfo"
        element={
          <ProtectedRoute>
            <AddEmployeePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="employeedetails"
        element={
          <ProtectedRoute>
            <EmployeesDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editEmployeePage/:id"
        element={
          <ProtectedRoute>
            <EditEmployeePage />
          </ProtectedRoute>
        }
      />
      <Route path="employeeLogin" element={<EmployeeLogin />} />
      <Route path="employeeLogout" element={<EmployeeLogout />} />
      <Route path="loginlogoutdata" element={<LoginLogoutData />} />
      <Route path="employeeDataPage" element={<EmployeeDataPage />} />
      <Route path="resetPassword" element={<ResetPassword/>} />
      <Route
        path="addemployeeperformance"
        element={
          <ProtectedRoute>
            <AddEmployeePerformance />
          </ProtectedRoute>
        }
      />
      <Route path="performancenotes" element={<Performancenotes />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster position="top-center" />
  </Provider>
);
