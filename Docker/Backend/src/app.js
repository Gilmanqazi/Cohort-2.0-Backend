import express from "express"
const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
  res.send("Hello World")
})

app.get("/api/data",(req,res)=>{
const data = {
  message:"This is some sample data from API.",
  timestamp: new Date(),
}
res.send(data)
})

app.get("/api/users", (req,res) => {
  const users = [
    {id: 1 , name:"Alice"},
    {id: 2 , name:"John"},
    {id: 3 , name:"Cena"},
    {id: 1 , name:"Lipa"},
    {id: 2 , name:"Orter"},
    {id: 3 , name:"Pogba"},
  ]
  res.json(users)
})

export default app;