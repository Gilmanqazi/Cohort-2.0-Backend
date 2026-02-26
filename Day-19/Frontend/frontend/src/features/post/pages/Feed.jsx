import React,  { useEffect } from 'react'
import "../style/feed.scss"
import {usePost} from '../hook/usePost'
import Feed from '../components/Post'
import Navbar from '../../shared/components/Navbar'



const Home = () => {

 const {feed,loading,handleGetFeed,handleLike,handleUnLike,handleFollow,handleUnfollow} = usePost()



 useEffect(() => {
   handleGetFeed();
 }, []);

    
    if(loading || !feed){
      return (<main><h1>Feed is loading...</h1></main>)
  }


  return (
   <div className='main'>

    <Navbar/>
    

    <div className='feed'>
      {feed.map((post,item,idx)=>{
       
       return <Feed key={idx} user={post.user} postisLiked={post.isLiked} postId={post._id}  postCaption={post.caption} postImg ={post.imgUrl} loading={loading} handleLike={handleLike}  handleUnLike={handleUnLike} username={item?.user?.username} handleFollow={handleFollow} handleUnfollow={handleUnfollow}  />
      })}

    </div>
   
    </div>
    
  )
}

export default Home