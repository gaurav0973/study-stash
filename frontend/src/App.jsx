import { BrowserRouter, Routes, Route} from "react-router-dom"
import Body from "./Body"

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<div>Login page</div>}/>
        <Route path="/signup" element={<div>Signup page</div>}/>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<div>Landing page</div>}/>
          <Route path="/feeds" element={<div>Feeds page</div>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
export default App