import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";

export function SongSinglePage() {
    const param = useParams();
    const id = param.id;
    const [song, setSong] = useState(null);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get(`https://localhost:7106/api/Song/songbyid/${id}`)
            .then(response => {
                setSong(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setFetchPending(false);
            });
    }, [id]);
    
    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending || !song ? (
                <div className='spinner-border'></div>
            ) : (
                <div className="card col-sm-8 d-inline-block p-2" style={{borderRadius: '20px', backgroundColor: '#0A2234', color: 'white'}}>
                    <div className="card-body">
                        <p>{song.id}</p>
                        <p>{song.name}</p>
                        <p>{song.length}</p>
                        <p>{song.albumId}</p>
                        <p>{song.genre}</p>
                        <p>{song.album}</p>
                        <p>{song.artistSongss}</p>
                        <p>{song.playlistSongss}</p>
                        <div>
                            <NavLink to={`/Delete-Songs/${id}`} className="p-2">
                                <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i> Delete</button>
                            </NavLink>
                            <NavLink to={`/Modify-Songs/${id}`} className="p-2">
                                <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil-square"></i> Modify</button>
                            </NavLink>
                            <NavLink to={`/`} className="p-2">
                                <button type="button" className="btn btn-outline-secondary"><i className="bi bi-arrow-left"></i> Back</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SongSinglePage;