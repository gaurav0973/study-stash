import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import useAuthUser from "./hooks/useAuthUser";
import LoginPage from "./pages/LoginPage";


function App() {

  const {isLoading , isError , authUser} = useAuthUser() ;
  const isAuthenticated = Boolean(authUser);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignupPage /> : <LandingPage/> 
          }
        />
        <Route
          path="/signin"
          element={<LoginPage /> } />

      </Routes>
    </>
  );
}

export default App;