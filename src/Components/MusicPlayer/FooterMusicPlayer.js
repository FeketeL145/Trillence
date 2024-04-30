import React, { useState, useEffect, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import "./FooterMusicPlayer.css";
import axios from "axios";
import { isMobile } from "react-device-detect";
import TextScroll from "../TextScrollComponent/TextScroll";
function FooterMusicPlayer({ selectedSong }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [muteVolume, setMuteVolume] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const progressBarRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [effectCounter, setEffectCounter] = useState(0);
  const [currentSongDetails, setCurrentSongDetails] = useState({
    artistName: "",
    songName: "",
    albumName: "",
  });
  const songnumber = +selectedSong;
  const [albumImage, setAlbumImage] = useState(
    "https://via.placeholder.com/650"
  );
  const audioRef = useRef(new Audio());
  const adjustedTimeRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isFullscreen, setFullscreen] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7106/api/Song/allsong`
      );
      const songList = await Promise.all(
        await response.data.map(async (song, index) => {
          let songIndex = await index;
          const albumName = await fetchAlbumData(song.albumId);
          return await { ...song, albumName, songIndex };
        })
      );
      await setTracks(songList);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const fetchCurrentSongDetails = async () => {
    try {
      const response = await fetch(
        "https://localhost:7106/api/MusicStreaming/current/details"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch current song details");
      }
      const data = await response.json();
      await setCurrentSongDetails(data);
    } catch (error) {
      console.error("Error fetching current song details:", error);
    }
  };

  useEffect(() => {
    fetchCurrentSongDetails();
  }, [selectedSong]);

  useEffect(() => {
    fetchData();
  }, []); // This effect runs only once, on component mount

  useEffect(() => {
    if (selectedSong !== -1 && currentTrackIndex >= 0) {
      // Ensure correct track index
      const handleSongSelect = async (songIndex) => {
        // Set the track index and wait for it to complete before other operations
        await setCurrentTrackIndex(songIndex);
      };
      handleSongSelect(selectedSong);
    }
  }, [selectedSong]); // Include both as dependencies

  useEffect(() => {
    if (tracks.length > 0 && currentTrackIndex < tracks.length) {
      loadAudioByURL();
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (effectCounter < 2) {
      loadAudioByURL();
      setEffectCounter(effectCounter + 1);
    }
  }, [selectedSong, tracks]);

  const loadAudioByURL = async () => {
    try {
      const songQuery = await tracks[currentTrackIndex].name;
      const encodedFileName = (await encodeURIComponent(songQuery)) + ".mp3";
      const audioUrl =
        await `https://localhost:7106/api/MusicStreaming/stream?fileName=${encodedFileName}`;
      const response = await fetch(audioUrl);
      if (!response.ok) {
        throw new Error("Failed to load audio file");
      }
      const audioBlob = await response.blob();
      const objectUrl = await URL.createObjectURL(audioBlob);
      audioRef.current.src = await objectUrl;
      await audioRef.current.load();

      // Fetch song details by name
      const songDetailsResponse = await fetch(
        `https://localhost:7106/api/Connection/songdetailsbyname/${songQuery}`
      );
      if (!songDetailsResponse.ok) {
        throw new Error("Failed to fetch song details");
      }
      const songDetailsData = await songDetailsResponse.json();

      // Update song details in state
      await setCurrentSongDetails({
        artistName: songDetailsData.mainArtist.artistName,
        songName: songDetailsData.songName.replace(/^[^-]*-\s*/, ""),
        albumName: songDetailsData.albumName,
      });
      const albumImageResponse = await fetch(
        `https://localhost:7106/AlbumImage/${encodeURIComponent(
          songDetailsData.albumName
        )}`
      );
      if (!albumImageResponse.ok) {
        throw new Error("Failed to fetch album image");
      }
      const albumImageBlob = await albumImageResponse.blob();
      const albumImageObjectUrl = await URL.createObjectURL(albumImageBlob);
      await setAlbumImage(albumImageObjectUrl);
      if (isPlaying === false) {
        await audioRef.current.pause(); // If it was paused, pause it again
        await togglePlayPause();
      }
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const togglePlayPause = async () => {
    if (!userInteracted) {
      await setUserInteracted(true);
    }

    if (audioReady && adjustedTimeRef.current !== null) {
      audioRef.current.currentTime = await adjustedTimeRef.current;
      adjustedTimeRef.current = await null;
    }

    await setIsPlaying((prev) => !prev); // Toggle the playing state
  };

  const skipForward = async () => {
    if (audioRef.current) {
      audioRef.current.currentTime += await 15; // Skip forward by 15 seconds
      if (isPlaying === false) {
        await audioRef.current.pause(); // If it was paused, pause it again
        await togglePlayPause();
      }
    }
  };

  const skipBackward = async () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= await 5; 
      if (isPlaying === false) {
        await audioRef.current.pause(); 
        await togglePlayPause();
      }
    }
  };

  const handlePrevious = async (ctIndex) => {
    if (tracks.length > 0) {
      const newIndex = (ctIndex - 1 + tracks.length) % tracks.length;
      await setCurrentTrackIndex(newIndex);
    }
  };

  const handleNext = async (ctIndex) => {
    if (tracks.length > 0) {
      const newIndex = (ctIndex + 1) % tracks.length;
      await setCurrentTrackIndex(newIndex);
    }
  };

  const handleProgressChange = async (e) => {
    const newTime = await parseFloat(e.target.value);
    adjustedTimeRef.current = await newTime; 
    await setTimeProgress(newTime);
  };

  const handleProgressMouseUp = async () => {
    if (userInteracted) {
      await setIsPlaying(true); // Resume playback
      if (adjustedTimeRef.current !== null) {
        if (audioRef.current) {
          audioRef.current.currentTime = await adjustedTimeRef.current; // Set adjusted time
        }
        adjustedTimeRef.current = null; // Reset adjusted time
      }
    }
  };

  const handleFullscreen = () => {
    setFullscreen((prev) => !prev);
  };

  useEffect(() => {
    const handleAudioPlayback = async () => {
      if (isPlaying && audioReady && userInteracted) {
        if (audioRef.current) await audioRef.current.play();
      } else {
        if (audioRef.current) await audioRef.current.pause();
      }
    };

    handleAudioPlayback();

    // Cleanup function
    return async () => {
      // Pause the audio when the component unmounts or when dependencies change
      if (audioRef.current) await audioRef.current.pause();
    };
  }, [isPlaying, audioReady, userInteracted]);

  // Effect to manage audio event listeners and playback
  useEffect(() => {
    const updateProgress = async () => {
      if (audioRef.current) {
        const currentTime = await audioRef.current.currentTime;
        await setTimeProgress(currentTime);

        if (progressBarRef.current) {
          progressBarRef.current.value = await currentTime;
          await progressBarRef.current.style.setProperty(
            "--range-progress",
            `${(currentTime / duration) * 100}%`
          );
        }

        if (audioReady && currentTime >= duration) {
          await handleNext(currentTrackIndex); // Automatically play the next song
          await fetchCurrentSongDetails(); // Fetch details for the new song
        }
      }
    };

    const handleCanPlayThrough = async () => {
      await setAudioReady(true);
      if (userInteracted) {
        if (audioRef.current) await audioRef.current.play();
      }
    };

    const onLoadedMetadata = async () => {
      if (progressBarRef.current) {
        if (audioRef.current) {
          const seconds = await audioRef.current.duration;
          await setDuration(seconds);
          progressBarRef.current.max = await seconds;
        }
      }
    };

    // Add event listeners to audio element
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
      audioRef.current.addEventListener("canplaythrough", handleCanPlayThrough);
      audioRef.current.addEventListener("loadedmetadata", onLoadedMetadata);
    }

    return () => {
      // Cleanup when component unmounts or effect re-renders
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
        audioRef.current.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
        audioRef.current.removeEventListener(
          "loadedmetadata",
          onLoadedMetadata
        );
      }
    };
  }, [isPlaying, audioReady, userInteracted, duration]); // Dependency array

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  // Render only when tracks are available
  if (tracks.length === 0) {
    return null; // or render a loading indicator
  }

  return (
    <div>
      {!isMobile ? (
        <div className=" d-flex align-items-stretch justify-content-between text-nowrap musicPlayer">
          {currentTrackIndex !== -1 ? (
            <div className="col row">
              <img
                className="img-fluid musicThumbnail"
                src={albumImage}
                alt="Music thumbnail"
              />
              <div className="col-6 songdetailsplayer">
                <div className="row">
                  <p className={`text-start whitetextbold songtitleplayer`}>
                    <TextScroll text={currentSongDetails.songName} />
                  </p>
                </div>
                <div className="row">
                  <p
                    className="text-start whitetext songartistplayer"
                    style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                  >
                    {currentSongDetails.artistName}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="col row">
              <img
                className="img-fluid musicThumbnail"
                src={albumImage}
                alt="Music thumbnail"
              />
              <div className="col-6 songdetailsplayer">
                <div className="row">
                  <p className={`text-start whitetextbold songtitleplayer`}>
                    <TextScroll text="No song selected" />
                  </p>
                </div>
                <div className="row">
                  <p
                    className="text-start whitetext songartistplayer"
                    style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                  >
                    Select a song to play
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="align-items-center col footerdiv text-center text-white p-2">
            <div>
              <button
                onClick={() => handlePrevious(currentTrackIndex)}
                className="ms-2 btn"
              >
                <i className="fa-solid fa-backward-fast playericon" />
              </button>
              <button onClick={skipBackward} className="ms-2 btn">
                <i className="fa-solid fa-backward-step playericon" />
              </button>
              <button onClick={togglePlayPause} className="ms-2 btn">
                {isPlaying ? (
                  <i className="fa-solid fa-pause playericon" />
                ) : (
                  <i className="fa-solid fa-play playericon" />
                )}
              </button>
              <button onClick={skipForward} className="ms-2 btn">
                <i className="fa-solid fa-forward-step playericon" />
              </button>
              <button
                onClick={() => handleNext(currentTrackIndex)}
                className="ms-2 btn"
              >
                <i className="fa-solid fa-forward-fast playericon " />
              </button>
            </div>

            <div className="row text-white" style={{ height: "2rem", flex: 3 }}>
              <div className="col-2">
                <span className="time current">{formatTime(timeProgress)}</span>
              </div>
              <div className="col-8 text-center">
                <input
                  type="range"
                  className="progressBar"
                  ref={progressBarRef}
                  defaultValue="0"
                  onChange={handleProgressChange}
                  onMouseUp={handleProgressMouseUp}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-2">
                <span className="time">{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-end col footerdiv p-2">
            <div className="text-end volumeslider">
              <button
                onClick={() => {
                  const newMuteStatus = !muteVolume;
                  setMuteVolume(newMuteStatus);

                  if (audioRef.current) {
                    audioRef.current.volume = newMuteStatus ? 0 : volume / 100; // Adjusts the audio volume
                  }
                }}
                className="btn "
              >
                {muteVolume || volume < 1 ? (
                  <i className="fa-solid fa-volume-xmark playericon" />
                ) : volume < 33 ? (
                  <i className="fa-solid fa-volume-off playericon" />
                ) : volume < 66 ? (
                  <i className="fa-solid fa-volume-low playericon" />
                ) : (
                  <i className="fa-solid fa-volume-high playericon" />
                )}
              </button>
              <input
                type="range"
                className="volume-slider progressBar"
                step="1"
                min="0"
                max="100"
                value={muteVolume ? 0 : volume} // Display 0 if muted
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value);

                  if (audioRef.current) {
                    audioRef.current.volume = newVolume / 100; // Adjust the audio volume
                  }

                  setVolume(newVolume);

                  // If muted, unmute when adjusting the slider
                  if (muteVolume && newVolume > 0) {
                    setMuteVolume(false); // Unmute when adjusting the volume slider
                  }
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {isFullscreen ? (
            "null"
          ) : (
            <div className="musicPlayerMobile">
              <div className="row mobileSmallContainer">
                <img
                  className="img-fluid musicThumbnail"
                  src={albumImage}
                  alt="Music thumbnail"
                />
                <div className="col" onClick={handleFullscreen}>
                  <div className="row songdetailsplayerMobile">
                    <p
                      className={`text-center whitetextbold songtitleplayerMobile`}
                    >
                      <TextScroll text={currentSongDetails.songName} />
                    </p>
                  </div>
                  <div className="row">
                    <p
                      className="text-center whitetext songartistplayerMobile"
                      style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                    >
                      {currentSongDetails.artistName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            className={
              isFullscreen
                ? "position-fullscreen musicPlayerMobileFullscreen"
                : "position-normal musicPlayerMobileFullscreen"
            }
          >
            <p
              className="closebuttonMobileFullscreen whitetext"
              onClick={handleFullscreen}
            >
              <FaIcons.FaAngleDown />
            </p>
            <div className="row thumbnailContainerMobile d-flex align-items-center justify-content-center">
              <img
                className="img-fluid musicThumbnailMobileFullscreen"
                src={albumImage}
                alt="Music thumbnail"
              />
              <div className="songdetailsplayerMobileFullscreen">
                <div className="row">
                  <p
                    className={`text-center whitetextbold songtitleplayerMobileFullscreen`}
                  >
                    <TextScroll text={currentSongDetails.songName} />
                  </p>
                </div>
                <div className="row">
                  <p
                    className="text-center whitetext songartistplayerMobileFullscreen"
                    style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                  >
                    {currentSongDetails.artistName}
                  </p>
                </div>
              </div>
            </div>

            <div className="align-items-center songcontrolsMobileFullscreen">
              <div
                className="row text-white"
                style={{ height: "2rem", flex: 3 }}
              >
                <div className="row m-0">
                  <input
                    type="range"
                    className="progressBar"
                    ref={progressBarRef}
                    defaultValue="0"
                    onChange={handleProgressChange}
                    onMouseUp={handleProgressMouseUp}
                  />
                </div>
                <div className="row m-0 mt-1">
                  <div className="col-2">
                    <span className="time current" style={{ fontSize: "1rem" }}>
                      {formatTime(timeProgress)}
                    </span>
                  </div>
                  <div className="col-8 text-center"></div>
                  <div className="col-2">
                    <span className="time" style={{ fontSize: "1rem" }}>
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <button
                  onClick={() => handlePrevious(currentTrackIndex)}
                  className="ms-2 btn"
                >
                  <FaIcons.FaFastBackward className="playericonMobileFullscreen" />
                </button>
                <button onClick={skipBackward} className="ms-2 btn">
                  <FaIcons.FaStepBackward className="playericonMobileFullscreen" />
                </button>
                <button onClick={togglePlayPause} className="ms-2 btn">
                  {isPlaying ? (
                    <FaIcons.FaPause className="playericonMobileFullscreenPlayPause" />
                  ) : (
                    <FaIcons.FaPlay className="playericonMobileFullscreenPlayPause" />
                  )}
                </button>
                <button onClick={skipForward} className="ms-2 btn">
                  <FaIcons.FaStepForward className="playericonMobileFullscreen" />
                </button>
                <button
                  onClick={() => handleNext(currentTrackIndex)}
                  className="ms-2 btn"
                >
                  <FaIcons.FaFastForward className="playericonMobileFullscreen" />
                </button>
              </div>
            </div>

            <div className="volumesliderMobileFullscreen">
              <div>
                <button
                  onClick={() => {
                    const newMuteStatus = !muteVolume;
                    setMuteVolume(newMuteStatus);

                    if (audioRef.current) {
                      audioRef.current.volume = newMuteStatus
                        ? 0
                        : volume / 100; // Adjusts the audio volume
                    }
                  }}
                  className="btn"
                >
                  {muteVolume || volume < 1 ? (
                    <FaIcons.FaVolumeMute className="playericonMobileFullscreen" />
                  ) : volume < 33 ? (
                    <FaIcons.FaVolumeOff className="playericonMobileFullscreen" />
                  ) : volume < 66 ? (
                    <FaIcons.FaVolumeDown className="playericonMobileFullscreen" />
                  ) : (
                    <FaIcons.FaVolumeUp className="playericonMobileFullscreen" />
                  )}
                </button>
                <input
                  type="range"
                  className="volume-slider progressBar"
                  step="1"
                  min="0"
                  max="100"
                  value={muteVolume ? 0 : volume} // Display 0 if muted
                  onChange={(e) => {
                    const newVolume = parseFloat(e.target.value);

                    if (audioRef.current) {
                      audioRef.current.volume = newVolume / 100; // Adjust the audio volume
                    }

                    setVolume(newVolume);

                    // If muted, unmute when adjusting the slider
                    if (muteVolume && newVolume > 0) {
                      setMuteVolume(false); // Unmute when adjusting the volume slider
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FooterMusicPlayer;
