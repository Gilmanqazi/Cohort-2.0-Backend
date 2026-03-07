import React, { useState } from "react"
import { useSong } from "../hooks/useSong"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

const UploadSong = () => {

  const { handleUploadSong } = useSong()

  const navigate = useNavigate()

  const [song, setSong] = useState(null)
  const [mood, setMood] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    handleUploadSong({
      song,
      mood
    })
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#111] text-white">

      <div className="w-[380px] bg-[#1a1a1a] p-6 rounded-lg">

        <h2 className="text-lg font-semibold mb-6">
          Upload Song
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* File Upload */}

          <div className="flex flex-col gap-2">

            <label className="text-sm text-gray-400">
              Select Audio File
            </label>

            <label className="border border-gray-600 rounded p-3 cursor-pointer hover:bg-[#222]">

              {song ? song.name : "Choose file"}

              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setSong(e.target.files[0])}
                className="hidden"
              />

            </label>

          </div>


          {/* Mood Select */}

          <div className="flex flex-col gap-2">

            <label className="text-sm text-gray-400">
              Select Mood
            </label>

            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="bg-[#222] border border-gray-600 p-2 rounded outline-none"
            >
              <option value="">Choose mood</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="surprised">Surprised</option>
              <option value="neutral">Neutral</option>
            </select>

          </div>


          {/* Upload Button */}

          <button onClick={()=>{toast.success("Song Uploaded"),navigate("/moodDetect")}}
          
            type="submit"
            className="bg-gray-700 hover:bg-gray-600 py-2 rounded mt-2"
          >
            
            Upload
          </button>

        </form>

      </div>

    </div>
  )
}

export default UploadSong