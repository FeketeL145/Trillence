import React, { useEffect, useState } from "react";
import LoadingComponent from "../Components/LoadingComponent";
import axios from "axios";
import { Card } from "react-bootstrap";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "./AllSongs.css";
import "react-toastify/dist/ReactToastify.css";

function AllSongPlaylist() {
  const [songs, setSongs] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  /*const notify = async (currentlyPlaying) => {
    await toast.dismiss();
    await toast.info(`Now playing:\n ${currentlyPlaying}`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };*/

  useEffect(() => {
    if (pageNumber != 1) {
      fetchData(pageNumber);
    } else {
      fetchData(1);
    }
  }, [pageNumber]);

  const loadMore = async () => {
    const nextPageNumber = await pageNumber + 1;
    await setPageNumber(nextPageNumber);
  };

  const fetchData = async (pageNumber) => {
    try {
      await setFetchPending(true);
      const response = await axios.get(
        `https://localhost:7106/api/Song/allsongpaginated?pageNumber=${pageNumber}`
      );
      const response2 = await axios.get(
        `https://localhost:7106/api/Song/songcount`
      );

      const newSongs = await Promise.all(
        await response.data.map(async (song) => {
          const albumName = await fetchAlbumData(song.albumId);
          let albumImage = await null;
          if (albumName) {
            albumImage = await fetchAlbumImage(albumName);
          }
          return await { ...song, albumName, albumImage };
        })
      );

      if (pageNumber === 1) {
        await setSongs(newSongs);
      } else {
        await setSongs((prevSongs) => [...prevSongs, ...newSongs]);
      }

      await setTotalItems(response2.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      await setFetchPending(false);
      await setIsLoading(false);
    }
  };
  const fetchAlbumData = async (albumId) => {
    try {
      const response = await axios.get(
        `https://localhost:7106/api/Album/albumbyid/${albumId}`
      );
      return await response.data.name;
    } catch (error) {
      console.error("Error fetching album data:", error);
      return await null;
    }
  };

  const handleSongClick = async (song, songindex) => {
    try {
      const songName = `${song}`;
      const songIndex = `${songindex}`;
    } catch (error) {
      console.error("Error handling song click:", error);
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
      const objectUrl = await URL.createObjectURL(imageBlob);
      return objectUrl;
    } catch (error) {
      console.error("Error fetching album image:", error);
      return "https://via.placeholder.com/650";
    }
  };

  return (
      <div className="embedFramePlaylistSong row overflow-auto hiddenscrollbar">
        <ToastContainer
          position="top-right"
          autoClose={1500}
          limit={1}
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
          <div className="container-fluid">
            <div className="row">
              {songs.map((song, index) => (
                <div key={`${song.id}-${index}`} className="col-md-12 mb-3">
                  <Card
                    className="song-card-liststyle"
                    style={{ backgroundColor: "#15171c", color: "white" }}
                    onClick={() => handleSongClick(song.name, index)}
                  >
                    <Card.Body className="song-details-liststyle d-flex align-items-center">
                      <div className="col d-flex align-items-center justify-content-start" style={{ height: "100%", paddingLeft: "1vw"}}>
                        <img src={song.albumImage} style={{ height: "140%"}}/>
                      </div>
                      <div
                        className="col btw text-start"
                      >
                        <Card.Title className="whitetextbold songtitle-liststyle">
                          {song.name.replace(/^[^-]*-\s*/, "")}
                        </Card.Title>
                        <Card.Subtitle className="whitetext songartist-liststyle">
                          {song.name.split(" - ")[0]}
                        </Card.Subtitle>
                      </div>
                      <div className="col btw">
                        asd
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
  );
}

export default AllSongPlaylist;
