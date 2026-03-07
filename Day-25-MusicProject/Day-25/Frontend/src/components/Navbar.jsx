import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-20 w-full  bg-white/20 backdrop-blur-md)'>
    <nav className='h-full flex justify-center items-center gap-10 font-bold text-[0.9rem]'>
      <h4>Home</h4>
      <h4>Features</h4>
      <h4>About</h4>
      <Link className='py-2 px-4 bg-red-700 rounded-2xl hover:scale-95 transition-all 0.5s ease-in-out' to="/uploadSong">Upload Song</Link>
    </nav>
  </div>
  )
}

export default Navbar