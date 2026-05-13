/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Rocket, 
  Search, 
  Share2, 
  Globe, 
  Plus, 
  Trash2, 
  MessageSquare, 
  CreditCard, 
  Banknote, 
  Send,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  icon: React.ElementType;
}

interface CartItem extends Service {
  price: number;
}

type PaymentMethod = 'Cash' | 'Card' | 'Online Transfer';

// --- Data ---
const SERVICES: Service[] = [
  // PPC
  { id: 'ppc-google', name: 'Google Ads (PPC)', category: 'PPC', description: 'Targeted search and display ads to drive immediate traffic.', minPrice: 40000, maxPrice: 120000, icon: Search },
  { id: 'ppc-meta', name: 'Meta Ads', category: 'PPC', description: 'Highly targeted Facebook and Instagram advertising.', minPrice: 35000, maxPrice: 100000, icon: Share2 },
  { id: 'ppc-linkedin', name: 'LinkedIn Ads', category: 'PPC', description: 'Professional B2B targeting for leads and networking.', minPrice: 60000, maxPrice: 150000, icon: TrendingUp },
  
  // Social Media
  { id: 'sm-mgmt', name: 'Social Media Management', category: 'Social Media', description: 'Daily posting, engagement, and community building.', minPrice: 25000, maxPrice: 70000, icon: Share2 },
  { id: 'sm-content', name: 'Content Creation', category: 'Social Media', description: 'High-quality graphics and videos for your brand.', minPrice: 30000, maxPrice: 85000, icon: Workflow },
  
  // SEO
  { id: 'seo-complete', name: 'Full SEO Package', category: 'SEO', description: 'Comprehensive On-Page, Off-Page, and Technical SEO.', minPrice: 50000, maxPrice: 180000, icon: Rocket },
  { id: 'seo-local', name: 'Local SEO', category: 'SEO', description: 'Optimize your business for local search results.', minPrice: 20000, maxPrice: 50000, icon: Globe },
  
  // Web Development
  { id: 'web-landing', name: 'Landing Page', category: 'Web Development', description: 'High-converting single-page website.', minPrice: 45000, maxPrice: 90000, icon: Globe },
  { id: 'web-corporate', name: 'Corporate Website', category: 'Web Development', description: 'Multi-page professional business website.', minPrice: 120000, maxPrice: 350000, icon: Globe },
  { id: 'web-ecommerce', name: 'E-commerce Store', category: 'Web Development', description: 'Fully functional online shop with checkout.', minPrice: 180000, maxPrice: 550000, icon: CreditCard },
];

const CATEGORIES = ['All', 'PPC', 'Social Media', 'SEO', 'Web Development'];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Online Transfer');
  const [showCheckout, setShowCheckout] = useState(false);

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'All') return SERVICES;
    return SERVICES.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  const addToCart = (service: Service) => {
    // Generate a random professional price within the range
    const step = 5000;
    const randomPrice = Math.floor((Math.random() * (service.maxPrice - service.minPrice) + service.minPrice) / step) * step;
    
    setCart([...cart, { ...service, price: randomPrice }]);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const generateWhatsAppLink = () => {
    const phone = '923172287931';
    const itemsList = cart.map(item => `- ${item.name}: PKR ${item.price.toLocaleString()}`).join('%0A');
    const text = `Hi NexusGrowth! I want to confirm my order:%0A%0AItems:%20%0A${itemsList}%0A%0ATotal: PKR ${totalPrice.toLocaleString()}%0APayment: ${paymentMethod}%0A%0APlease confirm my address/details.`;
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-white overflow-x-hidden selection:bg-blue-500 selection:text-white uppercase">
      {/* Header Section */}
      <header className="p-8 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-[#0A0A0A]">
        <div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
            Nexus<br/>Growth
          </h1>
          <p className="text-blue-500 font-mono mt-4 text-xs tracking-[0.3em] uppercase">Digital Services Lab</p>
        </div>
        <div className="text-left md:text-right">
          <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Consultant Lead</p>
          <p className="text-xl font-medium italic normal-case">Sarah J. Ahmed — Karachi / Islamabad</p>
          <p className="text-xs font-mono text-white/30 mt-1 lowercase">support@nexusgrowth.digital</p>
        </div>
      </header>

      <main className="mx-auto max-w-full">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
          {/* Services Side (Dark) */}
          <div className="lg:w-1/2 p-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white/40">01 / Service Menu</h2>
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-none px-4 py-1 text-[10px] font-black uppercase tracking-widest transition-all border ${
                      selectedCategory === cat
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-white/10 text-white/40 hover:border-white/40 cursor-pointer'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 gap-4 flex-1">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group p-6 border border-white/10 bg-white/5 hover:border-blue-500 transition-colors flex flex-col sm:flex-row justify-between items-start gap-4 relative overflow-hidden"
                    id={`service-${service.id}`}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-mono text-blue-500 opacity-50">#{idx + 1}</span>
                        <h3 className="text-2xl font-black text-white leading-none">{service.name}</h3>
                      </div>
                      <p className="text-[10px] uppercase tracking-wide text-white/40 max-w-md">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-row sm:flex-col items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 relative z-10">
                      <div className="font-mono text-blue-500 text-sm tracking-tighter">
                        START / PKR {service.minPrice.toLocaleString()}
                      </div>
                      <button
                        onClick={() => addToCart(service)}
                        className="mt-2 bg-white text-black px-4 py-2 text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                        id={`add-${service.id}`}
                      >
                        Add to Proposal +
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-12 text-white/20">
               <p className="text-[10px] uppercase tracking-[0.2em] mb-4">Accepted Payment Architectures</p>
               <div className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] font-black">
                 <span>CASH / PHYSICAL</span>
                 <span>VISA / MASTERCARD</span>
                 <span>BANK TRANSFER / IBAN</span>
                 <span>EASYPAISA / JAZZCASH</span>
               </div>
            </div>
          </div>

          {/* Proposal Side (Light) */}
          <div className="lg:w-1/2 bg-white text-black p-8 flex flex-col shadow-2xl relative">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-10">02 / Selected Proposal</h2>
            
            <div className="flex-1 overflow-auto">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-10">
                  <Workflow size={120} strokeWidth={1} />
                  <p className="text-4xl font-black mt-8 text-center leading-none">NO SERVICES<br/>SELECTED</p>
                </div>
              ) : (
                <div className="space-y-8">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-4 border-black">
                        <th className="py-4 uppercase text-xs font-black tracking-widest">Growth Component</th>
                        <th className="py-4 uppercase text-xs font-black tracking-widest text-right">Investment (PKR)</th>
                        <th className="py-4 w-12"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {cart.map((item, index) => (
                        <tr key={index} className="group hover:bg-black/[0.02]">
                          <td className="py-6">
                            <div className="text-xl font-black italic">{item.name}</div>
                            <div className="text-[9px] uppercase tracking-widest opacity-40 mt-1">{item.category} / Professional Grade</div>
                          </td>
                          <td className="py-6 text-right font-mono text-lg font-bold italic tracking-tighter">
                            {item.price.toLocaleString()}
                          </td>
                          <td className="py-6 text-right">
                            <button
                              onClick={() => removeFromCart(index)}
                              className="text-black/20 hover:text-red-600 transition-colors cursor-pointer"
                              id={`remove-${index}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-black/5">
                        <td className="py-8 pl-4 px-2 font-black uppercase text-3xl tracking-tighter leading-none">
                          Consolidated<br/>Total
                        </td>
                        <td className="py-8 text-right pr-4 font-mono font-black text-3xl text-blue-600">
                          {totalPrice.toLocaleString()}
                        </td>
                        <td className="py-8"></td>
                      </tr>
                    </tfoot>
                  </table>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-black/10 pt-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Select Transmission Channel</label>
                       <div className="space-y-1">
                        {(['Online Transfer', 'Card', 'Cash'] as PaymentMethod[]).map(method => (
                          <button
                            key={method}
                            onClick={() => setPaymentMethod(method)}
                            className={`flex w-full items-center justify-between border-2 px-4 py-3 text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                              paymentMethod === method
                                ? 'border-black bg-black text-white'
                                : 'border-black/5 text-black/40 hover:border-black/20'
                            }`}
                          >
                            {method}
                            {paymentMethod === method && <CheckCircle2 size={12} />}
                          </button>
                        ))}
                       </div>
                    </div>
                    <div className="flex flex-col justify-end">
                       <p className="text-[9px] italic leading-relaxed text-black/40 mb-4 normal-case">
                         * Estimates provided are based on project complexity. Final pricing Subject to technical audit and strategy alignment during kickoff.
                       </p>
                       <button
                          onClick={() => setShowCheckout(true)}
                          className="w-full bg-blue-600 text-white py-5 font-black uppercase text-lg tracking-tighter hover:bg-black transition-all shadow-xl shadow-blue-500/20 active:scale-95 cursor-pointer"
                          id="btn-checkout"
                        >
                          Execute Proposal →
                        </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Bottom Bar */}
      <footer className="border-t border-white/10 px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.3em] uppercase text-white/30 bg-[#0A0A0A]">
        <div className="flex gap-12">
          <span>NexusGrowth Digital © 2026</span>
          <span className="hidden sm:inline">Peshawar - Islamabad - Remote</span>
        </div>
        <div className="flex gap-12 items-center">
          <span className="text-blue-500 font-bold">Priority Support: 923172287931</span>
          <span className="opacity-50">Ref: NX-2026-PROPOSAL</span>
        </div>
      </footer>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 selection:bg-white selection:text-black">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckout(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative w-full max-w-2xl bg-white p-12 shadow-2xl border-t-8 border-blue-500"
              id="checkout-modal"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="text-black">
                  <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">Confirm<br/>Launch</h2>
                  <p className="mt-4 text-xs font-mono tracking-widest text-black/40">TRANSFORMATION KEY: {Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
                </div>
                <div className="h-16 w-16 bg-blue-500 flex items-center justify-center text-white">
                   <Send size={40} />
                </div>
              </div>

              <div className="bg-black/5 p-8 border-l-4 border-black mb-12">
                 <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-black uppercase tracking-widest opacity-40">Order Manifest</span>
                 </div>
                 <div className="space-y-4">
                    {cart.map((item, i) => (
                      <div key={i} className="flex justify-between items-baseline border-b border-black/5 pb-2">
                        <span className="text-xl font-black italic">{item.name}</span>
                        <span className="font-mono text-sm opacity-60">PKR {item.price.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-end pt-6">
                      <span className="text-xs font-black uppercase tracking-[0.2em] mb-1">TOTAL COMMITMENT</span>
                      <span className="text-5xl font-black text-blue-600 tracking-tighter">PKR {totalPrice.toLocaleString()}</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full flex-col items-center justify-center bg-black py-8 text-white transition-all hover:bg-blue-600 cursor-pointer"
                  id="btn-whatsapp-confirm"
                >
                  <span className="text-3xl font-black uppercase tracking-tighter mb-1">Confirm on WhatsApp</span>
                  <span className="text-[10px] tracking-[0.4em] opacity-40 uppercase group-hover:opacity-100 transition-opacity">Digital transformation starts here</span>
                </a>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="border border-black py-4 text-xs font-black uppercase tracking-widest hover:bg-black/5 transition-colors cursor-pointer"
                >
                  Return to Strategy
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
