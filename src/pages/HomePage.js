import React, { useState } from "react";
import AllSongs from "../Components/AllSongs";

function HomePage(props) {
  const [songs, setSongs] = useState([]);

  const handleSongSelect = async (songName) => {
    await props.setSelectedSong(songName);
  };

  const updateSongs = (newSongs) => {
    setSongs(newSongs);
    console.log(songs);
  };

  return (
    <>
      <AllSongs onSongSelect={handleSongSelect} updateSongs={updateSongs} />
      {/* Render other components */}
    </>
  );
}

export default HomePage;
