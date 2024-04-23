import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function AllPlaylist() {
  const [playlists, setPlaylists] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    setFetchPending(true);
    fetch("https://localhost:7106/api/Playlist/allplaylist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
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
      <div className=''>
        {isFetchPending ? (
          <div className='spinner-border'></div>
        ) : (
          <div className='d-flex flex-wrap'>
            {playlists.length === 0 ? (
              <p>No playlists available.</p>
            ) : (
                playlists.map((playlist) => (
                <div key={playlist.id} className='container p-4 mt-4 m-2 bg-dark rounded-8'>
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
};

export default AllPlaylist;