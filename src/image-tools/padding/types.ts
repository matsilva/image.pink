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
