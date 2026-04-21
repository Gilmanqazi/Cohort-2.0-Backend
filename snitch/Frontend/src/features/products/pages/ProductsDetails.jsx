import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useProduct } from '../Hook/useProduct';
import { motion, AnimatePresence } from 'framer-motion'; 
import { useCart } from '../cart/Hook/userCart';
import Nav from "../components/nav"

const ProductsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleProductById } = useProduct();
  const product = useSelector((state) => state.product.productById);

  const {handleAddToCart} = useCart()

  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeImage, setActiveImage] = useState("");

 

  useEffect(() => {
    if (id) handleProductById(id);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product && product._id === id) {
      setActiveImage(product.images[0]?.url);
      setSelectedVariant(null);
      setSelectedAttributes({});
    }
  }, [product, id]);

  const getDynamicAttributes = () => {
    const attrMap = {};
    product?.varients?.forEach(v => {
     
      if (v.attribute) {
        Object.entries(v.attribute).forEach(([key, value]) => {
          if (!attrMap[key]) attrMap[key] = new Set();
          attrMap[key].add(value);
        });
      }
    });
    const finalAttrs = {};
    for (const key in attrMap) {
      finalAttrs[key] = Array.from(attrMap[key]);
    }
    return finalAttrs;
  };

  const availableAttributes = getDynamicAttributes();

  useEffect(() => {
    if (Object.keys(selectedAttributes).length > 0) {
      const match = product?.varients?.find(v => 
        Object.entries(selectedAttributes).every(([key, value]) => v.attribute[key] === value)
      );
      if (match) {
        setSelectedVariant(match);
        setActiveImage(match.images[0].url || product.images[0]?.url);
      } else {
        setSelectedVariant(null);
      }
    }
  }, [selectedAttributes, product]);

  // --- Naya Function: Photo click karne par attributes auto-select ho jayein ---
  const handleVariantPhotoClick = (v) => {
    setSelectedVariant(v);
    setActiveImage(v.images[0]?.url|| product.images[0]?.url);
    if (v.attribute) {
      setSelectedAttributes(v.attribute); // Isse buttons bhi apne aap highlight ho jayenge
    }
  };

  if (!product || product?._id !== id) return <div className="min-h-screen bg-[#05070a]" />;

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
      <Nav/>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-[#0d1117] rounded-[3rem] p-8 border border-white/5">
          
          {/* LEFT: Image & Thumbnails */}
          <div className="flex flex-col gap-8">
            <motion.div 
              key={activeImage}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="aspect-square bg-[#161b22] rounded-[2rem] overflow-hidden flex items-center justify-center p-12 border border-white/5"
            >
              <img src={activeImage} className="max-h-full object-contain" />
            </motion.div>

            {/* --- VARIENTS IMAGES LIST (Jo missing thi) --- */}
            {product.varients?.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Visual Variants</h3>
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                  {/* Original Product Photo */}
                  <div 
                    onClick={() => { setSelectedVariant(null); setSelectedAttributes({}); setActiveImage(product.images[0]?.url); }}
                    className={`min-w-[80px] h-24 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all p-1 ${!selectedVariant ? 'border-emerald-500 bg-cyan-500/10' : 'border-transparent bg-white/5 opacity-40'}`}
                  >
                    <img src={product.images[0]?.url} className="w-full h-full object-cover rounded-xl" />
                  </div>

                  {/* All Other Variants Photos */}
                  {product.varients.map((v, i) => (
                    <div 
                      key={v._id || i}
                      onClick={() => handleVariantPhotoClick(v)}
                      className={`min-w-[80px] h-24 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all p-1 ${selectedVariant?._id === v._id ? 'border-emerald-500 bg-cyan-500/10' : 'border-transparent bg-white/5 opacity-40'}`}
                    >
                      <img src={v.images[0]?.url } className="w-full h-full object-cover rounded-xl" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Attributes & Info */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-black text-white mb-4 italic tracking-tighter">{product.title}</h1>
            
            <div className="text-3xl font-mono font-bold text-emerald-400 mb-8">
              ₹{selectedVariant ? selectedVariant?.price?.amount : product?.price?.amount}
              
            </div>

            {/* Dynamic Buttons (Color, Edition, etc.) */}
            <div className="space-y-8 mb-10">
              {Object.entries(availableAttributes).map(([attrKey, values]) => (
                
           
                <div key={attrKey}>
                  <p className="text-[10px] font-black uppercase text-slate-500 mb-4 tracking-widest">{attrKey}</p>
                  <div className="flex flex-wrap gap-2">
                    {values.map((val) => (  
                      
                      <button
                        key={val}
                        onClick={() => setSelectedAttributes(prev => ({ ...prev, [attrKey]: val }))}
                        className={`px-4 py-2 rounded-xl border-2 text-[10px] font-bold uppercase transition-all ${
                          selectedAttributes[attrKey] === val ? 'bg-white border-white text-black' : 'bg-transparent border-white/10 text-slate-400 hover:border-white/30'
                        }`}
                      >
                        {val}
                     </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => handleAddToCart(id)} className="w-full py-5 bg-emerald-600 text-black font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all">
              {selectedVariant?.stock <= 0 ? "Out of Stock" : "Add to Vault"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;