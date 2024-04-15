import { useState, useEffect, useRef, useCallback } from 'react';
import { tracks } from './data/tracks';


function FooterMusicPlayer () {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const progressBarRef = useRef();
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(
    tracks[trackIndex]
  );
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const playAnimationRef = useRef();
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
    <div style={{ minHeight: 'calc(100vh - 100px)', overflowY: 'auto' }} className="d-flex d-flex align-items-stretch justify-content-between btw">

      {/* Left side */}

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

        {/* MIDDLE */}

        <div className="align-items-center btw">
            <div className="controls">
            <button onClick={handlePrevious}>
                <i className="bi bi-skip-start-fill"></i>
            </button>
            <button onClick={skipBackward}>
                <i className="bi bi-skip-backward-fill"></i>
            </button>

            <button onClick={togglePlayPause}>
                {isPlaying ? <i className="bi bi-pause-circle-fill"></i> : <i className="bi bi-skip-end-circle-fill"></i>}
            </button>
            <button onClick={skipForward}>
                <i className="bi bi-skip-forward-fill"></i>
            </button>
            <button onClick={handleNext}>
                <i className="bi bi-skip-end-fill"></i>
            </button>
            </div>
            <div className="progress">
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

        {/* RIGHT */}

        <div className="align-items-end btw">
            <div className="volume">
            <button onClick={() => setMuteVolume((prev) => !prev)}
            >
                {muteVolume || volume < 1 ? (
                <i className="bi bi-volume-mute-fill"></i>
                ) : volume < 33 ? (
                <i className="bi bi-volume-off-fill"></i>
                ) : volume < 66 ? (
                <i className="bi bi-volume-down-fill"></i>
                ) : (
                <i className="bi bi-volume-up-fill"></i>
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
    )
    
}
export default FooterMusicPlayer;