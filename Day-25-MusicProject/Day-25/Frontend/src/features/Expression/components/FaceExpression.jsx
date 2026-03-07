import { useEffect, useRef, useState } from "react"
import { detect, init } from "../utils/utils"
import Fetched from "../../home/components/Fetched"
import Navbar from "../../../components/Navbar"

export default function FaceExpression({ onClick = () => {} }) {

  const videoRef = useRef(null)
  const landmarkerRef = useRef(null)
  const animationRef = useRef(null)
  const streamRef = useRef()

  const [expression, setExpression] = useState("Detecting...")

  useEffect(() => {

    init({ landmarkerRef, videoRef, streamRef })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      if (landmarkerRef.current) {
        landmarkerRef.current.close()
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop())
      }
    }

  }, [])


  async function handleClick() {
    const expression = detect({ landmarkerRef, videoRef, setExpression })
    onClick(expression)
  }

  return (

    <div className="min-h-screen w-full px-3 py-4">

      {/* Layout */}

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Camera Section */}

        <div className="bg-zinc-800 rounded-lg p-4 w-full lg:w-[260px] flex flex-col items-center">

          <video
            ref={videoRef}
            className="w-full max-w-[220px] rounded"
            playsInline
          />

          <h2 className="mt-4 bg-emerald-700 px-4 py-1 rounded text-sm font-mono">
            {expression}
          </h2>

          <button
            onClick={handleClick}
            className="mt-4 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded text-sm transition"
          >
            Detect Expression
          </button>

        </div>

        {/* Songs Section */}

        <div className="flex-1">
          <Fetched />
        </div>

      </div>

    </div>
  )
}