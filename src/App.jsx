import Navbar from "./component/Navbar";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <div className="bg-gray-900 min-h-screen">
        <Outlet />
      </div>
    </>
  );
}

export default App;
