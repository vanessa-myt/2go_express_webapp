import React, {useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar'
import { Navigate } from 'react-router-dom';

import "./BookingSuccess.css"
import { refreshPage } from '../../Helpers/Utils/Common';

function BookingSuccess() {
    const navigate = useNavigate()
    const [redirect, setRedirect] = useState("");
    if(redirect === "new") {
        setTimeout(() => {
            navigate("/")
            refreshPage();
          },1000);
        
    }


    return (
        <div className='container'>
            <Navbar></Navbar>
                <h1 className="header justify-content-start title left mt-5">PLACE BOOKING</h1>
                <div className="container form-cont">
                    <h3 className="header justify-content-start title mt-3">BOOKING SUCCESSFUL</h3>
                    <div className='row'>
                        <div className='col'>
                            <h3 className="header justify-content-start title mt-3 right grey">REFERENCE ID:</h3>
                        </div>
                        <div className='col'>
                            <h3 className="header justify-content-start title mt-3 left">202200909909009123</h3>
                        </div>
                    </div>
                    
                    <div className="row justify-content-end mt-5">
                        <div className="col-sm-2">
                            <button className="btn-pink btn-rad" onClick={() => setRedirect("new")}> New </button>
                            {/* onClick={()=>navigation.previous()} */}
                        </div>
                        <div className="col-sm-2">
                                <button className="btn-blue btn-rad" type="submit" onClick={() => setRedirect("new")}> Home </button>
                                {/* onClick={handleNext} */}
                        </div>
                    </div>
                </div>
        </div>
    )

}

export default BookingSuccess

