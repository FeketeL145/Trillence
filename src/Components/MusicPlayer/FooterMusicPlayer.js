import { useState, useEffect, useRef, useCallback } from 'react';
import { tracks } from './data/tracks';
import './FooterMusicPlayer.css';

function FooterMusicPlayer () {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const progressBarRef = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(
    tracks[trackIndex]
  );
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useState();
  const playAnimationRef = useState();
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  }


const skipForward = () => {
  audioRef.current.currentTime += 15;
};

const skipBackward = () => {
  audioRef.current.currentTime -= 5;
};  

const handlePrevious = () => {
  if (trackIndex === 0) {
    let lastTrackIndex = tracks.length - 1;
    setTrackIndex(lastTrackIndex);
    setCurrentTrack(tracks[lastTrackIndex]);
  } else {
    setTrackIndex((prev) => prev - 1);
    setCurrentTrack(tracks[trackIndex - 1]);
  }
};

const handleNext = () => {
  if (trackIndex >= tracks.length - 1) {
    setTrackIndex(0);
    setCurrentTrack(tracks[0]);
  } else {
    setTrackIndex((prev) => prev + 1);
    setCurrentTrack(tracks[trackIndex + 1]);
  }
};

const handleProgressChange = () => {
  audioRef.current.currentTime = progressBarRef.current.value;
};

const onLoadedMetadata = () => {
  const seconds = audioRef.current.duration;
  setDuration(seconds);
  progressBarRef.current.max = seconds;
};
const formatTime = (time) => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const formatMinutes =
      minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const formatSeconds =
      seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formatMinutes}:${formatSeconds}`;
  }
  return '00:00';
};
const repeat = () => {
  const currentTime = audioRef.current.currentTime;
  setTimeProgress(currentTime);
  progressBarRef.current.value = currentTime;
  progressBarRef.current.style.setProperty(
    '--range-progress',
    `${(progressBarRef.current.value / duration) * 100}%`
  );
};

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  });

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  });


    return(
      <div className="szelesseg footer bg-dark d-flex align-items-stretch justify-content-between text-nowrap btw ">
      
      <div className="align-items-start footerdiv">
        <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
        />

        {/*PICTURE*/}
        <div className="row">
          <div className="col-3">
          {currentTrack.thumbnail ? (
          <img src={currentTrack.thumbnail} alt="audio avatar" className='m-1 rounded' style={{width: '9vh', height: '9vh', margin: 'center'}}/>
          ) : (
          <div className="icon-wrapper">
            <span className="audio-icon">
              <i class="bi bi-question"></i>
            </span>
          </div>
        )}
          </div>
        

        {/*TITLE*/}
        <div className='col-9 text-start'>
          <div className='row'>
            <p className="text-start">{currentTrack.title}</p>
          </div>
          <div className="row text-muted">
            <p>{currentTrack.author}</p>
          </div>
        </div>
        </div>

      </div>

      {/*MIDDLE*/}
      
      <div className="align-items-center row footerdiv text-center text-white">
        {/*CONTROLS*/}
        <div className="text-white">
          <button onClick={handlePrevious}>
            <i className="fa-solid fa-backward-fast playerbuttons"></i>
          </button>
          <button onClick={skipBackward}>
          <i class="fa-solid fa-backward-step playerbuttons"></i>
          </button>

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
        <div className="row bg-dark text-white" style={{ height: '2rem', flex: 3 }}>
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
      <div className="align-items-end footerdiv">
        <div className="text-end volumeslider">
        <button onClick={() => setMuteVolume((prev) => !prev)}>
            {muteVolume || volume < 1 ? (
              <i className="fa-solid fa-volume-xmark playerbuttons"></i>
            ) : volume < 33 ? (
              <i className="fa-solid fa-volume-off playerbuttons"></i>
            ) : volume < 66 ? (
              <i className="fa-solid fa-volume-low playerbuttons"></i>
            ) : (
              <i className="fa-solid fa-volume-high playerbuttons"></i>
            )}
        </button>
        <input
            className='width-100'
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

    )
    
}
export default FooterMusicPlayer;
/*
<div style={{height: '10vh', overflowY: 'auto' }} className="d-flex d-flex align-items-stretch justify-content-between btw">



      <div className="align-items-start btw">
      <div className="card mt-5">
    <audio
      src={currentTrack.src}
      ref={audioRef}
      onLoadedMetadata={onLoadedMetadata}
      onEnded={handleNext}
    />
    <div className="audio-info">
      <div className="">
        {currentTrack.thumbnail ? (
          <img src={currentTrack.thumbnail} alt="audio avatar" style={{width: '50px', height: '50px'}}/>
        ) : (
          <div className="icon-wrapper">
            <span className="audio-icon">
              <i class="bi bi-question"></i>
            </span>
          </div>
        )}
      </div>
      <div className="text">
        <p className="title">{currentTrack.title}</p>
        <p>{currentTrack.author}</p>
      </div>
    </div>
  </div>
  </div>



  <div className="align-items-center btw">
      <div className="controls">
      <button onClick={handlePrevious}>
        <i className="fa-solid fa-backward-fast"></i>
      </button>
      <button onClick={skipBackward}>
      <i class="fa-solid fa-backward-step"></i>
      </button>

      <button onClick={togglePlayPause}>
          {isPlaying ? <i class="fa-solid fa-pause"></i> : <i class="fa-solid fa-play"></i>}
      </button>
      <button onClick={skipForward}>
        <i className="fa-solid fa-forward-step"></i>
      </button>
      <button onClick={handleNext}>
        <i className="fa-solid fa-forward-fast"></i>
      </button>
      </div>
      <div className="progress bg-dark">
        <span className="time current">{formatTime(timeProgress)}</span>
        <input
          type="range"
          ref={progressBarRef}
          defaultValue="0"
          onChange={handleProgressChange}
        />
        <span className="time">{formatTime(duration)}</span>
    </div>
  </div>



  <div className="align-items-end btw">
      <div className="volume">
      <button onClick={() => setMuteVolume((prev) => !prev)}
      >
          {muteVolume || volume < 1 ? (
            <i className="fa-solid fa-volume-xmark"></i>
          ) : volume < 33 ? (
            <i className="fa-solid fa-volume-off"></i>
          ) : volume < 66 ? (
            <i className="fa-solid fa-volume-low"></i>
          ) : (
            <i className="fa-solid fa-volume-high"></i>
          )}
      </button>
      <input
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


*/