import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

//images
import logo from "../../Assets/Images/Login/logo.png";
import usericon from "../../Assets/Images/Login/user_icon.png";


function Login() {
    return(
    <div className="container container-fluid justify-content-center mt-10">
        <div className="container">
            <img className="login-logo" alt="logo" src={logo}/>
            <hr></hr>

            <div className="login-cont container">
                <h1 className="title">LOGIN</h1>
                <div className="row">
                    <div className="col d-flex justify-content-center username-cont">
                        <div class="input-group mb-3">
                        <div class="input-group-prepend icon-cont">
                            <span
                            class="input-group-text icon-text custom-border-radius"
                            id="basic-addon1"
                            >
                            <img
                                src={usericon}
                                alt="username"
                                className="username-icon"
                            />
                            </span>
                        </div>
                        <input
                            type="text"
                            class="form-control username-input input-field"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            //onChange={(e) => setUsername(e.target.value)}
                        />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    )
}

export default Login;
