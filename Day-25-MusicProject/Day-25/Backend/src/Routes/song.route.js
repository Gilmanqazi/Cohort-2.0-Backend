const express = require("express")
const upload  = require("../middlewares/upload.middleware")
const songController  = require("../controllers/song.controller")
const identifyUser = require("../middlewares/auth.middleware")

const songRouter = express.Router()


songRouter.post("/",upload.single("song"),songController.uploadSong)

songRouter.get("/",songController.getSong)

songRouter.delete("/:id",identifyUser,songController.deleteSong)


module.exports = songRouter