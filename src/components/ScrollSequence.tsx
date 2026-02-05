'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const FRAME_COUNT = 240;

export default function ScrollSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll progress (0 to 1) to frame index (1 to 240)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = `/images/sequence/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setIsLoading(false);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Draw frame on canvas when scroll position changes
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || images.length < FRAME_COUNT) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // Pre-calculated dimensions
        const drawDims = { w: 0, h: 0, x: 0, y: 0 };

        // Tracking last rendered frame to avoid redundant draws
        let lastFrame = -1;

        const render = () => {
            const currentFrame = Math.floor(frameIndex.get());
            if (currentFrame === lastFrame) return; // Skip if frame hasn't changed

            lastFrame = currentFrame;
            const img = images[currentFrame - 1];

            if (img && context) {
                context.drawImage(img, drawDims.x, drawDims.y, drawDims.w, drawDims.h);
            }
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const img = images[0];
            if (img) {
                const canvasAspect = canvas.width / canvas.height;
                const imgAspect = img.width / img.height;

                if (canvasAspect > imgAspect) {
                    drawDims.h = canvas.width / imgAspect;
                    drawDims.w = canvas.width;
                    drawDims.x = 0;
                    drawDims.y = (canvas.height - drawDims.h) / 2;
                } else {
                    drawDims.w = canvas.height * imgAspect;
                    drawDims.h = canvas.height;
                    drawDims.x = (canvas.width - drawDims.w) / 2;
                    drawDims.y = 0;
                }
            }
            render();
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        const unsubscribe = frameIndex.on("change", () => {
            requestAnimationFrame(render);
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            unsubscribe();
        };
    }, [images, frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[400vh] w-full bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#050505]">
                        <div className="text-[#B11226] font-mono text-xl animate-pulse">
                            PREPARING THE REVEAL...
                        </div>
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    className="h-full w-full object-cover"
                />

                {/* Overlay Text/UI */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter">
                            THE PERFECT SLICE
                        </h1>
                        <p className="text-xl text-white/60 mt-4 tracking-widest uppercase">
                            Scroll to experience the craft
                        </p>
                    </motion.div>
                </div>

                {/* Content Sections during sequence */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]) }}
                    className="absolute inset-0 flex items-center justify-center px-10"
                >
                    <div className="max-w-2xl text-center bg-black/40 backdrop-blur-md p-8 border border-white/10 rounded-2xl">
                        <h2 className="text-4xl font-bold mb-4 text-[#B11226]">WOOD-FIRED PERFECTION</h2>
                        <p className="text-lg text-white/80 leading-relaxed">
                            Each dough is fermented for 48 hours, then fired at 900°F
                            to achieve that signature leopard-spotted crust.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 0]) }}
                    className="absolute inset-0 flex items-center justify-center px-10"
                >
                    <div className="max-w-2xl text-center bg-black/40 backdrop-blur-md p-8 border border-white/10 rounded-2xl">
                        <h2 className="text-4xl font-bold mb-4 text-[#B11226]">FRESH INGREDIENTS</h2>
                        <p className="text-lg text-white/80 leading-relaxed">
                            Aged mozzarella, San Marzano tomatoes, and extra virgin olive oil.
                            Simple components, extraordinary taste.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
