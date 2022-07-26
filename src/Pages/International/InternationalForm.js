import React, {useEffect, useState}  from 'react'
import {Form, Modal, Button} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.css';
import { Navigate } from 'react-router-dom';
import { validateSender } from '../../Helpers/Validation/InternationalFormValidation';
import InputError from '../../Components/InputError/InputError';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from "moment";
import ReactLoading from 'react-loading';
import reCAPTCHA from "react-google-recaptcha"


//assets
import Navbar from '../../Components/Navbar/Navbar';
import editicon from '../../Assets/Images/Form/edit_icon.png';
import deleteicon from '../../Assets/Images/Form/delete_icon.png';
import glass from "../../Assets/Images/Form/magnifying_glass.png";

//ccs
import "./InternationalForm.css"

function InternationalForm({sender, setSender, recipient, setRecipient, provinceSelections, setProvinceSelections, isItem, setIsItem, isDocument, 
                            setIsDocument, upperDetails, setUpperDetails, sendDetails, setSendDetails, navigation, index, item, setItem, setIndex,
                            singleSelectionsSender, setSingleSelectionsSender, singleSelectionsRecipient, setSingleSelectionsRecipient,
                            packageDetails, setPackageDetails, data, setData, maxWeight, maxLength, setMaxLength, setMaxWeight, maxWidth, setMaxWidth, 
                            maxHeight, setMaxHeight, documentCustoms, setDocumentCustoms, documentDesc, setDocumentDesc, documentType, setDocumentType, 
                            documentWeight, setDocumentWeight, loadingPackage, setLoadingPackage, 
                            searchingItem, setSearchingItem, setTransactionDetails, setGeneralDetails, setType, countrySelections, setCountrySelections,
                            addActualWeight, setAddActualWeight, itemTotals, setItemTotals,}) {

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

    const tabledata = [
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
    // const [isItem, setIsItem] = useState(true);
    // const [isDocument, setIsDocument] = useState(false);
    const [redirect, setRedirect] = useState("");
    const [shipdate, setShipDate] = useState("");
    const [isCustomPackaging, setIsCustomPackaging] = useState(false);

    if (shipdate === "" ) {
        setShipDate(Moment().format("YYYY-MM-DD"));
      }

    const {
        sender_firstname,
        sender_lastname,
        sender_middlename,
        sender_suffix,
        sender_country,
        sender_state_code,
        sender_city,
        sender_postal,
        sender_email,
        sender_contact_no,
        sender_company,
        sender_address1,
        sender_address2,
        sender_address3,
        sender_is_new,
        } = sender

        const {
            recipient_firstname,
            recipient_lastname,
            recipient_middlename,
            recipient_suffix,
            recipient_country,
            recipient_state_code,
            recipient_city,
            recipient_postal,
            recipient_email,
            recipient_contact_no,
            recipient_company,
            recipient_address1,
            recipient_address2,
            recipient_address3,
            recipient_is_new,
            recipient_is_residential,
            ship_date,
        } = recipient

        const {
            total_package_content_1,
            total_customs_value_1,
            weight_1,
            length,
            width,
            height
        } = packageDetails
        const {} = sendDetails
        const {
            id,
            description,
            made_in,
            qty,
            unit,
            weight,
            customs_value,
            new_item_profile,
        } = item
        const {
            packaging_type,
            service_type,
            detail_type,
            customs_invoice,
            higher_limit_liability,
            close_time,
            purpose,
            total_packages, 
            total_weight, 
        } = upperDetails

        // console.log(sender)
        // console.log(recipient)

        //static country
        const countries = [
            {name: "South Korea", alpha_code: "SK"},
            {name: "North Korea", alpha_code: "NK"},
        ]

    //REQUIRED ERROR HANDLING
    const [isError, setIsError] = useState({
        sender_firstname: false,
        sender_lastname: false,
        sender_country: false,
        sender_state_code: false,
        sender_city: false,
        sender_postal: false,
        sender_address1: false,
        sender_address_len: false,
        sender_contact_no: false,
        sender_company_short: false,
        sender_company_long: false,

        recipient_firstname: false,
        recipient_lastname: false,
        recipient_country: false,
        recipient_postal: false,
        recipient_state_code: false,
        recipient_city:false,
        recipient_address1: false,
        recipient_address_len: false,
        recipient_contact_no: false,
        recipient_company_short: false,
        recipient_company_long: false,

        packaging_type: false,
        documentCustoms: false,
        documentType: false,
        documentDesc: false,
        documentWeight: false,
        compareWeight: false,
        data:false,
    });

    const [isPackageError, setIsPackageError] = useState({
        //upperDetails
          packaging_type: false,
  
        // documentCustoms
          documentCustoms: false,
          documentType: false,
          documentDesc: false,
          documentWeight: false,
          compareWeight: false,
  
        // item details
          data:false,
      });
  
      // REQUIRED ERROR HANDLING FOR ITEM DETAILS 
      const [isItemError, setIsItemError] = useState({
          description: false,
          // hs_code:false,
          made_in:false,
          qty:false,
          unit:false,
          weight:false,
          customs_value:false,
      })


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
            upperDetails["detail_type"] = "item"
            setIsItem(true);
            setIsDocument(false);
        }
        else {
            upperDetails["detail_type"] = "document"
            setIsItem(false);
            setIsDocument(true);
        }
        // setSendDetails({})
    }

    const handleCountryChangeSender=(e)=>{
        setSingleSelectionsSender(e)
        if(e.length > 0){
            setSender({...sender, sender_country:e[0].alpha_code})
                // countries.forEach((data)=>{
                //     if(data.alpha_code === e[0].alpha_code){
                //         setDialcode(data.dial_code)
                //         if(data.postal_aware === "1"){
                //             setPostalAware(true)
                //         }
                //         else{
                //             setRecipient({...recipient, recipient_postal:""})
                //             setPostalAware(false)
                //         }
                //     }
                // })
        }
    }

    const handleCountryChangeRecipient=(e)=>{
        setSingleSelectionsRecipient(e)
        if(e.length > 0){
            setRecipient({...recipient, recipient_country:e[0].alpha_code})
                // countries.forEach((data)=>{
                //     if(data.alpha_code === e[0].alpha_code){
                //         setDialcode(data.dial_code)
                //         if(data.postal_aware === "1"){
                //             setPostalAware(true)
                //         }
                //         else{
                //             setRecipient({...recipient, recipient_postal:""})
                //             setPostalAware(false)
                //         }
                //     }
                // })
        }
    }

    //recipient change
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setRecipient({...recipient, [name]: value});

        // if(name === "recipient_is_new" || name === "recipient_is_residential"){
        //     if(e.target.checked){
        //         setRecipient({...recipient, [name]: "1"});
        //     }
        //     else{
        //         setRecipient({...recipient, [name]: "0"});
        //     }
        // }
        // else{
        //     setRecipient({...recipient, [name]: value});
        // }

    } 

    const handleSelectChange=(e)=>{
        const {name, value} = e.target;
        if(name === "higher_limit_liability"){
            if(e.target.checked){
                setUpperDetails({...upperDetails, [name]: "1"});
            }
            else{
                setUpperDetails({...upperDetails, [name]: "0"});
            }
        }

        else if(name === "signature_required"){
            if(e.target.checked){
                setUpperDetails({...upperDetails, [name]: "1"});
            }
            else{
                setUpperDetails({...upperDetails, [name]: "0"});
            }
        }
        
        else{
            setUpperDetails({...upperDetails, [name]: value})
        }

    }

    const handlePackageChange=(e)=>{
        // packages.forEach((data)=>{
        //     if(data.id === e.target.value){
        //         setMaxWeight(data.max_weight)
        //         setMaxLength(data.max_length === "0.00" && (e.target.value === "2" || e.target.value === "1") ? "" : data.max_length)
        //         setMaxWidth(data.max_width === "0.00" && (e.target.value === "2" || e.target.value === "1") ? "" : data.max_width)
        //         setMaxHeight(data.max_height === "0.00" && (e.target.value === "2" || e.target.value === "1") ? "" : data.max_height)
        //         setUpperDetails({...upperDetails, packaging_type:e.target.value })
        //         setPackageDetails({...packageDetails, length:data.max_length, width:data.max_width, height:data.max_height })
        //     }
            if(e.target.value === "1")
                setIsCustomPackaging(true)
            else
                setIsCustomPackaging(false)
        //     if(e.target.value === "11")
        //         setAddActualWeight(true)
        //     else
        //         setAddActualWeight(false)
        // })
    }

    const handleClear=()=>{
        Object.keys(sender).forEach(key => {
            sender[key] = "";
          });
        setSender({...sender, sender_is_new:"0"})
        setSender({...sender, sender_country:""})
        setSearchInput("")
        setSingleSelectionsSender([])

        Object.keys(recipient).forEach(key => {
            recipient[key] = "";
          });
        setRecipient({...recipient, recipient_is_new:"0"})
        setRecipient({...recipient, recipient_is_residential:"0"})
        //setRecipient({...recipient, ship_date:new Date()})
        setSearchInput("")
        setSingleSelectionsRecipient([])
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(sender)
        if(sender.sender_firstname !== "" || sender.sender_company !== "")
        {
            if(recipient.recipient_firstname !== "" || recipient.recipient_company !== "") {
                if(validateSender(sender, recipient, singleSelectionsSender, singleSelectionsRecipient , setIsError)){
                    // setRedirect("next")
                    toast.success("REDIRECTING TO CONFIRMATION...", { autoClose: 2000, hideProgressBar: true })
                    setTimeout(()=>{
                         navigation.next()
                        // setRedirect("next")
                    //   navigateto('/fedex/package', {state: {sender_details: state.sender_details, recipient_details: recipient}})     
                    }, 2000)
                } 
            }
            else{
                toast.error("PLEASE PROVIDE RECIPIENT COMPANY OR NAME",{ autoClose: 4000, hideProgressBar: true });
                console.log("yawa2")
            }
        }
        else{
            toast.error("PLEASE PROVIDE SENDER COMPANY OR NAME",{ autoClose: 4000, hideProgressBar: true });
            console.log("yawa2")
            
        }
       
        // else{
        //     toast.error("PLEASE COMPLETE ALL REQUIRED FIELDS.");
        // }
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
                                <input type="text" name="sender_firstname" className="form-control" id="sender_firstname" aria-describedby="sender_firstname" placeholder="e.g. Juan Dela Cruz Jr." onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_firstname}/>
                                {/* <input type="text" name="sender_firstname" className="form-control" id="first-name" aria-describedby="first-name" placeholder="e.g. Jane" onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_firstname}/> */}
                                {/* <InputError isValid={isError.sender_firstname} message={'First name is required*'}/> */}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <p className='input-subtitle'>Company Name</p>
                                <input type="text" name="sender_company" className="form-control" id="sender_company" aria-describedby="sender_company" onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_company}/>
                                {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_company} */}
                                <InputError isValid={isError.sender_company_short} message={'Company Name must contain at least 3 characters.'}/>
                                <InputError isValid={isError.sender_company_long} message={'Company Name must not exceed 35 characters.'}/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-3">
                            <div className="form-group">
                                <p className='input-subtitle'>Country<span className='required-icon'>*</span></p>
                                {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                                <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="name"
                                    onChange={handleCountryChangeSender}
                                    options={countries}
                                    placeholder="Enter a country"
                                    selected={singleSelectionsSender}
                                />
                                {/* <select
                                    className="filter-dropdown form-control"
                                    name="sender_country"
                                    onChange={handleCountryChange}
                                    value={sender.sender_country}
                                    //onChange={(e) => handleFilterChange(e)}
                                    >
                                    <option value="">Country</option>
                                    <option value="Sample 1">Sample 1</option>
                                    <option value="Sample 2">Sample 2</option>
                                    <option value="Sample 3">Sample 3</option>
                                </select> */}
                                <InputError isValid={isError.sender_country} message={'Country is required*'}/>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="form-group">
                                <p className='input-subtitle'>Postal Code<span className='required-icon'>*</span></p>
                                <input type="text" name="sender_postal" className="form-control" id="sender_postal" aria-describedby="sender_postal" onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_postal}/>
                                {/* onChange={handlePostalChange} required value={sender.sender_postal} */}
                                <InputError isValid={isError.sender_postal} message={'Postal Code is required*'}/>
                            </div>
                        </div>
                        
                        <div className="col-4">
                        {/* <div className="col-6"> */}
                            <div className="form-group">
                                <p className='input-subtitle'>State/Province<span className='required-icon'>*</span></p>
                                <input type="text" name="sender_state_code" className="form-control" id="sender_state_code" aria-describedby="sender_state_code" required onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_state_code}/>
                                {/* <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="name"
                                    onChange={handleProvinceChange}
                                    options={provinces}
                                    placeholder="Enter a province"
                                    selected={provinceSelections}
                                /> */}
                                <InputError isValid={isError.sender_state_code} message={'State/Province is required*'}/>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <p className='input-subtitle'>City<span className='required-icon'>*</span></p>
                                <input type="text" name="sender_city" className="form-control" id="sender_city" aria-describedby="sender_city" required onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})}/>
                                {/* <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="name"
                                    onChange={handleCityChange}
                                    options={cities}
                                    placeholder="Enter a city"
                                    selected={citySelections}
                                /> */}
                                <InputError isValid={isError.sender_city} message={'City is required*'}/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-4">
                            <div className="form-group">
                                <p className='input-subtitle'>Address Line 1<span className='required-icon'>*</span></p>
                                <input type="text" name="sender_address1" className="form-control" id="sender_address1" aria-describedby="sender_address1" placeholder="Unit Number/ Building/ Street Number/ Village/ Barangay" maxLength="35" onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_address1}/>
                                {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_address1} */}
                                <InputError isValid={isError.sender_address1} message={'Address 1 is required*'}/>
                                <InputError isValid={isError.sender_address_len} message={'Address 1 must contain at least 3 characters.'}/>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <p className='input-subtitle'>Address Line 2</p>
                                <input type="text" className="form-control" id="sender_address2" aria-describedby="sender_address2" name="sender_address2" maxLength="35" onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_address2}/>
                                {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_address2} */}
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <p className='input-subtitle'>Address Line 3</p>
                                <input type="text" className="form-control" id="sender_address3" aria-describedby="sender_address3" name="sender_address3" maxLength="35" onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_address3}/>
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
                                        <input type="number" name="sender_contact_no" className="form-control" aria-label="contact" aria-describedby="basic-addon1" onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_contact_no}/>
                                        {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_contact_no} */}
                                </div>
                                <InputError isValid={isError.sender_contact_no} message={'Contact no. is required*'}/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <p className='input-subtitle'>Email Address</p>
                                <input type="email" name="sender_email" className="form-control" id="email-add" aria-describedby="email-add" onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_email}/>
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
                                <input type="text" className="form-control" id="recipient_firstname" aria-describedby="recipient_firstname" name="recipient_firstname" placeholder="e.g. John Smith Jr." required onChange={(e)=>handleChange(e)} value={recipient.recipient_firstname} />
                                {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_firstname}  */}
                                {/* <InputError isValid={isError.recipient_firstname} message={'First name is required*'}/> */}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <p className='input-subtitle'>Company Name</p>
                                <input type="text" className="form-control" id="recipient_company" aria-describedby="recipient_company" name="recipient_company" onChange={(e)=>handleChange(e)} value={recipient.recipient_company} />
                                {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_company} */}
                                <InputError isValid={isError.recipient_company_short} message={'Company Name must contain at least 3 characters.'}/>
                                <InputError isValid={isError.recipient_company_long} message={'Company Name must not exceed 35 characters.'}/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-3">
                            <div className="form-group">
                                <p className='input-subtitle'>Country<span className='required-icon'>*</span></p>
                                {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                                <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="name"
                                    onChange={handleCountryChangeRecipient}
                                    options={countries}
                                    placeholder="Enter a country"
                                    selected={singleSelectionsRecipient}
                                />
                                {/* <select
                                    className="filter-dropdown form-control"
                                    name="recipient_country"
                                    onChange={(e)=>handleChange(e)}
                                    value={recipient.recipient_country}
                                    //onChange={(e) => handleFilterChange(e)}
                                    >
                                    <option value="">Country</option>
                                    <option value="Sample 1">Sample 1</option>
                                    <option value="Sample 2">Sample 2</option>
                                    <option value="Sample 3">Sample 3</option>
                                </select> */}
                                <InputError isValid={isError.recipient_country} message={'Country is required*'}/>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <p className='input-subtitle'>Postal Code<span className='required-icon'>*</span></p>
                                <input type="text" className="form-control" id="recipient_postal" aria-describedby="recipient_postal" name="recipient_postal" required onChange={(e)=>handleChange(e)} value={recipient.recipient_postal} />
                                {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_postal} */}
                                <InputError isValid={isError.recipient_postal} message={'Postal code is required*'}/>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <p className='input-subtitle'>State/Province<span className='required-icon'>*</span></p>
                                <input type="text" className="form-control" id="recipient_state_code" aria-describedby="recipient_state_code" name="recipient_state_code" onChange={(e)=>handleChange(e)} value={recipient.recipient_state_code} />
                                {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_state_code} */}
                                <InputError isValid={isError.recipient_state_code} message={'State is required*'}/>
                            </div>
                        </div>                        
                            <div className="col-3">
                                <div className="form-group">
                                    <p className='input-subtitle'>City<span className='required-icon'>*</span></p>
                                    <input type="text" className="form-control" id="recipient_city" aria-describedby="recipient_city" name="recipient_city" required onChange={(e)=>handleChange(e)} value={recipient.recipient_city} />
                                    {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_city}  */}
                                    <InputError isValid={isError.recipient_city} message={'City must be at least 3 letters*'}/>
                                </div>
                            </div>
                        </div>  
                        <div className="row mb-4">
                            <div className="col-4">
                                <div className="form-group">
                                    <p className='input-subtitle'>Address Line 1<span className='required-icon'>*</span></p>
                                    <input type="text" name="recipient_address1" className="form-control" id="recipient_address1" aria-describedby="recipient_address1" placeholder="Unit Number/ Building/ Street Number/ Village/ Barangay" maxLength="35" onChange={(e)=>handleChange(e)} required value={recipient.recipient_address1}/>
                                    {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_address1} */}
                                    <InputError isValid={isError.sender_address1} message={'Address 1 is required*'}/>
                                    <InputError isValid={isError.sender_address_len} message={'Address 1 must contain at least 3 characters.'}/>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <p className='input-subtitle'>Address Line 2</p>
                                    <input type="text" className="form-control" id="recipient_address2" aria-describedby="recipient_address2" name="recipient_address2" maxLength="35" onChange={(e)=>handleChange(e)} value={recipient.recipient_address2}/>
                                    {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_address2} */}
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <p className='input-subtitle'>Address Line 3</p>
                                    <input type="text" className="form-control" id="recipient_address3" aria-describedby="recipient_address3" name="recipient_address3" maxLength="35" onChange={(e)=>handleChange(e)} value={recipient.recipient_address3}/>
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
                                            <input type="number" className="form-control" aria-label="contact" aria-describedby="basic-addon1" name="recipient_contact_no" required onChange={(e)=>handleChange(e)} value={recipient.recipient_contact_no} />
                                            {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_contact_no}  */}
                                        </div>
                                        <InputError isValid={isError.recipient_contact_no} message={'Contact no. is required*'}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                <div className="form-group">
                                    <p className='input-subtitle'>Email Address</p>
                                    <input type="email" className="form-control" id="email-add" aria-describedby="email-add" name="recipient_email" onChange={(e)=>handleChange(e)} value={recipient.recipient_email} />
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
                                <input
                                    type="date"
                                    name="ship_date"
                                    onChange={(e)=>handleChange(e)} 
                                    value={recipient.ship_date}
                                    // onChange={(e) =>
                                    //     setShipDate(Moment(e.target.value).format("YYYY-MM-DD"))
                                    // }
                                    className="modal-input date-input reports-date form-control bg-grey"
                                    //value={shipdate}
                                />
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
                                    value={upperDetails.service_type} 
                                    onChange={handleSelectChange}
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
                                    value={upperDetails.detail_type}
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
                                        value={upperDetails.packaging_type} 
                                        onChange={handlePackageChange}
                                        //onChange={(e) => handleFilterChange(e)}
                                        >
                                        <option value="1">Custom</option>
                                        <option value="2">Letter</option>
                                        <option value="3">box</option>

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
                                        value={upperDetails.purpose} 
                                        onChange={handleSelectChange}
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
                                        value={upperDetails.customs_invoice} 
                                        onChange={handleSelectChange}
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
                                <input type="number" className="form-control" aria-label="dimension" placeholder="length"value={maxLength} onChange={(e)=>{setMaxLength(e.target.value); setPackageDetails({...packageDetails, length:e.target.value})}} disabled={!isCustomPackaging} />
                                <input type="number" className="form-control" aria-label="dimension" placeholder="width" value={maxWidth} onChange={(e)=>{setMaxWidth(e.target.value); setPackageDetails({...packageDetails, width:e.target.value})}} disabled={!isCustomPackaging} />
                                <input type="number" className="form-control" aria-label="dimension" placeholder="height" value={maxHeight} onChange={(e)=>{setMaxHeight(e.target.value); setPackageDetails({...packageDetails, height:e.target.value})}} disabled={!isCustomPackaging} />
                                <span className="input-group-text bg-white">cm</span>
                                
                                {/* value={maxLength} onChange={(e)=>{setMaxLength(e.target.value); setPackageDetails({...packageDetails, length:e.target.value})}} disabled={!isCustomPackaging} */}
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                            <p className='input-subtitle'>Max Weight<span className='required-icon'>*</span></p>
                            <div className="input-group">
                                <input type="text" disabled className="form-control" aria-label="max-weight" value={maxWeight}/>
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
                                    <input type="checkbox" className="custom-control-inpu mr-10 " id="purchase-limit" name="higher_limit_liability" checked={upperDetails.higher_limit_liability === "1"? true:false} onChange={handleSelectChange} />
                                    {/* checked={upperDetails.higher_limit_liability === "1"? true:false} onChange={handleSelectChange} */}
                                    {/* <p className='input'>Dimensions</p> */}
                                    <label className="custom-control-label input-subtitle pad-left5" htmlFor="purchase-limit">Purchase a higher limit of liability from FedEx</label>
                                </div>
                                <div className="form-group text-align-left left">
                                    <input type="checkbox" className="custom-control-inpu mr-10 text-align-left" id="signature-req" name="signature_required" checked={upperDetails.signature_required === "1"? true:false} onChange={handleSelectChange}/>
                                    {/* checked={upperDetails.signature_required === "1"? true:false} onChange={handleSelectChange} */}
                                    <label className="custom-control-label input-subtitle text-align-left pad-left5" htmlFor="signature-req">Require Signature</label>
                                </div>
                            </div>
                        </>}
                        
                        {isDocument &&
                        <>
                            <div className="col-4 left mt-3">
                                <div className="form-group">
                                    <input type="checkbox" className="custom-control-inpu mr-10 " id="purchase-limit" name="higher_limit_liability" checked={upperDetails.higher_limit_liability === "1"? true:false} onChange={handleSelectChange}/>
                                    {/* checked={upperDetails.higher_limit_liability === "1"? true:false} onChange={handleSelectChange} */}
                                    {/* <p className='input'>Dimensions</p> */}
                                    <label className="custom-control-label input-subtitle pad-left5" htmlFor="purchase-limit">Purchase a higher limit of liability from FedEx</label>
                                </div>
                            </div>
                            <div className="col-4 left mt-3">
                                <div className="form-group text-align-left left">
                                    <input type="checkbox" className="custom-control-inpu mr-10 text-align-left" id="signature-req" name="signature_required" checked={upperDetails.signature_required === "1"? true:false} onChange={handleSelectChange}/>
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
                                    {tabledata?.map((row, index) => (
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

                    {/* <div className='row mb-4'>
                        <reCAPTCHA 
                            sitekey={process.env.REACT_APP_SITE_KEY}
                        />
                    </div> */}
                    
                    
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
                                <button className="btn-blue btn-rad right mr-5" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleSubmit}> Next </button>
                                <button className="btn-pink btn-rad right mr-5" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleClear} > Clear All </button>
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


