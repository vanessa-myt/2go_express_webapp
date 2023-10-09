import React, { useEffect, useState } from "react"
import { useStep } from "react-hooks-helper"
import InternationalForm from "../International/InternationalForm"
import Confirmation from "../Confirmation/Confirmation"
import {
  formatDate,
  formatDateNoTime,
  formatYMD,
  getTodayDate,
} from "../../Helpers/Utils/Common"
import {
  fetchCommodityDescriptions,
  fetchCountries,
  fetchPackages,
  fetchServices,
} from "../../Helpers/ApiCalls/DropdownsApi"
import BookingSuccess from "../BookingSuccess/BookingSuccess"
import Dashboard from "../Dashboard/Dashboard"
import TimelineComponent from "../Timeline/TimelineComponent"
import Booking from "../Booking/Booking"

function SwitchForm() {
  const steps = [{ id: "dashboard" }, { id: "booking" }, { id: "track" }]
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  })

  const expressType = "NEW"
  const [generalDetailsExpress, setGeneralDetailsExpress] = useState({
    destination_system: "",
    transaction_type: "",
    service_type: "",
    //Account Details
    payment_term: "",
    is_walk_in: true,
    account_number: "WALK-IN",
    account_name: "",
    payor: "shipper",
    account_short_name: "",
    account_address: "",
    account_cod_flag: "",
    /*SHIPPER */
    save_shipper: "",
    shipper_delivery_category: "",
    shipper_company: "",
    shipper_name: "",
    shipper_province: "",
    shipper_city: "",
    shipper_brgy: "",
    shipper_postal: "",
    shipper_address: "",
    shipper_contact: "",
    isewt: "",
    reference: "",
    express_attachments: "",
    /*CONSIGNEE */
    save_consignee: "",
    consignee_delivery_category: "",
    consignee_company: "",
    consignee_name: "",
    consignee_province: "",
    consignee_city: "",
    consignee_brgy: "",
    consignee_postal: "",
    consignee_address: "",
    consignee_contact: "",
    consignee_origin: "",
    consignee_area_code: "",
    //generic package details
    packaging: "",
    declared_value: "",
    cod_amount: "0",
    rate_classification: "",
    total_qty: "",
    remarks: "",
    total_package_weight: 0,
  })

  const [selectedCommodity, setSelectedCommodity] = useState([])
  const [documentDetails, setDocumentDetails] = useState([
    {
      package_code: " ",
      commodity_code: "",
      quantity: "1",
      block_measurement: "",
      actual_weight: "",
      response_weight: "",
      length: "",
      height: "",
      width: "",
      description: "",
      port_sticker_numbers: [],
    },
  ])

  const commodities = [
    {
      code: "CL",
      description: "CLOTHING",
    },
    {
      code: "RWM",
      description: "RAW MATERIALS",
    },
    {
      code: "MED",
      description: "MEDICINES",
    },
    {
      code: "TU",
      description: "TUNA",
    },
    {
      code: "CC01A",
      description: "CATEGORY 1 ACTUAL TEMP: RQRD TEMP",
    },
    {
      code: "FRU",
      description: "FRUITS",
    },
    {
      code: "SH",
      description: "SHOES",
    },
    {
      code: "BN",
      description: "BOLTS & NUTS",
    },
    {
      code: "GC",
      description: "GENERAL CARGO",
    },
    {
      code: "OG001",
      description: "OUT OF GAUGE",
    },
    {
      code: "STY",
      description: "STYRO (EMPTY",
    },
    {
      code: "MCP",
      description: "MACHINERY PARTS",
    },
    {
      code: "PRA",
      description: "PRAWN",
    },
    {
      code: "LHO",
      description: "LIVE HUMAN ORGAN",
    },
    {
      code: "J1",
      description: "JAIFI - MANGO",
    },
    {
      code: "VIT",
      description: "VITAMINS",
    },
    {
      code: "PE",
      description: "PERSONAL EFFECTS",
    },
    {
      code: "BR",
      description: "BROCHURES",
    },
    {
      code: "VCC",
      description: "VACCINES",
    },
    {
      code: "FEX",
      description: "FIRE EXTINGUISHER",
    },
    {
      code: "CO",
      description: "COSMETICS",
    },
    {
      code: "BB002",
      description: "SPECIAL HANDLING",
    },
    {
      code: "LI",
      description: "LIGHTER/MATCHES",
    },
    {
      code: "EP",
      description: "ELECTRICAL PARTS",
    },
    {
      code: "RC001",
      description: "ROLLING CARGO",
    },
    {
      code: "BB",
      description: "BALIKBAYAN BOXES",
    },
    {
      code: "AL",
      description: "ALBUMS",
    },
    {
      code: "GR",
      description: "GROCERIES",
    },
    {
      code: "FW",
      description: "FLOWERS",
    },
    {
      code: "DP",
      description: "DAIRY PRODUCTS",
    },
    {
      code: "FC001",
      description: "FRAGILE CARGO",
    },
    {
      code: "LA001",
      description: "LIVE ANIMAL",
    },
    {
      code: "TL",
      description: "TOILETRIES",
    },
    {
      code: "PC001",
      description: "PERISHABLE CARGO",
    },
    {
      code: "LA",
      description: "LIVE ANIMALS (PER HEAD",
    },
    {
      code: "PA",
      description: "PAINT/VARNISH",
    },
    {
      code: "CA",
      description: "COMPUTER & ACCESSORIES",
    },
    {
      code: "CM",
      description: "CAMPAIGN MATERIALS",
    },
    {
      code: "ESP",
      description: "ESPARAGUS",
    },
    {
      code: "EL",
      description: "ELECTRONICS",
    },
    {
      code: "CC02B",
      description: "CATEGORY 2B ACTUAL TEMP: RQRD TEMP",
    },
    {
      code: "LG",
      description: "LEATHER GOODS",
    },
    {
      code: "BB001",
      description: "LIFT ON/LIFT OFF",
    },
    {
      code: "NP",
      description: "NEWSPAPERS",
    },
    {
      code: "CE",
      description: "COMMUNICATION EQUIPMENT",
    },
    {
      code: "GAR",
      description: "GARMENTS",
    },
    {
      code: "HR",
      description: "HUMAN REMAIN",
    },
    {
      code: "CP",
      description: "COMPUTERS PARTS",
    },
    {
      code: "CC002",
      description: "SPECIAL HANDLING",
    },
    {
      code: "POD",
      description: "POD SERVICE CARGO",
    },
    {
      code: "DF",
      description: "DRIED FISH",
    },
    {
      code: "SS",
      description: "SCHOOL SUPPLIES",
    },
    {
      code: "DGJW",
      description: "DANGEROUS GOODS WITH JACK-WRAP",
    },
    {
      code: "PF",
      description: "PERFUMES",
    },
    {
      code: "PTG",
      description: "PAINTINGS",
    },
    {
      code: "FIN",
      description: "FINGERLINGS",
    },
    {
      code: "LFC",
      description: "FIGHTING COCKS (PER HEAD",
    },
    {
      code: "SSB",
      description: "SUPER SAVER BOX",
    },
    {
      code: "DO",
      description: "DOG",
    },
    {
      code: "OS",
      description: "OFFICE SUPPLIES",
    },
    {
      code: "PI",
      description: "PROMO ITEMS",
    },
    {
      code: "CT",
      description: "CAT",
    },
    {
      code: "PK",
      description: "PACKAGING MATERIALS",
    },
    {
      code: "BI",
      description: "BICYCLE/BICYCLE PARTS",
    },
    {
      code: "SW",
      description: "SEAWEEDS",
    },
    {
      code: "SP",
      description: "SPARE PARTS",
    },
    {
      code: "HA",
      description: "HANDICRAFTS",
    },
    {
      code: "AP",
      description: "APPLIANCES",
    },
    {
      code: "CST",
      description: "CASSETTE TAPES",
    },
    {
      code: "EX",
      description: "EXPLOSIVES",
    },
    {
      code: "CELL",
      description: "CELLULAR PHONES",
    },
    {
      code: "LAB",
      description: "LIVE ANIMALS (PER BOX",
    },
    {
      code: "JE",
      description: "JEWELRIES",
    },
    {
      code: "HE",
      description: "HATCHING EGGS",
    },
    {
      code: "FU",
      description: "FURNITURES",
    },
    {
      code: "BP",
      description: "BALIKBAYAN PERAC",
    },
    {
      code: "TEX",
      description: "TEXTILE",
    },
    {
      code: "MG",
      description: "MAGAZINES",
    },
    {
      code: "FO",
      description: "FORMS",
    },
    {
      code: "CC02A",
      description: "CATEGORY 2A ACTUAL TEMP: RQRD TEMP",
    },
    {
      code: "GLW",
      description: "GLASS WARES",
    },
    {
      code: "JW",
      description: "JACK-WRAP",
    },
    {
      code: "LTK",
      description: "LITTLE TIKES",
    },
    {
      code: "RP",
      description: "RUBBER PRODUCTS",
    },
    {
      code: "TOY",
      description: "TOYS",
    },
    {
      code: "PG",
      description: "PERISHABLE GOODS",
    },
    {
      code: "MP",
      description: "MARINE PRODUCTS",
    },
    {
      code: "MO",
      description: "MANGO",
    },
    {
      code: "NONDOC",
      description: "Non-Document",
    },
    {
      code: "TO",
      description: "TOBACCO/TOBACCO PRODUCTS",
    },
    {
      code: "POST",
      description: "POSTERS, TRAILERS, ADS",
    },
    {
      code: "OG",
      description: "OPTICAL GOODS",
    },
    {
      code: "PL",
      description: "PLANTS",
    },
    {
      code: "CC",
      description: "CANDIES/CHOCOLATES",
    },
    {
      code: "PP",
      description: "PHARMA PRODUCTS",
    },
    {
      code: "ELI",
      description: "ELECTRICAL INSTRUMENTS",
    },
    {
      code: "VP",
      description: "VETERINARY PRODUCTS",
    },
    {
      code: "FC",
      description: "FIGHTING COCKS",
    },
    {
      code: "KD",
      description: "KD CARTONS",
    },
    {
      code: "FL",
      description: "FLOUR/BAKERY PRODUCTS",
    },
    {
      code: "DC001",
      description: "DANGEROUS CARGO",
    },
    {
      code: "GM",
      description: "GEN MERCHANDISE",
    },
    {
      code: "ET",
      description: "EMPTY TANK (OXYGEN, LPG",
    },
    {
      code: "CELJW",
      description: "CELLPHONE WITH JACK-WRAP",
    },
    {
      code: "CMF",
      description: "CINEMATIC FILMS",
    },
    {
      code: "BOK",
      description: "BOOKS",
    },
    {
      code: "RM",
      description: "RADIOACTIVE MATERIALS",
    },
    {
      code: "FILM",
      description: "FILMS",
    },
    {
      code: "AM",
      description: "AMMUNITION",
    },
    {
      code: "DI",
      description: "DRY ICE",
    },
    {
      code: "MB",
      description: "MAILBAGS(PHILPOST",
    },
    {
      code: "SPS",
      description: "SHELL PRODUCTS",
    },
    {
      code: "CER",
      description: "CERAMICS",
    },
    {
      code: "DOC",
      description: "DOCUMENT",
    },
    {
      code: "CBE",
      description: "CABLE EQUIPMENT",
    },
    {
      code: "WI",
      description: "WINES",
    },
    {
      code: "PCM",
      description: "PROCESSED MEAT",
    },
    {
      code: "LUB",
      description: "LUBRICANT / GREASE / PETROLEUM PRODS",
    },
    {
      code: "GL",
      description: "GLASS",
    },
    {
      code: "PGJW",
      description: "PERISHABLE WITH JACK-WRAP",
    },
    {
      code: "FG",
      description: "Fragile",
    },
    {
      code: "OT001",
      description: "OTHERS",
    },
    {
      code: "GC001",
      description: "GENERAL CARGO",
    },
    {
      code: "CG",
      description: "CANNED GOODS",
    },
    {
      code: "FA",
      description: "FIRE ARMS",
    },
    {
      code: "PRM",
      description: "PRINTED MATTERS",
    },
    {
      code: "FE",
      description: "FERTILIZER",
    },
    {
      code: "CH",
      description: "CHEMICALS",
    },
    {
      code: "DG",
      description: "Dangerous Goods",
    },
    {
      code: "POR",
      description: "PORCELAIN",
    },
    {
      code: "FV",
      description: "FRUITS & VEGETABLES",
    },
    {
      code: "EC",
      description: "EMPTY CARTONS",
    },
    {
      code: "BTR",
      description: "BUTTER",
    },
    {
      code: "RR01",
      description: "RORO",
    },
    {
      code: "CON",
      description: "CONTRACEPTIVES",
    },
    {
      code: "DAYC",
      description: "DAY OLD CHICKS",
    },
  ].sort((a, b) => {
    let fa = a.description,
      fb = b.description

    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  })

  const [parcelDetails, setParcelDetails] = useState([
    {
      description: "",
      package_code: " ",
      commodity_code: "",
      actual_weight: "",
      length: "",
      height: "",
      width: "",
      block_measurement: "0",
      quantity: "1",
    },
  ])

  const [serviceTypes, setServiceTypes] = useState([
    {
      category: "air",
      value: "ADS",
      label: "Airport to Door Same Day",
    },
    {
      category: "air",
      value: "DDS",
      label: "Door to Door Same Day",
    },
    {
      category: "air",
      value: "DA",
      label: "Door to Airport",
    },
    {
      category: "air",
      value: "AD",
      label: "Airport to Door",
    },
    {
      category: "air",
      value: "AA",
      label: "Airport to Airport",
    },
    // {
    //   category: "air",
    //   value: "AA",
    //   label: "Airport to Airport",
    // },
    {
      category: "air",
      value: "DD",
      label: "Door to Door",
    },
    {
      category: "sea",
      value: "DD",
      label: "Door to Door",
    },
    {
      category: "sea",
      value: "PPR",
      label: "Pier to Pier R",
    },
    {
      category: "sea",
      value: "PD",
      label: "Pier to Door",
    },
    {
      category: "sea",
      value: "DP",
      label: "Door to Pier",
    },
    {
      category: "sea",
      value: "PP",
      label: "Pier to Pier",
    },
  ])

  const [docuClicked, setDocuClicked] = useState(false)
  const [parcelClicked, setParcelClicked] = useState(false)
  const [areas, setAreas] = useState([])
  const [transactionID, setTransactionID] = useState("")
  const [breakdown, setBreakDown] = useState([])
  const [packageCodes, setPackageCodes] = useState([])

  //payment
  const [type, setType] = useState("")
  const [generalDetails, setGeneralDetails] = useState({})
  const [transactionDetails, setTransactionDetails] = useState({})

  const [shipperProvince, setShipperProvince] = useState([])
  const [selectedShipperProvince, setSelectedShipperProvince] = useState([])
  const [shipperCities, setShipperCities] = useState([])
  const [selectedShipperCity, setSelectedShipperCity] = useState([])
  const [shipperBrgy, setShipperBrgy] = useState([])
  const [selectedShipperBrgy, setSelectedShipperBrgy] = useState([])

  const [consigneeProvince, setConsigneeProvince] = useState([])
  const [selectedConsigneeProvince, setSelectedConsigneeProvince] = useState([])
  const [consigneeCities, setConsigneeCities] = useState([])
  const [selectedConsigneeCity, setSelectedConsigneeCity] = useState([])
  const [consigneeBrgy, setConsigneeBrgy] = useState([])
  const [selectedConsigneeBrgy, setSelectedConsigneeBrgy] = useState([])
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

  const [paymentDetails, setPaymentDetails] = useState({}) //new

  const [fileNames, setFileNames] = useState([])
  //for search
  const [hasResultShipper, setHasResultShipper] = useState(false)
  const [searchInputShipper, setSearchInputShipper] = useState("")
  const [resultsShipper, setResultsShipper] = useState([])
  const [searchingShipper, setSearchingShipper] = useState(false)
  const [searchingConsignee, setSearchingConsignee] = useState(false)
  const [hasResultConsignee, setHasResultConsignee] = useState(false)
  const [searchInputConsignee, setSearchInputConsignee] = useState("")
  const [resultsConsignee, setResultsConsignee] = useState([])
  const [advisoryCustomer, setAdvisoryCustomer] = useState("")
  const [advisoryPackage, setAdvisoryPackage] = useState("")
  const [pickupOutlets, setPickupOutlets] = useState([])
  const [selectedOutlet, setSelectedOutlet] = useState([])
  const [pickup, setPickup] = useState(false)
  const [dropoff, setDropoff] = useState(false)
  const [hasDropoff, setHasDropoff] = useState(false)
  const [awb, setAWb] = useState("")

  const packageProps = {
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
  }
  const packageDetailsProps = {
    navigation,
    docuClicked,
    parcelClicked,
    documentDetails,
    setDocumentDetails,
    parcelDetails,
    setParcelDetails,
    generalDetailsExpress,
    setGeneralDetailsExpress,
    commodities,
    transactionID,
    setTransactionID,
    breakdown,
    setBreakDown,
    packageCodes,
    setPackageCodes,
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
    expressType,
    packageErrorDetail,
    setPackageErrorDetail,
    paymentDetails,
    setPaymentDetails,
    selectedCommodity,
    setSelectedCommodity,
    advisoryPackage,
    dropoff,
    hasDropoff,
    setHasDropoff,
    awb,
    setAWb,
    pickup,
    selectedOutlet,
  }

  // const paymentProps = {type, generalDetails, transactionDetails, navigation}
  const summaryProps = {
    navigation,
    generalDetails,
    documentDetails,
    transactionID,
    breakdown,
    transactionDetails,
    setTransactionDetails,
    type,
    setType,
    generalDetailsExpress,
    setGeneralDetails,
    packageCodes,
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
    serviceTypes,
    expressType,
    selectedCommodity,
    setSelectedCommodity,
  }

  const paymentProps = {
    type,
    generalDetails,
    transactionDetails,
    navigation,
    breakdown,
    generalDetailsExpress,
    commodities,
    packageCodes,
    documentDetails,
    serviceTypes,
    paymentDetails,
    setPaymentDetails,
    selectedCommodity,
    setSelectedCommodity,
  }

  async function fetchAreas() {
    // const response = await searchAreasDef();
    // if (response.data) {
    //   var arr = [];
    //   response.data.map((data) => {
    //     arr.push({ ...data, name: data.province });
    //   });
    //   setShipperProvince(arr);
    // }
  }
  async function fetchAreasConsignee() {
    // const response = await searchAreasDef();
    // if (response.data) {
    //   var arr = [];
    //   response.data.map((data) => {
    //     arr.push({ ...data, name: data.province });
    //   });
    //   // setShipperProvince(arr);
    //   setConsigneeProvince(arr);
    // }
  }

  async function fetchOutlets() {
    // const response = await getPickupOutlets()
    // if(response.data){
    //   setPickupOutlets(response.data)
    // }
  }
  useEffect(() => {
    fetchAreas()
    fetchAreasConsignee()

    fetchOutlets()
  }, [])
  switch (step.id) {
    case "dashboard":
      return <Dashboard {...packageProps} />
    case "booking":
      return <Booking {...packageProps} />
    case "track":
      return <TimelineComponent {...packageDetailsProps} />
  }

  return <div></div>
}

export default SwitchForm
