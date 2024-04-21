import React, { useState, useEffect, useRef } from 'react';
import './FooterMusicPlayer.css';

function FooterMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [audioReady, setAudioReady] = useState(false); 
  const progressBarRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongDetails, setCurrentSongDetails] = useState({ artistName: '', songName: '' });
  const audioRef = useRef(new Audio());
  const adjustedTimeRef = useRef(null); 

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
          songName: song.songName
        }))
      );
      setTracks(songDetails);
    } catch (error) {
      console.error('Error fetching all song details:', error);
    }
  };

  const fetchCurrentSongDetails = async () => {
    try {
      const response = await fetch('https://localhost:7106/api/MusicStreaming/current/details');
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
  }, []);

  useEffect(() => {
    fetchCurrentSongDetails();
  }, [currentTrackIndex]);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const response = await fetch('https://localhost:7106/api/MusicStreaming/current');
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
  }, [currentTrackIndex, tracks]);
  
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

  const togglePlayPause = () => {
    if (!userInteracted) {
      setUserInteracted(true);
    }

    if (audioReady && adjustedTimeRef.current !== null) {
      audioRef.current.currentTime = adjustedTimeRef.current;
      adjustedTimeRef.current = null;
    }

    setIsPlaying((prev) => !prev);
  };

  const skipForward = () => {
    if(audioRef.current) audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    if(audioRef.current) audioRef.current.currentTime -= 5;
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === 0 ? tracks.length - 1 : prevIndex - 1));
    loadAudio('https://localhost:7106/api/MusicStreaming/previous');
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === tracks.length - 1 ? 0 : prevIndex + 1));
    loadAudio('https://localhost:7106/api/MusicStreaming/next');
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
        if(audioRef.current) audioRef.current.currentTime = adjustedTimeRef.current; // Set playback to adjusted time
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
    
        if (currentTime >= duration) {
          handleNext(); // Automatically play the next song
          fetchCurrentSongDetails(); // Fetch details for the new song
        }
      }
    };

    const handleCanPlayThrough = () => {
      setAudioReady(true);
      if (userInteracted) {
        if(audioRef.current) audioRef.current.play();
      }
    };

    const onLoadedMetadata = () => {
      if (progressBarRef.current) {
        if(audioRef.current) {
          const seconds = audioRef.current.duration;
          setDuration(seconds);
          progressBarRef.current.max = seconds;
        }
      }
    };    

    if (isPlaying && audioReady && userInteracted) {
      if(audioRef.current) audioRef.current.play();
    } else {
      if(audioRef.current) audioRef.current.pause();
    }

    // Add event listeners
    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
    audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);

    // Cleanup function to remove event listeners
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
        audioRef.current.removeEventListener('loadedmetadata', onLoadedMetadata);
      }
    };
  }, [userInteracted, isPlaying, duration]);

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
    <div className="playerBar w-100 h-100 d-flex align-items-stretch justify-content-between text-nowrap">
      <div className="col row">
        <img className="img-fluid musicThumbnail" src="https://via.placeholder.com/400" alt="music thumbnail" />
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
    </div>
  );
}

export default FooterMusicPlayer;