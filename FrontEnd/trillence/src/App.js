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
      <div className="bt logocontainer" id="navbarNav">
        <ul className="navbar-nav btw">
          <li className="nav-item">
            <NavLink to={`/`} className="nav-link">
              <span className="nav-link btw"><svg id="logo" class="logo" data-name="Réteg 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs></defs><path class="cls-1 t" d="M76,574.61V475.73H40V440.28H152.54v35.45H116.69v98.88Z"/><path class="cls-1 r" d="M156.17,574.61V477.34h36.26v11.08c6-7.05,18.73-13.5,29.8-13.5v34.64a28.76,28.76,0,0,0-8.25-1c-7.66,0-17.53,2-21.55,6.84v59.21Z"/><path class="cls-1 i" d="M232.51,446.93a20.34,20.34,0,1,1,20.34,20.34A20.28,20.28,0,0,1,232.51,446.93Zm2.21,127.68V477.34H271v97.27Z"/><path class="cls-1 l1" d="M291.12,574.61V440.28h36.25V574.61Z"/><path class="cls-1 l2" d="M347.51,574.61V440.28h36.26V574.61Z"/><path class="cls-1 e1" d="M450.23,474.92c28.6,0,50.55,20.55,50.55,54.78v7.45H434.72c2,6.25,9.07,12.29,21.35,12.29,8.26,0,17.12-3,21.95-6.85L492.93,565c-9.67,8.25-27,12.08-41.49,12.08-30.41,0-54.18-19.13-54.18-51.15C397.26,497.68,418.81,474.92,450.23,474.92Zm-15.91,39.27h32c-1-4.22-4.43-11.68-16.11-11.68C439.15,502.51,435.53,509.76,434.32,514.19Z"/><path class="cls-1 n" d="M579.13,574.61V520.84c0-10.07-5.44-13.9-14.09-13.9-8.26,0-12.49,4.24-15.51,7.66v60H513.28V477.34h36.25v11.08c5.64-6.45,16.31-13.5,33.43-13.5,22.56,0,32.42,13.7,32.42,30.61v69.08Z"/><path class="cls-1 c" d="M683.46,474.92c22.16,0,35.85,10.07,41.29,18.33l-23.36,22c-3-4.63-8.66-8.26-16.32-8.26-10.27,0-19.13,6.45-19.13,18.94S674.8,545,685.07,545a19.58,19.58,0,0,0,16.32-8.46l23.36,22.15c-5.44,8.06-19.13,18.33-41.29,18.33-30.81,0-54.57-20.14-54.57-51.15C628.89,495.06,652.65,474.92,683.46,474.92Z"/><path class="cls-1 e2" d="M783,474.92c28.6,0,50.55,20.55,50.55,54.78v7.45H767.45c2,6.25,9.07,12.29,21.35,12.29,8.26,0,17.12-3,22-6.85L825.66,565C816,573.2,798.67,577,784.17,577,753.76,577,730,557.9,730,525.88,730,497.68,751.54,474.92,783,474.92Zm-15.91,39.27h32c-1-4.22-4.43-11.68-16.11-11.68C771.88,502.51,768.26,509.76,767.05,514.19Z"/><path class="cls-2 arrow" d="M965.44,520,870,575.35c-8.1,4.69-18.49-1-18.49-10.45V454.15c0-9.45,10.37-15.14,18.49-10.44l95.43,55.38a12,12,0,0,1,0,20.89"/></svg></span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="bt" id="navbarNav">
          <ul className="navbar-nav">
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
