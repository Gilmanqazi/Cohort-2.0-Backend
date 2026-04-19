import React, { useEffect } from 'react'
import { useProduct } from '../Hook/useProduct'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SellerDashboard from './SellerProductDetails'

const GetSellerProducts = () => {
  const navigate = useNavigate()
  const { handleGetSellerProducts } = useProduct()
  const products = useSelector((state) => state.product.sellerProduct)
  console.log(products)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    await handleGetSellerProducts()
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase italic">
              Inventory <span className="text-cyan-600">Control</span>
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Manage your master products and their associated variants.
            </p>
          </div>
          <button 
            onClick={() => navigate('/createProduct')}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-lg active:scale-95"
          >
            + Create New Product
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products && products.length > 0 ? (
            products.map((item) => {
              const mainImageUrl =
                typeof item.images?.[0] === "string"
                  ? item.images[0]
                  : item.images?.[0]?.url;

              return (
                <div key={item._id} className="flex flex-col gap-4">
                  
                  {/* --- Main Product Card --- */}
                  <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm group hover:border-cyan-500/50 transition-all duration-300">
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                      <img 
                        src={mainImageUrl || "https://via.placeholder.com/400"} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold shadow-sm">
                        MASTER ID: {item._id.slice(-6).toUpperCase()}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-lg font-bold text-slate-900 truncate pr-4">
                          {item.title}
                        </h2>
                        <span className="text-cyan-600 font-black">
                          ₹{item.price.amount}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed font-medium">
                        {item.description}
                      </p>
                      
                      <button 
                         onClick={() => navigate(`/seller/products/${item._id}`)}
                         className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:border-cyan-500 hover:text-cyan-600 transition-all"
                      >
                         + Add Variant to this product
                      </button>
                    </div>
                  </div>

                  {/* --- Variants Gallery (Jo aap dekhna chahte hain) --- */}
                  <div className="px-2">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <div className="h-[1px] w-4 bg-slate-300" />
                      Active Variants ({item.varients?.length || 0})
                    </h3>

                    <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                      {item.varients && item.varients.length > 0 ? (
                        item.varients.map((v, i) => (
                          console.log(v.images[0]?.url,"VVV"),
                          <div 
                            key={v._id || i}
                            className="min-w-[120px] bg-white border border-slate-200 rounded-2xl p-2 shadow-sm flex flex-col gap-2 hover:shadow-md transition"
                          >
                            <div className="h-20 w-full bg-slate-50 rounded-xl overflow-hidden">
                              <img 
                                src={v.images[0]?.url } 
                                className="w-full h-full object-cover"
                                alt="variant"
                              />
                            </div>
                            <div className="px-1">
                              <p className="text-[10px] font-black text-slate-800 tracking-tighter">
                                ₹{v.price?.amount || item.price.amount}
                              </p>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-[8px] font-bold text-slate-400 uppercase">Stock: {v.stock || 0}</span>
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="w-full py-4 px-6 bg-slate-100 rounded-2xl border border-dashed border-slate-200">
                           <p className="text-[10px] text-slate-400 font-medium italic text-center">
                             No variants found. Start adding colors or sizes!
                           </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-40 text-center">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Loading Your Warehouse...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GetSellerProducts;