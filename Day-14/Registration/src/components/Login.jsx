import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [formHandle, setformHandle] = useState({emaill:"",password:""})

  function onCahngeHandle(e){
    setformHandle({
      ...formHandle,[e.target.name]: e.target.value
    })

  }


async function handlesFrom(e) {
  e.preventDefault();
  
  try {

    const res = await axios.post("http://localhost:3000/api/auth/login", formHandle);


    console.log(res.data);
    alert("Login success");
    navigate("/home");

  } catch (err) {
    
    console.log(err);
    alert("User not found or wrong password");
  }
}
  return (
    <div className='h-screen w-full bg-[url("https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-center flex justify-center items-center'>

     

      <div className='h-80 w-70 flex flex-col rounded-xl bg-white/30 backdrop-blur-sm'>
      <h1 className=' py-3 px-10 font-bold text-white text-xl'>Login</h1>
      <p  className=' px-10 font-semibold text-white text-[10px] text-nowrap'>Welcome back please login to your account</p>
        <form className='flex flex-col gap-5 py-5 px-10 outline-none' onSubmit={(e)=>{
       handlesFrom(e)
        }}>
        <input className='border border-white rounded-sm text-white font-small text-sm py-1 px-5' value={formHandle.emaill} name='emaill' placeholder="User email" type="email" onChange={onCahngeHandle} />

        <input className='border border-white rounded-sm text-white font-small text-sm py-1 px-5' value={formHandle.password} name='password' placeholder="User password" type="password" onChange={onCahngeHandle} />

        <button className=' py-1 px-5 rounded-2xl font-medium active:scale-95 text-white bg-linear-to-r from-[#254256] to-[#06121b]'>Login</button>
        <p className='text-white text-nowrap text-center text-[12px] font-semibold'>Don't have an account? <Link className='font-bold' to="/">Singup</Link></p>
   
        </form>
      </div>
    </div>
  )
}

export default Login