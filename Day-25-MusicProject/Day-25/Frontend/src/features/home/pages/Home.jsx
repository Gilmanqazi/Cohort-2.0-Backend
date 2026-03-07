import React from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../../components/Navbar"

const Home = () => {

  const navigate = useNavigate()

  return (

    <div className='min-h-screen w-full text-white bg-[url("https://images.unsplash.com/photo-1566907526978-f6fc667b4151?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-center'>

      <Navbar />

      <div className="min-h-[85vh] flex items-center justify-center md:justify-start px-4 sm:px-8 md:px-12">

        {/* Content Card */}

        <div className="bg-black/60 backdrop-blur-sm p-6 sm:p-8 rounded-lg w-full max-w-sm sm:max-w-md">

          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            Vibe <span className="text-gray-300">Sense</span>
          </h1>

          <h3 className="text-base sm:text-lg font-medium mb-3">
            Music That Understands Your Mood
          </h3>

          <p className="text-sm text-gray-300 mb-6 leading-relaxed">
            Let AI detect your facial expressions and recommend music
            that matches your emotions instantly.
          </p>

          <button
            onClick={() => navigate("/moodDetect")}
            className="bg-zinc-700 w-full sm:w-fit px-4 py-2 rounded hover:bg-zinc-600 transition"
          >
            Detect My Mood
          </button>

          <p className="text-xs text-gray-400 mt-4">
            Get music recommendations based on your emotions.
          </p>

        </div>

      </div>

    </div>
  )
}

export default Home