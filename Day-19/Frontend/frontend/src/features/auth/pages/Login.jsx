import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {toast} from "react-toastify"

const Login = () => {


  const {loading,handleLogin} = useAuth()


  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()


  async function handleSubmit(e){
    e.preventDefault()
 
    try{
    const users = await handleLogin(username,password)

    if (users) {
      toast.success("Login Success")
      navigate("/");
    } 
    }   
    catch(err){
      console.log(err)
      toast.error("Invalid User");
    }
  

    if(loading){
      return <h1>Loading...</h1>
    }

  }
  

  return (
    <div className='container'>
      <form className='Form' onSubmit={handleSubmit}>
<h1>Login</h1>

        <input onInput={(e)=>{setUsername(e.target.value)}} type="text" id='username' required name="username" placeholder='Enter Username' />
        <input onInput={(e)=>{setPassword(e.target.value)}} type="password" id='password' required name="password" placeholder='Enter Password' />
        <button>Login</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>

      <div className='log'>
<h1>Welcome Back! <br /></h1>
      </div>

    </div>
  )
}

export default Login