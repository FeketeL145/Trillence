import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Routes,
  Route,
  Link,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

//Oldalak importálása
import HomePage from "./pages/HomePage.js";
import SearchPage from "./pages/SearchPage.js";
import Login from "./pages/Login.js";
import Logout from "./pages/Logout.js";
import SpotDL from "./pages/Spotdl.js";
import Register from "./pages/Register.js";
import PasswordForgot from "./pages/ForgotPassword.js";
import ResetPassword from "./pages/ResetPassword.js";
import MyProfile from "./pages/MyProfile.js";

import "./App.css";
import "./Components/MusicPlayer/AudioPlayer.js";
import AudioPlayer from "./Components/MusicPlayer/AudioPlayer.js";
import Sidebar from "./Components/Sidebar.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <div className="AppDisplayPage">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-out" element={<Logout />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/spotdl" element={<SpotDL />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<MyProfile/>} />
            <Route path="/PasswordForgot" element={<PasswordForgot />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

{
  /*
Notes:
- A reset passwordnek majd kell unique kulcs a linkhez
- A loginok/registereknél meg kell csinálni az authentikációt a backenddel összekötve
- Minden oldalt össze kell kötni a backenddel
- NAGYON NAGYON KELL A CODE CLEANUP
*/
}

export default App;
