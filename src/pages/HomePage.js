import { lazy, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "mdb-ui-kit/css/mdb.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AllSongs from "../Components/AllSongs";
function HomePage(props) {
  const handleSongSelect = (songName) => {
    props.setSelectedSong(songName);
  };

  return (
      <AllSongs onSongSelect={handleSongSelect}/>
  );
}

export default HomePage;