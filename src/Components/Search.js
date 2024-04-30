import React, { useState, useEffect } from "react";
import stringSimilarity from "string-similarity"; // Install string-similarity package
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import LoadingComponent from "./LoadingComponent";
import "./AllSongs.css";
import * as FaIcons from "react-icons/fa";

function Search({ onSongSelect }) {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setFetchPending(true);
      const response = await axios.get(
        `https://localhost:7106/api/Song/allsong`
      );
      setSongs(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFetchPending(false);
    }
  };

  const handleSearch = async (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Fetch album data and image only when needed
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
          return { ...song, albumName, albumImage, nameSimilarity, artistSimilarity }; // Include similarity scores
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

  const handleSongClick = (song) => {
    const songName = `${song}`;
    console.log(songName);
    onSongSelect(songName);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="input-group w-75">
        <input
          type="text"
          placeholder="Search songs..."
          value={searchQuery}
          onChange={handleSearch}
          className="row col-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 mt-2 searchbar form-control"
        />
        <span className="col-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 mt-2 searchbutton rounded d-flex justify-content-end align-items-center">
          <FaIcons.FaSearch />
        </span>
      </div>
      <div className="searchFrame overflow-auto row">
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
                        song.albumImage ||
                        "https://via.placeholder.com/650"
                      })`,
                    }}
                    onClick={() => handleSongClick(song.name)}
                  >
                    <Card.Body className="song-details d-flex align-items-center justify-content-center">
                      <div
                        className="text-center"
                        onClick={() => handleSongClick(song.name)}
                      >
                        <Card.Title className="whitetextbold songtitle">
                          {song.name}
                        </Card.Title>
                        <Card.Subtitle className="whitetext songartist">
                          {song.artist}
                        </Card.Subtitle>
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