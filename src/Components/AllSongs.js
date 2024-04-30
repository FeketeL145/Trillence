import React, { useEffect, useState } from "react";
import LoadingComponent from "../Components/LoadingComponent";
import axios from "axios";
import { Card } from "react-bootstrap";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "./AllSongs.css";
import "react-toastify/dist/ReactToastify.css";

function AllSongs({ onSongSelect, updateSongs }) {
  const [songs, setSongs] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const notify = (currentlyPlaying) => {
    toast.info(`Now playing:\n ${currentlyPlaying}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  useEffect(() => {
    if (pageNumber != 1) {
      fetchData(pageNumber);
    } else {
      fetchData(1);
    }
  }, [pageNumber]);

  const loadMore = () => {
    const nextPageNumber = pageNumber + 1;
    setPageNumber(nextPageNumber);
    updateSongs(songs);
  };

  const fetchData = async (pageNumber) => {
    try {
      setFetchPending(true);
      const response = await axios.get(
        `https://localhost:7106/api/Song/allsongpaginated?pageNumber=${pageNumber}`
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

      if (pageNumber === 1) {
        setSongs(newSongs);
      } else {
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

  const handleSongClick = (song, songindex) => {
    const songName = `${song}`;
    const songIndex = `${songindex}`;
    notify(songName + " " + songIndex);
    onSongSelect(songIndex);
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

  return (
    <div className="d-flex justify-content-center">
      <div className="embedFrame overflow-auto">
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <div className="container-fluid mt-3">
            <div className="row">
              {songs.map((song, index) => (
                <div key={`${song.id}-${index}`} className="col-md-3 mb-4">
                  <Card
                    className="song-card"
                    style={{
                      backgroundImage: `url(${
                        song.albumImage || "https://via.placeholder.com/650"
                      })`,
                    }}
                    onClick={() => handleSongClick(song.name, index)}
                  >
                    <Card.Body className="song-details d-flex align-items-center justify-content-center">
                      <div
                        className="text-center"
                      >
                        <Card.Title className="whitetextbold songtitle">
                          {song.name.split(" - ")[1]}
                        </Card.Title>
                        <Card.Subtitle className="whitetext songartist">
                          {song.name.split(" - ")[0]}
                        </Card.Subtitle>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
        {!isLoading && songs.length < totalItems && (
          <div className="text-center mt-3 mb-5">
            <button
              className="btn loadmorebutton"
              onClick={loadMore}
              disabled={isFetchPending}
            >
              {isFetchPending ? (
                <span className="whitetext">Loading...</span>
              ) : (
                <span className="whitetext">Load more songs</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllSongs;
