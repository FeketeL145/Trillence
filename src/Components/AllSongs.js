import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function AllSongs() {
  const [Songs, setSongs] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchPending(true);
        const response = await fetch("https://localhost:7106/api/Song/allsong", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
          },
        });
        const songsData = await response.json();
        setSongs(songsData);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchPending(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className=''>
        {isFetchPending ? (<div className='spinner-border'></div>) : (
          <div className="d-flex row flex-nowrap overflow-auto hiddenscrollbar" >
            {Songs.map((Songs) => (
              <div className='songcard card p-4 mt-4 bg-dark rounded-8' style={{ maxWidth: "25%" }}>
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
export default AllSongs;