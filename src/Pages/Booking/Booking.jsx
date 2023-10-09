import { ToastContainer } from "react-toastify"
import Navbar from "../../Components/Navbar/Navbar"
import { Button, Modal } from "antd"
import "./Package.css"
import ReactLoading from "react-loading"
import search from "../../Assets/Sender/search_icon.png"
import { Typeahead } from "react-bootstrap-typeahead"

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
}) {
  return (
    <div>
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

        <div className="container form-cont mt-0 main-cont mb-4">
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
              <div className="col-sm-8">
                {/* <InputError
                isValid={isError.destination_system}
                message={"This field is required*"}
              /> */}
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
                      // onClick={() => handleTransactionTypeChange("document")}
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
                    //   onClick={() => handleTransactionTypeChange("parcel")}
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
              <div className="col-sm-8">
                {/* <InputError
                isValid={isError.transaction_type}
                message={"This field is required*"}
              /> */}
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
                  // onChange={handleDetailChange}
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
                {/* <InputError
                isValid={isError.service_type}
                message={"This field is required*"}
              /> */}
              </div>
            </div>
            <hr />

            {/* 
        If pay mode is CC or CS, check in list if COD is Y/N. Y=required; N=0. 
        If pay mode is CC or CS, must encode account number.
      */}
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
                    // disabled
                    defaultChecked={
                      generalDetailsExpress.is_walk_in === true ||
                      generalDetailsExpress.account_number === "WALK-IN"
                    }
                    //   onChange={handleDetailChange}
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
                    //   onChange={handleDetailChange}
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
                    //   onChange={handleDetailChange}
                  />
                </span>
                {/* <InputError
                isValid={isError.account_name}
                message={"This field is required*"}
              /> */}
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">Is this a drop-off?</div>
              <div className="col-sm-6">
                <div className="form-check form-check-inline">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    className="form-check-input"
                    type="checkbox"
                    id="dropoff"
                    name="dropoff"
                    disabled={
                      generalDetailsExpress.account_number === "WALK-IN"
                    }
                    checked={dropoff}
                    onChange={(e) => {
                      setDropoff(e.target.checked)
                      //                 if(e.target.checked === false){
                      // setHasDropoff(false)
                      // setAWb("")
                      //                 }

                      if (generalDetailsExpress.dropoff_is_allowed === 1) {
                        //   toast.success("This account is allowed to drop-off.")
                      }
                      if (generalDetailsExpress.dropoff_is_allowed === 0) {
                        //   setShowUnallowedModal(true)
                        setDropoff(false)
                        setHasDropoff(false)
                        // setAWb("")
                      }
                    }}
                  />
                </div>
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
                {/* <InputError
                isValid={isError.payor}
                message={"This field is required*"}
              /> */}
              </div>
            </div>

            <hr />
            <div className="row justify-content-center">
              <div className="col-sm color-pink text-center mb-2">
                <h5>SHIPPER DETAILS</h5>
              </div>
            </div>
            <div
              className={
                hasResultShipper
                  ? "row justify-content-center"
                  : "row mb-3 mt-2 justify-content-center"
              }
            >
              <div className="col-sm-10">
                <div className=" input-group form-group">
                  <input
                    type="text"
                    className="form-control search-input"
                    aria-label="Search"
                    placeholder="Search Shipper"
                    value={searchInputShipper}
                    onChange={(e) => setSearchInputShipper(e.target.value)}
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text search-icon"
                      id="basic-addon1"
                    >
                      {searchingShipper ? (
                        <ReactLoading
                          className="search-icon loader"
                          type="balls"
                          color="#EC0B8C"
                          height={24}
                          width={25}
                        />
                      ) : (
                        <img
                          src={search}
                          alt="search"
                          className="search-icon"
                          // onClick={handleSearchShipper}
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {hasResultShipper && (
              <div className="row search-container express">
                <div className="col-sm-10">
                  {resultsShipper.map((data) => (
                    <div className="input-group form-group ">
                      <input
                        type="text"
                        readOnly
                        id="search-result-input"
                        className="form-control search-results"
                        aria-label="Search"
                        placeholder="Search"
                        value={data.name}
                        name={data.id}
                        //   onClick={() => handleResultShipperClick(data)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                    //   onChange={handleDetailChange}
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
                    //   onChange={handleDetailChange}
                  />
                </span>
                {/* <InputError
            isValid={isError.shipper_name}
            message={"This field is required*"}
          /> */}
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
                    //   onChange={handleDetailChange}
                  />
                </span>
                {/* <InputError
                isValid={isError.shipper_name}
                message={"This field is required*"}
              /> */}
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
                    //   onChange={handleShipperProvinceChange}
                    //   onInputChange={handleShipperProvinceInputChange}
                    options={shipperProvince}
                    placeholder="Province"
                    selected={selectedShipperProvince}
                  />
                </span>
                {/* <InputError
                isValid={isError.shipper_province}
                message={"This field is required*"}
              /> */}
                {/* <span className="input-group input-group-sm">
            <input
            autoComplete="new-password"
            list="autocompleteOff"
              name="shipper_province"
              value={generalDetailsExpress.shipper_province}
              type="text"
              className="form-control input-font-sm"
              aria-label="ecust-acct"
              aria-describedby="basic-addon1"
              placeholder="Province"
              onChange={(e) => fetchAreas(e, "shipper")}
            />
          </span> */}
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
                    //   onChange={handleShipperCityChange}
                    //   onInputChange={handleShipperCityInputChange}
                    options={shipperCities}
                    placeholder="City/Municipality"
                    selected={selectedShipperCity}
                  />
                </span>
                {/* <InputError
                isValid={isError.shipper_city}
                message={"This field is required*"}
              /> */}
                {/* <span className="input-group input-group-sm">
            <input
            autoComplete="new-password"
            list="autocompleteOff"
              name="shipper_city"
              value={generalDetailsExpress.shipper_city}
              type="text"
              className="form-control input-font-sm"
              aria-label="ecust-acct"
              aria-describedby="basic-addon1"
              placeholder="City"
              onChange={(e) => fetchAreas(e, "shipper")}
              // onChange={handleDetailChange}
            />
          </span> */}
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
                    //   onChange={handleShipperBrgyChange}
                    options={shipperBrgy}
                    placeholder="Barangay"
                    selected={selectedShipperBrgy}
                  />
                </span>
                {/* <InputError
                isValid={isError.shipper_brgy}
                message={"This field is required*"}
              /> */}
                {/* <span className="input-group input-group-sm">
            <input
            autoComplete="new-password"
            list="autocompleteOff"
              name="shipper_brgy"
              value={generalDetailsExpress.shipper_brgy}
              type="text"
              className="form-control input-font-sm"
              aria-label="ecust-acct"
              aria-describedby="basic-addon1"
              placeholder="Barangay"
              onChange={(e) => fetchAreas(e, "shipper")}
              // onChange={handleDetailChange}
            />
          </span> */}
              </div>
              <div className="col-sm-3">
                <span className="input-group input-group-sm">
                  {/* <span>
              <Typeahead
              inputProps={{ autoComplete: "ofnew-password}, list:"autoComplete"}
                size="sm"
                className="pt-0"
                id="basic-typeahead-single"
                labelKey="name"
                onChange={setSelectedOutlet}
                options={outlets}
                placeholder="Choose outlet"
                selected={selectedOutlet}
              />
            </span> */}

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
                {/* <InputError
                isValid={isError.shipper_postal}
                message={"This field is required*"}
              /> */}
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
                    //   onChange={handleDetailChange}
                    name="shipper_address"
                    value={generalDetailsExpress.shipper_address}
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                  />
                </span>
                {/* <InputError
                isValid={isError.shipper_address}
                message={"This field is required*"}
              /> */}
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
                    //   onChange={handleDetailChange}
                    name="shipper_contact"
                    value={generalDetailsExpress.shipper_contact}
                    type="number"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    maxLength={11}
                  />
                </span>
                {/* <InputError
                isValid={isError.shipper_contact}
                message={"This field is required*"}
              />
              <InputError
                isValid={isError.shipper_contact_error}
                message={
                  "Contact Number must start with 0 and contain 10 or 11 digits*"
                }
              /> */}
              </div>
            </div>

            {/* Origin/Area Code of shipper is of Outlet. */}

            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">
                Origin/Area Code<label className="badge">{` *`}</label>
              </div>
              <div className="col-3">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    name="shipper_origin"
                    //   value={getBranchPort()}
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
                    //   onChange={handleDetailChange}
                    name="shipper_area_code"
                    //   value={getBranchAreaCode()}
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    disabled
                  />
                </span>
              </div>
            </div>

            <div className="row mt-2 justify-content-center">
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
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-4"></div>
              <div className="col-sm-8">
                {/* <InputError
                isValid={isError.reference}
                message={"This field is required*"}
              /> */}
              </div>
            </div>
            <div className="row mt-2 mb-3 justify-content-center">
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
                {/* <InputError
                isValid={isError.express_attachments}
                message={"This field is required*"}
              /> */}
              </div>
            </div>
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

            <div
              className={
                hasResultConsignee
                  ? "row justify-content-center"
                  : "row mb-3 mt-2 justify-content-center"
              }
            >
              <div className="col-sm-10">
                <div className=" input-group form-group">
                  <input
                    type="text"
                    className="form-control search-input"
                    aria-label="Search"
                    placeholder="Search Consignee"
                    value={searchInputConsignee}
                    onChange={(e) => setSearchInputConsignee(e.target.value)}
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text search-icon"
                      id="basic-addon1"
                    >
                      {searchingConsignee ? (
                        <ReactLoading
                          className="search-icon loader"
                          type="balls"
                          color="#EC0B8C"
                          height={24}
                          width={25}
                        />
                      ) : (
                        <img
                          src={search}
                          alt="search"
                          className="search-icon"
                          // onClick={handleSearchConsignee}
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {hasResultConsignee && (
              <div className="row search-container express">
                <div className="col-sm-10">
                  {resultsConsignee.map((data) => (
                    <div className="input-group form-group ">
                      <input
                        type="text"
                        readOnly
                        id="search-result-input"
                        className="form-control search-results"
                        aria-label="Search"
                        placeholder="Search"
                        value={data.name}
                        name={data.id}
                        //   onClick={() => handleResultConsigneeClick(data)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="row mt-2 justify-content-center">
              <div className="col-sm-4">Pickup?</div>
              <div className="col-sm-6">
                <div className="form-check form-check-inline">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    className="form-check-input"
                    type="checkbox"
                    id="pickup"
                    name="pickup"
                    defaultChecked={pickup}
                    onChange={(e) => {
                      setPickup(e.target.checked)
                      if (e.target.checked === false) {
                        setSelectedOutlet([])
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            {pickup && (
              <div className="row justify-content-center">
                <div className="col-sm-4 pt-2">2GO Outlet</div>
                <div className="col-sm-6">
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
                      onChange={setSelectedOutlet}
                      options={pickupOutlets}
                      placeholder="Choose outlet"
                      selected={selectedOutlet}
                    />
                  </span>
                  {/* <InputError
                  isValid={isError.pickup_outlet}
                  message={"This field is required*"}
                /> */}
                </div>
              </div>
            )}
            <div className="row mt-4 justify-content-center">
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
                    //   onChange={handleDetailChange}
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
                    //   onChange={handleDetailChange}
                  />
                </span>
                {/* <InputError
            isValid={isError.shipper_name}
            message={"This field is required*"}
          /> */}
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
                    //   onChange={handleDetailChange}
                    name="consignee_name"
                    value={generalDetailsExpress.consignee_name}
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                  />
                </span>
                {/* <InputError
                isValid={isError.consignee_name}
                message={"This field is required*"}
              /> */}
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
                    //   onChange={handleConsigneeProvinceChange}
                    //   onInputChange={handleConsigneeProvinceInputChange}
                    options={consigneeProvince}
                    placeholder="Province"
                    selected={selectedConsigneeProvince}
                  />
                </span>
                {/* <InputError
                isValid={isError.consignee_province}
                message={"This field is required*"}
              /> */}
                {/* <input
          autoComplete="new-password"
          list="autocompleteOff"
              name="consignee_province"
              value={generalDetailsExpress.consignee_province}
              type="text"
              className="form-control input-font-sm"
              aria-label="ecust-acct"
              aria-describedby="basic-addon1"
              placeholder="Province"
              onChange={(e) => fetchAreas(e, "consignee")}
            />
          </span> */}
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
                    //   onChange={handleConsigneeCityChange}
                    //   onInputChange={handleConsigneeCityInputChange}
                    options={consigneeCities}
                    placeholder="City/Municipality"
                    selected={selectedConsigneeCity}
                  />
                </span>
                {/* <InputError
                isValid={isError.consignee_city}
                message={"This field is required*"}
              /> */}
                {/* <span className="input-group input-group-sm">
            <input
            autoComplete="new-password"
            list="autocompleteOff"
              name="consignee_city"
              value={generalDetailsExpress.consignee_city}
              type="text"
              className="form-control input-font-sm"
              aria-label="ecust-acct"
              aria-describedby="basic-addon1"
              placeholder="City"
              onChange={(e) => fetchAreas(e, "consignee")}
            />
          </span> */}
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
                    // open={open}
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
                    //   onChange={handleConsigneeBrgyChange}
                    options={consigneeBrgy}
                    placeholder="Barangay"
                    selected={selectedConsigneeBrgy}
                  />
                </span>
                {/* <InputError
                isValid={isError.consignee_brgy}
                message={"This field is required*"}
              /> */}
                {/* <span className="input-group input-group-sm">
            <input
            autoComplete="new-password"
            list="autocompleteOff"
              name="consignee_brgy"
              value={generalDetailsExpress.consignee_brgy}
              type="text"
              className="form-control input-font-sm"
              aria-label="ecust-acct"
              aria-describedby="basic-addon1"
              placeholder="Barangay"
              onChange={(e) => fetchAreas(e, "consignee")}
            />
          </span> */}
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
                {/* <InputError
                isValid={isError.consignee_postal}
                message={"This field is required*"}
              /> */}
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
                    //   onChange={handleDetailChange}
                    name="consignee_address"
                    value={generalDetailsExpress.consignee_address}
                    type="text"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                  />
                </span>
                {/* <InputError
                isValid={isError.consignee_address}
                message={"This field is required*"}
              /> */}
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
                    //   onChange={handleDetailChange}
                    name="consignee_contact"
                    value={generalDetailsExpress.consignee_contact}
                    type="number"
                    className="form-control input-font-sm"
                    aria-label="ecust-acct"
                    aria-describedby="basic-addon1"
                    maxLength={11}
                  />
                </span>
                {/* <InputError
                isValid={isError.consignee_contact}
                message={"This field is required*"}
              />
              <InputError
                isValid={isError.consignee_contact_error}
                message={
                  "Contact Number must start with 0 and contain 10 or 11 digits*"
                }
              /> */}
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
                    // onChange={handleDetailChange}
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
                {/* <InputError
                isValid={isError.consignee_origin}
                message={"This field is required*"}
              /> */}
              </div>
              <div className="col-3">
                <span className="input-group input-group-sm">
                  <input
                    autoComplete="new-password"
                    list="autocompleteOff"
                    // onChange={handleDetailChange}
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
                {/* <InputError
                isValid={isError.consignee_area_code}
                message={"This field is required*"}
              /> */}
              </div>
            </div>

            <div className="row mb-4 mt-5">
              <div className="col-sm-2">
                <button
                  className="btn-back btn-rad"
                  onClick={() => {
                    if (expressType === "NEW") {
                      setTimeout(() => {
                        //   navigateto("/dashboard")
                        //   refreshPage()
                      }, 1000)
                    } else {
                      // navigateto(-1)
                    }
                  }}
                >
                  Back{" "}
                </button>
              </div>
              <div className="col-sm"></div>
              {/* <div className="col">
                <button className="btn-clear btn-rad" onClick={handleClear}> Clear All </button>
            </div> */}
              <div className="col-sm-2">
                <button
                  type="submit"
                  className="btn-next btn-rad"
                  // onClick={handleNext}
                >
                  {" "}
                  Next{" "}
                </button>
              </div>
            </div>
            <Modal
              // show={openOsa}
              // onHide={() => setOpenOsa(false)}
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
                    {/* <img src={erroricon} width={100} height={100} /> */}
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
                      // onClick={() => setOpenOsa(false)}
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
              // show={openOtd}
              // onHide={() => setOpenOsa(false)}
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
                    {/* <img src={caution} width={100} height={100} /> */}
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
                        //   setOpenOtd(false)
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
                        //   setOpenOtd(false)
                        navigation.next()
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
            {/* Not allowed to dropoff prompt */}
            <Modal
              // show={showUnallowedModal}
              // onHide={() => setShowUnallowedModal(false)}
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
                    {/* <img src={erroricon} width={100} height={100} /> */}
                  </div>
                  <div
                    className="col-sm-8 align-left pt-2 fw-bold"
                    style={{ textAlign: "center" }}
                  >
                    <span style={{ textAlign: "left", fontSize: "large" }}>
                      Selected account is not allowed to drop-off.
                    </span>
                    <br />
                    <Button
                      size="sm"
                      style={{
                        textAlign: "center",
                        background: "var(--cancel-btn)",
                        border: "none",
                      }}
                      // onClick={() => setShowUnallowedModal(false)}
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
              // show={showExceed}
              // onHide={() => setShowExceed(false)}
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
                    {/* <img src={erroricon} width={100} height={100} /> */}
                  </div>
                  <div
                    className="col-sm-8 align-left pt-4 mt-2 fw-bold"
                    style={{ textAlign: "center" }}
                  >
                    <span style={{ textAlign: "left", fontSize: "large" }}>
                      Please select image not exceeding 4MB!
                    </span>
                    <br />
                    <Button
                      size="sm"
                      style={{
                        textAlign: "center",
                        background: "var(--cancel-btn)",
                        border: "none",
                      }}
                      // onClick={() => setShowExceed(false)}
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
              // show={showMaximum}
              // onHide={() => setShowMaximum(false)}
              size="md"
              centered
            >
              {/* <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header> */}
              <Modal.Body className="pt-5">
                <div className="row justify-content-center">
                  <div
                    className="col-sm-4 align-center"
                    style={{ textAlignLast: "end" }}
                  >
                    {/* <img src={erroricon} width={100} height={100} /> */}
                  </div>
                  <div
                    className="col-sm-8 align-left pt-3 fw-bold"
                    style={{ textAlign: "center" }}
                  >
                    <span style={{ textAlign: "left", fontSize: "large" }}>
                      You can only attach a maximum of 3 images!
                    </span>
                    <br />
                    <Button
                      size="sm"
                      style={{
                        textAlign: "center",
                        background: "var(--cancel-btn)",
                        border: "none",
                      }}
                      // onClick={() => setShowMaximum(false)}
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
          </div>
        </div>
      </div>
    </div>
  )
}
