import express from "express"
import authUser from "../middleware/auth.middleware.js"
import  {deleteHistory, getMyHistory, useGraphController}  from "../controllers/useGraph.controller.js"

const aiRoute = express.Router()

aiRoute.post("/useGraph",authUser,useGraphController)

aiRoute.get("/my-history",authUser,getMyHistory)

aiRoute.delete("/my-history/:id",authUser,deleteHistory)

export default aiRoute
