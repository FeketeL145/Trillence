import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../../../App.css";
import Search from "../../../Components/Search";
export function PlaylistSinglePage() {
    const param = useParams();
    const playlistId = param.id;
    const [Playlist, setPlaylist] = useState(null);
    const [songs, setSongs] = useState([]);
    const [isFetchPendingplaylist, setFetchPendingplaylist] = useState(false);
    const [isFetchPendingsongs, setFetchPendingsongs] = useState(false);

    //It gets the playlistid and the songs for it
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
        const fetchData = async () => {
            try {
                setFetchPendingsongs(true);
                const response = await fetch("https://localhost:7106/api/Connection/allsongdetails", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                });
                const songsData = await response.json();
                setSongs(songsData);
            } catch (error) {
                console.log(error);
            } finally {
                setFetchPendingsongs(false);
            }
        };

        fetchData();
    }, []);
    /*
    const handleAddSong = (addedsong, playlistid) => {
        console.log(playlistid);
        console.log(addedsong);
    }*/
    
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
        const response = await axios.delete(`https://localhost:7106/api/Playlistsong/${playlistId}%2C%${songId}`);
        console.log(response.data);
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
                            <p>{Playlist.playlistName}</p>
                            <div>
                                <NavLink to={`/PlaylistDeleteById/${playlistId}`} className="p-2">
                                    <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i> Delete</button>
                                </NavLink>
                                <NavLink to={`/Modify-Playlists/${playlistId}`} className="p-2">
                                    <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil-square"></i> Modify</button>
                                </NavLink>
                                <NavLink to={`/playlists`} className="p-2">
                                    <button type="button" className="btn btn-outline-secondary"><i className="bi bi-arrow-left"></i> Back</button>
                                </NavLink>
                            </div>

                        </div>
                    </div>

                    {/*Listában lévő zenék*/}
                    <div className=''>
                        <p>Listában lévő zenék</p>
                        {isFetchPendingplaylist ? (
                            <div className='spinner-border'></div>
                        ) : (
                            <div className='d-flex flex-wrap proba1'>
                                {Playlist.length === 0 ? (
                                    <p>No playlists available.</p>
                                ) : (
                                    Playlist.songs.map((Playlist) => (
                                        <div key={Playlist.id} className='container p-4 mt-4 m-2 bg-dark rounded-8'>
                                            <div className="card-body">
                                                <h5 className="card-title">{Playlist.songName}</h5>
                                                <p className="card-text">{Playlist.artist}</p>
                                                <button onClick={() => handleDeleteSong(Playlist.songId, Playlist.playlistId)}>Delete</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    <Search />
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

                </div>
            )}
        </div>
    );
}

export default PlaylistSinglePage;


/*
import React, { useEffect, useState } from "react";

function AllSongs({ onSongSelect }) {
  const [songs, setSongs] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchPending(true);
        const response = await fetch("https://localhost:7106/api/Connection/allsongdetails", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
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

  const handleSongClick = (song, album) => {
      const songName = `${album.mainArtist.artistName} - ${song.songName}`;
      onSongSelect(songName);
  };

  return (
    <div>
      <div className="">
        {isFetchPending ? (
          <div className="spinner-border"></div>
        ) : (
          <div className="d-flex row flex-nowrap overflow-auto hiddenscrollbar">
            {songs.map((album) =>
              album.songs.map((song) => (
                <div key={song.songId} className="songcard card p-4 mt-4 bg-dark rounded-8" style={{ maxWidth: "25%" }}>
                  <button onClick={() => handleSongClick(song, album)}>
                    <div className="card-body">
                      <h5 className="card-title">{song.songName}</h5>
                      <p className="card-text">{album.mainArtist.artistName}</p>
                    </div>
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllSongs;


*/