import React, { useEffect, useState, useRef } from "react"
import { Form, Modal, Button } from "react-bootstrap"
import { Typeahead } from "react-bootstrap-typeahead"
import "bootstrap/dist/css/bootstrap.css"
import { Navigate } from "react-router-dom"
import { validateSender } from "../../Helpers/Validation/InternationalFormValidation"
import {
  validatePackage,
  validateItemDetails,
} from "../../Helpers/Validation/PackageValidation"
import InputError from "../../Components/InputError/InputError"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Moment from "moment"
import { phpostals } from "../../Assets/Postals/PhPostals"
import { intlpostals } from "../../Assets/Postals/IntlPostals"
import ReactLoading from "react-loading"
import ReCAPTCHA from "react-google-recaptcha"

//assets
import Navbar from "../../Components/Navbar/Navbar"
import editicon from "../../Assets/Images/Form/edit_icon.png"
import deleteicon from "../../Assets/Images/Form/delete_icon.png"
import glass from "../../Assets/Images/Form/magnifying_glass.png"
import { createFedexTransac } from "../../Helpers/ApiCalls/RatesApi"
import {
  fetchCountries,
  validatePostal,
} from "../../Helpers/ApiCalls/DropdownsApi"

//ccs
import "./InternationalForm.css"
import { refreshPage } from "../../Helpers/Utils/Common"

function InternationalForm({
  sender,
  setSender,
  hasResult,
  setHasResult,
  result,
  setResult,
  searchingSender,
  setSearchingSender,
  provinceSelections,
  setProvinceSelections,
  navigation,
  recipient,
  setRecipient,
  postalAware,
  setPostalAware,
  loading,
  setLoading,
  searchingRecipient,
  setSearchingRecipient,
  singleSelections,
  setSingleSelections,
  stateSelections,
  setStateSelections,
  dial_code,
  setDialcode,
  index,
  item,
  setItem,
  setIndex,
  packageDetails,
  setPackageDetails,
  sendDetails,
  setSendDetails,
  upperDetails,
  setUpperDetails,
  data,
  setData,
  maxWeight,
  maxLength,
  setMaxLength,
  setMaxWeight,
  maxWidth,
  setMaxWidth,
  maxHeight,
  setMaxHeight,
  documentCustoms,
  setDocumentCustoms,
  documentDesc,
  setDocumentDesc,
  documentType,
  setDocumentType,
  documentWeight,
  setDocumentWeight,
  isItem,
  setIsItem,
  isDocument,
  setIsDocument,
  loadingPackage,
  setLoadingPackage,
  searchingItem,
  setSearchingItem,
  setTransactionDetails,
  setGeneralDetails,
  setType,
  countrySelections,
  setCountrySelections,
  addActualWeight,
  setAddActualWeight,
  itemTotals,
  setItemTotals,
  type,
  generalDetails,
  transactionDetails,
  singleSelectionsSender,
  setSingleSelectionsSender,
  singleSelectionsRecipient,
  setSingleSelectionsRecipient,
  captcha,
  setCaptcha,
  countries,
  services,
  packageList,
  packages,
  setPackages,
  commodities,
}) {
  //item table headers
  const headers = [
    { label: "Description", key: "description" },
    { label: "HS Code", key: "hs_code" },
    { label: "Made In", key: "made_in" },
    { label: "Qty (pcs)", key: "qty" },
    { label: "Unit", key: "unit" },
    { label: "Weight (kg)", key: "weight" },
    { label: "Customs Value (PHP)", key: "customs_value" },
    { label: "Actions", key: "actions" },
  ]

  const tabledata = [
    {
      description: "Clothes",
      hs_code: "111",
      made_in: "Ph",
      qty: "1",
      unit: "2",
      weight: "1kg",
      customs_value: "101",
    },
    {
      description: "Textboks",
      hs_code: "112",
      made_in: "Ph",
      qty: "10",
      unit: "3",
      weight: "5kg",
      customs_value: "100",
    },
  ]

  const [units, setUnits] = useState([
    { name: "CARAT", key: "AR" },
    { name: "CENTIMETER", key: "CM" },
    { name: "CUBIC_FOOT", key: "CFT" },
    { name: "CUBIC_METER", key: "M3" },
    { name: "DOZEN", key: "DOZ" },
    { name: "DOZEN_PAIR", key: "DPR" },
    { name: "EACH", key: "EA" },
    { name: "FOOT", key: "LFT" },
    { name: "GRAM", key: "G" },
    { name: "GROSS", key: "GR" },
    { name: "KILOGRAM", key: "KG" },
    { name: "LINEAR_METER", key: "LNM" },
    { name: "LITER", key: "LTR" },
    { name: "METER", key: "M" },
    { name: "MILLIGRAM", key: "MG" },
    { name: "MILLILITER", key: "ML" },
    { name: "NUMBER", key: "NO" },
    { name: "OUNCE", key: "OZ" },
    { name: "PAIR", key: "PR" },
    { name: "PIECES", key: "PCS" },
    { name: "POUND", key: "LB" },
    { name: "SQUARE_FOOT", key: "SFT" },
    { name: "SQUARE_METER (M2)", key: "M2" },
    { name: "SQUARE_YARD", key: "SYD" },
    { name: "YARD", key: "YD" },
  ])

  const navigateto = useNavigate()
  const [announcements, setAnnouncements] = useState([])
  const [citiesDropDown, setCitiesDropDown] = useState([])
  const [cities, setCities] = useState([])
  const [provinces, setProvinces] = useState([])
  // const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [itemModal, setItemModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editItemModal, setEditItemModal] = useState(false)
  const [redirect, setRedirect] = useState("")
  const [shipdate, setShipDate] = useState("")
  const [isCustomPackaging, setIsCustomPackaging] = useState(false)
  const [editItem, setEditItem] = useState({})
  const [itemID, setItemID] = useState(0)
  const [agree, setAgree] = useState(true)
  //const [captcha ,setCaptcha] = useState(false)
  const captchaRef = useRef()
  const [token, setToken] = useState("")
  const [tabActive, setTabActive] = useState("1")

  const handleCountryChange = (e) => {
    setSingleSelectionsRecipient(e)
    if (e.length > 0) {
      setRecipient({ ...recipient, recipient_country: e[0].alpha_code })
      countries.forEach((data) => {
        if (data.alpha_code === e[0].alpha_code) {
          recipient.recipient_country = e[0].alpha_code
          setDialcode(data.dial_code)
          if (data.postal_aware === "1") {
            setPostalAware(true)
          } else {
            setRecipient({ ...recipient, recipient_postal: "" })
            setPostalAware(false)
          }
        }
      })
    }
  }

  let packageNumber = 1
  let item_weights = 0
  let count = 1
  let item_customs = 0

  if (shipdate === "") {
    setShipDate(Moment().format("YYYY-MM-DD"))
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
    height,
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
  // const {
  //     packaging_type,
  //     service_type,
  //     detail_type,
  //     customs_invoice,
  //     higher_limit_liability,
  //     close_time,
  //     purpose,
  //     total_packages,
  //     total_weight,
  // } = upperDetails

  // console.log(sender)
  // console.log(recipient)
  // console.log(packageDetails)
  // console.log(upperDetails)
  //console.log(item)
  //console.log(recipient.ship_date)
  // console.log(documentCustoms)
  // console.log(documentDesc)
  // console.log(documentType)
  // console.log(token)
  // console.log(captchaRef)
  // console.log(agree&&captcha)
  // console.log(captchaRef)

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
    recipient_city: false,
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
    data: false,
  })

  const [isPackageError, setIsPackageError] = useState({
    //upperDetails
    packaging_type: false,

    // documentCustoms
    documentCustoms: false,
    documentType: false,
    documentDesc: false,
    documentDesc_comm_error: false,
    documentWeight: false,
    compareWeight: false,

    // item details
    data: false,
  })

  // REQUIRED ERROR HANDLING FOR ITEM DETAILS
  const [isItemError, setIsItemError] = useState({
    description: false,
    description_comm_error: false,
    // hs_code:false,
    made_in: false,
    qty: false,
    unit: false,
    weight: false,
    customs_value: false,
  })

  const handleTabActive = (event) => {
    setTabActive(event.target.id)
  }

  const handleModalClose = () => {
    setItemModal(false)
  }

  const openModal = () => {
    setItemModal(true)
  }

  const handleEditModalClose = () => {
    setEditItemModal(false)
    setIsEditing(false)
  }

  const handleItemEdit = (id) => {
    setItemID(id)
    const newdata = [...data]
    const indexdata = data.findIndex((data) => data.id === id)
    // setCountrySelections([{name:newdata[indexdata].made_in}])
    setEditItem({
      ...editItem,
      id: newdata[indexdata].id,
      description: newdata[indexdata].description,
      hs_code: newdata[indexdata].hs_code ? newdata[indexdata].hs_code : "",
      made_in: newdata[indexdata].made_in,
      qty: newdata[indexdata].qty,
      unit: newdata[indexdata].unit,
      weight: newdata[indexdata].weight,
      customs_value: newdata[indexdata].customs_value,
      new_item_profile: newdata[indexdata].new_item_profile,
    })
    setCountrySelections([
      {
        name: countries.filter(
          (data) => data.alpha_code === newdata[indexdata].made_in
        )[0].name,
      },
    ])
    setIsEditing(true)
    setEditItemModal(true)
  }

  const handleEditItemChange = (e) => {
    const { name, value } = e.target
    if (name === "new_item_profile") {
      if (e.target.checked) {
        setEditItem((prevState) => ({
          ...prevState,
          ["new_item_profile"]: "1",
        }))
        // editItem["new_item_profile"] = "1"
      } else {
        setEditItem((prevState) => ({
          ...prevState,
          ["new_item_profile"]: "0",
        }))
        // editItem["new_item_profile"] = "0"
      }
    } else {
      setEditItem((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const handleMadeChange = (e) => {
    setCountrySelections(e)
    if (e.length > 0) {
      countries.forEach((data) => {
        if (data.name === e[0].name) {
          setItem({ ...item, made_in: data.alpha_code })
        }
      })
    }
  }

  const handleSendType = (e) => {
    if (e.target.value === "item") {
      upperDetails["detail_type"] = "item"
      setIsItem(true)
      setIsDocument(false)
      upperDetails["packaging_type"] = ""
      setPackages(packageList.filter((data) => data.id !== "3"))
      setMaxWeight("0")
      setMaxLength("")
      setMaxWidth("")
      setMaxHeight("")
    } else {
      upperDetails["detail_type"] = "document"
      setIsItem(false)
      setIsDocument(true)
      upperDetails["packaging_type"] = ""
      setPackages(
        packageList.filter((data) => data.id === "3" || data.id === "11")
      )

      setMaxWeight("0")
      setMaxLength("")
      setMaxWidth("")
      setMaxHeight("")

      console.log(
        "doc packages",
        packageList.filter((data) => data.id === "3" || data.id === "11")
      )
    }
    setSendDetails({})
  }

  // const updateRecaptcha = ()=>{
  //     setToken("")
  // }

  // console.log(process.env.REACT_APP_LINK)

  const handleCountryChangeSender = (e) => {
    setSingleSelectionsSender(e)
    if (e.length > 0) {
      setSender({ ...sender, sender_country: e[0].alpha_code })
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

  const handleCountryChangeRecipient = (e) => {
    setSingleSelectionsRecipient(e)
    if (e.length > 0) {
      setRecipient({ ...recipient, recipient_country: e[0].alpha_code })
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
  const handleChange = (e) => {
    const { name, value } = e.target
    setRecipient({ ...recipient, [name]: value })

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

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    if (name === "higher_limit_liability") {
      if (e.target.checked) {
        setUpperDetails({ ...upperDetails, [name]: "1" })
      } else {
        setUpperDetails({ ...upperDetails, [name]: "0" })
      }
    } else if (name === "signature_required") {
      if (e.target.checked) {
        setUpperDetails({ ...upperDetails, [name]: "1" })
      } else {
        setUpperDetails({ ...upperDetails, [name]: "0" })
      }
    } else {
      setUpperDetails({ ...upperDetails, [name]: value })
    }
  }

  const handleDocumentChange = (e) => {
    const { name, value } = e.target
    if (name === "customs_value") {
      setDocumentCustoms(value)
    }
    if (name === "description") {
      setDocumentDesc(value)
    }
    if (name === "document_type") {
      setDocumentType(value)
    }
    if (name === "documentWeight") {
      setDocumentWeight(value)
    }
  }

  const handleItemChange = (e) => {
    const { name, value } = e.target
    if (name === "new_item_profile") {
      if (e.target.checked) setItem({ ...item, new_item_profile: "1" })
      else setItem({ ...item, new_item_profile: "0" })
    } else {
      setItem({ ...item, [name]: value })
    }
  }

  const handleEditMadeChange = (e) => {
    setCountrySelections(e)
    if (e.length > 0) {
      countries.forEach((data) => {
        if (data.name === e[0].name) {
          editItem["made_in"] = data.alpha_code
        }
      })
    }
  }

  const handleItemDelete = (id) => {
    var totalqty = 0,
      totalweight = 0,
      totalcustoms = 0
    const newdata = [...data]
    const indexdata = data.findIndex((data) => data.id === id)
    newdata.splice(indexdata, 1)
    setData(newdata)

    newdata.forEach((element) => {
      totalqty += parseFloat(element.qty)
      totalweight += parseFloat(element.weight)
      totalcustoms += parseFloat(element.customs_value)
    })
    setItemTotals({
      totalQty: totalqty,
      totalWeight: totalweight,
      totalCustoms: totalcustoms,
    })
  }

  const handlePackageChange = (e) => {
    // packages.forEach((data)=>{
    //     if(data.id === e.target.value){
    //         setMaxWeight(data.max_weight)
    //         setMaxLength(data.max_length === "0.00" && (e.target.value === "2" || e.target.value === "1") ? "" : data.max_length)
    //         setMaxWidth(data.max_width === "0.00" && (e.target.value === "2" || e.target.value === "1") ? "" : data.max_width)
    //         setMaxHeight(data.max_height === "0.00" && (e.target.value === "2" || e.target.value === "1") ? "" : data.max_height)
    setUpperDetails({ ...upperDetails, packaging_type: e.target.value })
    setPackageDetails({
      ...packageDetails,
      length: data.max_length,
      width: data.max_width,
      height: data.max_height,
    })
    //     }
    if (e.target.value === "1") setIsCustomPackaging(true)
    else setIsCustomPackaging(false)
    //     if(e.target.value === "11")
    //         setAddActualWeight(true)
    //     else
    //         setAddActualWeight(false)
    // })
    packages.forEach((data) => {
      if (data.id === e.target.value) {
        setMaxWeight(data.max_weight)
        setMaxLength(
          data.max_length === "0.00" &&
            (e.target.value === "2" || e.target.value === "1")
            ? ""
            : data.max_length
        )
        setMaxWidth(
          data.max_width === "0.00" &&
            (e.target.value === "2" || e.target.value === "1")
            ? ""
            : data.max_width
        )
        setMaxHeight(
          data.max_height === "0.00" &&
            (e.target.value === "2" || e.target.value === "1")
            ? ""
            : data.max_height
        )
        setUpperDetails({ ...upperDetails, packaging_type: e.target.value })
        setPackageDetails({
          ...packageDetails,
          length: data.max_length,
          width: data.max_width,
          height: data.max_height,
        })
      }
      if (e.target.value === "2" || e.target.value === "1")
        setIsCustomPackaging(true)
      else setIsCustomPackaging(false)
      if (e.target.value === "11") setAddActualWeight(true)
      else setAddActualWeight(false)
    })
  }

  const handleClear = () => {
    Object.keys(sender).forEach((key) => {
      sender[key] = ""
    })
    setSender({ ...sender, sender_is_new: "0" })
    setSender({ ...sender, sender_country: "" })
    setSearchInput("")
    setSingleSelectionsSender([])

    Object.keys(recipient).forEach((key) => {
      recipient[key] = ""
    })
    setRecipient({ ...recipient, recipient_is_new: "0" })
    setRecipient({ ...recipient, recipient_is_residential: "0" })
    //setRecipient({...recipient, ship_date:new Date()})
    setSearchInput("")
    setSingleSelectionsRecipient([])
    refreshPage()
  }

  const handleClearItem = () => {
    Object.keys(item).forEach((key) => {
      item[key] = ""
    })
    setItem({ ...item, unit: "PCS", new_item_profile: "0" })
    setSearchInput("")
  }

  const handleAgreeChange = (e) => {
    if (e.target.checked) {
      setAgree(true)
    } else {
      setAgree(false)
    }
  }

  const handleSaveItem = (e) => {
    setIndex(index + 1)
    var totalqty = 0,
      totalweight = 0,
      totalcustoms = 0
    var newdata
    if (e.target.value === "add_item") {
      if (validateItemDetails(item, commodities, setIsItemError)) {
        item["id"] = index + 1
        if (
          item.new_item_profile === "" ||
          item.new_item_profile === undefined
        ) {
          setItem({ new_item_profile: "0" })
        }
        setData([...data, item])
        newdata = [...data, item]
        setItem({ unit: "PCS", new_item_profile: "0", hs_code: "" })
        setItemModal(false)
        setCountrySelections([])
      }
    }
    if (e.target.value === "edit_item") {
      if (validateItemDetails(editItem, commodities, setIsItemError)) {
        newdata = [...data]
        const indexdata = data.findIndex((data) => data.id === itemID)
        newdata[indexdata].id = editItem.id
        newdata[indexdata].description = editItem.description
        newdata[indexdata].hs_code = editItem.hs_code ? editItem.hs_code : ""
        newdata[indexdata].made_in = editItem.made_in
        newdata[indexdata].qty = editItem.qty
        newdata[indexdata].unit = editItem.unit
        newdata[indexdata].weight = editItem.weight
        newdata[indexdata].customs_value = editItem.customs_value
        newdata[indexdata].new_item_profile = editItem.new_item_profile
        setData(newdata)
        setEditItemModal(false)
        setIsEditing(false)
        setCountrySelections([])
      }
    }

    newdata.forEach((element) => {
      totalqty += parseFloat(element.qty)
      totalweight += parseFloat(element.weight)
      totalcustoms += parseFloat(element.customs_value)
    })
    setItemTotals({
      totalQty: totalqty,
      totalWeight: totalweight,
      totalCustoms: totalcustoms,
    })
  }
  //validate intl postal
  async function IsValidPostal() {
    const response = await validatePostal(
      recipient.recipient_country,
      recipient.recipient_postal,
      recipient.recipient_state_code
    )

    if (response.error) {
      if (Array.isArray(response.error.data.messages.errors)) {
        toast.error(
          response.error.data?.messages?.errors[0].code?.toUpperCase() +
            ": " +
            response.error.data?.messages?.errors[0].message.toUpperCase(),
          { autoClose: 4000, hideProgressBar: true }
        )
      } else {
        toast.error(response.error.data?.messages?.error.toUpperCase(), {
          autoClose: 4000,
          hideProgressBar: true,
        })
      }
      setLoading(false)
      return false
    } else {
      toast.success("RECIPIENT COUNTRY VALIDATIONS SUCCESSFUL!", {
        autoClose: 2000,
        hideProgressBar: true,
      })
      handlePackageValidation()
    }
  }

  const handlePackageValidation = () => {
    console.log("entered package validation")
    if (
      validatePackage(
        upperDetails,
        documentCustoms,
        documentDesc,
        documentType,
        documentWeight,
        maxWeight,
        data,
        commodities,
        setIsPackageError
      )
    ) {
      if (agree) {
        // toast.success("REDIRECTING TO CONFIRMATION...", {
        //   autoClose: 2000,
        //   hideProgressBar: true,
        // })
        // setTimeout(() => {
        //   navigation.next()
        // }, 2000)
        if (upperDetails["detail_type"] === "item") {
          //console.log(data)
          data.forEach((data) => {
            for (let key in data) {
              if (key != "id") {
                if (
                  data["new_item_profile"] === undefined ||
                  data["new_item_profile"] === ""
                ) {
                  data["new_item_profile"] = "0"
                }
                sendDetails[`${key}_${packageNumber}_${count}`] = `${data[key]}`
                //console.log(sendDetails);
              }
            }
            count++
          })
          data.forEach((data) => {
            item_weights += parseFloat(data.weight)
            item_customs += parseFloat(data.customs_value)
          })
          packageDetails["total_package_content_1"] = data.length.toString()
          packageDetails["total_customs_value_1"] = item_customs
          upperDetails["total_weight"] = item_weights
          packageDetails["weight_1"] = item_weights.toString()
        } else {
          sendDetails[`description_${packageNumber}_${packageNumber}`] =
            documentDesc
          sendDetails[`document_type_${packageNumber}_${packageNumber}`] =
            documentType
          sendDetails[`customs_value_${packageNumber}_${packageNumber}`] =
            documentCustoms
          upperDetails["purpose"] = ""
          packageDetails["total_package_content_1"] = "1"
          packageDetails["total_customs_value_1"] = documentCustoms
          //   item_weights = parseFloat(maxWeight);

          if (upperDetails.packaging_type === "11") {
            upperDetails["total_weight"] = documentWeight
            item_weights = documentWeight
          } else {
            item_weights = "0.5"
            upperDetails["total_weight"] = item_weights
          }
        }
        //   upperDetails["total_weight"] = parseFloat(upperDetails["total_weight"])+parseFloat(maxWeight) //to be transferred to add package button function

        if (
          parseFloat(item_weights) > parseFloat(maxWeight) &&
          upperDetails.packaging_type !== "11"
        ) {
          setLoadingPackage(false)
          toast.error("THE TOTAL UNIT OF ITEMS EXCEEDS THE PACKAGE WEIGHT.", {
            autoClose: 4000,
            hideProgressBar: true,
          })
          setLoading(false)
        } else {
          setLoadingPackage(true)

          packageDetails["weight_1"] = item_weights.toString()
          upperDetails["total_weight"] = upperDetails["total_weight"].toString()
          navigation.next()
          setLoading(false)
          // _attemptcreateTransaction()
        }
        // _attemptcreateTransaction()
      } else {
        setLoading(false)
        toast.error(
          "PLEASE CHECK CAPTCHA AND AGREE TO THE TERMS AND CONDITIONS",
          { autoClose: 2000, hideProgressBar: true }
        )
      }
    } else {
      setLoading(false)
      setLoadingPackage(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // if (captchaRef.current && !captcha ) {
    //     if (captchaRef.current.props.grecaptcha.getResponse().length !== 0) {
    //         setToken(captchaRef.current);
    //         setCaptcha(true)
    //         console.log(captchaRef)
    //         //captchaRef.current.reset();
    //     }
    // }

    //console.log(sender)
    if (sender.sender_firstname !== "" || sender.sender_company !== "") {
      if (
        recipient.recipient_firstname !== "" ||
        recipient.recipient_company !== ""
      ) {
        if (
          validateSender(
            sender,
            recipient,
            singleSelectionsSender,
            singleSelectionsRecipient,
            setIsError
          )
        ) {
          //POSTAL AWARE CONDITION HERE

          if (postalAware) {
            if (recipient.recipient_postal === "") {
              // setPostalValid(true)
              setLoading(false)
            } else {
              // setPostalValid(false)
              IsValidPostal()
              setLoading(true)
            }
          }
        } //validatesender
        else{
          setLoading(false)
        }
      } else {
        setLoading(false)
        toast.error("PLEASE PROVIDE RECIPIENT COMPANY OR NAME", {
          autoClose: 2000,
          hideProgressBar: true,
        })
      }
    } else {
      setLoading(false)
      toast.error("PLEASE PROVIDE SENDER COMPANY OR NAME", {
        autoClose: 2000,
        hideProgressBar: true,
      })
    }

    console.log("error list", isPackageError)

    // else{
    //     toast.error("PLEASE COMPLETE ALL REQUIRED FIELDS.");
    // }
  }

  async function _attemptcreateTransaction() {
    if (maxWeight != "") {
      setLoadingPackage(true)
      //console.log(sendDetails);
      const response = await createFedexTransac(
        sender,
        recipient,
        upperDetails,
        sendDetails,
        packageDetails
      )
      if (response.error) {
        console.log(response.error)
        if (
          response.error.data?.messages?.error ===
          "API key or token not authorized."
        ) {
          //removeUserSession();
        } else {
          if (Array.isArray(response.error.data.messages.errors)) {
            toast.error(
              response.error.data?.messages?.errors[0].code?.toUpperCase() +
                ": " +
                response.error.data?.messages?.errors[0].message.toUpperCase(),
              { autoClose: 4000, hideProgressBar: true }
            )
          } else {
            toast.error(response.error.data?.messages?.error.toUpperCase(), {
              autoClose: 4000,
              hideProgressBar: true,
            })
          }
          console.log(response.error)
          setSendDetails([])
          setLoadingPackage(false)
          // setIsClicked(false)
        }
      }
      if (response.data) {
        setGeneralDetails({
          detail_type: upperDetails["detail_type"],
          package_type: upperDetails["packaging_type"],
          service_type: upperDetails["service_type"],
          service_id: "1",
        })
        setTransactionDetails({ ...response.data })
        setType("fedex")
        console.log(response.data)
        // generalDetails["detail_type"] = upperDetails["detail_type"]
        // generalDetails["package_type"] = upperDetails["packaging_type"]
        // generalDetails["service_type"] = upperDetails["service_type"]
        // generalDetails["service_id"] = "1"
        toast.success(
          "YOUR TRANSACTION WAS CREATED SUCCESSFULLY! REDIRECTING YOU TO PAYMENTS...",
          { autoClose: 2000, hideProgressBar: true }
        )
        setTimeout(() => {
          navigation.next()
          setLoadingPackage(false)
          // navigateto("/payment/fedex", {state: {transactionDetails: response.data, generalDetails:generalDetails}})
        }, 4000)
      }
    }
  }

  const handlePostalChange = (e) => {
    setSender({ ...sender, sender_postal: e.target.value })
    checkPostal(e.target.value)
  }
  const handlePostalChangeRecipient = (e) => {
    setRecipient({ ...recipient, recipient_postal: e.target.value })
    if (recipient.recipient_country != "") {
      checkPostalRecipient(e.target.value, recipient.recipient_country)
    }
  }
  const checkPostalRecipient = (postaldata, country) => {
    if (postaldata !== "") {
      intlpostals.map((data) => {
        if (postaldata === data.postal && data.country === country) {
          setRecipient({
            ...recipient,
            recipient_postal: postaldata,
            recipient_city: data.city,
            recipient_state_code: data.state,
          })
        }
      })
    } else {
      setRecipient({
        ...recipient,
        recipient_postal: "",
        recipient_city: "",
        recipient_state_code: "",
      })
    }
  }

  const checkPostal = (postaldata) => {
    if (postaldata !== "") {
      phpostals.map((data) => {
        if (postaldata === data.postal) {
          setSender({
            ...sender,
            sender_postal: postaldata,
            sender_city: data.city,
            sender_state_code: data.province,
          })
        }
      })
    } else {
      setSender({
        ...sender,
        sender_postal: "",
        sender_city: "",
        sender_state_code: "",
      })
    }
  }
  /* API Calls */
  // useEffect( () => {
  //     getCountries()

  // },[])

  if (redirect === "next") {
    return <Navigate to="/Confirmation" />
  }

  // console.log(isItem)
  // console.log(isDocument)

  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <h1 className="row mb-4 text-center header title mt-5 ml-5">
          PLACE BOOKING
        </h1>

        <div className="row left h-35">
          <div className="col-3 w-auto ml-15">
            <button
              key={1}
              id={"1"}
              className={
                tabActive === "1" ? "btn-tab-active left" : "btn-tab left"
              }
              onClick={handleTabActive}
            >
              {" "}
              INTERNATIONAL{" "}
            </button>
          </div>
          {/* <div className='col-3 w-auto'>
                <button 
                    key={2}
                    id={"2"}
                    className={tabActive === "2" ? 'btn-tab-active left' : 'btn-tab left'}
                    onClick={handleTabActive}
                    > Local </button>
            </div> */}
        </div>

        <div className="container form-cont mt-0 main-cont mb-4">
          <ToastContainer />

          {/* SENDER */}
          <div className="container">
            <h1 className="row mb-4 text-center header title center">
              SENDER DETAILS
            </h1>
            <div className="row mb-4">
              <div className="col-6">
                <div className="form-group">
                  <p className="input-subtitle">Name</p>
                  <input
                    type="text"
                    name="sender_firstname"
                    className="form-control input-subtitle"
                    id="sender_firstname"
                    aria-describedby="sender_firstname"
                    placeholder="e.g. Juan Dela Cruz Jr."
                    onChange={(e) =>
                      setSender({ ...sender, [e.target.name]: e.target.value })
                    }
                    required
                    value={sender.sender_firstname}
                  />
                  {/* <input type="text" name="sender_firstname" className="form-control" id="first-name" aria-describedby="first-name" placeholder="e.g. Jane" onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_firstname}/> */}
                  {/* <InputError isValid={isError.sender_firstname} message={'First name is required*'}/> */}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p className="input-subtitle">Company Name</p>
                  <input
                    type="text"
                    name="sender_company"
                    className="form-control input-subtitle"
                    id="sender_company"
                    aria-describedby="sender_company"
                    onChange={(e) =>
                      setSender({ ...sender, [e.target.name]: e.target.value })
                    }
                    value={sender.sender_company}
                  />
                  {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_company} */}
                  <InputError
                    isValid={isError.sender_company_short}
                    message={"Company Name must contain at least 3 characters."}
                  />
                  <InputError
                    isValid={isError.sender_company_long}
                    message={"Company Name must not exceed 35 characters."}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-3">
                <div className="form-group">
                  <p className="input-subtitle">
                    Country<span className="required-icon">*</span>
                  </p>
                  <input
                    type="text"
                    name="sender_company"
                    className="form-control input-subtitle"
                    id="sender_company"
                    aria-describedby="sender_company"
                    value={"Philippines"}
                    style={{ color: "var(--secondary-color)" }}
                  />
                  <InputError
                    isValid={isError.sender_country}
                    message={"Country is required*"}
                  />
                </div>
              </div>

              <div className="col-3">
                <div className="form-group">
                  <p className="input-subtitle">
                    Postal Code<span className="required-icon">*</span>
                  </p>
                  <input
                    type="text"
                    className="form-control input-subtitle"
                    id="postal"
                    aria-describedby="postal"
                    name="sender_postal"
                    onChange={handlePostalChange}
                    value={sender.sender_postal}
                    // disabled={!postalAware}
                    required
                  />
                  <InputError
                    isValid={isError.sender_postal}
                    message={"Postal Code is required*"}
                  />
                </div>
              </div>

              <div className="col-3">
                {/* <div className="col-6"> */}
                <div className="form-group">
                  <p className="input-subtitle">
                    State/Province<span className="required-icon">*</span>
                  </p>
                  <input
                    type="text"
                    name="sender_state_code"
                    className="form-control input-subtitle"
                    id="sender_state_code"
                    aria-describedby="sender_state_code"
                    required
                    onChange={(e) =>
                      setSender({ ...sender, [e.target.name]: e.target.value })
                    }
                    value={sender.sender_state_code}
                  />
                  <InputError
                    isValid={isError.sender_state_code}
                    message={"State/Province is required*"}
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <p className="input-subtitle">
                    City<span className="required-icon">*</span>
                  </p>
                  <input
                    type="text"
                    name="sender_city"
                    className="form-control input-subtitle"
                    id="sender_city"
                    aria-describedby="sender_city"
                    required
                    onChange={(e) =>
                      setSender({ ...sender, [e.target.name]: e.target.value })
                    }
                    value={sender.sender_city}
                  />
                  {/* <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="name"
                                    onChange={handleCityChange}
                                    options={cities}
                                    placeholder="Enter a city"
                                    selected={citySelections}
                                /> */}
                  <InputError
                    isValid={isError.sender_city}
                    message={"City is required*"}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-4">
                <div className="form-group">
                  <p className="input-subtitle">
                    Address Line 1<span className="required-icon">*</span>
                  </p>
                  <input
                    type="text"
                    name="sender_address1"
                    className="form-control input-subtitle"
                    id="sender_address1"
                    aria-describedby="sender_address1"
                    placeholder="Unit Number/ Building/ Street Number/ Village/ Barangay"
                    maxLength="35"
                    onChange={(e) =>
                      setSender({ ...sender, [e.target.name]: e.target.value })
                    }
                    required
                    value={sender.sender_address1}
                  />
                  {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_address1} */}
                  <InputError
                    isValid={isError.sender_address1}
                    message={"Address 1 is required*"}
                  />
                  <InputError
                    isValid={isError.sender_address_len}
                    message={"Address 1 must contain at least 3 characters."}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <p className="input-subtitle">Address Line 2</p>
                  <input
                    type="text"
                    className="form-control input-subtitle"
                    id="sender_address2"
                    aria-describedby="sender_address2"
                    name="sender_address2"
                    maxLength="35"
                    onChange={(e) =>
                      setSender({ ...sender, [e.target.name]: e.target.value })
                    }
                    required
                    value={sender.sender_address2}
                  />
                  {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_address2} */}
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <p className="input-subtitle">Address Line 3</p>
                  <input
                    type="text"
                    className="form-control input-subtitle"
                    id="sender_address3"
                    aria-describedby="sender_address3"
                    name="sender_address3"
                    maxLength="35"
                    onChange={(e) =>
                      setSender({ ...sender, [e.target.name]: e.target.value })
                    }
                    required
                    value={sender.sender_address3}
                  />
                  {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_address2} */}
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-6">
                <div className="form-group">
                  <p className="input-subtitle">
                    Contact Number<span className="required-icon">*</span>
                  </p>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text input-subtitle"
                        id="basic-addon1"
                      >
                        +63
                      </span>
                    </div>
                    <input
                      type="text"
                      onWheel={() => document.activeElement.blur()}
                      name="sender_contact_no"
                      className="form-control input-subtitle"
                      aria-label="contact"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        setSender({
                          ...sender,
                          [e.target.name]: e.target.value,
                        })
                      }
                      required
                      value={sender.sender_contact_no}
                      onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  maxLength={11}
                  
                    />
                    {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_contact_no} */}
                  </div>
                  <InputError
                    isValid={isError.sender_contact_no}
                    message={"Contact no. is required*"}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p className="input-subtitle">Email Address</p>
                  <input
                    type="email"
                    name="sender_email"
                    className="form-control input-subtitle"
                    id="email-add"
                    aria-describedby="email-add"
                    onChange={(e) =>
                      setSender({ ...sender, [e.target.name]: e.target.value })
                    }
                    value={sender.sender_email}
                  />
                  {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_email} */}
                </div>
              </div>
            </div>
            <hr></hr>
          </div>

          {/* RECIPIENT */}
          <div className="container">
            <ToastContainer />
            <h1 className="row mb-4 text-center header mt-5  title center">
              RECIPIENT DETAILS
            </h1>
            <div className="row mb-4"></div>
            <div className="row mb-4">
              <div className="col-6">
                <div className="form-group">
                  <p className="input-subtitle">Name</p>
                  <input
                    type="text"
                    className="form-control input-subtitle"
                    id="recipient_firstname"
                    aria-describedby="recipient_firstname"
                    name="recipient_firstname"
                    placeholder="e.g. John Smith Jr."
                    required
                    onChange={(e) => handleChange(e)}
                    value={recipient.recipient_firstname}
                  />
                  {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_firstname}  */}
                  {/* <InputError isValid={isError.recipient_firstname} message={'First name is required*'}/> */}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p className="input-subtitle">Company Name</p>
                  <input
                    type="text"
                    className="form-control input-subtitle"
                    id="recipient_company"
                    aria-describedby="recipient_company"
                    name="recipient_company"
                    onChange={(e) => handleChange(e)}
                    value={recipient.recipient_company}
                  />
                  {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_company} */}
                  <InputError
                    isValid={isError.recipient_company_short}
                    message={"Company Name must contain at least 3 characters."}
                  />
                  <InputError
                    isValid={isError.recipient_company_long}
                    message={"Company Name must not exceed 35 characters."}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-3">
                <div className="form-group">
                  <p className="input-subtitle">
                    Country<span className="required-icon">*</span>
                  </p>
                  {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                  <Typeahead
                    className=" input-subtitle"
                    id="basic-typeahead-single"
                    labelKey="name"
                    onChange={handleCountryChange}
                    options={countries}
                    placeholder="Enter a country"
                    selected={singleSelectionsRecipient}
                  />
                  <InputError
                    isValid={isError.recipient_country}
                    message={"Country is required*"}
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <p className="input-subtitle">
                    Postal Code<span className="required-icon">*</span>
                  </p>
                  <input
                    type="text"
                    className="form-control input-subtitle"
                    id="recipient_postal"
                    aria-describedby="recipient_postal"
                    name="recipient_postal"
                    required
                    onChange={(e) => handlePostalChangeRecipient(e)}
                    value={recipient.recipient_postal}
                  />
                  {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_postal} */}
                  <InputError
                    isValid={isError.recipient_postal}
                    message={"Postal code is required*"}
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <p className="input-subtitle">
                    State/Province<span className="required-icon">*</span>
                  </p>
                  <input
                    type="text"
                    className="form-control input-subtitle"
                    id="recipient_state_code"
                    aria-describedby="recipient_state_code"
                    name="recipient_state_code"
                    onChange={(e) => handleChange(e)}
                    value={recipient.recipient_state_code}
                  />
                  {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_state_code} */}
                  <InputError
                    isValid={isError.recipient_state_code}
                    message={"State is required*"}
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <p className="input-subtitle">
                    City<span className="required-icon">*</span>
                  </p>
                  <input
                    type="text"
                    className="form-control input-subtitle"
                    id="recipient_city"
                    aria-describedby="recipient_city"
                    name="recipient_city"
                    required
                    onChange={(e) => handleChange(e)}
                    value={recipient.recipient_city}
                  />
                  {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_city}  */}
                  <InputError
                    isValid={isError.recipient_city}
                    message={"City must be at least 3 letters*"}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-4">
                <div className="form-group">
                  <p className="input-subtitle">
                    Address Line 1<span className="required-icon">*</span>
                  </p>
                  <input
                    type="text"
                    name="recipient_address1"
                    className="form-control input-subtitle"
                    id="recipient_address1"
                    aria-describedby="recipient_address1"
                    placeholder="Unit Number/ Building/ Street Number/ Village/ Barangay"
                    maxLength="35"
                    onChange={(e) => handleChange(e)}
                    required
                    value={recipient.recipient_address1}
                  />
                  {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} required value={sender.sender_address1} */}
                  <InputError
                    isValid={isError.sender_address1}
                    message={"Address 1 is required*"}
                  />
                  <InputError
                    isValid={isError.sender_address_len}
                    message={"Address 1 must contain at least 3 characters."}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <p className="input-subtitle">Address Line 2</p>
                  <input
                    type="text"
                    className="form-control input-subtitle"
                    id="recipient_address2"
                    aria-describedby="recipient_address2"
                    name="recipient_address2"
                    maxLength="35"
                    onChange={(e) => handleChange(e)}
                    value={recipient.recipient_address2}
                  />
                  {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_address2} */}
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <p className="input-subtitle">Address Line 3</p>
                  <input
                    type="text"
                    className="form-control input-subtitle"
                    id="recipient_address3"
                    aria-describedby="recipient_address3"
                    name="recipient_address3"
                    maxLength="35"
                    onChange={(e) => handleChange(e)}
                    value={recipient.recipient_address3}
                  />
                  {/* onChange={(e)=>setSender({...sender, [e.target.name]: e.target.value})} value={sender.sender_address2} */}
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-6">
                <div className="form-group">
                  <p className="input-subtitle">
                    Contact Number<span className="required-icon">*</span>
                  </p>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text input-subtitle"
                        id="basic-addon1"
                        name="country_code"
                      >
                        +63
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control input-subtitle"
                      aria-label="contact"
                      aria-describedby="basic-addon1"
                      name="recipient_contact_no"
                      required
                      onChange={(e) => handleChange(e)}
                      value={recipient.recipient_contact_no}
                    />
                    {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_contact_no}  */}
                  </div>
                  <InputError
                    isValid={isError.recipient_contact_no}
                    message={"Contact no. is required*"}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p className="input-subtitle">Email Address</p>
                  <input
                    type="email"
                    className="form-control input-subtitle"
                    id="email-add"
                    aria-describedby="email-add"
                    name="recipient_email"
                    onChange={(e) => handleChange(e)}
                    value={recipient.recipient_email}
                  />
                  {/* onChange={(e)=>handleChange(e)} value={recipient.recipient_email} */}
                </div>
              </div>
            </div>
            <hr></hr>
          </div>

          {/* PACKAGE DETAILS */}
          <div className="container">
            <h1 className="row mb-4 text-center header mt-5  title center">
              PACKAGE DETAILS
            </h1>
            <div className="row mb-3">
              {/* <div className="col-4">
                <div className="form-group border-grey">
                  <p className="input-subtitle">
                    Ship Date<span className="required-icon">*</span>
                  </p>
                  <input
                    type="date"
                    name="ship_date"
                    onChange={(e) => handleChange(e)}
                    value={recipient.ship_date}
                   
                    className="modal-input date-input reports-date form-control bg-grey"
                   
                  />
                </div>
              </div> */}
              <div className="col-6">
                <div className="form-group border-grey">
                  <p className="input-subtitle">
                    Ship Service<span className="required-icon">*</span>
                  </p>
                  <Form.Select
                    size="md"
                    className="bg-grey"
                    name="service_type"
                    value={upperDetails.service_type}
                    onChange={handleSelectChange}
                  >
                    <option
                      defaultValue
                      key="2"
                      value="FEDEX_INTERNATIONAL_PRIORITY"
                    >
                      FedEx International Priority®
                    </option>
                    {services.map((data) => {
                      if (data.id != "2") {
                        return (
                          <option key={data.id} value={data.enumeration}>
                            {data.name}
                          </option>
                        )
                      }
                    })}
                  </Form.Select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group border-grey">
                  <p className="input-subtitle">
                    What are you sending?
                    <span className="required-icon">*</span>
                  </p>
                  {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                  <select
                    className="filter-dropdown form-control bg-grey"
                    name="sending"
                    value={upperDetails.detail_type}
                    onChange={handleSendType}
                    //onChange={(e) => handleFilterChange(e)}
                  >
                    <option defaultValue value="item">
                      Item
                    </option>
                    <option value="document">Document</option>
                  </select>
                </div>
              </div>
            </div>
            {isItem && (
              <div className="row mb-3">
                <div className="col-4">
                  <div className="form-group border-grey">
                    <p className="input-subtitle">
                      Package Type<span className="required-icon">*</span>
                    </p>
                    <Form.Select
                      size="md"
                      className="bg-grey"
                      name="packaging_type"
                      value={upperDetails.packaging_type}
                      onChange={handlePackageChange}
                    >
                      <option defaultValue>Select</option>
                      {packages.map((data) => {
                        return (
                          <option key={data.id} value={data.id}>
                            {data.name}
                          </option>
                        )
                      })}
                    </Form.Select>
                    {/* <select
                      className="filter-dropdown form-control bg-grey"
                      name="packageType"
                      value={upperDetails.packaging_type}
                      onChange={handlePackageChange}
                      //onChange={(e) => handleFilterChange(e)}
                    >
                      <option value="">Select</option>
                      <option value="1">Custom</option>
                      <option value="2">Letter</option>
                      <option value="3">box</option>
                    </select> */}
                    <InputError
                      isValid={isPackageError.packaging_type}
                      message={"Package type is required*"}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group border-grey">
                    <p className="input-subtitle">
                      Shipment Purpose<span className="required-icon">*</span>
                    </p>
                    {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                    <select
                      className="filter-dropdown form-control bg-grey"
                      name="shipmentPurpose"
                      // value={upperDetails.purpose}
                      onChange={handleSelectChange}
                      //onChange={(e) => handleFilterChange(e)}
                    >
                      <option defaultValue value="Commercial">
                        Commercial
                      </option>
                      <option value="Gift">Gift</option>
                      <option value="Sample">Sample</option>
                      <option value="Repair and Return">
                        Repair and Return
                      </option>
                      <option value="Personal Effects">Personal Effects</option>
                      <option value="Personal Use">Personal Use</option>
                    </select>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group border-grey">
                    <p className="input-subtitle">
                      Invoice for customs
                      <span className="required-icon">*</span>
                    </p>
                    {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                    <select
                      className="filter-dropdown form-control bg-grey"
                      name="invoice"
                      //value={upperDetails.customs_invoice}
                      onChange={handleSelectChange}
                      //onChange={(e) => handleFilterChange(e)}
                    >
                      <option value="pro_forma_invoice">
                        I want FedEx to help me create a pro-forma invoice
                      </option>
                      <option value="own_invoice">
                        I will create my own invoice
                      </option>
                      <option value="commercial_invoice">
                        I want FedEx to help me create a commercial invoice
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="row mb-4">
              {isDocument && (
                <>
                  <div className="col-6">
                    <div className="form-group border-grey">
                      <p className="input-subtitle">
                        Package Type<span className="required-icon">*</span>
                      </p>
                      <Form.Select
                        size="md"
                        className="bg-grey"
                        name="packaging_type"
                        value={upperDetails.packaging_type}
                        onChange={handlePackageChange}
                      >
                        <option defaultValue>Select</option>
                        {packages.map((data) => {
                          return (
                            <option key={data.id} value={data.id}>
                              {data.name}
                            </option>
                          )
                        })}
                      </Form.Select>
                      {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                      {/* <select
                        className="filter-dropdown form-control bg-grey"
                        name="packageType"
                        value={upperDetails.packaging_type}
                        onChange={handlePackageChange}
                        //onChange={(e) => handleFilterChange(e)}
                      >
                        <option value="">Select</option>
                        <option value="1">Custom</option>
                        <option value="2">Letter</option>
                        <option value="3">box</option>
                      </select> */}
                      <InputError
                        isValid={isPackageError.packaging_type}
                        message={"Package type is required*"}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group border-grey">
                      <p className="input-subtitle">
                        Invoice for customs
                        <span className="required-icon">*</span>
                      </p>
                      {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                      <select
                        className="filter-dropdown form-control bg-grey"
                        name="invoice"
                        //value={upperDetails.customs_invoice}
                        onChange={handleSelectChange}
                        //onChange={(e) => handleFilterChange(e)}
                      >
                        <option value="pro_forma_invoice">
                          I want FedEx to help me create a pro-forma invoice
                        </option>
                        <option value="own_invoice">
                          I will create my own invoice
                        </option>
                        <option value="commercial_invoice">
                          I want FedEx to help me create a commercial invoice
                        </option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="col-6 mt-3">
                <div className="form-group">
                  <p className="input-subtitle">Dimensions</p>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control input-subtitle"
                      aria-label="dimension"
                      placeholder="length"
                      value={maxLength}
                      onChange={(e) => {
                        setMaxLength(e.target.value)
                        setPackageDetails({
                          ...packageDetails,
                          length: e.target.value,
                        })
                      }}
                      disabled={!isCustomPackaging}
                    />
                    <input
                      type="number"
                      className="form-control input-subtitle"
                      aria-label="dimension"
                      placeholder="width"
                      value={maxWidth}
                      onChange={(e) => {
                        setMaxWidth(e.target.value)
                        setPackageDetails({
                          ...packageDetails,
                          width: e.target.value,
                        })
                      }}
                      disabled={!isCustomPackaging}
                    />
                    <input
                      type="number"
                      className="form-control input-subtitle"
                      aria-label="dimension"
                      placeholder="height"
                      value={maxHeight}
                      onChange={(e) => {
                        setMaxHeight(e.target.value)
                        setPackageDetails({
                          ...packageDetails,
                          height: e.target.value,
                        })
                      }}
                      disabled={!isCustomPackaging}
                    />
                    <span className="input-group-text bg-white  input-subtitle">
                      cm
                    </span>

                    {/* value={maxLength} onChange={(e)=>{setMaxLength(e.target.value); setPackageDetails({...packageDetails, length:e.target.value})}} disabled={!isCustomPackaging} */}
                  </div>
                </div>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <p className="input-subtitle">
                    Max Weight<span className="required-icon">*</span>
                  </p>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control input-subtitle"
                      aria-label="max-weight"
                      value={maxWeight}
                      disabled
                    />
                    {/* value={maxWeight} disabled */}
                    <div className="input-group-append">
                      <span className="input-group-text bg-white input-subtitle">
                        kg
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {isItem && (
                <>
                  <div className="col-6 left mt-3">
                    <div className="form-group">
                      <input
                        type="checkbox"
                        className="custom-control-inpu mr-10 "
                        id="purchase-limit"
                        name="higher_limit_liability"
                        checked={
                          upperDetails.higher_limit_liability === "1"
                            ? true
                            : false
                        }
                        onChange={handleSelectChange}
                      />
                      {/* checked={upperDetails.higher_limit_liability === "1"? true:false} onChange={handleSelectChange} */}
                      {/* <p className='input'>Dimensions</p> */}
                      <label
                        className="custom-control-label input-subtitle pad-left5"
                        htmlFor="purchase-limit"
                      >
                        Purchase a higher limit of liability from FedEx
                      </label>
                    </div>
                  </div>
                  <div className="col-6 left mt-3">
                    <div className="form-group text-align-left left">
                      <input
                        type="checkbox"
                        className="custom-control-inpu mr-10 text-align-left"
                        id="signature-req"
                        name="signature_required"
                        checked={
                          upperDetails.signature_required === "1" ? true : false
                        }
                        onChange={handleSelectChange}
                      />
                      {/* checked={upperDetails.signature_required === "1"? true:false} onChange={handleSelectChange} */}
                      <label
                        className="custom-control-label input-subtitle text-align-left pad-left5"
                        htmlFor="signature-req"
                      >
                        Require Signature
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>

            {isDocument && (
              <>
                <div className="row mb-4 mt-3">
                  <div className="col-6 left mt-3">
                    <div className="form-group">
                      <input
                        type="checkbox"
                        className="custom-control-inpu mr-10 "
                        id="purchase-limit"
                        name="higher_limit_liability"
                        checked={
                          upperDetails.higher_limit_liability === "1"
                            ? true
                            : false
                        }
                        onChange={handleSelectChange}
                      />
                      {/* checked={upperDetails.higher_limit_liability === "1"? true:false} onChange={handleSelectChange} */}
                      {/* <p className='input'>Dimensions</p> */}
                      <label
                        className="custom-control-label input-subtitle pad-left5"
                        htmlFor="purchase-limit"
                      >
                        Purchase a higher limit of liability from FedEx
                      </label>
                    </div>
                  </div>
                  <div className="col-6 left mt-3">
                    <div className="form-group text-align-left left">
                      <input
                        type="checkbox"
                        className="custom-control-inpu mr-10 text-align-left"
                        id="signature-req"
                        name="signature_required"
                        checked={
                          upperDetails.signature_required === "1" ? true : false
                        }
                        onChange={handleSelectChange}
                      />
                      {/* checked={upperDetails.signature_required === "1"? true:false} onChange={handleSelectChange} */}
                      <label
                        className="custom-control-label input-subtitle text-align-left pad-left5"
                        htmlFor="signature-req"
                      >
                        Require Signature
                      </label>
                    </div>
                  </div>
                  <div className="col-4 left mt-3"></div>
                </div>
                <div className="row mb-4 mt-3">
                  <div className="col-4">
                    <div className="form-group border-grey">
                      <p className="input-subtitle">
                        Type of Document<span className="required-icon">*</span>
                      </p>
                      {/* <input type="text" className="form-control" id="country" aria-describedby="country"/> */}
                      <select
                        className="filter-dropdown form-control bg-grey"
                        name="document_type"
                        value={documentType}
                        onChange={handleDocumentChange}
                        //onChange={(e) => handleFilterChange(e)}
                      >
                        <option defaultValue>Select</option>
                        <option value="Personal">Personal (e.g. letter)</option>
                        <option value="Interoffice">
                          Interoffice (e.g. memo)
                        </option>
                        <option value="Business">
                          Business (e.g. contract)
                        </option>
                        <option value="Others">Others</option>
                      </select>
                      <InputError
                        isValid={isPackageError.documentType}
                        message={"Package type is required*"}
                      />
                    </div>
                  </div>
                  <div className="col-4 ">
                    <div className="form-group border-grey">
                      <p className="input-subtitle">
                        Document Description
                        <span className="required-icon">*</span>
                      </p>
                      <input
                        type="text"
                        className="form-control bg-grey"
                        aria-label="max-weight"
                        name="description"
                        value={documentDesc}
                        onChange={handleDocumentChange}
                      />
                      <InputError
                        isValid={isPackageError.documentDesc}
                        message={"Document description is required*"}
                      />
                      <InputError
                        isValid={isPackageError.documentDesc_comm_error}
                        message={"Invalid Description*"}
                      />
                    </div>
                  </div>
                  <div className="col-4 ">
                    <div className="form-group border-grey">
                      <p className="input-subtitle">
                        Customs Value<span className="required-icon">*</span>
                      </p>
                      <input
                        type="number"
                        className="form-control bg-grey"
                        aria-label="max-weight"
                        name="customs_value"
                        value={documentCustoms}
                        onChange={handleDocumentChange}
                      />
                      <InputError
                        isValid={isPackageError.documentCustoms}
                        message={"Customs value is required*"}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <hr></hr>
            {/* package details div */}
          </div>

          {/* ITEM DETAILS */}
          <div className="container">
            {isItem && (
              <>
                <h1 className="row mb-4 text-center header mt-5  title center">
                  ITEM DETAILS
                </h1>
                <div className="row mb-6">
                  <div className="col-6"></div>
                  <div className="col-6">
                    <div className="form-group">
                      <button
                        className="btn-clear btn-rad right"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={openModal}
                      >
                        {" "}
                        + Item{" "}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row container-fluid table-overflow">
                  <table className="table table-bordered table-hover item-table mt-3">
                    <thead className="item-table-headers">
                      <tr>
                        {headers.map((row) => (
                          <th align="left" scope="col">
                            {row.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((row, index) => (
                        <tr key={index}>
                          <td align="left" className="input-subtitle">
                            {row.description}
                          </td>
                          <td align="left" className="input-subtitle">
                            {row.hs_code}
                          </td>
                          <td align="left" className="input-subtitle">
                            {row.made_in}
                          </td>
                          <td align="center" className="input-subtitle">
                            {row.qty}
                          </td>
                          <td align="center" className="input-subtitle">
                            {row.unit}
                          </td>
                          <td align="center" className="input-subtitle">
                            {row.weight}
                          </td>
                          <td align="center" className="input-subtitle">
                            {row.customs_value}
                          </td>
                          <td
                            align="center"
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <img
                              src={editicon}
                              className="tb-icons"
                              name={row.hs_code}
                              onClick={() => handleItemEdit(row.id)}
                            />
                            <img
                              src={deleteicon}
                              className="tb-icons"
                              name={row.hs_code}
                              onClick={() => handleItemDelete(row.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="item-table-headers">
                      <tr style={{ backgroundColor: "#EFEFEF" }}>
                        <td
                          colspan="3"
                          align="right"
                          className="input-subtitle blue-txt"
                        >
                          TOTAL:
                        </td>
                        <td align="center" className="input-subtitle blue-txt">
                          {itemTotals.totalQty}
                        </td>
                        <td align="right" className="input-subtitle blue-txt">
                          -
                        </td>
                        <td align="center" className="input-subtitle blue-txt">
                          {itemTotals.totalWeight}
                        </td>
                        <td align="center" className="input-subtitle blue-txt">
                          {itemTotals.totalCustoms}
                        </td>
                        <td align="right" className="input-subtitle blue-txt">
                          -
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <InputError
                  isValid={isPackageError.data}
                  message={"Item Detail is required*"}
                />
              </>
            )}

            {/* <div className='row mb-4'>
                        <div className='col-4'></div>
                        <div className='col-4 center'>
                            <ReCAPTCHA 
                                className='center'
                                sitekey="6Lc4EiQhAAAAAOgVr1rGx6VUoM9z5fNk0zyPgnzY"
                                ref={captchaRef}
                                onChange={()=>setCaptcha(true)}
                                //data-callback="recaptchaCallback"
                                // onClick={recaptchaCallback}
                            />
                            
                        </div>

                        
                    </div> */}

            <div className="row mb-4">
              <div className="col-6 left mt-3">
                <div className="form-group">
                  <input
                    type="checkbox"
                    className="custom-control-inpu mr-10 "
                    id="agreement"
                    name="agreement"
                    checked={agree}
                    onChange={handleAgreeChange}
                  />
                  {/* checked={upperDetails.higher_limit_liability === "1"? true:false} onChange={handleSelectChange} */}
                  {/* <p className='input'>Dimensions</p> */}
                  <label
                    className="custom-control-label input-subtitle pad-left5"
                    htmlFor="purchase-limit"
                  >
                    I agree to the{" "}
                  </label>
                  <a> </a>
                  <a className="pink-text">Terms and Conditions</a>
                </div>
              </div>

              <div className="col-6">
                <div className="form-group row mb-6"></div>
                <div className="form-group row mt-2">
                  <div className="col-3"></div>
                  <div className="col-3"></div>
                  <div className="col-3">
                    <button
                      className="btn-pink btn-rad right "
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={handleClear}
                    >
                      {" "}
                      Clear All{" "}
                    </button>
                  </div>
                  <div className="col-3">
                    {loading ? (
                      <button
                        className="btn-blue btn-rad"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{ textAlign: "-webkit-center" }}
                      >
                        <ReactLoading
                          type="balls"
                          color="#FFFFFF"
                          height={20}
                          width={25}
                        />
                      </button>
                    ) : (
                      <button
                        className="btn-blue btn-rad right"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={handleSubmit}
                      >
                        {" "}
                        Next{" "}
                      </button>
                    )}
                  </div>
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
            <Modal.Header closeButton className="item-modal-header center">
              <Modal.Title
                id="contained-modal-title-vcenter"
                className="fw-bold center"
              >
                ITEM FORM
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="fw-bold">
              <div className="row mb-4">
                {/* {hasResult ? "row":"row mb-4"} */}
                <div className="input-group form-group">
                  <input
                    type="text"
                    className="form-control search-input input-subtitle"
                    aria-label="Search"
                    placeholder="Search Item..."
                  />
                  {/* value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} */}
                  <div className="input-group-append">
                    <span
                      className="input-group-text search-icon"
                      id="basic-addon1"
                    >
                      <img src={glass} alt="search" className="search-icon" />
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
                  <div className="form-group input-subtitle">
                    <p className="input-subtitle">
                      Description<span className="required-icon">*</span>
                    </p>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group ">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control input-subtitle"
                        aria-label="description"
                        name="description"
                        value={item.description}
                        onChange={(e) => handleItemChange(e)}
                      />
                      {/* value={item.description} onChange={(e)=>handleItemChange(e)} */}
                    </div>
                    <InputError
                      isValid={isItemError.description}
                      message={"Description is required*"}
                    />
                    <InputError
                      isValid={isItemError.description_comm_error}
                      message={"Invalid Description"}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-3">
                  <div className="form-group input-subtitle">
                    <label htmlFor="hs_code">HS Code </label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control input-subtitle"
                        aria-label="hs_code"
                        name="hs_code"
                        value={item.hs_code}
                        onChange={(e) => handleItemChange(e)}
                      />
                      {/* value={item.hs_code} onChange={(e)=>handleItemChange(e)} */}
                    </div>
                    <InputError
                      isValid={isItemError.hs_code}
                      message={"HS Code is required*"}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-3">
                  <div className="form-group input-subtitle">
                    <p className="input-subtitle">
                      Made In<span className="required-icon">*</span>
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <div className="input-group">
                      <Typeahead
                        id=""
                        labelKey="name"
                        className="type input-subtitle"
                        onChange={handleMadeChange}
                        options={countries}
                        placeholder="Enter a country"
                        selected={countrySelections}
                      />
                      {/* <Form.Select size="md" name="made_in" value={item.made_in} onChange={handleItemChange}>
                                        <option defaultValue>Select</option>
                                        {countries.map((data) => {return(<option class="color-black" key={data.id} value={data.alpha_code}>{data.name}</option>)})}
                                    </Form.Select> */}
                    </div>
                  </div>
                  <InputError
                    isValid={isItemError.made_in}
                    message={"Made in is required*"}
                  />
                </div>

                <div className="col-3">
                  <div className="form-group input-subtitle">
                    <p className="input-subtitle">
                      Weight<span className="required-icon">*</span>
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control input-subtitle"
                        aria-label="weight"
                        name="weight"
                        value={item.weight}
                        onChange={(e) => handleItemChange(e)}
                      />
                      {/* value={item.weight} onChange={(e)=>handleItemChange(e)} */}
                      <div className="input-group-append">
                        <span className="input-group-text bg-white input-subtitle">
                          kg
                        </span>
                      </div>
                    </div>
                  </div>
                  <InputError
                    isValid={isItemError.weight}
                    message={"Weight is required*"}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-3">
                  <div className="form-group input-subtitle">
                    <p className="input-subtitle">
                      Quantity<span className="required-icon">*</span>
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control input-subtitle"
                        aria-label="qty"
                        name="qty"
                        value={item.qty}
                        onChange={(e) => handleItemChange(e)}
                      />
                      {/* value={item.qty} onChange={(e)=>handleItemChange(e)} */}
                    </div>
                  </div>
                  <InputError
                    isValid={isItemError.qty}
                    message={"Qty is required*"}
                  />
                </div>
                <div className="col-3">
                  <div className="form-group input-subtitle">
                    <p className="input-subtitle">
                      Unit<span className="required-icon">*</span>
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <div className="input-group input-subtitle">
                      <Form.Select
                        size="md"
                        name="unit"
                        value={item.unit}
                        onChange={handleItemChange}
                      >
                        <option value="PCS">PIECES</option>
                        {units.map((data) => {
                          return (
                            <option
                              class="color-black"
                              key={data.id}
                              value={data.key}
                            >
                              {data.name}
                            </option>
                          )
                        })}
                      </Form.Select>
                    </div>
                  </div>
                  <InputError
                    isValid={isItemError.unit}
                    message={"Unit is required*"}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-3">
                  <div className="form-group input-subtitle">
                    <p className="input-subtitle">
                      Customs Value<span className="required-icon">*</span>
                    </p>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control input-subtitle"
                        aria-label="customs_value"
                        name="customs_value"
                        value={item.customs_value}
                        onChange={(e) => handleItemChange(e)}
                      />
                    </div>
                  </div>
                  <InputError
                    isValid={isItemError.customs_value}
                    message={"Customs value is required*"}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <input
                      type="checkbox"
                      className="custom-control-inpu mr-10"
                      id="new_item_profile"
                      name="new_item_profile"
                      checked={item.new_item_profile === "1" ? true : false}
                      onChange={(e) => handleItemChange(e)}
                    />
                    <label
                      className="custom-control-label pad-left5 input-subtitle"
                      htmlFor="new_item_profile"
                    >
                      Save as new item profile
                    </label>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="fw-bold">
              <div className="col-3">
                <button className="btn-clear btn-rad" onClick={handleClearItem}>
                  {" "}
                  Clear All{" "}
                </button>
              </div>
              <div className="col-3">
                <button
                  type="submit"
                  className="btn-blue btn-rad"
                  value="add_item"
                  onClick={handleSaveItem}
                >
                  {" "}
                  Add Item{" "}
                </button>
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
              <Modal.Title
                id="contained-modal-title-vcenter"
                className="fw-bold center"
              >
                ITEM FORM
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="fw-bold">
              <div className="row mb-4">
                {/* {hasResult ? "row":"row mb-4"} */}
                <div className="input-group form-group">
                  <input
                    type="text"
                    className="form-control search-input  input-subtitle"
                    aria-label="Search"
                    placeholder="Search Item..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text search-icon"
                      id="basic-addon1"
                    >
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
                  <div className="form-group input-subtitle">
                    <p className="input-subtitle">
                      Description<span className="required-icon">*</span>
                    </p>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control input-subtitle"
                        aria-label="description"
                        name="description"
                        value={editItem.description}
                        onChange={(e) => handleEditItemChange(e)}
                      />
                      {/* value={editItem.description} onChange={(e)=>handleEditItemChange(e)} */}
                    </div>
                    <InputError
                      isValid={isItemError.description}
                      message={"Description is required*"}
                    />
                    <InputError
                      isValid={isItemError.description_comm_error}
                      message={"Invalid Description"}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-3">
                  <div className="form-group input-subtitle">
                    <label htmlFor="hs_code">HS Code </label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control input-subtitle"
                        aria-label="hs_code"
                        name="hs_code"
                        value={editItem.hs_code}
                        onChange={handleEditItemChange}
                      />
                      {/* value={editItem.hs_code} onChange={handleEditItemChange} */}
                    </div>
                    <InputError
                      isValid={isItemError.hs_code}
                      message={"HS Code is required*"}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-3">
                  <div className="form-group input-subtitle">
                    <p className="input-subtitle">
                      Made In<span className="required-icon">*</span>
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <div className="input-group">
                      <Typeahead
                        id=""
                        className="type input-subtitle"
                        labelKey="name"
                        onChange={handleEditMadeChange}
                        options={countries}
                        placeholder="Enter a country"
                        selected={countrySelections}
                      />
                    </div>
                  </div>
                  <InputError
                    isValid={isItemError.made_in}
                    message={"Made in is required*"}
                  />
                </div>
                <div className="col-3">
                  <div className="form-group input-subtitle">
                    <p className="input-subtitle">
                      Weight<span className="required-icon">*</span>
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control input-subtitle"
                        aria-label="weight"
                        name="weight"
                        value={editItem.weight}
                        onChange={(e) => handleEditItemChange(e)}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text bg-white input-subtitle">
                          kg
                        </span>
                      </div>
                    </div>
                  </div>
                  <InputError
                    isValid={isItemError.weight}
                    message={"Weight is required*"}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-3">
                  <div className="form-group input-subtitle">
                    <p className="input-subtitle">
                      Quantity<span className="required-icon">*</span>
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control input-subtitle"
                        aria-label="qty"
                        name="qty"
                        value={editItem.qty}
                        onChange={(e) => handleEditItemChange(e)}
                      />
                    </div>
                  </div>
                  <InputError
                    isValid={isItemError.qty}
                    message={"Qty is required*"}
                  />
                </div>
                <div className="col-3">
                  <div className="form-group input-subtitle">
                    <p className="input-subtitle">
                      Unit<span className="required-icon">*</span>
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <div className="input-group">
                      <Form.Select
                        size="md"
                        name="unit"
                        className=" input-subtitle"
                        value={editItem.unit}
                        onChange={handleEditItemChange}
                      >
                        <option value="PCS">PIECES</option>
                        {units.map((data) => {
                          return (
                            <option
                              class="color-black"
                              key={data.key}
                              value={data.key}
                            >
                              {data.name}
                            </option>
                          )
                        })}
                      </Form.Select>
                    </div>
                  </div>
                  <InputError
                    isValid={isItemError.unit}
                    message={"Unit is required*"}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-3">
                  <div className="form-group input-subtitle">
                    <p className="input-subtitle">
                      Customs Value<span className="required-icon">*</span>
                    </p>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control input-subtitle"
                        aria-label="customs_value"
                        name="customs_value"
                        value={editItem.customs_value}
                        onChange={(e) => handleEditItemChange(e)}
                      />
                    </div>
                  </div>
                  <InputError
                    isValid={isItemError.customs_value}
                    message={"Customs value is required*"}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <input
                      type="checkbox"
                      className="custom-control-inpu mr-10"
                      id="new_item_profile_edit"
                      name="new_item_profile"
                      checked={editItem.new_item_profile === "1" ? true : false}
                      onChange={(e) => handleEditItemChange(e)}
                    />
                    <label
                      className="custom-control-label pad-left5 input-subtitle"
                      htmlFor="new_item_profile_edit"
                    >
                      {" "}
                      Save as new item profile{" "}
                    </label>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="fw-bold">
              <div className="col-3">
                <button
                  className="btn-pink btn-rad"
                  onClick={() => setIsEditing(false)}
                >
                  {" "}
                  Cancel{" "}
                </button>
              </div>
              <div className="col-3">
                <button
                  type="submit"
                  className="btn-blue btn-rad"
                  onClick={handleSaveItem}
                  value="edit_item"
                >
                  {" "}
                  Save{" "}
                </button>
              </div>
            </Modal.Footer>
          </Modal>

          {/* form div  */}
        </div>
      </div>
    </div>
  )
}

export default InternationalForm
