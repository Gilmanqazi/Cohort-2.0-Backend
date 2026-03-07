import React from 'react'
import { useNavigate } from 'react-router-dom'


const AuthPage = () => {

  const navigate = useNavigate()

  return (
    <div className='h-screen w-full bg-black flex justify-center items-center '>
    <div className='h-[33rem] w-[22rem] object-cover object-center bg-[url("https://images.unsplash.com/photo-1762571944746-de332cab1e57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBvcnRyYWl0JTIwYmx1cnJ5JTIwaW1nJTIwcGVyc29ufGVufDB8fDB8fHww")] rounded-3xl'>

<div className='flex pt-30 justify-center gap-1 items-center'>
<img width="50" height="50" src="https://img.icons8.com/ios/50/aipods-pro-max.png" alt="aipods-pro-max"/>
<h1 className='font-medium text-[1.5rem] '>VibeSense</h1>
</div>

<p className='text-center pt-9  font-medium'>Never Lost. Discover New Music.</p>

<div className='flex gap-5 flex-col justify-center items-center pt-10'>
<button onClick={()=>{navigate("/register")}} className='py-2 px-5 w-2xs bg-emerald-500 text-white font-medium rounded-full active:scale-75 transition-all ease-in 0.5s '>SING UP</button>
<button onClick={()=>{navigate("/login")}} className='py-2 px-5 w-2xs bg-[#333] text-white font-medium rounded-full active:scale-75 transition-all ease-in 0.5s '>LOG IN</button>
</div>


    </div>
  </div>
  )
}

export default AuthPage