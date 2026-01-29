const app = require("./src/app")
const mongoose = require("mongoose")

app.get("/",(req,res)=>{
res.send("Note created")
})


function connectDB(){
  mongoose.connect("mongodb+srv://gilmanqazi_db_user:rVRUvFdUXjdaO1dz@cluster0.xgaeosk.mongodb.net/DAY_6")
.then(()=>{
  console.log("database connected")
})
}
connectDB()


app.listen(3000,()=>{
  console.log("Server is running on port no 3000")
})
