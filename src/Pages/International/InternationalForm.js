import React, {useEffect, useState}  from 'react'
//import {Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import {validateSender} from "../../Helpers/Validation/senderValidation";
import ReactLoading from 'react-loading';
// import { Typeahead } from 'react-bootstrap-typeahead';


//assets
import Navbar from '../../Components/Navbar/Navbar';

//ccs
import "./InternationalForm.css"

function InternationalForm() {

    const navigateto = useNavigate();
    const[announcements, setAnnouncements] = useState([]);
    const[citiesDropDown, setCitiesDropDown] = useState([]);
    const[cities, setCities] = useState([]);
    const[provinces, setProvinces] = useState([]);
    const[searchInput, setSearchInput] = useState("");

    return (
    <div className='container'>
        <Navbar></Navbar>
        <div className="container form-cont ">
            <ToastContainer/>

            {/* SENDER */}
            <div>
                    <h1 className="row mb-4 text-center header title center">SENDER DETAILS</h1>    
                        <div className="row mb-4">
                            <div className="col-6">
                                <div className="form-group">
                                    <p className='input-subtitle'>Name</p>
                                    <input type="text" name="sender_firstname" className="form-control" id="first-name" aria-describedby="first-name" placeholder="e.g. Juan Dela Cruz Jr."/>
                                    {/* <input type="text" name="sender_firstname" className="form-control" id="first-name" aria-describedby="first-name" placeholder="e.g. Jane" onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_firstname}/> */}
                                    {/* <InputError isValid={isError.sender_firstname} message={'First name is required*'}/> */}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <p className='input-subtitle'>Company Name</p>
                                    <input type="text" name="sender_company" className="form-control" id="company" aria-describedby="company"/>
                                    {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_company} */}
                                    {/* <InputError isValid={isError.sender_company_short} message={'Company Name must contain at least 3 characters.'}/>
                                    <InputError isValid={isError.sender_company_long} message={'Company Name must not exceed 35 characters.'}/> */}
                                </div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-3">
                                <div className="form-group">
                                    <p className='input-subtitle'>Country<span className='required-icon'>*</span></p>
                                    <input type="text" className="form-control" id="country" aria-describedby="country"/>
                
                                </div>
                            </div>
                            
                            <div className="col-4">
                            {/* <div className="col-6"> */}
                                <div className="form-group">
                                    <p className='input-subtitle'>State/Province<span className='required-icon'>*</span></p>
                                    <input type="text" name="sender_state_code" className="form-control" id="state_code" aria-describedby="state_code" required/>
                                    {/* <Typeahead
                                        id="basic-typeahead-single"
                                        labelKey="name"
                                        onChange={handleProvinceChange}
                                        options={provinces}
                                        placeholder="Enter a province"
                                        selected={provinceSelections}
                                    /> */}
                                    {/* <InputError isValid={isError.sender_state_code} message={'State/Province is required*'}/> */}
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group">
                                    <p className='input-subtitle'>City<span className='required-icon'>*</span></p>
                                    <input type="text" name="sender_city" className="form-control" id="city" aria-describedby="city" required/>
                                    {/* <Typeahead
                                        id="basic-typeahead-single"
                                        labelKey="name"
                                        onChange={handleCityChange}
                                        options={cities}
                                        placeholder="Enter a city"
                                        selected={citySelections}
                                    /> */}
                                    {/* <InputError isValid={isError.sender_city} message={'City is required*'}/> */}
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="form-group">
                                    <p className='input-subtitle'>Postal Code<span className='required-icon'>*</span></p>
                                    <input type="text" name="sender_postal" className="form-control" id="postal" aria-describedby="postal"/>
                                    {/* onChange={handlePostalChange} required value={sender.sender_postal} */}
                                    {/* <InputError isValid={isError.sender_postal} message={'Postal Code is required*'}/> */}
                                </div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-6">
                                <div className="form-group">
                                    <p className='input-subtitle'>Address Line 1<span className='required-icon'>*</span></p>
                                    <input type="text" name="sender_address1" className="form-control" id="address1" aria-describedby="address1" placeholder="Unit Number/ Building/ Street Number/ Village/ Barangay" maxLength="35" />
                                    {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_address1} */}
                                    {/* <InputError isValid={isError.sender_address1} message={'Address 1 is required*'}/>
                                    <InputError isValid={isError.sender_address_len} message={'Address 1 must contain at least 3 characters.'}/> */}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <p className='input-subtitle'>Address Line 2</p>
                                    <input type="text" className="form-control" id="sender_address2" aria-describedby="sender_address2" name="sender_address2" maxLength="35" />
                                    {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_address2} */}
                                </div>
                            </div>
                            
                        </div>
                        <div className="row mb-4">
                            <div className="col-6">
                                <div className="form-group">
                                    <p className='input-subtitle'>Contact Number<span className='required-icon'>*</span></p>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">+63</span>
                                        </div>
                                            <input type="number" name="sender_contact_no" className="form-control" aria-label="contact" aria-describedby="basic-addon1" />
                                            {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_contact_no} */}
                                    </div>
                                    {/* <InputError isValid={isError.sender_contact_no} message={'Contact no. is required*'}/> */}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <p className='input-subtitle'>Email Address</p>
                                    <input type="email" name="sender_email" className="form-control" id="email-add" aria-describedby="email-add" />
                                    {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_email} */}
                                </div>
                            </div>
                        </div>

                </div>

                {/* RECIPIENT */}
                <div className="container">
                    <ToastContainer/>
                    <h1 className="row mb-4 text-center header mt-5  title center">RECIPIENT DETAILS</h1>
                    <div className="row mb-4">
                    </div>
                    <div className="row mb-4">
                        <div className="col-6">
                            <div className="form-group">
                                <p className='input-subtitle'>Name</p>
                                <input type="text" className="form-control" id="recipient_firstname" aria-describedby="recipient_firstname" name="recipient_firstname" placeholder="e.g. John Smith Jr." required/>
                                {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_firstname}  */}
                                {/* <InputError isValid={isError.recipient_firstname} message={'First name is required*'}/> */}
                            </div>
                        </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <p className='input-subtitle'>Company Name</p>
                                    <input type="text" className="form-control" id="company" aria-describedby="company" name="recipient_company" />
                                    {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_company} */}
                                    {/* <InputError isValid={isError.recipient_company_short} message={'Company Name must contain at least 3 characters.'}/>
                                    <InputError isValid={isError.recipient_company_long} message={'Company Name must not exceed 35 characters.'}/> */}
                                </div>
                            </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-3">
                            <div className="form-group">
                                <p className='input-subtitle'>Country<span className='required-icon'>*</span></p>
                                <input type="text" className="form-control" id="country" aria-describedby="country"/>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <p className='input-subtitle'>State/Province<span className='required-icon'>*</span></p>
                                <input type="text" className="form-control" id="suffix" aria-describedby="suffix" name="recipient_state_code" />
                                {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_state_code} */}
                                {/* <InputError isValid={isError.recipient_state_code} message={'State is required*'}/> */}
                            </div>
                        </div>                        
                            <div className="col-3">
                                <div className="form-group">
                                    <p className='input-subtitle'>City<span className='required-icon'>*</span></p>
                                    <input type="text" className="form-control" id="recipient_city" aria-describedby="recipient_city" name="recipient_city" required/>
                                    {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_city}  */}
                                    {/* <InputError isValid={isError.recipient_city} message={'City must be at least 3 letters*'}/> */}
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="form-group">
                                    <p className='input-subtitle'>Postal Code<span className='required-icon'>*</span></p>
                                    <input type="text" className="form-control" id="postal" aria-describedby="postal" name="recipient_postal" required/>
                                    {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_postal}
                                    <InputError isValid={postalValid} message={'Postal code is required*'}/> */}
                                </div>
                            </div>
                    </div>
                    <div className="row mb-4">
                            <div className="col-6">
                                <div className="form-group">
                                    <p className='input-subtitle'>Address Line 1<span className='required-icon'>*</span></p>
                                    <input type="text" name="sender_address1" className="form-control" id="address1" aria-describedby="address1" placeholder="Unit Number/ Building/ Street Number/ Village/ Barangay" maxLength="35" />
                                    {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_address1} */}
                                    {/* <InputError isValid={isError.sender_address1} message={'Address 1 is required*'}/>
                                    <InputError isValid={isError.sender_address_len} message={'Address 1 must contain at least 3 characters.'}/> */}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <p className='input-subtitle'>Address Line 2</p>
                                    <input type="text" className="form-control" id="sender_address2" aria-describedby="sender_address2" name="sender_address2" maxLength="35" />
                                    {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_address2} */}
                                </div>
                            </div>
                            
                        </div>
                    <div className="row mb-4">
                        <div className="col-6">
                            <div className="form-group">
                                <p className='input-subtitle'>Contact Number<span className='required-icon'>*</span></p>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1" name="country_code">+63</span>
                                    </div>
                                        <input type="number" className="form-control" aria-label="contact" aria-describedby="basic-addon1" name="recipient_contact_no" required/>
                                        {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_contact_no}  */}
                                    </div>
                                    {/* <InputError isValid={isError.recipient_contact_no} message={'Contact no. is required*'}/> */}
                                </div>
                            </div>
                            <div className="col-6">
                            <div className="form-group">
                                <p className='input-subtitle'>Email Address</p>
                                <input type="email" className="form-control" id="email-add" aria-describedby="email-add" name="recipient_email" />
                                {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_email} */}
                            </div>
                        </div>
                    </div>
                </div>               
            </div>
        </div>
    )

}

export default InternationalForm


