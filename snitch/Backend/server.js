import app from "./src/app.js"
import connectToDB from "./src/config/database.js"

connectToDB()


app.get("/",(req,res)=>{
  res.send("Welcome to home")
})

app.listen(3000,()=>{
console.log("Server is running on port 3000")
})