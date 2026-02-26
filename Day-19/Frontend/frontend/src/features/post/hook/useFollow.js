import { useState, useCallback } from "react";
import { Follow, Unfollow } from "../services/post.api";

const useFollow = () => {

  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = useCallback(async (username) => {
    setLoading(true);
    await Follow(username);
    setIsFollowing(true);
    setLoading(false);
  }, []);

  const handleUnfollow = useCallback(async (username) => {
    setLoading(true);
    await Unfollow(username);
    setIsFollowing(false);
    setLoading(false);
  }, []);

  const toggleFollow = useCallback((username) => {
    if (isFollowing) {
      handleUnfollow(username);
    } else {
      handleFollow(username);
    }
  }, [isFollowing, handleFollow, handleUnfollow]);

  return {
    loading,
    isFollowing,
    toggleFollow
  };
};

export default useFollow;