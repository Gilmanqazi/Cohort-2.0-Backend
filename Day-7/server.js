//server start karna 


const app = require("./src/app")
const connectToDb = require("./src/config/database")
const noteModel = require("./src/models/note.model")

require("dotenv").config()

connectToDb()

app.get("/",(req,res)=>{
  res.send("note created")
})

app.post("/notes",async (req,res)=>{
  const {title,desc,age} = req.body

  const notes = await noteModel.create({
    title,desc,age,
 
  })
  res.status(201).json({
    message:"Note Created Successfull",
    notes
  })
})

app.get("/notes",async(req,res)=>{
  const notes = await noteModel.find()
  res.status(200).json({
    message:"Note Received Successfull",
    notes
  })
})

app.listen(3000,()=>{
console.log("server is running on port no 3000");

})