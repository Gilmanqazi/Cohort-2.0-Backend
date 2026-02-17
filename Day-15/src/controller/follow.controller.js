const followModel = require("../models/follow.model")

async function followUser(req,res){

  const followerUsername = req.user.username
  const followingUsername = req.params.username

  console.log("Logged User:", req.user.username)
console.log("Target User:", req.params.username)


  if(followerUsername === followingUsername){
    return res.status(400).json({
      message:"You can't follow yourself"
    })
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower:followerUsername,
    following:followingUsername
  })

  const isFollowingUser = await followModel.findOne({
    following:followingUsername
  })

  if(!isFollowingUser){
    return res.status(409).json({
      message:"User not found"
    })
  }

  if(isAlreadyFollowing){
    return res.status(200).json({
      message:`You already following ${followingUsername}`
    })
  }


  const follow = await followModel.create({
    follower:followerUsername,
    following:followingUsername
  })


  res.status(201).json({
    message:"Follow Successfully",
    follow
    })

  }

async function deleteFollower(req,res){

  const followerUsername = req.user.username
  const followingUsername = req.params.username

  const deleteFollower = await followModel.findOneAndDelete({
    follower:followerUsername,
    following:followingUsername
})

if(!deleteFollower){
  return res.status(401).json({
    message:"No followers to delete"
  })
}

  res.status(200).json({ 
message:"Follower Deleted Successful",
deleteFollower
  })

}

async function likesController (req,res){

}

module.exports = {
  followUser,
  deleteFollower,
  likesController
}