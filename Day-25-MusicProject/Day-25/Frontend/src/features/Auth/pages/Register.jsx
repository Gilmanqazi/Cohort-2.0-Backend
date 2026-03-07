import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import {toast} from "react-toastify"
import {useNavigate , Link } from "react-router-dom"


const Register = () => {

  const navigate = useNavigate()

  const {loading,handleRegister}  = useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = async (e)=>{
    e.preventDefault()
    try{
     await handleRegister(username,email,password)
      toast.success("Registration Successfull")
      navigate("/")
    }catch(err){
      console.log(err)
      toast.error("User already exist")
    }

  }

  if(loading){
    return <h1>Loading....</h1>
  }

  return (
    <div className='  h-screen w-full bg-black flex justify-center items-center '>
      <div className=' border-2 border-amber-50 h-[33rem] w-[22rem] object-cover object-center bg-[url("https://images.unsplash.com/photo-1673940551485-45fe98f90391?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cG9ydHJhaXQlMjBibHVycnl8ZW58MHx8MHx8fDA%3D")] rounded-3xl'>

<div className='flex pt-30 pl-10 gap-1 '>
<h1 className='font-medium text-[1.5rem] '>SING UP</h1>
</div>
<p className='pl-10 pt-1 font-medium'>Never Lost. Discover New Music.</p>

<div className='pt-6'>

  <form onSubmit={submitHandler} className='flex flex-col pl-10 pr-10 gap-3'>
    <input  onInput={(e)=>{setUsername(e.target.value)}} type="text" name='username' placeholder='Enter Name' className='py-2 px-5 border border-amber-50 rounded bg-[#1a1717]' />


    <input onInput={(e)=>{setEmail(e.target.value)}} type="email" name='email' placeholder='Enter Email' className='py-2 px-5 border border-amber-50 rounded bg-[#1a1717]' />


    <input  onInput={(e)=>{setPassword(e.target.value)}} type="password" name='password' placeholder='Ente Password' className='py-2 px-5 border border-amber-50 rounded bg-[#1a1717]' />

  <p className="font-medium text-xs ">Already have an account?  <Link className='text-red-700 font-bold no-underline' to="/login">Login</Link></p>

    <div className='flex gap-5 flex-col justify-center items-center pt-5'>
  <button className='py-2 px-5 w-2xs bg-emerald-500 text-white font-medium rounded-full active:scale-75 transition-all ease-in 0.5s '>CREATE ACCOUNT</button>
</div>


  </form>
</div>




      </div>
    </div>
  )
}

export default Register