import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from 'react-router-dom';


//css
import "./Confirmation.css";
import delivery from "../../Assets/Images/Form/delivery.png"

function Summary() {
    const [agree ,setAgree] = useState(true);
    const [redirect, setRedirect] = useState("");

    //item table headers
    const headers = [
        {label: 'Description', key: 'description'},
        {label: 'HS Code', key: 'hs_code'},
        {label: 'Made In', key: 'made_in'},
        {label: 'Qty (pcs)', key: 'qty'},
        {label: 'Unit', key: 'unit'},
        {label: 'Weight (kg)', key: 'weight'},
        {label: 'Customs Value (PHP)', key: 'customs_value'},
        // {label: 'Actions', key: 'actions'},
    ];

    const data = [
        {description: 'Clothes', hs_code: '111', made_in: 'Ph', qty: '1', unit: '2', weight: '1kg', customs_value: '101', },
        {description: 'Textboks', hs_code: '112', made_in: 'Ph', qty: '10', unit: '3', weight: '5kg', customs_value: '100', },
    ];

    if(redirect === "back") {
        return <Navigate to="/"/>
    }

    return (
        <div style={{display:"flex", flexDirection:"row"}}>
          <ToastContainer />
          <div className='container mb-5'>
            <div className="form-container">
              <div className="row mb-3 mt-5">
                <div className="col">
                  <h1 className="header justify-content-start title">CONFIRMATION</h1>
                </div>
              </div>

                <div className="row mb-4 ">
                    {/* SENDER DETAILS */}
                    <div className="col-6">
                        <div className="col-sm-6 mt-5">
                            <p className="input-subtitle left pink-txt x-large">Sender Details</p>
                        </div>
                        <hr></hr>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Name:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Country:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">State/Province:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">City:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Address Line 1:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Address Line 2:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Contact Number:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Email Address:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Company Name:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RECEIVER DETAILS */}
                    <div className="col-6">
                        <div className="col-sm-6 mt-5">
                            <p className="input-subtitle left pink-txt x-large">Receiver Details</p>
                        </div>
                        <hr></hr>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Name:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Country:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">State/Province:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">City:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Address Line 1:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Address Line 2:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Contact Number:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Email Address:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Company Name:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Ship Date:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row mt-5">
                    <div className="col-sm-6">
                        <p className="input-subtitle left pink-txt  x-large">Package Details</p>
                    </div>
                    <hr></hr>
                </div>

                <div className="row mb-4">
                    {/* PACKAGE DETAILS */}
                    <div className="col-6">
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Ship Service:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">What are you Sending:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Invoice for Customs:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Package Type:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Shipment Purpose:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Max Weight:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Pickup/Drop Off:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Dimension:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className='row container-fluid table-overflow'>
                            <table className="table table-bordered table-hover item-table mt-3">
                                <thead className="item-table-headers">
                                    <tr>
                                        {headers.map((row) => (
                                                <th align="left" scope="col">{row.label}</th>
                                            ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((row, index) => (
                                    <tr key={index}
                                    >
                                        <td align="left" className='input-subtitle'>{row.description}</td>
                                        <td align="left" className='input-subtitle'>{row.hs_code}</td>
                                        <td align="left" className='input-subtitle'>{row.made_in}</td>
                                        <td align="center" className='input-subtitle'>{row.qty}</td>
                                        <td align="center" className='input-subtitle'>{row.unit}</td>
                                        <td align="center" className='input-subtitle'>{row.weight}</td>
                                        <td align="center" className='input-subtitle'>{row.customs_value}</td>
                                    
                                    </tr>
                                    ))}
                                </tbody>
                                <tfoot className="item-table-headers">
                                    <tr style={{backgroundColor:"#EFEFEF"}}>
                                        <td colspan="3" align="right" className='input-subtitle blue-txt'>TOTAL:</td>
                                        <td align="center" className='input-subtitle blue-txt'>11</td>
                                        <td align="right" className='input-subtitle blue-txt'>-</td>  
                                        <td align="center" className='input-subtitle blue-txt'>6</td>  
                                        <td align="center" className='input-subtitle blue-txt'>201</td>  
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>


                </div>

                <div className="row mt-5">
                    <div className="col-sm-6">
                        <p className="input-subtitle left pink-txt x-large">Payment</p>
                    </div>
                    <hr></hr>
                </div>

                <div className="row mb-4">
                    {/* PACKAGE DETAILS */}
                    <div className="col-6">
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Base Rate:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Surcharge:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Discount Amount:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">Subtotal:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt">VAT:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="text span-summary">
                                {/* {sender.sender_firstname +
                                    " " +
                                sender.sender_lastname} */}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                            <div className="row mt-2">
                            <div className="col-sm-6">
                                <p className="input-subtitle grey-txt x-large">AMOUNT DUE:</p>
                            </div>
                            <div className="col-sm-6">
                                <span className="input-subtitle orange-txt x-large">
                                    PHP
                                    1000.00
                                </span>
                            </div>
                        </div>
                
                    </div>


                </div>
              
                <div className="row mt-5"> 
                    <div className="col">
                        <div className="row">
                            
                            <div className="col-sm-2 icon">
                                <img src={delivery} className=""/>
                            </div>
                            <div className="colsm-6 w-330">
                                <p className="input-subtitle grey-txt x-large w-330 mr-0">Estimated Delivery Date:</p>
                            </div>
                            <div className="colsm-6 w-330">
                                <p className="input-subtitle pink-txt x-large pink-border">August 1-5</p>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="container">
                    <div className="row mb-4 justify-content-end">
                        <div className="col-sm-2">
                            <button className="btn-pink btn-rad" onClick={() => setRedirect("back")}> Back </button>
                            {/* onClick={()=>navigation.previous()} */}
                        </div>
                        <div className="col-sm-2">
                                <button className="btn-blue btn-rad" type="submit"> Confirm </button>
                                {/* onClick={handleNext} */}
                        </div>
                    </div>
                </div>
            </div>
              
        </div>
    </div>
    );

}

export default Summary;
