import { useState } from 'react';
import { PaddingSettings, ImageDimensions, calculatePaddedDimensions, applyPaddingToCanvas } from './paddingCalculator';

interface UsePaddingOptions {
  maxPadding?: number;
}

export function usePadding(options: UsePaddingOptions = {}) {
  const { maxPadding = 500 } = options;
  const [padding, setPadding] = useState<PaddingSettings>({
    horizontal: 0,
    vertical: 0,
  });

  const updatePadding = (type: keyof PaddingSettings, value: number) => {
    setPadding((prev) => ({
      ...prev,
      [type]: Math.min(Math.max(0, value), maxPadding),
    }));
  };
  console.log('Padding:', padding);

  const downloadWithPadding = (img: HTMLImageElement, dimensions: ImageDimensions, filename = 'padded-image.png') => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const paddedDimensions = calculatePaddedDimensions(dimensions, padding);
    console.log('Original dimensions:', dimensions);
    console.log('Padding:', padding);
    console.log('Scaled padding:', paddedDimensions.scaledPadding);
    console.log('Padded dimensions:', paddedDimensions);

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
    downloadWithPadding,
  };
}
