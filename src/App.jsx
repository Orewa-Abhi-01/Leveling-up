import React from "react";
import WelcomePage from "./pages/WelcomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/dashboard" element={<Homepage />} />
      </Routes>
    </Router>
  );
};

export default App;
