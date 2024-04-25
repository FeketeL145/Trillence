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
import AdminPanel from "./pages/AdminPanel.js";


import Featuretester from "./pages/lotsofpages/Featuretester.js";
/*Songs*/
import SongDeleteById from './pages/lotsofpages/Songs/SongDeleteById';
import SongList from './pages/lotsofpages/Songs/SongList2.js';
import SongPost from './pages/lotsofpages/Songs/SongPost';
import SongSinglePage from './pages/lotsofpages/Songs/SongSinglePage';
import SongUpdatebyId from './pages/lotsofpages/Songs/SongUpdatebyId';
/*playlist*/
import AllPlaylist from './pages/lotsofpages/Playlist/AllPlaylist.js';
import PlaylistSingleElement from './pages/lotsofpages/Playlist/PlaylistSingleElement.js';


import "./App.css";
import Sidebar from "./Components/Sidebar.js";
import FooterMusicPlayer from './Components/MusicPlayer/FooterMusicPlayer.js';

function App() {
  const [selectedSong, setSelectedSong] = useState('');
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <div className="AppDisplayPage">
          <Routes>
            <Route path="/" element={<HomePage setSelectedSong={setSelectedSong} />}/>
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-out" element={<Logout />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/spotdl" element={<SpotDL />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<MyProfile/>} />
            <Route path="/PasswordForgot" element={<PasswordForgot />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />


            <Route path="/admin-featuretester" element={<Featuretester />} />

            <Route path="/SongList" element={<SongList />} />
            <Route path="/SongDeleteById:id" element={<SongDeleteById />} />
            <Route path="/SongPost" element={<SongPost />} />
            <Route path="/SongSinglePage/:id" element={<SongSinglePage />} />
            <Route path="/SongUpdatebyId/:id" element={<SongUpdatebyId />} />
            <Route path="playlists" element={<AllPlaylist />} />
            <Route path="playlist/:id" element={<PlaylistSingleElement />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;