import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useProduct } from '../Hook/useProduct';
import { motion } from 'framer-motion'; // Animation ke liye
import { ChevronLeft, ShoppingCart, Star } from 'lucide-react'; // Icons

const ProductsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleProductById } = useProduct();
  
  const product = useSelector((state) => state.product.productById);

  useEffect(() => {
    if (id) {
      handleProductById(id);
    }
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [id]);
    
  // 1. Loading State UI (Skeleton)
  if (!product || product?._id !== id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-64 h-64 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black transition-colors mb-8 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="ml-1 font-medium">Back to products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          
          {/* Left: Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative group bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center p-8"
          >
            <img
              src={product?.images?.[0]?.url || "https://via.placeholder.com/600"}
              alt={product?.title}
              className="max-h-[500px] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>

          {/* Right: Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-4">
              <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">New Arrival</span>
              <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4 leading-tight">
                {product?.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-light text-gray-900">
                  {product?.price?.currency || '$'} {product?.price?.amount}
                </span>
                <div className="flex items-center bg-green-50 px-2 py-1 rounded text-green-700 text-sm font-medium">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  4.8
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full mb-6"></div>

              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {product?.description || "No description available for this premium product."}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 active:scale-95">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="flex-1 bg-white text-black border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold hover:border-black transition-all active:scale-95">
                Wishlist
              </button>
            </div>

            {/* Minimal Details */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-gray-100 pt-8">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Fast Delivery</h4>
                <p className="text-sm text-gray-700 mt-1">2-4 Business Days</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Returns</h4>
                <p className="text-sm text-gray-700 mt-1">30-day policy</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;