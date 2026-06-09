"use client"
import { api } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

let Auth = createContext()

export let AuthProvider = ({children})=>{

  let router = useRouter()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

let hydradeUser = async ()=>{

try {
let res = await api.get("/api/auth/me")
setUser(res.data.user)
router.replace("/layout/home")
} catch (error) {
  setUser(null)
  console.log("Error in hydration", error)
} finally{
  setLoading(false)
}}

useEffect(()=>{
  hydradeUser()
},[])


  return <Auth.Provider value={{ user , setUser, loading, hydradeUser}}>{children}</Auth.Provider>
}


export let useAuth = ()=> useContext(Auth)