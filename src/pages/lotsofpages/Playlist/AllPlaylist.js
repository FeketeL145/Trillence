import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

function AllPlaylist() {
  const [playlists, setPlaylists] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    setFetchPending(true);
    fetch("https://localhost:7106/api/Playlist/allplaylist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((playlists) => setPlaylists(playlists))
      .catch(console.error)
      .finally(() => {
        setFetchPending(false);
      });
  }, []);

  return (
    <div>
      <div className="">
        {isFetchPending ? (
          <div
            className="embedFrame"
            style={{
              color: "white",
              backdropFilter: "blur(10px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
        ) : (
          <div className="d-flex flex-wrap">
            {playlists.length === 0 ? (
              <div
                className="embedFrame"
                style={{
                  color: "white",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="text-center">
                  <p
                    className="whitetext text-center ps-2"
                    style={{ fontSize: "30px" }}
                  >
                    No playlists available
                  </p>
                  <button className="btn btn-primary"><FaIcons.FaPlus/> Add playlist</button>
                </div>
              </div>
            ) : (
              playlists.map((playlist) => (
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
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllPlaylist;
