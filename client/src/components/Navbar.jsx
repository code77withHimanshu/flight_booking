import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white sticky top-0 z-10 shadow-md">
      <div className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-2xl font-bold">Flight Booking</div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li className="hover:text-gray-200 cursor-pointer">Home</li>
          <li className="hover:text-gray-200 cursor-pointer">Booked Flights</li>
          <li className="hover:text-gray-200 cursor-pointer">About</li>
          <li className="hover:text-gray-200 cursor-pointer">Contact</li>
        </ul>

        {/* Search Input */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-md text-black border border-gray-300"
          />
          <button className="p-2 bg-blue-700 rounded-md hover:bg-blue-800">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
