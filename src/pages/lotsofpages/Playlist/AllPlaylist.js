import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import LoadingComponent from "../../../Components/LoadingComponent.js";
import "./Playlist.css";

function getUsernameFromTokenCookie() {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

  if (tokenCookie) {
    const token = tokenCookie.split("=")[1];
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.name;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  return null;
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

  const handleCreatePlaylist = () => {
    const username = getUsernameFromTokenCookie();
    if (username) {
      if (newPlaylistName.length < 3) {
        alert("Playlist name must contain at least 3 characters.");
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
    <div>
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
          style={{
            color: "white",
            backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            marginTop: "-2%",
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
        <div className="d-flex flex-wrap">
          {playlists.map((playlist) => (
            <NavLink className="playlistcard m-2" to={`/playlist/${playlist.id}`}>
              <div key={playlist.id}>
                <div className="card-body">
                  <h5
                    className="card-title whitetext"
                    style={{ color: "white" }}
                  >
                    {playlist.name}
                  </h5>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllPlaylist;
