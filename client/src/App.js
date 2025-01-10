import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import SignInForm from "./components/SignInForm";
import Home from "./components/Home";
import SearchFlights from "./components/SearchFlights";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/searchflights" element={<SearchFlights />} />
      </Routes>
    </Router>
  );
};

export default App;
