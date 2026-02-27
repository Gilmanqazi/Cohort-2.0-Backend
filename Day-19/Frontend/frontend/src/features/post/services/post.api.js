import axios from "axios"

const api = axios.create({
baseURL:"http://localhost:3000",
withCredentials:true
})


export async function getFeed (){


  const res = await api.get("/api/posts/feed")
  console.log(res.data)
return res.data
}

export async function createPost (imageFile,caption){

  const formData = new FormData()
  formData.append("image",imageFile)
  formData.append("caption",caption)

const res = await api.post("/api/posts/",formData)

return res.data
}


export async function likePost(id){
  const res = await api.post("/api/like/"+id)

  console.log(res)
  return res.data

}

export async function unLikePost(id){
  const res = await api.post("/api/unlike/"+id)

  return res.data
}


export async function Follow(username){
  const res = await api.post("/api/follow/"+username)
  console.log(res.data)
  return res.data
}

export async  function Unfollow(username){
  const res = await api.delete("/api/follow/"+username)
console.log(res.data)
  return res.data
}

