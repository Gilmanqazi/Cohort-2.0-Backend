import useGraph from "../services/graph.ai.service.js";
import aiModel from "../model/Ai.model.js";



export const useGraphController = async (req: any, res: any) => {
  try {
    const { problem } = req.body;

    if (!problem) {
      return res.status(400).json({
        message: "Problem is required",
      });
    }

    const result = await useGraph(problem);

    

    const { solution_1, solution_2 ,judge} = result;

   

    const ai = await aiModel.create({
      userId: req.user.id,
      problem: problem,
      solution_1: solution_1,
      solution_2: solution_2,
      judge:{
        solution_1_score:judge.solution_1_score,
        solution_2_score:judge.solution_2_score,
        solution_1_reasoning:judge.solution_1_reasoning,
        solution_2_reasoning:judge.solution_2_reasoning,
      }

    });

    res.status(200).json({
      message: "Graph executed successfully",
      success: true,
      ai,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ messages: err });
  }
};

export const getMyHistory = async (req:any,res:any) => {
  
try {
  const userId = req.user.id

  const page =  parseInt(req.query.page) || 1
  
  const limit =  parseInt(req.query.limit) || 10

  const history = await aiModel
  .find({userId})
  .skip((page -1) * limit)
  .limit(limit)
  .sort({createdAt: -1 })

  res.status(200).json({
    success:true,
    count:history.length,
    data:history
  })
} catch (error) {
  res.status(500).json({
    success:false,
    message:"Failed tofetch history"
  })
}

}

export const deleteHistory = async(req:any,res:any) => {

  try {
    
    const chatId = req.params.id

    const data = await aiModel.findByIdAndDelete(chatId)

    if(!data){
      return res.status(404).json({
        message:"Record not found"
      })
    }

    if(! chatId === req.user.id)  {
      return res.status(401).json({
        message:"unauthorized access"
      })
    }

    res.status(200).json({
      success:true,
      message:"Chat Deleted Successfull",
      data
    })

  } catch (error) {
   res.status(500).json({
    message:"Problem While Deleteing Chat", error
   })
  }

}
