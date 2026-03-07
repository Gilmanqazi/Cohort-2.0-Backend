import React, { useRef, useState, useEffect } from "react"
import { useSong } from "../hooks/useSong"

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2]

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")
  return `${m}:${s}`
}

const Player = () => {

  const { songs } = useSong()

  const audioRef = useRef(null)
  const progressRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [volume, setVolume] = useState(1)
  const [showSpeed, setShowSpeed] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [songs?.url])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    isPlaying ? audio.pause() : audio.play()
    setIsPlaying(!isPlaying)
  }

  const skip = (secs) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(
      Math.max(audio.currentTime + secs, 0),
      duration
    )
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration)
  }

  const handleProgressClick = (e) => {
    const bar = progressRef.current
    const rect = bar.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const newTime = ratio * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleSpeedChange = (s) => {
    setSpeed(s)
    audioRef.current.playbackRate = s
    setShowSpeed(false)
  }

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    audioRef.current.volume = val
    setIsMuted(val === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (isMuted) {
      audio.volume = volume || 0.5
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  if (!songs) return null

  const song = songs[0]

  return (

    <div className="w-full max-w-2xl mx-auto bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-white">

      <audio
        ref={audioRef}
        src={song?.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Song Info */}

      <div className="flex items-center gap-4 mb-4">

        <img
          src={song?.posterUrl}
          alt={song?.title}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded object-cover"
        />

        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-semibold truncate">
            {song?.title}
          </h3>
          <p className="text-xs text-gray-400">
            {song?.mood}
          </p>
        </div>

      </div>

      {/* Progress Bar */}

      <div className="flex items-center gap-2 mb-4">

        <span className="text-xs">
          {formatTime(currentTime)}
        </span>

        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="flex-1 h-2 bg-zinc-700 rounded cursor-pointer relative"
        >
          <div
            className="absolute h-2 bg-white rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs">
          {formatTime(duration)}
        </span>

      </div>

      {/* Controls */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* Speed */}

        <div className="relative">

          <button
            onClick={() => setShowSpeed(!showSpeed)}
            className="px-3 py-1 bg-zinc-700 rounded text-sm"
          >
            {speed}×
          </button>

          {showSpeed && (
            <div className="absolute bottom-10 left-0 bg-zinc-800 rounded p-2 space-y-1">
              {SPEED_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSpeedChange(s)}
                  className={`block w-full text-left px-2 py-1 rounded ${
                    s === speed
                      ? "bg-zinc-600"
                      : "hover:bg-zinc-700"
                  }`}
                >
                  {s}×
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Main Controls */}

        <div className="flex items-center justify-center gap-4">

          <button onClick={() => skip(-5)}>
            ⏪
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

          <button onClick={() => skip(5)}>
            ⏩
          </button>

        </div>

        {/* Volume */}

        <div className="flex items-center gap-2">

          <button onClick={toggleMute}>
            {isMuted ? "🔇" : "🔊"}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
            className="w-20"
          />

        </div>

      </div>

    </div>
  )
}

export default Player