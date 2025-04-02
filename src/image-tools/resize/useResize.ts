import { useState, useCallback } from 'react';

interface ResizeOptions {
  width: number;
  height: number;
  backgroundColor: string | null; // null means transparent
  stretchToFill: boolean;
}

interface ResizeState {
  options: ResizeOptions;
  originalDimensions: {
    width: number;
    height: number;
  } | null;
}

const DEFAULT_OPTIONS: ResizeOptions = {
  width: 800,
  height: 600,
  backgroundColor: '#ffffff',
  stretchToFill: false,
};

export function useResize() {
  const [state, setState] = useState<ResizeState>({
    options: DEFAULT_OPTIONS,
    originalDimensions: null,
  });

  const updateOptions = useCallback((updates: Partial<ResizeOptions>) => {
    setState((prev) => ({
      ...prev,
      options: { ...prev.options, ...updates },
    }));
  }, []);

  const setOriginalDimensions = useCallback((width: number, height: number) => {
    setState((prev) => ({
      ...prev,
      originalDimensions: { width, height },
    }));
  }, []);

  const downloadWithResize = useCallback(
    (image: HTMLImageElement, originalDimensions: { width: number; height: number }) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { width, height, backgroundColor, stretchToFill } = state.options;

      // Set canvas dimensions to target size
      canvas.width = width;
      canvas.height = height;

      // Fill background if specified
      if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      // Calculate image dimensions and position
      let imageWidth = originalDimensions.width;
      let imageHeight = originalDimensions.height;
      let x = 0;
      let y = 0;

      if (stretchToFill) {
        // Stretch image to fill canvas
        imageWidth = width;
        imageHeight = height;
      } else {
        // Maintain aspect ratio and center image
        const scale = Math.min(width / originalDimensions.width, height / originalDimensions.height);
        imageWidth = originalDimensions.width * scale;
        imageHeight = originalDimensions.height * scale;
        x = (width - imageWidth) / 2;
        y = (height - imageHeight) / 2;
      }

      // Draw image
      ctx.drawImage(image, x, y, imageWidth, imageHeight);

      // Create download link
      const link = document.createElement('a');
      link.download = 'resized-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    },
    [state.options]
  );

  return {
    options: state.options,
    originalDimensions: state.originalDimensions,
    updateOptions,
    setOriginalDimensions,
    downloadWithResize,
  };
}
