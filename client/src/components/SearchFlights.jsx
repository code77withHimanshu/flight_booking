// SearchFlights.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";  // Import useLocation
import axios from "axios";
import Navbar from "./Navbar";

const SearchFlights = () => {
  const location = useLocation();  // Get state from location
  const { dep_iata, arr_iata, date } = location.state || {};  // Destructure state

  const [flightResults, setFlightResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = "ec64b1e2b5567abde13fad8cefabde99"; // Replace with your API key
  console.log("Departure IATA:", dep_iata);

  useEffect(() => {
    const fetchFlights = async () => {
      if (!dep_iata || !arr_iata || !date) return; // Don't fetch if missing data

      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${dep_iata}&arr_iata=${arr_iata}&date=${date}`
        );
        setFlightResults(response.data.data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [dep_iata, arr_iata, date]);

  return (
    <div>
      <Navbar />
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Flight Results</h2>
        {loading ? (
          <p>Loading...</p>
        ) : flightResults.length > 0 ? (
          <ul>
            {flightResults.map((flight) => (
              <li key={flight.flight_id} className="border-b py-4">
                <div>{flight.flight_name}</div>
                <div>Departure: {flight.departure.airport} - {flight.departure.iata}</div>
                <div>Arrival: {flight.arrival.airport} - {flight.arrival.iata}</div>
                <div>Departure Time: {flight.departure.estimated}</div>
                <div>Flight: {flight.flight.codeshared?.airline_name} - {flight.flight.codeshared?.flight_iata}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No flights found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchFlights;
