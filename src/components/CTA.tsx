'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, UtensilsCrossed, Crown } from 'lucide-react';
import Link from 'next/link';

const CTA = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });
    const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <section ref={containerRef} className="py-32 relative overflow-hidden px-6">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl bg-gradient-to-br from-[#111] to-black border border-white/5 rounded-[3rem] -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B11226] blur-[150px] opacity-10 rounded-full pointer-events-none" />

            <div className="container mx-auto max-w-4xl text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ y }}
                >
                    <div className="w-20 h-20 bg-[#B11226]/10 rounded-3xl flex items-center justify-center text-[#B11226] mx-auto mb-10 border border-[#B11226]/20 ring-1 ring-white/10">
                        <UtensilsCrossed size={40} />
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
                        READY FOR THE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B11226] to-[#FFB703]">ROYAL FEAST?</span>
                    </h2>

                    <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        Don't just eat pizza. Experience a legacy of flavor perfection, delivered right to your throne.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/menu" className="w-full sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(177, 18, 38, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto bg-[#B11226] text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all"
                            >
                                View Our Menu <ArrowRight size={24} />
                            </motion.button>
                        </Link>

                        <Link href="/contact" className="w-full sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto border border-white/10 px-10 py-5 rounded-2xl font-bold text-xl text-white backdrop-blur-sm transition-all"
                            >
                                Contact Support
                            </motion.button>
                        </Link>
                    </div>

                    <div className="mt-16 flex items-center justify-center gap-8 text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold">
                        <span>Safe Delivery</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span>Fresh Ingredients</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span>Royal Taste</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
