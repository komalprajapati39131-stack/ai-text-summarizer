import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import Alert from "./components/Alert";
import About from "./components/About";

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#0F172A";
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
    }
  };

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <BrowserRouter>
      {/* Navbar always visible */}
      <Navbar
        title="TextUtils"
        mode={mode}
        toggleMode={toggleMode}
      />

      {/* Alert always visible */}
      <Alert alert={alert} />

      <div className="container my-3">

        <Routes>

          {/* Home Route */}
          <Route
            path="/"
            element={
              <Textform
                heading="Enter the text to analyze here"
                mode={mode}
                showAlert={showAlert}
              />
            }
          />

          {/* About Route */}
          <Route
            path="/about"
            element={<About mode={mode} />}
          />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;