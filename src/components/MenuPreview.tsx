'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

const pizzas = [
    {
        id: 1,
        name: "Margherita Gold",
        price: "₹1200",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
        label: "Classic",
        color: "#B11226"
    },
    {
        id: 2,
        name: "Truffle Noir",
        price: "₹1800",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
        label: "Premium",
        color: "#1a1a1a"
    },
    {
        id: 3,
        name: "Spicy Diavola",
        price: "₹1450",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
        label: "Spicy",
        color: "#D4152D"
    },
    {
        id: 4,
        name: "Pesto Royale",
        price: "₹1550",
        image: "https://images.unsplash.com/photo-1593504049359-7b7d92c7185d?auto=format&fit=crop&w=800&q=80",
        label: "Exotic",
        color: "#2D5A27"
    },
    {
        id: 5,
        name: "Gorgonzola Bliss",
        price: "₹1900",
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80",
        label: "Gourmet",
        color: "#4A4A8A"
    },
    {
        id: 6,
        name: "Pepperoni King",
        price: "₹1300",
        image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80",
        label: "Classic",
        color: "#B11226"
    }
];

const MenuPreview = () => {
    const containerRef = React.useRef<HTMLElement>(null);

    return (
        <section ref={containerRef} className="relative bg-[#050505] py-40">
            <div className="container mx-auto px-6 mb-32">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-6xl md:text-9xl font-black tracking-tighter leading-none text-center"
                >
                    THE <span className="text-[#B11226]">COLLECTION.</span>
                </motion.h2>
                <p className="text-center text-white/40 mt-6 tracking-widest uppercase text-sm">
                    Scroll to explore the royal menu
                </p>
            </div>

            <div className="flex flex-col items-center">
                {pizzas.map((pizza, index) => {
                    return (
                        <PizzaCard
                            key={pizza.id}
                            pizza={pizza}
                            index={index}
                        />
                    );
                })}
            </div>

            <div className="h-[50vh] flex flex-col items-center justify-center gap-10">
                <p className="text-white/20 text-xl font-light italic">And many more surprises waiting for you...</p>
                <Link href="/menu">
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(177, 18, 38, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-6 bg-white text-black px-16 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-[#B11226] hover:text-white transition-all duration-700 shadow-2xl"
                    >
                        Enter the Full Throne <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                </Link>
            </div>
        </section>
    );
};

const PizzaCard = ({ pizza, index }: { pizza: any, index: number }) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Optimized Reveal Values - Reduced usage of complex transforms
    // Reduced scaling range to minimize layout trashing perception (even though its transform)
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
    // Removed 'y' parallax to strictly stick to sticky behavior for stability
    // Reduced rotation to keep it subtle and less pixel-expensive on edges
    const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -2 : 2, 0]);

    return (
        <div ref={cardRef} className="h-screen sticky top-0 flex items-center justify-center w-full px-4 md:px-6 overflow-hidden perspective-[1000px]">
            <motion.div
                style={{ scale, opacity, rotate }}
                className="relative w-full max-w-6xl aspect-[16/9] md:aspect-[2/1] rounded-[3rem] overflow-hidden border border-white/10 bg-[#080808] shadow-2xl will-change-transform"
            >
                {/* Optimized Background: Radial Gradient instead of Box-Shadow/Blur */}
                <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${pizza.color}, transparent 70%)`
                    }}
                />

                <div className="absolute inset-0 flex flex-col md:flex-row items-center p-8 md:p-16 gap-8 md:gap-16 z-10">
                    {/* Visual Half */}
                    <div className="w-full md:w-1/2 h-full relative">
                        <motion.div
                            className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl"
                        >
                            <img
                                src={pizza.image}
                                alt={pizza.name}
                                loading="lazy"
                                className="w-full h-full object-cover transform-gpu"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                        </motion.div>
                    </div>

                    {/* Content Half */}
                    <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#B11226]/30 bg-[#B11226]/5 mb-6">
                                <span className="w-2 h-2 bg-[#B11226] rounded-full animate-pulse" />
                                <span className="text-[10px] uppercase tracking-[0.4em] text-[#B11226] font-bold">
                                    {pizza.label} SELECTION
                                </span>
                            </div>

                            <h3 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter leading-[0.9] mb-4">
                                {pizza.name.split(' ')[0]}<br />
                                <span className="text-white/20">{pizza.name.split(' ')[1]}</span>
                            </h3>
                        </div>

                        <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-md">
                            Experience the royal craftsmanship. Baked at 900°F with imported San Marzano tomatoes.
                        </p>

                        <div className="flex items-center gap-10 pt-4">
                            <div className="flex flex-col">
                                <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Price</span>
                                <span className="text-4xl font-black text-[#FFB703] font-mono tracking-tighter">{pizza.price}</span>
                            </div>
                            <div className="h-16 w-px bg-white/10" />
                            <button className="flex items-center gap-4 text-[#B11226] font-bold tracking-widest text-sm hover:text-white transition-colors duration-300">
                                DETAILS <ArrowUpRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default MenuPreview;
