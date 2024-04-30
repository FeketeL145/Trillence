import "bootstrap-icons/font/bootstrap-icons.css";
import Search from "../Components/Search";
import { useState } from "react";

function SearchPage(props) {

  const handleSongSelect = (songName) => {
    props.setSelectedSong(songName);
  };

  return (
    <div>
      <Search setSelectedSong={handleSongSelect} /> {/* Pass correct handler */}
    </div>
  );
}

export default SearchPage;
