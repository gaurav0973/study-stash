import { BrowserRouter, Routes, Route} from "react-router-dom"
import Body from "./Body"
import { LandingPage } from "./pages/common/LandingPage"
import { LoginPage } from "./pages/common/LoginPage"
import { SignupPage } from "./pages/common/SignupPage"
import { PublicRoute } from "./components/common/PublicRoute"
import { ProtectRoute } from "./components/common/ProtectRoute"

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>}/>
        <Route path="/signup" element={<PublicRoute><SignupPage/></PublicRoute>}/>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/feeds" element={<ProtectRoute><div>Feeds page</div></ProtectRoute>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
export default App