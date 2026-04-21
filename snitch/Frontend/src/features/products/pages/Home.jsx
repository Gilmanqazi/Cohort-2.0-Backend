import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../Hook/useProduct";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../cart/Hook/userCart";
import { ShoppingBag } from "lucide-react";
import Nav from "../components/nav";

const Home = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);
  const { handleGetAllProducts } = useProduct();
  const { handleAddToCart } = useCart();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#030508] text-white">
      <Nav />

      {/* 🔥 HERO */}
      <div className="pt-28 pb-16 text-center px-4">
        <h1 className="text-4xl md:text-7xl font-black mb-4">
          RAW<span className="text-emerald-400">STYLE</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-lg">
          Premium streetwear collection
        </p>
      </div>

      {/* 🔥 PRODUCT GRID */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {products?.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* CARD */}
              <div className="bg-[#0a0d14] rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-400/30 transition">

                {/* IMAGE */}
                <div className="h-[280px] md:h-[340px] flex items-center justify-center p-4">
                  <img
                    src={item.images?.[0]?.url}
                    className="h-full object-contain group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* PRICE */}
                <div className="px-4 text-emerald-400 text-sm">
                  ₹{item.price.amount}
                </div>

                {/* TITLE */}
                <div className="px-4 py-2">
                  <h2 className="text-sm font-semibold">{item.title}</h2>
                </div>

                {/* 🔥 MOBILE BUTTONS */}
                <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="w-full py-2 bg-white text-black rounded-lg text-sm"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => navigate(`/products/${item._id}`)}
                    className="w-full py-2 border border-white rounded-lg text-sm"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full py-2 bg-emerald-500 text-black rounded-lg text-sm"
                  >
                    Buy Now
                  </button>
                </div>

                {/* 🔥 DESKTOP HOVER */}
                <div className="hidden md:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition items-center justify-center flex-col gap-3">
                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="px-6 py-2 bg-white text-black rounded-full text-sm"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => navigate(`/products/${item._id}`)}
                    className="px-6 py-2 border border-white rounded-full text-sm"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="px-6 py-2 border border-white rounded-full text-sm"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {products?.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            Loading products...
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;