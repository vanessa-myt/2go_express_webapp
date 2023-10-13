import { Timeline } from "antd"
import Navbar from "../../Components/Navbar/Navbar"
import { Input, Space } from "antd"
import { trackExpress } from "../../Helpers/ApiCalls/expressAPI"
import { useState } from "react"

const { Search } = Input

const onSearch = (value, _e, info) => console.log(info?.source, value)
export default function TimelineComponent() {
  const [ref_no, setRefNo] = useState("")
  async function track() {
    const response = await trackExpress(ref_no)
    console.log(response)
  }
  return (
    <div>
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
            <Timeline
              style={{ fontFamily: "var(--font-bold)" }}
              mode={"left"}
              items={[
                {
                  label: "2015-09-01",
                  children: "Create a services",
                },
                {
                  label: "2015-09-01 09:12:11",
                  children: "Solve initial network problems",
                },
                {
                  children: "Technical testing",
                },
                {
                  label: "2015-09-01 09:12:11",
                  children: "Network problems being solved",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
