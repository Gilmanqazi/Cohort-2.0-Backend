//server ko start karna 

const app = require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB()

app.get("/",(req,res)=>{
  res.send("User Created Successfully")
})

app.listen(3000,()=>{
  console.log("Server is running on port 3000")
}) 