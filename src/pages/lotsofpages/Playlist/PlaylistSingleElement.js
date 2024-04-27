import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../../../App.css";
import FooterMusicPlayer from "../../../Components/MusicPlayer/FooterMusicPlayer";
import PlaylistMusicPlayer from "../../../Components/MusicPlayer/PlaylistMusicPlayer";
export function PlaylistSinglePage() {
    const { id } = useParams(); // Get the playlist ID from the URL
    const [playlistId, setPlaylistId] = useState(id); // Ensure the state is initialized
    const [Playlist, setPlaylist] = useState(null);
    const [songs, setSongs] = useState([]);
    const [isFetchPendingplaylist, setFetchPendingplaylist] = useState(false);
    const [isFetchPendingsongs, setFetchPendingsongs] = useState(false);
    const [Ismodifying, setIsmodifying] = useState(false);
    const [AreYouSureToDelete, setAreYouSureToDelete] = useState(false);
    const [EmptyPlaylistName, setEmptyPlaylistName] = useState(false);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
    useEffect(() => {
        setFetchPendingplaylist(true);
        axios.get(`https://localhost:7106/api/Connection/playlistdetailsby/${playlistId}`)
            .then(response => {
                setPlaylist(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setFetchPendingplaylist(false);
            });
    }, [playlistId]);

    useEffect(() => {
        setFetchPendingsongs(true);
        axios.get("https://localhost:7106/api/Connection/allsongdetails")
            .then(response => {
                setSongs(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setFetchPendingsongs(false);
            });
    }, []);


    const handleAddSong = async (songId, playlistId) => {
        try {
            const response = await axios.post("https://localhost:7106/api/Playlistsong/playlistsong", {
                playlistId: playlistId,
                songId: songId
            });
            console.log(response.data); // itt a válasz megjelenítése vagy további műveletek
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteSong = async (songId, playlistId) => {
        try {
            const response = await axios.delete(`https://localhost:7106/api/Playlistsong/deletebyid/${playlistId}/${songId}`);
            setSongs((songs) => songs.filter(song => song.songId !== songId));
        } catch (error) {
            console.log(error);
        }
    }

    const handlePlayPlaylist = () => {
        setIsPlayerVisible(true);
      };

    const handleDeletePlaylist = async (playlistId) => {
        try {
            const response = await axios.delete(`https://localhost:7106/api/Playlist/deletebyid/${playlistId}`);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleModifyPlaylistName = async (newName) => {
        try {
            if (!newName.trim()) {
                console.log("A playlist name cannot be empty.");
                setEmptyPlaylistName(true);
                return;
            }
            const response = await axios.put(`https://localhost:7106/api/Playlist/updatebyid/${playlistId}`, {
                name: newName,
                userId: Playlist.userId
            });
            console.log(response.data); // itt a válasz megjelenítése vagy további műveletek
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPendingplaylist || !Playlist ? (
                <div className='spinner-border'></div>
            ) : (
                <div>
                    <div className="card col-sm-8 d-inline-block p-2" style={{ borderRadius: '20px', backgroundColor: '#0A2234', color: 'white' }}>
                        <div className="card-body">
                            <p>{Playlist.playlistId}</p>
                            {Ismodifying ? (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleModifyPlaylistName(e.target.elements.playlistName.value);
                                }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={Playlist.playlistName}
                                        name="playlistName"
                                    />
                                    <button type="submit" className="btn btn-success">Save</button>
                                </form>
                            ) : (
                                <p>{Playlist.playlistName}</p>
                            )}
                            <div>
                                <button type="button" className="btn btn-outline-success" onClick={handlePlayPlaylist}><i className="bi bi-plus-circle"></i>play this playlist</button>

                                <button type="button" className="btn btn-outline-primary" onClick={() => setIsmodifying(!Ismodifying)}><i className="bi bi-pencil-square"></i> Modify</button>
                                {EmptyPlaylistName ? (
                                    <card>
                                        <p>Playlist name cannot be empty.</p>
                                        <button type="button" className="btn btn-secondary" onClick={() => setEmptyPlaylistName(false)}>Close</button>
                                    </card>
                                ) : (<div></div>)}
                                <button type="button" className="btn btn-outline-danger" onClick={() => setAreYouSureToDelete(!AreYouSureToDelete)}><i className="bi bi-trash3"></i> Delete</button>
                                {/*NÁLAM NEM VOLT MODAL*/}
                                {AreYouSureToDelete ? (
                                    <div className="card row" style={{ borderRadius: '20px', backgroundColor: '#223848', color: 'white' }}>
                                        <p>Are you sure you want to delete this playlist?</p>
                                        <div className="col-6">
                                            <button type="button" className="col m-2 btn btn-danger" onClick={() => handleDeletePlaylist(Playlist.playlistId)}>Sure, delete it</button>
                                        </div>
                                        <div className="col-6">
                                            <button type="button" className="col m-2 btn btn-secondary" onClick={() => setAreYouSureToDelete(false)}>Close</button>
                                        </div>
                                    </div>
                                ) : (<div></div>)}


                                <NavLink to={`/playlists`} className="p-2">
                                    <button type="button" className="btn btn-outline-secondary"><i className="bi bi-arrow-left"></i> Back</button>
                                </NavLink>
                            </div>

                        </div>
                    </div>

                    {/*Listában lévő zenék*/}
                    <div className=''>
                        <p>Songs in this playlist</p>
                        {isFetchPendingplaylist ? (
                            <div className='spinner-border'></div>
                        ) : (
                            <div className='d-flex flex-wrap proba1 hiddenscrollbar'>
                                {Playlist && Playlist.songs ? (
                                    Playlist.songs.length === 0 ? (
                                        <p>No songs in this playlist.</p>
                                    ) : (
                                        Playlist.songs.map((song) => (
                                            <div key={song.songId} className='container p-4 mt-4 m-2 bg-dark rounded-8'>
                                                <div className="card-body">
                                                    <h5 className="card-title">{song.songName}</h5>
                                                    <p className="card-text">{song.artist}</p>
                                                    <button onClick={() => handleDeleteSong(song.songId, playlistId)}>Delete</button>
                                                </div>
                                            </div>
                                        ))
                                    )
                                ) : (
                                    <p>Loading...</p>  // Handling the case where Playlist might be null or undefined
                                )}
                            </div>
                        )}
                    </div>

                    {/*<Search />*/}
                    {/*Hozzáadni új zenéket*/}
                    <div>
                        <div className="">
                            {isFetchPendingsongs ? (
                                <div className="spinner-border"></div>
                            ) : (
                                <div className="d-flex row flex-nowrap overflow-auto hiddenscrollbar">
                                    {songs.map((album) =>
                                        album.songs.map((song) => (
                                            <div key={song.songId} className="songcard card p-4 mt-4 bg-dark rounded-8" style={{ maxWidth: "25%" }}>
                                                <div className="card-body">
                                                    <p>{song.songId}</p>
                                                    <h5 className="card-title">{song.songName}</h5>
                                                    <p className="card-text">{album.mainArtist.artistName}</p>
                                                    <button onClick={() => handleAddSong(song.songId, Playlist.playlistId)}>add this song</button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {isPlayerVisible && <PlaylistMusicPlayer playlistId={playlistId} />}
                </div>
            )}
        </div>
    );
}

export default PlaylistSinglePage;