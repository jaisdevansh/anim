import { useState, useEffect } from 'react';

interface PreloadOptions {
    urls: string[];
    priorityIndex?: number; // Index of the image to load eagerly (e.g., 0 for the first frame)
}

export const useImagePreloader = ({ urls, priorityIndex = 0 }: PreloadOptions) => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!urls.length) {
            setIsLoading(false);
            return;
        }

        let isMounted = true;
        const loadedImages: HTMLImageElement[] = new Array(urls.length);
        let loadedCount = 0;

        const loadSingleImage = (index: number, priority: boolean = false): Promise<void> => {
            return new Promise((resolve) => {
                const img = new Image();
                if (priority) {
                    // Priority images (like the first frame) shouldn't be lazy-loaded?
                    // The Image constructor doesn't have a 'loading' attribute by default that does much without inserting into DOM,
                    // but we can ensure we trigger it immediately.
                }

                img.src = urls[index];

                img.onload = () => {
                    if (!isMounted) return;
                    loadedImages[index] = img;
                    loadedCount++;
                    setProgress(Math.round((loadedCount / urls.length) * 100));
                    resolve();
                };

                img.onerror = () => {
                    if (!isMounted) return;
                    console.error(`Failed to load image at index ${index}: ${urls[index]}`);
                    // We resolve even on error to not block the entire queue
                    // Ideally we might want a placeholder or just skip it
                    loadedImages[index] = img; // logic might need to handle broken images in rendering
                    loadedCount++;
                    setProgress(Math.round((loadedCount / urls.length) * 100));
                    resolve();
                };
            });
        };

        const loadImages = async () => {
            // 1. Load priority image first
            if (urls[priorityIndex]) {
                await loadSingleImage(priorityIndex, true);
            }

            // 2. Load the rest in parallel
            const promises = urls.map((_, index) => {
                if (index === priorityIndex) return Promise.resolve(); // Already loaded
                return loadSingleImage(index);
            });

            await Promise.all(promises);

            if (isMounted) {
                setImages(loadedImages);
                setIsLoading(false);
            }
        };

        loadImages();

        return () => {
            isMounted = false;
        };
    }, [urls, priorityIndex]);

    return { images, isLoading, progress, error };
};
