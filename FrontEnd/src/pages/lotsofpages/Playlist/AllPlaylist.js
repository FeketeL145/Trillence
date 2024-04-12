import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function AllPlaylist() {
  const [Playlists, setPlaylists] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    setFetchPending(true);
    fetch("https://localhost:7106/api/Playlist/allplaylist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
    })
      .then((response) => response.json())
      .then((Playlists) => setPlaylists(Playlists))
      .catch(console.log)
      .finally(() => {
        setFetchPending(false);
      });
  }, []);
  return (
    <div>
      <div className=''>
        {isFetchPending ? (<div className='spinner-border'></div>) : (
          <div className='d-flex flex-wrap'>
            {Playlists.map((Playlists) => (
              <div className='container p-4 mt-4 m-2 bg-dark rounded-8'>
                <div className="card-body">
                  <h5 className="card-title">{Playlists.name}</h5>
                  <p className="card-text">{Playlists.artist}</p>
                </div>
              </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default AllPlaylist;