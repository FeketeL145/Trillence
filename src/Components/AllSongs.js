import React, { useEffect, useState } from "react";
import "./AllSongs.css";

function AllSongs({ onSongSelect }) {
  const [songs, setSongs] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchPending(true);
        const response = await fetch("https://localhost:7106/api/Connection/allsongdetails", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });
        const songsData = await response.json();
        songsData.sort((a, b) => {
          const artistA = a.mainArtist.artistName.toUpperCase();
          const artistB = b.mainArtist.artistName.toUpperCase();
          if (artistA < artistB) {
            return -1;
          }
          if (artistA > artistB) {
            return 1;
          }
          return 0;
        });
        setSongs(songsData);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchPending(false);
      }
    };

    fetchData();
  }, []);

  const handleSongClick = (song, album) => {
      const songName = `${song.songName}`;
      onSongSelect(songName);
  };

  return (
  <div className="embedFrame overflow-auto">
    {isFetchPending ? (
      <div className="spinner-border"></div>
    ) : (
      <div className="song-grid hiddenscrollbar">
        {songs.map((album) =>
          album.songs.map((song) => (
            <div key={song.songId} className="songcard card">
              <button onClick={() => handleSongClick(song, album)}>
                <div className="card-body">
                  <h5 className="card-title">{song.songName.replace(/^[^-]*-/, '')}</h5>
                  <p className="card-text">{album.mainArtist.artistName}</p>
                </div>
              </button>
            </div>
          ))
        )}
      </div>
    )}
  </div>

  );
}

export default AllSongs;
