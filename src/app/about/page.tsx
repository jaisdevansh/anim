'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChefHat, ShieldCheck, Clock, Crown, ArrowRight, Star } from 'lucide-react';
import React, { useRef } from 'react';

// --- Animated Background ---
const BackgroundParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#FFB703] rounded-full opacity-20"
                initial={{
                    x: Math.random() * 1000,
                    y: Math.random() * 1000
                }}
                animate={{
                    y: [0, -100],
                    opacity: [0.2, 0]
                }}
                transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        ))}
    </div>
);

// --- Components ---

interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    delay: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay }: FeatureCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        whileHover={{ y: -5 }}
        className="group p-8 bg-[#0F0F0F]/80 backdrop-blur-md border border-white/5 rounded-2xl hover:border-[#FFB703]/50 hover:bg-[#141414] transition-all duration-300 cursor-default relative overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-[#B11226]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-[#B11226]/10 flex items-center justify-center text-[#B11226] mb-6 group-hover:scale-110 group-hover:bg-[#FFB703]/10 group-hover:text-[#FFB703] transition-all duration-300">
                <Icon size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-[#FFB703] transition-colors">{title}</h3>
            <p className="text-white/60 leading-relaxed text-sm">
                {description}
            </p>
        </div>
    </motion.div>
);

const TimelineItem = ({ year, title, text, align = "left", delay }: { year: string, title: string, text: string, align?: "left" | "right", delay: number }) => (
    <motion.div
        initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay, duration: 0.8 }}
        className={`flex ${align === "right" ? "md:flex-row-reverse" : "md:flex-row"} flex-col items-center gap-8 md:gap-16 relative mb-24 last:mb-0`}
    >
        {/* Timeline Dot & Line for Mobile */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#B11226] to-transparent md:-translate-x-1/2 h-full z-0 hidden md:block" />

        {/* Content */}
        <div className="md:w-1/2 w-full text-center md:text-left relative z-10">
            <div className={`p-8 bg-[#111] border border-white/10 rounded-2xl relative group hover:border-[#B11226]/50 transition-colors duration-500 ${align === "right" ? "md:text-left" : "md:text-right"}`}>
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-8 bg-[#B11226] text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest shadow-lg shadow-[#B11226]/20">
                    {year}
                </span>
                <h3 className="text-2xl font-bold mb-3 text-[#FFB703] group-hover:text-white transition-colors">{title}</h3>
                <p className="text-white/70 leading-relaxed">{text}</p>
            </div>
        </div>

        {/* Connector for Desktop */}
        <div className="hidden md:flex items-center justify-center w-12 h-12 bg-[#050505] border-2 border-[#B11226] rounded-full z-20 shadow-[0_0_15px_rgba(177,18,38,0.5)]">
            <div className="w-3 h-3 bg-[#FFB703] rounded-full animate-pulse" />
        </div>

        {/* Spacer for layout balance */}
        <div className="md:w-1/2 hidden md:block" />
    </motion.div>
);

// --- Main Page ---

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-[#B11226] selection:text-white overflow-hidden">
            <Navbar />

            {/* SECTION 1: HERO */}
            <section className="pt-40 pb-28 relative text-center px-6 overflow-hidden">
                <BackgroundParticles />

                {/* Dynamic Gradient Orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B11226] blur-[150px] opacity-20 animate-pulse rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FFB703] blur-[150px] opacity-10 rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <div className="inline-flex items-center gap-2 mb-6 border border-[#B11226]/30 px-4 py-2 rounded-full bg-[#B11226]/5 backdrop-blur-sm">
                        <Crown size={16} className="text-[#FFB703]" />
                        <span className="text-[#B11226] text-xs font-bold tracking-[0.2em] uppercase">Est. 2010</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                        THE SAGA OF <br /><span className="text-[#B11226]">TASTE</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                        From a humble stone oven to the city's favorite slice. <br />This is not just pizza, it's a legacy.
                    </p>
                </motion.div>
            </section>

            {/* SECTION 2: FOUNDER VISION (Floating Layout) */}
            <section className="py-24 container mx-auto px-6 md:px-12 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-[80%] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative z-10"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#B11226] to-[#FFB703] rounded-[2rem] opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-700" />
                            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 relative">
                                <img
                                    src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070&auto=format&fit=crop"
                                    className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                                    alt="Founder"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                <div className="absolute bottom-8 left-8">
                                    <h3 className="text-3xl font-bold text-white mb-2">Rajesh 'The Boss'</h3>
                                    <p className="text-[#FFB703] font-mono text-sm tracking-widest">FOUNDER & CHEF</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                                "Pizza is not just food. It's <span className="text-[#B11226] italic">emotion</span>."
                            </h2>
                            <p className="text-white/70 text-lg leading-relaxed mb-6 border-l-2 border-[#B11226] pl-6">
                                I started Maharaja Pizza with a simple dream: to serve the kind of pizza that makes people close their eyes and smile. We don't cut corners. We chop fresh vegetables. We knead dough daily. We respect the fire.
                            </p>
                            <p className="text-white/70 text-lg leading-relaxed">
                                Every box that leaves this kitchen carries my reputation. That's why I personally taste-test our sauces every single morning.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: THE TIMELINE JOURNEY */}
            <section className="py-32 relative overflow-hidden bg-[#0A0A0A]">
                {/* Texture Overlay */}
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-24">
                        <span className="text-[#FFB703] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Our Journey</span>
                        <h2 className="text-4xl md:text-6xl font-black">History in the <span className="text-white/20">Baking</span></h2>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <TimelineItem
                            year="2010"
                            title="The Humble Beginning"
                            text="Started in a small 100sqft shop with just one oven and a lot of passion. We served only 3 types of pizzas, but the block smelled like heaven."
                            align="left"
                            delay={0.1}
                        />
                        <TimelineItem
                            year="2015"
                            title="The Secret Sauce"
                            text="After 5 years of experimenting, we perfected our signature 'Royal Red Sauce'. It became an instant hit, and lines started forming outside the door."
                            align="right"
                            delay={0.2}
                        />
                        <TimelineItem
                            year="2020"
                            title="Expanding the Kingdom"
                            text="Maharaja Pizza opened its 5th outlet. We introduced our famous 'Cheese Burst Crown' crust, revolutionizing how our city eats pizza."
                            align="left"
                            delay={0.3}
                        />
                        <TimelineItem
                            year="2024"
                            title="The Digital Era"
                            text="Launching our premium digital experience. Same old-school taste, but now delivering joy with just a click."
                            align="right"
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* SECTION 4: WHY WE RULE (Features) */}
            <section className="py-24 container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard icon={Crown} title="Royal Recipes" description="Flavors fit for a king, perfected over decades." delay={0.1} />
                    <FeatureCard icon={ShieldCheck} title="Zero Compromise" description="If it's not fresh, it's not in our kitchen." delay={0.2} />
                    <FeatureCard icon={Clock} title="Baked Instant" description="Hot and crispy, straight from the oven to you." delay={0.3} />
                    <FeatureCard icon={Star} title="5-Star Hygiene" description="Cleanliness is our first ingredient." delay={0.4} />
                </div>
            </section>

            {/* SECTION 5: FINAL CTA */}
            <section className="py-20 text-center container mx-auto px-6 relative mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-dark from-[#111] to-black border border-[#B11226]/30 rounded-[3rem] p-12 md:p-24 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#B11226] blur-[150px] opacity-30 animate-pulse" />

                    <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10">Part of the <span className="text-[#B11226]">Family?</span></h2>
                    <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto relative z-10">
                        Join thousands of happy customers who trust Maharaja for their daily dose of happiness.
                    </p>

                    <Link href="/menu" className="relative z-10 inline-block">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#B11226] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#D4152D] hover:shadow-[0_0_40px_rgba(177,18,38,0.5)] transition-all duration-300 flex items-center gap-4"
                        >
                            Order Your Slice <ArrowRight size={24} />
                        </motion.button>
                    </Link>
                </motion.div>
            </section>

            <Footer />
        </main>
    )
}
