import React, { useEffect, useState } from "react";

//css
import "../Navbar/Navbar.css";
import logo from "../../Assets/Images/Form/formlogo.png"

function Navbar() {
    return(
        <div>
            <nav class="navbar navbar-expand-lg navbar-light pink">
                <img className="login-logo" src={logo}/>
                {/* <a class="navbar-brand" href="#">Navbar</a> */}
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
               
            </nav>
        </div>

        //NAVBAR WITH BUTTON (DOESN'T TOGGLE)
        // <nav class ="navbar navbar-expand-xl navbar-dark bg-dark">
        //     <a class ="navbar-brand" href ="#"> Website Name </a>
        //     <button class ="navbar-toggler" type ="button" data-toggle ="collapse" data-target ="#colNav">
        //         <span class ="navbar-toggler-icon"></span>
        //     </button>
        //     <div class ="collapse navbar-collapse" id ="colNav">
        //         <ul class ="navbar-nav">
        //             <li class ="nav-item">
        //                 <a class ="nav-link" href="#"> Services </a>
        //             </li>
        //             <li class ="nav-item">
        //                 <a class ="nav-link" href ="#"> About Us</a>
        //             </li>
        //             <li class ="nav-item">
        //                 <a class ="nav-link" href ="#"> Contact Us </a>
        //             </li>
        //         </ul>
        //     </div>
        // </nav>

    );
};
export default Navbar;
