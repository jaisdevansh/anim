'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#080808] border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#B11226]/5 blur-[120px] rounded-full -mb-64 -mr-64 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="text-3xl font-black tracking-tighter text-white">
                                MAHARAJA <span className="text-[#B11226]">PIZZA</span>
                            </span>
                        </Link>
                        <p className="text-white/50 leading-relaxed font-light text-lg">
                            The ultimate royal pizza experience. Crafted with love, served with pride.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -5, color: '#FFB703' }}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 border border-white/10 transition-all hover:border-[#B11226] hover:bg-[#B11226]/10"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-[#FFB703] font-bold uppercase tracking-widest text-sm mb-8">Menu</h4>
                        <ul className="space-y-4">
                            {['Classic Pizzas', 'Signature Delights', 'Royal Sides', 'Desserts', 'Beverages'].map((item) => (
                                <li key={item}>
                                    <Link href="/menu" className="text-white/60 hover:text-white transition-colors flex items-center group">
                                        <span className="w-0 group-hover:w-3 h-px bg-[#B11226] mr-0 group-hover:mr-3 transition-all" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-[#FFB703] font-bold uppercase tracking-widest text-sm mb-8">Support</h4>
                        <ul className="space-y-4">
                            {['Order Status', 'Delivery Policy', 'Franchise Enquiry', 'Privacy Policy', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link href="/contact" className="text-white/60 hover:text-white transition-colors flex items-center group">
                                        <span className="w-0 group-hover:w-3 h-px bg-[#B11226] mr-0 group-hover:mr-3 transition-all" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-[#FFB703] font-bold uppercase tracking-widest text-sm mb-8">Visit Us</h4>
                        <div className="flex items-start gap-4 text-white/60">
                            <MapPin size={24} className="text-[#B11226] shrink-0" />
                            <p>123 Royal Palace Road, <br />Pizza Kingdom, IN 110001</p>
                        </div>
                        <div className="flex items-center gap-4 text-white/60">
                            <Phone size={20} className="text-[#B11226] shrink-0" />
                            <p>+91 98765 43210</p>
                        </div>
                        <div className="flex items-center gap-4 text-white/60">
                            <Mail size={20} className="text-[#B11226] shrink-0" />
                            <p>order@maharajapizza.com</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-sm">
                    <p>© 2024 Maharaja Pizza. All Rights Royal.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
