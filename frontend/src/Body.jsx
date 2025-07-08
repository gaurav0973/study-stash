import { Outlet } from "react-router-dom"

function Body() {
  return (
    <div>
        <h1>Navbar</h1>
        <Outlet />
        <p>Footer</p>
    </div>
  )
}
export default Body
