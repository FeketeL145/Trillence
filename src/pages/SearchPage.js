import "bootstrap-icons/font/bootstrap-icons.css";
import Search from "../Components/Search";
import { useState } from "react";

function SearchPage(props) {

  const handleSongSelect = async (songName) => {
    await props.setSelectedSong(songName);
  };

  return (
    <div>
      <Search setSelectedSong={handleSongSelect} /> {/* Pass correct handler */}
    </div>
  );
}

export default SearchPage;
