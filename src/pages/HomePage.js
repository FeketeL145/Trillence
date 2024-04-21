// HomePage.js
import React, { useState } from 'react';
import AllSongs from '../Components/AllSongs';
import FooterMusicPlayer from '../Components/MusicPlayer/FooterMusicPlayer';

function HomePage() {
  const [selectedSong, setSelectedSong] = useState('');

  const handleSongSelect = (songName) => {
    setSelectedSong(songName);
    console.log(songName);
    handleNext();
  };

  return (
    <div className="w-100 h-100 hiddenscrollbar">
      <h1>Random zenék</h1>
      <AllSongs onSongSelect={handleSongSelect}/>
      <div className="musicPlayer">
        <FooterMusicPlayer selectedSong={selectedSong} />
      </div>
    </div>
  );
}

export default HomePage;