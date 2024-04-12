import { useState, useEffect, useRef, useCallback } from 'react';


function FooterMusicPlayer () {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(60);
    const [muteVolume, setMuteVolume] = useState(false);
    return(
    <div style={{ minHeight: 'calc(100vh - 100px)', overflowY: 'auto' }} className="d-flex d-flex align-items-stretch justify-content-between btw">
        <div className="align-items-start btw">
            CurrentSong
        </div>
        <div className="align-items-center btw">
            <div className="controls">
            <button /*onClick={handlePrevious}*/>
                <i class="bi bi-skip-start-fill"></i>
            </button>
            <button /*onClick={skipBackward}*/>
                <i class="bi bi-skip-backward-fill"></i>
            </button>

            <button /*onClick={togglePlayPause}*/>
                {isPlaying ? <i class="bi bi-pause-circle-fill"></i> : <i class="bi bi-skip-end-circle-fill"></i>}
            </button>
            <button /*onClick={skipForward}*/>
                <i class="bi bi-skip-forward-fill"></i>
            </button>
            <button /*onClick={handleNext}*/>
                <i class="bi bi-skip-end-fill"></i>
            </button>
            </div>
            <div className="progress">
                <span className="time current"></span>
                <input
                    type="range"
                    //ref={progressBarRef}
                    defaultValue="0"
                    //onChange={handleProgressChange}
                />
                <span className="time"></span>
            </div>
        </div>
        <div className="align-items-end btw">
            <div className="volume">
            <button //onClick={() => setMuteVolume((prev) => !prev)}
            >
                {muteVolume || volume < 1 ? (
                <i class="bi bi-volume-mute-fill"></i>
                ) : volume < 33 ? (
                <i class="bi bi-volume-off-fill"></i>
                ) : volume < 66 ? (
                <i class="bi bi-volume-down-fill"></i>
                ) : (
                <i class="bi bi-volume-up-fill"></i>
                )}
            </button>
            <input
                type="range"
                min={0}
                max={100}
                value={volume}
                //onChange={(e) => setVolume(e.target.value)}
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
const ProgressBar = ({
  progressBarRef,
  audioRef,
  timeProgress,
  duration,
}) => {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
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

  return (
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
  );
};

export default ProgressBar;

*/