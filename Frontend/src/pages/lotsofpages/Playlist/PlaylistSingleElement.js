import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink, Navigate } from "react-router-dom";
import axios from "axios";
import "../../../App.css";
import PlaylistMusicPlayer from "../../../Components/MusicPlayer/PlaylistMusicPlayer";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as FaIcons from "react-icons/fa";
export function PlaylistSinglePage() {
  const { id } = useParams(); // Get the playlist ID from the URL
  const [playlistId, setPlaylistId] = useState(id); // Ensure the state is initialized
  const [Playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [isFetchPendingplaylist, setFetchPendingplaylist] = useState(false);
  const [isFetchPendingsongs, setFetchPendingsongs] = useState(false);
  const [Ismodifying, setIsmodifying] = useState(false);
  const [AreYouSureToDelete, setAreYouSureToDelete] = useState(false);
  const [EmptyPlaylistName, setEmptyPlaylistName] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const notify = (message) => {
    toast.info(`${message}`, {
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
    setFetchPendingplaylist(true);
    axios
      .get(
        `https://localhost:7106/api/Connection/playlistdetailsby/${playlistId}`
      )
      .then((response) => {
        setPlaylist(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setFetchPendingplaylist(false);
      });
  }, [playlistId]);

  useEffect(() => {
    setFetchPendingsongs(true);
    axios
      .get("https://localhost:7106/api/Connection/allsongdetails")
      .then((response) => {
        setSongs(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setFetchPendingsongs(false);
      });
  }, []);

  const handleAddSong = async (songId, playlistId) => {
    try {
      const response = await axios.post(
        "https://localhost:7106/api/Playlistsong/playlistsong",
        {
          playlistId: playlistId,
          songId: songId,
        }
      );
      console.log(response.data); // itt a válasz megjelenítése vagy további műveletek
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteSong = async (songId, playlistId) => {
    try {
      const response = await axios.delete(
        `https://localhost:7106/api/Playlistsong/deletebyid/${playlistId}/${songId}`
      );
      setSongs((songs) => songs.filter((song) => song.songId !== songId));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlayPlaylist = () => {
    if (Playlist.songs.length === 0) {
      notify("Playlist is empty\nAdd songs to play."); // Call the notify function when there are no songs
    } else {
      setIsPlayerVisible(true); // Show the player when there are songs
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      const response = await axios.delete(
        `https://localhost:7106/api/Playlist/deletebyid/${playlistId}`
      );
      console.log(response.data);

      // Display toast message
      toast.success(
        `Playlist ${response.data.name} successfully deleted.\nRedirecting...`
      );

      // Set a delay of 3 seconds before redirecting
      setTimeout(() => {
        window.location.href = "/playlists";
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const handleBack = () => {
    window.location.href = "/playlists";
  };
  const handleModifyPlaylistName = async (newName) => {
    try {
      if (!newName.trim()) {
        console.log("A playlist name cannot be empty.");
        setEmptyPlaylistName(true);
        return;
      }
      const response = await axios.put(
        `https://localhost:7106/api/Playlist/updatebyid/${playlistId}`,
        {
          name: newName,
          userId: Playlist.userId,
        }
      );
      console.log(response.data); // itt a válasz megjelenítése vagy további műveletek
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5 m-auto text-center content">
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
      {isFetchPendingplaylist || !Playlist ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <div
            className="card col-sm-8 d-inline-block p-2"
            style={{
              borderRadius: "20px",
              backgroundColor: "rgba(50, 50, 50, 0.5)",
              backdropFilter: "blur(10px)",
              color: "white",
            }}
          >
            <div className="card-body">
              {Ismodifying ? (
                <form
                className="mb-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleModifyPlaylistName(
                      e.target.elements.playlistName.value
                    );
                  }}
                >
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder={Playlist.playlistName}
                    name="playlistName"
                  />
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                </form>
              ) : (
                <p className="whitetextbold">{Playlist.playlistName}</p>
              )}
              {EmptyPlaylistName ? (
                <card>
                  <p>Playlist name cannot be empty.</p>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEmptyPlaylistName(false)}
                  >
                    Close
                  </button>
                </card>
              ) : (
                <div></div>
              )}
              {AreYouSureToDelete ? (
                <div
                  className="card row justify-content-center align-items-center p-2"
                  style={{
                    backgroundColor: "rgba(50, 50, 50, 0)",
                    color: "white",
                    border: "none",
                  }}
                >
                  <p>Are you sure you want to delete this playlist?</p>
                  <div className="col-6">
                    <button
                      type="button"
                      className="col m-2 btn btn-danger"
                      onClick={() => handleDeletePlaylist(Playlist.playlistId)}
                    >
                      Sure, delete it
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="col m-2 btn btn-secondary"
                      onClick={() => setAreYouSureToDelete(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <div className="row">
                <button
                  type="button"
                  className="btn btn-outline-success col ms-2"
                  onClick={handlePlayPlaylist}
                >
                  <i className="bi bi-plus-circle"></i> Play this playlist
                </button>

                <button
                  type="button"
                  className="btn btn-outline-primary col ms-2"
                  onClick={() => setIsmodifying(!Ismodifying)}
                >
                  <i className="bi bi-pencil-square"></i> Modify
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger col ms-2"
                  onClick={() => setAreYouSureToDelete(!AreYouSureToDelete)}
                >
                  <i className="bi bi-trash3"></i> Delete
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary col ms-2"
                  onClick={handleBack}
                >
                  <i className="bi bi-arrow-left"></i> Back
                </button>
              </div>
            </div>
          </div>

          {/*Listában lévő zenék*/}
          <div className="row whitetext rounded-2 mt-4" style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(50, 50, 50, 0.5)"}}>
            <p className="whitetextbold" style={{ fontSize:"3vh"}}>Songs in this playlist:</p>
            {isFetchPendingplaylist ? (
              <div className="spinner-border"></div>
            ) : (
              <div className="d-flex flex-wrap proba1 hiddenscrollbar justify-content-center align-items-center">
                {Playlist && Playlist.songs ? (
                  Playlist.songs.length === 0 ? (
                    <p className="whitetext">No songs in this playlist.</p>
                  ) : (
                    Playlist.songs.map((song) => (
                      <div
                        key={song.songId}
                        className="container p-4 mt-4 m-2 rounded-8 whitetext"
                      >
                        <div className="card-body">
                          <h5 className="card-title">{song.songName}</h5>
                          <p className="card-text">{song.artist}</p>
                          <button
                          className="btn btn-danger"
                            onClick={() =>
                              handleDeleteSong(song.songId, playlistId)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  <p>Loading...</p> // Handling the case where Playlist might be null or undefined
                )}
              </div>
            )}
          </div>
          {/*Hozzáadni új zenéket*/}
          <div>
            <div className="">
              {isFetchPendingsongs ? (
                <div className="spinner-border"></div>
              ) : (
                <div className="d-flex row flex-nowrap overflow-auto hiddenscrollbar">
                  {songs.map((album) =>
                    album.songs.map((song) => (
                      <div
                        key={song.songId}
                        className="songcard card p-4 mt-4 ms-2 bg-dark rounded-8 whitetext"
                        style={{ maxWidth: "25%" }}
                      >
                        <div className="card-body" style={{ color: "white" }}>
                          <h5 className="card-title">{song.songName}</h5>
                          <p className="card-text">
                            {album.mainArtist.artistName}
                          </p>
                          <button
                          className="btn btn-outline-success"
                          style={{ color: "white" }}
                            onClick={() =>
                              handleAddSong(song.songId, Playlist.playlistId)
                            }
                          >
                            <FaIcons.FaPlus/> Add song to playlist
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          {isPlayerVisible && <PlaylistMusicPlayer playlistId={playlistId} />}
        </div>
      )}
    </div>
  );
}

export default PlaylistSinglePage;