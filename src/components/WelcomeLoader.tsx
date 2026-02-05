import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeLoaderProps {
    isLoading: boolean;
    progress: number;
}

const WelcomeLoader: React.FC<WelcomeLoaderProps> = ({ isLoading, progress }) => {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
                >
                    <div className="flex flex-col items-center">
                        {/* Minimal Spinner/Logo Animation */}
                        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                            <motion.span
                                className="absolute inset-0 border-2 border-[#B11226]/20 rounded-full"
                            />
                            <motion.span
                                className="absolute inset-0 border-2 border-t-[#B11226] border-r-transparent border-b-transparent border-l-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <span className="text-[#B11226] font-mono text-xl font-bold">
                                {progress}%
                            </span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-white/60 font-mono text-xs tracking-[0.3em] uppercase"
                            >
                                Crafting Perfection
                            </motion.p>

                            {/* Visual Progress Bar */}
                            <div className="w-48 h-[1px] bg-white/10 mt-4 relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-[#B11226]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeLoader;
