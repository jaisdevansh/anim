'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';

// --- Components ---

interface InputFieldProps {
    label: string;
    type?: string;
    placeholder: string;
    required?: boolean;
}

const InputField = ({ label, type = "text", placeholder, required = false }: InputFieldProps) => (
    <div className="group">
        <label className="block text-xs uppercase tracking-widest text-[#B11226] mb-2 font-bold group-focus-within:text-[#FFB703] transition-colors">
            {label} {required && '*'}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg p-4 text-white placeholder-white/20 outline-none focus:border-[#FFB703] focus:shadow-[0_0_15px_rgba(255,183,3,0.1)] transition-all duration-300"
        />
    </div>
);

const SelectField = ({ label, options }: { label: string, options: string[] }) => (
    <div className="group">
        <label className="block text-xs uppercase tracking-widest text-[#B11226] mb-2 font-bold group-focus-within:text-[#FFB703] transition-colors">
            {label}
        </label>
        <div className="relative">
            <select className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg p-4 text-white appearance-none outline-none focus:border-[#FFB703] transition-all duration-300 cursor-pointer">
                {options.map((opt, i) => (
                    <option key={i} value={opt} className="bg-black text-white">{opt}</option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">▼</div>
        </div>
    </div>
);

const RadioGroup = ({ label, options }: { label: string, options: string[] }) => (
    <div className="group">
        <label className="block text-xs uppercase tracking-widest text-[#B11226] mb-3 font-bold">
            {label}
        </label>
        <div className="flex flex-wrap gap-4">
            {options.map((opt, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer group/item">
                    <div className="relative w-5 h-5 rounded-full border border-white/20 group-hover/item:border-[#FFB703] transition-colors flex items-center justify-center">
                        <input type="radio" name={label} className="peer appearance-none absolute inset-0 w-full h-full cursor-pointer" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFB703] scale-0 peer-checked:scale-100 transition-transform duration-200" />
                    </div>
                    <span className="text-white/70 text-sm group-hover/item:text-white transition-colors">{opt}</span>
                </label>
            ))}
        </div>
    </div>
);

const ContactItem = ({ icon: Icon, title, value, href }: { icon: any, title: string, value: string, href?: string }) => (
    <motion.div
        variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
        className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
    >
        <div className="w-12 h-12 rounded-full bg-[#B11226]/10 flex items-center justify-center text-[#B11226] group-hover:scale-110 transition-transform duration-300">
            <Icon size={20} />
        </div>
        <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">{title}</p>
            {href ? (
                <a href={href} className="text-lg font-bold text-white group-hover:text-[#FFB703] transition-colors">{value}</a>
            ) : (
                <p className="text-lg font-bold text-white">{value}</p>
            )}
        </div>
    </motion.div>
);

// --- Main Page ---

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-[#B11226] selection:text-white overflow-hidden">
            <Navbar />

            <div className="pt-28 pb-20 container mx-auto px-6 md:px-12 relative z-10">

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-[#B11226]/20 to-transparent blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

                    {/* LEFT COLUMN: INFO & TRUST */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                        className="lg:w-5/12 pt-10"
                    >
                        <motion.h1
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                        >
                            Get in <span className="text-[#B11226]">Touch</span>
                        </motion.h1>

                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="text-xl text-white/60 mb-12 leading-relaxed"
                        >
                            Have a question, feedback, or bulk order request? <br />
                            We’re here to help you experience the royal taste of Maharaja.
                        </motion.p>

                        <div className="space-y-6">
                            <ContactItem icon={Phone} title="Phone" value="+91 98765 43210" href="tel:+919876543210" />
                            <ContactItem icon={MessageCircle} title="WhatsApp" value="Chat with us" href="#" />
                            <ContactItem icon={Mail} title="Email" value="hello@maharajapizza.com" href="mailto:hello@maharajapizza.com" />
                            <ContactItem icon={MapPin} title="Headquarters" value="12, Royal Street, Mumbai, India" />
                            <ContactItem icon={Clock} title="Opening Hours" value="11:00 AM — 11:00 PM (Daily)" />
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: FORM */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="lg:w-7/12"
                    >
                        <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            {/* Subtle Form Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B11226]/10 blur-[80px] pointer-events-none" />

                            <form className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <InputField label="Full Name" placeholder="Your full name" required />
                                    <InputField label="Mobile Number" type="tel" placeholder="Your phone number" required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <InputField label="Email" type="email" placeholder="Your email (optional)" />
                                    <InputField label="Location / Area" placeholder="Your area (for delivery support)" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <SelectField label="Reason for Contact" options={["Order related query", "Bulk / Party order", "Franchise enquiry", "Feedback / Complaint", "General enquiry"]} />
                                    <SelectField label="Preferred Time" options={["Anytime", "Morning (10–12)", "Afternoon (12–4)", "Evening (4–9)"]} />
                                </div>

                                <RadioGroup label="Preferred Contact Method" options={["Call me", "WhatsApp me", "Email me"]} />

                                <div className="group">
                                    <label className="block text-xs uppercase tracking-widest text-[#B11226] mb-2 font-bold group-focus-within:text-[#FFB703] transition-colors">
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell us how we can help you..."
                                        className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg p-4 text-white placeholder-white/20 outline-none focus:border-[#FFB703] focus:shadow-[0_0_15px_rgba(255,183,3,0.1)] transition-all duration-300 resize-none"
                                    />
                                </div>

                                <button
                                    type="button" // Prevent reload for demo
                                    className="w-full bg-[#B11226] text-white font-bold text-lg py-5 rounded-xl shadow-lg hover:bg-[#D4152D] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group"
                                >
                                    <span>Send Message 🍕</span>
                                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
