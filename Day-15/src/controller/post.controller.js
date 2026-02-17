const postModel = require("../models/post.model")
const imageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")


const imagekit = new imageKit({
  privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){

  const file = await imagekit.files.upload({
    file: await  toFile(Buffer.from(req.file.buffer),"file"),
    fileName:"GilmanQazi",
    folder:"GK_BOSS"
  })

  const post = await postModel.create({
    caption:req.body.caption,
    imgUrl:file.url,
    user:req.user.id
  }) 

  res.status(200).json({
    message:"Post created Successfull",
    post
  })

}

async function getPostController (req,res){


 const userId = req.user.id

 const posts = await postModel.find({
  user:userId
 })
 
 if(!posts || posts.length === 0){
  return res.status(404).json({
    message:"Post Note Found"
  })
 }

 res.status(200).json({
  message:"Post Fetched Successfull",
  posts
 })

}

async function getPostDetailsById(req,res){

 

  const userId = req.user.id
  const postId = req.params.postId


  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message:"Post not found"
    })
  }

  const isValidUser = post.user.toString() === userId

  if (!isValidUser){
    return res.status(403).josn({
      message:"Forbidden content"
    })
  }

  res.status(200).json({
    message:"Post received successfull by Id",
    post
  }) 

}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsById
}