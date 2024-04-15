import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function AllPlaylist() {
  const [Songs, setSongs] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    setFetchPending(true);
    fetch("https://localhost:7106/api/Song/allsong", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
    })
      .then((response) => response.json())
      .then((Songs) => setSongs(Songs))
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
            {Songs.map((Songs) => (
              <div className='container p-4 mt-4 m-2 bg-dark rounded-8'>
                <div className="card-body">
                  <h5 className="card-title">{Songs.name}</h5>
                  <p className="card-text">{Songs.artist}</p>
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