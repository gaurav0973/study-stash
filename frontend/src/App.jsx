import { BrowserRouter, Routes, Route} from "react-router-dom"
import Body from "./Body"
import { LandingPage } from "./pages/common/LandingPage"
import { LoginPage } from "./pages/common/LoginPage"
import { SignupPage } from "./pages/common/SignupPage"

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/feeds" element={<div>Feeds page</div>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
export default App