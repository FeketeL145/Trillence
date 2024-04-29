import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

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
        <input
          type="text"
          className="form-control"
          placeholder="New playlist name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <button
          className="btn btn-primary ms-2"
          onClick={handleCreatePlaylist}
        >
          Create Playlist
        </button>
      </div>

      {isFetchPending ? (
        <div
          className="embedFrame"
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
          <div
            className="spinner-grow spinner-grow-sm m-2 text-white"
            role="status"
          ></div>
          <div
            className="spinner-grow spinner-grow-sm m-2 text-white"
            role="status"
          ></div>
          <div
            className="spinner-grow spinner-grow-sm m-2 text-white"
              role="status"
          ></div>
        </div>
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
          <p className="whitetext" style={{ fontSize: "30px", marginTop: "-9%" }}>
            There aren't any playlists available.
          </p>
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="container p-4 mt-4 m-2 bg-dark rounded-8"
            >
              <NavLink to={`/playlist/${playlist.id}`}>
                <div className="card-body">
                  <h5 className="card-title">{playlist.name}</h5>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllPlaylist;