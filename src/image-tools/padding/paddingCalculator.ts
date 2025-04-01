// Types for padding calculations
export interface PaddingSettings {
  horizontal: number;
  vertical: number;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface PaddedDimensions {
  paddedWidth: number;
  paddedHeight: number;
  scaledPadding: PaddingSettings;
}

const BASE_WIDTH = 1000; // Base width for scaling calculations

export function calculatePaddedDimensions(originalDimensions: ImageDimensions, padding: PaddingSettings): PaddedDimensions {
  // Calculate the scale factor based on the original dimensions
  const scaleFactor = Math.max(originalDimensions.width / BASE_WIDTH, 1);

  // Calculate scaled padding
  const scaledPadding = {
    horizontal: padding.horizontal * scaleFactor,
    vertical: padding.vertical * scaleFactor,
  };

  // Calculate final dimensions
  const paddedWidth = originalDimensions.width + scaledPadding.horizontal * 2;
  const paddedHeight = originalDimensions.height + scaledPadding.vertical * 2;

  return {
    paddedWidth,
    paddedHeight,
    scaledPadding,
  };
}

export function applyPaddingToCanvas(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  originalDimensions: ImageDimensions,
  paddedDimensions: PaddedDimensions
): void {
  const { paddedWidth, paddedHeight, scaledPadding } = paddedDimensions;

  // Set canvas size
  ctx.canvas.width = paddedWidth;
  ctx.canvas.height = paddedHeight;

  // Fill background with white
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, paddedWidth, paddedHeight);

  // Draw the image with padding
  ctx.drawImage(img, scaledPadding.horizontal, scaledPadding.vertical, originalDimensions.width, originalDimensions.height);
}
