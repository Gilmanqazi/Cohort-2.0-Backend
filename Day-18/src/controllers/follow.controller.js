const followModel = require("../models/follow.model")

async function followUserControllar (req,res){

  const followerUsername = req.user.username
  const followingUsername = req.params.username

  if(followerUsername === followingUsername){
    return res.status(409).json({
      message:"You cannot follow yourself"
    })
  }



  const AlreadyFollow = await followModel.findOne({
    follower:followerUsername,
    following:followingUsername
  })

  if(AlreadyFollow){
    return res.status(401).json({
      message:`You Already Following ${followingUsername}`
    })
  }

  const follow = await followModel.create({
    follower:followerUsername,
    following:followingUsername
  })

  res.status(201).json({
    message:`Youare now follownig ${followingUsername}`,
    follow
  })

}
 

async function acceptRequestController(req, res) {

  const requestSender = req.params.username
  const loggedInUser = req.user.username

  const follow = await followModel.findOne({
    follower: requestSender,
    following: loggedInUser
  })

  if (!follow) {
    return res.status(404).json({
      message: "Follow request not found"
    })
  }

  if (follow.status !== "pending") {
    return res.status(400).json({
      message: "Request already processed"
    })
  }

  follow.status = "accepted"
  await follow.save()

  res.status(200).json({
    message: "Follow request accepted",
    follow
  })
}


module.exports = {
  followUserControllar,
  acceptRequestController
}