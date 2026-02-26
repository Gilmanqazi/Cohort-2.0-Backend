import { useContext } from "react";
import { getFeed, createPost, likePost, unLikePost, Follow,Unfollow } from "../services/post.api";
import { PostContext } from "../feed.Context";

export const usePost = () => {



  const context = useContext(PostContext);

  const {
    loading,
    setLoading,
    post,
    feed,
    setFeed,
    followState,
    setFollowState
  } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  };

  const handleCreatePost = async (imageFile, caption) => {
    setLoading(true);
    const data = await createPost(imageFile, caption);
    setFeed(prev => [data.post, ...prev]); // safe update
    setLoading(false);
  };

  const handleLike = async (postId) => {
    await likePost(postId);
    await handleGetFeed();
  };

  const handleUnLike = async (postId) => {
    await unLikePost(postId);
    await handleGetFeed();
  };



  const handleFollow = async (username) => {
    try {
      await Follow(username);
      console.log("Follow success");
    } catch (err) {
  
      if (err.response?.status === 409) {
        console.log("Already followed");
      } else {
        console.log("Error", err);
      }
  
    }
  };

  return {
    feed,
    post,
    loading,
    followState,
    setFollowState,
    handleGetFeed,
    handleCreatePost,
    handleLike,
    handleUnLike,
    handleFollow
  };
};

export default usePost;