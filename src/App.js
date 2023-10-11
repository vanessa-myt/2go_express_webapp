import React, { useState } from "react"
import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"

//images

//PAGES

import Confirmation from "./Pages/Confirmation/Confirmation"
import SwitchForm from "./Pages/SwitchForm/SwitchForm"
import BookingSuccess from "./Pages/BookingSuccess/BookingSuccess"
import Dashboard from "./Pages/Dashboard/Dashboard"
import TimelineComponent from "./Pages/Timeline/TimelineComponent"

function App() {
  document.title = "2GO BOOKING"
  document.body.style = "background: white;"

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/booking" element={<SwitchForm />} />
          <Route path="/track-and-trace" element={<TimelineComponent />} />

          <Route path="/confirmation" element={<Confirmation />} />

          <Route path="/success" element={<BookingSuccess />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
