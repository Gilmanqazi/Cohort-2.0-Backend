import mongoose from "mongoose";


const addToCartSchema = mongoose.Schema({

userId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"users",
  required:true
},
items:[
  {
    productId:{
type:mongoose.Schema.Types.ObjectId,
ref:"products",
required:true
    },
    quantity:{
      type:Number,
      default:1,
      min:[1,"Quantity can not be less than 1"]
    }
  },
 
]

},{timestamps:true})

const addToCardModel = mongoose.model("addToCart",addToCartSchema)

export default addToCardModel