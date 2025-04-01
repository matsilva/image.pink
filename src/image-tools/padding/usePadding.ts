import { useState } from 'react';
import { ImageDimensions, calculatePaddedDimensions, applyPaddingToCanvas } from './paddingCalculator';

interface PaddingState {
  horizontal: number;
  vertical: number;
  isTransparent: boolean;
}

interface UsePaddingOptions {
  maxPadding?: number;
}

export function usePadding(options: UsePaddingOptions = {}) {
  const { maxPadding = 500 } = options;
  const [padding, setPadding] = useState<PaddingState>({
    horizontal: 0,
    vertical: 0,
    isTransparent: false,
  });

  const updatePadding = (type: keyof Omit<PaddingState, 'isTransparent'>, value: number) => {
    setPadding((prev) => ({
      ...prev,
      [type]: Math.min(Math.max(0, value), maxPadding),
    }));
  };

  const toggleTransparentPadding = () => {
    setPadding((prev) => ({
      ...prev,
      isTransparent: !prev.isTransparent,
    }));
  };

  const downloadWithPadding = (img: HTMLImageElement, dimensions: ImageDimensions, filename = 'padded-image.png') => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const paddedDimensions = calculatePaddedDimensions(dimensions, padding);

    applyPaddingToCanvas(ctx, img, dimensions, paddedDimensions);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return {
    padding,
    updatePadding,
    toggleTransparentPadding,
    downloadWithPadding,
  };
}
