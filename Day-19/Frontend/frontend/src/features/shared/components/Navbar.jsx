import React from 'react'
import "../components/nav.scss"
import {useNavigate }from "react-router-dom"


console.log()

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <>
  <nav className='navbar'>
    <p>insta</p>
    <button onClick={()=>{
      
      navigate("/createPost")
     
      
    }} className='button primary-button'>New Post</button>
  </nav>
  </>
  )
}

export default Navbar