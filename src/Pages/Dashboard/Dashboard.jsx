import Navbar from "../../Components/Navbar/Navbar"
import "./Dashboard.css"
import booking from "../../Assets/Images/Form/booking.png"
import packageimg from "../../Assets/Images/Form/package.png"
export default function Dashboard({
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
}) {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center p-5 mt-5">
          <div className="col-4 ">
            <div
              className="card-col text-center"
              onClick={() => navigation.go("track")}
            >
              <img src={booking} alt="booking" height={200} />
              <div className="purple-label mt-3 text-center">TRACK & TRACE</div>
            </div>
          </div>
          <div className="col-4">
            <div
              className="card-col text-center"
              onClick={() => navigation.next()}
            >
              <img src={packageimg} alt="booking" height={200} />
              <div className="purple-label mt-3 text-center">
                ONLINE BOOKING
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
