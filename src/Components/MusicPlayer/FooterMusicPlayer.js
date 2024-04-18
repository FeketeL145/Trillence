import React, { useState, useEffect, useRef } from 'react';
import './FooterMusicPlayer.css';

function FooterMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const progressBarRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef(new Audio());
  const adjustedTimeRef = useRef(null); // Ref to store the adjusted time

  // Function to fetch all song details
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

  useEffect(() => {
    fetchAllSongDetails();
  }, []);

  useEffect(() => {
    const loadAudio = async () => {
      if (tracks.length > 0) {
        const currentSong = tracks[currentTrackIndex];
        const fileName = `${currentSong.artistName} - ${currentSong.songName}`;
        const audioUrl = `https://localhost:7106/api/MusicStreaming/stream?fileName=${encodeURIComponent(fileName)}.mp3`;
        audioRef.current.src = audioUrl;
        audioRef.current.load();
      }
    };
    loadAudio();
  }, [currentTrackIndex, tracks]);

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
    if(audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === tracks.length - 1 ? 0 : prevIndex + 1));
    if(audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
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
      if(audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        if (progressBarRef.current) {
          progressBarRef.current.value = currentTime;
          progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(currentTime / duration) * 100}%`
          );
        }
      }
    };
  
    if (isPlaying && audioReady && userInteracted) {
      if(audioRef.current) audioRef.current.play();
    } else {
      if(audioRef.current) audioRef.current.pause();
    }
  
    audioRef.current.addEventListener('timeupdate', updateProgress);
  
    // Cleanup function to remove event listener
return () => {
  if (audioRef.current && audioRef.current.removeEventListener) {
    audioRef.current.removeEventListener('timeupdate', updateProgress);
  }
};
  }, [isPlaying, audioReady, userInteracted, duration]);  

  useEffect(() => {
    const handleCanPlayThrough = () => {
      setAudioReady(true);
      if (userInteracted) {
        if(audioRef.current) audioRef.current.play();
      }
    };

    audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [currentTrackIndex, tracks, userInteracted]);

  const onLoadedMetadata = () => {
    if(audioRef.current) {
      const seconds = audioRef.current.duration;
      setDuration(seconds);
      progressBarRef.current.max = seconds;
    }
  };

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


<<<<<<< HEAD
      <div className="col row">
=======
    return(
    <div className="szelesseg footer bg-dark d-flex align-items-stretch justify-content-between text-nowrap btw ">
      
      <div className="align-items-start footerdiv">
>>>>>>> 8981153f902e5aa9aaf288e854ae27dfc7e97567
        <audio
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={handleNext}
        />
        <img className="img-fluid musicThumbnail" src="https://via.placeholder.com/400" alt="music thumbnail" />
        <div className="col-8">
          <div className="row">
            <p className="text-start whitetextbold text-wrap">{tracks[currentTrackIndex].songName}</p>
          </div>
          <div className="row">
            <p className="text-start whitetext" style={{ fontSize: "12px", marginTop: "-15px" }}>{tracks[currentTrackIndex].artistName}</p>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <div className="align-items-center col footerdiv text-center text-white p-2">
        <div>
          <button onClick={handlePrevious} className='ms-2 btn'>
            <i className="fa-solid fa-backward-fast playericon" />
=======
      {/*MIDDLE*/}
      
      <div className="align-items-center row footerdiv text-center text-white btw">
        {/*CONTROLS*/}
        <div className="btw text-white">
          <button onClick={handlePrevious}>
            <i className="fa-solid fa-backward-fast playerbuttons"></i>
>>>>>>> 8981153f902e5aa9aaf288e854ae27dfc7e97567
          </button>
          <button onClick={skipBackward} className='ms-2 btn'>
            <i className="fa-solid fa-backward-step playericon" />
          </button>

<<<<<<< HEAD
          <button onClick={togglePlayPause} className='ms-2 btn'>
            {isPlaying ? (
              <i className="fa-solid fa-pause playericon" />
=======
          <button onClick={togglePlayPause}>
              {isPlaying ? <i class="fa-solid fa-pause playerbuttons"></i> : <i class="fa-solid fa-play playerbuttons"></i>}
          </button>
          <button onClick={skipForward}>
            <i className="fa-solid fa-forward-step playerbuttons"></i>
          </button>
          <button onClick={handleNext}>
            <i className="fa-solid fa-forward-fast playerbuttons"></i>
          </button>
        </div>

        {/*PROGRESS BAR*/}
        {/*NEED BUGFIX PROGRESS BAR IS OFFSET*/}
        <div className="row bg-dark text-white btw" style={{ height: '2rem', flex: 3 }}>
        <div className='col-2'>
            <span className="time current">{formatTime(timeProgress)}</span>
        </div>
        <div className='col-8 text-center'>
            <input
                type="range"
                ref={progressBarRef}
                defaultValue="0"
                onChange={handleProgressChange}
                style={{ width: '100%' }}
            />
        </div>
        <div className='col-2'>
            <span className="time">{formatTime(duration)}</span>
        </div>
    </div>


      </div>




      {/*RIGHT*/}
      <div className="align-items-end btw footerdiv">
        <div className="text-end btw volumeslider">
        <button onClick={() => setMuteVolume((prev) => !prev)}>
            {muteVolume || volume < 1 ? (
              <i className="fa-solid fa-volume-xmark playerbuttons"></i>
            ) : volume < 33 ? (
              <i className="fa-solid fa-volume-off playerbuttons"></i>
            ) : volume < 66 ? (
              <i className="fa-solid fa-volume-low playerbuttons"></i>
>>>>>>> 8981153f902e5aa9aaf288e854ae27dfc7e97567
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
          <button onClick={() => setMuteVolume((prev) => !prev)} className='btn '>
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
            className="width-100"
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            style={{
              background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
            }}
          />
        </div>
      </div>
    </div>
<<<<<<< HEAD
  );
}

=======
    )
    
}
>>>>>>> 8981153f902e5aa9aaf288e854ae27dfc7e97567
export default FooterMusicPlayer;