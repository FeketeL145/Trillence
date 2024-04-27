import React, { useEffect, useState } from "react";
import "./AllSongs.css";

function Search({ onSongSelect }) {
  const [songs, setSongs] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);

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
        songsData.sort((a, b) => a.mainArtist.artistName.localeCompare(b.mainArtist.artistName));
        setSongs(songsData);
        setFilteredSongs(songsData);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchPending(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterSongs = () => {
      if (!searchQuery.trim()) {
        setFilteredSongs(songs);
        return;
      }

      const formattedQuery = searchQuery.trim().toLowerCase();
      const filtered = songs.filter(album => {
        const artistName = album.mainArtist.artistName.toLowerCase();

        // Check if the artist name matches
        if (artistName.includes(formattedQuery)) {
          return true;
        }

        // Iterate through album songs and check each song's name
        for (let i = 0; i < album.songs.length; i++) {
          const songName = album.songs[i].songName.toLowerCase();
          const songDistance = levenshteinDistance(songName, formattedQuery);

          // Consider a match if the distance is below a certain threshold
          const threshold = 3; // Adjust as needed
          if (songDistance <= threshold) {
            return true; // Return true if any song matches
          }
        }

        return false; // No match found
      });

      setFilteredSongs(filtered);
    };

    filterSongs();
  }, [searchQuery, songs]);

  const handleSongClick = (song) => {
    onSongSelect(song);
  };

  const levenshteinDistance = (s1, s2) => {
    const len1 = s1.length;
    const len2 = s2.length;

    const matrix = [];
    for (let i = 0; i <= len1; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[len1][len2];
  };

  return (
    <div className="embedFrame overflow-auto">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      {isFetchPending ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="song-grid hiddenscrollbar">
          {filteredSongs.map((album, index) =>
            album.songs.map((song, songIndex) => (
              <div key={`${index}-${songIndex}`} className="songcard card">
                <button onClick={() => handleSongClick(song)}>
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

export default Search;