import express from "express"
import useGraph from "./services/graph.ai.service.js"

const app = express()

app.get("/health",(req,res)=>{
res.status(200).json({status:"ok"})
})

app.post("/useGraph", async (req,res)=>{

  const result = await useGraph("write an factorial function in javaScript")

  res.json(result)

})


export default app