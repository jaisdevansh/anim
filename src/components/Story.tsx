'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Crown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Story = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <section ref={sectionRef} className="py-32 relative overflow-hidden bg-[#050505]">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-20 items-center">

                    {/* Visual Side */}
                    <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 relative">
                        <motion.div style={{ y: y1 }} className="pt-20">
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=1976&auto=format&fit=crop"
                                    alt="The Craft"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </motion.div>
                        <motion.div style={{ y: y2 }}>
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-4 relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2070&auto=format&fit=crop"
                                    alt="The Ingredients"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="p-8 bg-[#B11226] rounded-3xl text-center">
                                <Crown className="mx-auto text-white mb-4" size={32} />
                                <h4 className="text-2xl font-bold text-white">EST. 2010</h4>
                            </div>
                        </motion.div>

                        {/* Decorative floating element */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#FFB703] blur-[80px] opacity-20 pointer-events-none" />
                    </div>

                    {/* Text Side */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div className="inline-flex items-center gap-2 border border-[#B11226]/30 px-4 py-2 rounded-full bg-[#B11226]/5">
                            <span className="w-2 h-2 bg-[#B11226] rounded-full animate-ping" />
                            <span className="text-xs font-bold tracking-widest text-[#B11226] uppercase">The Legacy</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                            OUR STORY IS <br />
                            <span className="text-white/20">WRITTEN IN FIRE.</span>
                        </h2>

                        <p className="text-xl text-white/60 font-light leading-relaxed">
                            It began with a single vision: to marry the authentic soul of Italian pizza crafting with the bold, royal hospitality of the East. Every grain of flour is hand-selected, every sauce is simmered to perfection for 8 hours, and every pizza is baked in our custom obsidian-stone ovens.
                        </p>

                        <div className="grid grid-cols-2 gap-10 pt-8 border-t border-white/5">
                            <div>
                                <span className="text-4xl font-black text-[#B11226]">1M+</span>
                                <p className="text-sm font-bold tracking-widest text-white/30 uppercase mt-2">Hearts Won</p>
                            </div>
                            <div>
                                <span className="text-4xl font-black text-[#FFB703]">14th</span>
                                <p className="text-sm font-bold tracking-widest text-white/30 uppercase mt-2">Generation Recipe</p>
                            </div>
                        </div>

                        <div className="pt-10">
                            <Link href="/about">
                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-4 text-white font-bold group"
                                >
                                    Read Full Journey
                                    <span className="w-12 h-px bg-[#B11226] group-hover:w-20 transition-all duration-500" />
                                </motion.div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Story;
