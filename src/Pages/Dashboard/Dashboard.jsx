import Navbar from "../../Components/Navbar/Navbar"
import "./Dashboard.css"
import booking from "../../Assets/Images/Form/booking.png"
import packageimg from "../../Assets/Images/Form/package.png"
export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center p-5 mt-5">
          <div className="col-4 ">
            <div className="card-col text-center">
              <img src={booking} alt="booking" height={200} />
              <div className="purple-label mt-3 text-center">TRACK & TRACE</div>
            </div>
          </div>
          <div className="col-4">
            <div className="card-col text-center">
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
