//server ko start karna 
//server ko databse se connect karna

const app = require("./src/app")
const connectToDB = require("./src/config/database")
const noteModel = require("./src/model/note.model")
require("dotenv").config()

connectToDB()

app.post("/api/notes", async (req,res)=>{
const {img,title,desc} = req.body

const note = await noteModel.create({
  img,title,desc
})
res.status(201).json({
  message:"note created succesfully",
  note
})
})

app.get("/api/notes", async (req,res)=>{
  const notes = await noteModel.find()

  res.status(200).json({
    message:"note received successfully",
    notes
  })
})

app.delete("/api/notes/:id", async (req,res)=>{
const id = req.params.id 
await noteModel.findByIdAndDelete(id)

res.status(200).json({
  message:"note deleted successfully",
})
})

app.patch("/api/notes/:id", async (req,res)=>{
const id = req.params.id
const {desc} =  req.body
await noteModel.findByIdAndUpdate(id,{desc})

res.status(200).json({
  message:"note updated successfull"
})
})
app.listen(3000,()=>{
  console.log("server is running on 3000")
})