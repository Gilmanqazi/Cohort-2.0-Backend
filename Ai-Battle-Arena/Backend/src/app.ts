import express from "express"
import authRouter from "./Routes/auth.route.js"
import cookieParser  from  "cookie-parser"
import cors from "cors"
import aiRoute from "./Routes/useGraph.route.js"

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
}))

app.use(express.json())

app.use(cookieParser())


app.use("/api/auth",authRouter)
app.use("/api/ai",aiRoute)

app.get("/health",(req,res)=>{
res.status(200).json({status:"ok"})
})




export default app