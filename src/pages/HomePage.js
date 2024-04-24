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

import "mdb-ui-kit/css/mdb.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AllSongs from "../Components/AllSongs";

import FooterMusicPlayer from "../Components/MusicPlayer/FooterMusicPlayer";
function HomePage() {
  const [selectedSong, setSelectedSong] = useState('');

  const handleSongSelect = (songName) => {
    setSelectedSong(songName);
  };

  return (
    <div className="w-100 h-100 hiddenscrollbar">
      <h1>Random zenék</h1>
      <AllSongs onSongSelect={handleSongSelect}/>
      <FooterMusicPlayer selectedSong={selectedSong} />
    </div>
  );
}

export default HomePage;