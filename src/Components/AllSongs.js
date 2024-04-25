import React, { useEffect, useState } from "react";

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
    <div>
      <div className="">
        {isFetchPending ? (
          <div className="spinner-border"></div>
        ) : (
          <div className="d-flex row flex-nowrap overflow-auto hiddenscrollbar">
            {songs.map((album) =>
              album.songs.map((song) => (
                <div key={song.songId} className="songcard card p-4 mt-4 bg-dark rounded-8" style={{ maxWidth: "25%" }}>
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
    </div>
  );
}

export default AllSongs;
