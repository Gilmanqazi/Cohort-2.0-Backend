import React, { memo } from "react";
import useFollow from "../hook/useFollow";

const FollowButton = ({ username }) => {
 

  const { loading, isFollowing, toggleFollow } = useFollow();

  console.log(isFollowing)
  

  return (
    <button
      onClick={() => toggleFollow(username)}
      disabled={loading}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default memo(FollowButton);