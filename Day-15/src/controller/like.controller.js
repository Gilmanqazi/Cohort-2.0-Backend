const postModel = require("../models/post.model")
const likeModel = require("../models/likes.model")


async function likesController(req,res){

const username = req.user.username
const id = req.params.id

const post = await postModel.findById(id)

console.log(post)

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
  message:"Post liked successfulll",
  like
})

}

module.exports = {
  likesController
}