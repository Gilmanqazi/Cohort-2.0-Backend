import mongoose from "mongoose"


const aiSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:[true,"userId is required"]
  },
  problem:{
    type:String,
    required:[true,"Problem is required"]
  },
  solution_1:{
    type:String
  },
  solution_2:{
    type:String
  },
  judge:{
    solution_1_score:{
      type:Number
    },
    solution_2_score:{
      type:Number
    },
    solution_1_reasoning:{
      type:String
    },
    solution_2_reasoning:{
      type:String
    }
}

},{timestamps:true})


const aiModel = mongoose.model("Ai_Messages",aiSchema)

export default aiModel