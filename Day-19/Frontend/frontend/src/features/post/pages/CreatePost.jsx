import { useRef, useState } from "react"
import React  from 'react'
import "../style/createPost.scss"
import usePost from "../hook/usePost"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

const CreatePost = () => {

  const [caption, setCaption] = useState("")
  const postImageInputFieldRef = useRef(null)

  const navigate = useNavigate()

  const {loading,handleCreatePost} = usePost()


   const submitHandler = async (e)=>{
   e.preventDefault()

try{
  const file = postImageInputFieldRef.current.files[0]
  await handleCreatePost(file,caption)
  toast.success("Post Created")
  navigate("/")
}catch(err){
  console.log(err)
  toast.error("Something went wrong")
}

  }

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <main className='create-post-page'>
      <div className="form-container">
        <div>
        <h1>Create Post</h1>
        </div>
        <form onSubmit={submitHandler}>
          <label className='post-image-label' htmlFor="postImage">Select Image</label>
          <input ref={postImageInputFieldRef} hidden type="file" name='postImage' placeholder='Choose image' id='postImage' />
          <input value={caption} onChange={(e)=>{
            setCaption(e.target.value)
          }} type="text" name='caption' placeholder='Enter caption' id='caption' />
          <button className='button'>Create Post</button>
        </form>
      </div>
      
      </main>
    
  )
}

export default CreatePost