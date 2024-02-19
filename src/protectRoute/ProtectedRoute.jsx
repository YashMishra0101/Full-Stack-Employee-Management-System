// In ProtectedRoute.jsx

import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};
