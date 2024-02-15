import { useEffect, useState } from "react";
import { BrowserRouter as Router, NavLink, Routes, Route, Link, useNavigationType, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

//Oldalak importálása
import HomePage from "./pages/HomePage";
import LocalSongs from "./pages/LocalSongs.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Settings from "./pages/Settings.js";
import PasswordForgot from "./pages/PasswordForgot.js";
import ResetPassword from "./pages/ResetPassword.js";


import './App.css';
import './Components/MusicPlayer/AudioPlayer.js';
import AudioPlayer from "./Components/MusicPlayer/AudioPlayer.js";



function App() {
  return (
      <Router>
      <div className="App">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={`/`} className="nav-link">
                <span className="nav-link">Trillence</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/playlists`} className="nav-link">
                <span className="nav-link">Playlists</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/local-songs`} className="nav-link">
                <span className="nav-link">Local songs</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/add-song`} className="nav-link">
                <span className="nav-link">Add new song</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li>
              <NavLink to={`/ResetPassword`} className="nav-link">
                <span className="nav-link">ResetPassword</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/settings`} className="nav-link">
                <span className="nav-link">Settings</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/sign-in`} className="nav-link">
                <span className="nav-link">Sign In</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/register`} className="nav-link">
                <span className="nav-link">Register</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/local-songs" element={<LocalSongs/>}/>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/PasswordForgot" element={<PasswordForgot />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
        </Routes>

      </div>
    </Router>
    
      
  );
}
/*

<Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="collapse navbar-collapse d-flex justify-content-start" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={`/`} className="nav-link">
                <span className="nav-link">Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={`/HomePage`} className="nav-link">
                <span className="nav-link">Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/`} className="nav-link">
                <span className="nav-link">Feed</span>
              </NavLink>
            </li>
            <li className="nav-item align-self-center" style={{width: "350px"}}>
              <input type="text" placeholder="Search" className="form-control search"/>
            </li>
            <li className="nav-item">
              <NavLink to={`/musicpage`} className="nav-link">
                <span className="nav-link">Local songs</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/`} className="nav-link">
                <span className="nav-link">Add new song</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={`/Login`} className="nav-link">
                <span className="nav-link">Login</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/Register`} className="nav-link">
                <span className="nav-link">Register</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/HomePage" element={<HomePage/>}/>
        <Route path="/musicPage" element={<MusicPage/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
      </Routes>
    </Router>

*/

export default App;
