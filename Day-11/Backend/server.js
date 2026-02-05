const app = require("./src/app")
const connectToDB = require("./src/config/database")
const noteModel = require("./src/models/note.model")
const path = require("path")


connectToDB()


app.post("/api/notes", async (req,res)=>{
  const {img,title,desc} = req.body
const note = await noteModel.create({
  img,title,desc

})
res.status(201).json({
  message:"note created sucressfully",
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

app.delete("/api/notes/:id",async (req,res)=>{
const id = req.params.id
await noteModel.findByIdAndDelete(id)

res.status(200).json({
  message:"note delete successfully"
})
})

app.patch("/api/notes/:id",async (req,res)=>{
  const id = req.params.id

  const {img,desc,title} = req.body
  await noteModel.findByIdAndUpdate(id,{img,desc,title})

  res.status(200).json({
    message:"note updated successfully"
  })
})
console.log(__dirname)
app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000,()=>{
  console.log("server is running on 3000");
})
