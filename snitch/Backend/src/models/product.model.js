import mongoose from "mongoose";


export const productSchema = mongoose.Schema({
  title:{
    type:String,
    require:true
  },
  description:{
    type:String,
    required:true
  },
  seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  },
  price:{

amount:{
  type:Number,
  required:true
},

currency:{
  type:String,
  enum:["USD","EUR","GBP","JPY","INR"],
  default:"INR"
}
  },
  images:[
    {
    url:{
      type:String,
      required:true
    },
  }
  ]
},{timestamp:true})


const productModel = mongoose.model("products",productSchema)

export default productModel