import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../App.css";
import PlaylistMusicPlayer from "../../../Components/MusicPlayer/PlaylistMusicPlayer";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as FaIcons from "react-icons/fa";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";
import LoadingComponent from "../../../Components/LoadingComponent";

export function PlaylistSinglePage() {
  const Navigate = useNavigate();
  const { id } = useParams(); // Get the playlist ID from the URL
  const [playlistId, setPlaylistId] = useState(id); // Ensure the state is initialized
  const [Playlist, setPlaylist] = useState(null);
  const [updated, setUpdated] = useState("");
  const [songs, setSongs] = useState([]);
  const [isFetchPendingplaylist, setFetchPendingplaylist] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const notify = async (message) => {
    await toast.dismiss();
    await toast.info(`${message}`, {
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
    axios
      .get("https://localhost:7106/api/Connection/allsongdetails")
      .then((response) => {
        setSongs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setFetchPendingplaylist(true);
    axios
      .get(
        `https://localhost:7106/api/Connection/playlistdetailsbyid/${playlistId}`
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
  }, [updated]);

  const handleDeleteSong = async (songId, playlistId) => {
    try {
      const response = await axios.delete(
        `https://localhost:7106/api/Playlistsong/deletebyid/${playlistId}/${songId}`
      );
      setSongs((songs) => songs.filter((song) => song.songId !== songId));
      setUpdated((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlayPlaylist = async () => {
    if (Playlist.songs.length === 0) {
      await notify("Playlist is empty\nAdd songs to play."); // Call the notify function when there are no songs
    } else {
      await setIsPlayerVisible(true); // Show the player when there are songs
    }
  };

  const handleDeletePlaylistClicked = async (playlistId) => {
    Swal.fire({
      title: "Are you sure you want to delete this playlist?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeletePlaylist(playlistId);
      }
    });
  };

  const handleDeletePlaylist = async (recievedPlaylistId) => {
    try {
      const response = await axios.delete(
        `https://localhost:7106/api/Playlist/deletebyid/${recievedPlaylistId}`
      );
      Swal.fire({
        title: "Playlist deleted!",
        text: "The playlist has been successfully deleted.",
        icon: "success",
      }).then(() => {
        Navigate("/playlists");
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleModifyPlaylistName = async (playlistId) => {
    const { value: newName } = await Swal.fire({
      title: "Enter the new playlist name",
      input: "text",
      inputPlaceholder: "Playlist name",
      showCancelButton: true,
    });
    if (newName) {
      Swal.fire({
        icon: "success",
        title: "Successfully changed playlist name",
      });
      modifyPlaylistName(newName, playlistId);
    }
  };

  const modifyPlaylistName = async (newName, playlistId) => {
    try {
      const response = await axios.put(
        `https://localhost:7106/api/Playlist/updatebyid/${playlistId}`,
        {
          name: newName,
          userId: Playlist.userId,
        }
      );
      setUpdated((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center content">
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
        <LoadingComponent />
      ) : (
        <div className="embedFrame d-flex flex-column justify-content-center align-items-center p-4">
          <div
            className="card col-sm-8 d-inline-block overflow-auto"
            style={{
              borderRadius: "20px",
              backgroundColor: "rgba(50, 50, 50, 0.5)",
              backdropFilter: "blur(10px)",
              color: "white",
            }}
          >
            <div className="card-body">
              <h2 className="whitetextbold mb-2">{Playlist.playlistName}</h2>
              <div className="row">
                <button
                  type="button"
                  className="btn btn-outline-success col ms-2 d-flex align-items-center justify-content-center"
                  onClick={handlePlayPlaylist}
                >
                  <FaIcons.FaPlayCircle className="m-1" />
                  Play this playlist
                </button>

                <button
                  type="button"
                  className="btn btn-outline-primary col ms-2 d-flex align-items-center justify-content-center"
                  onClick={() => handleModifyPlaylistName(playlistId)}
                >
                  <FaIcons.FaPencilAlt className="m-1" /> Rename
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger col ms-2 d-flex align-items-center justify-content-center"
                  onClick={() => handleDeletePlaylistClicked(playlistId)}
                >
                  <FaIcons.FaTrashAlt className="m-1" /> Delete
                </button>

                <NavLink
                  to={`/playlists`}
                  className="btn btn-outline-secondary col ms-2 d-flex align-items-center justify-content-center"
                >
                  <FaIcons.FaArrowLeft className="m-1" /> Back
                </NavLink>
              </div>
            </div>
          </div>

          {/*Listában lévő zenék*/}
          <div
            className="row whitetext rounded-2 mt-4 playlistSongsFrame"
            style={{
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(50, 50, 50, 0.5)",
            }}
          >
            <p className="whitetextbold" style={{ fontSize: "3vh" }}>
              Songs in this playlist:
            </p>
            {isFetchPendingplaylist ? (
              <div className="spinner-border"></div>
            ) : (
              <div className="d-flex flex-wrap hiddenscrollbar justify-content-center align-items-center btw h-100 w-100 overflow-auto" style={{paddingBottom: "5vh"}}>
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
          {isPlayerVisible && <PlaylistMusicPlayer playlistId={playlistId} />}
        </div>
      )}
    </div>
  );
}

export default PlaylistSinglePage;
