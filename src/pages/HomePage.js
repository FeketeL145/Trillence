import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import "mdb-ui-kit/css/mdb.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Search from "../Components/Search";
import AllSongs from "../Components/AllSongs";

import FooterMusicPlayer from "../Components/MusicPlayer/FooterMusicPlayer";
function HomePage() {
  return(
  <div className="w-100 h-100 hiddenscrollbar">
    <h1>Random zenék</h1>
    <AllSongs />




    <div className="footer bg-dark" style={{ height: "10vh", position: "fixed", bottom: "0", width: "100%" }}>
      <FooterMusicPlayer />
    </div>
    
  </div>
  )
  
}

export default HomePage;