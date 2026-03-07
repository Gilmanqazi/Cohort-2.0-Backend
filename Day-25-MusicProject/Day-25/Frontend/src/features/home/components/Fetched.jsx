import React, { useRef, useState } from "react"
import { useSong } from "../hooks/useSong"
import Player from "../components/Player"

const Fetched = () => {

  const { songs,handleSongDelete } = useSong()

  const audioRef = useRef(null)

  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const playSong = (s) => {

    setCurrentSong(s)

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }, 100)
  }

  const togglePlay = () => {

    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  if (!songs) return null

  return (

    <div className="w-full flex flex-col lg:flex-row gap-6 p-4 lg:p-6">

      {/* Song List */}

      <div className="flex-1">

        <h2 className="text-lg font-semibold mb-4">
          Songs
        </h2>

        <div className="no-scrollbar max-h-[400px] sm:max-h-[450px] lg:max-h-[550px] overflow-y-auto space-y-3">

          {songs.map((s) => (

            <div
              key={s._id}
              onClick={() => playSong(s)}
              className={`flex items-center gap-4 p-3 rounded-md cursor-pointer transition
              ${currentSong?._id === s._id ? "bg-zinc-700" : "bg-zinc-800 hover:bg-zinc-700"}`}
            >

              <img
                src={s.posterUrl}
                className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded"
              />

              <div className="flex flex-col flex-1">

                <h3 className="text-sm font-medium truncate">
                  {s.title}
                </h3>

                <p className="text-xs text-gray-400">
                  {s.mood}
                </p>
<button onClick={()=>{handleSongDelete()}}>Delete</button>
              </div>

            </div>

          ))}

        </div>

      </div>


      {/* Player Section */}

      <div className="w-full lg:w-[300px]">

        {currentSong && (

          <div className="bg-zinc-900 p-5 rounded-lg">

            <img
              src={currentSong.posterUrl}
              className="w-full h-[160px] sm:h-[180px] object-cover rounded mb-4"
            />

            <h2 className="text-base font-semibold">
              {currentSong.title}
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              {currentSong.mood}
            </p>

            <audio ref={audioRef} src={currentSong.url} />

            <button
              onClick={togglePlay}
              className="w-full bg-zinc-700 py-2 rounded hover:bg-zinc-600 transition"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

          </div>

        )}

        <div className="mt-6">
          <Player />
        </div>

      </div>

    </div>
  )
}

export default Fetched