import React, { useEffect } from 'react';
import { useProduct } from '../Hook/useProduct';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddToCartPage = () => {

  const navigate = useNavigate()

  const getAllCart = useSelector((state) => state.product.getCartUser);


  
  const { handleGetAddToCart } = useProduct();

  useEffect(() => {
    handleGetAddToCart();
  
  }, []);

  // Total Price calculation
  const subtotal = getAllCart.reduce((acc, item) => {
    return acc + (item.productId?.price?.amount || 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

        {getAllCart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-500 text-lg">Your cart is feeling a bit light.</p>
            <button className="mt-4 text-cyan-600 font-semibold hover:underline">Continue Shopping</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {getAllCart.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-6 border border-gray-100 hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={item?.productId?.images?.[0]?.url || "https://via.placeholder.com/150"}
                      alt={item?.productId?.title}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{item?.productId?.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{item?.productId?.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-4 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
                        <span className="text-sm font-medium text-gray-600">Qty: {item.quantity}</span>
                      </div>
                      <p className="font-bold text-lg text-slate-900">
                        {item?.productId?.price?.currency} {item?.productId?.price?.amount}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 border-b pb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{getAllCart[0]?.productId?.price?.currency} {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-black text-cyan-600">
                  {getAllCart[0]?.productId?.price?.currency} {subtotal.toFixed(2)}
                </span>
              </div>
              <button onClick={()=>{navigate("/checkout")}} className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-slate-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCartPage;