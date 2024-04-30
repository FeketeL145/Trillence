import React, { useEffect, useState } from "react";
import LoadingComponent from "../Components/LoadingComponent";
import axios from "axios";
import Cookies from "js-cookie";
import { Card } from "react-bootstrap";
import "./AllSongs.css";
import "react-toastify/dist/ReactToastify.css";
import * as FaIcons from "react-icons/fa";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";

import TextScroll from "./TextScrollComponent/TextScroll";

function AllSongs({ onSongSelect, updateSongs }) {
  const [songs, setSongs] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setHovered] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (pageNumber != 1) {
      fetchData(pageNumber);
    } else {
      fetchData(1);
    }
    updateSongs(songs);
  }, [pageNumber]);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    fetch(
      `https://localhost:7106/api/Connection/playlistdetailsbyusername/${Cookies.get(
        "username"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((playlists) => {
        const playlistDetails = playlists.map((playlist) => ({
          id: playlist.playlistId,
          name: playlist.playlistName,
          songCount: playlist.songs.length,
        }));
        setPlaylists(playlistDetails);
      })
      .catch(console.error)
      .finally(() => {
        setFetchPending(false);
      });
  };

  const loadMore = async () => {
    const nextPageNumber = (await pageNumber) + 1;
    await setPageNumber(nextPageNumber);
    await updateSongs(songs);
  };

  const fetchData = async (pageNumber) => {
    try {
      await setFetchPending(true);
      const response = await axios.get(
        `https://localhost:7106/api/Song/allsongpaginated?pageNumber=${pageNumber}`
      );
      const response2 = await axios.get(
        `https://localhost:7106/api/Song/songcount`
      );

      const newSongs = await Promise.all(
        await response.data.map(async (song) => {
          const albumName = await fetchAlbumData(song.albumId);
          let albumImage = await null;
          if (albumName) {
            albumImage = await fetchAlbumImage(albumName);
          }
          return await { ...song, albumName, albumImage };
        })
      );

      if (pageNumber === 1) {
        await setSongs(newSongs);
      } else {
        await setSongs((prevSongs) => [...prevSongs, ...newSongs]);
      }

      await setTotalItems(response2.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      await setFetchPending(false);
      await setIsLoading(false);
    }
  };
  const fetchAlbumData = async (albumId) => {
    try {
      const response = await axios.get(
        `https://localhost:7106/api/Album/albumbyid/${albumId}`
      );
      return await response.data.name;
    } catch (error) {
      console.error("Error fetching album data:", error);
      return await null;
    }
  };
  const fetchAlbumImage = async (albumName) => {
    try {
      const response = await fetch(
        `https://localhost:7106/AlbumImage/${albumName}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch album image");
      }
      const imageBlob = await response.blob();
      const objectUrl = await URL.createObjectURL(imageBlob);
      return objectUrl;
    } catch (error) {
      console.error("Error fetching album image:", error);
      return "https://via.placeholder.com/650";
    }
  };
  const handleSongClick = async (song, songindex) => {
    try {
      const songName = await `${song}`;
      const songIndex = await `${songindex}`;
      await onSongSelect(songIndex);
      /*await updateSongs(songs);*/
    } catch (error) {
      console.error("Error handling song click:", error);
    }
  };
  const handleSongAddToPlaylist = async (song, songid) => {
    try {
      const playlistOptions = {};
      playlists.forEach((playlist) => {
        playlistOptions[playlist.id] = playlist.name;
      });

      const { value: selectedPlaylist } = await Swal.fire({
        title: "Select a playlist",
        input: "select",
        inputOptions: playlistOptions,
        inputPlaceholder: "Select a playlist",
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value) {
              resolve();
            } else {
              resolve("You need to select a playlist");
            }
          });
        },
      });

      if (selectedPlaylist) {
        Swal.fire(`Song: ${song} added to playlist: ${selectedPlaylist}`);
        addSongToPlaylist(selectedPlaylist, songid);
      }
    } catch (error) {
      console.error("Error handling song addition to playlist:", error);
    }
  };
  const addSongToPlaylist = async (playlistId, songId) => {
    try {
      const response = await axios.post(
        "https://localhost:7106/api/Playlistsong/playlistsong",
        {
          playlistId: playlistId,
          songId: songId,
        }
      ); // itt a válasz megjelenítése vagy további műveletek
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="embedFrame overflow-auto">
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <div className="container-fluid mt-3">
            <div className="row">
              {songs.map((song, index) => (
                <div key={`${song.id}-${index}`} className="col-md-3 mb-4">
                  <Card
                    className="song-card d-flex align-items-center justify-content-center"
                    style={{
                      backgroundImage: `url(${
                        song.albumImage || "https://via.placeholder.com/650"
                      })`,
                    }}
                  >
                    <Card.Body className="song-details d-flex align-items-center justify-content-center">
                      <div
                        className="w-100 d-flex flex-column align-items-center justify-content-center"
                        style={{
                          backdropFilter: "brightness(60%) blur(10px)",
                          height: "100%",
                          borderRadius: "1vw",
                          overflow: "hidden",
                        }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                      >
                        <Card.Title
                          className="whitetextbold songtitle text-center"
                          style={{ overflow: "hidden" }}
                        >
                          {!isHovered ? (
                            song.name.replace(/^[^-]*-\s*/, "")
                          ) : (
                            <TextScroll
                              text={song.name.replace(/^[^-]*-\s*/, "")}
                            />
                          )}
                        </Card.Title>
                        <Card.Subtitle
                          className="whitetext songartist text-center"
                          style={{ overflow: "hidden" }}
                        >
                          {!isHovered ? (
                            song.name.split(" - ")[0]
                          ) : (
                            <TextScroll text={song.name.split(" - ")[0]} />
                          )}
                        </Card.Subtitle>
                        <div
                          className="d-flex align-items-center justify-content-center w-100 mt-3 cardButtonContainer"
                          style={{
                            position: "fixed",
                            bottom: 0,
                          }}
                        >
                          <FaIcons.FaPlus
                            className="cardButton col-5"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleSongAddToPlaylist(song.name, song.id)
                            }
                          />
                          <span className="col-2"></span>
                          <FaIcons.FaPlay
                            className="cardButton col-5"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSongClick(song.name, index)}
                          />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
        {!isLoading && songs.length < totalItems && (
          <div className="text-center mt-3 mb-5">
            <button
              className="btn loadmorebutton"
              onClick={loadMore}
              disabled={isFetchPending}
            >
              {isFetchPending ? (
                <span className="whitetext">Loading...</span>
              ) : (
                <span className="whitetext">Load more songs</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllSongs;
