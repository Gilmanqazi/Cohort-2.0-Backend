import React, { useEffect } from 'react'
import { useProduct } from '../Hook/useProduct'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Trash2, Plus, Package, Layers } from 'lucide-react'

const GetSellerProducts = () => {
  const navigate = useNavigate()
  const { handleGetSellerProducts, handleDeleteProduct } = useProduct()
  const products = useSelector((state) => state.product.sellerProduct)

  useEffect(() => {
    handleGetSellerProducts()
  }, [])

  const onDeleteClick = async (id) => {
    if (window.confirm('Delete this product permanently?')) {
      await handleDeleteProduct(id)
      handleGetSellerProducts()
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 font-sans antialiased">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-light tracking-[0.2em] uppercase mb-2">
              Inventory <span className="font-bold">Studio</span>
            </h1>
            <p className="text-xs text-zinc-500 tracking-widest uppercase flex items-center gap-2">
              <Package size={14} /> Curate and manage your elite collection
            </p>
          </div>

          <button
            onClick={() => navigate('/createProduct')}
            className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            <Plus size={16} /> Add Product
          </button>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((item) => {
            const img = item.images?.[0]?.url || item.images?.[0]

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 group"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={img} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60"></div>
                  
                  <button
                    onClick={() => onDeleteClick(item._id)}
                    className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-full text-zinc-400 hover:text-red-500 border border-white/10 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="font-medium text-lg tracking-tight truncate pr-4 uppercase">
                      {item.title}
                    </h2>
                    <span className="font-black text-white tracking-tighter">
                      ₹{item.price.amount.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2 uppercase tracking-wider mb-6">
                    {item.description}
                  </p>

                  <button
                    onClick={() => navigate(`/seller/products/${item._id}`)}
                    className="w-full bg-transparent border border-zinc-800 text-zinc-400 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                  >
                    Manage Variants
                  </button>
                </div>

                {/* Variants Preview Footer */}
                <div className="bg-white/[0.02] border-t border-white/5 p-5">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-600 mb-4 font-bold">
                    <span className="flex items-center gap-2"><Layers size={12}/> Editions</span>
                    <span>{item.varients?.length || 0} Total</span>
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                    {item.varients?.length > 0 ? (
                      item.varients.map((v) => (
                        <div key={v._id} className="min-w-[100px] flex flex-col gap-2">
                          <div className="h-20 w-full rounded-lg overflow-hidden border border-white/5 bg-zinc-900">
                            <img
                              src={v.images?.[0]?.url}
                              className="h-full w-full object-cover grayscale opacity-60"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold tracking-tighter">₹{v.price?.amount}</span>
                            <span className="text-[8px] text-zinc-600 uppercase">Stock: {v.stock}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-[10px] text-zinc-700 uppercase tracking-widest py-2">No variants curated</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {products?.length === 0 && (
          <div className="h-[50vh] flex flex-col justify-center items-center text-center">
            <div className="w-20 h-[1px] bg-zinc-800 mb-8"></div>
            <h2 className="text-xl font-extralight tracking-[0.3em] text-zinc-500 uppercase">Archive Empty</h2>
            <p className="text-[10px] text-zinc-700 tracking-widest uppercase mt-2">Start by adding your first masterpiece</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default GetSellerProducts;