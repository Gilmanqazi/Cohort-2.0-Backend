import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../Hook/useProduct";
import { useNavigate } from "react-router-dom";


const Home = () => {

  const navigate = useNavigate()

  const products = useSelector((state) => state.product.products);
  const cart = useSelector((state)=> state.product.addToCard)
  console.log(cart,"CARTT")
const count = cart?.cart?.items?.length || 0
console.log(count,"COUNT")
  const { handleGetAllProducts,handleAddToCart } = useProduct();



  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-cyan-500/30">
  
      {/* --- Navbar --- */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0f172a]/70 border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            LUXE STORE
          </h1>
          <div className="flex gap-6 text-sm font-medium">
            <span className="hover:text-cyan-400 cursor-pointer transition">
              Home
            </span>
            <span className="hover:text-cyan-400 cursor-pointer transition">
              Shop
            </span>
            <div className="relative">
              <span onClick={()=>{navigate("/addToCart")}} className="cursor-pointer">Cart</span>
              <span className="absolute -top-2 -right-3 bg-cyan-600 text-[10px] px-1.5 rounded-full">
                {count}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="py-16 px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
          Next Gen <span className="text-cyan-500">Collection</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-lg">
          Explore our premium products crafted for excellence and style.
        </p>
      </header>

      {/* --- Product Grid --- */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-xl font-semibold border-l-4 border-cyan-500 pl-3">
            Featured Products
          </h3>
          <span className="text-sm text-slate-500">
            {products?.length || 0} items found
          </span>
        </div>

        <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products && products.length > 0 ? (
            products.map(
              (item, index) => (
                (
                  <div 
                    key={index}
                    className="group relative bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 shadow-xl"
                  >
                    {/* Image Container */}
                    <div className="aspect-square overflow-hidden bg-slate-900/50 rounded-t-2xl flex items-center justify-center p-2">
                      <img onClick={()=>{navigate(`/products/${item._id}`)}}
                        src={
                          item.images?.[0]?.url ||
                          "https://via.placeholder.com/300"
                        }
                        alt={item.name}
                        className="
      h-full w-full 
      object-contain       
      group-hover:scale-105 transition-transform duration-500
    "
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-slate-100 truncate flex-1">
                          {item.title}
                        </h4>
                        <span className="text-cyan-400 font-bold ml-2">
                          ₹{item.price.amount}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                        {item.description ||
                          "High-quality premium product designed for durability and comfort."}
                      </p>

                  <div className="flex gap-2">
                  <button onClick={()=>{handleAddToCart(item._id)}} className="w-full py-2.5 bg-slate-700 hover:bg-cyan-600 text-white rounded-xl text-sm font-semibold transition-colors duration-200">
                        Add to Cart
                      </button>
                      <button onClick={()=>{navigate("/checkout")}} className="w-full py-2.5 bg-slate-700 hover:bg-cyan-600 text-white rounded-xl text-sm font-semibold transition-colors duration-200">
                        By Now
                      </button>
                  </div>
                    </div>
                  </div>
                )
              )
            )
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="animate-pulse text-slate-500">
                Loading amazing products...
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
