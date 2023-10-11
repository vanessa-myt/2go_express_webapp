import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { formatPrice } from "../../Helpers/Utils/Common"

import ReactLoading from "react-loading"
//image
import { useNavigate } from "react-router-dom"
import { Accordion } from "react-bootstrap"

import InputError from "../../Components/InputError/InputError"
import Navbar from "../../Components/Navbar/Navbar"

function Summary({
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
  dropoffDetails,
  setDropoffDetails,
  selectedCommodity,
  setSelectedCommodity,
}) {
  const headers = [
    { label: "Description", key: "description" },
    { label: "Qty", key: "qty" },
    { label: "Pkg Code", key: "pkg_code" },
    { label: "Pkg item", key: "pkg_item" },
    { label: "Weight (kg)", key: "weight" },
    { label: "Length (kg)", key: "length" },
    { label: "Width (kg)", key: "width" },
    { label: "Height (kg)", key: "height" },
    { label: "Equiv Wt (kg)", key: "equiv_wt" },
    { label: "Dec Val (kg)", key: "dec_val" },
    { label: "Comm Code (kg)", key: "comm_code" },
  ]
  const [isClicked, setIsClicked] = useState(false)
  const [data, setData] = useState([])
  const navigateto = useNavigate()
  const [agree, setAgree] = useState(true)

  // const [breakdown, setBreakdown] = useState([
  //   {
  //     name: "Weight Charge",
  //     value: 500,
  //   },
  //   { name: "Freight Charge", value: 0 },
  //   { name: "General Rate Increase", value: 0 },
  //   { name: "Afra Charge", value: 0 },
  //   { name: "Handling Rate", value: 0 },
  //   { name: "Orig Wharfage Charge", value: 0 },
  //   { name: "Destination Wharfage Charge", value: 0 },
  //   { name: "Afra2 Charge", value: 0 },
  //   { name: "Afra3 Charge", value: 0 },
  //   { name: "Destination Handling", value: 0 },
  //   { name: "Advalorem Charge", value: 0 },
  //   { name: "Valuation", value: 50 },
  //   { name: "Cartage Fee", value: 0 },
  //   { name: "Pickup Charge", value: 0 },
  //   { name: "Delivery Charge", value: 0 },
  //   { name: "Perishable Fee", value: 0 },
  //   { name: "Dangerous Goods Fee", value: 0 },
  //   { name: "Document Return Fee", value: 0 },
  //   { name: "Break Bulk Fee", value: 0 },
  //   { name: "Out of Gauge Fee", value: 0 },
  //   { name: "Other Commodity Fee", value: 0 },
  //   { name: "Packaging Fee", value: 0 },
  //   { name: "Lashing Fee", value: 0 },
  //   { name: "Freight Collect Charge", value: 0 },
  //   { name: "Awb Issuance Fee", value: 0 },
  //   { name: "Alteration Fee", value: 0 },
  //   { name: "Ground Handling Fee", value: 0 },
  //   { name: "Fuel Bunker Surcharge", value: 0 },
  //   { name: "Network Charge", value: 0 },
  //   { name: "Storage Fee", value: 0 },
  //   { name: "Otd Fee", value: 0 },
  //   { name: "Documentary Stamp", value: 20 },
  //   { name: "Vat", value: 0 },
  //   { name: "Fuel Increase", value: 30 },
  //   { name: "Crating Charge", value: 0 },
  //   { name: "Insurance Surcharge", value: 0 },
  //   { name: "Osa Fee", value: 0 },
  //   { name: "Vat Storage Fee", value: 0 },
  // ]);

  const handleSelectChange = (e) => {
    if (e.target.checked) {
      setAgree(true)
    } else {
      setAgree(false)
    }
  }

  const handleNext = () => {
    if (agree) {
      var paymode = ""

      if (generalDetailsExpress.account_number === "WALK-IN") {
        if (generalDetailsExpress.payor === "shipper") {
          paymode = "new-shipper"
        }
        if (generalDetailsExpress.payor === "consignee") {
          paymode = "new-consignee"
        }
      } else {
        if (generalDetailsExpress.payment_term === "credit") {
          if (generalDetailsExpress.payor === "shipper") {
            paymode = "collect-shipper"
          }
          if (generalDetailsExpress.payor === "consignee") {
            paymode = "collect-consignee"
          }
        } else {
          paymode = "new-shipper"
        }
      }

      var final_package_codes = []
      documentDetails.map((data) => {
        final_package_codes.push(
          packageCodes[parseInt(data.package_code)]["id"]
        )
      })

      setType("express")

      setGeneralDetails({
        service_id: 2,
        detail_type: "express",
        name: "2GO Express",
        destination_system: generalDetailsExpress.destination_system,
        transaction_type: generalDetailsExpress.transaction_type,
        packaging:
          generalDetailsExpress.transaction_type === "document"
            ? "2go_packaging"
            : generalDetailsExpress.packaging,
        package_codes: final_package_codes,
      })
      setTransactionDetails({
        base_rate: breakdown.filter(
          (data) => data.name.toUpperCase() === "WEIGHT CHARGE"
        )[0].amount,
        vat: breakdown.filter((data) => data.name.toUpperCase() === "VAT")[0]
          .amount,

        breakdown: breakdown.filter(
          (data) =>
            data.name.toUpperCase() !== "VAT" &&
            data.name.toUpperCase() !== "WEIGHT CHARGE"
        ),
        paymode: paymode,
        transaction_no: transactionID,
      })
      var total_qty = documentDetails
        .map((data) => parseFloat(data.quantity))
        .reduce((a, b) => a + b, 0)

      if (expressType === "NEW") {
        navigation.go("payment")
      } else {
        if (parseInt(total_qty) > 1) {
          navigation.next()
        } else {
          // addDropoffSingle()/
        }
      }
    }
  }

  function handleBack() {
    var total_qty = documentDetails
      .map((data) => parseFloat(data.quantity))
      .reduce((a, b) => a + b, 0)

    // if (
    //   (generalDetailsExpress.transaction_type === "parcel" ||
    //     generalDetailsExpress.transaction_type === "cargo") &&
    //   total_qty > 1
    // ) {
    navigation.previous()
    // } else {

    // }
  }
  function assignDetails() {
    var express_total = breakdown
      .map((data) => parseFloat(data.amount))
      .reduce((a, b) => a + b, 0)

    setDropoffDetails({
      ...dropoffDetails,
      express_total: express_total,
      transaction_fee:
        dropoffDetails.rate_type === "percentage"
          ? parseFloat(express_total) *
            parseFloat(dropoffDetails.transaction_fee)
          : dropoffDetails.transaction_fee,
      commission_fee:
        dropoffDetails.rate_type === "percentage"
          ? parseFloat(express_total) *
            parseFloat(dropoffDetails.commission_fee)
          : dropoffDetails.commission_fee,
      length: documentDetails[0].length,
      width: documentDetails[0].width,
      height: documentDetails[0].height,
      tracking_number: generalDetailsExpress.awb,
      package_details: documentDetails[0].description,
      total_parcel: documentDetails
        .map((data) => parseFloat(data.quantity))
        .reduce((a, b) => a + b, 0),
    })
  }
  useEffect(() => {
    if (expressType !== "NEW") {
      assignDetails()
    }
  }, [])
  return (
    <div>
      <ToastContainer />
      <Navbar />
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

          <div style={{ display: "flex", flexDirection: "row" }}>
            <ToastContainer />
            <div className="container mb-5">
              <div className="form-container">
                <div className="row justify-content-start">
                  <div className="col-sm color-pink text-left mb-2">
                    <h2>SUMMARY</h2>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-sm-6">
                    <div className="col-sm-12">
                      <p className="input-title">Shipment Details</p>
                    </div>
                    <div className="row mt-2">
                      <div className="col-sm-5">
                        <p className="input-subtitle">Mode of Shipment</p>
                      </div>
                      <div className="col-sm-6">
                        <span className="text span-summary">
                          {generalDetailsExpress.destination_system ===
                            "QAIR" && "Expedited"}
                          {generalDetailsExpress.destination_system ===
                            "ZIP-R" && "Regular"}
                          {generalDetailsExpress.destination_system ===
                            "ZIP-S" && "Shipside"}
                        </span>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-sm-5">
                        <p className="input-subtitle">Detail Type</p>
                      </div>
                      <div className="col-sm-6">
                        <span className="text span-summary">
                          {generalDetailsExpress.transaction_type}
                        </span>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-sm-5">
                        <p className="input-subtitle">Service Type</p>
                      </div>
                      <div className="col-sm-6">
                        <span className="text span-summary">
                          {
                            serviceTypes.filter(
                              (data) =>
                                data.value ===
                                generalDetailsExpress.service_type
                            )[0]?.label
                          }
                          {/* {generalDetailsExpress.service_type} */}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="col-sm-12">
                      <p className="input-title">Account Details</p>
                    </div>

                    <div className="row mt-2">
                      <div className="col-sm-5">
                        <p className="input-subtitle">Walk-in Customer</p>
                      </div>
                      <div className="col-sm-6">
                        <span className="text span-summary">
                          {generalDetailsExpress.account_number === "WALK-IN"
                            ? "YES"
                            : "NO"}
                        </span>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-sm-5">
                        <p className="input-subtitle">Account Number</p>
                      </div>
                      <div className="col-sm-6">
                        <span className="text span-summary">
                          {generalDetailsExpress.account_number}
                        </span>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-sm-5">
                        <p className="input-subtitle">Who will Pay</p>
                      </div>
                      <div className="col-sm-6">
                        <span className="text span-summary">
                          {generalDetailsExpress.payor}
                        </span>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-sm-5">
                        <p className="input-subtitle">Account Name</p>
                      </div>
                      <div className="col-sm-6">
                        <span className="text span-summary">
                          {generalDetailsExpress.account_name}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-sm-6"></div>

            <div className="row mt-2">
            
            </div> */}
                  {/* <hr /> */}
                  <div className="row">
                    <div className="col-sm-6">
                      {/* SHIPPER DETAILS */}
                      <div className="col-sm-12">
                        <p className="input-title">Shipper Details</p>
                      </div>
                      <div className="col-sm-6"></div>

                      <div className="row mt-2">
                        <div className="col-sm-5">
                          <p className="input-subtitle">Name</p>
                        </div>
                        <div className="col-sm-6">
                          <span className="text span-summary">
                            {generalDetailsExpress.shipper_name}
                          </span>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-sm-5">
                          <p className="input-subtitle">Address</p>
                        </div>
                        <div className="col-sm-6">
                          <span className="text span-summary">
                            {generalDetailsExpress.shipper_address},<br />
                            BRGY {generalDetailsExpress.shipper_brgy},{" "}
                            {generalDetailsExpress.shipper_city}, <br />
                            {generalDetailsExpress.shipper_province}{" "}
                            {generalDetailsExpress.shipper_postal}
                          </span>
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-sm-5">
                          <p className="input-subtitle">Contact Number</p>
                        </div>
                        <div className="col-sm-6">
                          <span className="text span-summary">
                            {generalDetailsExpress.shipper_contact}
                          </span>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-sm-5">
                          <p className="input-subtitle">Origin/Area Code</p>
                        </div>
                        <div className="col-sm-6">
                          <span className="text span-summary">
                            {generalDetailsExpress.shipper_origin} -{" "}
                            {generalDetailsExpress.shipper_area_code}
                          </span>
                        </div>
                      </div>
                      {/* <div className="row mt-2">
                  <div className="col-sm-5">
                    <p className="input-subtitle">EWT</p>
                  </div>
                  <div className="col-sm-6">
                    <span className="text span-summary">2%</span>
                  </div>
                </div> */}
                      {/* <div className="row mt-2">
                  <div className="col-sm-5">
                    <p className="input-subtitle">EWT Photo</p>
                  </div>
                  <div className="col-sm-6">
                    <span className="text span-summary">photo.png</span>
                  </div>
                </div> */}
                    </div>
                    <div className="col-sm-6">
                      {/* CONSIGNEE DETAILS */}
                      <div className="col-sm-12">
                        <p className="input-title">Consignee Details</p>
                      </div>
                      <div className="col-sm-6"></div>

                      <div className="row mt-2">
                        <div className="col-sm-5">
                          <p className="input-subtitle">Name</p>
                        </div>
                        <div className="col-sm-6">
                          <span className="text span-summary">
                            {generalDetailsExpress.consignee_name}
                          </span>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-sm-5">
                          <p className="input-subtitle">Address</p>
                        </div>
                        <div className="col-sm-6">
                          <span className="text span-summary">
                            {generalDetailsExpress.consignee_address},<br />
                            BRGY {generalDetailsExpress.consignee_brgy},{" "}
                            {generalDetailsExpress.consignee_city}, <br />
                            {generalDetailsExpress.consignee_province}{" "}
                            {generalDetailsExpress.consignee_postal}
                          </span>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-sm-5">
                          <p className="input-subtitle">Contact Number</p>
                        </div>
                        <div className="col-sm-6">
                          <span className="text span-summary">
                            {generalDetailsExpress.consignee_contact}
                          </span>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-sm-5">
                          <p className="input-subtitle">
                            Destination/Area Code
                          </p>
                        </div>
                        <div className="col-sm-6">
                          <span className="text span-summary">
                            {generalDetailsExpress.consignee_origin} -{" "}
                            {generalDetailsExpress.consignee_area_code}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <p className="input-title">Packages</p>
                  </div>

                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-sm-5">
                          <p className="input-subtitle">Package Type</p>
                        </div>
                        <div className="col-sm-6">
                          <span className="text span-summary">
                            {generalDetailsExpress.packaging === "2go_packaging"
                              ? "2GO Packaging"
                              : "Own Packaging"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-sm-5">
                          <p className="input-subtitle">Total Weight</p>
                        </div>
                        <div className="col-sm-6">
                          <span className="text span-summary">
                            {generalDetailsExpress.total_package_weight}{" "}
                            {generalDetailsExpress.destination_system ===
                              "ZIP-R" ||
                            generalDetailsExpress.destination_system === "ZIP-S"
                              ? "CBM"
                              : "KG"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-2 mb-3">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-sm-5">
                          <p className="input-subtitle">
                            Total Transaction Declared Value
                          </p>
                        </div>
                        <div className="col-sm-6">
                          <span className="text span-summary">
                            PHP{" "}
                            {formatPrice(
                              parseFloat(generalDetailsExpress.declared_value)
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-sm-5">
                          <p className="input-subtitle">
                            Total Transaction COD Amount
                          </p>
                        </div>
                        <div className="col-sm-6">
                          <span className="text span-summary">
                            PHP{" "}
                            {formatPrice(
                              parseFloat(generalDetailsExpress.cod_amount)
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Accordion defaultActiveKey="0" flush>
                    {documentDetails?.map((data, key) => {
                      return (
                        <Accordion.Item eventKey={key + 1}>
                          <Accordion.Header>Package {key + 1}</Accordion.Header>
                          <Accordion.Body>
                            <div className="row mt-0 mb-3">
                              <div className="col-sm-12 mt-0">
                                <p className="input-title">Package Details</p>
                              </div>
                              <div className="col-sm-6">
                                <div className="col-sm-6"></div>
                                <div className="row mt-2">
                                  <div className="col-sm-5">
                                    <p className="input-subtitle">
                                      Package Code
                                    </p>
                                  </div>
                                  <div className="col-sm-6">
                                    <span className="text span-summary">
                                      {
                                        "hatdog"
                                        // packageCodes[parseInt(data.package_code)][
                                        //   "description"
                                        // ]
                                      }
                                    </span>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-sm-5">
                                    <p className="input-subtitle">
                                      Commodity Code
                                    </p>
                                  </div>
                                  <div className="col-sm-6">
                                    <span className="text span-summary">
                                      {data.commodity_code[0].name}
                                    </span>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-sm-5">
                                    <p className="input-subtitle">
                                      Total No. of Similar Packages
                                    </p>
                                  </div>
                                  <div className="col-sm-6">
                                    <span className="text span-summary">
                                      {data.quantity}
                                    </span>
                                  </div>
                                </div>
                                {/* {data.port_sticker_numbers.length > 0 &&
                            data.port_sticker_numbers.map((value, ind) => {
                              return (
                                <div className="row mt-2">
                                  <div className="col-sm-5">
                                    <p className="input-subtitle">
                                      Package {ind + 1} Serial No.
                                    </p>
                                  </div>
                                  <div className="col-sm-6">
                                    <span className="text span-summary">
                                      {value.serial}
                                    </span>
                                  </div>
                                </div>
                              );
                            })} */}
                              </div>
                              <div className="col-sm-6">
                                <div className="col-sm-6"></div>
                                <div className="row mt-2">
                                  <div className="col-sm-5">
                                    <p className="input-subtitle">
                                      Block Measurement
                                    </p>
                                  </div>
                                  <div className="col-sm-6">
                                    <span className="text span-summary">
                                      {data.block_measurement === "1"
                                        ? "YES"
                                        : "NO"}
                                    </span>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-sm-5">
                                    <p className="input-subtitle">Dimension</p>
                                  </div>
                                  <div className="col-sm-6">
                                    <span className="text span-summary">
                                      {data.length} X {data.width} X{" "}
                                      {data.height}
                                    </span>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-sm-5">
                                    <p className="input-subtitle">
                                      Actual Weight
                                    </p>
                                  </div>
                                  <div className="col-sm-6">
                                    <span className="text span-summary">
                                      {data.actual_weight}{" "}
                                      {generalDetailsExpress.destination_system ===
                                        "ZIP-R" ||
                                      generalDetailsExpress.destination_system ===
                                        "ZIP-S"
                                        ? "cbm"
                                        : "kg"}
                                    </span>
                                  </div>
                                </div>

                                <div className="row mt-2">
                                  <div className="col-sm-5">
                                    <p className="input-subtitle">
                                      Description
                                    </p>
                                  </div>
                                  <div className="col-sm-6">
                                    <span className="text span-summary">
                                      {data.description}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6"></div>
                          </Accordion.Body>
                        </Accordion.Item>
                      )
                    })}
                  </Accordion>

                  <div className="col-sm-2">
                    <p className="input-title">Payment Details</p>
                  </div>
                  <div className="row mt-2">
                    {breakdown.map((data) => {
                      return (
                        <div className="col-sm-6">
                          <div className="row mt-2">
                            <div className="col-sm-5">
                              <p className="input-subtitle">{data.name}</p>
                            </div>
                            <div className="col-sm-6">
                              <span className="text span-summary">
                                Php {formatPrice(parseFloat(data.amount))}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="col-sm-6"></div>
                  {/*            
            <div className="row mt-2">
              <div className="col-sm-5">
                <p className="input-subtitle">Export Declaration</p>
              </div>
              <div className="col-sm-6">
                <span className="text span-summary">Php 328.00</span>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-5">
                <p className="input-subtitle">Peak Surcharge</p>
              </div>
              <div className="col-sm-6">
                <span className="text span-summary">Php 328.00</span>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-5">
                <p className="input-subtitle">Custom Service Charge</p>
              </div>
              <div className="col-sm-6">
                <span className="text span-summary">Php 328.00</span>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-5">
                <p className="input-subtitle">Other Surcharges</p>
              </div>
              <div className="col-sm-6">
                <span className="text span-summary">Php 328.00</span>
              </div>
            </div> */}
                  <div className="row mt-2 mb-3">
                    <div className="col-sm-6">
                      <div className="row mt-2">
                        <div className="col-sm-5">
                          <h5 className="input-subtitle color-pink">
                            GRAND TOTAL
                          </h5>
                        </div>
                        <div className="col-sm-6">
                          <span className="text span-summary">
                            <h5>
                              PHP{" "}
                              {formatPrice(
                                breakdown
                                  .map((data) => parseFloat(data.amount))
                                  .reduce((a, b) => a + b, 0)
                              )}
                            </h5>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row justify-content-end mt-2 mb-5">
                    <span className="span-summary">
                      <div className="form-group">
                        <input
                          type="checkbox"
                          className="custom-control-inpu mr-10"
                          id="agreement"
                          name="agreement"
                          checked={agree}
                          onChange={handleSelectChange}
                        />
                        <label
                          className="custom-control-label agreement"
                          htmlFor="agreement"
                        >
                          I agree to the Privacy Policy and Terms of Agreement.
                        </label>
                        <InputError
                          isValid={!agree}
                          message={"Please tick the checkbox to proceed."}
                        />
                      </div>
                    </span>
                  </div>
                  <div className="row mt-4 justify-content-end">
                    <div className="col-sm-4"></div>

                    <div className="col-sm-2">
                      <button className="btn-back btn-rad" onClick={handleBack}>
                        {" "}
                        Back{" "}
                      </button>
                    </div>
                    <div className="col-sm-2">
                      {isClicked ? (
                        <button
                          type="submit"
                          className="btn-next btn-rad  proceed loader"
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
                          className="btn-next btn-rad"
                          type="submit"
                          onClick={handleNext}
                        >
                          {" "}
                          Next{" "}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary
