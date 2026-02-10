import React, {  useState } from 'react';
import axios from "axios"
import {useNavigate,Link} from "react-router-dom"



const Register = () => {

const navigate = useNavigate()



const [formHandle, setFormHandle] = useState({
  name:"",
  emaill:"",
  password:"",
})

function changeHandle(e){
  setFormHandle({
    ...formHandle,
    [e.target.name]: e.target.value
  });
}

async function HandlingForm(e){
  e.preventDefault()
  try {
    
    const res = await axios.post("http://localhost:3000/api/auth/register",formHandle);

    localStorage.setItem("token",res.data.token)

    
    console.log(res.data);
    alert("Registration successful ");
    navigate("/login")
  } catch (err) {
    console.error(err);
    alert("User Already Exist ");
  }
};



  return (
    <div className='h-screen w-full bg-[url("https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-center flex justify-center items-center' >
      <div className='h-80 w-70 flex flex-col rounded-xl bg-white/30 backdrop-blur-sm'>

        <h1 className='text-center py-1 font-bold text-white text-lg'>Registation From</h1>
        <form className='flex flex-col gap-5 py-5 px-10 outline-none' onSubmit={(e)=>{
         HandlingForm(e)
        }}>
          <input className='border border-white rounded-sm text-white font-small text-sm py-1 px-5' name="name" type="text" placeholder='Enter Name' onChange={
           changeHandle
          } />
          <input className='border border-white rounded-sm text-white font-small text-sm py-1 px-5' name="emaill" type="email" placeholder='Enter Email' onChange={
            changeHandle
          
          }/>
          <input className='border border-white rounded-sm text-white font-small text-semibold py-1 px-5' name="password" type="password" placeholder='Enter Password' onChange={changeHandle} />

          <button type="submit" className=' py-1 px-5 rounded-2xl font-medium active:scale-95 text-white bg-linear-to-r from-[#254256] to-[#06121b]'>submit</button>
          <p className='text-white text-nowrap text-center text-[13px] font-semibold'>Account already exist? <Link className='font-bold' to="/login">Login</Link></p>
         
        </form>
      </div>
    </div>
  );
};

export default Register;