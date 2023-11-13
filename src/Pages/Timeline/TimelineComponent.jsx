import { Timeline } from "antd"
import Navbar from "../../Components/Navbar/Navbar"
import { Input, Space } from "antd"
import { trackExpress } from "../../Helpers/ApiCalls/expressAPI"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import nodata from "../../Assets/Images/no-data.png"
const { Search } = Input

const dummy = {
  data: {
    0: {
      awb: "D9912921D",
      status_desc: "Our courier is attempting to deliver your shipment today",
      dlvy_no: "208857439",
      status_date: "Nov 13, 2023 07:53 AM",
      created_date: "2023-11-13 07:53:40",
      status: "D",
      location: "bulh",
      orig_port: "MNL",
      dest_port: "BUL",
      loc_desc: null,
      loc_port: null,
      received_by: "",
      status_title: "Out for Delivery ",
      status_display: true,
      box_class: "",
      text_class: "text-muted",
    },
    1: {
      awb: "D9912921D",
      status_desc: "Shipment arrived and inbounded at local hub ",
      dlvy_no: "208506847",
      status_date: "Nov 10, 2023 04:00 PM",
      created_date: "2023-11-10 16:01:00",
      status: "A",
      location: "BULH",
      orig_port: "MNL",
      dest_port: "BUL",
      loc_desc: null,
      loc_port: null,
      received_by: "",
      status_title: "Shipment Arrived at Sorting Facility",
      status_display: true,
      box_class: "",
      text_class: "text-muted",
    },
    2: {
      awb: "D9912921D",
      status_date: "Nov 08, 2023 06:10 PM",
      created_date: "2023-11-08 18:10:30",
      status: "UCN",
      status_desc:
        "With delivery attempt but unsuccessful due to Consignee is not known in the delivery address/area",
      received_by: null,
      location: "",
      orig_port: "",
      dest_port: "",
      loc_port: "",
      loc_desc: "",
      dlvy_no: "",
      status_title: "Delivery Unsuccessful -Unknown Consignee",
      status_display: true,
      box_class: "bg-warning text-dark",
      text_class: "text-dark",
    },
    3: {
      awb: "D9912921D",
      status_desc: "Our courier is attempting to deliver your shipment today",
      dlvy_no: "207888926",
      status_date: "Nov 07, 2023 10:41 AM",
      created_date: "2023-11-07 10:41:38",
      status: "D",
      location: "bulh",
      orig_port: "MNL",
      dest_port: "BUL",
      loc_desc: null,
      loc_port: null,
      received_by: "",
      status_title: "Out for Delivery ",
      status_display: true,
      box_class: "",
      text_class: "text-muted",
    },
    4: {
      awb: "D9912921D",
      status_desc: "Shipment arrived and inbounded at local hub ",
      dlvy_no: "207441657",
      status_date: "Nov 04, 2023 04:49 PM",
      created_date: "2023-11-04 16:49:57",
      status: "A",
      location: "MONOH",
      orig_port: "MNL",
      dest_port: "BUL",
      loc_desc: null,
      loc_port: null,
      received_by: "",
      status_title: "Shipment Arrived at Sorting Facility",
      status_display: true,
      box_class: "",
      text_class: "text-muted",
    },
    status: 200,
  },
}

export default function TimelineComponent() {
  const [ref_no, setRefNo] = useState("")

  const [details, setDetails] = useState([])
  delete dummy.data.status
  async function track() {
    // console.log("details", Object.entries(details))
    // let details_array = []
    // Object.entries(dummy.data).map((data) => {
    //   console.log("data", data[1])
    //   details_array.push({
    //     label: data[1].status_date,
    //     children: data[1].status_desc,
    //   })
    // })
    // console.log("array", details_array)
    // setDetails(details_array)
    const response = await trackExpress(ref_no)
    if (response.data) {
      let initial_response = response.data
      delete initial_response.status
      let details_array = []
      Object.entries(initial_response).map((data) => {
        details_array.push({
          label: data[1].status_date,
          children: data[1].status_desc,
        })
      })
      setDetails(details_array)
    } else {
      toast.error(response.error?.data.messages.error)
    }
  }

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="container">
        <h1 className="row mb-4 text-center header title mt-5 ml-5">
          TRACK AND TRACE
        </h1>
        <div className="row justify-content-center">
          <div className="col-5">
            <Search
              placeholder="Enter Tracking No."
              onChange={(e) => setRefNo(e.target.value)}
              onSearch={track}
              enterButton
            />
          </div>
          <div className="col-8 mt-5 timeline-div text-center">
            {details.length > 0 ? (
              <Timeline
                style={{ fontFamily: "var(--font-bold)" }}
                mode={"left"}
                items={details}
              />
            ) : (
              <img src={nodata} alt="no-data" width={200} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
