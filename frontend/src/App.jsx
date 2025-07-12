import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import { LandingPage } from "./pages/common/LandingPage";
import { LoginPage } from "./pages/common/LoginPage";
import { SignupPage } from "./pages/common/SignupPage";
import { PublicRoute } from "./components/common/PublicRoute";
import { ProtectRoute } from "./components/common/ProtectRoute";
import AllNotes from "./pages/AllNotes";
import NotePreview from "./pages/NotePreview";
import UploadNote from "./pages/UploadNote";
import UserProfile from "./pages/user/UserProfile";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route path="/" element={<Body />}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/notes"
            element={
              <ProtectRoute>
                <AllNotes />
              </ProtectRoute>
            }
          />
          <Route
            path="/notes/:id"
            element={
              <ProtectRoute>
                <NotePreview />
              </ProtectRoute>
            }
          />
          <Route
            path="/upload-note"
            element={
              <ProtectRoute>
                <UploadNote />
              </ProtectRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectRoute>
                <UserProfile />
              </ProtectRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
