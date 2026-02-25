const likeModel = require("../models/likes.model")
const postModel = require("../models/post.model")

async function likeUserController (req,res){

  const username = req.user.username
  const id = req.params.id


  const post = await postModel.findById(id)

  if(!post){
    return res.status(404).json({
      message:"Post not found"
    })
  }

  const like = await likeModel.create({
    likes:id,
    user:username
  })

  res.status(200).json({
    message:`Post likes successfull`,
    like
  })

}


module.exports = {
  likeUserController
}