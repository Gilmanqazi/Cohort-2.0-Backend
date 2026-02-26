import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useAuth}  from "../Hooks/useAuth"
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"



const Register = () => {

  const {loading,handleRegister} = useAuth()

  const navigate = useNavigate()

const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')



 async function handleSubmit(e){
    e.preventDefault()
try{
  await handleRegister(username,email,password)
  toast.success("Registration Success")
  navigate("/login")  
} catch(err){
  console.log(err)
toast.error("User Already Exist")
}
  }
  
  if(loading){
    return <h1>Loading.....</h1> 
 }
  

  return (
    <div className='container'>
      
      <div className='reg'>
<h1>Create Your <br />Account </h1>
      </div>

      <form className='Form' onSubmit={handleSubmit}>
        <h1>SingUp</h1>
    
        <input onInput={(e)=>{
          setUsername(e.target.value)
        }} type="text" required name="username" placeholder='Enter Username' />


        <input onInput={(e)=>{
          setEmail(e.target.value)
        }}  type="email" required name="email" placeholder='Enter Email' />


        <input onInput={(e)=>{
          setPassword(e.target.value)
        }}  type="password" required name="password" placeholder='Enter Password' />


        <button>SingUp</button>
<p>Already have an account? <Link to="/login">Login</Link></p>

      </form>
    </div>
  )
}


export default Register