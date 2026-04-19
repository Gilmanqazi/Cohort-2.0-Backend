import React, { useEffect, useState, useRef } from 'react';
import { useProduct } from '../Hook/useProduct';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;

const SellerDashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const { handleProductById, handleAddProductVariant, handleGetSellerProducts } = useProduct();

    const [allProducts, setAllProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [localVariants, setLocalVariants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddingVariant, setIsAddingVariant] = useState(false);

    const [attributeInputs, setAttributeInputs] = useState([{ key: '', value: '' }]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [newVariant, setNewVariant] = useState({
        images: [],
        stock: 0,
        attributes: {},
        price: { amount: '', currency: 'INR' }
    });

    useEffect(() => {
        async function loadInitialData() {
            setLoading(true);
            try {
                const productsRes = await handleGetSellerProducts();
                setAllProducts(productsRes?.products || []);
                
                if (id) {
                    const data = await handleProductById(id);
                    const prod = data?.product || data;
                    setProduct(prod);
                    // Check if field is 'variants' or 'varients' based on your DB
                    setLocalVariants(prod?.varients || prod?.variants || []);
                } else {
                    setProduct(null);
                }
            } catch (err) { 
                console.error("Error loading data:", err); 
            } finally { 
                setLoading(false); 
            }
        }
        loadInitialData();
    }, [id]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = files.map(file => ({
            file,
            previewUrl: URL.createObjectURL(file)
        }));
        
        setImagePreviews(prev => [...prev, ...newPreviews]);
        setNewVariant(prev => ({ ...prev, images: [...prev.images, ...files] }));
    };

    const removeImage = (index) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        setNewVariant(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    const handleAddAttribute = () => setAttributeInputs([...attributeInputs, { key: '', value: '' }]);
    
    const handleAttributeChange = (index, field, value) => {
        const updated = [...attributeInputs];
        updated[index][field] = value;
        setAttributeInputs(updated);
        const obj = {};
        updated.forEach(a => { if (a.key.trim()) obj[a.key.trim()] = a.value });
        setNewVariant(prev => ({ ...prev, attributes: obj }));
    };

    const submitVariant = async () => {
        const variantToSave = {
            images: imagePreviews.map(img => ({ url: img.previewUrl, file: img.file })),
            stock: Number(newVariant.stock),
            attributes: { ...newVariant.attributes },
            price: {
                amount: newVariant.price.amount ? Number(newVariant.price.amount) : product.price.amount,
                currency: 'INR'
            }
        };
        
        await handleAddProductVariant(id, variantToSave);
        setLocalVariants(prev => [...prev, variantToSave]);
        setIsAddingVariant(false);
        setImagePreviews([]);
        setNewVariant({ images: [], stock: 0, attributes: {}, price: { amount: '', currency: 'INR' } });
        setAttributeInputs([{ key: '', value: '' }]);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-[#050505] text-gray-200 overflow-hidden font-sans">
            
            {/* --- SIDEBAR --- */}
            <aside className="w-full md:w-72 border-r border-white/5 bg-[#080808] flex flex-col shrink-0 z-10">
                <div className="p-8">
                    <h2 className="text-xs font-black tracking-[0.3em] text-purple-500 mb-1">TERMINAL</h2>
                    <h1 className="text-xl font-bold text-white uppercase italic">Inventory</h1>
                </div>
                <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
                    {allProducts.map((p) => (
                        <div
                            key={p._id}
                            onClick={() => navigate(`/seller/product/${p._id}`)}
                            className={`group relative p-4 rounded-xl cursor-pointer transition-all ${id === p._id ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
                        >
                            {id === p._id && <motion.div layoutId="activeTab" className="absolute left-0 top-2 bottom-2 w-1 bg-purple-500 rounded-full" />}
                            <div className="flex items-center gap-4">
                                <img src={p.images?.[0]?.url} className="w-10 h-10 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                                <div className="min-w-0">
                                    <p className="text-[11px] font-bold truncate uppercase tracking-tight">{p.title}</p>
                                    <p className="text-[10px] text-gray-600 font-mono">₹{p.price?.amount}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* --- MAIN PANEL --- */}
            <main className="flex-1 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent">
                {loading ? (
                    <div className="h-full flex items-center justify-center">
                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-purple-500 font-mono tracking-widest text-sm uppercase">
                            Synchronizing_System...
                        </motion.div>
                    </div>
                ) : !product ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-700">
                         <div className="w-16 h-1 bg-white/5 mb-4 rounded-full overflow-hidden">
                            <motion.div animate={{ x: [-64, 64] }} transition={{ repeat: Infinity, duration: 1 }} className="h-full w-1/2 bg-purple-600" />
                         </div>
                         <p className="text-[10px] tracking-[0.2em] uppercase">Select Asset to Initialize</p>
                    </div>
                ) : (
                    <div className="p-6 md:p-12 max-w-6xl mx-auto">
                        
                        {/* Header Section */}
                        <div className="flex flex-col lg:flex-row gap-12 mb-20 items-center lg:items-start">
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative group">
                                <div className="absolute -inset-4 bg-purple-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                <img src={product.images?.[0]?.url} className="relative w-64 h-80 object-cover rounded-3xl border border-white/10 shadow-2xl" alt={product.title} />
                            </motion.div>
                            <div className="text-center lg:text-left flex-1">
                                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                                    <span className="text-[9px] px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full font-bold border border-purple-500/20 uppercase tracking-widest">Master Product</span>
                                    <span className="text-[9px] px-3 py-1 bg-white/5 text-gray-500 rounded-full font-bold border border-white/5 uppercase tracking-widest">ID: {id?.slice(-6)}</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none text-white">{product.title}</h1>
                                <p className="text-gray-500 text-sm max-w-xl mb-8 leading-relaxed font-medium italic">{product.description}</p>
                                <div className="text-3xl font-bold tracking-tighter text-white">
                                    <span className="text-purple-500 mr-2">₹</span>{product.price?.amount}
                                </div>
                            </div>
                        </div>

                        {/* Variants Section */}
                        <section>
                            <div className="flex items-end justify-between border-b border-white/5 pb-6 mb-10">
                                <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">Configuration Hub</h3>
                                    <p className="text-[10px] text-gray-600 font-mono uppercase mt-1">Manage SKU variants and inventory levels</p>
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsAddingVariant(true)}
                                    className="px-6 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                >
                                    Add New Variant
                                </motion.button>
                            </div>

                            <AnimatePresence>
                                {isAddingVariant && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                                        className="bg-[#0c0c0c] border border-white/10 rounded-[2rem] p-8 md:p-12 mb-12 relative overflow-hidden"
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                            <div className="space-y-6">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Visual Assets</label>
                                                <div 
                                                    onClick={() => fileInputRef.current.click()}
                                                    className="group cursor-pointer border-2 border-dashed border-white/5 hover:border-purple-500/40 rounded-3xl p-12 transition-all flex flex-col items-center justify-center bg-white/[0.01]"
                                                >
                                                    <input type="file" multiple hidden ref={fileInputRef} onChange={handleImageChange} />
                                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                        <UploadIcon />
                                                    </div>
                                                    <p className="text-xs font-bold text-gray-400">Click to Upload Variants</p>
                                                </div>

                                                <div className="flex flex-wrap gap-3">
                                                    {imagePreviews.map((img, idx) => (
                                                        <div key={idx} className="relative w-20 h-20 group">
                                                            <img src={img.previewUrl} className="w-full h-full object-cover rounded-xl border border-white/10" alt="" />
                                                            <button 
                                                                onClick={(e) => {e.stopPropagation(); removeImage(idx);}}
                                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                <div>
                                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 block">Specs & Attributes</label>
                                                    {attributeInputs.map((attr, idx) => (
                                                        <div key={idx} className="flex gap-4 mb-4">
                                                            <input 
                                                                placeholder="e.g. Color" className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-purple-500/50 text-xs font-medium"
                                                                value={attr.key} onChange={(e) => handleAttributeChange(idx, 'key', e.target.value)}
                                                            />
                                                            <input 
                                                                placeholder="e.g. Neon Blue" className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-purple-500/50 text-xs font-medium"
                                                                value={attr.value} onChange={(e) => handleAttributeChange(idx, 'value', e.target.value)}
                                                            />
                                                        </div>
                                                    ))}
                                                    <button onClick={handleAddAttribute} className="text-[10px] font-black text-purple-500 hover:text-purple-400">+ ADD ATTRIBUTE</button>
                                                </div>

                                                <div className="grid grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="text-[10px] font-black text-gray-500 uppercase block mb-2">Stock Level</label>
                                                        <input type="number" className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-purple-500/50 text-xs text-white" value={newVariant.stock} onChange={(e) => setNewVariant({...newVariant, stock: e.target.value})} />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] font-black text-gray-500 uppercase block mb-2">Adjusted Price</label>
                                                        <input type="number" placeholder={product.price?.amount} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-purple-500/50 text-xs text-white" value={newVariant.price.amount} onChange={(e) => setNewVariant({...newVariant, price: {...newVariant.price, amount: e.target.value}})} />
                                                    </div>
                                                </div>

                                                <div className="flex gap-4 pt-4">
                                                    <button onClick={() => setIsAddingVariant(false)} className="flex-1 py-4 text-[10px] font-black text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em]">Abort</button>
                                                    <button onClick={submitVariant} className="flex-1 py-4 bg-purple-600 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-lg shadow-purple-600/20">Commit Variant</button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Variants Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {localVariants.map((v, i) => (
                                    <motion.div 
                                        whileHover={{ y: -5 }}
                                        key={v._id || i} className="group bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] hover:bg-white/[0.04] transition-all"
                                    >
                                        <div className="flex gap-4 items-start mb-6">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-black shadow-inner border border-white/5">
                                                <img src={v.images?.[0]?.url || product.images?.[0]?.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                            </div>
                                            <div className="flex-1 pt-1">
                                                <div className="flex flex-wrap gap-1.5 mb-2">
                                                    {Object.entries(v.attributes || {}).map(([k, val]) => (
                                                        <span key={k} className="text-[8px] font-black px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-md border border-purple-500/10 uppercase">{val}</span>
                                                    ))}
                                                </div>
                                                <p className="text-xl font-bold tracking-tight text-white">₹{v.price?.amount || product.price?.amount}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-4 text-[9px] font-mono tracking-tighter">
                                            <span className="text-gray-600 uppercase">System Availability</span>
                                            <span className={v.stock > 10 ? 'text-green-500 font-bold' : v.stock > 0 ? 'text-orange-500 font-bold' : 'text-red-500 font-bold'}>
                                                {v.stock > 0 ? `${v.stock} UNITS` : 'DEPLETED'}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}
            </main>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(168,85,247,0.3); }
            `}</style>
        </div>
    );
};

export default SellerDashboard;