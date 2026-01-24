const app = require("./src/app")

app.get("/",(req,res)=>{
res.send("note created")
})

const notes = []
// {
// "title":"cohort 2.0",
// "desc" :"very good course"
// }
// POST /notes

app.post("/notes",(req,res)=>{
  notes.push(req.body)
  res.send("note created")
})

//GET /notes

app.get("/notes",(req,res)=>[
  res.send(notes),

])

//DELETE /notes/:index

app.delete("/notes/:index",(req,res)=>{
  delete notes[req.params.index]
  res.send("note deleted successful")
})

//patch/notes/:index

app.patch("/notes/:index",(req,res)=>{
 notes[req.params.index].title = req.body.title
res.send("update successfull")
})

app.listen(3000,()=>{
  console.log("Port running on port no 3000")
})