import React, { useState, useEffect } from "react";
import "./App.css";
import Counting from "./components/Counting";

function App() {
  const [message, setMessage] = useState("Bruh");

  useEffect(() => {
    fetch("http://localhost:9000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
      <Counting />
    </div>
  );
}

export default App;