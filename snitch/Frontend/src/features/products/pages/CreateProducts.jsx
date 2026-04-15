import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useProduct } from '../Hook/useProduct';
import { toast } from 'react-toastify';

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
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      images.forEach(img => data.append('images', img.file));
      
      await handleSelectProducts(data);
      toast.success("Post Created")
      navigate('/getProducts');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">

        {/* Header */}
        <div className="mb-14 flex items-center justify-between">
          <h1 className="text-3xl font-medium tracking-tight">
            Create Product
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-[#9a9a9a] hover:text-white transition"
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid lg:grid-cols-2 gap-16">

            {/* LEFT SIDE */}
            <div className="flex flex-col gap-12">

              {/* Title */}
              <div>
                <label className="text-xs tracking-widest text-[#8a8a8a] uppercase">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Oversized Linen Shirt"
                  className="w-full bg-transparent border-b border-[#2a2a2a] focus:border-white outline-none py-3 mt-2 text-lg placeholder:text-[#444]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs tracking-widest text-[#8a8a8a] uppercase">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Material, fit, details..."
                  className="w-full bg-transparent border-b border-[#2a2a2a] focus:border-white outline-none py-3 mt-2 text-sm placeholder:text-[#444] resize-none"
                />
              </div>

              {/* Price */}
              <div>
                <label className="text-xs tracking-widest text-[#8a8a8a] uppercase">
                  Price
                </label>

                <div className="flex gap-6 mt-3">

                  <input
                    type="number"
                    name="priceAmount"
                    value={formData.priceAmount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="flex-1 bg-transparent border-b border-[#2a2a2a] focus:border-white outline-none py-2"
                  />

                  <select
                    name="priceCurrency"
                    value={formData.priceCurrency}
                    onChange={handleChange}
                    className="bg-transparent border-b border-[#2a2a2a] focus:border-white outline-none py-2"
                  >
                    {CURRENCIES.map(c => (
                      <option key={c} value={c} className="bg-black">
                        {c}
                      </option>
                    ))}
                  </select>

                </div>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div>

              <div className="flex justify-between items-center mb-4">
                <p className="text-xs tracking-widest text-[#8a8a8a] uppercase">
                  Images
                </p>
                <span className="text-xs text-[#555]">
                  {images.length}/{MAX_IMAGES}
                </span>
              </div>

              {/* Drop zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  addFiles(e.dataTransfer.files);
                }}
                className={`border border-dashed p-12 flex flex-col items-center justify-center text-center cursor-pointer transition
                  ${isDragging ? 'border-white bg-white/5' : 'border-[#2a2a2a] hover:border-[#666]'}`}
              >
                <p className="text-sm text-[#aaa]">
                  Drag & drop images or click to upload
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                hidden
                onChange={(e) => addFiles(e.target.files)}
              />

              {/* Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-6">
                  {images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={img.preview}
                        className="w-full h-24 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImages(prev => prev.filter((_, idx) => idx !== i));
                        }}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-16 w-full py-4 border border-white text-sm tracking-widest hover:bg-white hover:text-black transition"
          >
            {isSubmitting ? 'Publishing...' : 'Publish Product'}
          </button>

        </form>

      </div>
    </div>
  );
};

export default CreateProduct;