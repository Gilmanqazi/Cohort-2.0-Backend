import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useProduct } from '../Hook/useProduct';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { UploadCloud, X, ChevronLeft, Sparkles } from 'lucide-react';

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];
const MAX_IMAGES = 7;

const CreateProduct = () => {
  const { handleSelectProducts } = useProduct();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceAmount: '',
    priceCurrency: 'INR',
  });

  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addFiles = (files) => {
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) return;

    const newImages = Array.from(files)
      .slice(0, remaining)
      .map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));

    setImages(prev => [...prev, ...newImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return toast.error("Please add at least one image");
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      images.forEach(img => data.append('images', img.file));

      await handleSelectProducts(data);
      toast.success('Product Created');
      navigate('/getProducts');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 md:py-16">

        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <Sparkles size={16} className="text-zinc-500" />
               <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Studio Archive</span>
            </div>
            <h1 className="text-4xl font-light tracking-tight uppercase">New <span className="font-bold">Creation</span></h1>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-all group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Vault
          </button>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT: Core Details (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-3xl space-y-10 shadow-2xl">
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-black">Designation</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-zinc-900 focus:border-white outline-none py-3 text-lg transition-all placeholder:text-zinc-800"
                  placeholder="e.g. Midnight Oversized Blazer"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-black">The Narrative</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-transparent border-b border-zinc-900 focus:border-white outline-none py-3 text-sm transition-all resize-none placeholder:text-zinc-800"
                  placeholder="Tell the story behind this piece..."
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-black">Valuation</label>
                <div className="flex gap-6 items-end">
                  <div className="flex-1">
                     <input
                        type="number"
                        name="priceAmount"
                        value={formData.priceAmount}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-zinc-900 focus:border-white outline-none py-3 text-xl font-bold transition-all placeholder:text-zinc-800"
                        placeholder="0.00"
                        required
                     />
                  </div>

                  <select
                    name="priceCurrency"
                    value={formData.priceCurrency}
                    onChange={handleChange}
                    className="bg-[#0A0A0A] border-b border-zinc-900 focus:border-white outline-none py-3 text-[10px] uppercase tracking-widest cursor-pointer"
                  >
                    {CURRENCIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Assets (5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-3xl shadow-2xl">
              
              <div className="flex justify-between items-center mb-6">
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-black">Visual Assets</label>
                <span className="text-[10px] font-mono text-zinc-700 tracking-tighter">{images.length} / {MAX_IMAGES}</span>
              </div>

              <motion.div
                whileHover={{ scale: 0.99 }}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  addFiles(e.dataTransfer.files);
                }}
                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300
                ${isDragging ? 'border-white bg-white/5' : 'border-zinc-900 hover:border-zinc-700 bg-zinc-900/20'}`}
              >
                <UploadCloud className="mx-auto mb-4 text-zinc-600" size={32} strokeWidth={1} />
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Drop high-res images or click</p>
              </motion.div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                hidden
                onChange={(e) => addFiles(e.target.files)}
                accept="image/*"
              />

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-8">
                  {images.map((img, i) => (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={i} 
                        className="relative group aspect-[3/4] overflow-hidden rounded-lg bg-zinc-900"
                    >
                      <img src={img.preview} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      <button
                        type="button"
                        onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 bg-black/80 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X size={12} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button Section */}
            <div className="pt-4">
               <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 rounded-full text-[11px] font-black uppercase tracking-[0.5em] transition-all duration-500
                  ${isSubmitting 
                    ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed' 
                    : 'bg-white text-black hover:bg-zinc-200 active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.05)]'}`}
               >
                  {isSubmitting ? 'Processing...' : 'Publish to Collection'}
               </button>
               <p className="text-center mt-6 text-[9px] text-zinc-700 uppercase tracking-widest">
                  Ensure all details are curated correctly before publishing.
               </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateProduct;