import React from "react";

const NavBar = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-lg">Your Website</div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Login
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Logout
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
