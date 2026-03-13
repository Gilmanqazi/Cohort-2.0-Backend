import "dotenv/config"
import app from "./src/app.js"
import connectToDB from "./src/config/database.js"
import { testAi } from "./src/services/ai.servise.js"

connectToDB()

testAi()
.catch((err)=>{
  console.log("MongoDB connection failed",err);
  process.exit(1);
})


app.listen(3000,()=>{
  console.log("Server is running on port 3000")
})