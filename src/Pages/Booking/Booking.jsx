import { ToastContainer, toast } from "react-toastify"
import Navbar from "../../Components/Navbar/Navbar"
import { Button } from "antd"
import "./Package.css"
import ReactLoading from "react-loading"
import { qair_comms } from "../../Assets/Commodities/QAirComms"
import { zip_comms } from "../../Assets/Commodities/ZipComms"
import { Typeahead } from "react-bootstrap-typeahead"
import { useEffect, useState } from "react"
import {
  createExpress,
  searchAreas,
  searchPackageCodes,
} from "../../Helpers/ApiCalls/expressAPI"
import erroricon from "../../Assets/Modals/erroricon.png"
import caution from "../../Assets/Modals/caution.png"
import { Accordion, Form, Modal } from "react-bootstrap"
import { formatPrice } from "../../Helpers/Utils/Common"
import {
  validatePackage,
  validatePrimaryDetails,
} from "../../Helpers/Validation/expressValidation"
import InputError from "../../Components/InputError/InputError"

export default function Booking({
  navigation,
  docuClicked,
  setDocuClicked,
  parcelClicked,
  setParcelClicked,
  generalDetails,
  setGeneralDetails,
  generalDetailsExpress,
  setGeneralDetailsExpress,
  serviceTypes,
  setServiceTypes,
  areas,
  shipperProvince,
  setShipperProvince,
  selectedShipperProvince,
  setSelectedShipperProvince,
  shipperCities,
  setShipperCities,
  selectedShipperCity,
  setSelectedShipperCity,
  shipperBrgy,
  setShipperBrgy,
  selectedShipperBrgy,
  setSelectedShipperBrgy,
  consigneeProvince,
  setConsigneeProvince,
  selectedConsigneeProvince,
  setSelectedConsigneeProvince,
  consigneeCities,
  setConsigneeCities,
  selectedConsigneeCity,
  setSelectedConsigneeCity,
  consigneeBrgy,
  setConsigneeBrgy,
  selectedConsigneeBrgy,
  setSelectedConsigneeBrgy,
  documentDetails,
  setDocumentDetails,
  expressType,
  fileNames,
  setFileNames,
  hasResultShipper,
  setHasResultShipper,
  searchInputShipper,
  setSearchInputShipper,
  resultsShipper,
  setResultsShipper,
  hasResultConsignee,
  setHasResultConsignee,
  searchInputConsignee,
  setSearchInputConsignee,
  resultsConsignee,
  setResultsConsignee,
  searchingShipper,
  setSearchingShipper,
  searchingConsignee,
  setSearchingConsignee,
  setPackageCodes,
  advisoryCustomer,
  pickupOutlets,
  selectedOutlet,
  setSelectedOutlet,
  pickup,
  setPickup,
  dropoff,
  setDropoff,
  setHasDropoff,
  setAWb,
  //package
  packageCodes,
  setBreakDown,
  setTransactionID,
}) {
  /* Variables */
  const [openOsa, setOpenOsa] = useState(false)
  const [openOtd, setOpenOtd] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [agree, setAgree] = useState(true)

  /*Validation Variables */
  const [isError, setIsError] = useState({
    destination_system: false,
    transaction_type: false,
    service_type: false,
    //Account Details
    is_walk_in: false,
    account_number: false,
    account_name: false,
    payor: false,
    account_short_name: false,
    account_address: false,
    account_cod_flag: false,
    /*SHIPPER */
    shipper_name: false,
    shipper_province: false,
    shipper_city: false,
    shipper_brgy: false,
    shipper_postal: false,
    shipper_address: false,
    shipper_contact: false,
    shipper_contact_error: false,
    isewt: false,
    reference: false,
    express_attachments: false,

    /*CONSIGNEE */
    consignee_name: false,
    consignee_province: false,
    consignee_city: false,
    consignee_brgy: false,
    consignee_postal: false,
    consignee_address: false,
    consignee_contact: false,
    consignee_contact_error: false,
    consignee_origin: false,
    consignee_area_code: false,
    //generic package details
    packaging: false,
    declared_value: false,
    cod_amount: false,
    rate_classification: false,
    has_package: false,
  })
  const [packageErrorDetail, setPackageErrorDetail] = useState([
    {
      description: false,
      package_code: false,
      commodity_code: false,
      actual_weight: false,
      response_weight: false,
      length: false,
      height: false,
      width: false,
      block_measurement: false,
      quantity: false,
      port_sticker_numbers: false,
    },
  ])

  /* Handlers */

  //specify package details based on chosen transaction type
  function handleTransactionTypeChange(type) {
    setPackageCodes([])
    if (type === "document") {
      setGeneralDetailsExpress({
        ...generalDetailsExpress,
        total_package_weight: 0,
        transaction_type: "document",
        packaging: "",
        declared_value: "0",
        payor:
          generalDetailsExpress.destination_system === "QAIR"
            ? "shipper"
            : generalDetailsExpress.payor,
      })
      setDocuClicked(true)
      setParcelClicked(false)
      var arr = []
      arr.push({
        description: "",
        package_code: " ",
        commodity_code: qair_comms.filter((data) => data.code === "DOC"),
        actual_weight: "",
        length: "",
        height: "",
        width: "",
        block_measurement: "0",
        quantity: "1",
        port_sticker_numbers: [],
      })
      setDocumentDetails(arr)
    }
    if (type === "parcel") {
      setGeneralDetailsExpress({
        ...generalDetailsExpress,
        total_package_weight: 0,
        transaction_type: "parcel",
        packaging: "2go_packaging",
        payor:
          generalDetailsExpress.destination_system === "QAIR"
            ? "shipper"
            : generalDetailsExpress.payor,
      })

      var arr = []
      arr.push({
        description: "",
        package_code: " ",
        commodity_code:
          generalDetailsExpress.destination_system === "QAIR"
            ? qair_comms.filter((data) => data.code === "GC")
            : zip_comms.filter((data) => data.code === "GC001"),
        actual_weight: "",
        length: "",
        height: "",
        width: "",
        block_measurement: "0",
        quantity: "1",
        port_sticker_numbers: [],
      })
      setDocumentDetails(arr)
    }
  }

  //update field values on change
  function handleDetailChange(e) {
    const { name, value, checked } = e.target

    if (name === "save_shipper") {
      generalDetailsExpress["save_shipper"] = checked === true ? true : false
      setGeneralDetailsExpress({
        ...generalDetailsExpress,
        save_shipper: checked === true ? true : false,
      })
    } else if (name === "save_consignee") {
      generalDetailsExpress["save_consignee"] = checked === true ? true : false
      setGeneralDetailsExpress({
        ...generalDetailsExpress,
        save_consignee: checked === true ? true : false,
      })
    } else if (name === "is_walk_in") {
      setDropoff(false)

      generalDetailsExpress["is_walk_in"] = checked === true ? true : false

      generalDetailsExpress["account_number"] =
        checked === true ? "WALK-IN" : ""
      generalDetailsExpress["payment_term"] = ""
      generalDetailsExpress["payor"] = ""

      generalDetailsExpress["account_name"] = ""
      generalDetailsExpress["account_cod_flag"] =
        checked === true ? "" : generalDetailsExpress.account_cod_flag
      setGeneralDetailsExpress({
        ...generalDetailsExpress,
        is_walk_in: checked === true ? true : false,
        payor: "shipper",
        account_number: checked === true ? "WALK-IN" : "",
        account_name: "",
        payment_term: "cash",
        payor: "shipper",
        account_cod_flag:
          checked === true ? "" : generalDetailsExpress.account_cod_flag,
      })
    } else if (name === "shipper_company") {
      if (value === "") {
        setGeneralDetailsExpress({
          ...generalDetailsExpress,
          isewt: false,
          reference: "",
          express_attachments: [],
          [name]: value,
        })
        //  setFileNames([])
        //  setFiles([])
      } else {
        setGeneralDetailsExpress({
          ...generalDetailsExpress,
          [name]: value,
          isewt: true,
        })
      }
    } else if (name === "isewt") {
      setGeneralDetailsExpress({
        ...generalDetailsExpress,
        isewt: true,
        reference: value,
      })
    } else {
      setGeneralDetailsExpress({ ...generalDetailsExpress, [name]: value })
    }
  }

  const handleAgreeChange = (e) => {
    if (e.target.checked) {
      setAgree(true)
    } else {
      setAgree(false)
    }
  }

  //package event handler
  function handlePackageDetailChange(e) {
    const { name, value, checked } = e.target

    if (name === "save_shipper") {
      generalDetailsExpress["save_shipper"] = checked === true ? true : false
      setGeneralDetailsExpress({
        ...generalDetailsExpress,
        save_shipper: checked === true ? true : false,
      })
    } else if (name === "save_consignee") {
      generalDetailsExpress["save_consignee"] = checked === true ? true : false
      setGeneralDetailsExpress({
        ...generalDetailsExpress,
        save_consignee: checked === true ? true : false,
      })
    } else if (name === "is_walk_in") {
      setDropoff(false)

      generalDetailsExpress["is_walk_in"] = checked === true ? true : false

      generalDetailsExpress["account_number"] =
        checked === true ? "WALK-IN" : ""
      generalDetailsExpress["payment_term"] = ""
      generalDetailsExpress["payor"] = ""

      generalDetailsExpress["account_name"] = ""
      generalDetailsExpress["account_cod_flag"] =
        checked === true ? "" : generalDetailsExpress.account_cod_flag
      setGeneralDetailsExpress({
        ...generalDetailsExpress,
        is_walk_in: checked === true ? true : false,
        payor: "shipper",
        account_number: checked === true ? "WALK-IN" : "",
        account_name: "",
        payment_term: "cash",
        payor: "shipper",
        account_cod_flag:
          checked === true ? "" : generalDetailsExpress.account_cod_flag,
      })
    } else if (name === "shipper_company") {
      if (value === "") {
        setGeneralDetailsExpress({
          ...generalDetailsExpress,
          isewt: false,
          reference: "",
          express_attachments: [],
          [name]: value,
        })
        //  setFileNames([])
        //  setFiles([])
      } else {
        setGeneralDetailsExpress({
          ...generalDetailsExpress,
          [name]: value,
          isewt: true,
        })
      }
    } else if (name === "isewt") {
      setGeneralDetailsExpress({
        ...generalDetailsExpress,
        isewt: true,
        reference: value,
      })
    } else {
      setGeneralDetailsExpress({ ...generalDetailsExpress, [name]: value })
    }
  }

  //search address
  async function fetchAreas(name, type, e) {
    if (name === "shipper_province") {
      setSelectedShipperCity([])
      setSelectedShipperBrgy([])
      generalDetailsExpress["shipper_province"] = e[0].name
      generalDetailsExpress["shipper_postal"] = ""
      generalDetailsExpress["shipper_brgy"] = ""
      generalDetailsExpress["shipper_city"] = ""
    }
    if (name === "consignee_province") {
      setSelectedConsigneeCity([])
      setSelectedConsigneeBrgy([])
      generalDetailsExpress["consignee_province"] = e[0].name
      generalDetailsExpress["consignee_postal"] = ""
      generalDetailsExpress["consignee_brgy"] = ""
      generalDetailsExpress["consignee_city"] = ""
      generalDetailsExpress["consignee_origin"] = ""
      generalDetailsExpress["consignee_area_code"] = ""
      // setGeneralDetailsExpress({
      //   ...generalDetailsExpress,
      //   consignee_postal: "",
      //   consignee_brgy: "",
      //   consignee_city: "",
      //   consignee_origin: "",
      //   consignee_area_code: "",
      // });
    }
    const response = await searchAreas(generalDetailsExpress, type)
    if (response.data) {
      if (type === "shipper") {
        var arr = []
        response.data.map((data) => {
          arr.push({ name: data.municipality })
        })

        setShipperCities(arr)
      }
      if (type === "consignee") {
        var arr = []
        response.data.map((data) => {
          arr.push({ name: data.municipality })
        })
        setConsigneeCities(arr)
      }
    }
  }

  //shipper address event handlers
  async function fetchShipperBrgy(e) {
    generalDetailsExpress["shipper_postal"] = ""
    generalDetailsExpress["shipper_brgy"] = ""
    generalDetailsExpress["shipper_city"] = e[0]?.name
    setSelectedShipperBrgy([])
    const response = await searchAreas(generalDetailsExpress, "shipper")

    if (response.data) {
      var arr = []
      response.data.map((data) => {
        arr.push({ ...data, name: data.barangay })
      })
      setShipperBrgy(arr)
    }
  }

  function fetchShipperCodes(e) {
    setGeneralDetailsExpress({
      ...generalDetailsExpress,
      shipper_brgy: e[0].name,
      shipper_postal: e[0].zip_code,
      shipper_origin: e[0].port_code,
      shipper_area_code: e[0].area_code,
    })
  }

  function handleShipperProvinceChange(e) {
    setSelectedShipperProvince(e)

    if (e.length > 0) {
      if (e[0].delivery_category === "OSA") {
        setOpenOsa(true)
      } else {
        setGeneralDetailsExpress({
          ...generalDetailsExpress,
          shipper_province: e[0].name,
        })
        fetchAreas("shipper_province", "shipper", e)
      }
    }
  }

  function handleShipperProvinceInputChange(e) {
    setSelectedShipperCity([])
    setSelectedShipperBrgy([])

    setGeneralDetailsExpress({
      ...generalDetailsExpress,
      shipper_postal: "",
      shipper_city: "",
      shipper_brgy: "",
    })
  }

  function handleShipperCityChange(e) {
    setSelectedShipperCity(e)
    if (e.length > 0) {
      if (e[0].delivery_category === "OSA") {
        setOpenOsa(true)
      } else {
        setGeneralDetailsExpress({
          ...generalDetailsExpress,
          shipper_city: e[0].name,
        })
        generalDetailsExpress["shipper_postal"] = ""
        generalDetailsExpress["shipper_brgy"] = ""
        fetchShipperBrgy(e)
      }
    }
  }

  function handleShipperCityInputChange(e) {
    setSelectedShipperBrgy([])

    setGeneralDetailsExpress({
      ...generalDetailsExpress,
      shipper_postal: "",
      shipper_brgy: "",
    })
  }

  function handleShipperBrgyChange(e) {
    setSelectedShipperBrgy(e)
    if (e.length > 0) {
      setGeneralDetailsExpress({
        ...generalDetailsExpress,
        shipper_delivery_category: e[0].delivery_category,
      })
      // if (e[0].delivery_category === "OTD") {
      //   setOpenOtd(true);
      // }

      if (e[0].delivery_category === "OSA") {
        setOpenOsa(true)
      } else {
        fetchShipperCodes(e)
      }
    }
  }

  //consignee event handlers
  async function fetchConsigneeBrgy(e) {
    generalDetailsExpress["consignee_postal"] = ""
    generalDetailsExpress["consignee_brgy"] = ""
    generalDetailsExpress["consignee_origin"] = ""
    generalDetailsExpress["consignee_area_code"] = ""
    setSelectedConsigneeBrgy([])
    generalDetailsExpress["consignee_city"] = e[0].name
    const response = await searchAreas(generalDetailsExpress, "consignee")
    if (response.data) {
      var arr = []
      response.data.map((data) => {
        arr.push({ ...data, name: data.barangay })
      })
      setConsigneeBrgy(arr)
    }
  }

  function fetchConsigneeCodes(e) {
    setGeneralDetailsExpress({
      ...generalDetailsExpress,
      consignee_brgy: e[0].name,
      consignee_postal: e[0].zip_code,
      consignee_origin: e[0].port_code,
      consignee_area_code: e[0].area_code,
      consignee_delivery_category: e[0].delivery_category,
    })
  }

  function handleConsigneeProvinceChange(e) {
    setSelectedConsigneeProvince(e)
    if (e.length > 0) {
      if (e[0].delivery_category === "OSA") {
        setOpenOsa(true)
      } else {
        setGeneralDetailsExpress({
          ...generalDetailsExpress,
          consignee_province: e[0].name,
        })
        fetchAreas("consignee_province", "consignee", e)
      }
    }
  }

  function handleConsigneeProvinceInputChange(e) {
    setSelectedConsigneeCity([])
    setSelectedConsigneeBrgy([])

    setGeneralDetailsExpress({
      ...generalDetailsExpress,
      consignee_postal: "",
      consignee_city: "",
      consignee_brgy: "",
      consignee_area_code: "",
      consignee_origin: "",
    })
  }

  function handleConsigneeCityChange(e) {
    setSelectedConsigneeCity(e)
    if (e.length > 0) {
      if (e[0].delivery_category === "OSA") {
        setOpenOsa(true)
      } else {
        setGeneralDetailsExpress({
          ...generalDetailsExpress,
          consignee_city: e[0].name,
        })
        fetchConsigneeBrgy(e)
      }
    }
  }

  function handleConsigneeCityInputChange(e) {
    setSelectedConsigneeBrgy([])

    setGeneralDetailsExpress({
      ...generalDetailsExpress,
      consignee_postal: "",
      consignee_brgy: "",
      consignee_area_code: "",
      consignee_origin: "",
    })
  }

  function handleConsigneeBrgyChange(e) {
    setSelectedConsigneeBrgy(e)
    if (e.length > 0) {
      if (e[0].delivery_category === "OSA") {
        setOpenOsa(true)
        setGeneralDetailsExpress({
          ...generalDetailsExpress,
          consignee_delivery_category: "OSA",
        })
        setSelectedConsigneeBrgy([])
      } else {
        // if (e[0].delivery_category === "OTD") {
        //   setOpenOtd(true);
        // } else {
        //   setOpen(false);
        // }
        setGeneralDetailsExpress({
          ...generalDetailsExpress,
          consignee_delivery_category: "",
        })
        generalDetailsExpress["consignee_delivery_category"] = ""
        fetchConsigneeCodes(e)
      }
    }
  }

  //onChange function for package form
  function handleDetailsChange(e, key, data) {
    const { name, value, checked } = e.target
    var arr = [...documentDetails]
    if (name === "block_measurement") {
      arr[parseInt(key)][name] = checked ? "1" : "0"
    } else if (name === "package_code") {
      var package_details = packageCodes[parseInt(value)]
      arr[parseInt(key)][name] = value
      arr[parseInt(key)]["actual_weight"] = package_details.weight ?? 0
      arr[parseInt(key)]["response_weight"] = package_details.weight ?? 0
      arr[parseInt(key)]["length"] = package_details.length ?? 0
      arr[parseInt(key)]["width"] = package_details.width ?? 0
      arr[parseInt(key)]["height"] = package_details.height ?? 0
    } else {
      arr[parseInt(key)][name] = value
    }
    setGeneralDetailsExpress({
      ...generalDetailsExpress,
      total_package_weight: parseFloat(
        arr
          .map((data) => parseFloat(data.actual_weight))
          .reduce((a, b) => a + b, 0)
      ),
    })

    setDocumentDetails(arr)
  }

  //function for choosing commodity
  function handleSelectCommodity(e, key) {
    var arr = [...documentDetails]
    arr[parseInt(key)]["commodity_code"] = e
    setDocumentDetails(arr)
  }

  //function for deleting a package
  function handleDelete(ind) {
    var arr = [...documentDetails]
    // var arr_package_error = [...packageErrorDetail]
    arr = arr.filter((data, key) => parseInt(key) !== parseInt(ind))
    // arr_package_error = arr_package_error.filter(
    //   (data, key) => parseInt(key) !== parseInt(ind)
    // )
    // setPackageErrorDetail(arr_package_error)
    setDocumentDetails(arr)
    setGeneralDetailsExpress({
      ...generalDetailsExpress,
      total_package_weight: parseFloat(
        arr
          .map((data) => parseFloat(data.actual_weight))
          .reduce((a, b) => a + b, 0)
      ),
    })
  }

  //function for adding another package
  function handleAddPackage() {
    var arr = [...documentDetails]
    //  var arr_package_error = [...packageErrorDetail]
    //  arr_package_error.push({
    //    description: false,
    //    package_code: false,
    //    commodity_code: false,
    //    actual_weight: false,
    //    response_weight: false,
    //    length: false,
    //    height: false,
    //    width: false,
    //    block_measurement: false,
    //    quantity: false,
    //    port_sticker_numbers: false,
    //  })
    //  setPackageErrorDetail(arr_package_error)
    if (generalDetailsExpress.transaction_type === "parcel") {
      if (generalDetailsExpress.packaging === "") {
        arr.push({
          description: "",
          package_code: " ",
          commodity_code: "",
          // commodity_code: "GC",
          actual_weight: "",
          response_weight: "",
          length: "",
          height: "",
          width: "",
          block_measurement: "0",
          quantity: "1",
          port_sticker_numbers: [],
        })
      }
      if (generalDetailsExpress.packaging === "own_packaging") {
        arr.push({
          description: "",
          package_code: " ",
          commodity_code:
            generalDetailsExpress.destination_system === "QAIR"
              ? "GC"
              : "GC001",
          actual_weight: "",
          response_weight: "",
          length: "",
          height: "",
          width: "",
          block_measurement: "0",
          quantity: "1",
          port_sticker_numbers: [],
        })
      }
      if (generalDetailsExpress.packaging === "2go_packaging") {
        arr.push({
          description: "",
          package_code: " ",
          commodity_code: "NONDOC",
          actual_weight: "",
          response_weight: "",
          length: "",
          height: "",
          width: "",
          block_measurement: "0",
          quantity: "1",
          port_sticker_numbers: [],
        })
      }
    } else {
      arr.push({
        description: "",
        package_code: " ",
        // commodity_code: "NONDOC",
        commodity_code: "",
        actual_weight: "",
        response_weight: "",
        length: "",
        height: "",
        width: "",
        block_measurement: "0",
        quantity: "1",
        port_sticker_numbers: [],
      })
    }

    setDocumentDetails(arr)

    // if (parcelClicked) {
    //   var arr = [...parcelDetails];
    //   arr.push({
    //     package_code: "",
    //     commodity_code: "",
    //     actual_weight: "",
    //     dim_length: "",
    //     dim_height: "",
    //     dim_width: "",
    //     declared_value: "",
    //     biometric_weight: "",
    //     cod_value: "",
    //     remarks: "",
    //     is_block_measurement: "0",
    //     is_measure_flag: "0",
    //     items: [],
    //   });
    //   setParcelDetails(arr);
    // }
  }

  //validations
  const handleNext = () => {
    setIsClicked(true)
    if (
      validatePrimaryDetails(
        generalDetailsExpress,
        pickup,
        selectedOutlet,
        setIsError
      )
    ) {
      if (generalDetailsExpress.consignee_delivery_category === "OTD") {
        setOpenOtd(true)
      } else {
        handleNextPackage()
        // navigation.next()
      }
    } else {
      setIsClicked(false)
    }
  }

  const handleNextPackage = () => {
    var total_qty = documentDetails
      .map((data) => parseFloat(data.quantity))
      .reduce((a, b) => a + b, 0)

    setGeneralDetailsExpress({
      ...generalDetailsExpress,
      total_qty: total_qty,
    })
    if (
      total_qty > 1 ||
      (generalDetailsExpress.destination_system === "ZIP-R" &&
        generalDetailsExpress.transaction_type === "cargo")
    ) {
      var final_details = [...documentDetails]
      final_details.map((data) => {
        data.port_sticker_numbers = []
        for (var i = 0; i < parseInt(data.quantity); i++) {
          data.port_sticker_numbers.push({
            id: i,
            serial: "",
            invalid: false,
          })
        }
      })
      setDocumentDetails(final_details)
    }
    var valid_package = true
    var error_package = []
    var checker = false
    // if (
    //   generalDetailsExpress.transaction_type === "parcel" &&
    //   generalDetailsExpress.packaging === "2go_packaging"
    // ) {

    // }

    if (
      validatePackage(
        generalDetailsExpress,
        documentDetails,
        setIsError,
        setPackageErrorDetail,
        packageErrorDetail
      )
    ) {
      documentDetails.map((data, key) => {
        if (
          packageCodes[parseInt(data.package_code)]["description"] ===
            "CARGO - BUDGET BOX VIA LAND " ||
          packageCodes[parseInt(data.package_code)]["description"] ===
            "CARGO - BUDGET BOX VIA LAND (NON BOX)"
        ) {
          if (data.actual_weight !== "" && data.response_weight !== "") {
            if (
              parseFloat(data.actual_weight) <= parseFloat(data.response_weight)
            ) {
              valid_package = valid_package && true
            } else {
              valid_package = valid_package && false
              error_package.push(
                `USER ERROR: Error in Package ${key + 1}: Weight(${
                  data.actual_weight
                }) can't be more than the weight in the master (${
                  data.response_weight
                })`
              )
            }
          }
        }
      })
      checker = true
    } else {
      setIsClicked(false)
    }
    if (checker) {
      if (valid_package) {
        setIsClicked(true)

        add()
        // if (
        //   (generalDetailsExpress.transaction_type === "parcel" ||
        //     generalDetailsExpress.transaction_type === "cargo") &&
        //   total_qty > 1
        // ) {
        //   if (
        //     validatePackage(
        //       generalDetailsExpress,
        //       documentDetails,
        //       setIsError,
        //       setPackageErrorDetail,
        //       packageErrorDetail
        //     )
        //   ) {
        //     navigation.next();
        //   }
        // }
        //  else {

        // navigation.go("summary")
        // }
      } else {
        setIsClicked(false)
        error_package.map((data) => {
          toast.error(data, {
            autoClose: 4000,
            hideProgressBar: true,
          })
        })
      }
    }

    // add();
    // navigation.next();
  }

  //get package codes list
  async function fetchPackageCodes() {
    setPackageCodes([])
    const response = await searchPackageCodes(generalDetailsExpress)
    if (response.data) {
      setPackageCodes(response.data)
    }
  }
  async function fetchPackageCodesWParam(value) {
    setPackageCodes([])
    const response = await searchPackageCodes({
      packaging: value,
      shipment_mode: generalDetailsExpress.destination_system,
      destination_system: generalDetailsExpress.destination_system,
      transaction_type: generalDetailsExpress.transaction_type,
      // rate_classification: generalDetailsExpress.rate_classification,
    })
    if (response.data) {
      setPackageCodes(response.data)
    }
  }

  //add booking
  async function add() {
    const response = await createExpress(
      generalDetailsExpress,
      documentDetails,
      packageCodes,
      expressType,
      selectedOutlet
    )

    if (response.error) {
      if (Array.isArray(response.error.data.messages) === true) {
        response.error.data.messages.map((data) => {
          toast.error(data.message.toUpperCase(), {
            autoClose: 2000,
            hideProgressBar: true,
          })
        })
      } else {
        toast.error(response.error.data.messages.error.toUpperCase(), {
          autoClose: 2000,
          hideProgressBar: true,
        })
      }

      // toast.error(response.error.data.messages.error, {
      //   autoClose: 2000,
      //   hideProgressBar: true,
      // })

      setIsClicked(false)
    }

    if (response.data) {
      if (
        response.data.breakdown
          .map((data) => parseFloat(data.amount))
          .reduce((a, b) => a + b, 0) > 0
      ) {
        toast.success(response.data.response.toUpperCase(), {
          autoClose: 2000,
          hideProgressBar: true,
        })
        setTransactionID(response.data.transaction_id)
        setBreakDown(response.data.breakdown)
        setTimeout(() => {
          setIsClicked(false)
          navigation.next()
        }, 1000)
      } else {
        toast.error(
          "Express did not return payment breakdown. Please try again."
        )
        setIsClicked(false)
      }
    }

    // navigation.next()
  }

  useEffect(() => {
    if (generalDetailsExpress.transaction_type === "document") {
      fetchPackageCodes()
    }
    if (generalDetailsExpress.transaction_type === "parcel") {
      fetchPackageCodesWParam("2go_packaging")
    }
  }, [generalDetailsExpress.transaction_type])

  return (
    <div>
      <ToastContainer />
      <Navbar></Navbar>
      <div className="container">
        <h1 className="row mb-4 text-center header title mt-5 ml-5">
          PLACE BOOKING
        </h1>

        <div className="row left h-35">
          <div className="col-3 w-auto ml-15">
            <button key={1} id={"1"} className={"btn-tab-active left"}>
              {" "}
              LOCAL{" "}
            </button>
          </div>
        </div>

        <div className="container form-cont mt-0 main-cont mb-5">
          <ToastContainer />

          {/* PACKAGE */}
          <div>
            <ToastContainer />
            <div className="row justify-content-center">
              <div className="col-sm color-pink text-center mb-2">
                <h5>DOMESTIC SHIPMENT</h5>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-4">
                Mode of Shipment<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-2">
                <button
                  type="submit"
                  name="destination_system"
                  value="airClicked"
                  className={
                    generalDetailsExpress.destination_system === "QAIR"
                      ? "btn-sm btn-radio btn-clicked"
                      : "btn-sm btn-radio"
                  }
                  onClick={() => {
                    setPackageCodes([])
                    setGeneralDetailsExpress({
                      ...generalDetailsExpress,
                      rate_classification: "DAY1",
                      destination_system: "QAIR",
                      service_type: "AD",
                      payor: "shipper",
                      total_package_weight: 0,
                    })
                  }}
                >
                  {" "}
                  Expedited{" "}
                </button>
              </div>
              <div className="col-sm-2">
                <button
                  type="submit"
                  name="destination_system"
                  value="seaClicked"
                  className={
                    generalDetailsExpress.destination_system === "ZIP-R"
                      ? "btn-sm btn-radio btn-clicked"
                      : "btn-sm btn-radio"
                  }
                  onClick={() => {
                    setPackageCodes([])
                    setGeneralDetailsExpress({
                      ...generalDetailsExpress,
                      destination_system: "ZIP-R",
                      transaction_type: "",
                      service_type: "PP",
                      rate_classification: "",
                      total_package_weight: 0,
                    })
                  }}
                >
                  {" "}
                  Regular{" "}
                </button>
              </div>
              <div className="col-sm-2">
                <button
                  type="submit"
                  name="destination_system"
                  value="seaClicked"
                  className={
                    generalDetailsExpress.destination_system === "ZIP-S"
                      ? "btn-sm btn-radio btn-clicked"
                      : "btn-sm btn-radio"
                  }
                  onClick={() => {
                    setPackageCodes([])
                    setGeneralDetailsExpress({
                      ...generalDetailsExpress,
                      rate_classification: "",
                      destination_system: "ZIP-S",
                      transaction_type: "",
                      service_type: "PP",
                      total_package_weight: 0,
                    })
                  }}
                >
                  {" "}
                  Shipside{" "}
                </button>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-4"></div>
              <div className="col-sm-6">
                <InputError
                  isValid={isError.destination_system}
                  message={"This field is required*"}
                />
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                What Are You Sending?<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-2">
                {generalDetailsExpress.destination_system !== "ZIP-R" &&
                  generalDetailsExpress.destination_system !== "ZIP-S" && (
                    <button
                      type="submit"
                      name="transaction_type"
                      className={
                        generalDetailsExpress.transaction_type === "document"
                          ? "btn-sm btn-radio btn-clicked"
                          : "btn-sm btn-radio"
                      }
                      onClick={() => handleTransactionTypeChange("document")}
                    >
                      {" "}
                      Document{" "}
                    </button>
                  )}
              </div>
              <div className="col-sm-2">
                {generalDetailsExpress.destination_system !== "ZIP-S" && (
                  <button
                    type="submit"
                    name="send_type"
                    className={
                      generalDetailsExpress.transaction_type === "parcel"
                        ? "btn-sm btn-radio btn-clicked"
                        : "btn-sm btn-radio"
                    }
                    onClick={() => handleTransactionTypeChange("parcel")}
                  >
                    {" "}
                    Parcel{" "}
                  </button>
                )}
              </div>

              <div className="col-sm-2">
                <button
                  type="submit"
                  name="send_type"
                  className={
                    generalDetailsExpress.transaction_type === "cargo"
                      ? "btn-sm btn-radio btn-clicked"
                      : "btn-sm btn-radio"
                  }
                  onClick={() => {
                    setPackageCodes([])
                    setGeneralDetailsExpress({
                      ...generalDetailsExpress,
                      transaction_type: "cargo",
                      packaging: "",
                      total_package_weight: 0,
                    })

                    var arr = []
                    arr.push({
                      description: "",
                      package_code: " ",
                      commodity_code: [],
                      actual_weight: "",
                      length: "",
                      height: "",
                      width: "",
                      block_measurement: "0",
                      quantity: "1",
                      port_sticker_numbers: [],
                    })
                    setDocumentDetails(arr)
                  }}
                >
                  {" "}
                  Cargo{" "}
                </button>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-4"></div>
              <div className="col-sm-6">
                <InputError
                  isValid={isError.transaction_type}
                  message={"This field is required*"}
                />
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                Service Type<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-6">
                <select
                  className="form-select form-select-sm"
                  name="service_type"
                  id="service_type"
                  value={generalDetailsExpress.service_type}
                  onChange={handleDetailChange}
                >
                  <option value="">Select</option>
                  {serviceTypes.map((data) => {
                    return (
                      <>
                        {(generalDetailsExpress.destination_system ===
                          "ZIP-R" ||
                          generalDetailsExpress.destination_system ===
                            "ZIP-S") &&
                          data.category === "sea" && (
                            <option value={data.value}>{data.label}</option>
                          )}
                        {generalDetailsExpress.destination_system === "QAIR" &&
                          data.category === "air" && (
                            <option value={data.value}>{data.label}</option>
                          )}
                      </>
                    )
                  })}
                </select>
                <InputError
                  isValid={isError.service_type}
                  message={"This field is required*"}
                />
              </div>
            </div>
            <hr />

            <div className="row justify-content-center">
              <div className="col-sm color-pink text-center mb-2">
                <h5>ACCOUNT DETAILS</h5>
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                Walk-in Customer?<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-6">
                <div className="form-check form-check-inline">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    className="form-check-input"
                    type="checkbox"
                    id="is_walk_in"
                    name="is_walk_in"
                    disabled
                    defaultChecked={
                      generalDetailsExpress.is_walk_in === true ||
                      generalDetailsExpress.account_number === "WALK-IN"
                    }
                    // onChange={handleDetailChange}
                  />
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-4">
                Account Number<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-4">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    name="account_number"
                    value={generalDetailsExpress.account_number}
                    type="text"
                    className="form-control input-font-sm input-group input-group-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    onChange={handleDetailChange}
                    disabled={
                      generalDetailsExpress.account_number === "WALK-IN"
                    }
                  />
                </span>
                {/* <InputError
                isValid={isError.account_number}
                message={"This field is required*"}
              /> */}
              </div>

              <div className="col-sm-2">
                <Button
                  size="sm"
                  disabled={generalDetailsExpress.is_walk_in === true}
                  // onClick={searchAccNum}
                >
                  Search
                </Button>
              </div>
            </div>
            {/* If Account Number is Walk-in, Account Name is disabled. */}
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                Account Name<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-6">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    disabled
                    name="account_name"
                    value={generalDetailsExpress.account_name}
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    onChange={handleDetailChange}
                  />
                </span>
                {/* <InputError
                isValid={isError.account_name}
                message={"This field is required*"}
              /> */}
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                Who will Pay?<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-3">
                <button
                  type="submit"
                  name="payor"
                  className={
                    generalDetailsExpress.payor === "shipper"
                      ? "btn-sm btn-radio btn-clicked"
                      : `btn-sm btn-radio`
                    // ${
                    //     generalDetailsExpress.payment_term === "cash"
                    //       ? "disabled"
                    //       : ""
                    //   }`
                  }
                  onClick={() => {
                    setGeneralDetailsExpress({
                      ...generalDetailsExpress,
                      payor: "shipper",
                    })
                  }}
                  // disabled={generalDetailsExpress.payment_term === "cash"}
                >
                  {" "}
                  Shipper{" "}
                </button>
              </div>

              <div className="col-sm-3">
                <button
                  type="submit"
                  name="service_type"
                  value="seaClicked"
                  // disabled={generalDetailsExpress.is_walk_in === true}
                  className={
                    generalDetailsExpress.payor === "consignee"
                      ? "btn-sm btn-radio btn-clicked"
                      : `btn-sm btn-radio ${
                          (generalDetailsExpress.destination_system ===
                            "QAIR" &&
                            generalDetailsExpress.account_number ===
                              "WALK-IN" &&
                            generalDetailsExpress.transaction_type !==
                              "cargo") ||
                          //   ||
                          generalDetailsExpress.payment_term === "cash"
                            ? // generalDetailsExpress.payment_term === "cash" &&
                              // generalDetailsExpress.transaction_type !== "cargo"
                              "disabled"
                            : ""
                        }`
                  }
                  onClick={() => {
                    setGeneralDetailsExpress({
                      ...generalDetailsExpress,
                      payor: "consignee",
                    })
                  }}
                  disabled={
                    (generalDetailsExpress.destination_system === "QAIR" &&
                      generalDetailsExpress.account_number === "WALK-IN" &&
                      generalDetailsExpress.transaction_type !== "cargo") ||
                    generalDetailsExpress.payment_term === "cash"
                    // &&
                    // generalDetailsExpress.transaction_type !== "cargo"
                  }
                >
                  {" "}
                  Consignee{" "}
                </button>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-4"></div>
              <div className="col-sm-4">
                {" "}
                <InputError
                  isValid={isError.payor}
                  message={"This field is required*"}
                />
              </div>
            </div>
            <hr />
            <div className="row justify-content-center">
              <div className="col-sm color-pink text-center mb-2">
                <h5>SHIPPER DETAILS</h5>
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4"></div>
              <div className="col-sm-6">
                <div className="form-check form-check-inline">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    className="form-check-input"
                    type="checkbox"
                    id="save_shipper"
                    name="save_shipper"
                    defaultChecked={generalDetailsExpress.save_shipper === true}
                    onChange={handleDetailChange}
                  />
                  <label> Save Shipper</label>
                </div>
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">Company Name</div>
              <div className="col-sm-6">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    name="shipper_company"
                    value={generalDetailsExpress.shipper_company}
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    onChange={handleDetailChange}
                  />
                </span>
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                Name<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-6">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    name="shipper_name"
                    value={generalDetailsExpress.shipper_name}
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    onChange={handleDetailChange}
                  />
                </span>
                <InputError
                  isValid={isError.shipper_name}
                  message={"This field is required*"}
                />
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                Province/City<label className="badge">{` *`}</label>
              </div>

              <div className="col-3">
                <span>
                  <Typeahead
                    inputProps={{
                      autoComplete: "new-password",
                      list: "autoComplete",
                    }}
                    autoComplete="new-password"
                    list="autoComplete"
                    size="sm"
                    className="pt-0"
                    id="basic-typeahead-single"
                    labelKey="name"
                    onChange={handleShipperProvinceChange}
                    onInputChange={handleShipperProvinceInputChange}
                    options={shipperProvince}
                    placeholder="Province"
                    selected={selectedShipperProvince}
                  />
                </span>
                <InputError
                  isValid={isError.shipper_province}
                  message={"This field is required*"}
                />
              </div>
              <div className="col-3">
                <span>
                  <Typeahead
                    inputProps={{
                      autoComplete: "new-password",
                      list: "autoComplete",
                    }}
                    size="sm"
                    className="pt-0"
                    id="basic-typeahead-single"
                    labelKey="name"
                    autoComplete="new-password"
                    list="autocompleteOff"
                    onChange={handleShipperCityChange}
                    onInputChange={handleShipperCityInputChange}
                    options={shipperCities}
                    placeholder="City/Municipality"
                    selected={selectedShipperCity}
                  />
                </span>
                <InputError
                  isValid={isError.shipper_city}
                  message={"This field is required*"}
                />
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                Barangay/Postal<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-3">
                <span>
                  <Typeahead
                    inputProps={{
                      autoComplete: "new-password",
                      list: "autoComplete",
                    }}
                    autoComplete="new-password"
                    list="autocompleteOff"
                    size="sm"
                    className="pt-0"
                    id="basic-typeahead-single"
                    labelKey="name"
                    onChange={handleShipperBrgyChange}
                    options={shipperBrgy}
                    placeholder="Barangay"
                    selected={selectedShipperBrgy}
                  />
                </span>
                <InputError
                  isValid={isError.shipper_brgy}
                  message={"This field is required*"}
                />
              </div>
              <div className="col-sm-3">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    name="shipper_postal"
                    value={
                      selectedShipperBrgy.length > 0
                        ? generalDetailsExpress.shipper_postal
                        : ""
                    }
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    placeholder="Postal"
                    disabled
                  />
                </span>
                <InputError
                  isValid={isError.shipper_postal}
                  message={"This field is required*"}
                />
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                Address<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-6">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    onChange={handleDetailChange}
                    name="shipper_address"
                    value={generalDetailsExpress.shipper_address}
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                  />
                </span>
                <InputError
                  isValid={isError.shipper_address}
                  message={"This field is required*"}
                />
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                Contact Number<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-6">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    onChange={handleDetailChange}
                    name="shipper_contact"
                    value={generalDetailsExpress.shipper_contact}
                    type="number"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    maxLength={11}
                  />
                </span>
                <InputError
                  isValid={isError.shipper_contact}
                  message={"This field is required*"}
                />
                <InputError
                  isValid={isError.shipper_contact_error}
                  message={
                    "Contact Number must start with 0 and contain 10 or 11 digits*"
                  }
                />
              </div>
            </div>
            {/* Origin/Area Code of shipper is of Outlet. */}
            <div className="row mt-4 justify-content-center">
              <div className="col-sm-4">
                Origin/Area Code<label className="badge">{` *`}</label>
              </div>
              <div className="col-3">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    name="shipper_origin"
                    value={generalDetailsExpress.shipper_origin}
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    // value="CEB"
                    disabled
                  />
                </span>
              </div>
              <div className="col-3">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    onChange={handleDetailChange}
                    name="shipper_area_code"
                    value={generalDetailsExpress.shipper_area_code}
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    disabled
                  />
                </span>
              </div>
            </div>
            {/* <div className="row mt-2 justify-content-center">
              <div className="col-sm-4 pt-1">
                EWT<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-3">
                <div class="form-check form-check-inline">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    class="form-check-input"
                    type="radio"
                    name="isewt"
                    value="2%EWT"
                    checked={generalDetailsExpress.reference === "2%EWT"}
                    id="isewt2"
                    //   onChange={handleDetailChange}
                    disabled={generalDetailsExpress.shipper_company === ""}
                  />
                  <label class="form-check-label" for="isewt2">
                    2%
                  </label>
                </div>
              </div>
              <div className="col-sm-3">
                <div class="form-check form-check-inline">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    class="form-check-input"
                    type="radio"
                    name="isewt"
                    id="isewt5"
                    value="5%GWT"
                    checked={generalDetailsExpress.reference === "5%GWT"}
                    //   onChange={handleDetailChange}
                    disabled={generalDetailsExpress.shipper_company === ""}
                  />
                  <label class="form-check-label" for="isewt5">
                    5%
                  </label>
                </div>
              </div>
            </div> */}
            <div className="row justify-content-center">
              <div className="col-sm-4"></div>
              <div className="col-sm-8">
                <InputError
                  isValid={isError.reference}
                  message={"This field is required*"}
                />
              </div>
            </div>
            {/* <div className="row mt-2 mb-3 justify-content-center">
              <div className="col-sm-4 pt-1">EWT Photo</div>
              <div className="col-sm-6 input-group-sm">
                <input
                  autoComplete="new-password"
                  list="autocompleteOff"
                  size={"sm"}
                  className=""
                  type="file"
                  accept="image/*"
                  name="express_attachments"
                  multiple="multiple"
                  // onChange={handleUpload}
                  disabled={generalDetailsExpress.shipper_company === ""}
                />
                <InputError
                isValid={isError.express_attachments}
                message={"This field is required*"}
              />
              </div>
            </div> */}
            {/* <div className="row mt-2 justify-content-center"> */}
            {fileNames.map((file, i) => {
              return (
                <div className="row mt-2 justify-content-center">
                  <div className="col-sm-4">
                    <p className="input-subtitle pt-1 p-0 mb-0 font-sm">
                      Image {i + 1}
                    </p>
                  </div>
                  <div className="col-sm input-group-sm">
                    <span className="span-summary-pink">{file}</span>
                  </div>
                </div>
              )
            })}
            {/* </div> */}
            <hr />
            <div className="row justify-content-center">
              <div className="col-sm color-pink text-center mb-2">
                <h5>CONSIGNEE DETAILS</h5>
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              {/* <div className="row mt-2 justify-content-center"> */}
              <div className="col-sm-4"></div>
              <div className="col-sm-6">
                <div className="form-check form-check-inline">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    className="form-check-input"
                    type="checkbox"
                    id="save_consignee"
                    name="save_consignee"
                    defaultChecked={
                      generalDetailsExpress.save_consignee === true
                    }
                    onChange={handleDetailChange}
                  />
                  <label> Save Consignee</label>
                </div>
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">Company Name</div>
              <div className="col-sm-6">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    name="consignee_company"
                    value={generalDetailsExpress.consignee_company}
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    onChange={handleDetailChange}
                  />
                </span>
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                Name<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-6">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    onChange={handleDetailChange}
                    name="consignee_name"
                    value={generalDetailsExpress.consignee_name}
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                  />
                </span>
                <InputError
                  isValid={isError.consignee_name}
                  message={"This field is required*"}
                />
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                Province/City<label className="badge">{` *`}</label>
              </div>
              <div className="col-3">
                {/* <span className="input-group input-group-sm"> */}
                <span>
                  <Typeahead
                    inputProps={{
                      autoComplete: "new-password",
                      list: "autoComplete",
                    }}
                    autoComplete="new-password"
                    list="autocompleteOff"
                    size="sm"
                    className="pt-0"
                    id="basic-typeahead-single"
                    labelKey="name"
                    onChange={handleConsigneeProvinceChange}
                    onInputChange={handleConsigneeProvinceInputChange}
                    options={consigneeProvince}
                    placeholder="Province"
                    selected={selectedConsigneeProvince}
                  />
                </span>
                <InputError
                  isValid={isError.consignee_province}
                  message={"This field is required*"}
                />
              </div>
              <div className="col-3">
                <span>
                  <Typeahead
                    inputProps={{
                      autoComplete: "new-password",
                      list: "autoComplete",
                    }}
                    autoComplete="new-password"
                    list="autocompleteOff"
                    size="sm"
                    className="pt-0"
                    id="basic-typeahead-single"
                    labelKey="name"
                    onChange={handleConsigneeCityChange}
                    onInputChange={handleConsigneeCityInputChange}
                    options={consigneeCities}
                    placeholder="City/Municipality"
                    selected={selectedConsigneeCity}
                  />
                </span>
                <InputError
                  isValid={isError.consignee_city}
                  message={"This field is required*"}
                />
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                Barangay/Postal<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-3">
                <span>
                  <Typeahead
                    inputProps={{
                      autoComplete: "new-password",
                      list: "autoComplete",
                    }}
                    autoComplete="new-password"
                    list="autocompleteOff"
                    size="sm"
                    className="pt-0"
                    id="basic-typeahead-single"
                    labelKey="name"
                    // onFocus={() => {
                    //   if (focused) {
                    //     setOpen(false);
                    //   } else {
                    //     setOpen(true);
                    //   }
                    //   setFocused(false);
                    //   // setOpen(open);
                    // }}
                    onChange={handleConsigneeBrgyChange}
                    options={consigneeBrgy}
                    placeholder="Barangay"
                    selected={selectedConsigneeBrgy}
                  />
                </span>
                <InputError
                  isValid={isError.consignee_brgy}
                  message={"This field is required*"}
                />
              </div>
              <div className="col-sm-3">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    disabled
                    name="consignee_postal"
                    value={
                      selectedConsigneeBrgy.length > 0
                        ? generalDetailsExpress.consignee_postal
                        : ""
                    }
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    placeholder="Postal"
                  />
                </span>
                <InputError
                  isValid={isError.consignee_postal}
                  message={"This field is required*"}
                />
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                Address<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-6">
                <span className="input-group input-group-sm">
                  <input
                    //   ref={consigneeAddress}
                    autoComplete="new-password"
                    list="autocompleteOff"
                    onChange={handleDetailChange}
                    name="consignee_address"
                    value={generalDetailsExpress.consignee_address}
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                  />
                </span>
                <InputError
                  isValid={isError.consignee_address}
                  message={"This field is required*"}
                />
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                Contact Number<label className="badge">{` *`}</label>
              </div>
              <div className="col-sm-6">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    onChange={handleDetailChange}
                    name="consignee_contact"
                    value={generalDetailsExpress.consignee_contact}
                    type="number"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    maxLength={11}
                  />
                </span>
                <InputError
                  isValid={isError.consignee_contact}
                  message={"This field is required*"}
                />
                <InputError
                  isValid={isError.consignee_contact_error}
                  message={
                    "Contact Number must start with 0 and contain 10 or 11 digits*"
                  }
                />
              </div>
            </div>
            <div className="row mt-4 justify-content-center">
              <div className="col-sm-4">
                Destination/Area Code<label className="badge">{` *`}</label>
              </div>
              <div className="col-3">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    onChange={handleDetailChange}
                    name="consignee_origin"
                    value={
                      selectedConsigneeBrgy.length > 0
                        ? generalDetailsExpress.consignee_origin
                        : ""
                    }
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    // value="MNL"
                    disabled
                  />
                </span>
                <InputError
                  isValid={isError.consignee_origin}
                  message={"This field is required*"}
                />
              </div>
              <div className="col-3">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    onChange={handleDetailChange}
                    name="consignee_area_code"
                    value={
                      selectedConsigneeBrgy.length > 0
                        ? generalDetailsExpress.consignee_area_code
                        : ""
                    }
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    // value="123"
                    disabled
                  />
                </span>
                <InputError
                  isValid={isError.consignee_area_code}
                  message={"This field is required*"}
                />
              </div>
            </div>
            <hr />

            {/* Package Details */}
            <div className="row justify-content-center">
              <div className="col-sm color-pink text-center mb-2">
                <h5>PACKAGE DETAILS</h5>
              </div>
            </div>

            {/* View for cargo & parcel */}
            {(generalDetailsExpress.transaction_type === "cargo" ||
              generalDetailsExpress.transaction_type === "parcel") && (
              <>
                <div className={"row mt-2 mt-1 d-flex justify-content-center"}>
                  <div className="col-sm-2 pt-1">Package Type</div>
                  <div className={"col-sm-3"}>
                    <span className="input-group input-group-sm">
                      <Form.Select
                        autoComplete="new-password"
                        list="autocompleteOff"
                        name="packaging"
                        value={generalDetailsExpress.packaging}
                        className="form-control input-font-sm"
                        aria-label="ecust-acct"
                        aria-describedby="basic-addon1"
                        onChange={handlePackageDetailChange}
                        disabled={
                          generalDetailsExpress.transaction_type === "parcel"
                        }
                      >
                        <option>Select</option>
                        {generalDetailsExpress.destination_system !==
                          "ZIP-S" && (
                          <option value={"2go_packaging"}>2GO Packaging</option>
                        )}
                        <option value={"own_packaging"}>Own Packaging</option>
                      </Form.Select>
                    </span>
                    <InputError
                      isValid={isError.packaging}
                      message={"This field is required*"}
                    />
                  </div>
                  <div className="col-sm-2"></div>
                  <div className="col-sm-3">
                    {generalDetailsExpress.transaction_type === "cargo" && (
                      <button
                        className="btn-back btn-rad"
                        onClick={handleAddPackage}
                        style={{
                          background: "var(--primary-color)",
                          width: "100%",
                        }}
                      >
                        {"+ Add Another Package"}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}

            <div
              className={
                generalDetailsExpress.transaction_type !== "document" &&
                generalDetailsExpress.transaction_type === "parcel"
                  ? "row mb-3 mt-3 justify-content-center"
                  : "row mb-3 mt-3 justify-content-center"
              }
            >
              {generalDetailsExpress.transaction_type !== "document" ? (
                <>
                  <div className="col-sm-3">
                    Total Transaction Declared Value
                  </div>

                  <div className="col-sm-2">
                    <span className="input-group input-group-sm">
                      <input
                        autoComplete="new-password"
                        list="autocompleteOff"
                        name="declared_value"
                        value={generalDetailsExpress.declared_value}
                        type="number"
                        className="form-control input-font-sm"
                        aria-label="ecust-acct"
                        aria-describedby="basic-addon1"
                        onChange={handlePackageDetailChange}
                      />
                    </span>
                    <InputError
                      isValid={isError.declared_value}
                      message={"This field is required*"}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-sm-2 pt-1">Service Classification</div>
                  <div className="col-sm-3">
                    <span className="input-group input-group-sm">
                      <Form.Select
                        autoComplete="new-password"
                        list="autocompleteOff"
                        name="rate_classification"
                        value={generalDetailsExpress.rate_classification}
                        className="form-control input-font-sm"
                        aria-label="ecust-acct"
                        aria-describedby="basic-addon1"
                        onChange={handlePackageDetailChange}
                        disabled={
                          generalDetailsExpress.destination_system === "QAIR"
                        }
                      >
                        <option>Select</option>
                        {generalDetailsExpress.destination_system ===
                          "QAIR" && <option value="DAY1">DAY1</option>}
                        <option value="DAY3">DAY3 - Supreme</option>
                        <option value="DAY6">DAY6 - Regular</option>
                        <option value="CFC">CFC - Interport</option>
                      </Form.Select>
                    </span>
                    <InputError
                      isValid={isError.rate_classification}
                      message={"This field is required*"}
                    />
                  </div>
                </>
              )}
              <div className="col-sm-3 pt-1">Total Transaction COD Amount</div>
              <div className="col-sm-2">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    name="cod_amount"
                    value={generalDetailsExpress.cod_amount}
                    type="number"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    onChange={handlePackageDetailChange}
                    disabled={generalDetailsExpress.account_cod_flag === "0"}
                  />
                </span>
                <InputError
                  isValid={isError.cod_amount}
                  message={"This field is required*"}
                />
              </div>
            </div>
            {generalDetailsExpress.transaction_type !== "document" && (
              <>
                <div className="row mb-2 mt-3 justify-content-center">
                  <div className="col-sm-2 pt-1">Service Classification</div>
                  <div className="col-sm-3">
                    <span className="input-group input-group-sm">
                      <Form.Select
                        autoComplete="new-password"
                        list="autocompleteOff"
                        name="rate_classification"
                        value={generalDetailsExpress.rate_classification}
                        className="form-control input-font-sm"
                        aria-label="ecust-acct"
                        aria-describedby="basic-addon1"
                        onChange={handlePackageDetailChange}
                        disabled={
                          generalDetailsExpress.destination_system === "QAIR"
                        }
                      >
                        <option>Select</option>
                        {generalDetailsExpress.destination_system ===
                          "QAIR" && <option value="DAY1">DAY1</option>}
                        <option value="DAY3">DAY3 - Supreme</option>
                        <option value="DAY6">DAY6 - Regular</option>
                        <option value="CFC">CFC - Interport</option>
                      </Form.Select>
                    </span>
                    <InputError
                      isValid={isError.rate_classification}
                      message={"This field is required*"}
                    />
                  </div>
                  <div className="col-sm-2 pt-1">Remarks</div>
                  <div className="col-sm-3">
                    <span className="input-group input-group-sm">
                      <input
                        autoComplete="new-password"
                        list="autocompleteOff"
                        name="remarks"
                        value={generalDetailsExpress.remarks}
                        type="text"
                        className="form-control input-font-sm"
                        aria-label="ecust-acct"
                        aria-describedby="basic-addon1"
                        onChange={handlePackageDetailChange}
                        // disabled={generalDetailsExpress.account_cod_flag === "0"}
                      />
                    </span>
                  </div>
                </div>
              </>
            )}
            {generalDetailsExpress.transaction_type === "document" && (
              <div className="row mb-3 mt-3 justify-content-center">
                <div className="col-sm-2 pt-1">Remarks</div>
                <div className="col-sm-3">
                  <span className="input-group input-group-sm">
                    <input
                      autoComplete="new-password"
                      list="autocompleteOff"
                      name="remarks"
                      value={generalDetailsExpress.remarks}
                      type="text"
                      className="form-control input-font-sm"
                      aria-label="ecust-acct"
                      aria-describedby="basic-addon1"
                      onChange={handlePackageDetailChange}
                      // disabled={generalDetailsExpress.account_cod_flag === "0"}
                    />
                  </span>
                </div>
                <div className="col-sm-2 pt-1"></div>
                <div className="col-sm-3"></div>
              </div>
            )}
            <div className="row mb-3 mt-3 ">
              <div className="col-sm-3"></div>
              <div className="col-sm-3"></div>
            </div>
            <div className="row justify-content-center">
              <div className="col-10">
                <Accordion defaultActiveKey="0" flush className="mb-5">
                  {documentDetails.map((data, key) => {
                    return (
                      <Accordion.Item eventKey={key}>
                        <Accordion.Header className="">
                          <div
                            className="col-sm-11"
                            style={{ color: "var(--primary-color)" }}
                          >
                            {generalDetailsExpress.transaction_type ===
                              "cargo" ||
                            generalDetailsExpress.transaction_type === "parcel"
                              ? `Package ${key + 1}`
                              : "Document"}{" "}
                          </div>
                          {generalDetailsExpress.transaction_type ===
                            "cargo" && (
                            <div className="col align-content-end">
                              <button
                                className=" btn-sm"
                                onClick={() => handleDelete(key)}
                                style={{
                                  background: "var(--cancel-btn)",
                                  border: "none",
                                  color: "whitesmoke",
                                }}
                              >
                                {"Delete"}
                              </button>
                            </div>
                          )}
                          {/* </div> */}
                        </Accordion.Header>
                        <Accordion.Body>
                          {generalDetailsExpress.transaction_type === "cargo" ||
                          generalDetailsExpress.transaction_type ===
                            "parcel" ? (
                            <>
                              <div className="row mb-3 justify-content-center align-items-center">
                                <div
                                  className="col-6"
                                  // style={{ background: "var(--secondary-color)" }}
                                >
                                  <div className="col-12 p-3 col-grey">
                                    <div className="form-group">
                                      <label htmlFor="state">
                                        PACKAGE CODE
                                      </label>
                                      <label className="badge">{` *`}</label>
                                      <Form.Select
                                        autoComplete="new-password"
                                        list="autocompleteOff"
                                        size="sm"
                                        className="bg-grey"
                                        name="package_code"
                                        value={data.package_code}
                                        onChange={(e) =>
                                          handleDetailsChange(e, key, data)
                                        }
                                      >
                                        <option>Select</option>
                                        {packageCodes.map((data, ind) => {
                                          return (
                                            <option value={ind}>
                                              {data.description}
                                            </option>
                                          )
                                        })}
                                      </Form.Select>
                                      <InputError
                                        isValid={
                                          packageErrorDetail[parseInt(key)][
                                            "package_code"
                                          ]
                                        }
                                        message={"This field is required*"}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 p-3 col-grey">
                                    <div className="">
                                      <label htmlFor="state">
                                        COMMODITY CODE{" "}
                                      </label>
                                      <label className="badge">{` *`}</label>
                                      <Typeahead
                                        disabled={
                                          generalDetailsExpress.transaction_type ===
                                            "document" ||
                                          generalDetailsExpress.transaction_type ===
                                            "parcel"
                                        }
                                        inputProps={{
                                          autoComplete: "new-password",
                                          list: "autoComplete",
                                        }}
                                        autoComplete="new-password"
                                        list="autoComplete"
                                        size="sm"
                                        className="pt-0 commodity-typeahead"
                                        id="basic-typeahead-single"
                                        labelKey="name"
                                        onChange={(e) =>
                                          handleSelectCommodity(e, key)
                                        }
                                        options={
                                          generalDetailsExpress.destination_system ===
                                          "QAIR"
                                            ? qair_comms
                                            : zip_comms
                                        }
                                        placeholder="Select Commodity"
                                        selected={data.commodity_code}
                                        style={{
                                          border: "none",
                                          background: "var(--dropdown-bg)",
                                        }}
                                      />

                                      <InputError
                                        isValid={
                                          packageErrorDetail[parseInt(key)][
                                            "commodity_code"
                                          ]
                                        }
                                        message={"This field is required*"}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 p-3 col-grey">
                                    <div className="row">
                                      <div className="col-5">
                                        <div className="form-group">
                                          <label htmlFor="max-weight">
                                            Total No. of Packages{" "}
                                          </label>
                                          <label className="badge">{` *`}</label>
                                        </div>
                                      </div>
                                      <div className="col-7">
                                        <div className="form-group">
                                          <div className="input-group input-group-sm">
                                            <input
                                              autoComplete="new-password"
                                              list="autocompleteOff"
                                              name="quantity"
                                              disabled={
                                                generalDetailsExpress.transaction_type ===
                                                "parcel"
                                              }
                                              value={data.quantity}
                                              type="text"
                                              className="form-control input-group-sm"
                                              aria-label="max-weight"
                                              onChange={(e) =>
                                                handleDetailsChange(
                                                  e,
                                                  key,
                                                  data
                                                )
                                              }
                                            />
                                          </div>
                                          <InputError
                                            isValid={
                                              packageErrorDetail[parseInt(key)][
                                                "quantity"
                                              ]
                                            }
                                            message={"This field is required*"}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="col-12 p-3"></div>
                        <div className="col-12 p-3"></div>
                        <div className="col-12 p-3"></div> */}
                                </div>
                                <div className="col-6">
                                  <div className="col-12 p-3">
                                    <div className="form-group">
                                      <input
                                        autoComplete="new-password"
                                        list="autocompleteOff"
                                        onChange={(e) =>
                                          handleDetailsChange(e, key, data)
                                        }
                                        name="block_measurement"
                                        checked={
                                          data.block_measurement === "1"
                                            ? true
                                            : false
                                        }
                                        type="checkbox"
                                        className="custom-control-inpu mr-10"
                                        id="purchase-limit"
                                      />{" "}
                                      <label
                                        className="custom-control-label"
                                        htmlFor="purchase-limit"
                                      >
                                        Block Measurement
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-12 p-3">
                                    <div className="row">
                                      <div className="col-sm-4">
                                        <div className="form-group">
                                          <label htmlFor="dimension">
                                            Dimension{" "}
                                          </label>
                                          <label className="badge">{` *`}</label>
                                        </div>
                                      </div>
                                      <div className="col-sm-2">
                                        <div className="form-group">
                                          <div className="input-group input-group-sm">
                                            <input
                                              autoComplete="new-password"
                                              list="autocompleteOff"
                                              disabled={
                                                data.block_measurement ===
                                                  "0" &&
                                                ((generalDetailsExpress.packaging !==
                                                  "own_packaging" &&
                                                  packageCodes.length > 0 &&
                                                  data.package_code !== " " &&
                                                  data.package_code !== "" &&
                                                  (packageCodes[
                                                    parseInt(data.package_code)
                                                  ]["code"]
                                                    .slice(-2)
                                                    .toUpperCase() === "QB" ||
                                                    packageCodes[
                                                      parseInt(
                                                        data.package_code
                                                      )
                                                    ]["code"]
                                                      .slice(-3)
                                                      .toUpperCase() ===
                                                      "BBB")) ||
                                                  (generalDetailsExpress.transaction_type ===
                                                    "parcel" &&
                                                    generalDetailsExpress.packaging ===
                                                      "2go_packaging"))
                                              }
                                              name="length"
                                              value={data.length}
                                              type="number"
                                              className="form-control input-group-sm"
                                              aria-label="dimension"
                                              placeholder="length"
                                              onChange={(e) =>
                                                handleDetailsChange(
                                                  e,
                                                  key,
                                                  data
                                                )
                                              }
                                            />
                                            <InputError
                                              isValid={
                                                packageErrorDetail[
                                                  parseInt(key)
                                                ]["length"]
                                              }
                                              message={
                                                "This field is required*"
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-sm-2">
                                        <div className="form-group">
                                          <div className="input-group input-group-sm">
                                            <input
                                              autoComplete="new-password"
                                              list="autocompleteOff"
                                              disabled={
                                                data.block_measurement ===
                                                  "0" &&
                                                ((generalDetailsExpress.packaging !==
                                                  "own_packaging" &&
                                                  packageCodes.length > 0 &&
                                                  data.package_code !== " " &&
                                                  data.package_code !== "" &&
                                                  (packageCodes[
                                                    parseInt(data.package_code)
                                                  ]["code"]
                                                    .slice(-2)
                                                    .toUpperCase() === "QB" ||
                                                    packageCodes[
                                                      parseInt(
                                                        data.package_code
                                                      )
                                                    ]["code"]
                                                      .slice(-3)
                                                      .toUpperCase() ===
                                                      "BBB")) ||
                                                  (generalDetailsExpress.transaction_type ===
                                                    "parcel" &&
                                                    generalDetailsExpress.packaging ===
                                                      "2go_packaging"))
                                              }
                                              name="width"
                                              value={data.width}
                                              type="number"
                                              className="form-control input-group-sm"
                                              aria-label="dimension"
                                              placeholder="width"
                                              onChange={(e) =>
                                                handleDetailsChange(
                                                  e,
                                                  key,
                                                  data
                                                )
                                              }
                                            />
                                            <InputError
                                              isValid={
                                                packageErrorDetail[
                                                  parseInt(key)
                                                ]["width"]
                                              }
                                              message={
                                                "This field is required*"
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-sm-2">
                                        <div className="form-group">
                                          <div className="input-group input-group-sm">
                                            <input
                                              autoComplete="new-password"
                                              list="autocompleteOff"
                                              disabled={
                                                data.block_measurement ===
                                                  "0" &&
                                                ((generalDetailsExpress.packaging !==
                                                  "own_packaging" &&
                                                  packageCodes.length > 0 &&
                                                  data.package_code !== " " &&
                                                  data.package_code !== "" &&
                                                  (packageCodes[
                                                    parseInt(data.package_code)
                                                  ]["code"]
                                                    .slice(-2)
                                                    .toUpperCase() === "QB" ||
                                                    packageCodes[
                                                      parseInt(
                                                        data.package_code
                                                      )
                                                    ]["code"]
                                                      .slice(-3)
                                                      .toUpperCase() ===
                                                      "BBB")) ||
                                                  (generalDetailsExpress.transaction_type ===
                                                    "parcel" &&
                                                    generalDetailsExpress.packaging ===
                                                      "2go_packaging"))
                                              }
                                              name="height"
                                              value={data.height}
                                              type="number"
                                              className="form-control input-group-sm"
                                              aria-label="dimension"
                                              placeholder="height"
                                              onChange={(e) =>
                                                handleDetailsChange(
                                                  e,
                                                  key,
                                                  data
                                                )
                                              }
                                            />
                                            <InputError
                                              isValid={
                                                packageErrorDetail[
                                                  parseInt(key)
                                                ]["height"]
                                              }
                                              message={
                                                "This field is required*"
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-sm-2">
                                        <div className="input-group-append input-group-sm">
                                          <span className="input-group-text bg-white">
                                            cm
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 p-3">
                                    <div className="row align-items-center">
                                      <div className="col-4">
                                        <div className="form-group">
                                          <label htmlFor="max-weight">
                                            Actual Weight{" "}
                                          </label>
                                          <label className="badge">{` *`}</label>
                                        </div>
                                      </div>
                                      <div className="col-8">
                                        <div className="form-group">
                                          <div className="input-group input-group-sm">
                                            <input
                                              autoComplete="new-password"
                                              list="autocompleteOff"
                                              // disabled={
                                              //   generalDetailsExpress.transaction_type !==
                                              //   "cargo"
                                              // }
                                              name="actual_weight"
                                              value={data.actual_weight}
                                              type="number"
                                              className="form-control input-group-sm"
                                              aria-label="max-weight"
                                              onChange={(e) =>
                                                handleDetailsChange(
                                                  e,
                                                  key,
                                                  data
                                                )
                                              }
                                              disabled={
                                                data.block_measurement ===
                                                  "0" &&
                                                (generalDetailsExpress.transaction_type ===
                                                  "document" ||
                                                  generalDetailsExpress.transaction_type ===
                                                    "parcel")
                                              }
                                            />
                                            <div className="input-group-append input-group-sm">
                                              <span className="input-group-text bg-white">
                                                {generalDetailsExpress.destination_system ===
                                                  "ZIP-R" ||
                                                generalDetailsExpress.destination_system ===
                                                  "ZIP-S"
                                                  ? "cbm"
                                                  : "kg"}
                                              </span>
                                            </div>
                                          </div>
                                          <InputError
                                            isValid={
                                              packageErrorDetail[parseInt(key)][
                                                "actual_weight"
                                              ]
                                            }
                                            message={"This field is required*"}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 p-3">
                                    <div className="row mb-4 align-items-center">
                                      <div className="col-4">
                                        <div className="form-group">
                                          <label htmlFor="dimension">
                                            Description{" "}
                                          </label>
                                          <label className="badge">{` *`}</label>
                                        </div>
                                      </div>
                                      <div className="col-8">
                                        <div className="form-group">
                                          <div className="input-group input-group-sm">
                                            <input
                                              autoComplete="new-password"
                                              list="autocompleteOff"
                                              type="text"
                                              name="description"
                                              value={data.description}
                                              className="form-control input-group-sm"
                                              aria-label="description"
                                              onChange={(e) =>
                                                handleDetailsChange(
                                                  e,
                                                  key,
                                                  data
                                                )
                                              }
                                            />
                                          </div>
                                          <InputError
                                            isValid={
                                              packageErrorDetail[parseInt(key)][
                                                "description"
                                              ]
                                            }
                                            message={"This field is required*"}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    className="col-12 p-3 pt-0 mt-0"
                                    style={{
                                      fontSize: "small",
                                      color: "var(--secondary-color)",
                                    }}
                                  >
                                    NOTE: *If Block Measurement is checked,
                                    please enter the dimension and weight
                                    amount.
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="row mb-3 justify-content-center align-items-center">
                                <div className="col-6 p-3 col-grey">
                                  <div className="form-group">
                                    <label htmlFor="state">PACKAGE CODE</label>
                                    <label className="badge">{` *`}</label>
                                    <Form.Select
                                      autoComplete="new-password"
                                      list="autocompleteOff"
                                      size="sm"
                                      className="bg-grey"
                                      name="package_code"
                                      value={data.package_code}
                                      onChange={(e) =>
                                        handleDetailsChange(e, key, data)
                                      }
                                    >
                                      <option>Select</option>
                                      {packageCodes.map((data, ind) => {
                                        return (
                                          <option value={ind}>
                                            {data.description}
                                          </option>
                                        )
                                      })}
                                    </Form.Select>
                                    <InputError
                                      isValid={
                                        packageErrorDetail[parseInt(key)][
                                          "package_code"
                                        ]
                                      }
                                      message={"This field is required*"}
                                    />
                                  </div>
                                </div>
                                <div className="col-6 p-3 col-grey">
                                  <div className="form-group">
                                    <label htmlFor="state">
                                      COMMODITY CODE{" "}
                                    </label>
                                    <label className="badge">{` *`}</label>
                                    <Typeahead
                                      disabled={
                                        generalDetailsExpress.transaction_type ===
                                          "document" ||
                                        generalDetailsExpress.transaction_type ===
                                          "parcel"
                                      }
                                      inputProps={{
                                        autoComplete: "new-password",
                                        list: "autoComplete",
                                      }}
                                      autoComplete="new-password"
                                      list="autoComplete"
                                      size="sm"
                                      className="pt-0 commodity-typeahead"
                                      id="basic-typeahead-single"
                                      labelKey="name"
                                      onChange={(e) =>
                                        handleSelectCommodity(e, key)
                                      }
                                      options={
                                        generalDetailsExpress.destination_system ===
                                        "QAIR"
                                          ? qair_comms
                                          : zip_comms
                                      }
                                      placeholder="Select Commodity"
                                      selected={data.commodity_code}
                                      style={{
                                        border: "none",
                                        background: "var(--dropdown-bg)",
                                      }}
                                    />

                                    <InputError
                                      isValid={
                                        packageErrorDetail[parseInt(key)][
                                          "commodity_code"
                                        ]
                                      }
                                      message={"This field is required*"}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-4 align-items-center">
                                <div className="col-2">
                                  <div className="form-group">
                                    <label htmlFor="max-weight">
                                      Actual Weight{" "}
                                    </label>
                                    <label className="badge">{` *`}</label>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <div className="form-group">
                                    <div className="input-group input-group-sm">
                                      <input
                                        autoComplete="new-password"
                                        list="autocompleteOff"
                                        // disabled={
                                        //   generalDetailsExpress.transaction_type !== "cargo"
                                        // }
                                        name="actual_weight"
                                        value={data.actual_weight}
                                        type="number"
                                        className="form-control input-group-sm"
                                        aria-label="max-weight"
                                        onChange={(e) =>
                                          handleDetailsChange(e, key, data)
                                        }
                                        disabled={
                                          data.block_measurement === "0" &&
                                          (generalDetailsExpress.transaction_type ===
                                            "document" ||
                                            generalDetailsExpress.transaction_type ===
                                              "parcel")
                                        }
                                      />
                                      <div className="input-group-append input-group-sm">
                                        <span className="input-group-text bg-white">
                                          {generalDetailsExpress.transaction_type ===
                                            "cargo" ||
                                          generalDetailsExpress.transaction_type ===
                                            "parcel"
                                            ? "cbm"
                                            : "kg"}
                                        </span>
                                      </div>
                                    </div>
                                    <InputError
                                      isValid={
                                        packageErrorDetail[parseInt(key)][
                                          "actual_weight"
                                        ]
                                      }
                                      message={"This field is required*"}
                                    />
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="form-group">
                                    <label htmlFor="dimension">
                                      Dimension{" "}
                                    </label>
                                    <label className="badge">{` *`}</label>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <div className="input-group input-group-sm">
                                      <input
                                        autoComplete="new-password"
                                        list="autocompleteOff"
                                        // disabled={
                                        //   generalDetailsExpress.transaction_type !== "cargo"
                                        // }
                                        disabled={
                                          data.block_measurement === "0" &&
                                          ((generalDetailsExpress.packaging !==
                                            "own_packaging" &&
                                            //   typeof data.length === "string" &&
                                            //   data.length !== "0.00" &&
                                            //   data.length !== "0" &&
                                            //   data.length !== "") ||
                                            // (typeof data.length === "number" &&
                                            //   parseFloat(data.length) > 0) ||
                                            packageCodes.length > 0 &&
                                            data.package_code !== " " &&
                                            (packageCodes[
                                              parseInt(data.package_code)
                                            ]["code"]
                                              .slice(-2)
                                              .toUpperCase() === "QB" ||
                                              packageCodes[
                                                parseInt(data.package_code)
                                              ]["code"]
                                                .slice(-3)
                                                .toUpperCase() === "BBB")) ||
                                            (generalDetailsExpress.transaction_type ===
                                              "parcel" &&
                                              generalDetailsExpress.packaging ===
                                                "2go_packaging"))
                                        }
                                        name="length"
                                        value={data.length}
                                        type="number"
                                        className="form-control input-group-sm"
                                        aria-label="dimension"
                                        placeholder="length"
                                        onChange={(e) =>
                                          handleDetailsChange(e, key, data)
                                        }
                                      />
                                      <InputError
                                        isValid={
                                          packageErrorDetail[parseInt(key)][
                                            "length"
                                          ]
                                        }
                                        message={"This field is required*"}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <div className="input-group input-group-sm">
                                      <input
                                        autoComplete="new-password"
                                        list="autocompleteOff"
                                        // disabled={
                                        //   generalDetailsExpress.transaction_type !== "cargo"
                                        // }
                                        // disabled={packageCodes[parseInt(data.package_code)]["code"].slice(-2).toUpperCase() === "QB" || packageCodes[parseInt(data.package_code)]["code"].slice(-3).toUpperCase() === "BBB"}
                                        disabled={
                                          data.block_measurement === "0" &&
                                          ((generalDetailsExpress.packaging !==
                                            "own_packaging" &&
                                            //   typeof data.width === "string" &&
                                            //   data.width !== "0.00" &&
                                            //   data.width !== "0" &&
                                            //   data.width !== "") ||
                                            // (typeof data.width === "number" &&
                                            //   parseFloat(data.width) > 0) ||
                                            packageCodes.length > 0 &&
                                            data.package_code !== " " &&
                                            (packageCodes[
                                              parseInt(data.package_code)
                                            ]["code"]
                                              .slice(-2)
                                              .toUpperCase() === "QB" ||
                                              packageCodes[
                                                parseInt(data.package_code)
                                              ]["code"]
                                                .slice(-3)
                                                .toUpperCase() === "BBB")) ||
                                            (generalDetailsExpress.transaction_type ===
                                              "parcel" &&
                                              generalDetailsExpress.packaging ===
                                                "2go_packaging"))
                                        }
                                        name="width"
                                        value={data.width}
                                        type="number"
                                        className="form-control input-group-sm"
                                        aria-label="dimension"
                                        placeholder="width"
                                        onChange={(e) =>
                                          handleDetailsChange(e, key, data)
                                        }
                                      />
                                      <InputError
                                        isValid={
                                          packageErrorDetail[parseInt(key)][
                                            "width"
                                          ]
                                        }
                                        message={"This field is required*"}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <div className="input-group input-group-sm">
                                      <input
                                        autoComplete="new-password"
                                        list="autocompleteOff"
                                        // disabled={
                                        //   generalDetailsExpress.transaction_type !== "cargo"
                                        // }
                                        // disabled={packageCodes[parseInt(data.package_code)]["code"].slice(-2).toUpperCase() === "QB" || packageCodes[parseInt(data.package_code)]["code"].slice(-3).toUpperCase() === "BBB"}
                                        disabled={
                                          data.block_measurement === "0" &&
                                          ((generalDetailsExpress.packaging !==
                                            "own_packaging" &&
                                            //   typeof data.height === "string" &&
                                            //   data.height !== "0.00" &&
                                            //   data.height !== "0" &&
                                            //   data.height !== "") ||
                                            // (typeof data.height === "number" &&
                                            //   parseFloat(data.height) > 0) ||
                                            packageCodes.length > 0 &&
                                            data.package_code !== " " &&
                                            (packageCodes[
                                              parseInt(data.package_code)
                                            ]["code"]
                                              .slice(-2)
                                              .toUpperCase() === "QB" ||
                                              packageCodes[
                                                parseInt(data.package_code)
                                              ]["code"]
                                                .slice(-3)
                                                .toUpperCase() === "BBB")) ||
                                            (generalDetailsExpress.transaction_type ===
                                              "parcel" &&
                                              generalDetailsExpress.packaging ===
                                                "2go_packaging"))
                                        }
                                        name="height"
                                        value={data.height}
                                        type="number"
                                        className="form-control input-group-sm"
                                        aria-label="dimension"
                                        placeholder="height"
                                        onChange={(e) =>
                                          handleDetailsChange(e, key, data)
                                        }
                                      />
                                      <InputError
                                        isValid={
                                          packageErrorDetail[parseInt(key)][
                                            "height"
                                          ]
                                        }
                                        message={"This field is required*"}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="input-group-append input-group-sm">
                                    <span className="input-group-text bg-white">
                                      cm
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-4 align-items-center">
                                {generalDetailsExpress.transaction_type !==
                                  "document" && (
                                  <>
                                    <div className="col-2">
                                      <div className="form-group">
                                        <label htmlFor="max-weight">
                                          Quantity{" "}
                                        </label>
                                        <label className="badge">{` *`}</label>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="form-group">
                                        <div className="input-group input-group-sm">
                                          <input
                                            autoComplete="new-password"
                                            list="autocompleteOff"
                                            name="quantity"
                                            value={data.quantity}
                                            type="text"
                                            className="form-control input-group-sm"
                                            aria-label="max-weight"
                                            onChange={(e) =>
                                              handleDetailsChange(e, key, data)
                                            }
                                          />
                                          <InputError
                                            isValid={
                                              packageErrorDetail[parseInt(key)][
                                                "quantity"
                                              ]
                                            }
                                            message={"This field is required*"}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}

                                <div className="col-2">
                                  <div className="form-group">
                                    <label htmlFor="dimension">
                                      Description{" "}
                                    </label>
                                    <label className="badge">{` *`}</label>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <div className="form-group">
                                    <div className="input-group input-group-sm">
                                      <input
                                        autoComplete="new-password"
                                        list="autocompleteOff"
                                        type="text"
                                        name="description"
                                        value={data.description}
                                        className="form-control input-group-sm"
                                        aria-label="description"
                                        onChange={(e) =>
                                          handleDetailsChange(e, key, data)
                                        }
                                      />
                                    </div>
                                    <InputError
                                      isValid={
                                        packageErrorDetail[parseInt(key)][
                                          "description"
                                        ]
                                      }
                                      message={"This field is required*"}
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </Accordion.Body>
                      </Accordion.Item>
                    )
                  })}
                </Accordion>
              </div>
            </div>
            <div className="row mb-5 justify-content-center">
              <div className="col-6 mt-2 p-3">
                <div className="form-group">
                  <input
                    type="checkbox"
                    className="custom-control-inpu mr-10 "
                    id="privacy"
                    name="privacy"
                    checked={agree}
                    onChange={handleAgreeChange}
                  />

                  <label
                    className="custom-control-label input-subtitle pad-left5"
                    htmlFor="privacy"
                  >
                    I agree to 2GO's{" "}
                    <a
                      href="https://www.2go.com.ph/privacy-policy/"
                      target="_blank"
                    >
                      Privacy Policy and Terms and Conditions
                    </a>
                    .
                  </label>
                </div>
              </div>
              <div
                className="col-6 text-right align-right mt-3"
                style={{ fontSize: "x-large", textAlign: "-webkit-right" }}
              >
                TOTAL WEIGHT:{" "}
                {!isNaN(parseFloat(generalDetailsExpress.total_package_weight))
                  ? formatPrice(
                      parseFloat(generalDetailsExpress.total_package_weight)
                    )
                  : 0}{" "}
                {generalDetailsExpress.destination_system === "ZIP-R" ||
                generalDetailsExpress.destination_system === "ZIP-S"
                  ? "cbm"
                  : "kg"}
              </div>
            </div>
            <div className="row mb-2 mt-5 justify-content-center">
              <div className="col-sm-10">
                <div className="row justify-content-between">
                  <div className="col-sm-2">
                    <button
                      className="btn-back btn-rad"
                      onClick={() => {
                        navigation.go("/dashboard")
                      }}
                    >
                      Back{" "}
                    </button>
                  </div>

                  <div className="col-sm-2">
                    {isClicked ? (
                      <button
                        type="submit"
                        className="btn-next btn-rad"
                        style={{ textAlign: "-webkit-center" }}
                        // onClick={handleNext}
                        // onClick={() => navigation.next()}
                      >
                        <ReactLoading
                          type="balls"
                          color="white"
                          height={28}
                          width={25}
                        />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn-next btn-rad"
                        onClick={handleNext}
                        // onClick={() => navigation.next()}
                      >
                        {" "}
                        Next{" "}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Modal
              show={openOsa}
              onHide={() => setOpenOsa(false)}
              size="md"
              backdrop="static"
              centered
            >
              <Modal.Body className="pt-5">
                <div className="row justify-content-center">
                  <div
                    className="col-sm-4 align-center"
                    style={{ textAlignLast: "end" }}
                  >
                    <img src={erroricon} width={100} height={100} />
                  </div>
                  <div
                    className="col-sm-8 align-left pt-2 fw-bold"
                    style={{ textAlign: "center" }}
                  >
                    <span style={{ textAlign: "left", fontSize: "large" }}>
                      Selected location is not yet serviceable by 2GO. Please
                      try again.
                    </span>
                    <br />
                    <Button
                      size="sm"
                      style={{
                        textAlign: "center",
                        background: "var(--cancel-btn)",
                        border: "none",
                      }}
                      onClick={() => setOpenOsa(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div
                    className="col-sm-8 align-left pt-4 mt-2 fw-bold"
                    style={{
                      textAlign: "left",
                      fontSize: "large",
                      color: "var(--cancel-btn)",
                    }}
                  ></div>
                </div>
              </Modal.Body>
            </Modal>
            <Modal
              show={openOtd}
              onHide={() => setOpenOsa(false)}
              size="md"
              backdrop="static"
              centered
            >
              <Modal.Body className="pt-5">
                <div className="row justify-content-center">
                  <div
                    className="col-sm-4 align-center"
                    style={{ textAlignLast: "end" }}
                  >
                    <img src={caution} width={100} height={100} />
                  </div>
                  <div
                    className="col-sm-8 align-left pt-3 fw-bold"
                    style={{ textAlign: "center" }}
                  >
                    <span style={{ textAlign: "left", fontSize: "large" }}>
                      Selected location is OTD.
                    </span>
                    <br />
                    <Button
                      size="sm"
                      style={{
                        textAlign: "center",
                        background: "var(--cancel-btn)",
                        border: "none",
                      }}
                      onClick={() => {
                        setOpenOtd(false)
                        setIsClicked(false)
                      }}
                    >
                      Close
                    </Button>{" "}
                    <Button
                      size="sm"
                      style={{
                        textAlign: "center",
                        background: "var(--primary-color)",
                        border: "none",
                      }}
                      onClick={() => {
                        setOpenOtd(false)
                        handleNextPackage()
                        // navigation.next()
                      }}
                    >
                      Proceed
                    </Button>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div
                    className="col-sm-8 align-left pt-4 mt-2 fw-bold"
                    style={{
                      textAlign: "left",
                      fontSize: "large",
                      color: "var(--cancel-btn)",
                    }}
                  ></div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}
