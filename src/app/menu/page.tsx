'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Plus } from 'lucide-react';
import React, { useState, useMemo } from 'react';

// --- Types ---
type Category = "All" | "Veg" | "Non-Veg" | "Combos" | "Sides & Drinks";

interface MenuItem {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
    category: Category;
    tags: string[];
}

// --- Menu Data ---
const MENU_ITEMS: MenuItem[] = [
    { id: 1, name: "Margherita Gold", price: "₹1200", description: "San Marzano tomatoes, Buffalo mozzarella, 24k gold leaf oil.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80", category: "Veg", tags: ["Bestseller", "Classic"] },
    { id: 2, name: "Truffle Noir", price: "₹1800", description: "Black truffle cream, wild mushrooms, thyme, parmesan crisp.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80", category: "Veg", tags: ["Premium", "Chef Special"] },
    { id: 3, name: "Spicy Diavola", price: "₹1450", description: "Calabrian chili, spicy salami, honey glaze, fresh basil.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80", category: "Non-Veg", tags: ["Spicy"] },
    { id: 4, name: "The Godfather", price: "₹1600", description: "Italian sausage, roasted peppers, onions, smoked mozzarella.", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80", category: "Non-Veg", tags: ["Meaty"] },
    { id: 5, name: "Bianca Verde", price: "₹1350", description: "Ricotta base, zucchini flower, pistachio pesto, lemon zest.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80", category: "Veg", tags: ["Light"] },
    { id: 6, name: "Burrata & Fig", price: "₹950", description: "Fresh burrata, balsamic glaze, roasted figs, arugula.", image: "https://images.unsplash.com/photo-1725654395759-dd60802aa31d?q=80&w=2070&auto=format&fit=crop", category: "Sides & Drinks", tags: ["Starter"] },
    { id: 7, name: "Maharaja Feast", price: "₹2500", description: "Large Pizza + Garlic Bread + 2 Drinks + Dessert.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80", category: "Combos", tags: ["Family Pack"] },
];

const CATEGORIES: Category[] = ["All", "Veg", "Non-Veg", "Combos", "Sides & Drinks"];

// --- Components ---

const ProductModal = ({ item, onClose }: { item: MenuItem, onClose: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="bg-[#0F0F0F] border border-white/10 rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
        >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-[#B11226] transition-colors">
                <X size={24} />
            </button>
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent opacity-60 md:hidden" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${item.category === "Veg" ? "bg-green-900/40 text-green-400 border border-green-500/20" :
                        item.category === "Non-Veg" ? "bg-red-900/40 text-red-400 border border-red-500/20" :
                            "bg-white/10 text-white border border-white/20"
                        }`}>
                        {item.category}
                    </span>
                    <span className="text-2xl font-bold text-[#FFB703] font-mono">{item.price}</span>
                </div>
                <h2 className="text-4xl font-black italic mb-4">{item.name}</h2>
                <p className="text-white/60 mb-8 leading-relaxed text-lg">{item.description}</p>

                <div className="mb-8">
                    <h3 className="text-sm uppercase tracking-widest text-[#B11226] font-bold mb-4">Customise Size</h3>
                    <div className="flex gap-4">
                        {['S', 'M', 'L'].map(size => (
                            <button key={size} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B11226] hover:border-[#B11226] transition-all font-bold">
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-auto flex gap-4">
                    <button className="flex-1 bg-white text-black font-bold py-4 rounded-xl hover:bg-[#FFB703] transition-colors flex items-center justify-center gap-2">
                        Add to Cart <Plus size={20} />
                    </button>
                    <button className="flex-1 bg-[#B11226] text-white font-bold py-4 rounded-xl hover:bg-[#D4152D] transition-colors shadow-[0_0_20px_rgba(177,18,38,0.4)]">
                        Order Now
                    </button>
                </div>
            </div>
        </motion.div>
    </motion.div>
);

export default function MenuPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category>("All");
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    const filteredItems = useMemo(() => {
        return MENU_ITEMS.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-[#B11226] selection:text-white">
            <Navbar />
            <AnimatePresence>
                {selectedItem && <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
            </AnimatePresence>

            {/* Header & Filters */}
            <div className="sticky top-0 z-30 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 pt-28 pb-6 px-6 shadow-2xl">
                <div className="container mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">

                    {/* Search Bar */}
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#FFB703] transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search pizzas, ingredients..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#111] border border-white/10 rounded-full py-3.5 pl-12 pr-12 text-white outline-none focus:border-[#FFB703] transition-all placeholder:text-white/20"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Category Filters */}
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border ${selectedCategory === cat
                                    ? "bg-[#B11226] border-[#B11226] text-white shadow-lg shadow-[#B11226]/20"
                                    : "bg-transparent border-white/10 text-white/60 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Grid */}
            <div className="container mx-auto px-6 md:px-12 py-12 min-h-[60vh]">
                {filteredItems.length === 0 ? (
                    <div className="text-center py-20 flex flex-col items-center">
                        <div className="bg-[#111] p-6 rounded-full mb-6">
                            <Search size={48} className="text-white/20" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white/40">No pizzas found</h3>
                        <p className="text-white/30">Try searching for something else 🍕</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                layoutId={`card-${item.id}`}
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="group bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-[#B11226]/50 transition-all duration-500 cursor-pointer flex flex-col"
                                onClick={() => setSelectedItem(item)}
                            >
                                {/* Image Container */}
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            Quick View
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        {item.category === "Veg" && (
                                            <div className="w-6 h-6 border-2 border-green-500 rounded-sm flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                                            </div>
                                        )}
                                        {item.category === "Non-Veg" && (
                                            <div className="w-6 h-6 border-2 border-red-500 rounded-sm flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                                <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold group-hover:text-[#B11226] transition-colors duration-300">{item.name}</h3>
                                        <span className="text-[#FFB703] font-mono font-bold">{item.price}</span>
                                    </div>
                                    <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-2">{item.description}</p>

                                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                                        <span className="text-xs font-bold uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                                            Customise
                                        </span>
                                        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-[#B11226] transition-colors duration-300">
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    )
}
