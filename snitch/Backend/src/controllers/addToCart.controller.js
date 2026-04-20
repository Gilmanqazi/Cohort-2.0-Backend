import addToCardModel from "../models/AddToCart.model.js";
import productModel from "../models/product.model.js";



export const addToCartController = async (req, res) => {
  try {
   
    const { productId, quantity = 1 } = req.body; 
    const userId = req.user.id;

    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product Not Found" });

    let cart = await addToCardModel.findOne({ userId });

    if (!cart) {
      cart = await addToCardModel.create({
        userId,
        items: [{ productId, quantity }]
      });
    } else {
      
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        if (req.body.quantity) {
            cart.items[itemIndex].quantity = quantity; 
        } else {
            cart.items[itemIndex].quantity += 1; 
        }
      } else {
   
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    
    
    const updatedCart = await addToCardModel.findById(cart._id).populate("items.productId");
    res.status(200).json({ 
      success: true, 
      message: "Cart updated", 
      items: updatedCart.items 
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

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


