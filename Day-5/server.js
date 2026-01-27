const app = require("./src/app")

app.get("/",(req,res)=>{
res.send("note created")
})

const notes = []

app.post("/notes",(req,res)=>{
  notes.push(req.body),
  res.status(200).json({
    message:"note created successful"
  })
})
app.get("/notes",(req,res)=>{
res.status(201).json({
  message:"note received successful",
  notes:notes,
})
})

app.delete("/notes/:index",(req,res)=>{
  delete notes [req.params.index]
res.status(200).json({
  message:"note deleted successful"
})
})
app.patch("/notes/:index",(req,res)=>{
  notes [req.params.index].title = req.body.title,
  res.status(200).json({
    message:"note update successful"
  })

})