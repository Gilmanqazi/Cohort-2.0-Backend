import express from "express"
import useGraph from "./services/graph.ai.service.js"

const app = express()

app.get("/health",(req,res)=>{
res.status(200).json({status:"ok"})
})

app.post("/useGraph", async (req,res)=>{

  await useGraph("What is the capital or India?")

})


export default app