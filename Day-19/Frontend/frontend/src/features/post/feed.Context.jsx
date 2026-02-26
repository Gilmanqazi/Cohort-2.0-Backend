import { useState } from "react";
import { createContext} from "react";



export const PostContext = createContext()



export const PostContextProvider = ({children})=>{

  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState(null)
  const [feed, setFeed] = useState(null)
  const [followState,setFollowState] = useState(null)
  const [unFollowState,,setunFollowState] = useState(null)

  return(
    <PostContext.Provider value={{loading,setLoading,post,setPost,feed,setFeed,followState,setFollowState,unFollowState,setunFollowState}}>
{children}
    </PostContext.Provider>
  )

}


