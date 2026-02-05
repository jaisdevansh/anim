'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
    {
        name: "Rahul Sharma",
        role: "Food Critic",
        text: "The Truffle Noir is a masterpiece. I've had pizza in Naples, but this has a soul I can't explain. Simply royal.",
        rating: 5
    },
    {
        name: "Priya Varma",
        role: "Regular Customer",
        text: "Maharaja Pizza is our family's weekly ritual. The consistency of flavor and the speed of delivery is unmatched.",
        rating: 5
    },
    {
        name: "James Wilson",
        role: "Chef",
        text: "As a fellow chef, I respect the dough hydration and the high-heat oven char. It's technically perfect and emotionally satisfying.",
        rating: 5
    }
];

interface ReviewType {
    name: string;
    role: string;
    text: string;
    rating: number;
}

const ReviewCard = ({ review, index }: { review: ReviewType, index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2, duration: 0.8 }}
        className="p-10 bg-[#0F0F0F] border border-white/5 rounded-[2.5rem] relative group hover:border-[#B11226]/30 transition-all duration-500"
    >
        <Quote className="absolute top-10 right-10 text-white/5 group-hover:text-[#B11226]/20 transition-colors" size={60} />

        <div className="flex gap-1 mb-8">
            {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={16} fill="#FFB703" className="text-[#FFB703]" />
            ))}
        </div>

        <p className="text-xl text-white/70 font-light leading-relaxed mb-10 italic">
            &quot;{review.text}&quot;
        </p>

        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#B11226] to-[#FFB703] flex items-center justify-center font-bold text-white shadow-lg">
                {review.name[0]}
            </div>
            <div>
                <h4 className="font-bold text-white tracking-tight">{review.name}</h4>
                <p className="text-xs text-[#B11226] uppercase tracking-[0.2em] font-bold">{review.role}</p>
            </div>
        </div>
    </motion.div>
);

const Reviews = () => {
    return (
        <section className="py-32 bg-[#050505] overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-xl">
                        <span className="text-[#FFB703] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Testimonials</span>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                            VOICES FROM <br />
                            <span className="text-white/20">OUR COMMUNITY.</span>
                        </h2>
                    </div>
                    <div className="flex gap-12 text-center">
                        <div>
                            <span className="text-5xl font-black text-white">4.9</span>
                            <p className="text-xs font-bold tracking-widest text-white/30 uppercase mt-2">Avg Rating</p>
                        </div>
                        <div>
                            <span className="text-5xl font-black text-white">50k+</span>
                            <p className="text-xs font-bold tracking-widest text-white/30 uppercase mt-2">Reviews</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <ReviewCard key={index} review={review} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
