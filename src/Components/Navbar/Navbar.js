import React, { useEffect, useState } from "react"

//css
import "../Navbar/Navbar.css"
import logo from "../../Assets/Images/Form/formlogo.png"

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light pink">
        <img className="login-logo" src={logo} />
      </nav>
    </div>
  )
}
export default Navbar
