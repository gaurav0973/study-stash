import { Outlet } from "react-router-dom"
import { Navbar } from "./components/common/Navbar"
import { Footer } from "./components/common/Footer"
import { useSelector } from "react-redux"

function Body() {
  return (
    <div>
        <Navbar/>
        <Outlet />
        <Footer/>
    </div>
  )
}
export default Body
