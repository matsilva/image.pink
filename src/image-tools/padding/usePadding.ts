import { useState } from 'react';
import { ImageDimensions, calculatePaddedDimensions, applyPaddingToCanvas } from './paddingCalculator';

interface PaddingOptions {
  horizontal: number;
  vertical: number;
  isTransparent: boolean;
}

interface PaddingState {
  options: PaddingOptions;
  originalDimensions: {
    width: number;
    height: number;
  } | null;
}

const DEFAULT_OPTIONS: PaddingOptions = {
  horizontal: 0,
  vertical: 0,
  isTransparent: false,
};

interface UsePaddingOptions {
  maxPadding?: number;
}

export function usePadding(options: UsePaddingOptions = {}) {
  const { maxPadding = 500 } = options;
  const [padding, setPadding] = useState<PaddingState>({
    options: DEFAULT_OPTIONS,
    originalDimensions: null,
  });

  const updatePadding = (type: keyof Omit<PaddingOptions, 'isTransparent'>, value: number) => {
    setPadding((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [type]: Math.min(Math.max(0, value), maxPadding),
      },
    }));
  };

  const toggleTransparentPadding = () => {
    setPadding((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        isTransparent: !prev.options.isTransparent,
      },
    }));
  };

  const downloadWithPadding = (img: HTMLImageElement, dimensions: ImageDimensions, filename = 'padded-image.png') => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const paddedDimensions = calculatePaddedDimensions(dimensions, padding.options);

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
