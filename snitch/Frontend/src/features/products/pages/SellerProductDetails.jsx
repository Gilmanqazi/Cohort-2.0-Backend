import React, { useEffect, useState, useRef } from 'react';
import { useProduct } from '../Hook/useProduct';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Upload, X, Box, Zap, Layers, ChevronRight } from 'lucide-react';

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
                    setLocalVariants(prod?.variants || prod?.varients || []);
                }
            } catch (err) { 
                console.error("Sync Error:", err); 
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
        <div className="flex flex-col md:flex-row h-screen bg-[#020202] text-zinc-400 overflow-hidden font-sans selection:bg-purple-500/30">
            
            {/* --- SIDEBAR --- */}
            <aside className="w-full md:w-80 border-r border-white/5 bg-[#050505] flex flex-col shrink-0 z-20 shadow-2xl">
                <div className="p-8 border-b border-white/5">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                        <h2 className="text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase">System Core</h2>
                    </div>
                    <h1 className="text-2xl font-light text-white tracking-tighter">Inventory <span className="font-bold italic">Vault</span></h1>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
                    {allProducts.map((p) => (
                        <motion.div
                            whileTap={{ scale: 0.98 }}
                            key={p._id}
                            onClick={() => navigate(`/seller/product/${p._id}`)}
                            className={`group relative p-3 rounded-2xl cursor-pointer transition-all duration-300 ${id === p._id ? 'bg-white/5 border border-white/10 shadow-lg' : 'hover:bg-white/[0.02] border border-transparent'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative overflow-hidden w-12 h-12 rounded-xl bg-zinc-900 border border-white/5">
                                    <img src={p.images?.[0]?.url} className={`w-full h-full object-cover transition-all duration-700 ${id === p._id ? 'grayscale-0 scale-110' : 'grayscale group-hover:grayscale-0'}`} alt="" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className={`text-[11px] font-bold truncate uppercase tracking-wider ${id === p._id ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{p.title}</p>
                                    <p className="text-[10px] font-mono opacity-50 tracking-widest text-purple-400 mt-0.5">₹{p.price?.amount}</p>
                                </div>
                                {id === p._id && <ChevronRight size={14} className="text-purple-500" />}
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="p-6 border-t border-white/5">
                    <button className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 border border-white/5">
                        <Plus size={14} /> Global Export
                    </button>
                </div>
            </aside>

            {/* --- MAIN PANEL --- */}
            <main className="flex-1 overflow-y-auto custom-scrollbar relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] -z-10 rounded-full" />
                
                {loading ? (
                    <div className="h-full flex flex-col items-center justify-center gap-4">
                        <div className="flex gap-1">
                            {[0, 1, 2].map(i => (
                                <motion.div key={i} animate={{ height: [10, 30, 10] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }} className="w-1 bg-purple-500/50 rounded-full" />
                            ))}
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-600">Initializing_Node</span>
                    </div>
                ) : !product ? (
                    <div className="h-full flex flex-col items-center justify-center">
                         <Box size={48} className="text-zinc-800 mb-6" strokeWidth={1} />
                         <p className="text-[11px] tracking-[0.3em] uppercase text-zinc-600">Select an asset to view parameters</p>
                    </div>
                ) : (
                    <div className="p-6 md:p-16 max-w-7xl mx-auto">
                        
                        {/* Hero Header */}
                        <div className="flex flex-col xl:flex-row gap-16 mb-24 relative">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative shrink-0 mx-auto xl:mx-0">
                                <div className="absolute -inset-10 bg-purple-600/10 blur-[80px] rounded-full" />
                                <img src={product.images?.[0]?.url} className="relative w-72 h-[450px] object-cover rounded-[2.5rem] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]" alt="" />
                            </motion.div>

                            <div className="flex-1 text-center xl:text-left py-4">
                                <div className="flex items-center justify-center xl:justify-start gap-4 mb-8">
                                    <span className="flex items-center gap-2 text-[9px] px-4 py-1.5 bg-purple-500/10 text-purple-400 rounded-full font-black border border-purple-500/20 uppercase tracking-[0.2em] shadow-inner">
                                        <Zap size={10} fill="currentColor" /> Master Asset
                                    </span>
                                    <span className="text-[9px] px-4 py-1.5 bg-white/5 text-zinc-600 rounded-full font-bold border border-white/5 uppercase tracking-[0.2em]">UID: {id?.slice(-8)}</span>
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.9] text-white italic drop-shadow-2xl">
                                    {product.title}
                                </h1>
                                <p className="text-zinc-500 text-lg max-w-2xl mb-10 leading-relaxed font-light">{product.description}</p>
                                <div className="text-5xl font-bold tracking-tighter text-white inline-block border-b-2 border-purple-500 pb-2">
                                    <span className="text-purple-500 text-2xl align-top mr-1 uppercase">Price</span> {product.price?.amount}
                                </div>
                            </div>
                        </div>

                        {/* Variants Hub */}
                        <section className="mt-32">
                            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-white/5 pb-8 mb-12 gap-6">
                                <div>
                                    <div className="flex items-center gap-2 text-purple-500 mb-2 font-mono text-[10px] tracking-widest uppercase font-bold">
                                        <Layers size={14} /> Matrix Configurations
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tight text-white italic">Variant Control</h3>
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.02, backgroundColor: '#fff' }} whileTap={{ scale: 0.98 }}
                                    onClick={() => setIsAddingVariant(true)}
                                    className="px-8 py-4 rounded-2xl bg-zinc-100 text-black text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)]"
                                >
                                    New Variant +
                                </motion.button>
                            </div>

                            <AnimatePresence>
                                {isAddingVariant && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.98, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 20 }}
                                        className="bg-[#080808] border border-white/10 rounded-[3rem] p-10 md:p-16 mb-20 relative overflow-hidden shadow-3xl shadow-purple-500/5"
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
                                            {/* Media Ingestion */}
                                            <div className="space-y-8">
                                                <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em] ml-2">Visual Source</label>
                                                <div 
                                                    onClick={() => fileInputRef.current.click()}
                                                    className="group relative cursor-pointer border-2 border-dashed border-zinc-800 hover:border-purple-500/40 rounded-[2.5rem] p-20 transition-all flex flex-col items-center justify-center bg-white/[0.02]"
                                                >
                                                    <input type="file" multiple hidden ref={fileInputRef} onChange={handleImageChange} />
                                                    <div className="w-20 h-20 rounded-3xl bg-zinc-900 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 transition-all duration-500">
                                                        <Upload className="text-zinc-500 group-hover:text-white" />
                                                    </div>
                                                    <p className="text-[10px] font-black text-zinc-600 tracking-[0.2em] uppercase">Inject Assets</p>
                                                </div>

                                                <div className="flex flex-wrap gap-4">
                                                    {imagePreviews.map((img, idx) => (
                                                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={idx} className="relative w-24 h-24 group rounded-2xl overflow-hidden border border-white/5">
                                                            <img src={img.previewUrl} className="w-full h-full object-cover" alt="" />
                                                            <button onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))} className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"><X size={16} /></button>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Data Entry */}
                                            <div className="space-y-10">
                                                <div className="space-y-6">
                                                    <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em] ml-2">Parameters</label>
                                                    {attributeInputs.map((attr, idx) => (
                                                        <div key={idx} className="flex gap-4">
                                                            <input placeholder="Key" className="flex-1 bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-purple-500/50 text-[11px] uppercase tracking-widest text-white transition-all" value={attr.key} onChange={(e) => handleAttributeChange(idx, 'key', e.target.value)} />
                                                            <input placeholder="Value" className="flex-1 bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-purple-500/50 text-[11px] uppercase tracking-widest text-white transition-all" value={attr.value} onChange={(e) => handleAttributeChange(idx, 'value', e.target.value)} />
                                                        </div>
                                                    ))}
                                                    <button onClick={() => setAttributeInputs([...attributeInputs, { key: '', value: '' }])} className="text-[9px] font-black text-purple-500 hover:text-purple-400 tracking-[0.3em] ml-2">+ EXTEND SPECS</button>
                                                </div>

                                                <div className="grid grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-2">Stock Level</label>
                                                        <input type="number" className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-purple-500/50 text-sm text-white" value={newVariant.stock} onChange={(e) => setNewVariant({...newVariant, stock: e.target.value})} />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-2">Price Delta</label>
                                                        <input type="number" placeholder={product.price?.amount} className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-purple-500/50 text-sm text-white" value={newVariant.price.amount} onChange={(e) => setNewVariant({...newVariant, price: {...newVariant.price, amount: e.target.value}})} />
                                                    </div>
                                                </div>

                                                <div className="flex gap-6 pt-10">
                                                    <button onClick={() => setIsAddingVariant(false)} className="flex-1 py-5 text-[10px] font-black text-zinc-600 hover:text-white transition-all uppercase tracking-[0.4em]">Abort_Mission</button>
                                                    <button onClick={submitVariant} className="flex-1 py-5 bg-purple-600 hover:bg-purple-500 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.4em] shadow-xl shadow-purple-900/20 transition-all active:scale-[0.98]">Commit_Variant</button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Variants Visualization */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {localVariants.map((v, i) => (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                        whileHover={{ y: -10 }}
                                        key={v._id || i} className="group bg-[#0A0A0A] border border-white/5 p-8 rounded-[2.5rem] hover:bg-zinc-900/40 hover:border-purple-500/20 transition-all duration-500 shadow-2xl"
                                    >
                                        <div className="flex flex-col gap-6">
                                            <div className="relative aspect-square rounded-3xl overflow-hidden bg-black border border-white/5 shadow-inner">
                                                <img src={v.images?.[0]?.url || product.images?.[0]?.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" alt="" />
                                                <div className="absolute top-4 right-4 text-[10px] font-mono text-white bg-black/80 px-3 py-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all">₹{v.price?.amount || product.price?.amount}</div>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {Object.entries(v.attributes || {}).map(([k, val]) => (
                                                        <span key={k} className="text-[8px] font-black px-3 py-1 bg-zinc-800 text-zinc-400 rounded-lg uppercase tracking-widest">{val}</span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                    <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest font-mono">Status_Code</span>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest font-mono ${v.stock > 10 ? 'text-emerald-500' : v.stock > 0 ? 'text-amber-500' : 'text-rose-600 animate-pulse'}`}>
                                                        {v.stock > 0 ? `${v.stock} UNITS` : 'OUT_OF_SYNC'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}
            </main>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.03); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(168,85,247,0.2); }
            `}</style>
        </div>
    );
};

export default SellerDashboard;