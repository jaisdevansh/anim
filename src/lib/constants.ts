export const FRAME_COUNT = 240;

export const generateFramePaths = (): string[] => {
    const paths: string[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
        paths.push(`/images/sequence/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`);
    }
    return paths;
};
