import React, { useState, useEffect } from "react";
import stringSimilarity from "string-similarity"; // Install string-similarity package
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import LoadingComponent from "./LoadingComponent";
import "./AllSongs.css";
import * as FaIcons from "react-icons/fa";
import TextScroll from "./TextScrollComponent/TextScroll";
import Swal from "sweetalert2";

function Search(props) {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchData();
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    fetch(
      `https://localhost:7106/api/Connection/playlistdetailsbyusername/${Cookies.get(
        "username"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((playlists) => {
        const playlistDetails = playlists.map((playlist) => ({
          id: playlist.playlistId,
          name: playlist.playlistName,
          songCount: playlist.songs.length,
        }));
        setPlaylists(playlistDetails);
      })
      .catch(console.error)
      .finally(() => {
        setFetchPending(false);
      });
  };
  const fetchData = async () => {
    try {
      setFetchPending(true);
      const response = await axios.get(
        `https://localhost:7106/api/Song/allsong`
      );
      const newSongs = await Promise.all(
        response.data.map(async (song, index) => {
          // Added index parameter
          return { ...song, originalIndex: index }; // Include original index
        })
      );
      setSongs(newSongs);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFetchPending(false);
    }
  };

  const handleSearch = async (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter songs based on similarity
    const newFilteredSongs = await Promise.all(
      songs.map(async (song) => {
        const nameSimilarity = song.name
          ? stringSimilarity.compareTwoStrings(query, song.name.toLowerCase())
          : 0;
        const artistSimilarity = song.artist
          ? stringSimilarity.compareTwoStrings(query, song.artist.toLowerCase())
          : 0;
        if (nameSimilarity > 0.125 || artistSimilarity > 0.125) {
          const albumName = await fetchAlbumData(song.albumId);
          let albumImage = null;
          if (albumName) {
            albumImage = await fetchAlbumImage(albumName);
          }
          return {
            ...song,
            albumName,
            albumImage,
            nameSimilarity,
            artistSimilarity,
          }; // Include similarity scores
        }
        return null;
      })
    );

    const filteredSongs = newFilteredSongs.filter(Boolean);
    

    // Sort filteredSongs based on the sum of similarity scores in descending order
    filteredSongs.sort((a, b) => {
      const similarityA = a.nameSimilarity + a.artistSimilarity;
      const similarityB = b.nameSimilarity + b.artistSimilarity;
      return similarityB - similarityA;
    });

    if (filteredSongs.length === 0 && query.length > 3) {
      setNoResults(true);
    } else {
      setNoResults(false);
      setFilteredSongs(filteredSongs);
    }
  };

  const fetchAlbumData = async (albumId) => {
    try {
      const response = await axios.get(
        `https://localhost:7106/api/Album/albumbyid/${albumId}`
      );
      return response.data.name;
    } catch (error) {
      console.error("Error fetching album data:", error);
      return null;
    }
  };

  const fetchAlbumImage = async (albumName) => {
    try {
      const response = await fetch(
        `https://localhost:7106/AlbumImage/${albumName}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch album image");
      }
      const imageBlob = await response.blob();
      const objectUrl = URL.createObjectURL(imageBlob);
      return objectUrl;
    } catch (error) {
      console.error("Error fetching album image:", error);
      return "https://via.placeholder.com/650";
    }
  };

  const handleSongSelect = async (songindex) => {
    await props.setSelectedSong(songindex);
  };

  const handleSongAddToPlaylist = async (song, songid) => {
    try {
      const playlistOptions = {};
      playlists.forEach((playlist) => {
        playlistOptions[playlist.id] = playlist.name;
      });

      const { value: selectedPlaylist } = await Swal.fire({
        title: "Select a playlist",
        input: "select",
        inputOptions: playlistOptions,
        inputPlaceholder: "Select a playlist",
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value) {
              resolve();
            } else {
              resolve("You need to select a playlist");
            }
          });
        },
      });

      if (selectedPlaylist) {
        Swal.fire(`Song: ${song} added to playlist: ${selectedPlaylist}`);
        addSongToPlaylist(selectedPlaylist, songid);
      }
    } catch (error) {
      console.error("Error handling song addition to playlist:", error);
    }
  };
  const addSongToPlaylist = async (playlistId, songId) => {
    try {
      const response = await axios.post(
        "https://localhost:7106/api/Playlistsong/playlistsong",
        {
          playlistId: playlistId,
          songId: songId,
        }
      ); // itt a válasz megjelenítése vagy további műveletek
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="d-flex justify-content-center">
      <div className="input-group searchwidth">
        <input
          type="text"
          placeholder="Search songs..."
          value={searchQuery}
          onChange={handleSearch}
          className="row col-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 searchbar form-control"
        />
        <span className="col-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 searchbutton rounded d-flex justify-content-end align-items-center">
          <FaIcons.FaSearch />
        </span>
      </div>
      <div className="searchFrame row overflow-auto hiddenscrollbar">
        {isFetchPending ? (
          <LoadingComponent />
        ) : noResults ? (
          <div className="text-center whitetextbold w-100 h-100 d-flex justify-content-center align-items-center">
            <h1>There are no results for your search</h1>
          </div>
        ) : (
          <div className="container-fluid">
            <div className="row">
              {filteredSongs.map((song) => (
                <div key={`${song.id}`} className="col-md-3 mb-4">
                  <Card
                    className="song-card"
                    style={{
                      backgroundImage: `url(${
                        song.albumImage || "https://via.placeholder.com/650"
                      })`,
                    }}
                  >
                    <Card.Body className="song-details d-flex align-items-center justify-content-center">
                      <div
                        className="w-100 d-flex flex-column align-items-center justify-content-center"
                        style={{
                          backdropFilter: "brightness(60%) blur(10px)",
                          height: "100%",
                          borderRadius: "1vw",
                          overflow: "hidden",
                        }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                      >
                        <Card.Title
                          className="whitetextbold songtitle text-center"
                          style={{ overflow: "hidden" }}
                        >
                          {!isHovered ? (
                            song.name.replace(/^[^-]*-\s*/, "")
                          ) : (
                            <TextScroll
                              text={song.name.replace(/^[^-]*-\s*/, "")}
                            />
                          )}
                        </Card.Title>
                        <Card.Subtitle
                          className="whitetext songartist text-center"
                          style={{ overflow: "hidden" }}
                        >
                          {!isHovered ? (
                            song.name.split(" - ")[0]
                          ) : (
                            <TextScroll text={song.name.split(" - ")[0]} />
                          )}
                        </Card.Subtitle>
                        <div
                          className="d-flex align-items-center justify-content-center w-100 mt-3 cardButtonContainer"
                          style={{
                            position: "fixed",
                            bottom: 0,
                          }}
                        >
                          <FaIcons.FaPlus
                            className="cardButton col-5"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleSongAddToPlaylist(song.name, song.id)
                            }
                          />
                          <span className="col-2"></span>
                          <FaIcons.FaPlay
                            className="cardButton col-5"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSongSelect(song.originalIndex)}
                          />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
