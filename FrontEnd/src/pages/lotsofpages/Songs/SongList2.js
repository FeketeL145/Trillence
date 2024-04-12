import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';

function SongList2() {
  const [songs, setSongs] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchPending(true);
        const response = await axios.get("https://localhost:7106/api/Song/allsong");
        setSongs(response.data);
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
            {songs.map((song) => (
              <div key={song.id} className='songcard card p-4 mt-4 bg-dark rounded-8' style={{ maxWidth: "25%" }}>
                <div className="card-body">
                  <NavLink to={`/SongSinglePage/${song.id}`} className="card-title">
                    <h5 className="card-title">{song.name}</h5>
                    <p className="card-text">{song.artist}</p>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SongList2;