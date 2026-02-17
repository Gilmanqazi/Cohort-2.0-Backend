const express = require("express")
const postController = require("../controller/post.controller")
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const identifyUser = require("../middlewares/auth.middleware")

const postRouter = express.Router()


postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

postRouter.get("/",identifyUser,postController.getPostController)

postRouter.get("/detailes/:postId",identifyUser,postController.getPostDetailsById)

module.exports = postRouter