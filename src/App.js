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
import Confirmation from "./Pages/Confirmation/Confirmation";
import SwitchForm from "./Pages/SwitchForm/SwitchForm";
import BookingSuccess from "./Pages/BookingSuccess/BookingSuccess";

function App() {
  document.title = "2GO BOOKING";
  document.body.style = "background: white;";

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SwitchForm />} />
        </Routes>      
        <Routes>
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>  
        <Routes>
          <Route path="/success" element={<BookingSuccess />} />
        </Routes>        
      </Router>
    </div>
  );
}

export default App;
