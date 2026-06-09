"use client"
import { api } from "@/app/lib/api";
import { createContext, useContext, useEffect, useState } from "react";

let Auth = createContext()

export let AuthProvider = ({children})=>{

  const [user, setUser] = useState(null)

let hydradeUser = async ()=>{

try {

  
  let res = await api.get("/api/auth/me")
  
setUser(res.data.user)


} catch (error) {
  setUser(null)
  console.log("Error in hydration", error)
}

}

useEffect(()=>{
  hydradeUser()
},[])


  return <Auth.Provider value={{ user , setUser}}>{children}</Auth.Provider>
}


export let useAuth = ()=> useContext(Auth)