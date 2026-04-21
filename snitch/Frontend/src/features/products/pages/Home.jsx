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
      <div className="pt-28 pb-14 text-center px-4">
        <h1 className="text-4xl md:text-7xl font-black mb-3">
          RAW<span className="text-emerald-400">STYLE</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          Premium Streetwear Collection
        </p>
      </div>

      {/* 🔥 PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {products?.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-[#0a0d14] rounded-3xl border border-white/5 hover:border-emerald-400/30 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10"
            >

              {/* IMAGE */}
              <div className="h-[300px] flex items-center justify-center p-6">
                <img
                  src={item.images?.[0]?.url}
                  alt={item.title}
                  className="h-full object-contain transition duration-500 hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="px-5 pb-5">

                {/* TITLE */}
                <h2 className="text-sm font-semibold mb-1 line-clamp-1">
                  {item.title}
                </h2>

                {/* PRICE */}
                <p className="text-emerald-400 text-sm font-medium mb-4">
                  ₹{item.price.amount}
                </p>

                {/* BUTTONS */}
                <div className="flex flex-col gap-2">

                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="w-full py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-emerald-400 transition"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => navigate(`/products/${item._id}`)}
                    className="w-full py-2 border border-white/20 rounded-lg text-sm hover:bg-white/10 transition"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full py-2 bg-emerald-500 text-black rounded-lg text-sm font-medium hover:bg-emerald-400 transition"
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
          <div className="text-center py-20 text-slate-500 text-sm">
            Loading products...
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;