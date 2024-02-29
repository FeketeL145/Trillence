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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid bg-dark">
            {/*ELVILEG IDE KELL RAKNI AZ IKONT, HA MEGFELELŐ MÉRETŰ, AMÚGY MEG SZÉTBASSZA*/}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i className="bi bi-list"></i>
            </button>
            <div className="collapse navbar-collapse bg-dark" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to={`/`} className="nav-link">
                    <span className="nav-link">Home</span>
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

                <li>
                  <NavLink to={`/ResetPassword`} className="nav-link">
                    <span className="nav-link">Reset Password</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/settings`} className="nav-link">
                    <span className="nav-link">Settings</span>
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
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

export default App;





















/*
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠔⡹⠅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠞⠁⢠⠁⠀⠀⢀⣄⡠⠤⠄⠐⠠⠤⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡏⠙⠒⠲⠤⠄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⡜⠀⠀⣸⠀⢀⠔⠋⠀⠀⢀⡠⠖⠉⠀⠀⣂⡀⡤⠴⠖⠋⠉⡆⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⠒⠃⠀⠀⠠⠤⠕⠠⣀⠉⠒⠴⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣾⡅⡇⠀⠀⢻⢠⠎⠀⠀⢀⠔⠁⣀⡤⠤⠒⠋⢁⠊⢀⡀⢀⡀⠀⠓⢤⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠘⡄⠀⠀⠀⠀⡅⠌⡐⠄⡉⠂⢄⡀⠙⠢⢄⢀⣀⠤⠤⠐⠚⠛⠓⠒⠛⡀⠀⢸⠚⠀⢀⣔⠥⠒⠉⠀⢀⠄⠚⡉⠄⢂⠆⠰⡘⠀⠀⠀⡜⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢰⠁⠀⠀⠀⠀⠘⣢⠁⠜⠠⡉⠤⢈⠤⢄⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠢⡀⢠⠀⠂⠀⢀⡀⠀⠴⠤⣬⣔⡐⠌⢂⠌⡑⠡⠐⣠⠀⢻⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠩⣁⠂⠔⡈⠌⡡⠐⠌⡂⠔⢂⡁⠦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠂⠈⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠲⢄⢂⠁⢦⠃⠀⠸⡂⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢺⠀⠀⠀⠀⠈⠲⡈⠤⠑⡠⠉⡔⠈⡔⢂⠰⢠⠝⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⣀⠀⠀⠀⠀⠀⠈⠂⢠⢝⠁⠀⠀⠀⡅⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢻⠀⠀⠀⣀⠠⢊⠐⡄⢃⠰⠁⡄⢃⡐⢂⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⢠⡀⠀⠀⠀⠀⠀⠉⢕⡀⠀⠀⠇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢸⡀⠀⠈⠐⢅⡂⢢⠐⠨⠄⢃⠌⢠⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢂⠀⠀⠀⠀⠀⠈⠢⣄⠀⠀⠀⠀⠀⢀⠀⢸⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢣⠀⠀⠀⠀⠀⢘⠡⢁⠊⢤⠜⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠑⠢⡀⠀⠀⠀⢢⠃⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⡆⠀⠀⠀⠀⢆⢂⢬⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠆⠀⠀⠀⠀⠀⠀⠀⠀⠢⡁⠢⠀⠀⢢⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠊⠐⡀⠀⣀⠞⠂⠁⠌⠀⠀⠁⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀⢡⠀⠀⠈⢖⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⠎⠀⠀⠁⠉⠀⠀⡀⢠⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⢆⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠈⠆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⢰⠀⡎⠀⠀⠀⢀⠾⠀⠀⠀⠀⠀⠀⠀⠀⠈⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠀⠀⠀⢸⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠠⠁⠀⠀⠀⠀⠀⠀⠃⠀⠃⠀⠀⡠⠂⢐⠀⠀⠀⠀⠀⠀⢀⠔⠀⠈⡄⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠸⠐⢵⡀⠀⠀⠀⠀⢸⣄⠀⠘⠀⠀⡀⠀⢳⠀⠀⠀⠀
⠀⠀⠀⠀⢀⠃⠀⠀⠀⠀⠀⠀⡐⠀⢸⠀⡠⠂⠀⠀⠘⠀⠀⠀⠀⠀⠠⠂⠀⠀⠀⢣⠀⠀⠀⠀⠀⠀⠀⠱⠀⠀⠀⠀⠀⠀⠱⡀⠀⠀⢀⡎⡇⠐⢨⠀⠀⠘⡀⠈⡄⠀⠀⠀
⠀⠀⠀⠀⡄⠀⠀⠀⠀⠀⠀⢀⠃⠀⠐⠁⠀⠀⠀⠀⠀⣆⠠⠄⠒⣶⣿⣏⠉⠉⠁⠘⠂⠀⡀⠀⠀⢀⠄⠀⢃⠀⣀⣦⡄⠀⠀⠑⠀⠄⠜⣖⡇⠀⠀⠀⠀⠀⠀⠀⢱⠀⠀⠀
⠀⠀⠀⡸⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⡠⠊⠀⠀⠀⣸⣿⣿⣿⡄⠀⠀⠀⠀⠀⠈⠢⡄⠁⠀⢀⠐⢩⣿⣿⣧⠀⠀⠀⠀⠀⠀⠈⠢⡀⠀⠀⠀⠀⠘⡀⠀⢇⠀⠀
⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⡰⠀⠀⠀⠀⠀⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠘⡄⠠⠁⠀⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⢡⠀⠀⠀⠀⠀⡇⠀⢸⠀⠀
⠀⠀⡜⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⢇⠀⠀⠀⠀⠀⣿⣿⣿⣾⡇⠀⠀⠀⠀⠀⠀⠀⠀⠁⡇⠀⠸⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⠀⠀⠀⢡⠀⠀⢇⠀
⠀⠰⠀⠀⢀⢰⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠈⢆⠀⠀⠀⠀⢸⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠐⠀⠱⡀⠀⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⣠⠁⠀⠀⠀⠀⠀⡜⢀⠀⠘⠀
⠀⠐⠂⠉⠀⢸⠀⠀⠀⠀⠀⠀⡆⠀⠀⠀⠀⠀⠀⢨⠓⠄⡀⠀⠀⠻⣿⠏⠀⠀⠀⠀⠀⢀⠄⠂⠀⠀⠀⠈⠂⢘⣿⡟⠀⠀⠀⠀⠀⡀⠄⠊⡆⠀⠀⠀⠀⠀⠀⡇⠈⠢⣄⢀
⠀⠀⠀⠀⠀⠸⠀⠀⠀⠀⠀⢀⢵⠀⠀⠀⠀⠀⠀⡘⢄⠀⠀⠁⠀⠂⠁⠤⠤⠤⠀⡂⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠸⠀⠀⠀⠀⠈⠁⠀⠀⢠⠀⠀⠀⠀⠀⠀⢀⡇⠀⠀⠀⠉
⠀⠀⠀⠀⠀⠀⡃⠀⠀⠀⣠⢚⡘⡆⠀⠀⠀⠀⢀⡿⢦⠐⡀⠀⠀⠀⠀⠀⠀⠀⠘⡀⠀⠀⠀⠀⢀⠌⠢⠀⠀⠀⡰⠀⠀⠀⠀⠀⠀⢀⡴⢋⡷⡀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢠⡀⠄⠂⢸⡂⠥⢹⡄⠀⠀⠀⡼⡐⡌⢓⢬⡢⠀⠀⠀⠀⠀⠀⠀⠈⠐⠒⠒⠊⠀⠀⠀⠀⠉⠁⠀⠀⠀⠀⠀⣀⠴⢋⢄⢣⠏⠑⢄⠀⠀⠀⢾⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⠃⣦⠗⡄⠀⠰⠳⡡⡘⢂⢆⡙⣷⢥⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⣴⢞⢡⠚⠤⡊⡼⠀⠀⠀⠑⢤⡀⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠉⠀⠀⠘⣄⡆⠀⠱⡡⡉⢆⠞⠘⣄⠢⡉⡕⣢⣤⠄⣤⠤⠤⢤⣤⣤⣤⢤⡖⠒⠭⡑⠰⡏⠋⠣⣎⠰⡱⠁⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠙⠦⠃⠀⠀⠸⡵⠚⠉⠁⠸⠀⢐⠉⠉⠉⡃⢡⠉⠐⢯⠪⣕⡨⢱⠂⠀⠀⠈⠳⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠎⢳⡀⠀⠀⠀⠀⠈⠑⡈⠑⢇⣁⣤⣤⡼⠵⡀⠈⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠠⠈⠀⠀⠀⠈⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⢀⠂⠀⠀⡱⡀⠀⠀⠀⠀⠀⢡⠀⠈⡙⠚⠋⠉⠈⠙⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠁⠀⠀⠀⠀⠀⠀⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣮⣄⠀⡐⠄⡇⠀⠀⠀⠀⠀⠈⡆⠀⠰⡀⠀⠀⠀⢃⣈⣴⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣾⣿⣿⣿⣿⣷⣂⠠⡇⠀⠀⠀⠀⠀⠀⠠⠀⠀⢣⠀⠀⠀⠈⣿⡿⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢠⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⣿⣿⣻⣿⣿⣷⠁⠀⠀⠀⠀⠀⠀⢠⠀⠀⠐⡀⠀⠀⠀⢹⣿⣿⣿⣿⣆⠀⠀⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣷⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠸⠀⠀⠀⠱⠀⠀⠀⠸⣞⢿⣮⣿⣿⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⡿⣿⣿⣷⣿⣿⣿⣽⡏⡆⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠃⠀⠀⠈⣿⣷⣟⢮⣿⣟⠥⠄⠠⢄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢂⠀⠀⠀⠀⠀⠀⣀⠠⠤⠽⠿⡟⠙⠿⢿⣿⣯⣿⣟⡼⠀⠀⠀⠀⠀⠀⠀⠀⢸⡶⠶⠀⠀⢰⠀⠀⠀⢸⣿⣿⡺⢙⠇⠀⠀⠀⠀⠀⠐⢄⠀⠀⠀⠀⠀⠀⠀
⠐⡀⠀⠀⠀⠀⠀⠀⠂⠄⠀⠔⠈⠀⠀⠀⠀⠀⠀⠀⠑⣿⣿⢿⠏⢸⠇⠀⠀⠀⠀⠀⠀⠀⠀⠘⠉⠙⠀⠀⠀⡆⠀⠀⠈⣟⡟⠁⠌⠀⠀⠀⠀⠀⠀⠀⠀⢧⠀⠀⠀⠀⠀⠀
⠀⠈⠀⠀⠀⠀⠀⠀⠀⢀⡎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⢚⠋⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠢⢀⠀⢀⠤⠂⠀⠀⢀⣼⠁⢠⠁⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠁⠀⠄⡀⠀⠀⢨⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢧⢉⣶⣦⣤⣄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠉⣁⣀⣤⣤⣶⡿⣿⣇⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠁⠀⠢⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣾⡿⣯⢷⢯⣿⣿⣿⢿⣻⢿⣿⣿⢿⣻⣽⢻⣞⣿⣟⡷⣯⢿⣌⠠⢀⠀⠀⠀⠀⢀⢄⠞⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢌⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⢿⣹⠷⣯⢿⣿⢿⣽⣫⢯⣟⣿⣟⣯⠷⣯⣟⡾⣽⡿⣽⣳⣟⣧⠑⠦⠬⡥⠤⠌⠒⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠢⣀⠢⠀⡀⠀⠀⠀⠀⢀⡠⢬⠈⠛⠯⠿⣽⣻⣯⣟⡶⣯⣟⡾⣽⣻⡞⣿⣳⣭⣟⢷⣻⠷⣯⢾⡽⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱⠆⠀⢉⠉⠉⠱⠎⠀⠀⠱⣀⡀⠀⢸⡹⠷⢏⣿⣱⣾⡹⢿⣷⠿⢷⣿⣸⣾⡿⢿⡿⠏⠏⢀⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣧⣄⠀⠀⠈⠀⠀⡨⠓⠂⢄⣀⠉⣀⣀⣼⣷⠂⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⡿⠑⠒⠂⠉⠀⠀⠀⢸⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⡿⣟⣿⡟⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⡿⣿⣻⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣽⣿⣿⣁⠀⠀⠀⠀⠀⠀⣿⢿⣿⣯⣿⣟⣿⣷⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡝⣾⣹⣛⠿⣾⠿⣿⠀⠀⠀⠀⠀⢸⡝⣯⢞⡽⣻⠿⡿⢿⣹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣶⣧⣏⡿⣜⣯⡟⠀⠀⠀⠀⠀⢸⣿⣧⣿⣜⢧⡻⣝⢧⣻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⣿⣷⣻⣞⣿⣻⢿⣽⠁⠀⠀⠀⠀⠀⣸⣿⣻⢾⣟⡿⣿⢿⣿⣏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⡿⣞⣷⣟⣷⣻⣯⡟⠀⠀⠀⠀⠀⠀⣿⣿⡽⣟⣾⢿⣽⣻⢾⣻⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣽⣟⣷⣻⢾⣷⣻⡇⠀⠀⠀⠀⠀⠨⣿⣷⣿⣻⡽⣟⣾⣻⢿⡽⣯⣿⢿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣟⣾⣽⢾⣻⣟⣾⣽⡇⠀⠀⠀⠀⠀⠀⠈⠙⠛⠽⠿⣟⣷⣟⣯⡿⣷⢯⣿⡷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣞⡿⣞⣿⡽⣾⣻⢾⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⣾⣯⣿⣽⣻⠷⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣞⡿⣯⣷⢿⣯⣟⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⠿⣷⣯⣿⠾⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
*/
