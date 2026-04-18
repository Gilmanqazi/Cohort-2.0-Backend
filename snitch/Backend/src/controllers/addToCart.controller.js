import addToCardModel from "../models/AddToCart.model.js";
import productModel from "../models/product.model.js";



export const addToCartController = async (req,res)=>{

  const {productId } = req.body
  const userId = req.user.id

const product = await productModel.findById(productId)

if(!product){
  return res.status(404).json({
    message:"Product Not Found"
  })
}

let cart = await addToCardModel.findOne({userId}) 

if(!cart){
 cart = await addToCardModel.create({
    userId,
    items:[
      {productId:productId,quantity:1}
    ]
  })
  
}else{
  const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)

  if(itemIndex > -1){
    cart.items[itemIndex].quantity +=1
  }else{
    cart.items.push({productId,quantity:1})
  }
}

await cart.save();
res.status(200).json({ message: "Cart updated", cart });

}

export const getAddToCartProdcuts = async (req,res)=>{
  try {
    const userId = req.user.id

  const getCarts = await addToCardModel.findOne({userId}).populate("items.productId")

  
  if(!getCarts){
    return res.status(200).json({ items: [] });
  }
  res.status(200).json({
    mesage:"Cart Fetched Successfull",
    success:true,
    getCarts
  });
  } catch (error) {
  res.status(500).json({ message: "Server Error" ,error});

    
  }
}
