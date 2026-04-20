import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CreditCard, Truck, ShieldCheck, MapPin } from 'lucide-react';
import { toast } from 'react-hot-toast';

const CheckOut = () => {
  const cartItems = useSelector((state) => state.cart.getCartUser);
  
  // Totals Calculation
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price.amount * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shipping;

  const handleFakeOrder = (e) => {
    e.preventDefault();
    toast.success("Order Placed! (Demo Only) 🥂");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans antialiased py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-light tracking-[0.3em] uppercase mb-2">Secure Checkout</h1>
          <p className="text-zinc-500 text-xs tracking-widest uppercase">Complete your acquisition</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Shipping & Payment (8 Columns) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Shipping Address */}
            <section className="bg-[#0A0A0A] p-8 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <MapPin className="w-5 h-5 text-zinc-400" />
                <h2 className="text-lg font-medium tracking-wider uppercase">Shipping Details</h2>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500">Full Name</label>
                  <input type="text" placeholder="Alexander Vogue" className="w-full bg-transparent border-b border-zinc-800 py-3 focus:border-white outline-none transition-all text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500">Contact Number</label>
                  <input type="text" placeholder="+91 00000 00000" className="w-full bg-transparent border-b border-zinc-800 py-3 focus:border-white outline-none transition-all text-sm" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500">Street Address</label>
                  <input type="text" placeholder="Flat, House no, Building, Company, Apartment" className="w-full bg-transparent border-b border-zinc-800 py-3 focus:border-white outline-none transition-all text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500">City / State</label>
                  <input type="text" placeholder="Mumbai, Maharashtra" className="w-full bg-transparent border-b border-zinc-800 py-3 focus:border-white outline-none transition-all text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500">Pincode</label>
                  <input type="text" placeholder="400001" className="w-full bg-transparent border-b border-zinc-800 py-3 focus:border-white outline-none transition-all text-sm" />
                </div>
              </form>
            </section>

            {/* Payment Method (Fake) */}
            <section className="bg-[#0A0A0A] p-8 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <CreditCard className="w-5 h-5 text-zinc-400" />
                <h2 className="text-lg font-medium tracking-wider uppercase">Payment Method</h2>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border border-white/20 rounded-xl bg-white/5 flex items-center justify-between group cursor-pointer transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center text-[8px] font-bold text-zinc-400">VISA</div>
                    <span className="text-sm font-medium tracking-wide">Card ending in 4242</span>
                  </div>
                  <div className="w-4 h-4 rounded-full border-4 border-white"></div>
                </div>

                <div className="p-4 border border-zinc-800 rounded-xl flex items-center justify-between opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center text-[8px] font-bold text-zinc-400 tracking-tighter italic">Paytm</div>
                    <span className="text-sm font-medium tracking-wide">Other UPI / Wallets</span>
                  </div>
                  <div className="w-4 h-4 rounded-full border border-zinc-700"></div>
                </div>
              </div>
            </section>
          </div>

          {/* Right: Order Summary (4 Columns) */}
          <div className="lg:col-span-4">
            <div className="bg-[#111] rounded-2xl p-8 border border-white/10 sticky top-24">
              <h2 className="text-lg font-medium tracking-widest uppercase mb-8 border-b border-white/5 pb-4">Summary</h2>
              
              <div className="space-y-6 max-h-[300px] overflow-y-auto mb-8 pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <div className="w-16 h-20 bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.images[0]?.url} alt="" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold line-clamp-1 uppercase tracking-tighter">{item.title}</p>
                      <p className="text-[10px] text-zinc-500 mt-1 uppercase italic">Qty: {item.quantity}</p>
                      <p className="text-sm font-black mt-1 text-white">₹{item.price.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-white/5 pt-6 text-sm">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white pt-4 border-t border-white/5">
                  <span>Total</span>
                  <span className="text-emerald-500 tracking-tighter">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handleFakeOrder}
                className="w-full bg-white text-black py-4 mt-8 rounded-xl uppercase text-[11px] tracking-[0.4em] font-black hover:bg-zinc-200 active:scale-95 transition-all shadow-2xl shadow-white/5"
              >
                Complete Purchase
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-zinc-600 uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3" />
                <span>256-bit Encrypted SSL Secure</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckOut;