import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import Cookies from "js-cookie";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Swal from 'sweetalert2';

import LoadingComponent from "../../../Components/LoadingComponent.js";
import "./Playlist.css";
import "@sweetalert2/theme-dark/dark.css";

function getUsernameFromCookie() {
  if (Cookies.get("username") != null) {
    return Cookies.get("username");
  } else {
    return null;
  }
}

function AllPlaylist() {
  const [playlists, setPlaylists] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  useEffect(() => {
    setFetchPending(true);
    fetch("https://localhost:7106/api/Playlist/allplaylist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((playlists) => {
        setPlaylists(playlists);
      })
      .catch(console.error)
      .finally(() => {
        setFetchPending(false);
      });
  }, []);

  const handleCreatePlaylist = async () => {
    const username = getUsernameFromCookie();
    if (username) {
      if (newPlaylistName.length < 3) {
        await toast.error("Playlist name must contain at least 3 characters");
        return;
      }
      fetch("https://localhost:7106/api/Playlist/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newPlaylistName, username }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to create playlist");
          }
        })
        .then((newPlaylist) => {
          setPlaylists((prev) => [...prev, newPlaylist]);
          setNewPlaylistName("");
        })
        .catch(console.error);
    } else {
      console.error("Username not found");
    }
  };

  return (
    <div className="embedFrame">
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
      <div className="d-flex justify-content-center align-items-center mb-4">
        <div className="input-group inputgroupplaylist m-2">
          <input
            type="text"
            className="form-control playlistnamefield"
            placeholder="New playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button
            className="btn d-flex align-items-center justify-content-center createplaylistbutton"
            onClick={handleCreatePlaylist}
          >
            Create Playlist
          </button>
        </div>
      </div>

      {isFetchPending ? (
        <LoadingComponent />
      ) : playlists.length === 0 ? (
        <div
          className="embedFrame"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <p
            className="whitetext"
            style={{ fontSize: "30px", marginTop: "-9%" }}
          >
            There aren't any playlists available.
          </p>
        </div>
      ) : (
        <div className="container-fluid mt-3 embedFrame">
          <div className="row justify-content-center">
            {playlists.map((playlist) => (
              <NavLink
                className="playlistcard col-md-2 m-2"
                to={`/playlist/${playlist.id}`}
                key={playlist.id}
              >
                <div className="d-flex justify-content-center align-items-center w-100 h-100">
                  <h5 className="whitetext">{playlist.name}</h5>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllPlaylist;
