const imageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const postModel = require("../models/post.model")



const imagekit = new imageKit({
  privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController (req,res){
  
  if (!req.file) {
    return res.status(400).json({
      message: "Image is required"
    })
  }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer),"file"),
    fileName:"GilmanQazi",
    folder:"GILMAN_QAZI"
  }) 

  const post = await postModel.create({
    caption:req.body.caption,
    imgUrl:file.url,
    user:req.user.id
  })

  res.status(201).json({
    message:"PostCreated Successfull",
    post
  })

}

async function getPostController(req,res){


const userId = req.user.id

const posts = await postModel.find({
  user:userId
})

res.status(200).json({
  message:"Post fetched successfull",
  posts

})

}

async function getDetailes(req,res){


  

  const userId = req.user.id
  const postId = req.params.id



const post = await postModel.findById(postId)

if(!post){
  return res.status(404).json({
    message:"Post Not Found"
  })
}

const isValidUser = post.user.toString() === userId

if(!isValidUser){
  return res.status(403).json({
    message:"forbidden content"
  })
}

res.status(200).json({
  message:"Post Fetched successfull"
})


}

module.exports = {
  createPostController,
  getPostController,
  getDetailes

}