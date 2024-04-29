import React, { useState, useEffect, useRef } from 'react';
import './FooterMusicPlayer.css';
import axios from "axios";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
function PlaylistMusicPlayer({ selectedSong, playlistId }) {
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
  const [currentSongDetails, setCurrentSongDetails] = useState({ artistName: '', songName: '', albumName: '' });
  const [albumImage, setAlbumImage] = useState('https://via.placeholder.com/650');
  const audioRef = useRef(new Audio());
  const adjustedTimeRef = useRef(null);
  const [PhoneFullScreen, setPhoneFullScreen] = useState(false);
  const fetchAllSongDetails = async () => {
    try {
      const response = await fetch('https://localhost:7106/api/Connection/allsongdetails');
      if (!response.ok) {
        throw new Error('Failed to fetch all song details');
      }
      const data = await response.json();
      const songDetails = data.flatMap(album =>
        album.songs.map(song => ({
          artistName: album.mainArtist.artistName,
          songName: song.songName,
          albumName: album.albumName
        }))
      );
      setTracks(songDetails);
    } catch (error) {
      console.error('Error fetching all song details:', error);
    }
  };

  const fetchCurrentSongDetails = async () => {
    try {
      const response = await fetch(`https://localhost:7106/api/MusicStreaming/currentplaylist/${playlistId}/details`);
      if (!response.ok) {
        throw new Error('Failed to fetch current song details');
      }
      const data = await response.json();
      setCurrentSongDetails(data);
    } catch (error) {
      console.error('Error fetching current song details:', error);
    }
  };

  useEffect(() => {
    fetchAllSongDetails();
    fetchCurrentSongDetails();
  }, []);

  useEffect(() => {
    const fetchAlbumImage = async () => {
      try {
        const albumName = currentSongDetails.albumName; // Get the current album name
        const response = await fetch(`https://localhost:7106/AlbumImage/${albumName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch album image');
        }
        const imageBlob = await response.blob(); // Fetch the image
        const objectUrl = URL.createObjectURL(imageBlob); // Create a URL for the image
        setAlbumImage(objectUrl); // Update the state with the new image URL
      } catch (error) {
        console.error('Error fetching album image:', error);
        setAlbumImage('https://via.placeholder.com/650'); // Fallback image in case of error
      }
    };

    if (currentSongDetails.albumName) {
      fetchAlbumImage(); // Fetch the album image when the song changes
    }
  }, [currentSongDetails]);

  useEffect(() => {
    if (userInteracted) {
      const loadAudio = async () => {
        try {
          const response = await fetch(`https://localhost:7106/api/MusicStreaming/playlist/${playlistId}/current`);
          if (!response.ok) {
            throw new Error('Failed to load audio file');
          }
          const audioBlob = await response.blob();
          const objectUrl = URL.createObjectURL(audioBlob);
          audioRef.current.src = objectUrl;
          audioRef.current.load();
        } catch (error) {
          console.error('Error loading audio:', error);
        }
      };
      loadAudio();
    }
  }, [currentTrackIndex, tracks, userInteracted]);

  const loadAudio = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to load audio file');
      }
      const audioBlob = await response.blob();
      const objectUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = objectUrl;
      audioRef.current.load();
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  useEffect(() => {
    const loadAudioByURL = async () => {
      if (selectedSong !== '') {
        try {
          // Construct the URL for fetching audio
          const encodedFileName = encodeURIComponent(selectedSong) + '.mp3';
          const audioUrl = `https://localhost:7106/api/MusicStreaming/stream?fileName=${encodedFileName}`;
          const response = await fetch(audioUrl);
          if (!response.ok) {
            throw new Error('Failed to load audio file');
          }
          const audioBlob = await response.blob();
          const objectUrl = await URL.createObjectURL(audioBlob);
          audioRef.current.src = objectUrl;
          await audioRef.current.load();

          // Fetch song details by name
          const songDetailsResponse = await fetch(`https://localhost:7106/api/Connection/songdetailsbyname/${selectedSong}`);
          if (!songDetailsResponse.ok) {
            throw new Error('Failed to fetch song details');
          }
          const songDetailsData = await songDetailsResponse.json();

          // Update song details in state
          setCurrentSongDetails({
            artistName: songDetailsData.mainArtist.artistName,
            songName: songDetailsData.songName,
            albumName: songDetailsData.albumName
          });

          // Fetch album image
          const albumImageResponse = await fetch(`https://localhost:7106/AlbumImage/${encodeURIComponent(songDetailsData.albumName)}`);
          if (!albumImageResponse.ok) {
            throw new Error('Failed to fetch album image');
          }
          const albumImageBlob = await albumImageResponse.blob();
          const albumImageObjectUrl = URL.createObjectURL(albumImageBlob);
          setAlbumImage(albumImageObjectUrl);
        } catch (error) {
          console.error('Error loading audio:', error);
        }
      }
    };
    loadAudioByURL();
  }, [selectedSong]);

  const togglePlayPause = () => {
    if (!userInteracted) {
      setUserInteracted(true);
    }

    if (audioReady && adjustedTimeRef.current !== null) {
      audioRef.current.currentTime = adjustedTimeRef.current;
      adjustedTimeRef.current = null;
    }

    setIsPlaying((prev) => !prev); // Toggle the playing state
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15; // Skip forward by 15 seconds
      if (isPlaying === false) {
        audioRef.current.pause(); // If it was paused, pause it again
        togglePlayPause();
      }
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 5; // Skip backward by 5 seconds
      if (isPlaying === false) {
        audioRef.current.pause(); // If it was paused, pause it again
        togglePlayPause();
      }
    }
  };

  const handlePrevious = async () => {
    if (isPlaying === false) {
      audioRef.current.pause(); // If it was paused, pause it again
      togglePlayPause();
    }
      await loadAudio(`https://localhost:7106/api/MusicStreaming/playlist/${playlistId}/previous`);
      await fetchCurrentSongDetails();
  };

  const handleNext = async () => {
    if (isPlaying === false) {
      audioRef.current.pause(); // If it was paused, pause it again
      togglePlayPause();
    }
      await loadAudio(`https://localhost:7106/api/MusicStreaming/playlist/${playlistId}/next`);
      await fetchCurrentSongDetails();
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    adjustedTimeRef.current = newTime; // Store the adjusted time
    setTimeProgress(newTime);
  };

  const handleProgressMouseUp = () => {
    if (userInteracted) {
      setIsPlaying(true); // Resume playback if it was playing
      if (adjustedTimeRef.current !== null) {
        if (audioRef.current) audioRef.current.currentTime = adjustedTimeRef.current; // Set playback to adjusted time
        adjustedTimeRef.current = null; // Reset adjusted time after use
      }
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);

        if (progressBarRef.current) {
          progressBarRef.current.value = currentTime;
          progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(currentTime / duration) * 100}%`
          );
        }

        if (audioReady && currentTime >= duration) {
          handleNext(); // Automatically play the next song
          fetchCurrentSongDetails(); // Fetch details for the new song
        }
      }
    };

    const handleCanPlayThrough = () => {
      setAudioReady(true);
      if (userInteracted) {
        if (audioRef.current) audioRef.current.play();
      }
    };

    const onLoadedMetadata = () => {
      if (progressBarRef.current) {
        if (audioRef.current) {
          const seconds = audioRef.current.duration;
          setDuration(seconds);
          progressBarRef.current.max = seconds;
        }
      }
    };

    if (isPlaying && audioReady && userInteracted) {
      if (audioRef.current) audioRef.current.play();
    } else {
      if (audioRef.current) audioRef.current.pause();
    }

    // Add event listeners to audio element
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
      audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
    }

    return () => {
      // Cleanup when component unmounts or effect re-renders
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
        audioRef.current.removeEventListener('loadedmetadata', onLoadedMetadata);
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
    return '00:00';
  };

  // Render only when tracks are available
  if (tracks.length === 0) {
    return null; // or render a loading indicator
  }

 return (
    <div className="musicPlayer">
      <BrowserView className=" d-flex align-items-stretch justify-content-between text-nowrap">
        <div className="col row">
          <img className="img-fluid musicThumbnail" src={albumImage} alt="Music thumbnail" />
          <div className="col-8">
            <div className="row">
              <p className="text-start whitetextbold text-wrap">{currentSongDetails.songName}</p>
            </div>
            <div className="row">
              <p className="text-start whitetext" style={{ fontSize: "12px", marginTop: "-15px" }}>{currentSongDetails.artistName}</p>
            </div>
          </div>
        </div>

        <div className="align-items-center col footerdiv text-center text-white p-2">
          <div>
            <button onClick={handlePrevious} className='ms-2 btn'>
              <i className="fa-solid fa-backward-fast playericon" />
            </button>
            <button onClick={skipBackward} className='ms-2 btn'>
              <i className="fa-solid fa-backward-step playericon" />
            </button>
            <button onClick={togglePlayPause} className='ms-2 btn'>
              {isPlaying ? (
                <i className="fa-solid fa-pause playericon" />
              ) : (
                <i className="fa-solid fa-play playericon" />
              )}
            </button>
            <button onClick={skipForward} className='ms-2 btn'>
              <i className="fa-solid fa-forward-step playericon" />
            </button>
            <button onClick={handleNext} className='ms-2 btn'>
              <i className="fa-solid fa-forward-fast playericon " />
            </button>
          </div>

          <div className="row text-white" style={{ height: '2rem', flex: 3 }}>
            <div className="col-2">
              <span className="time current">{formatTime(timeProgress)}</span>
            </div>
            <div className="col-8 text-center">
              <input
                type="range"
                ref={progressBarRef}
                defaultValue="0"
                onChange={handleProgressChange}
                onMouseUp={handleProgressMouseUp}
                style={{ width: '100%' }}
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
              className='btn '
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
              className="volume-slider"
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
      </BrowserView>
      <MobileView className=" d-flex align-items-stretch justify-content-between text-nowrap">
        {PhoneFullScreen ? (
          <div className='row col'>
            <div className='row'>
              <button className='fa-solid fa-arrow-down playericon' onClick={() => setPhoneFullScreen(false)}></button>
            </div>
            <div className='row'>
              <img className="img-fluid musicThumbnailFullScreen" src={albumImage} alt="Music thumbnail" />
            </div>
            <div className='row'>
              <input
                type="range"
                ref={progressBarRef}
                defaultValue="0"
                onChange={handleProgressChange}
                onMouseUp={handleProgressMouseUp}
                style={{ width: '100%' }}
              />
            </div>
            <div className='row'>
              <div className='col align-self-start text-start'>
                <span className="time current">{formatTime(timeProgress)}</span>
              </div>
              <div className='col align-self-end text-end'>
                <span className="time">{formatTime(duration)}</span>
              </div>
            </div>
            <div className='row'>
              <button onClick={handlePrevious} className='ms-2 btn col'>
                <i className="fa-solid fa-backward-fast playericon" />
              </button>
              <button onClick={skipBackward} className='ms-2 btn col'>
                <i className="fa-solid fa-backward-step playericon" />
              </button>
              <button onClick={togglePlayPause} className='ms-2 btn col'>
                {isPlaying ? (
                  <i className="fa-solid fa-pause playericon" />
                ) : (
                  <i className="fa-solid fa-play playericon" />
                )}
              </button>
              <button onClick={skipForward} className='ms-2 btn col'>
                <i className="fa-solid fa-forward-step playericon" />
              </button>
              <button onClick={handleNext} className='ms-2 btn col'>
                <i className="fa-solid fa-forward-fast playericon " />
              </button>
            </div>
          </div>
        ) : (
          <div className="row col">
            <img className="img-fluid musicThumbnail" src={albumImage} alt="Music thumbnail" />
            <div className="col">
              <div className="row">
                <p className="text-start whitetextbold">{currentSongDetails.songName}</p>
              </div>
              <div className="row">
                <p className="text-start whitetext" style={{ fontSize: "12px", marginTop: "-15px" }}>{currentSongDetails.artistName}</p>
              </div>
            </div>
            <div className='col'>
              <button onClick={togglePlayPause} className='ms-2 btn'>
                {isPlaying ? (
                  <i className="fa-solid fa-pause playericon" />
                ) : (
                  <i className="fa-solid fa-play playericon" />
                )}
              </button>
              <button className='fa-solid fa-arrow-up btn' onClick={() => setPhoneFullScreen(true)}></button>
            </div>
          </div>
        )}

      </MobileView>
    </div>
  );
}

export default PlaylistMusicPlayer;