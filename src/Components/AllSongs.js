import React, { useEffect, useState } from "react";
import LoadingComponent from "../Components/LoadingComponent";
import axios from "axios";
import "./AllSongs.css";

function AllSongs({ onSongSelect, updateSongs }) {
  const [songs, setSongs] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);
  const [albumImages, setAlbumImages] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentAlbumId, setCurrentAlbumId] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (pageNumber != 1) {
      fetchData(pageNumber);
    } else {
      fetchData(1);
    }
  }, [pageNumber]); // Make useEffect depend on pageNumber

  useEffect(() => {
    if (pageNumber === 1) {
      updateSongs(songs);
    }
  });

  const loadMore = () => {
    const nextPageNumber = pageNumber + 1;
    setPageNumber(nextPageNumber); // Update pageNumber to trigger useEffect
    updateSongs(songs);
  };

  const fetchData = async (pageNumber) => {
    try {
      setFetchPending(true);
      const response = await axios.get(
        `https://localhost:7106/api/Song/allsong?pageNumber=${pageNumber}`
      );
      const response2 = await axios.get(
        `https://localhost:7106/api/Song/songcount`
      );

      const newSongs = await Promise.all(
        response.data.map(async (song) => {
          const albumName = await fetchAlbumData(song.albumId);
          let albumImage = null;
          if (albumName) {
            albumImage = await fetchAlbumImage(albumName);
          }
          return { ...song, albumName, albumImage };
        })
      );

      // If it's the first page, set the songs directly
      if (pageNumber === 1) {
        setSongs(newSongs);
      } else {
        // If it's not the first page, append new songs to the existing ones
        setSongs((prevSongs) => [...prevSongs, ...newSongs]);
      }

      setTotalItems(response2.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFetchPending(false);
      setIsLoading(false);
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

  const handleSongClick = (song) => {
    const songName = `${song}`;
    console.log(songName);
    onSongSelect(songName);
  };

  const fetchAlbumImage = async (albumName) => {
    try {
      const response = await fetch(
        `https://localhost:7106/AlbumImage/${albumName}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch album image");
      }
      const imageBlob = await response.blob(); // Fetch the image
      const objectUrl = URL.createObjectURL(imageBlob); // Create a URL for the image
      return objectUrl; // Return the image URL
    } catch (error) {
      console.error("Error fetching album image:", error);
      return "https://via.placeholder.com/650"; // Fallback image in case of error
    }
  };

  return (
    <div className="embedFrame overflow-auto">
      {isLoading ? ( // Conditionally render loading state
        <LoadingComponent />
      ) : (
        <div className="song-grid hiddenscrollbar">
          {songs.map((song, index) => (
            <div
              key={`${song.id}-${index}`} // Ensure unique key using index
              className="card song-card"
              style={{
                backgroundImage: `url(${
                  song.albumImage || "https://via.placeholder.com/650"
                })`,
              }}
              onClick={() => handleSongClick(song.name)}
            >
              <div className="song-details w-100 h-100 d-flex align-items-center justify-content-center">
                <div
                  className="text-center"
                  onClick={() => handleSongClick(song.name)}
                >
                  <h3 className="whitetextbold">{song.name.split(" - ")[1]}</h3>
                  <p className="whitetext">{song.name.split(" - ")[0]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!isLoading && songs.length < totalItems && (
        <div className="text-center mt-3">
          <button
            className="btn btn-primary"
            onClick={loadMore}
            disabled={isFetchPending}
          >
            {isFetchPending ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AllSongs;
