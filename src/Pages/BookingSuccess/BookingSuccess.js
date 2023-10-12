import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"
import { Navigate } from "react-router-dom"

import "./BookingSuccess.css"
import { refreshPage } from "../../Helpers/Utils/Common"

function BookingSuccess({ navigation, transactionDetails, generalDetails, transactionID }) {
  const navigateto = useNavigate()
  const [redirect, setRedirect] = useState("")
  if (redirect === "new") {
    setTimeout(() => {
      navigateto("/")
      refreshPage()
    }, 1000)
  }

  console.log("transactionDetails", transactionDetails)
  console.log("generalDetails", generalDetails)

  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        
        <div className="container form-cont">
          <h3 className="header justify-content-center title mt-3" style={{textAlign:"-webkit-center"}}>
            BOOKING SUCCESSFUL!
          </h3>
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h3 className="header title mt-3 grey">
                TRANSACTION ID:{" "}
                <span style={{ color: "var(--primary-color)" }}>
                  {transactionID}
                </span>
              </h3>
            </div>
            <div className="col-12  text-center">
              <span>
                Please go to your nearest 2GO outlet to make the payment.
              </span>
            </div>
          </div>

          <div className="row justify-content-center mt-5">
            <div className="col-sm-2">
              <button
                className="btn-pink btn-rad"
                onClick={() => navigateto("/")}
                style={{width:"100%"}}
              >
                {" "}
                New Transaction{" "}
              </button>
              {/* onClick={()=>navigation.previous()} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingSuccess
