import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Counting from "./components/Counting";
import Counting2 from "./components/Counting2";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
          <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/counting" element={<Counting />} />
                <Route
                    path="/counting2"
                    element={<Counting2 />}
                />
            </Routes>
      </Router>
    </div>
  );
}

export default App;