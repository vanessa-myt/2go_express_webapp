import React, {useEffect, useState}  from 'react'
import {Form, Modal, Button} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.css';
import { Navigate } from 'react-router-dom';

import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import {validateSender} from "../../Helpers/Validation/senderValidation";
import ReactLoading from 'react-loading';
// import { Typeahead } from 'react-bootstrap-typeahead';


//assets
import Navbar from '../../Components/Navbar/Navbar';
import editicon from '../../Assets/Images/Form/edit_icon.png';
import deleteicon from '../../Assets/Images/Form/delete_icon.png';
import glass from "../../Assets/Images/Form/magnifying_glass.png";

//ccs
import "./InternationalForm.css"

function InternationalForm() {

    //item table headers
    const headers = [
        {label: 'Description', key: 'description'},
        {label: 'HS Code', key: 'hs_code'},
        {label: 'Made In', key: 'made_in'},
        {label: 'Qty (pcs)', key: 'qty'},
        {label: 'Unit', key: 'unit'},
        {label: 'Weight (kg)', key: 'weight'},
        {label: 'Customs Value (PHP)', key: 'customs_value'},
        {label: 'Actions', key: 'actions'},
    ];

    const data = [
        {description: 'Clothes', hs_code: '111', made_in: 'Ph', qty: '1', unit: '2', weight: '1kg', customs_value: '101', },
        {description: 'Textboks', hs_code: '112', made_in: 'Ph', qty: '10', unit: '3', weight: '5kg', customs_value: '100', },
    ];

    const [units, setUnits] = useState([
        {name: "CARAT", key: "AR"},
        {name: "CENTIMETER", key: "CM"},
        {name: "CUBIC_FOOT", key: "CFT"},
        {name: "CUBIC_METER", key: "M3"},
        {name: "DOZEN", key: "DOZ"},
        {name: "DOZEN_PAIR", key: "DPR"},
        {name: "EACH", key: "EA"},
        {name: "FOOT", key: "LFT"},
        {name: "GRAM", key: "G"},
        {name: "GROSS", key: "GR"},
        {name: "KILOGRAM", key: "KG"},
        {name: "LINEAR_METER", key: "LNM"},
        {name: "LITER", key: "LTR"},
        {name: "METER", key: "M"},
        {name: "MILLIGRAM", key: "MG"},
        {name: "MILLILITER", key: "ML"},
        {name: "NUMBER", key: "NO"},
        {name: "OUNCE", key: "OZ"},
        {name: "PAIR", key: "PR"},
        {name: "PIECES", key: "PCS"},
        {name: "POUND", key: "LB"},
        {name: "SQUARE_FOOT", key: "SFT"},
        {name: "SQUARE_METER (M2)", key: "M2"},
        {name: "SQUARE_YARD", key: "SYD"},
        {name: "YARD", key: "YD"},
])

    const navigateto = useNavigate();
    const[announcements, setAnnouncements] = useState([]);
    const[citiesDropDown, setCitiesDropDown] = useState([]);
    const[cities, setCities] = useState([]);
    const[provinces, setProvinces] = useState([]);
    const[searchInput, setSearchInput] = useState("");
    const [itemModal, setItemModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editItemModal, setEditItemModal] = useState(false);
    const [isItem, setIsItem] = useState(true);
    const [isDocument, setIsDocument] = useState(false);
    const [redirect, setRedirect] = useState("");




    // const handleSaveItem=(e)=>{
    //     setIndex(index+1)
    //     var totalqty=0, totalweight=0, totalcustoms=0
    //     var newdata
    //     if(e.target.value === "add_item"){
    //         if(validateItemDetails(item, setIsItemError)) {
    //             item["id"] = index+1
    //             if(item.new_item_profile === "" || item.new_item_profile === undefined){
    //                 setItem({new_item_profile:"0"})    
    //             }
    //             setData([...data, item]);
    //             newdata = [...data, item]
    //             setItem({unit:"PCS", new_item_profile:"0", hs_code:""})
    //             setItemModal(false);
    //             setCountrySelections([])
    //         }
           
    //     }
    //     if(e.target.value === "edit_item"){
    //         if(validateItemDetails(editItem, setIsItemError)) {
    //             newdata = [...data]
    //             const indexdata = data.findIndex((data)=> data.id === itemID)
    //             newdata[indexdata].id = editItem.id
    //             newdata[indexdata].description = editItem.description
    //             newdata[indexdata].hs_code = editItem.hs_code?editItem.hs_code:""
    //             newdata[indexdata].made_in = editItem.made_in
    //             newdata[indexdata].qty = editItem.qty
    //             newdata[indexdata].unit = editItem.unit
    //             newdata[indexdata].weight = editItem.weight 
    //             newdata[indexdata].customs_value = editItem.customs_value 
    //             newdata[indexdata].new_item_profile = editItem.new_item_profile 
    //             setData(newdata)
    //             setEditItemModal(false);
    //             setIsEditing(false)
    //             setCountrySelections([])
    //         }
    //     }
        
    //     newdata.forEach(element => {
    //         totalqty += parseFloat(element.qty);
    //         totalweight += parseFloat(element.weight);
    //         totalcustoms += parseFloat(element.customs_value);
    //       });
    //     setItemTotals({ 
    //     totalQty:totalqty,
    //     totalWeight:totalweight,
    //     totalCustoms:totalcustoms,})
    // }

    const handleModalClose=()=>{
        setItemModal(false);
    }

    const openModal=()=>{
        setItemModal(true);
    }

    const handleEditModalClose=()=>{
        setEditItemModal(false);
        setIsEditing(false)
    }

    const handleItemEdit=(id)=>{
        // setItemID(id)
        // const newdata = [...data]
        // const indexdata = data.findIndex((data)=> data.id === id)
        // // setCountrySelections([{name:newdata[indexdata].made_in}])
        // setEditItem({...editItem, 
        //     id: newdata[indexdata].id,
        //     description: newdata[indexdata].description,
        //     hs_code: newdata[indexdata].hs_code?newdata[indexdata].hs_code:"",
        //     made_in: newdata[indexdata].made_in,
        //     qty: newdata[indexdata].qty,
        //     unit: newdata[indexdata].unit,
        //     weight: newdata[indexdata].weight,
        //     customs_value: newdata[indexdata].customs_value,
        //     new_item_profile: newdata[indexdata].new_item_profile
        // })
        // setCountrySelections([{name:countries.filter(data=> data.alpha_code === newdata[indexdata].made_in)[0].name}])
        setIsEditing(true)
        setEditItemModal(true)
    }

    const handleSendType=(e)=>{
        if(e.target.value === "item"){
            // upperDetails["detail_type"] = "item"
            setIsItem(true);
            setIsDocument(false);
        }
        else {
            // upperDetails["detail_type"] = "document"
            setIsItem(false);
            setIsDocument(true);
        }
        // setSendDetails({})
    }

    if(redirect === "next") {
        return <Navigate to="/Confirmation"/>
    }

    // console.log(isItem)
    // console.log(isDocument)

    return (
    <div className='container'>
        <Navbar></Navbar>
        <h1 className="row mb-4 text-center header title mt-5">PLACE BOOKING</h1>    

        <div className="container form-cont ">
            <ToastContainer/>

            {/* SENDER */}
            <div className='container'>
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
                                {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                                <select
                                    className="filter-dropdown form-control"
                                    name="country"
                                    //onChange={(e) => handleFilterChange(e)}
                                    >
                                    <option value="">Country</option>
                                    <option value="for approval">Sample 1</option>
                                    <option value="active">Sample 2</option>
                                    <option value="suspended">Sample 3</option>
                                </select>
            
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
                                    <span className="input-group-text input-subtitle" id="basic-addon1">+63</span>
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
                    <hr></hr>
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
                            {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                            <select
                                className="filter-dropdown form-control"
                                name="country"
                                //onChange={(e) => handleFilterChange(e)}
                                >
                                <option value="">Country</option>
                                <option value="for approval">Sample 1</option>
                                <option value="active">Sample 2</option>
                                <option value="suspended">Sample 3</option>
                            </select>
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
                                <span className="input-group-text input-subtitle" id="basic-addon1" name="country_code">+63</span>
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
                <hr></hr>
            </div> 

            {/* PACKAGE DETAILS */}
            <div className='container'>
                <h1 className="row mb-4 text-center header mt-5  title center">PACKAGE DETAILS</h1>
                <div className="row mb-3"> 
                    <div className="col-4">
                        <div className="form-group border-grey">
                            <p className='input-subtitle'>Ship Date<span className='required-icon'>*</span></p>
                            <input type="email" className="form-control bg-grey" id="email-add" aria-describedby="email-add" name="recipient_email" />
                            {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_email} */}
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group border-grey">
                            <p className='input-subtitle'>Ship Service<span className='required-icon'>*</span></p>
                            {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                            <select
                                className="filter-dropdown form-control bg-grey"
                                name="shipService"
                                //onChange={(e) => handleFilterChange(e)}
                                >
                                <option value="FEDEX_INTERNATIONAL_PRIORITY">FedEx International Priority®</option>
                                <option value="FEDEX_INTERNATIONAL_PRIORITY">FedEx International Priority® Express</option>
                            
                            </select>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group border-grey">
                            <p className='input-subtitle'>What are you sending?<span className='required-icon'>*</span></p>
                            {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                            <select
                                className="filter-dropdown form-control bg-grey"
                                name="sending"
                                onChange={handleSendType}
                                //onChange={(e) => handleFilterChange(e)}
                                >
                                <option defaultValue value="item">Item</option>
                                <option value="document">Document</option>
                            </select>
                        </div>
                    </div>
                </div>
                {isItem &&
                    <div className="row mb-3"> 
                        <div className="col-4">
                            <div className="form-group border-grey">
                                <p className='input-subtitle'>Package Type<span className='required-icon'>*</span></p>
                                {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                                <select
                                    className="filter-dropdown form-control bg-grey"
                                    name="packageType"
                                    //onChange={(e) => handleFilterChange(e)}
                                    >
                                    <option value="">Sample 1</option>
                                    <option value="sample2">Sample 2</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group border-grey">
                                <p className='input-subtitle'>Shipment Purpose<span className='required-icon'>*</span></p>
                                {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                                <select
                                    className="filter-dropdown form-control bg-grey"
                                    name="shipmentPurpose"
                                    //onChange={(e) => handleFilterChange(e)}
                                    >
                                    <option defaultValue value="Commercial">Commercial</option>
                                    <option value="Gift">Gift</option>
                                    <option value="Sample">Sample</option>
                                    <option value="Repair and Return">Repair and Return</option>
                                    <option value="Personal Effects">Personal Effects</option>
                                    <option value="Personal Use">Personal Use</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group border-grey">
                                <p className='input-subtitle'>Invoice for customs<span className='required-icon'>*</span></p>
                                {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                                <select
                                    className="filter-dropdown form-control bg-grey"
                                    name="invoice"
                                    //onChange={(e) => handleFilterChange(e)}
                                    >
                                    <option value="pro_forma_invoice">I want FedEx to help me create a pro-forma invoice</option>
                                    <option value="own_invoice">I will create my own invoice</option>
                                    <option value="commercial_invoice">I want FedEx to help me create a commercial invoice</option>

                                </select>
                            </div>
                        </div>
                    </div>
                }

                

                <div className="row mb-4">
                    {isDocument &&
                    <>
                        <div className="col-4">
                            <div className="form-group border-grey">
                                <p className='input-subtitle'>Type of Document<span className='required-icon'>*</span></p>
                                {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                                <select
                                    className="filter-dropdown form-control bg-grey"
                                    name="invoice"
                                    //onChange={(e) => handleFilterChange(e)}
                                    >
                                    <option defaultValue>Select</option>
                                    <option value="Personal">Personal (e.g. letter)</option>
                                    <option value="Interoffice">Interoffice (e.g. memo)</option>
                                    <option value="Business">Business (e.g. contract)</option>
                                    <option value="Others">Others</option>

                                </select>
                            </div>
                        </div>
                    </>}

                    <div className="col-4">
                        <div className="form-group">
                            <p className='input-subtitle'>Dimensions</p>
                            <div className="input-group">
                            <input type="number" className="form-control" aria-label="dimension" placeholder="length" />
                            <input type="number" className="form-control" aria-label="dimension" placeholder="width" />
                            <input type="number" className="form-control" aria-label="dimension" placeholder="height" />
                            <span className="input-group-text bg-white">cm</span>
                            
                            {/* value={maxLength} onChange={(e)=>{setMaxLength(e.target.value); setPackageDetails({...packageDetails, length:e.target.value})}} disabled={!isCustomPackaging} */}
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                        <p className='input-subtitle'>Max Weight<span className='required-icon'>*</span></p>
                        <div className="input-group">
                            <input type="text" disabled className="form-control" aria-label="max-weight" />
                            {/* value={maxWeight} disabled */}
                            <div className="input-group-append">
                                <span className="input-group-text bg-white input-subtitle">kg</span>
                            </div>
                            </div>
                        </div>
                    </div>

                    {isItem &&
                    <>
                        <div className="col-4 left mt-3">
                            <div className="form-group">
                                <input type="checkbox" className="custom-control-inpu mr-10 " id="purchase-limit" name="higher_limit_liability"/>
                                {/* checked={upperDetails.higher_limit_liability === "1"? true:false} onChange={handleSelectChange} */}
                                {/* <p className='input'>Dimensions</p> */}
                                <label className="custom-control-label input-subtitle pad-left5" htmlFor="purchase-limit">Purchase a higher limit of liability from FedEx</label>
                            </div>
                            <div className="form-group text-align-left left">
                                <input type="checkbox" className="custom-control-inpu mr-10 text-align-left" id="signature-req" name="signature_required"/>
                                {/* checked={upperDetails.signature_required === "1"? true:false} onChange={handleSelectChange} */}
                                <label className="custom-control-label input-subtitle text-align-left pad-left5" htmlFor="signature-req">Require Signature</label>
                            </div>
                        </div>
                    </>}
                    
                    {isDocument &&
                    <>
                        <div className="col-4 left mt-3">
                            <div className="form-group">
                                <input type="checkbox" className="custom-control-inpu mr-10 " id="purchase-limit" name="higher_limit_liability"/>
                                {/* checked={upperDetails.higher_limit_liability === "1"? true:false} onChange={handleSelectChange} */}
                                {/* <p className='input'>Dimensions</p> */}
                                <label className="custom-control-label input-subtitle pad-left5" htmlFor="purchase-limit">Purchase a higher limit of liability from FedEx</label>
                            </div>
                        </div>
                        <div className="col-4 left mt-3">
                            <div className="form-group text-align-left left">
                                <input type="checkbox" className="custom-control-inpu mr-10 text-align-left" id="signature-req" name="signature_required"/>
                                {/* checked={upperDetails.signature_required === "1"? true:false} onChange={handleSelectChange} */}
                                <label className="custom-control-label input-subtitle text-align-left pad-left5" htmlFor="signature-req">Require Signature</label>
                            </div>
                        </div>
                    </>}

                    
                </div>

                <hr></hr>
             {/* package details div */}
            </div>

            {/* ITEM DETAILS */}
            <div className='container'>

            {isItem &&
            <>
                <h1 className="row mb-4 text-center header mt-5  title center">ITEM DETAILS</h1>
                <div className='row mb-6'>
                    <div className='col-6'></div>
                    <div className="col-6">
                        <div className="form-group">
                            <button className="btn-clear btn-rad right" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={openModal}> + Item </button>
                        </div>
                    </div>
                </div>
               
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
                                    <td align="center" style={{display:"flex", justifyContent:"space-around"}}>
                                        <img src={editicon} className="tb-icons" onClick={()=>handleItemEdit(row.id)}/>
                                        {/* name={row.hs_code}  onClick={()=>handleItemEdit(row.id)} */}
                                        <img src={deleteicon} className="tb-icons" onClick={() => console.log("del")}/>
                                        {/* onClick={()=>handleItemDelete(row.id)} */}
                                    </td>
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
                                    <td align="right" className='input-subtitle blue-txt'>-</td>  
                                </tr>
                            </tfoot>
                        </table>
                    </div>
            </>}
                
                <div className='row mb-6'>
                    <div className="col-6 left mt-3">
                        <div className="form-group">
                            <input type="checkbox" className="custom-control-inpu mr-10 " id="purchase-limit" name="higher_limit_liability"/>
                            {/* checked={upperDetails.higher_limit_liability === "1"? true:false} onChange={handleSelectChange} */}
                            {/* <p className='input'>Dimensions</p> */}
                            <label className="custom-control-label input-subtitle pad-left5" htmlFor="purchase-limit">I agree of the </label>
                            <a> </a>
                            <a className='pink-text'>Terms and conditions</a>
                        </div> 
                    </div>
                    {/* <div className="col-3"></div> */}
                    {/* <div className="col">
                        <div className="form-group">
                            <button className="btn-clear btn-rad right" data-bs-toggle="modal" data-bs-target="#exampleModal" > + Item </button>
                            {/* onClick={openModal} 
                        </div>
                    </div>  */}
                    <div className="col-6">
                        <div className="form-group">
                            <button className="btn-blue btn-rad right mr-5" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setRedirect("next")}> Next </button>
                            <button className="btn-pink btn-rad right mr-5" data-bs-toggle="modal" data-bs-target="#exampleModal" > Clear All </button>
                            {/* onClick={openModal} */}
                        </div>
                    </div> 
                </div>
                

               

                {/* item details end */}
            </div>
            
            {/* item modal */}
            <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={itemModal}
            onHide={handleModalClose}
            >
                <Modal.Header closeButton className="item-modal-header">
                    <Modal.Title id="contained-modal-title-vcenter" className='fw-bold'>
                        ITEM FORM        
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='fw-bold'>
                    <div className="row mb-4">
                    {/* {hasResult ? "row":"row mb-4"} */}
                        <div className="input-group form-group">
                            <input type="text" className="form-control search-input" aria-label="Search" placeholder="Search Item..."/>
                            {/* value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} */}
                            <div className="input-group-append">
                                <span className="input-group-text search-icon" id="basic-addon1">
                                    <img src={glass} alt="search" className="search-icon"/> 
                                {/* {searchingItem ?
                                    <ReactLoading className="search-icon loader" type="balls" color="#EC0B8C" height={24} width={25} />
                                    :
                                    <img src={search} alt="search" className="search-icon" onClick={handleSearch}/> 
                                } */}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* {hasResult &&
                        <div className="row search-container">
                            {result.map((data)=>
                                <div class="input-group form-group ">
                                    <input type="text" readOnly  id="search-result-input" className="form-control search-results" aria-label="Search" placeholder="Search" value={data.description} name={data.id} onClick={(e)=>handleResultClick(e,"ADD")}/>
                                </div>
                            )}
                        </div>  
                    } */}
                    <div className="row mb-4">
                    {/* {hasResult ? "row mt-4 mb-4" : "row mb-4"} */}
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="description">Description </label><label className="badge">{` *`}</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control" aria-label="description" name="description"/>
                                    {/* value={item.description} onChange={(e)=>handleItemChange(e)} */}
                                </div>
                                {/* <InputError isValid={isItemError.description} message={'Description is required*'}/> */}
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="hs_code">HS Code </label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control" aria-label="hs_code" name="hs_code"/>
                                    {/* value={item.hs_code} onChange={(e)=>handleItemChange(e)} */}
                                </div>
                                {/* <InputError isValid={isItemError.hs_code} message={'HS Code is required*'}/> */}
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="made_in">Made In </label><label className="badge">{` *`}</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="input-group">`
                                    <select
                                        className="filter-dropdown form-control"
                                        name="country"
                                        //onChange={(e) => handleFilterChange(e)}
                                        >
                                        <option value="">Country</option>
                                        <option value="for approval">Sample 1</option>
                                        <option value="active">Sample 2</option>
                                        <option value="suspended">Sample 3</option>
                                    </select>
                                {/* <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="name"
                                    //onChange={handleMadeChange}
                                    //options={countries}
                                    placeholder="Enter a country"
                                    //selected={countrySelections}
                                /> */}
                                {/* <Form.Select size="md" name="made_in" value={item.made_in} onChange={handleItemChange}>
                                    <option defaultValue>Select</option>
                                    {countries.map((data) => {return(<option class="color-black" key={data.id} value={data.alpha_code}>{data.name}</option>)})}
                                </Form.Select> */}
                                </div>
                            </div>
                            {/* <InputError isValid={isItemError.made_in} message={'Made in is required*'}/> */}
                        </div>
                        
                        <div className="col-2">
                            <div className="form-group">
                                <label htmlFor="weight">Weight </label><label className="badge">{` *`}</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="number" className="form-control" aria-label="weight" name="weight"/>
                                    {/* value={item.weight} onChange={(e)=>handleItemChange(e)} */}
                                    <div className="input-group-append">
                                    <span className="input-group-text bg-white">kg</span>
                                    </div>
                                </div>
                            </div>
                            {/* <InputError isValid={isItemError.weight} message={'Weight is required*'}/> */}
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="qty">Quantity </label><label className="badge">{` *`}</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="number" className="form-control" aria-label="qty" name="qty"/>
                                    {/* value={item.qty} onChange={(e)=>handleItemChange(e)} */}
                                </div>
                            </div>
                            {/* <InputError isValid={isItemError.qty} message={'Qty is required*'}/> */}
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <label htmlFor="unit">Unit </label><label className="badge">{` *`}</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="input-group">
                                <Form.Select size="md" name="unit" >
                                {/* value={item.unit} onChange={handleItemChange} */}
                                    <option value="PCS">PIECES</option>
                                    {units.map((data) => {return(<option class="color-black" key={data.id} value={data.key}>{data.name}</option>)})}
                                </Form.Select>
                                </div>
                            </div>
                            {/* <InputError isValid={isItemError.unit} message={'Unit is required*'}/> */}
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="customs_value">Customs Value </label><label className="badge">{` *`}</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="number" className="form-control" aria-label="customs_value" name="customs_value"/>
                                    {/* value={item.customs_value} onChange={(e)=>handleItemChange(e)} */}
                                </div>
                            </div>
                            {/* <InputError isValid={isItemError.customs_value} message={'Customs value is required*'}/> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <input type="checkbox" className="custom-control-inpu mr-10" id="new_item_profile" name="new_item_profile"/>
                                {/* onChange={(e)=>handleItemChange(e)} */}
                                <label className="custom-control-label pad-left5" htmlFor="new_item_profile">Save as new item profile</label>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='fw-bold'>
                    <div className="col-3">
                        <button className="btn-clear btn-rad"> Clear All </button>
                        {/* onClick={handleClear} */}
                    </div>
                    <div className="col-3">
                        <button type="submit" className="btn-blue btn-rad" value="add_item"> Add Item </button>
                        {/* onClick={handleSaveItem}  */}
                    </div>
                </Modal.Footer>
            </Modal>

            {/* edit item modal */}
            <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={isEditing}
            onHide={handleEditModalClose}
            >
            <Modal.Header closeButton className="item-modal-header">
                <Modal.Title id="contained-modal-title-vcenter" className='fw-bold'>
                    ITEM FORM        
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className='fw-bold'>
                    <div className="row mb-4">
                    {/* {hasResult ? "row":"row mb-4"} */}
                        <div className="input-group form-group">
                            <input type="text" className="form-control search-input" aria-label="Search" placeholder="Search Item..." value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
                            <div className="input-group-append">
                                <span className="input-group-text search-icon" id="basic-addon1">
                                <img src={glass} alt="search" className="search-icon" /> 
                                {/* onClick={handleSearch} */}
                                {/* {searchingItem ?
                                    <ReactLoading className="search-icon loader" type="balls" color="#EC0B8C" height={24} width={25} />
                                    :
                                    <img src={search} alt="search" className="search-icon" onClick={handleSearch}/> 
                                } */}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* {hasResult &&
                        <div className="row search-container">
                        {result.map((data)=>
                            <div class="input-group form-group ">
                                <input type="text" readOnly  id="search-result-input" className="form-control search-results" aria-label="Search" placeholder="Search" value={data.description} name={data.id} onClick={(e)=>handleResultClick(e, "EDIT")}/>
                            </div>
                        )}
                        </div>
                    } */}
                    <div className="row mb-4">
                        {/* {hasResult ? "row mt-4 mb-4" : "row mb-4"} */}
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="description">Description </label><label className="badge">{` *`}</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control" aria-label="description" name="description"/>
                                    {/* value={editItem.description} onChange={(e)=>handleEditItemChange(e)} */}
                                </div>
                                {/* <InputError isValid={isItemError.description} message={'Description is required*'}/> */}
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="hs_code">HS Code </label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control" aria-label="hs_code" name="hs_code"/>
                                    {/* value={editItem.hs_code} onChange={handleEditItemChange} */}
                                </div>
                                {/* <InputError isValid={isItemError.hs_code} message={'HS Code is required*'}/> */}
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="made_in">Made In </label><label className="badge">{` *`}</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="input-group">
                                    <select
                                        className="filter-dropdown form-control"
                                        name="country"
                                        //onChange={(e) => handleFilterChange(e)}
                                        >
                                        <option value="">Country</option>
                                        <option value="for approval">Sample 1</option>
                                        <option value="active">Sample 2</option>
                                        <option value="suspended">Sample 3</option>
                                    </select>
                                {/* <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="name"
                                    onChange={handleEditMadeChange}
                                    options={countries}
                                    placeholder="Enter a country"
                                    selected={countrySelections}
                                /> */}
                                {/* <Form.Select size="md" name="made_in" value={editItem.made_in} onChange={handleEditItemChange}>
                                    <option defaultValue>Select</option>
                                    {countries.map((data) => {return(<option class="color-black" key={data.id} value={data.alpha_code}>{data.name}</option>)})}
                                </Form.Select> */}
                                </div>
                            </div>
                            {/* <InputError isValid={isItemError.made_in} message={'Made in is required*'}/> */}
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <label htmlFor="weight">Weight </label><label className="badge">{` *`}</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="number" className="form-control" aria-label="weight" name="weight" />
                                    {/* value={editItem.weight} onChange={(e)=>handleEditItemChange(e)} */}
                                    <div className="input-group-append">
                                    <span className="input-group-text bg-white">kg</span>
                                    </div>
                                </div>
                            </div>
                            {/* <InputError isValid={isItemError.weight} message={'Weight is required*'}/> */}
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="qty">Quantity </label><label className="badge">{` *`}</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="number" className="form-control" aria-label="qty" name="qty"/>
                                    {/* value={editItem.qty} onChange={(e)=>handleEditItemChange(e)} */}
                                </div>
                            </div>
                            {/* <InputError isValid={isItemError.qty} message={'Qty is required*'}/> */}
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <label htmlFor="unit">Unit </label><label className="badge">{` *`}</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="input-group">
                                <Form.Select size="md" name="unit">
                                {/* value={editItem.unit} onChange={handleEditItemChange} */}
                                    <option value="PCS">PIECES</option>
                                    {units.map((data) => {return(<option class="color-black" key={data.key} value={data.key}>{data.name}</option>)})}
                                </Form.Select>
                                </div>
                            </div>
                            {/* <InputError isValid={isItemError.unit} message={'Unit is required*'}/> */}
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="customs_value">Customs Value </label><label className="badge">{` *`}</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="input-group">   
                                    <input type="number" className="form-control" aria-label="customs_value" name="customs_value" />
                                    {/* value={editItem.customs_value} onChange={(e)=>handleEditItemChange(e)} */}
                                </div>
                            </div>
                            {/* <InputError isValid={isItemError.customs_value} message={'Customs value is required*'}/> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <input type="checkbox" className="custom-control-inpu mr-10" id="new_item_profile_edit" name="new_item_profile" />
                                {/* checked={editItem.new_item_profile === "1"? true:false} onChange={(e)=>handleEditItemChange(e)} */}
                                <label className="custom-control-label pad-left5" htmlFor="new_item_profile_edit"> Save as new item profile </label>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='fw-bold'>
                    <div className="col-3">
                        <button className="btn-pink btn-rad" onClick={()=>setIsEditing(false)}> Cancel </button>
                    </div>
                    <div className="col-3">
                        <button type="submit" className="btn-blue btn-rad" > Save </button>
                        {/* onClick={handleSaveItem} value="edit_item" */}
                    </div>
                </Modal.Footer>
            </Modal> 

        {/* form div  */}
        </div>
    </div>
    )

}

export default InternationalForm


