const express = require("express")
const postController = require("../controllers/post.controller")
const postRouter = express.Router()
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const identifyUser = require("../middlewares/auth.middleware")

postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

postRouter.get("/",identifyUser,postController.getPostController)

postRouter.get("/detailes/:id",identifyUser,postController.getDetailes)


module.exports = postRouter