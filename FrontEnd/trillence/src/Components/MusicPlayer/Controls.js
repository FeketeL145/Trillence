import { useState, useEffect, useRef, useCallback } from 'react';

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  handleNext,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

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

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <div className="controls-wrapper">
      <div className="controls">
          <button onClick={handlePrevious}>
            <i class="bi bi-skip-start-fill"></i>
          </button>
          <button onClick={skipBackward}>
            <i class="bi bi-skip-backward-fill"></i>
          </button>

          <button onClick={togglePlayPause}>
            {isPlaying ? <i class="bi bi-pause-circle-fill"></i> : <i class="bi bi-skip-end-circle-fill"></i>}
          </button>
          <button onClick={skipForward}>
            <i class="bi bi-skip-forward-fill"></i>
          </button>
          <button onClick={handleNext}>
            <i class="bi bi-skip-end-fill"></i>
          </button>
        </div>
        <div className="volume">
          <button onClick={() => setMuteVolume((prev) => !prev)}>
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
            onChange={(e) => setVolume(e.target.value)}
            style={{
              background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
            }}
          />
        </div>
      </div>
  );
};

export default Controls;
