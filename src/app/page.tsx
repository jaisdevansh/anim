'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import ScrollSequence from '@/components/ScrollSequence';
import Navbar from '@/components/Navbar';
import MenuPreview from '@/components/MenuPreview';
import Story from '@/components/Story';
import Reviews from '@/components/Reviews';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import WelcomeLoader from '@/components/WelcomeLoader';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { generateFramePaths } from '@/lib/constants';

export default function Home() {
  // Memoize paths so they don't regenerate on render
  const sequencePaths = useMemo(() => generateFramePaths(), []);

  const { images, isLoading, progress } = useImagePreloader({
    urls: sequencePaths,
    priorityIndex: 0
  });

  return (
    <main className="min-h-screen bg-[#050505]">
      <WelcomeLoader isLoading={isLoading} progress={progress} />

      <motion.div
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Navbar />
        <ScrollSequence images={images} />
        <MenuPreview />
        <Story />
        <Reviews />
        <CTA />
        <Footer />
      </motion.div>
    </main>
  );
}
