import React, { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//images

//PAGES
import Login from "./Pages/Login/Login";
import InternationalForm from "./Pages/International/InternationalForm";

function App() {
  document.title = "2GO BOOKING";
  document.body.style = "background: #F3F3F3;";

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<InternationalForm />} />
        </Routes>           
      </Router>
    </div>
  );
}

export default App;
