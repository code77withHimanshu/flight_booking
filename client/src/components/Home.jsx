import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Import the Navbar
import { useNavigate } from "react-router-dom";
import { airports } from './Airports.js';

const Home = () => {
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
  });

  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Filter airport suggestions from the local airports data
  const fetchAirportSuggestions = (query, type) => {
    if (query.length < 3) {
      if (type === 'departure') {
        setDepartureSuggestions([]);
      } else {
        setDestinationSuggestions([]);
      }
      return;
    }

    // Filter airports based on the query
    const filteredAirports = airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(query.toLowerCase()) ||
        airport.iata.toLowerCase().includes(query.toLowerCase())
    );

    if (type === 'departure') {
      setDepartureSuggestions(filteredAirports);
    } else {
      setDestinationSuggestions(filteredAirports);
    }
  };

  // Debounced search for departure and destination inputs
  useEffect(() => {
    if (formData.departure) {
      const timeoutId = setTimeout(() => {
        fetchAirportSuggestions(formData.departure, 'departure');
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [formData.departure]);

  useEffect(() => {
    if (formData.destination) {
      const timeoutId = setTimeout(() => {
        fetchAirportSuggestions(formData.destination, 'destination');
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [formData.destination]);

  const handleSearch = () => {
    console.log('Searching for flights:', formData);
    const { departure, destination, departureDate } = formData;
    // Add logic to search flights
    // navigate("/searchflights", { state: formData });
    navigate("/searchflights", {
        state: {
            dep_iata: departure,  // Set the departure IATA code
            arr_iata: destination, // Set the destination IATA code
            date: departureDate,   // Set the departure date
        },
    });
  };

  return (
    <>
      <Navbar /> {/* Add the Navbar */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Book Your Flight
          </h1>
          <form className="space-y-6">
            <div>
              <label htmlFor="departure" className="block text-sm font-medium text-gray-700">
                Departure
              </label>
              <input
                type="text"
                id="departure"
                name="departure"
                value={formData.departure}
                onChange={handleChange}
                placeholder="Departure"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {departureSuggestions.length > 0 && (
                <ul className="mt-2 bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
                  {departureSuggestions.map((airport, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => setFormData({ ...formData, departure: `${airport.iata}` })}
                    >
                      {airport.name} - {airport.iata}
                    </li>
                  ))}
                </ul>
              )}
              {loading && formData.departure.length >= 3 && <p>Loading...</p>}
            </div>
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                Destination
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Destination"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {destinationSuggestions.length > 0 && (
                <ul className="mt-2 bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
                  {destinationSuggestions.map((airport, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => setFormData({ ...formData, destination: `${airport.iata}` })}
                    >
                      {airport.name} - {airport.iata}
                    </li>
                  ))}
                </ul>
              )}
              {loading && formData.destination.length >= 3 && <p>Loading...</p>}
            </div>
            <div>
              <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">
                Departure Date
              </label>
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">
                Return Date
              </label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">
                Passengers
              </label>
              <select
                id="passengers"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1} Passenger{num > 0 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition shadow-md"
            >
              Search Flights
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
