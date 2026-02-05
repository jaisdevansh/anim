'use client';

import { ReactLenis } from 'lenis/react';
import React, { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const lenisOptions = {
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Exponential ease-out for "butter" feel
    };

    return (
        <ReactLenis root options={lenisOptions}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {children as any}
        </ReactLenis>
    );
}
