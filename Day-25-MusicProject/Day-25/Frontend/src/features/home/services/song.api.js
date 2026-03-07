import axios from "axios"

const api = axios.create({
  baseURL:"http://localhost:3000",
  withCredentials:true
})

export const getSong = async ({mood})=>{
const res = await api.get("/api/song/?mood="+mood)

return res.data
}

export const uploadSong = async ({song,mood})=>{

  const formData = new FormData()

  formData.append("song",song)
  formData.append("mood",mood)

  const res = await api.post("/api/song",formData)

  return res.data
}

export const deleteSong = async ({id})=>{
  const res = await api.delete("/api/song/"+id)

  console.log(res.data)
  return res.data
}
